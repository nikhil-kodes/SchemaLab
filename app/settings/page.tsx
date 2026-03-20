"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { User, Mail, LogOut, AlertTriangle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Sidebar } from "@/components/dashboard/Sidebar"
import { createClient } from "@/lib/supabase/client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

export default function SettingsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null)
  
  const [displayName, setDisplayName] = useState("")
  const [deleteModal, setDeleteModal] = useState(false)
  
  useEffect(() => {
    async function loadUser() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser({ id: user.id, email: user.email })
        setDisplayName(user.user_metadata?.display_name || "")
      }
      setLoading(false)
    }
    loadUser()
  }, [])

  const handleSaveProfile = async () => {
    setSaving(true)
    const supabase = createClient()
    await supabase.auth.updateUser({
      data: { display_name: displayName }
    })
    setSaving(false)
  }

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth")
  }

  const handleDeleteAccount = async () => {
    // Note: Since Supabase anon key cannot delete users securely from the client, 
    // this would typically call a privileged serverless function.
    // For now, we simulate un-authenticating the user.
    alert("Account deletion requires admin privileges or an Edge Function with Service Role.")
    setDeleteModal(false)
  }

  if (loading) {
    return (
      <div className="flex h-screen bg-zinc-950">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-6 w-6 text-zinc-500 animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-zinc-950">
      <Sidebar />
      
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto p-8">
          <h1 className="text-2xl font-bold text-white mb-8">Settings</h1>
          
          {/* Profile Section */}
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-white mb-4">Profile</h2>
            <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6 space-y-6">
              
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Email Address
                </Label>
                <Input
                  id="email"
                  value={user?.email || ""}
                  disabled
                  className="bg-zinc-950 border-white/5 text-zinc-500"
                />
                <p className="text-xs text-zinc-500">Your email address cannot be changed.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="displayName" className="flex items-center gap-2">
                  <User className="h-4 w-4" /> Display Name
                </Label>
                <Input
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="How should we call you?"
                  className="bg-zinc-950"
                />
                <p className="text-xs text-zinc-500">Visible to collaborators in shared projects.</p>
              </div>

              <Button 
                onClick={handleSaveProfile} 
                disabled={saving}
                className="w-full sm:w-auto"
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </section>

          <Separator className="my-10 border-white/5" />

          {/* Danger Zone */}
          <section>
            <h2 className="text-lg font-semibold text-red-500 mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" /> Danger Zone
            </h2>
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-white">Sign Out</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Log out of your account on this device.
                </p>
              </div>
              <Button variant="outline" onClick={handleSignOut} className="gap-2">
                <LogOut className="h-4 w-4" /> Sign Out
              </Button>

              <Separator className="border-red-500/10 my-4" />

              <div>
                <h3 className="text-sm font-medium text-white">Delete Account</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Permanently delete your account and all associated projects. This action cannot be undone.
                </p>
              </div>
              <Button variant="destructive" onClick={() => setDeleteModal(true)}>
                Delete Account
              </Button>
            </div>
          </section>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModal} onOpenChange={setDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-400">Delete Account</DialogTitle>
            <DialogDescription>
              Are you absolute sure? This will permanently wipe your account and all of your projects.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-4">
            <Button variant="outline" onClick={() => setDeleteModal(false)} className="flex-1">
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAccount} className="flex-1">
              Yes, delete my account
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
