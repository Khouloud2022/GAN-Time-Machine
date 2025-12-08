"use client"

import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImagePreviewProps {
  src: string
  label: string
  onClear?: () => void
}

export function ImagePreview({ src, label, onClear }: ImagePreviewProps) {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-border bg-card">
      <div className="absolute top-3 left-3 z-10 px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
        {label}
      </div>
      {onClear && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onClear}
          className="absolute top-3 right-3 z-10 bg-background/80 backdrop-blur-sm hover:bg-destructive hover:text-destructive-foreground rounded-full w-8 h-8"
        >
          <X className="w-4 h-4" />
        </Button>
      )}
      <div className="relative aspect-square">
        <Image src={src || "/placeholder.svg"} alt={label} fill className="object-cover" />
      </div>
    </div>
  )
}
