"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface GenerationOptionsProps {
  generationType: "younger" | "older" | "both"
  onTypeChange: (type: "younger" | "older" | "both") => void
  onGenerate: () => void
}

export default function GenerationOptions({ generationType, onTypeChange, onGenerate }: GenerationOptionsProps) {
  return (
    <Card className="border-2 border-slate-600/50 bg-slate-800/50 backdrop-blur p-8 w-full">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">What would you like to see?</h3>
          <div className="space-y-3">
            {[
              { value: "younger" as const, label: "Younger Me", description: "See yourself younger" },
              { value: "older" as const, label: "Older Me", description: "See yourself older" },
              { value: "both" as const, label: "Both", description: "See both versions" },
            ].map((option) => (
              <label
                key={option.value}
                className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  generationType === option.value
                    ? "border-cyan-500 bg-cyan-500/10"
                    : "border-slate-600/30 hover:border-slate-500"
                }`}
              >
                <input
                  type="radio"
                  name="generation"
                  value={option.value}
                  checked={generationType === option.value}
                  onChange={() => onTypeChange(option.value)}
                  className="w-4 h-4 accent-cyan-500"
                />
                <div className="ml-4">
                  <p className="font-medium text-white">{option.label}</p>
                  <p className="text-sm text-slate-400">{option.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <Button
          onClick={onGenerate}
          className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-700 text-white"
        >
          Generate Transformation
        </Button>
      </div>
    </Card>
  )
}
