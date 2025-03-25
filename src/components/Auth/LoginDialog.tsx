import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, KeyRound } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useAuthState } from '@/context/useAuthState'
import { FIREBASE_AUTH } from '@/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

export function LoginDialog() {
  const { loginDialogOpen, setLoginDialogOpen, setUser } = useAuthState()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      const userCredential = await signInWithEmailAndPassword(
        FIREBASE_AUTH, 
        email, 
        password
      )
      setUser(userCredential.user)
      setLoginDialogOpen(false)
    } catch (err: any) {
      console.error(err)
      let errorMessage = 'Error al iniciar sesión'
      
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        errorMessage = 'Credenciales incorrectas. Por favor verifique.'
      } else if (err.code === 'auth/too-many-requests') {
        errorMessage = 'Demasiados intentos. Inténtelo más tarde.'
      } else if (err.code === 'auth/network-request-failed') {
        errorMessage = 'Error de conexión. Verifique su internet.'
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen}>
      <DialogContent className="sm:max-w-[425px] bg-white shadow-lg animate-in fade-in-50 zoom-in-90 slide-in-from-bottom-10 duration-300">
        <DialogHeader className="text-center pb-2">
          <div className="mx-auto mb-4 flex items-center justify-center">
            <img 
              src="/logo.png" 
              alt="Oriental Ramirez" 
              className="h-20 w-auto"
            />
          </div>
          <DialogTitle className="text-2xl font-bold text-red-600">Acceso Administrativo</DialogTitle>
          <DialogDescription className="text-center">
            Motoprestamos Oriental Ramirez
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleLogin}>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
                required
                disabled={loading}
                placeholder="admin@orientalramirez.com"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="col-span-3"
                required
                disabled={loading}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-red-600 hover:bg-red-700"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verificando...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <KeyRound className="h-4 w-4" />
                  Acceder
                </div>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 