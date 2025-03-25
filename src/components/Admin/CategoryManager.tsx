import { useState } from 'react'
import { useGlobalState } from '@/hooks/context/global/useGlobalState'
import { VehicleCategory } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetFooter, SheetClose } from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tag, Edit, Trash2, Search, Plus, Loader2, ArrowLeft } from 'lucide-react'
import { database } from '@/firebase'
import { collection, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { ScrollArea } from '@/components/ui/scroll-area'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

interface CategoryManagerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CategoryManager({ open, onOpenChange }: CategoryManagerProps) {
  const { categories, setCategories } = useGlobalState()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false)
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<VehicleCategory | null>(null)
  const [formData, setFormData] = useState<Partial<VehicleCategory>>({
    name: '',
    description: '',
    icon: ''
  })

  // Filter categories
  const filteredCategories = categories.filter((category: VehicleCategory) => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // CRUD Operations
  const handleAddCategory = async () => {
    try {
      setLoading(true)
      const newCategory = {
        ...formData,
      } as VehicleCategory
      
      const docRef = await addDoc(collection(database, "categories"), newCategory)
      
      // Add ID to the category and update state
      const categoryWithId = { ...newCategory, id: docRef.id }
      setCategories([...categories, categoryWithId])
      
      setIsAddSheetOpen(false)
      resetForm()
      toast.success('Categoría agregada correctamente')
    } catch (error) {
      console.error("Error adding category:", error)
      toast.error('Error al agregar la categoría')
    } finally {
      setLoading(false)
    }
  }

  const handleEditCategory = async () => {
    if (!currentCategory || !currentCategory.id) return
    
    try {
      setLoading(true)
      const categoryRef = doc(database, "categories", currentCategory.id)
      await updateDoc(categoryRef, formData)
      
      // Update local state
      const updatedCategories = categories.map((category: VehicleCategory) => 
        category.id === currentCategory.id ? { ...category, ...formData } : category
      )
      setCategories(updatedCategories)
      
      setIsEditSheetOpen(false)
      toast.success('Categoría actualizada correctamente')
    } catch (error) {
      console.error("Error updating category:", error)
      toast.error('Error al actualizar la categoría')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCategory = async () => {
    if (!currentCategory || !currentCategory.id) return
    
    try {
      setLoading(true)
      await deleteDoc(doc(database, "categories", currentCategory.id))
      
      // Update local state
      setCategories(categories.filter((category: VehicleCategory) => category.id !== currentCategory.id))
      
      setIsDeleteDialogOpen(false)
      setCurrentCategory(null)
      toast.success('Categoría eliminada correctamente')
    } catch (error) {
      console.error("Error deleting category:", error)
      toast.error('Error al eliminar la categoría')
    } finally {
      setLoading(false)
    }
  }

  // Form helpers
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      icon: ''
    })
  }

  const openAddSheet = () => {
    resetForm()
    setIsAddSheetOpen(true)
  }

  const openEditSheet = (category: VehicleCategory) => {
    setCurrentCategory(category)
    setFormData({
      name: category.name,
      description: category.description,
      icon: category.icon
    })
    setIsEditSheetOpen(true)
  }

  const openDeleteDialog = (category: VehicleCategory) => {
    setCurrentCategory(category)
    setIsDeleteDialogOpen(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Form component used in both Add and Edit sheets
  const CategoryForm = ({ isEdit = false }: { isEdit?: boolean }) => (
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
        <Label htmlFor="icon" className="text-right">Ícono URL</Label>
        <Input
          id="icon"
          name="icon"
          value={formData.icon}
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
                <Tag className="h-5 w-5 text-red-600" />
                Administración de Categorías
              </h2>
            </div>
            <Button onClick={openAddSheet} className="bg-red-600 hover:bg-red-700">
              <Plus className="mr-2 h-4 w-4" />
              Agregar Categoría
            </Button>
          </div>
          
          <div className="flex-1 flex overflow-hidden">
            {/* Left Column - Category List */}
            <div className="w-1/3 border-r flex flex-col">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar categorías..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2"
                  />
                </div>
              </div>
              
              <ScrollArea className="flex-1">
                {filteredCategories.length > 0 ? (
                  <div className="divide-y">
                    {filteredCategories.map((category) => (
                      <div
                        key={category.id}
                        className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${currentCategory?.id === category.id ? 'bg-gray-50 border-l-4 border-red-500' : ''}`}
                        onClick={() => setCurrentCategory(category)}
                      >
                        <div className="flex items-center gap-3">
                          {category.icon ? (
                            <img src={category.icon} alt={category.name} className="w-10 h-10 object-contain" />
                          ) : (
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Tag className="h-5 w-5 text-gray-400" />
                            </div>
                          )}
                          <div>
                            <h3 className="font-medium">{category.name}</h3>
                            {category.description && (
                              <p className="text-sm text-gray-500 line-clamp-1">{category.description}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                    <Search className="h-10 w-10 mb-4 opacity-20" />
                    <p>No se encontraron categorías</p>
                  </div>
                )}
              </ScrollArea>
            </div>
            
            {/* Right Column - Category Details */}
            <div className="w-2/3 flex flex-col">
              {currentCategory ? (
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      {currentCategory.icon ? (
                        <img src={currentCategory.icon} alt={currentCategory.name} className="w-16 h-16 object-contain" />
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Tag className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                      <div>
                        <h2 className="text-2xl font-semibold">{currentCategory.name}</h2>
                        {currentCategory.description && (
                          <p className="text-gray-600 mt-1">{currentCategory.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        onClick={() => openEditSheet(currentCategory)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
                      <Button 
                        variant="destructive" 
                        onClick={() => openDeleteDialog(currentCategory)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <Tag className="h-16 w-16 mb-4 opacity-20" />
                  <p className="text-lg">Seleccione una categoría para ver detalles</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </SheetContent>
      
      {/* Add Category Sheet */}
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
              <SheetTitle>Agregar Nueva Categoría</SheetTitle>
              <SheetDescription>
                Complete el formulario para agregar una nueva categoría.
              </SheetDescription>
            </SheetHeader>
            
            <CategoryForm />
            
            <SheetFooter className="mt-4">
              <Button 
                onClick={handleAddCategory} 
                disabled={loading}
                className="bg-red-600 hover:bg-red-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Agregando...
                  </>
                ) : (
                  'Agregar Categoría'
                )}
              </Button>
              <SheetClose asChild>
                <Button variant="outline" disabled={loading}>Cancelar</Button>
              </SheetClose>
            </SheetFooter>
          </motion.div>
        </SheetContent>
      </Sheet>
      
      {/* Edit Category Sheet */}
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
              <SheetTitle>Editar Categoría</SheetTitle>
              <SheetDescription>
                Actualice la información de la categoría.
              </SheetDescription>
            </SheetHeader>
            
            <CategoryForm isEdit />
            
            <SheetFooter className="mt-4">
              <Button 
                onClick={handleEditCategory} 
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
              <DialogTitle className="text-red-600">Eliminar Categoría</DialogTitle>
              <DialogDescription>
                ¿Está seguro que desea eliminar esta categoría? Esta acción no se puede deshacer.
              </DialogDescription>
            </DialogHeader>
            
            {currentCategory && (
              <div className="py-4">
                <div className="flex items-center gap-3">
                  {currentCategory.icon ? (
                    <img src={currentCategory.icon} alt={currentCategory.name} className="w-12 h-12 object-contain" />
                  ) : (
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Tag className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{currentCategory.name}</p>
                    {currentCategory.description && (
                      <p className="text-sm text-gray-500">{currentCategory.description}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button 
                variant="destructive" 
                onClick={handleDeleteCategory}
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