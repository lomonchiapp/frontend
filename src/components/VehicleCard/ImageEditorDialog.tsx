import { useState, useCallback, useRef } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, X, Image as ImageIcon, Camera, Check, Loader2, RefreshCw, LayoutGrid, MoveLeft, MoveRight } from "lucide-react"
import { storage } from '@/firebase'
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ImageEditorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  images: string[]
  onImagesChange: (images: string[]) => Promise<void>
  vehicleId: string
  vehicleName: string
}

export function ImageEditorDialog({
  open,
  onOpenChange,
  images,
  onImagesChange,
  vehicleId,
  vehicleName
}: ImageEditorDialogProps) {
  const [uploadingImages, setUploadingImages] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [dragActive, setDragActive] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>("upload")
  const [reordering, setReordering] = useState<boolean>(false)
  const [workingImages, setWorkingImages] = useState<string[]>(images)
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null)
  
  const inputRef = useRef<HTMLInputElement>(null)

  // Restablecer imágenes de trabajo cuando se abre el diálogo
  const handleDialogOpenChange = (open: boolean) => {
    if (open) {
      setWorkingImages(images);
      setActiveTab("upload");
    }
    onOpenChange(open);
  }

  // Manejo de subida de imágenes
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    
    await uploadImages(Array.from(files))
  }

  const uploadImages = async (files: File[]) => {
    try {
      setUploadingImages(true)
      setUploadProgress(0)
      
      const uploadPromises = files.map(async (file, index) => {
        const storageRef = ref(storage, `vehicles/${vehicleId}/${Date.now()}_${index}_${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)
        
        return new Promise<string>((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              setUploadProgress(Math.min(progress, 95)) // Deja espacio para el procesamiento final
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
      
      const uploadedImageURLs = await Promise.all(uploadPromises)
      
      // Actualizar las imágenes actuales
      const updatedImages = [...workingImages, ...uploadedImageURLs]
      setWorkingImages(updatedImages)
      setUploadProgress(100)
      
    } catch (error) {
      console.error('Error uploading images:', error)
    } finally {
      setTimeout(() => {
        setUploadingImages(false)
        setUploadProgress(0)
      }, 800) // Delay to show 100% complete
    }
  }

  // Eliminar imagen
  const deleteImage = async (index: number) => {
    try {
      setDeletingIndex(index)
      const imageUrl = workingImages[index]
      
      // Extraer la ruta del archivo de la URL (esto asume un formato específico de Firebase Storage)
      const imageRef = ref(storage, imageUrl)
      
      try {
        await deleteObject(imageRef)
      } catch (error) {
        console.error('Error deleting image from storage, it may already be deleted:', error)
        // Seguimos adelante incluso si falla el borrado, ya que podría estar referenciado pero no existir
      }
      
      // Eliminar de la lista local
      const newImages = [...workingImages]
      newImages.splice(index, 1)
      setWorkingImages(newImages)
      
    } catch (error) {
      console.error('Error deleting image:', error)
    } finally {
      setDeletingIndex(null)
    }
  }

  // Reordenar imágenes
  const moveImage = (fromIndex: number, direction: 'left' | 'right') => {
    if (reordering) return
    
    setReordering(true)
    
    const toIndex = direction === 'left' ? 
      Math.max(0, fromIndex - 1) : 
      Math.min(workingImages.length - 1, fromIndex + 1)
    
    if (fromIndex === toIndex) {
      setReordering(false)
      return
    }
    
    const newImages = [...workingImages]
    const [movedImage] = newImages.splice(fromIndex, 1)
    newImages.splice(toIndex, 0, movedImage)
    
    setWorkingImages(newImages)
    setTimeout(() => setReordering(false), 300)
  }

  // Guardar cambios
  const saveChanges = async () => {
    try {
      setUploadingImages(true)
      setUploadProgress(50)
      
      await onImagesChange(workingImages)
      setUploadProgress(100)
      
      // Cerrar después de guardar
      setTimeout(() => {
        onOpenChange(false)
        setUploadingImages(false)
        setUploadProgress(0)
      }, 800)
      
    } catch (error) {
      console.error('Error saving images:', error)
      setUploadingImages(false)
    }
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
  }, [])

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-red-600 text-xl">Editar imágenes</DialogTitle>
          <DialogDescription>
            Administra las imágenes del vehículo <span className="font-medium">{vehicleName}</span>
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Subir imágenes
            </TabsTrigger>
            <TabsTrigger value="manage" className="flex items-center gap-2">
              <LayoutGrid className="h-4 w-4" />
              Administrar ({workingImages.length})
            </TabsTrigger>
          </TabsList>
          
          {/* Tab de Subida */}
          <TabsContent value="upload" className="mt-6">
            <div 
              className={`border-2 border-dashed rounded-lg p-8 transition-colors duration-200 flex flex-col items-center justify-center ${
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
              
              <div className="bg-red-50 p-4 rounded-full mb-4">
                <Upload className="h-10 w-10 text-red-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Subir imágenes</h3>
              <p className="text-sm text-gray-500 text-center max-w-md mb-2">
                <span className="font-medium text-red-600 cursor-pointer">Haz clic para seleccionar</span> o arrastra y suelta
                las imágenes aquí para subirlas.
              </p>
              <p className="text-xs text-gray-400">
                PNG, JPG, WEBP (Máx. 5MB por archivo)
              </p>
              
              {uploadingImages && (
                <div className="w-full max-w-md mt-6">
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-red-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                      transition={{ ease: "easeInOut" }}
                    />
                  </div>
                  <p className="text-xs text-center mt-2 text-gray-500">
                    {uploadProgress < 100 ? (
                      `Subiendo... ${Math.round(uploadProgress)}%`
                    ) : (
                      <span className="text-green-600 font-medium flex items-center justify-center">
                        <Check className="h-3 w-3 mr-1" /> Subida completada
                      </span>
                    )}
                  </p>
                </div>
              )}
            </div>
            
            {/* Vista previa de imágenes recién subidas */}
            {workingImages.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Imágenes ({workingImages.length})
                </h4>
                
                <div className="grid grid-cols-4 gap-4">
                  <AnimatePresence>
                    {workingImages.map((image, index) => (
                      <motion.div
                        key={image}
                        className={cn(
                          "relative group aspect-square rounded-md overflow-hidden border border-gray-200",
                          index === 0 && "ring-2 ring-red-500"
                        )}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        <img 
                          src={image} 
                          alt={`Vehículo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        
                        {index === 0 && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
                            Principal
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                
                <p className="text-xs text-gray-500 mt-4">
                  La primera imagen será la que aparecerá como principal.
                  Para reordenar o eliminar imágenes, ve a la pestaña "Administrar".
                </p>
              </div>
            )}
          </TabsContent>
          
          {/* Tab de Administración */}
          <TabsContent value="manage" className="mt-6">
            {workingImages.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <AnimatePresence>
                    {workingImages.map((image, index) => (
                      <motion.div
                        key={image}
                        className={cn(
                          "relative group aspect-square rounded-md overflow-hidden border border-gray-200",
                          index === 0 && "ring-2 ring-red-500"
                        )}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        layout
                        transition={{ duration: 0.2 }}
                      >
                        <img 
                          src={image} 
                          alt={`Vehículo ${vehicleName} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Controles de administración */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="flex flex-col gap-2">
                            <div className="flex justify-center gap-2">
                              <Button
                                variant="secondary"
                                size="icon"
                                className="h-8 w-8 bg-white hover:bg-gray-100"
                                onClick={() => moveImage(index, 'left')}
                                disabled={index === 0 || reordering}
                                title="Mover a la izquierda"
                              >
                                <MoveLeft className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="secondary"
                                size="icon"
                                className="h-8 w-8 bg-white hover:bg-gray-100"
                                onClick={() => moveImage(index, 'right')}
                                disabled={index === workingImages.length - 1 || reordering}
                                title="Mover a la derecha"
                              >
                                <MoveRight className="h-4 w-4" />
                              </Button>
                            </div>
                            <Button
                              variant="destructive"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => deleteImage(index)}
                              disabled={deletingIndex === index}
                              title="Eliminar imagen"
                            >
                              {deletingIndex === index ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <X className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                        
                        {index === 0 && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
                            Principal
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-2">Instrucciones:</h4>
                  <ul className="text-xs text-gray-600 space-y-1 list-disc pl-4">
                    <li>La primera imagen (marcada como Principal) aparecerá como destacada en las tarjetas.</li>
                    <li>Para reordenar, usa las flechas para mover una imagen a la izquierda o derecha.</li>
                    <li>Para establecer una imagen como principal, muévela a la primera posición.</li>
                    <li>Para eliminar una imagen, haz clic en el botón con icono X. Esta acción no se puede deshacer.</li>
                    <li>Los cambios no se guardarán hasta que hagas clic en "Guardar cambios".</li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                <ImageIcon className="h-12 w-12 text-gray-300 mb-4" />
                <p>No hay imágenes para administrar</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setActiveTab("upload")}
                >
                  Subir imágenes
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="mt-6 flex justify-between items-center">
          <div className="text-xs text-gray-500">
            {workingImages.length === 0 ? 
              "No hay imágenes" : 
              `${workingImages.length} ${workingImages.length === 1 ? "imagen" : "imágenes"}`}
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={uploadingImages}
            >
              Cancelar
            </Button>
            <Button 
              onClick={saveChanges} 
              className="bg-red-600 hover:bg-red-700"
              disabled={uploadingImages || workingImages.length === 0}
            >
              {uploadingImages ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                "Guardar cambios"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 