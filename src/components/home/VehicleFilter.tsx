import { Button } from "@/components/ui/button"
import { X, Filter } from 'lucide-react'
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useGlobalState } from '@/hooks/context/global/useGlobalState'
import { useVehicleFilter } from "@/hooks/context/global/useVehicleFilter"
import { Brand, VehicleCategory } from "@/types"
import { ScrollArea } from "@/components/ui/scroll-area"

export function VehicleFilter() {
  const { brands, categories, vehicles } = useGlobalState()
  const {
    selectedBrands,
    selectedCategories,
    setSelectedBrands,
    setSelectedCategories,
    setMinInitPrice,
    setMaxInitPrice,
    setMinSalePrice,
    setMaxSalePrice,
    minInitPrice,
    maxInitPrice,
    minSalePrice,
    maxSalePrice,
    updateFilters
  } = useVehicleFilter()

  // Calcular precios máximos para los sliders
  const maxInitPriceValue = Math.max(...vehicles.map(v => v.initPrice || 0))
  const maxSalePriceValue = Math.max(...vehicles.map(v => v.salePrice || 0))

  const handleBrandToggle = (brand: Brand) => {
    const newSelectedBrands = selectedBrands.some(b => b.id === brand.id)
      ? selectedBrands.filter(b => b.id !== brand.id)
      : [...selectedBrands, brand]
    setSelectedBrands(newSelectedBrands)
    updateFilters()
  }

  const handleCategoryToggle = (category: VehicleCategory) => {
    const newSelectedCategories = selectedCategories.some(c => c.id === category.id)
      ? selectedCategories.filter(c => c.id !== category.id)
      : [...selectedCategories, category]
    setSelectedCategories(newSelectedCategories)
    updateFilters()
  }

  const handleResetFilters = () => {
    setSelectedBrands([])
    setSelectedCategories([])
    setMinInitPrice(0)
    setMaxInitPrice(0)
    setMinSalePrice(0)
    setMaxSalePrice(0)
    updateFilters()
  }

  const activeFiltersCount = selectedBrands.length + selectedCategories.length + 
    (minInitPrice > 0 ? 1 : 0) + (maxInitPrice > 0 ? 1 : 0) +
    (minSalePrice > 0 ? 1 : 0) + (maxSalePrice > 0 ? 1 : 0)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-center bg-red-500 border-red-500 border-2 text-white"
        >
          <span className="flex items-center">
            <Filter className="h-4 w-4 mr-2 color-yellow" />
            Busqueda Avanzada
          </span>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary">{activeFiltersCount}</Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] bg-white sm:w-[540px] p-0">
        <SheetHeader className="p-6 pb-2">
          <SheetTitle>Filtros de Búsqueda</SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)] px-6">
          <div className="space-y-8 pb-8">
            <div className="space-y-4">
              <Label className="text-base">Marcas</Label>
              <div className="grid grid-cols-2 gap-2">
                {brands.map((brand) => (
                  <div key={brand.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`brand-${brand.id}`}
                      checked={selectedBrands.some(b => b.id === brand.id)}
                      onCheckedChange={() => handleBrandToggle(brand)}
                    />
                    <label htmlFor={`brand-${brand.id}`}>{brand.name}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-base">Categorías</Label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={selectedCategories.some(c => c.id === category.id)}
                      onCheckedChange={() => handleCategoryToggle(category)}
                    />
                    <label htmlFor={`category-${category.id}`}>{category.name}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-base">Precio Inicial</Label>
              <div className="space-y-6">
                <div className="px-2">
                  <Label className="text-sm text-gray-500">Mínimo</Label>
                  <Slider
                    defaultValue={[0]}
                    max={maxInitPriceValue}
                    step={1000}
                    value={[minInitPrice]}
                    onValueChange={([value]) => {
                      setMinInitPrice(value)
                      updateFilters()
                    }}
                  />
                  <div className="mt-1 text-sm text-gray-500">
                    Desde ${minInitPrice.toLocaleString()}
                  </div>
                </div>

                <div className="px-2">
                  <Label className="text-sm text-gray-500">Máximo</Label>
                  <Slider
                    defaultValue={[0]}
                    max={maxInitPriceValue}
                    step={1000}
                    value={[maxInitPrice]}
                    onValueChange={([value]) => {
                      setMaxInitPrice(value)
                      updateFilters()
                    }}
                  />
                  <div className="mt-1 text-sm text-gray-500">
                    Hasta ${maxInitPrice.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-base">Precio de Venta</Label>
              <div className="space-y-6">
                <div className="px-2">
                  <Label className="text-sm text-gray-500">Mínimo</Label>
                  <Slider
                    defaultValue={[0]}
                    max={maxSalePriceValue}
                    step={1000}
                    value={[minSalePrice]}
                    onValueChange={([value]) => {
                      setMinSalePrice(value)
                      updateFilters()
                    }}
                  />
                  <div className="mt-1 text-sm text-gray-500">
                    Desde ${minSalePrice.toLocaleString()}
                  </div>
                </div>

                <div className="px-2">
                  <Label className="text-sm text-gray-500">Máximo</Label>
                  <Slider
                    defaultValue={[0]}
                    max={maxSalePriceValue}
                    step={1000}
                    value={[maxSalePrice]}
                    onValueChange={([value]) => {
                      setMaxSalePrice(value)
                      updateFilters()
                    }}
                  />
                  <div className="mt-1 text-sm text-gray-500">
                    Hasta ${maxSalePrice.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        {activeFiltersCount > 0 && (
          <div className="p-6 pt-2 border-t">
            <Button
              variant="destructive"
              size="sm"
              className="w-full"
              onClick={handleResetFilters}
            >
              <X className="h-4 w-4 mr-1" />
              Limpiar filtros
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
} 