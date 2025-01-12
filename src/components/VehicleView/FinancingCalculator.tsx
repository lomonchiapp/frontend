import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { motion } from "framer-motion"
import { Vehicle } from "@/types"
import { useNewAppState } from '@/hooks/context/global/useNewAppState'

interface FinancingCalculatorProps {
  vehicle: Vehicle | null
}

export function FinancingCalculator({ vehicle }: FinancingCalculatorProps) {
  const { 
    initialDeposit, 
    financingMonths, 
    setInitialDeposit, 
    setFinancingMonths 
  } = useNewAppState()

  const calculateMonthlyPayment = () => {
    if (!vehicle) return 0
    const amountToFinance = vehicle.salePrice - initialDeposit
    return amountToFinance / financingMonths
  }

  const monthlyPayment = calculateMonthlyPayment()
  const minInitDeposit = vehicle?.salePrice ? vehicle.salePrice * 0.3 : 0

  const handleDepositChange = (value: number) => {
    if (vehicle && value >= minInitDeposit && value <= vehicle.salePrice) {
      setInitialDeposit(value)
    }
  }

  const handleTimeChange = (value: string) => {
    setFinancingMonths(parseInt(value))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <Label htmlFor="init-deposit">Depósito Inicial</Label>
          <Slider
            id="init-deposit"
            min={minInitDeposit}
            max={vehicle?.salePrice || 0}
            step={1000}
            value={[initialDeposit]}
            onValueChange={(value) => handleDepositChange(value[0])}
          />
          <Input
            type="number"
            value={initialDeposit}
            onChange={(e) => handleDepositChange(Number(e.target.value))}
          />
        </div>
        <div className="space-y-4">
          <Label htmlFor="financing-time">Tiempo de Financiamiento</Label>
          <Select value={financingMonths.toString()} onValueChange={handleTimeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione los meses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6">6 meses</SelectItem>
              <SelectItem value="12">12 meses</SelectItem>
              <SelectItem value="18">18 meses</SelectItem>
              <SelectItem value="24">24 meses</SelectItem>
              <SelectItem value="36">36 meses</SelectItem>
              <SelectItem value="48">48 meses</SelectItem>
              <SelectItem value="60">60 meses</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Concepto</TableHead>
            <TableHead className="text-right">Monto</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Precio de Venta</TableCell>
            <TableCell className="text-right">RD$ {vehicle?.salePrice?.toLocaleString() || 0}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Depósito Inicial</TableCell>
            <TableCell className="text-right">RD$ {initialDeposit.toLocaleString()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Monto a Financiar</TableCell>
            <TableCell className="text-right">
              RD$ {(vehicle?.salePrice ? vehicle.salePrice - initialDeposit : 0).toLocaleString()}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Pago Mensual</TableCell>
            <TableCell className="text-right">
              RD$ {monthlyPayment.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </motion.div>
  )
}

