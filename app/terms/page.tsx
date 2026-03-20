import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service",
}

export default function TermsPage() {
  return (
    <div className="page-bg min-h-screen p-8 md:p-24 bg-background text-foreground">
      <div className="max-w-3xl mx-auto prose prose-invert">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-muted-foreground mb-6">Last updated: March 21, 2026</p>
        
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">1. Agreement to Terms</h2>
          <p>By accessing or using SchemaLab, you agree to be bound by these Terms of Service. If you do not agree to all terms, you must not use our service.</p>
          
          <h2 className="text-2xl font-semibold">2. Description of Service</h2>
          <p>SchemaLab is a visual database design tool that allows you to create schemas, collaborate with others, and export code. The service is provided &quot;as is.&quot;</p>
          
          <h2 className="text-2xl font-semibold">3. User Conduct</h2>
          <p>You are responsible for your projects, comments, and interactions. We do not tolerate illegal conduct, harassment, or misuse of our platform.</p>
          
          <h2 className="text-2xl font-semibold">4. Collaboration</h2>
          <p>By sharing a project link, you understand that other authorized users can view and edit your schemas. SchemaLab is not responsible for any changes made by those you choose to collaborate with.</p>
          
          <h2 className="text-2xl font-semibold">5. Termination</h2>
          <p>We reserve the right to suspend or terminate your access to SchemaLab at our discretion, without notice, if we believe you are in violation of these terms.</p>
        </section>
      </div>
    </div>
  )
}
