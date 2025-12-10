"use client"

import { Card } from "@/components/ui/card"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ResultsDisplayProps {
  image: string
  title: string
  description: string
}

export default function ResultsDisplay({ image, title, description }: ResultsDisplayProps) {
  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = image
    link.download = `${title.replace(/\s+/g, "-").toLowerCase()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Card className="border-2 border-purple-500/30 bg-slate-800/50 backdrop-blur overflow-hidden group hover:border-purple-500/60 transition-all duration-300">
      <div className="aspect-square bg-slate-900 flex items-center justify-center overflow-hidden relative">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <Button
            onClick={handleDownload}
            size="sm"
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
      <div className="p-4">
        <p className="text-slate-300 text-sm uppercase tracking-wider mb-1">{description}</p>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
    </Card>
  )
}
