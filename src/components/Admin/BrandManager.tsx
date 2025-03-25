import { useState } from 'react'
import { useGlobalState } from '@/hooks/context/global/useGlobalState'
import { Brand } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetFooter, SheetClose } from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Building2, Edit, Trash2, Search, Plus, Loader2, ArrowLeft } from 'lucide-react'
import { database } from '@/firebase'
import { collection, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { ScrollArea } from '@/components/ui/scroll-area'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

interface BrandManagerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BrandManager({ open, onOpenChange }: BrandManagerProps) {
  const { brands, setBrands } = useGlobalState()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false)
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currentBrand, setCurrentBrand] = useState<Brand | null>(null)
  const [formData, setFormData] = useState<Partial<Brand>>({
    name: '',
    description: '',
    logo: ''
  })

  // Filter brands
  const filteredBrands = brands.filter((brand: Brand) => 
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // CRUD Operations
  const handleAddBrand = async () => {
    try {
      setLoading(true)
      const newBrand = {
        ...formData,
      } as Brand
      
      const docRef = await addDoc(collection(database, "brands"), newBrand)
      
      // Add ID to the brand and update state
      const brandWithId = { ...newBrand, id: docRef.id }
      setBrands([...brands, brandWithId])
      
      setIsAddSheetOpen(false)
      resetForm()
      toast.success('Marca agregada correctamente')
    } catch (error) {
      console.error("Error adding brand:", error)
      toast.error('Error al agregar la marca')
    } finally {
      setLoading(false)
    }
  }

  const handleEditBrand = async () => {
    if (!currentBrand || !currentBrand.id) return
    
    try {
      setLoading(true)
      const brandRef = doc(database, "brands", currentBrand.id)
      await updateDoc(brandRef, formData)
      
      // Update local state
      const updatedBrands = brands.map((brand: Brand) => 
        brand.id === currentBrand.id ? { ...brand, ...formData } : brand
      )
      setBrands(updatedBrands)
      
      setIsEditSheetOpen(false)
      toast.success('Marca actualizada correctamente')
    } catch (error) {
      console.error("Error updating brand:", error)
      toast.error('Error al actualizar la marca')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteBrand = async () => {
    if (!currentBrand || !currentBrand.id) return
    
    try {
      setLoading(true)
      await deleteDoc(doc(database, "brands", currentBrand.id))
      
      // Update local state
      setBrands(brands.filter((brand: Brand) => brand.id !== currentBrand.id))
      
      setIsDeleteDialogOpen(false)
      setCurrentBrand(null)
      toast.success('Marca eliminada correctamente')
    } catch (error) {
      console.error("Error deleting brand:", error)
      toast.error('Error al eliminar la marca')
    } finally {
      setLoading(false)
    }
  }

  // Form helpers
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      logo: ''
    })
  }

  const openAddSheet = () => {
    resetForm()
    setIsAddSheetOpen(true)
  }

  const openEditSheet = (brand: Brand) => {
    setCurrentBrand(brand)
    setFormData({
      name: brand.name,
      description: brand.description,
      logo: brand.logo
    })
    setIsEditSheetOpen(true)
  }

  const openDeleteDialog = (brand: Brand) => {
    setCurrentBrand(brand)
    setIsDeleteDialogOpen(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Form component used in both Add and Edit sheets
  const BrandForm = ({ isEdit = false }: { isEdit?: boolean }) => (
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
        <Label htmlFor="description" className="text-right">Descripción</Label>
        <Input
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="col-span-3"
        />
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="logo" className="text-right">Logo URL</Label>
        <Input
          id="logo"
          name="logo"
          value={formData.logo}
          onChange={handleInputChange}
          className="col-span-3"
          placeholder="https://..."
        />
      </div>
    </div>
  )

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
                <Building2 className="h-5 w-5 text-red-600" />
                Administración de Marcas
              </h2>
            </div>
            <Button onClick={openAddSheet} className="bg-red-600 hover:bg-red-700">
              <Plus className="mr-2 h-4 w-4" />
              Agregar Marca
            </Button>
          </div>
          
          <div className="flex-1 flex overflow-hidden">
            {/* Left Column - Brand List */}
            <div className="w-1/3 border-r flex flex-col">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar marcas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2"
                  />
                </div>
              </div>
              
              <ScrollArea className="flex-1">
                {filteredBrands.length > 0 ? (
                  <div className="divide-y">
                    {filteredBrands.map((brand) => (
                      <div
                        key={brand.id}
                        className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${currentBrand?.id === brand.id ? 'bg-gray-50 border-l-4 border-red-500' : ''}`}
                        onClick={() => setCurrentBrand(brand)}
                      >
                        <div className="flex items-center gap-3">
                          {brand.logo ? (
                            <img src={brand.logo} alt={brand.name} className="w-10 h-10 object-contain" />
                          ) : (
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Building2 className="h-5 w-5 text-gray-400" />
                            </div>
                          )}
                          <div>
                            <h3 className="font-medium">{brand.name}</h3>
                            {brand.description && (
                              <p className="text-sm text-gray-500 line-clamp-1">{brand.description}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                    <Search className="h-10 w-10 mb-4 opacity-20" />
                    <p>No se encontraron marcas</p>
                  </div>
                )}
              </ScrollArea>
            </div>
            
            {/* Right Column - Brand Details */}
            <div className="w-2/3 flex flex-col">
              {currentBrand ? (
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      {currentBrand.logo ? (
                        <img src={currentBrand.logo} alt={currentBrand.name} className="w-16 h-16 object-contain" />
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Building2 className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                      <div>
                        <h2 className="text-2xl font-semibold">{currentBrand.name}</h2>
                        {currentBrand.description && (
                          <p className="text-gray-600 mt-1">{currentBrand.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        onClick={() => openEditSheet(currentBrand)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
                      <Button 
                        variant="destructive" 
                        onClick={() => openDeleteDialog(currentBrand)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <Building2 className="h-16 w-16 mb-4 opacity-20" />
                  <p className="text-lg">Seleccione una marca para ver detalles</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </SheetContent>
      
      {/* Add Brand Sheet */}
      <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
        <SheetContent className="sm:max-w-lg">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="h-full bg-white border-l shadow-lg p-6"
          >
            <SheetHeader>
              <SheetTitle>Agregar Nueva Marca</SheetTitle>
              <SheetDescription>
                Complete el formulario para agregar una nueva marca.
              </SheetDescription>
            </SheetHeader>
            
            <BrandForm />
            
            <SheetFooter className="mt-4">
              <Button 
                onClick={handleAddBrand} 
                disabled={loading}
                className="bg-red-600 hover:bg-red-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Agregando...
                  </>
                ) : (
                  'Agregar Marca'
                )}
              </Button>
              <SheetClose asChild>
                <Button variant="outline" disabled={loading}>Cancelar</Button>
              </SheetClose>
            </SheetFooter>
          </motion.div>
        </SheetContent>
      </Sheet>
      
      {/* Edit Brand Sheet */}
      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent className="sm:max-w-lg">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="h-full bg-white border-l shadow-lg p-6"
          >
            <SheetHeader>
              <SheetTitle>Editar Marca</SheetTitle>
              <SheetDescription>
                Actualice la información de la marca.
              </SheetDescription>
            </SheetHeader>
            
            <BrandForm isEdit />
            
            <SheetFooter className="mt-4">
              <Button 
                onClick={handleEditBrand} 
                disabled={loading}
                className="bg-red-600 hover:bg-red-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Actualizando...
                  </>
                ) : (
                  'Guardar Cambios'
                )}
              </Button>
              <SheetClose asChild>
                <Button variant="outline" disabled={loading}>Cancelar</Button>
              </SheetClose>
            </SheetFooter>
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
              <DialogTitle className="text-red-600">Eliminar Marca</DialogTitle>
              <DialogDescription>
                ¿Está seguro que desea eliminar esta marca? Esta acción no se puede deshacer.
              </DialogDescription>
            </DialogHeader>
            
            {currentBrand && (
              <div className="py-4">
                <div className="flex items-center gap-3">
                  {currentBrand.logo ? (
                    <img src={currentBrand.logo} alt={currentBrand.name} className="w-12 h-12 object-contain" />
                  ) : (
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{currentBrand.name}</p>
                    {currentBrand.description && (
                      <p className="text-sm text-gray-500">{currentBrand.description}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button 
                variant="destructive" 
                onClick={handleDeleteBrand}
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