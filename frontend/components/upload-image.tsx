"use client"

import type React from "react"

import { useCallback } from "react"
import { Upload, ImageIcon } from "lucide-react"

interface UploadImageProps {
  onImageUpload: (base64: string) => void
}

export function UploadImage({ onImageUpload }: UploadImageProps) {
  const handleFileChange = useCallback(
    (file: File) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result as string
        onImageUpload(base64)
      }
      reader.readAsDataURL(file)
    },
    [onImageUpload],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const file = e.dataTransfer.files[0]
      if (file && file.type.startsWith("image/")) {
        handleFileChange(file)
      }
    },
    [handleFileChange],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        handleFileChange(file)
      }
    },
    [handleFileChange],
  )

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="relative border-2 border-dashed border-border rounded-2xl p-12 text-center transition-all duration-300 hover:border-primary/60 hover:bg-muted/30 cursor-pointer group"
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Upload className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
        <div>
          <p className="text-lg font-medium text-foreground">Glissez-déposez une image ici</p>
          <p className="text-sm text-muted-foreground mt-1">ou cliquez pour sélectionner</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ImageIcon className="w-4 h-4" />
          <span>PNG, JPG, WEBP</span>
        </div>
      </div>
    </div>
  )
}
