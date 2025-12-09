import { Suspense } from "react"
import Clients from "@/components/kokonutui/clients"
import ClientsIntermediary from "@/components/kokonutui/clients-intermediary"

// Check if this is the new intermediary portal
// This can be set via environment variable or URL detection
const isIntermediaryPortal = process.env.NEXT_PUBLIC_INTERMEDIARY_PORTAL === 'true'

export default function ClientsPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading clients...</div>}>
      {isIntermediaryPortal ? <ClientsIntermediary /> : <Clients />}
    </Suspense>
  )
}



