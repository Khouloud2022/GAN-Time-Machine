"use client"

import { Sparkles, Clock, CalendarDays, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ActionButtonsProps {
  onYoungify: () => void
  onAge: () => void
  onPredictAge: () => void
  loading: "youngify" | "age" | "predict" | null
  disabled: boolean
}

export function ActionButtons({ onYoungify, onAge, onPredictAge, loading, disabled }: ActionButtonsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Button
        onClick={onYoungify}
        disabled={disabled || loading !== null}
        className="h-14 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20"
      >
        {loading === "youngify" ? (
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
        ) : (
          <Sparkles className="w-5 h-5 mr-2" />
        )}
        Rajeunir
      </Button>

      <Button
        onClick={onAge}
        disabled={disabled || loading !== null}
        className="h-14 rounded-xl bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-secondary-foreground font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-secondary/20"
      >
        {loading === "age" ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Clock className="w-5 h-5 mr-2" />}
        Vieillir
      </Button>

      <Button
        onClick={onPredictAge}
        disabled={disabled || loading !== null}
        variant="outline"
        className="h-14 rounded-xl border-2 border-primary/50 hover:border-primary hover:bg-primary/10 text-foreground font-semibold transition-all duration-300 hover:scale-[1.02] bg-transparent"
      >
        {loading === "predict" ? (
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
        ) : (
          <CalendarDays className="w-5 h-5 mr-2" />
        )}
        Prédire l'âge
      </Button>
    </div>
  )
}
