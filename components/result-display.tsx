"use client"

import { ImagePreview } from "./image-preview"
import { CalendarDays } from "lucide-react"

interface ResultDisplayProps {
  type: "image" | "age" | null
  value: string | number | null
  label?: string
}

export function ResultDisplay({ type, value, label }: ResultDisplayProps) {
  if (!type || value === null) return null

  if (type === "age") {
    return (
      <div className="flex flex-col items-center justify-center p-8 rounded-2xl border border-primary/30 bg-primary/5">
        <CalendarDays className="w-12 h-12 text-primary mb-4" />
        <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Âge prédit</p>
        <p className="text-6xl font-bold text-primary">
          {value}
          <span className="text-2xl ml-2 text-muted-foreground">ans</span>
        </p>
      </div>
    )
  }

  return <ImagePreview src={(value as string) || "/placeholder.svg"} label={label || "Résultat"} />
}
