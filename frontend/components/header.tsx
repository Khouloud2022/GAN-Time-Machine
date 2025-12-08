import Image from "next/image"

export function Header() {
  return (
    <header className="w-full py-6 px-4 border-b border-border/50">
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-4">
        <Image src="/images/image.png" alt="ChronoForge Logo" width={60} height={60} className="rounded-full" />
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary tracking-wide">ChronoForge</h1>
          <p className="text-sm text-muted-foreground">Transformation d'âge par IA</p>
        </div>
      </div>
    </header>
  )
}
