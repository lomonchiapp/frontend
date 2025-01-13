import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { LogIn, PhoneCall, Menu } from 'lucide-react'
import { useThemeState } from '@/context/useThemeState'
import { AboutDialog } from '../AboutUs/AboutDialog'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

function NavLinks() {
  const { setAbout } = useThemeState()
  return (
    <>
      <Link 
        to="/catalogo" 
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        Catálogo
      </Link>
      <Link
        to="#" 
        onClick={() => setAbout(true)} 
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        Nosotros
      </Link>
      <Link 
        to="/sucursales" 
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        Sucursales
      </Link>
      <Link 
        to="/financiamiento" 
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        Financiamiento
      </Link>
    </>
  )
}

export function Header() {
  const { about, setAbout } = useThemeState()

  return (
    <header className="px-4 lg:px-10 sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="relative z-10">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="h-28 md:h-32 pt-2 mt-14 w-auto"
            />
          </Link>
          <nav className="hidden lg:flex items-center gap-8">
            <NavLinks />
          </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="hidden md:flex items-center gap-2"
          >
            <LogIn className="h-4 w-4" />
            <span className="hidden sm:inline">Acceder</span>
          </Button>

          <Button 
            variant="default" 
            size="sm" 
            className="hidden sm:flex items-center gap-2 bg-red-500 hover:bg-red-600"
          >
            <PhoneCall className="h-4 w-4" />
            <span>Contactar Ventas</span>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-white sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <NavLinks />
                <div className="flex flex-col gap-2 mt-4">
                  <Button variant="outline" size="sm" className="justify-start">
                    <LogIn className="h-4 w-4 mr-2" />
                    Acceder
                  </Button>
                  <Button variant="default" size="sm" className="justify-start bg-red-500 hover:bg-red-600">
                    <PhoneCall className="h-4 w-4 mr-2" />
                    Contactar Ventas
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <AboutDialog open={about} onOpenChange={setAbout} />
    </header>
  )
}

