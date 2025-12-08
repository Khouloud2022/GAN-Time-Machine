"use client"

import { AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorMessageProps {
  message: string
  onDismiss: () => void
}

export function ErrorMessage({ message, onDismiss }: ErrorMessageProps) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive">
      <AlertCircle className="w-5 h-5 flex-shrink-0" />
      <p className="flex-1 text-sm">{message}</p>
      <Button variant="ghost" size="icon" onClick={onDismiss} className="h-8 w-8 hover:bg-destructive/20">
        <X className="w-4 h-4" />
      </Button>
    </div>
  )
}
