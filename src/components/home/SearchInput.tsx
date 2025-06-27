import React, { useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { useVehicleFilter } from '@/hooks/context/global/useVehicleFilter'
import { VehicleFilter } from './VehicleFilter'

interface SearchInputProps {
  inputRef: React.RefObject<HTMLInputElement>
  onSearchActiveChange: (isActive: boolean) => void
}

export function SearchInput({ inputRef, onSearchActiveChange }: SearchInputProps) {
  const {
    searchText,
    setSearchText,
    isSearchActive,
    updateFilters
  } = useVehicleFilter()

  useEffect(() => {
    onSearchActiveChange(isSearchActive)
  }, [isSearchActive, onSearchActiveChange])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
    updateFilters()
  }

  const handleInputFocus = () => {
    window.scrollTo({
      top: window.innerHeight * 0.3,
      behavior: 'smooth'
    })
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
      {/* Contenedor principal del buscador */}
      <motion.div 
        className="relative overflow-hidden rounded-2xl md:rounded-3xl
          bg-gradient-to-br from-[#39367D] via-[#4a47a1] to-[#39367D]
          shadow-xl md:shadow-2xl
          border border-white/20 backdrop-blur-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Efecto de brillo sutil */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/5 opacity-50" />
        
        <div className="relative p-6 sm:p-8 md:p-10 space-y-6">
          {/* Títulos */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Encuentra tu vehículo ideal
            </h2>
            <p className='text-sm sm:text-base md:text-lg text-white/80'>
              Comienza tu búsqueda aquí
            </p>
          </div>

          {/* Input de búsqueda */}
          <div className="relative max-w-2xl mx-auto">
            <div className="relative group">
              <Input
                type="text"
                id="search-input"
                placeholder="Busca un Modelo / Marca"
                value={searchText}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                className="h-12 sm:h-14 md:h-16 px-4 sm:px-6 py-3 sm:py-4 
                  rounded-xl md:rounded-2xl text-base sm:text-lg font-medium 
                  bg-white/95 backdrop-blur-md text-gray-800 
                  placeholder:text-gray-500 border-0
                  transition-all duration-300 ease-in-out
                  focus:bg-white focus:scale-[1.02] focus:shadow-lg
                  focus:ring-4 focus:ring-white/30"
                ref={inputRef}
              />
              {/* Sombra del input */}
              <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-white/20 blur-sm -z-10 group-focus-within:blur-md transition-all duration-300" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Botón de filtros avanzados - Fuera del contenedor principal */}
      <motion.div 
        className="-mt-2  flex justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="w-full max-w-xs sm:max-w-sm">
          <VehicleFilter />
        </div>
      </motion.div>
    </div>
  )
}

