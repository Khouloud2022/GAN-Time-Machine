"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import ImageUpload from "@/components/image-upload"
import ResultsDisplay from "@/components/results-display"
import GenerationOptions from "@/components/generation-options"
import { useTheme } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-provider"

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<{
    predictedAge: number | null
    younger: string | null
    older: string | null
  }>({
    predictedAge: null,
    younger: null,
    older: null,
  })
  const [generationType, setGenerationType] = useState<"younger" | "older" | "both">("both")
  const { theme } = useTheme()

  const handleImageUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string)
      setResults({ predictedAge: null, younger: null, older: null })
    }
    reader.readAsDataURL(file)
  }

  const handleGenerate = async () => {
    if (!uploadedImage) return

    setIsLoading(true)
    try {
      // Convert base64 to blob
      const response = await fetch(uploadedImage)
      const blob = await response.blob()

      // Create FormData
      const formData = new FormData()
      formData.append("file", blob, "image.jpg")
      formData.append("generation_type", generationType)

      const apiResponse = await fetch("/api/project-age", {
        method: "POST",
        body: formData,
      })

      if (!apiResponse.ok) {
        throw new Error("Failed to process image")
      }

      const data = await apiResponse.json()
      setResults({
        predictedAge: data.predicted_age,
        younger: data.younger_image || null,
        older: data.older_image || null,
      })
    } catch (error) {
      console.error("[v0] Error:", error)
      alert("Failed to process image. Make sure FastAPI server is running.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main
      className={`min-h-screen overflow-hidden transition-colors duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white"
          : "bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 text-slate-900"
      }`}
    >
      <div className="fixed inset-0 opacity-20 pointer-events-none overflow-hidden">
        {/* Gear decoration elements */}
        {theme === "dark" && (
          <>
            <div className="absolute top-20 left-10 w-32 h-32 border-4 border-amber-600/30 rounded-full animate-gear">
              <div className="absolute inset-4 border-2 border-amber-600/20 rounded-full"></div>
            </div>
            <div
              className="absolute bottom-32 right-20 w-24 h-24 border-4 border-purple-600/30 rounded-full animate-gear"
              style={{ animationDirection: "reverse" }}
            ></div>
          </>
        )}

        {/* Floating orbs with time-warp effect */}
        <div
          className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl animate-float animate-time-pulse ${
            theme === "dark" ? "bg-amber-600/20" : "bg-amber-300/20"
          }`}
        ></div>
        <div
          className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl animate-float-delayed animate-time-pulse ${
            theme === "dark" ? "bg-purple-600/20" : "bg-purple-300/20"
          }`}
        ></div>
        <div
          className={`absolute top-1/2 right-0 w-72 h-72 rounded-full blur-3xl animate-float-slow animate-time-pulse ${
            theme === "dark" ? "bg-blue-600/20" : "bg-amber-200/20"
          }`}
        ></div>
      </div>

      <ThemeToggle />

      <div className="relative z-10 container mx-auto px-4 py-8 lg:py-12">
        <div className="text-center mb-12">
          <h1
            className={`text-5xl lg:text-7xl font-bold mb-4 tracking-wider ${
              theme === "dark"
                ? "bg-gradient-to-r from-amber-400 via-orange-400 to-purple-400 bg-clip-text text-transparent neon-glow"
                : "bg-gradient-to-r from-orange-600 via-amber-600 to-purple-600 bg-clip-text text-transparent"
            }`}
          >
            ⏰ GAN TIME MACHINE ⏰
          </h1>
          <p
            className={`text-lg tracking-wider digital-font ${theme === "dark" ? "text-amber-300/80" : "text-orange-700/80"}`}
          >
            TEMPORAL TRANSFORMATION ENGINE
          </p>
        </div>

        {/* Main content */}
        {!uploadedImage ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <ImageUpload onImageUpload={handleImageUpload} />
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Original Image */}
            <div className="flex flex-col justify-center">
              <Card
                className={`border-2 overflow-hidden group transition-all duration-300 ${
                  theme === "dark"
                    ? "border-cyan-500/30 bg-slate-800/50 hover:border-cyan-500/60"
                    : "border-blue-300/50 bg-white/50 hover:border-blue-400/60"
                } backdrop-blur`}
              >
                <div
                  className={`aspect-square flex items-center justify-center overflow-hidden ${
                    theme === "dark" ? "bg-slate-900" : "bg-slate-100"
                  }`}
                >
                  <img
                    src={uploadedImage || "/placeholder.svg"}
                    alt="Original"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Card>
              <div className="mt-4 text-center">
                <p
                  className={`text-sm uppercase tracking-wider mb-2 ${
                    theme === "dark" ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  Uploaded Image
                </p>
                {results.predictedAge !== null && (
                  <p className={`text-2xl font-bold ${theme === "dark" ? "text-cyan-400" : "text-blue-600"}`}>
                    Age: {results.predictedAge}
                  </p>
                )}
              </div>
            </div>

            {/* Loading or Results */}
            <div>
              {isLoading ? (
                <div className="h-full flex flex-col items-center justify-center gap-4">
                  <div className="animate-spin">
                    <Loader2 className={`w-16 h-16 ${theme === "dark" ? "text-cyan-400" : "text-blue-600"}`} />
                  </div>
                  <p className={theme === "dark" ? "text-slate-300" : "text-slate-600"}>
                    Generating transformations...
                  </p>
                  <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                    {generationType === "both"
                      ? "Creating younger and older versions"
                      : `Creating ${generationType} version`}
                  </p>
                </div>
              ) : results.younger || results.older ? (
                <div className="space-y-6">
                  {results.younger && (
                    <ResultsDisplay
                      image={results.younger}
                      title="Younger You"
                      description="Your age projected backward"
                      theme={theme}
                    />
                  )}
                  {results.older && (
                    <ResultsDisplay
                      image={results.older}
                      title="Older You"
                      description="Your age projected forward"
                      theme={theme}
                    />
                  )}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <GenerationOptions
                    generationType={generationType}
                    onTypeChange={setGenerationType}
                    onGenerate={handleGenerate}
                    theme={theme}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Controls */}
        {uploadedImage && !results.younger && !results.older && !isLoading && (
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => {
                setUploadedImage(null)
                setResults({ predictedAge: null, younger: null, older: null })
              }}
              variant="outline"
              className={
                theme === "dark"
                  ? "border-slate-500 text-slate-300 hover:bg-slate-700"
                  : "border-slate-300 text-slate-700 hover:bg-slate-100"
              }
            >
              Upload New Image
            </Button>
          </div>
        )}

        {(results.younger || results.older) && (
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => {
                setUploadedImage(null)
                setResults({ predictedAge: null, younger: null, older: null })
              }}
              className={
                theme === "dark"
                  ? "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              }
            >
              Try Another Image
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}
