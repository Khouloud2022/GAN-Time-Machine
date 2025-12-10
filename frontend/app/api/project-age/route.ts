export async function POST(request: Request) {
  try {
    console.log("[v0] API route received request")

    // Get the form data from the client
    const formData = await request.formData()
    console.log("[v0] FormData received:", {
      hasFile: formData.has("file"),
      generationType: formData.get("generation_type"),
    })

    // Forward the request to your FastAPI backend
    const fastApiUrl = process.env.FASTAPI_URL || "http://localhost:8000"
    console.log("[v0] Calling FastAPI at:", fastApiUrl)

    const fastApiResponse = await fetch(`${fastApiUrl}/api/project-age`, {
      method: "POST",
      body: formData,
    })

    console.log("[v0] FastAPI response status:", fastApiResponse.status)

    if (!fastApiResponse.ok) {
      const errorText = await fastApiResponse.text()
      console.log("[v0] FastAPI error:", errorText)
      return Response.json({ error: "Failed to process image" }, { status: fastApiResponse.status })
    }

    const data = await fastApiResponse.json()
    console.log("[v0] FastAPI response received successfully")

    return Response.json(data)
  } catch (error) {
    console.error("[v0] API route error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
