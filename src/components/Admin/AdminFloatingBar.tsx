import { Car, ShoppingBag, Tag, Store, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthState } from '@/context/useAuthState'
import { useNavigate } from 'react-router-dom'

export function AdminTopBar() {
  const { user } = useAuthState()
  const navigate = useNavigate()

  if (!user) return null

  return (
    <div className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white py-1.5 px-4 z-40 border-b border-red-900">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-shrink-0 flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <span className="font-medium text-sm">Panel de Administración</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-white/20"
            onClick={() => navigate('/admin/vehiculos')}
          >
            <Car className="h-4 w-4 mr-2" />
            Vehículos
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-white/20"
            onClick={() => navigate('/admin/marcas')}
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Marcas
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-white/20"
            onClick={() => navigate('/admin/categorias')}
          >
            <Tag className="h-4 w-4 mr-2" />
            Categorías
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-white/20"
            onClick={() => navigate('/admin/sucursales')}
          >
            <Store className="h-4 w-4 mr-2" />
            Sucursales
          </Button>
        </div>
      </div>
    </div>
  )
} 