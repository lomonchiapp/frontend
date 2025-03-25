import { useState } from 'react'
import { Car, ShoppingBag, Tag, Settings, ChevronUp, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthState } from '@/context/useAuthState'
import { useNavigate } from 'react-router-dom'
import { VehicleManager } from './VehicleManager'
import { motion, AnimatePresence } from 'framer-motion'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function AdminTopBar() {
  const { user } = useAuthState()
  const navigate = useNavigate()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVehicleManagerOpen, setIsVehicleManagerOpen] = useState(false)
  
  if (!user) return null

  const menuItems = [
    {
      icon: <Car className="h-5 w-5" />,
      label: 'Vehículos',
      onClick: () => setIsVehicleManagerOpen(true)
    },
    {
      icon: <ShoppingBag className="h-5 w-5" />,
      label: 'Marcas',
      onClick: () => navigate('/admin/marcas')
    },
    {
      icon: <Tag className="h-5 w-5" />,
      label: 'Categorías',
      onClick: () => navigate('/admin/categorias')
    }
  ]

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 20 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="relative">
            {/* Barra principal */}
            <motion.div
              animate={{
                width: isExpanded ? 'auto' : '48px',
                height: '48px',
                borderRadius: isExpanded ? '24px' : '9999px',
              }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-white shadow-lg border border-gray-200 overflow-hidden"
            >
              <div className="flex items-center h-full">
                {/* Botón de expansión */}
                <motion.button
                  whileHover={{ backgroundColor: '#f3f4f6' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="w-12 h-12 flex items-center justify-center text-red-600 relative z-10"
                >
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <ChevronUp className="h-6 w-6" />
                  </motion.div>
                </motion.button>

                {/* Menú de iconos */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ type: "spring", damping: 20 }}
                      className="flex items-center gap-1 pr-3 pl-1"
                    >
                      <div className="w-[1px] h-6 bg-gray-200 mx-1" />
                      <TooltipProvider>
                        {menuItems.map((item, index) => (
                          <Tooltip key={index}>
                            <TooltipTrigger asChild>
                              <motion.button
                                whileHover={{ scale: 1.1, backgroundColor: '#f3f4f6' }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                  item.onClick()
                                  setIsExpanded(false)
                                }}
                                className="p-2.5 rounded-full text-gray-700 hover:text-red-600 transition-colors"
                              >
                                {item.icon}
                              </motion.button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{item.label}</p>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </TooltipProvider>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <VehicleManager 
        open={isVehicleManagerOpen} 
        onOpenChange={setIsVehicleManagerOpen} 
      />
    </>
  )
} 