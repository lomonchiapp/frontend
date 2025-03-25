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
    <motion.div 
      className="space-y-[3%] px-[2%] sm:px-[4%] md:px-[6%] py-[2%] rounded-[2rem] shadow-2xl
        bg-gradient-to-r from-[#38367D] via-[#4b47a1] to-[#38367D]
        animate-gradient-x bg-[length:200%_200%]
        border border-white/10 backdrop-blur-sm
        w-full max-w-full md:max-w-[90%] mx-auto relative
        before:absolute before:inset-0 before:rounded-[2rem]
        before:bg-gradient-to-r before:from-white/5 before:to-transparent
        before:backdrop-blur-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute -inset-[0.5%] bg-gradient-to-r from-white/20 to-transparent rounded-[2rem] blur-sm" />
      
      <div className="relative space-y-6">
        <div className="space-y-2">
          <h2 className="text-5xl font-bold text-center text-white tracking-tight">
            Encuentra tu vehículo ideal
          </h2>
          <h4 className='text-center text-gray-200/80 text-lg'>
            Comienza tu búsqueda aquí
          </h4>
        </div>

        <div className="relative max-w-[90%] mx-auto">
          <div className="absolute -inset-[0.5%] bg-gradient-to-r from-white/20 to-white/10 rounded-xl blur-sm" />
          
          <div className="relative">
            <Input
              type="text"
              id="search-input"
              placeholder="Busca un Modelo / Marca"
              value={searchText}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className="h-auto min-h-[3.5rem] px-[3%] py-[1.5%] rounded-xl font-medium bg-white/10 backdrop-blur-md
                text-white placeholder:text-white/50 border-white/20
                transition-all duration-300 
                focus:bg-white focus:text-black focus:border-white
                focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#38367D]"
              ref={inputRef}
            />
          </div>
        </div>

        <div className="mt-8 relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-white/10 to-transparent rounded-xl blur-sm" />
          
          <div className="relative">
            <VehicleFilter />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

