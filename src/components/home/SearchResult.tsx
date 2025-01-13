import React from 'react'
import { VehicleCard } from '@/components/VehicleCard'
import { useVehicleFilter } from '@/hooks/context/global/useVehicleFilter'
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { LayoutGrid, List } from "lucide-react"
import { EmptyResult } from './EmptyResult'
import { LoadingSpinner } from '../LoadingSpinner'
import { Vehicle } from '@/types/interfaces/vehicle'
import { motion, AnimatePresence } from 'framer-motion'
import { useMediaQuery } from '@/hooks/useMediaQuery'

interface SearchResultProps {
  setOpenDialog: (open: boolean) => void
  openDialog: boolean
  onClick: (vehicle: Vehicle) => void
}

interface VehicleListItemProps {
  vehicle: Vehicle
  onClick: () => void
}

const VehicleListItem = ({ vehicle, onClick }: VehicleListItemProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="flex items-center gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-all cursor-pointer"
    onClick={onClick}
  >
    {vehicle.images && vehicle.images.length > 0 ? (
      <img 
        src={vehicle.images[0]} 
        alt={vehicle.name} 
        className="w-24 h-24 object-cover rounded-md"
      />
    ) : (
      <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center">
        <span className="text-gray-400">Sin imagen</span>
      </div>
    )}
    <div className="flex-1">
      <h3 className="text-lg font-semibold">{vehicle.name}</h3>
      <p className="text-sm text-gray-500">
        {vehicle.brand?.name || 'Sin marca'} - {vehicle.category?.name || 'Sin categoría'}
      </p>
    </div>
    <div className="text-right">
      <p className="text-lg font-bold text-brand-red">
        ${vehicle.salePrice.toLocaleString()}
      </p>
      {vehicle.initPrice && (
        <p className="text-sm text-gray-500 line-through">
          ${vehicle.initPrice.toLocaleString()}
        </p>
      )}
    </div>
  </motion.div>
)

export function SearchResult({ setOpenDialog, openDialog, onClick }: SearchResultProps) {
  const { filteredVehicles, isSearchActive } = useVehicleFilter()
  const [itemsPerPage, setItemsPerPage] = React.useState(8)
  const [currentPage, setCurrentPage] = React.useState(1)
  const isMobile = useMediaQuery('(max-width: 640px)')
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>(isMobile ? 'list' : 'grid')
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    setViewMode(isMobile ? 'list' : 'grid')
  }, [isMobile])

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [filteredVehicles.length])

  const pageCount = Math.ceil(filteredVehicles.length / itemsPerPage)
  const currentItems = filteredVehicles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleChangePage = (page: number) => {
    setCurrentPage(page)
  }

  const handleChangeItemsPerPage = (value: string) => {
    setItemsPerPage(Number(value))
    setCurrentPage(1)
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!isSearchActive && filteredVehicles.length === 0) {
    return null // No mostrar nada si no hay búsqueda activa
  }

  if (isSearchActive && filteredVehicles.length === 0) {
    return <EmptyResult setOpenDialog={setOpenDialog} />
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-md bg-white p-4 rounded-lg text-gray-500">
          {filteredVehicles.length} vehículos encontrados
        </p>
        <div className="flex gap-2 bg-white p-4 rounded-lg">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === 'grid' ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white p-10 rounded-3xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {currentItems.map((vehicle) => (
              <motion.div
                key={vehicle.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                onClick={() => onClick(vehicle)}
                className="cursor-pointer"
              >
                <VehicleCard
                  {...vehicle}
                  isDialogOpen={openDialog}
                  setIsDialogOpen={setOpenDialog}
                  onClick={() => onClick(vehicle)}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {currentItems.map((vehicle) => (
              <VehicleListItem
                key={vehicle.id}
                vehicle={vehicle}
                onClick={() => onClick(vehicle)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t">
        <Select onValueChange={handleChangeItemsPerPage} value={itemsPerPage.toString()}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Vehículos por página" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="4">4 por página</SelectItem>
            <SelectItem value="8">8 por página</SelectItem>
            <SelectItem value="12">12 por página</SelectItem>
            <SelectItem value="16">16 por página</SelectItem>
          </SelectContent>
        </Select>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => handleChangePage(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            {Array.from({ length: pageCount }, (_, i) => i + 1)
              .filter(page => {
                const distance = Math.abs(page - currentPage)
                return distance === 0 || distance === 1 || page === 1 || page === pageCount
              })
              .map((page, index, array) => {
                if (index > 0 && array[index - 1] !== page - 1) {
                  return [
                    <PaginationItem key={`ellipsis-${page}`}>
                      <PaginationLink>...</PaginationLink>
                    </PaginationItem>,
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => handleChangePage(page)}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ]
                }
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handleChangePage(page)}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              })}
            <PaginationItem>
              <PaginationNext 
                onClick={() => handleChangePage(Math.min(pageCount, currentPage + 1))}
                className={currentPage === pageCount ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

