import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
}

export default function PrivacyPage() {
  return (
    <div className="page-bg min-h-screen p-8 md:p-24 bg-background text-foreground">
      <div className="max-w-3xl mx-auto prose prose-invert">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-muted-foreground mb-6">Last updated: March 21, 2026</p>
        
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
          <p>We collect information you provide directly to us when you create an account, design schemas, or contact us. This includes your email address, project data, and any comments or collaboration data you share on the platform.</p>
          
          <h2 className="text-2xl font-semibold">2. How We Use Information</h2>
          <p>We use the information to provide, maintain, and improve SchemaLab. This includes enabling real-time collaboration, saving your projects, and providing updates about our service.</p>
          
          <h2 className="text-2xl font-semibold">3. Data Security</h2>
          <p>We take reasonable measures to protect your personal information from loss, theft, misuse, and unauthorized access. Your account is protected by Supabase's secure authentication system.</p>
          
          <h2 className="text-2xl font-semibold">4. Cookies</h2>
          <p>We use cookies to maintain your session and remember your preferences (like your theme choice).</p>
        </section>
      </div>
    </div>
  )
}
