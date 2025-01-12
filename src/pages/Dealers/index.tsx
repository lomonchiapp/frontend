import { useState } from 'react'
import { DealersMap } from '@/components/dealers/DealersMap'
import { DealersList } from '@/components/dealers/Dealers'
import { AnimatedBackground } from '@/components/AnimatedBackground'
import { Dealer } from '@/types'

export default function Dealers() {
  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null)
  
  return (
    <div className="min-h-screen bg-transparent relative">
      <AnimatedBackground />
      <div className='w-full mb-6'>
        <DealersMap selectedDealer={selectedDealer} setSelectedDealer={setSelectedDealer} />
      </div>
      <div className='container mx-auto px-4 lg:px-8'>
        <div className='bg-white/80 backdrop-blur border border-gray-200 rounded-lg p-6 lg:p-8'>
          <h1 className='text-3xl font-bold text-center mb-8'>
            Encuentra tu sucursal más cercana
          </h1>
          <DealersList setSelectedDealer={setSelectedDealer} />
        </div>
      </div>
    </div>
  )
}

