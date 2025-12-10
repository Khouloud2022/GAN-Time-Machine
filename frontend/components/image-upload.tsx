"use client"

import type React from "react"

import { Upload } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useRef } from "react"

interface ImageUploadProps {
  onImageUpload: (file: File) => void
}

export default function ImageUpload({ onImageUpload }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length > 0) {
      onImageUpload(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      onImageUpload(files[0])
    }
  }

  return (
    <Card
      className="w-full max-w-md border-4 border-dashed bg-gradient-to-br transition-all cursor-pointer group shadow-2xl"
      style={{
        borderColor: "var(--color-amber-500, oklch(0.65 0.22 50))",
        backgroundColor: "rgba(120, 53, 15, 0.1)",
      }}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => fileInputRef.current?.click()}
    >
      <div className="p-12 flex flex-col items-center justify-center gap-4 text-center">
        <div className="p-4 bg-gradient-to-br from-amber-500/30 to-purple-500/20 rounded-full group-hover:from-amber-500/50 group-hover:to-purple-500/40 transition-all border-2 border-amber-400/30">
          <Upload className="w-8 h-8 text-amber-400" />
        </div>
        <div>
          <p className="text-lg font-semibold font-bold tracking-wider">UPLOAD TEMPORAL IMAGE</p>
          <p className="text-sm opacity-70 digital-font">Drag & drop or click to select</p>
        </div>
        <p className="text-xs opacity-50 digital-font">JPG, PNG • Max 10MB</p>
      </div>
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
    </Card>
  )
}
