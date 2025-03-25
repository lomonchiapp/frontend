import { useState } from 'react'
import { useGlobalState } from '@/hooks/context/global/useGlobalState'
import { Vehicle } from '@/types'
import { Brand, VehicleCategory } from '@/types/interfaces/vehicle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetFooter, SheetClose } from '@/components/ui/sheet'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Car, Edit, Trash2, Search, Plus, Loader2, ArrowLeft, ChevronRight, Package, Clock, Banknote, Layers } from 'lucide-react'
import { database } from '@/firebase'
import { collection, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { motion, AnimatePresence } from 'framer-motion'
import { VehicleForm } from './VehicleForm'

interface VehicleManagerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VehicleManager({ open, onOpenChange }: VehicleManagerProps) {
  const { vehicles, brands, categories, setVehicles } = useGlobalState()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false)
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currentVehicle, setCurrentVehicle] = useState<Vehicle | null>(null)
  const [formData, setFormData] = useState<Partial<Vehicle>>({
    name: '',
    brand: {} as Brand,
    category: { 
      id: '',
      name: '',
      image: null
    } as VehicleCategory,
    initPrice: 0,
    salePrice: 0,
    description: '',
    images: [],
    cc: ''
  })

  // Filter vehicles
  const filteredVehicles = vehicles.filter((vehicle: Vehicle) => 
    vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.cc.toString().includes(searchQuery)
  )

  // CRUD Operations
  const handleAddVehicle = async () => {
    try {
      setLoading(true)
      const newVehicle = {
        ...formData,
        salePrice: formData.salePrice || 0,
        initPrice: formData.initPrice || 0,
        images: formData.images || []
      } as Vehicle
      
      const docRef = await addDoc(collection(database, "vehicles"), newVehicle)
      
      // Add ID to the vehicle and update state
      const vehicleWithId = { ...newVehicle, id: docRef.id }
      setVehicles([...vehicles, vehicleWithId])
      
      setIsAddSheetOpen(false)
      resetForm()
    } catch (error) {
      console.error("Error adding vehicle:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditVehicle = async () => {
    if (!currentVehicle || !currentVehicle.id) return
    
    try {
      setLoading(true)
      const vehicleRef = doc(database, "vehicles", currentVehicle.id)
      await updateDoc(vehicleRef, formData)
      
      // Update local state
      const updatedVehicles = vehicles.map((vehicle: Vehicle) => 
        vehicle.id === currentVehicle.id ? { ...vehicle, ...formData } : vehicle
      )
      setVehicles(updatedVehicles)
      
      setIsEditSheetOpen(false)
    } catch (error) {
      console.error("Error updating vehicle:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteVehicle = async () => {
    if (!currentVehicle || !currentVehicle.id) return
    
    try {
      setLoading(true)
      await deleteDoc(doc(database, "vehicles", currentVehicle.id))
      
      // Update local state
      setVehicles(vehicles.filter((vehicle: Vehicle) => vehicle.id !== currentVehicle.id))
      
      setIsDeleteDialogOpen(false)
      setCurrentVehicle(null)
    } catch (error) {
      console.error("Error deleting vehicle:", error)
    } finally {
      setLoading(false)
    }
  }

  // Form helpers
  const resetForm = () => {
    setFormData({
      name: '',
      brand: {} as Brand,
      category: { 
        id: '',
        name: '',
        image: null 
      } as VehicleCategory,
      initPrice: 0,
      salePrice: 0,
      description: '',
      images: [],
      cc: ''
    })
  }

  const openAddSheet = () => {
    resetForm()
    setIsAddSheetOpen(true)
  }

  const openEditSheet = (vehicle: Vehicle) => {
    setCurrentVehicle(vehicle)
    setFormData({
      name: vehicle.name,
      brand: vehicle.brand,
      category: vehicle.category,
      initPrice: vehicle.initPrice,
      salePrice: vehicle.salePrice,
      description: vehicle.description,
      images: vehicle.images,
      cc: vehicle.cc
    })
    setIsEditSheetOpen(true)
  }

  const openDeleteDialog = (vehicle: Vehicle) => {
    setCurrentVehicle(vehicle)
    setIsDeleteDialogOpen(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    if (name === 'brand') {
      const selectedBrand = brands.find((b) => b.id === value) || {} as Brand
      setFormData(prev => ({ ...prev, brand: selectedBrand }))
    } else if (name === 'category') {
      const selectedCategory = categories.find((c) => c.id === value) || {} as VehicleCategory
      setFormData(prev => ({ ...prev, category: selectedCategory }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const VehicleDetails = () => {
    if (!currentVehicle) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <Car className="h-16 w-16 mb-4 opacity-20" />
          <p className="text-lg">Seleccione un vehículo para ver detalles</p>
        </div>
      );
    }

    return (
      <div className="h-full flex flex-col">
        <div className="py-4 px-2 flex items-center justify-between border-b">
          <h2 className="text-xl font-semibold">{currentVehicle.name}</h2>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => openEditSheet(currentVehicle)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => openDeleteDialog(currentVehicle)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar
            </Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto p-4">
          {currentVehicle.images && currentVehicle.images.length > 0 ? (
            <div className="mb-6 aspect-video relative overflow-hidden rounded-lg">
              <img 
                src={currentVehicle.images[0]} 
                alt={currentVehicle.name} 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="mb-6 aspect-video bg-gray-100 flex items-center justify-center rounded-lg">
              <Car className="h-12 w-12 text-gray-300" />
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="flex items-center">
              <Package className="h-5 w-5 text-red-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Marca</p>
                <p className="font-medium">{currentVehicle.brand.name}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Layers className="h-5 w-5 text-red-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Categoría</p>
                <p className="font-medium">{currentVehicle.category.name}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-red-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">CC</p>
                <p className="font-medium">{currentVehicle.cc}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Banknote className="h-5 w-5 text-red-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Precio inicial</p>
                <p className="font-medium">${currentVehicle.initPrice.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Banknote className="h-5 w-5 text-red-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Precio venta</p>
                <p className="font-medium">${currentVehicle.salePrice.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          {currentVehicle.description && (
            <div className="mb-6">
              <h3 className="text-md font-medium mb-2">Descripción</h3>
              <p className="text-gray-600">{currentVehicle.description}</p>
            </div>
          )}
          
          {currentVehicle.images && currentVehicle.images.length > 1 && (
            <div>
              <h3 className="text-md font-medium mb-2">Imágenes adicionales</h3>
              <div className="grid grid-cols-3 gap-2">
                {currentVehicle.images.slice(1).map((image, index) => (
                  <div key={index} className="aspect-square rounded-md overflow-hidden">
                    <img src={image} alt={`${currentVehicle.name} ${index + 2}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-screen p-0 bg-white max-h-screen flex flex-col">
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="h-full flex flex-col"
        >
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <div className="flex items-center gap-2">
              <SheetClose asChild>
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </SheetClose>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Car className="h-5 w-5 text-red-600" />
                Administración de Vehículos
              </h2>
            </div>
            <Button onClick={openAddSheet} className="bg-red-600 mr-6 hover:bg-red-700">
              <Plus className="mr-2 h-4 w-4" />
              Agregar Vehículo
            </Button>
          </div>
          
          <div className="flex-1 flex overflow-hidden">
            {/* Left Column - Vehicle List */}
            <div className="w-1/3 border-r flex flex-col">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar vehículos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2"
                  />
                </div>
              </div>
              
              <ScrollArea className="flex-1">
                {filteredVehicles.length > 0 ? (
                  <div className="divide-y">
                    {filteredVehicles.map((vehicle) => (
                      <div
                        key={vehicle.id}
                        className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${currentVehicle?.id === vehicle.id ? 'bg-gray-50 border-l-4 border-red-500' : ''}`}
                        onClick={() => setCurrentVehicle(vehicle)}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-medium">{vehicle.name}</h3>
                          <Badge variant="outline" className="ml-2 bg-red-50 text-red-700 border-red-200">
                            {vehicle.category?.name}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                          <Package className="h-3.5 w-3.5" />
                          {vehicle.brand?.name}
                          <span className="mx-1">•</span>
                          <Clock className="h-3.5 w-3.5" />
                          {vehicle.cc}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-medium text-red-600">${vehicle.salePrice.toLocaleString()}</span>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                    <Search className="h-10 w-10 mb-4 opacity-20" />
                    <p>No se encontraron vehículos</p>
                  </div>
                )}
              </ScrollArea>
            </div>
            
            {/* Right Column - Vehicle Details */}
            <div className="w-2/3 flex flex-col">
              <VehicleDetails />
            </div>
          </div>
        </motion.div>
      </SheetContent>
      
      {/* Add Vehicle Sheet */}
      <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="h-full bg-white border-l shadow-lg p-6"
          >
            <SheetHeader>
              <SheetTitle>Agregar Nuevo Vehículo</SheetTitle>
              <SheetDescription>
                Complete el formulario para agregar un nuevo vehículo al catálogo.
              </SheetDescription>
            </SheetHeader>
            
            <VehicleForm 
              formData={formData}
              brands={brands}
              categories={categories}
              isLoading={loading}
              onChange={setFormData}
              onSubmit={handleAddVehicle}
              submitLabel="Agregar Vehículo"
            />
            
            <SheetFooter className="mt-4 flex justify-end">
              <SheetClose asChild>
                <Button variant="outline" disabled={loading}>Cancelar</Button>
              </SheetClose>
            </SheetFooter>
          </motion.div>
        </SheetContent>
      </Sheet>
      
      {/* Edit Vehicle Sheet */}
      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent className="sm:max-w-lg overflow-y-auto bg-white">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="h-full p-6"
          >
            <SheetHeader>
              <SheetTitle>Editar Vehículo</SheetTitle>
              <SheetDescription>
                Actualice la información del vehículo.
              </SheetDescription>
            </SheetHeader>
            
            <VehicleForm 
              formData={formData}
              brands={brands}
              categories={categories}
              isLoading={loading}
              onChange={setFormData}
              onSubmit={handleEditVehicle}
              submitLabel="Guardar Cambios"
            />
            
          </motion.div>
        </SheetContent>
      </Sheet>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="bg-white sm:max-w-[425px] shadow-lg p-6 rounded-lg"
          >
            <DialogHeader>
              <DialogTitle className="text-red-600">Eliminar Vehículo</DialogTitle>
              <DialogDescription>
                ¿Está seguro que desea eliminar este vehículo? Esta acción no se puede deshacer.
              </DialogDescription>
            </DialogHeader>
            
            {currentVehicle && (
              <div className="py-4">
                <p className="font-medium">{currentVehicle.name}</p>
                <p className="text-sm text-gray-500">Marca: {currentVehicle.brand.name}</p>
                <p className="text-sm text-gray-500">Precio: ${currentVehicle.salePrice.toLocaleString()}</p>
              </div>
            )}
            
            <DialogFooter>
              <Button 
                variant="destructive" 
                onClick={handleDeleteVehicle}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Eliminando...
                  </>
                ) : (
                  'Eliminar'
                )}
              </Button>
              <DialogClose asChild>
                <Button variant="outline" disabled={loading}>Cancelar</Button>
              </DialogClose>
            </DialogFooter>
          </motion.div>
        </DialogContent>
      </Dialog>
    </Sheet>
  )
} 