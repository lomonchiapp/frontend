import { AboutContent } from "./AboutContent"
import { AboutSlider } from "./AboutSlider"

export function About() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start justify-between p-6">
      <div className="lg:w-1/2">
        <h2 className="text-2xl font-bold mb-4">Nosotros</h2>
        <AboutContent />
      </div>
      <div className="lg:w-1/2">
        <AboutSlider />
      </div>
    </div>
  )
}

