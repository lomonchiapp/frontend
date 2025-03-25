import { useState, useCallback, useRef } from 'react'
import { Vehicle, Brand, VehicleCategory } from '@/types/interfaces/vehicle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Upload, X, Image as ImageIcon, Check, Loader2 } from 'lucide-react'
import { storage } from '@/firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { motion, AnimatePresence } from 'framer-motion'

interface VehicleFormProps {
  formData: Partial<Vehicle>
  brands: Brand[]
  categories: VehicleCategory[]
  isLoading: boolean
  onChange: (data: Partial<Vehicle>) => void
  onSubmit: () => Promise<void>
  submitLabel?: string
}

export function VehicleForm({ 
  formData, 
  brands, 
  categories, 
  isLoading, 
  onChange, 
  onSubmit,
  submitLabel = 'Guardar'
}: VehicleFormProps) {
  const [uploadingImages, setUploadingImages] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [dragActive, setDragActive] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    onChange({ ...formData, [name]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    if (name === 'brand') {
      const selectedBrand = brands.find((b) => b.id === value) || {} as Brand
      onChange({ ...formData, brand: selectedBrand })
    } else if (name === 'category') {
      const selectedCategory = categories.find((c) => c.id === value) || {} as VehicleCategory
      onChange({ ...formData, category: selectedCategory })
    } else {
      onChange({ ...formData, [name]: value })
    }
  }

  // Manejar carga de imágenes
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    
    await uploadImages(Array.from(files))
  }

  const uploadImages = async (files: File[]) => {
    try {
      setUploadingImages(true)
      setUploadProgress(0)
      
      const uploadPromises = files.map(async (file) => {
        const storageRef = ref(storage, `vehicles/${Date.now()}_${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)
        
        return new Promise<string>((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              setUploadProgress(progress)
            },
            (error) => {
              reject(error)
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
              resolve(downloadURL)
            }
          )
        })
      })
      
      const imageURLs = await Promise.all(uploadPromises)
      const currentImages = formData.images || []
      
      onChange({
        ...formData,
        images: [...currentImages, ...imageURLs]
      })
    } catch (error) {
      console.error('Error uploading images:', error)
    } finally {
      setUploadingImages(false)
      setUploadProgress(0)
    }
  }

  // Función para eliminar una imagen
  const removeImage = (index: number) => {
    if (!formData.images) return
    
    const newImages = [...formData.images]
    newImages.splice(index, 1)
    
    onChange({
      ...formData,
      images: newImages
    })
  }

  // Manejar drag and drop
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      uploadImages(Array.from(e.dataTransfer.files))
    }
  }, [formData])

  return (
    <div className="space-y-6 pb-8">
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">Nombre</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="col-span-3"
          />
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="brand" className="text-right">Marca</Label>
          <div className="col-span-3">
            <Select 
              value={formData.brand?.id} 
              onValueChange={(value: string) => handleSelectChange('brand', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione una marca" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand) => (
                  <SelectItem key={brand.id} value={brand.id || ''}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="cc" className="text-right">CC</Label>
          <Input
            id="cc"
            name="cc"
            value={formData.cc}
            onChange={handleInputChange}
            className="col-span-3"
          />
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="initPrice" className="text-right">Precio inicial</Label>
          <Input
            id="initPrice"
            name="initPrice"
            type="number"
            value={formData.initPrice}
            onChange={handleInputChange}
            className="col-span-3"
          />
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="salePrice" className="text-right">Precio venta</Label>
          <Input
            id="salePrice"
            name="salePrice"
            type="number"
            value={formData.salePrice}
            onChange={handleInputChange}
            className="col-span-3"
          />
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="category" className="text-right">Categoría</Label>
          <div className="col-span-3">
            <Select 
              value={formData.category?.id} 
              onValueChange={(value: string) => handleSelectChange('category', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione una categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id || ''}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">Descripción</Label>
          <Input
            id="description"
            name="description"
            value={formData.description || ''}
            onChange={handleInputChange}
            className="col-span-3"
          />
        </div>
        
        {/* Carga de imágenes */}
        <div className="grid grid-cols-4 items-start gap-4">
          <Label className="text-right pt-2">Imágenes</Label>
          <div className="col-span-3 space-y-4">
            <div 
              className={`border-2 border-dashed rounded-lg p-6 transition-colors duration-200 flex flex-col items-center justify-center ${
                dragActive ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-400'
              }`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
            >
              <input
                ref={inputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              
              <Upload className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 text-center">
                <span className="font-medium text-red-600">Haz clic para subir</span> o arrastra y suelta
              </p>
              <p className="text-xs text-gray-400 mt-1">
                PNG, JPG (Máx. 10MB)
              </p>
              
              {uploadingImages && (
                <div className="w-full mt-4">
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-red-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                      transition={{ ease: "easeInOut" }}
                    />
                  </div>
                  <p className="text-xs text-center mt-1 text-gray-500">
                    Subiendo... {Math.round(uploadProgress)}%
                  </p>
                </div>
              )}
            </div>
            
            {/* Vista previa de imágenes */}
            {formData.images && formData.images.length > 0 && (
              <div className="mt-4">
                <Label className="text-sm mb-2 block">Imágenes cargadas</Label>
                <div className="grid grid-cols-3 gap-3">
                  <AnimatePresence>
                    {formData.images.map((image, index) => (
                      <motion.div
                        key={image}
                        className="relative rounded-lg overflow-hidden aspect-square group"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        <img 
                          src={image} 
                          alt={`Vehículo ${index}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                          <Button
                            variant="destructive"
                            size="icon"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeImage(index);
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        {index === 0 && (
                          <div className="absolute top-2 left-2 bg-black bg-opacity-50 rounded-md px-2 py-1">
                            <span className="text-white text-xs font-medium">Principal</span>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={onSubmit} 
          disabled={isLoading || uploadingImages}
          className="bg-red-600 hover:bg-red-700"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Procesando...
            </>
          ) : (
            submitLabel
          )}
        </Button>
      </div>
    </div>
  )
} 