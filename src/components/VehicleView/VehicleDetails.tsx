
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Vehicle } from "@/types"

interface VehicleDetailsProps {
  vehicle: Vehicle | null
}

export function VehicleDetails({ vehicle }: VehicleDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-4"
    >
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary" className="text-lg">
          {vehicle?.cc} cc
        </Badge>
        <Badge variant="outline" className="text-lg">
          {vehicle?.category.name}
        </Badge>
        <Badge variant="default" className="text-lg">
          {vehicle?.brand?.name}
        </Badge>
      </div>
      {/* Add more vehicle details here */}
    </motion.div>
  )
}

