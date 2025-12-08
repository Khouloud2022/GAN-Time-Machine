const API_BASE_URL = "http://127.0.0.1:5000"

export interface ApiResponse {
  success: boolean
  data?: string | number
  error?: string
}

export async function predictAge(imageBase64: string): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/predict_age`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: imageBase64 }),
    })

    if (!response.ok) throw new Error("Erreur lors de la prédiction")

    const data = await response.json()
    return { success: true, data: data.age }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

export async function youngifyImage(imageBase64: string): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/youngify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: imageBase64 }),
    })

    if (!response.ok) throw new Error("Erreur lors du rajeunissement")

    const data = await response.json()
    return { success: true, data: data.image }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

export async function ageImage(imageBase64: string): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/aging`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: imageBase64 }),
    })

    if (!response.ok) throw new Error("Erreur lors du vieillissement")

    const data = await response.json()
    return { success: true, data: data.image }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}
