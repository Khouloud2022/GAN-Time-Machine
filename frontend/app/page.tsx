"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { UploadImage } from "@/components/upload-image"
import { ImagePreview } from "@/components/image-preview"
import { ActionButtons } from "@/components/action-buttons"
import { ResultDisplay } from "@/components/result-display"
import { ErrorMessage } from "@/components/error-message"
import { predictAge, youngifyImage, ageImage } from "@/lib/api"

type LoadingState = "youngify" | "age" | "predict" | null
type ResultType = "image" | "age" | null

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [loading, setLoading] = useState<LoadingState>(null)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<{
    type: ResultType
    value: string | number | null
    label?: string
  }>({ type: null, value: null })

  const handleImageUpload = (base64: string) => {
    setUploadedImage(base64)
    setError(null)
    setResult({ type: null, value: null })
  }

  const handleClearImage = () => {
    setUploadedImage(null)
    setError(null)
    setResult({ type: null, value: null })
  }

  const handleYoungify = async () => {
    if (!uploadedImage) return
    setLoading("youngify")
    setError(null)

    const response = await youngifyImage(uploadedImage)

    if (response.success) {
      setResult({
        type: "image",
        value: response.data as string,
        label: "Image rajeunie",
      })
    } else {
      setError(response.error || "Erreur lors du rajeunissement")
    }
    setLoading(null)
  }

  const handleAge = async () => {
    if (!uploadedImage) return
    setLoading("age")
    setError(null)

    const response = await ageImage(uploadedImage)

    if (response.success) {
      setResult({
        type: "image",
        value: response.data as string,
        label: "Image vieillie",
      })
    } else {
      setError(response.error || "Erreur lors du vieillissement")
    }
    setLoading(null)
  }

  const handlePredictAge = async () => {
    if (!uploadedImage) return
    setLoading("predict")
    setError(null)

    const response = await predictAge(uploadedImage)

    if (response.success) {
      setResult({
        type: "age",
        value: response.data as number,
      })
    } else {
      setError(response.error || "Erreur lors de la prédiction")
    }
    setLoading(null)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Upload or Preview Section */}
          <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
            {!uploadedImage ? (
              <UploadImage onImageUpload={handleImageUpload} />
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ImagePreview
                    src={uploadedImage || "/placeholder.svg"}
                    label="Image originale"
                    onClear={handleClearImage}
                  />

                  {result.type && <ResultDisplay type={result.type} value={result.value} label={result.label} />}
                </div>

                {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}

                <ActionButtons
                  onYoungify={handleYoungify}
                  onAge={handleAge}
                  onPredictAge={handlePredictAge}
                  loading={loading}
                  disabled={!uploadedImage}
                />
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-6 rounded-2xl border border-border bg-card/50">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="font-semibold text-foreground mb-1">Rajeunissement</h3>
              <p className="text-sm text-muted-foreground">Transformez votre visage en version plus jeune</p>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-card/50">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⏳</span>
              </div>
              <h3 className="font-semibold text-foreground mb-1">Vieillissement</h3>
              <p className="text-sm text-muted-foreground">Visualisez votre apparence dans le futur</p>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-card/50">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold text-foreground mb-1">Prédiction d'âge</h3>
              <p className="text-sm text-muted-foreground">Estimez l'âge à partir d'une photo</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 px-4 border-t border-border/50 text-center">
        <p className="text-sm text-muted-foreground">ChronoForge © 2025 - Propulsé par l'intelligence artificielle</p>
      </footer>
    </div>
  )
}
