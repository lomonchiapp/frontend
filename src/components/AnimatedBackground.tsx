import React from 'react'
import { motion } from 'framer-motion'

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900"
        animate={{
          background: [
            'linear-gradient(to bottom right, #E6F3FF, #F0E6FF)',
            'linear-gradient(to bottom right, #E6FFFA, #FFE6E6)',
            'linear-gradient(to bottom right, #FFF0E6, #E6F3FF)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
      />
      <div className="absolute inset-0 opacity-50 dark:opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNjY2MiPjwvcmVjdD4KPC9zdmc+')] bg-repeat" />
    </div>
  )
}

