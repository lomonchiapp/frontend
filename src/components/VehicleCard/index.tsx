import { useState, useRef, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Vehicle, Brand } from "@/types/interfaces/vehicle"
import { motion, AnimatePresence } from "framer-motion"
import { PlaceholderImage } from './PlaceholderImage'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Edit2, Check, X, Pencil, DollarSign, Gauge, Award, Tag } from "lucide-react"
import { useGlobalState } from '@/hooks/context/global/useGlobalState'
import { useVehicleUpdate } from '@/hooks/vehicles/useVehicleUpdate'
import { useAuthState } from '@/context/useAuthState'
import { ImageEditorDialog } from './ImageEditorDialog'

interface VehicleCardProps extends Vehicle {
  onClick: () => void
  isDialogOpen: boolean
  compact?: boolean
  setIsDialogOpen: (open: boolean) => void
  displayPrice: number
  secondaryPrice: number
  showInitialPrice: boolean
  isAuthenticated?: boolean
}

interface EditableFieldProps {
  value: string | number
  onSave: (value: string | number) => Promise<void>
  type?: 'text' | 'number' | 'select'
  options?: Array<{ id: string; name: string }>
  label?: string
  width?: string
}

function EditableField({ value, onSave, type = 'text', options = [], label, width = '160px' }: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Cuando comienza a editar, actualiza el valor inicial
  useEffect(() => {
    if (isEditing) {
      setEditValue(value);
      // Enfoca el input cuando se inicia la edición
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);
    }
  }, [isEditing, value]);

  const handleSave = async () => {
    if (editValue === '' && type !== 'select') return; // No guardar valores vacíos
    
    try {
      setIsLoading(true)
      await onSave(editValue)
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating field:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    }
  }

  if (!isEditing) {
    let displayValue = value;
    
    if (type === 'select' && options.length > 0) {
      const selectedOption = options.find(option => option.id === value);
      if (selectedOption) {
        displayValue = selectedOption.name;
      }
    } else if (type === 'number') {
      displayValue = Number(value).toLocaleString();
      if (label === 'cc') {
        displayValue = `${displayValue} cc`;
      }
    }
    
    return (
      <div className="group relative inline-flex items-center">
        <span className="pr-6">{displayValue}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
          className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity absolute right-0 top-1/2 -translate-y-1/2"
          title="Editar"
        >
          <Pencil className="h-4 w-4 text-gray-400 hover:text-gray-600" />
        </button>
      </div>
    )
  }

  return (
    <div className="z-30 relative flex flex-col" onClick={(e) => e.stopPropagation()}>
      <div className="relative">
        <div className="flex items-center mb-1 bg-white/90 backdrop-blur-sm rounded-md p-0.5 shadow-md border border-gray-100">
          {type === 'select' ? (
            <Select
              value={String(editValue)}
              onValueChange={(value) => {
                setEditValue(value);
                // Guardar automáticamente al seleccionar en desplegables
                setTimeout(() => {
                  onSave(value);
                  setIsEditing(false);
                }, 100);
              }}
            >
              <SelectTrigger 
                className="w-full h-8 text-sm bg-white border-gray-200 z-50" 
                onClick={(e) => e.stopPropagation()}
              >
                <SelectValue placeholder={`Seleccionar ${label}`} />
              </SelectTrigger>
              <SelectContent onClick={(e) => e.stopPropagation()}>
                {options.map((option) => (
                  <SelectItem key={option.id} value={option.id} onClick={(e) => e.stopPropagation()}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div className="relative w-full">
              <Input
                ref={inputRef}
                type={type}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-8 text-sm pr-16 border-gray-200 focus-visible:ring-1 focus-visible:ring-blue-500"
                onClick={(e) => e.stopPropagation()}
                autoFocus
              />
              <div className="absolute right-1 top-1 flex gap-0.5">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6 hover:bg-green-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSave();
                  }}
                  disabled={isLoading}
                  title="Guardar (Enter)"
                >
                  <Check className="h-3.5 w-3.5 text-green-500" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6 hover:bg-red-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(false);
                  }}
                  disabled={isLoading}
                  title="Cancelar (Esc)"
                >
                  <X className="h-3.5 w-3.5 text-red-500" />
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className="text-xs text-gray-500 absolute -bottom-5 left-1">
          {type === 'select' ? 'Seleccione una opción' : 'Presione Enter para guardar'}
        </div>
      </div>
    </div>
  );
}

export function VehicleCard({ 
  id,
  name, 
  category, 
  cc, 
  images,
  brand,
  setIsDialogOpen,
  onClick,
  compact = false,
  displayPrice,
  secondaryPrice,
  showInitialPrice,
}: VehicleCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const { brands, categories } = useGlobalState()
  const { updateField } = useVehicleUpdate()
  const { user } = useAuthState()

  const cardRef = useRef<HTMLDivElement>(null)
  const imageUrls = images || []

  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleOnClick = () => {
    onClick()
    setIsDialogOpen(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setCurrentImageIndex(0)
  }

  const handleFieldUpdate = async (field: string, value: string | number | Brand): Promise<void> => {
    if (!id) {
      console.error('No se puede actualizar: ID de vehículo no disponible');
      return;
    }
    
    try {
      console.log(`Actualizando campo ${field} con valor:`, value);
      await updateField(id, field as any, value);
      console.log(`Campo ${field} actualizado correctamente`);
    } catch (error) {
      console.error(`Error al actualizar campo ${field}:`, error);
    }
  }

  const handleImagesUpdate = async (newImages: string[]): Promise<void> => {
    if (!id) {
      console.error('No se puede actualizar: ID de vehículo no disponible');
      return;
    }
    
    try {
      console.log(`Actualizando imágenes del vehículo, nuevas imágenes:`, newImages);
      await updateField(id, 'images', newImages);
      console.log(`Imágenes actualizadas correctamente`);
    } catch (error) {
      console.error(`Error al actualizar imágenes:`, error);
    }
  }

  const safeCategories = categories.map(cat => ({
    id: cat.id || '',
    name: cat.name || ''
  }))

  const safeBrands = brands.map(b => ({
    id: b.id || '',
    name: b.name || ''
  }))

  if (compact) {
    return (
      <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 hover:bg-gray-50 rounded-xl 
        transition-all duration-200 cursor-pointer border border-transparent hover:border-gray-200 hover:shadow-sm" 
        onClick={handleOnClick}
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 relative rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={images?.[0]}
            alt={name}
            className="w-full h-full object-cover"
          />
          {isHovered && user && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Edit2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0 space-y-2" onClick={(e) => user && e.stopPropagation()}>
          {user ? (
            <>
              <div className="group flex items-center mb-2">
                <EditableField
                  value={name}
                  onSave={(value) => {
                    handleFieldUpdate('name', value);
                    return Promise.resolve();
                  }}
                />
              </div>
              
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2">
                  <Award className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                  <EditableField
                    value={brand?.id || ''}
                    onSave={async (value) => {
                      const selectedBrand = brands.find(b => b.id === value);
                      if (selectedBrand) {
                        await handleFieldUpdate('brand', selectedBrand);
                      }
                      return Promise.resolve();
                    }}
                    type="select"
                    options={safeBrands}
                    label="marca"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Tag className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                  <EditableField
                    value={category?.id || ''}
                    onSave={(value) => {
                      handleFieldUpdate('category', value);
                      return Promise.resolve();
                    }}
                    type="select"
                    options={safeCategories}
                    label="categoría"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Gauge className="h-3.5 w-3.5 text-gray-400" />
                    <EditableField
                      value={cc}
                      onSave={(value) => {
                        handleFieldUpdate('cc', value);
                        return Promise.resolve();
                      }}
                      type="number"
                      label="cc"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-3.5 w-3.5 text-red-500" />
                    <EditableField
                      value={displayPrice}
                      onSave={(value) => {
                        handleFieldUpdate('salePrice', Number(value));
                        return Promise.resolve();
                      }}
                      type="number"
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <h3 className="font-semibold text-base sm:text-lg text-gray-900 leading-tight overflow-hidden">
                <span className="block truncate">{name}</span>
              </h3>
              
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2">
                  <Award className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-gray-600 font-medium truncate">
                    {brand?.name}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Tag className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-gray-600 truncate">
                    {category?.name}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center justify-center bg-red-100 rounded-full p-1">
                      <Gauge className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                    </div>
                    <span className="text-xs sm:text-sm text-gray-600 font-medium whitespace-nowrap">
                      {cc} cc
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-3.5 w-3.5 text-red-500 flex-shrink-0" />
                    <p className="font-bold text-red-600 text-sm sm:text-base">
                      ${displayPrice.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <Card
      ref={cardRef}
      className="relative overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group
        bg-white rounded-xl border border-gray-200 hover:border-gray-300
        transform hover:scale-[1.02]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleOnClick}
    >
      <CardContent className="p-0">
        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <AnimatePresence mode="wait">
            {imageUrls.length > 0 ? (
              <motion.img
                key={currentImageIndex}
                src={imageUrls[currentImageIndex]}
                alt={name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            ) : (
              <PlaceholderImage />
            )}
          </AnimatePresence>

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-white/95 backdrop-blur-sm shadow-sm text-xs font-medium">
              {category.name}
            </Badge>
          </div>

          {/* Edit Button for authenticated users */}
          {user && (
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 bg-white/95 hover:bg-white shadow-lg backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsImageDialogOpen(true);
                }}
              >
                <Edit2 className="h-5 w-5 text-gray-700" />
              </Button>
            </div>
          )}

          {/* Image Navigation Dots */}
          {imageUrls.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {imageUrls.map((_, index) => (
                <motion.div
                  key={index}
                  className={`rounded-full bg-white/80 cursor-pointer transition-all duration-200
                    ${currentImageIndex === index ? 'w-6 h-2' : 'w-2 h-2'}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentImageIndex(index)
                  }}
                  layout
                />
              ))}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-5 space-y-4">
          {/* Vehicle Name */}
          <div onClick={(e) => e.stopPropagation()}>
            {user ? (
              <div className="group">
                <EditableField
                  value={name}
                  onSave={(value) => {
                    handleFieldUpdate('name', value);
                    return Promise.resolve();
                  }}
                />
              </div>
            ) : (
              <h3 className="font-semibold text-lg sm:text-xl text-gray-900 leading-tight overflow-hidden">
                <span className="block truncate">{name}</span>
              </h3>
            )}
          </div>
            
          {/* Vehicle Details */}
          <div className="space-y-3" onClick={(e) => e.stopPropagation()}>
            {/* Brand and CC in a responsive row */}
            <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 xs:gap-4">
              <div className="flex items-center space-x-2 min-w-0 flex-1">
                <Award className="h-4 w-4 text-gray-500 flex-shrink-0" />
                {user ? (
                  <EditableField
                    value={brand?.id || ''}
                    onSave={async (value) => {
                      const selectedBrand = brands.find(b => b.id === value);
                      if (selectedBrand) {
                        await handleFieldUpdate('brand', selectedBrand);
                      }
                      return Promise.resolve();
                    }}
                    type="select"
                    options={safeBrands}
                    label="marca"
                  />
                ) : (
                  <span className="text-sm text-gray-600 font-medium truncate">
                    {brand.name}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2 flex-shrink-0">
                <Gauge className="h-4 w-4 text-gray-500" />
                {user ? (
                  <div className="min-w-0">
                    <EditableField
                      value={cc}
                      onSave={(value) => {
                        handleFieldUpdate('cc', value);
                        return Promise.resolve();
                      }}
                      type="number"
                      label="cc"
                    />
                  </div>
                ) : (
                  <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
                    {cc} cc
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="pt-3 border-t border-gray-100" onClick={(e) => e.stopPropagation()}>
            <div className="space-y-2">
              {/* Initial Price */}
              <div className={`flex items-center justify-between transition-all duration-200 ${
                showInitialPrice 
                  ? "text-red-600 font-semibold" 
                  : "text-gray-500"
              }`}>
                <div className="flex items-center space-x-2">
                  <Tag className={`h-4 w-4 flex-shrink-0 ${
                    showInitialPrice ? "text-red-600" : "text-gray-400"
                  }`} />
                  <span className="text-sm font-medium">Inicial:</span>
                </div>
                {user ? (
                  <div className="min-w-0 flex-1 ml-2">
                    <EditableField
                      value={showInitialPrice ? displayPrice : secondaryPrice}
                      onSave={(value) => {
                        handleFieldUpdate('initPrice', Number(value));
                        return Promise.resolve();
                      }}
                      type="number"
                    />
                  </div>
                ) : (
                  <span className={`text-sm sm:text-base font-semibold ${
                    showInitialPrice ? "text-red-600" : "text-gray-500"
                  }`}>
                    ${(showInitialPrice ? displayPrice : secondaryPrice).toLocaleString()}
                  </span>
                )}
              </div>
              
              {/* Total Price */}
              <div className={`flex items-center justify-between transition-all duration-200 ${
                !showInitialPrice 
                  ? "text-red-600 font-semibold" 
                  : "text-gray-500"
              }`}>
                <div className="flex items-center space-x-2">
                  <DollarSign className={`h-4 w-4 flex-shrink-0 ${
                    !showInitialPrice ? "text-red-600" : "text-gray-400"
                  }`} />
                  <span className="text-sm font-medium">Total:</span>
                </div>
                {user ? (
                  <div className="min-w-0 flex-1 ml-2">
                    <EditableField
                      value={showInitialPrice ? secondaryPrice : displayPrice}
                      onSave={(value) => {
                        handleFieldUpdate('salePrice', Number(value));
                        return Promise.resolve();
                      }}
                      type="number"
                    />
                  </div>
                ) : (
                  <span className={`text-base sm:text-lg font-bold ${
                    !showInitialPrice ? "text-red-600" : "text-gray-500"
                  }`}>
                    ${(showInitialPrice ? secondaryPrice : displayPrice).toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Dialog para edición de imágenes */}
      {user && (
        <ImageEditorDialog
          open={isImageDialogOpen}
          onOpenChange={setIsImageDialogOpen}
          images={imageUrls}
          onImagesChange={handleImagesUpdate}
          vehicleId={id || 'unknown'}
          vehicleName={name}
        />
      )}
    </Card>
  )
}

