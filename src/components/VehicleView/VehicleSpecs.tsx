
import { motion } from "framer-motion"
import { Vehicle } from "@/types/types"

interface VehicleSpecsProps {
  vehicle: Vehicle | null
}

export function VehicleSpecs({ vehicle }: VehicleSpecsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="space-y-4"
    >
      <h3 className="text-xl font-semibold">Especificaciones Técnicas</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>Cilindrada: {vehicle?.cc} cc</li>
        <li>Categoría: {vehicle?.category.name}</li>
        <li>Marca: {vehicle?.brand.name}</li>
        {/* Add more specifications here */}
      </ul>
    </motion.div>
  )
}

