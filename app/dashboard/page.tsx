import { Metadata } from "next"
import { Sidebar } from "@/components/dashboard/Sidebar"
import { ProjectGrid } from "@/components/dashboard/ProjectGrid"

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
}

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-zinc-950">
      <Sidebar />
      <ProjectGrid />
    </div>
  )
}
