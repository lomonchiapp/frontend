import { useState, useEffect } from "react"
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
import { NumericFormat } from "react-number-format"

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

  const [inputValue, setInputValue] = useState(initialDeposit.toString())
  const [minInitDeposit, setMinInitDeposit] = useState(vehicle?.initPrice || 0)
  const gpsCharge = 7000
  const interestRate = 0.03 // 3% mensual

  const MIN_MONTHS = 1
  const MAX_MONTHS = 18

  const calculateMonthlyPayment = () => {
    if (!vehicle) return 0
    const amountToFinance = vehicle.salePrice - initialDeposit
    const totalInterest = amountToFinance * interestRate * financingMonths
    const totalAmount = amountToFinance + totalInterest + gpsCharge
    return totalAmount / financingMonths
  }

  useEffect(() => {
    setMinInitDeposit(vehicle?.salePrice ? vehicle.salePrice * 0.3 : 0)
  }, [vehicle])

  const monthlyPayment = calculateMonthlyPayment()

  // Actualizar el input cuando cambie initialDeposit (por el slider)
  useEffect(() => {
    setInputValue(initialDeposit.toString())
  }, [initialDeposit])

  const handleDepositChange = (value: number) => { 
    if (vehicle && value >= minInitDeposit && value <= vehicle?.salePrice || 0) {
      setInitialDeposit(value)
      setInputValue(value.toString())
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value) // Actualizar el input inmediatamente

    const numValue = Number(value)
    if (!isNaN(numValue) && vehicle) {
      // Solo actualizar el depósito si el valor es válido
      if (numValue >= minInitDeposit && numValue <= vehicle?.salePrice || 0) {
        setInitialDeposit(numValue)
      }
    }
  }

  const handleMonthsChange = (value: number[]) => {
    setFinancingMonths(value[0])
  }

  const handleMonthsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (!isNaN(value)) {
      if (value < MIN_MONTHS) {
        setFinancingMonths(MIN_MONTHS)
      } else if (value > MAX_MONTHS) {
        setFinancingMonths(MAX_MONTHS)
      } else {
        setFinancingMonths(value)
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-2 gap-4 border-gray-400">
        <div className="space-y-4">
          <Label htmlFor="init-deposit">Depósito Inicial</Label>
          <Slider
            id="init-deposit"
            min={minInitDeposit}
            max={vehicle?.salePrice}
            step={100}
            value={[initialDeposit]}
            onValueChange={(value) => handleDepositChange(value[0])}
          />
          <NumericFormat
            id="deposit-input"
            value={inputValue}
            prefix="RD$"
            thousandSeparator=","
            decimalSeparator="."
            onChange={handleInputChange}
            onBlur={() => {
              const numValue = Number(inputValue)
              if (isNaN(numValue) || numValue < minInitDeposit) {
                handleDepositChange(minInitDeposit)
              } else if (numValue > (vehicle?.salePrice || 0)) {
                handleDepositChange(vehicle?.salePrice || 0)
              } else {
                handleDepositChange(numValue)
              }
            }}
            className="mt-2 w-40 border-gray-400 rounded-md border-input h-9 px-3 py-1 border"
          />
        </div>
        <div className="space-y-4">
          <Label htmlFor="financing-time">Tiempo de Financiamiento</Label>
          <div className="flex-1">
              <Slider
                id="months-slider"
                min={MIN_MONTHS}
                max={MAX_MONTHS}
                step={1}
                value={[financingMonths]}
                onValueChange={handleMonthsChange}
              />
            </div>
            
          
          <div className="flex items-center gap-4">
            <div className="relative w-40">
              <NumericFormat
                id="financing-time"
                value={financingMonths}
                thousandSeparator=","
                decimalSeparator="."
                min={MIN_MONTHS}
                max={MAX_MONTHS}
                onChange={handleMonthsInputChange}
                className="w-full border-gray-400 rounded-md border-input h-9 px-3 py-1 border pr-14"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                {financingMonths === 1 ? "mes" : "meses"}
              </span>
            </div>
          </div>
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
            <TableCell>Precio del Vehículo</TableCell>
            <TableCell className="text-right">
              RD$ {vehicle?.salePrice?.toLocaleString() || 0}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Depósito Inicial</TableCell>
            <TableCell className="text-right">
              RD$ {initialDeposit.toLocaleString()}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Monto a Financiar</TableCell>
            <TableCell className="text-right">
              RD$ {(vehicle?.salePrice ? vehicle.salePrice - initialDeposit : 0).toLocaleString()}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-medium">Pago Mensual</TableCell>
            <TableCell className="text-right font-medium">
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

