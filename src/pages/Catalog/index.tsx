import React, { useState, useEffect } from 'react'
import { useGlobalState } from '@/hooks/context/global/useGlobalState'
import { useVehicleFilter } from '@/hooks/context/global/useVehicleFilter'
import { Input } from '@/components/ui/input'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Search, X } from 'lucide-react'
import { Brand, Vehicle, VehicleCategory } from '@/types'
import { VehicleCard } from '@/components/VehicleCard'
import { motion, AnimatePresence } from 'framer-motion'
import { VehicleDialog } from '@/components/VehicleDialog'
import { VehicleView } from '@/components/VehicleView'
import { EmptyResult } from '@/components/home/EmptyResult'
import { Badge } from '@/components/ui/badge'
import { 
    Pagination, 
    PaginationContent, 
    PaginationItem, 
    PaginationLink, 
} from "@/components/ui/pagination"
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select"
import { LayoutGrid, List } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

// Componente VehicleListItem mejorado
const VehicleListItem = ({ vehicle, onClick }: { vehicle: Vehicle, onClick: () => void }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="flex items-center gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-all cursor-pointer"
        onClick={onClick}
    >
        <div className="w-32 h-24 relative rounded-md overflow-hidden">
            {vehicle.images && vehicle.images.length > 0 ? (
                <img 
                    src={vehicle.images[0]} 
                    alt={vehicle.name} 
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Sin imagen</span>
                </div>
            )}
        </div>
        <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold truncate">{vehicle.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
                {vehicle.brand?.logo && (
                    <img 
                        src={vehicle.brand.logo} 
                        alt={vehicle.brand.name} 
                        className="w-4 h-4 object-contain"
                    />
                )}
                <span>{vehicle.brand?.name || 'Sin marca'}</span>
                <span>•</span>
                <span>{vehicle.category?.name || 'Sin categoría'}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
                {vehicle.description?.slice(0, 100)}...
            </p>
        </div>
        <div className="text-right flex flex-col items-end justify-between h-full">
            <div>
                <p className="text-2xl font-bold text-brand-red">
                    ${vehicle.salePrice.toLocaleString()}
                </p>
                {vehicle.initPrice && vehicle.initPrice > vehicle.salePrice && (
                    <p className="text-sm text-gray-500 line-through">
                        ${vehicle.initPrice.toLocaleString()}
                    </p>
                )}
            </div>
            <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={(e) => {
                    e.stopPropagation()
                    onClick()
                }}
            >
                Ver detalles
            </Button>
        </div>
    </motion.div>
)

export default function Catalog() {
    const { brands, categories, selectedVehicle, setSelectedVehicle } = useGlobalState()
    const {
        filteredVehicles,
        selectedBrands,
        selectedCategories,
        setSelectedBrands,
        setSelectedCategories,
        searchText,
        setSearchText,
        updateFilters,
        isSearchActive,
        loading
    } = useVehicleFilter()

    const [dialogOpen, setDialogOpen] = useState(false)
    const [itemsPerPage, setItemsPerPage] = React.useState(8)
    const [currentPage, setCurrentPage] = React.useState(1)
    const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid')
    const [sidebarOpen, setSidebarOpen] = useState(false)

    // Actualizar filtros cuando cambie la selección
    useEffect(() => {
        updateFilters()
    }, [selectedBrands, selectedCategories, searchText, updateFilters])

    // Reset page when filters change
    React.useEffect(() => {
        setCurrentPage(1)
    }, [filteredVehicles.length])

    const pageCount = Math.ceil(filteredVehicles.length / itemsPerPage)
    const currentItems = filteredVehicles.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
    }

    const handleVehicleClick = (vehicle: Vehicle) => {
        setSelectedVehicle(vehicle)
        setDialogOpen(true)
    }
    
    const handleCategoryClick = (category: VehicleCategory) => {
        const newSelectedCategories = selectedCategories.some(c => c.id === category.id)
            ? selectedCategories.filter(c => c.id !== category.id)
            : [...selectedCategories, category]
        setSelectedCategories(newSelectedCategories)
        updateFilters()
    }

    const handleBrandClick = (brand: Brand) => {
        const newSelectedBrands = selectedBrands.some(b => b.id === brand.id)
            ? selectedBrands.filter(b => b.id !== brand.id)
            : [...selectedBrands, brand]
        setSelectedBrands(newSelectedBrands)
        updateFilters()
    }

    const clearFilters = () => {
        setSelectedBrands([])
        setSelectedCategories([])
        setSearchText('')
    }

    const activeFiltersCount = selectedBrands.length + selectedCategories.length + 
        (searchText ? 1 : 0)

    const handleChangePage = (page: number) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleChangeItemsPerPage = (value: string) => {
        setItemsPerPage(Number(value))
        setCurrentPage(1)
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 overflow-hidden">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-16 left-0 right-0 z-20 bg-[#38367D] shadow-md p-4">
                <div className="flex items-center w-full gap-2">
                    <div className="grid grid-cols-5 relative flex-1">
                        {/* Search column - 4/5 del espacio */}
                        <div className="col-span-4 ml-28 flex items-center justify-center gap-2">
                            <Search className="absolute left-32 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Buscar vehículos..."
                                value={searchText}
                                onChange={handleSearch}
                                className="pl-12 bg-white"
                            />
                        </div>
                        
                        {/* Menu button column - 1/5 del espacio */}
                        <div className="col-span-1 flex items-center justify-end">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden bg-white"
                            >
                                <List className="h-4 w-4" />Filtros
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar - Mobile Drawer */}
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetContent side="left" className="w-[280px] bg-white p-0">
                    <div className="p-4 space-y-4">
                        <SheetHeader className="px-2">
                            <SheetTitle>Filtros</SheetTitle>
                        </SheetHeader>
                        <div className="space-y-6">
                            {/* Categories */}
                            <div>
                                <div className="flex justify-between items-center mb-2 px-2">
                                    <h3 className="font-semibold">Categorías</h3>
                                    {selectedCategories.length > 0 && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setSelectedCategories([])}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    {categories.map(category => (
                                        <Button
                                            key={category.id ?? 'default'}
                                            variant={selectedCategories.some(c => c.id === category.id) 
                                                ? "default" 
                                                : "ghost"}
                                            className="w-full justify-between"
                                            onClick={() => handleCategoryClick(category)}
                                        >
                                            {category.name}
                                            {selectedCategories.some(c => c.id === category.id) && (
                                                <Badge variant="secondary" className="ml-2">✓</Badge>
                                            )}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {/* Brands */}
                            <div>
                                <div className="flex justify-between items-center mb-2 px-2">
                                    <h3 className="font-semibold">Marcas</h3>
                                    {selectedBrands.length > 0 && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setSelectedBrands([])}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    {brands.map(brand => (
                                        <Button
                                            key={brand.id ?? 'default'}
                                            variant={selectedBrands.some(b => b.id === brand.id) 
                                                ? "default" 
                                                : "ghost"}
                                            className={`w-full justify-between ${
                                                selectedBrands.some(b => b.id === brand.id) 
                                                    ? 'bg-black text-white hover:bg-black/90' 
                                                    : ''
                                            }`}
                                            onClick={() => handleBrandClick(brand)}
                                        >
                                            <span className="flex items-center gap-2">
                                                {brand.logo && (
                                                    <img 
                                                        src={brand.logo} 
                                                        alt={brand.name} 
                                                        className="w-6 h-6 object-contain"
                                                    />
                                                )}
                                                {brand.name}
                                            </span>
                                            {selectedBrands.some(b => b.id === brand.id) && (
                                                <Badge variant="secondary">✓</Badge>
                                            )}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-64 fixed top-16 bottom-0 bg-[#38367D] shadow-lg">
                <div className="flex flex-col h-full">
                    <div className="p-4 flex-1 overflow-auto">
                        <div className="flex justify-between items-center mb-4 pt-14">
                            <h2 className="text-lg font-semibold text-yellow-200">Categorías</h2>
                            {selectedCategories.length > 0 && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSelectedCategories([])}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                        <div className="space-y-2">
                            {categories.map(category => (
                                <Button
                                    key={category.id ?? 'default'}
                                    variant={selectedCategories.some(c => c.id === category.id) 
                                        ? "default" 
                                        : "ghost"}
                                    className="w-full justify-between text-white"
                                    onClick={() => handleCategoryClick(category)}
                                >
                                    <span className=" text-md">{category.name}</span>
                                    {selectedCategories.some(c => c.id === category.id) && (
                                        <Badge variant="secondary" className="ml-2">
                                            ✓
                                        </Badge>
                                    )}
                                </Button>
                            ))}
                        </div>
                    </div>
                    
                    {/* Sidebar Footer */}
                    <div className="p-4 border-t border-white/10">
                        <p className="text-xs text-center text-white/60">
                            © Oriental Ramirez {new Date().getFullYear()}
                            <br />
                            Todos los derechos reservados
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="pt-16 lg:pl-64 flex-1 lg:pt-0 pb-24">
                {/* Desktop Top Bar */}
                <div className="hidden lg:block fixed top-16 right-0 left-64 z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="p-4 space-y-4">
                        {/* Search and Clear Filters */}
                        <div className="relative max-w-2xl mx-auto flex gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Buscar vehículos..."
                                    value={searchText}
                                    onChange={handleSearch}
                                    className="pl-10 w-full bg-white"
                                />
                            </div>
                            {activeFiltersCount > 0 && (
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={clearFilters}
                                    className="whitespace-nowrap"
                                >
                                    Limpiar Filtros ({activeFiltersCount})
                                </Button>
                            )}
                        </div>

                        {/* Brands Scroll */}
                        <ScrollArea className="w-full whitespace-nowrap">
                            <div className="flex space-x-2 p-1">
                                {brands.map(brand => (
                                    <Button
                                        key={brand.id ?? 'default'}
                                        variant={selectedBrands.some(b => b.id === brand.id) 
                                            ? "default" 
                                            : "outline"}
                                        className={`flex items-center gap-2 ${
                                            selectedBrands.some(b => b.id === brand.id)
                                                ? 'bg-black text-white hover:bg-black/90'
                                                : 'bg-white'
                                        }`}
                                        onClick={() => handleBrandClick(brand)}
                                    >
                                        {brand.logo && (
                                            <img 
                                                src={brand.logo} 
                                                alt={brand.name} 
                                                className="w-6 h-6 object-contain"
                                            />
                                        )}
                                        {brand.name}
                                        {selectedBrands.some(b => b.id === brand.id) && (
                                            <Badge variant="secondary">✓</Badge>
                                        )}
                                    </Button>
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>
                </div>

                {/* Results Area */}
                <div className="lg:pt-36 p-4 lg:p-6">
                    {loading ? (
                        <div>Loading...</div>
                    ) : !isSearchActive && filteredVehicles.length === 0 ? (
                        null
                    ) : isSearchActive && filteredVehicles.length === 0 ? (
                        <EmptyResult setOpenDialog={setDialogOpen} />
                    ) : (
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
                                        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
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
                                                onClick={() => handleVehicleClick(vehicle)}
                                                className="cursor-pointer"
                                            >
                                                <VehicleCard
                                                    {...vehicle}
                                                    isDialogOpen={dialogOpen}
                                                    setIsDialogOpen={setDialogOpen}
                                                    onClick={() => handleVehicleClick(vehicle)}
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
                                        className="flex flex-col gap-4"
                                    >
                                        {currentItems.map((vehicle) => (
                                            <VehicleListItem
                                                key={vehicle.id}
                                                vehicle={vehicle}
                                                onClick={() => handleVehicleClick(vehicle)}
                                            />
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Desktop Pagination */}
                            <div className="hidden lg:flex fixed bottom-0 left-64 right-0 bg-white border-t p-4 z-50">
                                <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
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
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleChangePage(Math.max(1, currentPage - 1))}
                                                    disabled={currentPage === 1}
                                                    className="text-sm"
                                                >
                                                    Anterior
                                                </Button>
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
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleChangePage(Math.min(pageCount, currentPage + 1))}
                                                    disabled={currentPage === pageCount}
                                                    className="text-sm"
                                                >
                                                    Siguiente
                                                </Button>
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Mobile Pagination */}
                <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-2 z-50">
                    <div className="flex justify-center">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleChangePage(Math.max(1, currentPage - 1))}
                                        disabled={currentPage === 1}
                                        className="text-sm"
                                    >
                                        Anterior
                                    </Button>
                                </PaginationItem>
                                
                                <PaginationItem>
                                    <span className="px-4">
                                        {currentPage} de {pageCount}
                                    </span>
                                </PaginationItem>

                                <PaginationItem>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleChangePage(Math.min(pageCount, currentPage + 1))}
                                        disabled={currentPage === pageCount}
                                        className="text-sm"
                                    >
                                        Siguiente
                                    </Button>
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>
            </div>

            <VehicleDialog
                openDialog={dialogOpen}
                setOpenDialog={setDialogOpen}
            >
                {selectedVehicle && <VehicleView/>}
            </VehicleDialog>
        </div>
    )
}