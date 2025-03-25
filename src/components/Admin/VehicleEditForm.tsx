import { useEffect, useState } from "react";
import { useVehicleUpdate } from "@/hooks/vehicles/useVehicleUpdate";
import { Vehicle, Brand, VehicleCategory } from "@/types/interfaces/vehicle";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface VehicleEditFormProps {
  vehicle: Vehicle;
  brands: Brand[];
  categories: VehicleCategory[];
  onUpdate?: () => void;
}

export function VehicleEditForm({ vehicle, brands, categories, onUpdate }: VehicleEditFormProps) {
  const [formData, setFormData] = useState<Vehicle>({ ...vehicle });
  const { updateVehicle, updating, error } = useVehicleUpdate();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    setFormData({ ...vehicle });
  }, [vehicle]);

  const handleInputChange = (field: keyof Vehicle, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage(null);
    
    try {
      await updateVehicle(formData);
      setSuccessMessage("Vehículo actualizado con éxito");
      onUpdate?.();
    } catch (err) {
      // El error ya es manejado por el hook
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {successMessage && (
        <Alert variant="default" className="bg-green-50 border-green-200 text-green-800">
          <AlertCircle className="h-4 w-4 text-green-500" />
          <AlertTitle>Actualizado</AlertTitle>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre</Label>
          <Input 
            id="name" 
            value={formData.name || ''} 
            onChange={(e) => handleInputChange('name', e.target.value)} 
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="brand">Marca</Label>
          <Select 
            value={formData.brand?.id || ''} 
            onValueChange={(value) => {
              const selectedBrand = brands.find(b => b.id === value);
              if (selectedBrand) {
                handleInputChange('brand', selectedBrand);
              }
            }}
          >
            <SelectTrigger id="brand">
              <SelectValue placeholder="Seleccionar marca" />
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

        <div className="space-y-2">
          <Label htmlFor="category">Categoría</Label>
          <Select 
            value={formData.category?.id || ''} 
            onValueChange={(value) => {
              const selectedCategory = categories.find(c => c.id === value);
              if (selectedCategory) {
                handleInputChange('category', selectedCategory);
              }
            }}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Seleccionar categoría" />
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

        <div className="space-y-2">
          <Label htmlFor="cc">Cilindraje (cc)</Label>
          <Input 
            id="cc" 
            value={formData.cc || ''} 
            onChange={(e) => handleInputChange('cc', e.target.value)} 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="initPrice">Precio Inicial</Label>
          <Input 
            id="initPrice" 
            type="number" 
            value={formData.initPrice || 0} 
            onChange={(e) => handleInputChange('initPrice', Number(e.target.value))} 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="salePrice">Precio Total</Label>
          <Input 
            id="salePrice" 
            type="number" 
            value={formData.salePrice || 0} 
            onChange={(e) => handleInputChange('salePrice', Number(e.target.value))} 
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">Cantidad</Label>
          <Input 
            id="quantity" 
            type="number" 
            value={formData.quantity || 0} 
            onChange={(e) => handleInputChange('quantity', Number(e.target.value))} 
          />
        </div>

        <div className="flex items-center space-x-2 h-full pt-8">
          <Checkbox 
            id="isInexhaustible" 
            checked={formData.isInexhaustible || false}
            onCheckedChange={(checked) => handleInputChange('isInexhaustible', Boolean(checked))}
          />
          <Label htmlFor="isInexhaustible">Inventario inagotable</Label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea 
          id="description" 
          value={formData.description || ''} 
          onChange={(e) => handleInputChange('description', e.target.value)} 
          rows={4}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit" disabled={updating}>
          {updating ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </div>
    </form>
  );
} 