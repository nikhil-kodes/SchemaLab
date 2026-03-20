"use client"

import { useState } from "react"
import { Copy, Download, Code, Loader2, Check } from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Button } from "@/components/ui/button"
import { useSchemaStore } from "@/store/schemaStore"
import type { Language } from "@/types/schema"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const languages: { value: Language; label: string }[] = [
  { value: "sql", label: "SQL" },
  { value: "postgres", label: "PostgreSQL" },
  { value: "prisma", label: "Prisma" },
  { value: "drizzle", label: "Drizzle (TS)" },
  { value: "mongoose", label: "Mongoose (JS)" },
]

const langToSyntax: Record<Language, string> = {
  sql: "sql",
  postgres: "sql",
  prisma: "prisma",
  drizzle: "typescript",
  mongoose: "javascript",
}

const langToExt: Record<Language, string> = {
  sql: ".sql",
  postgres: ".sql",
  prisma: ".prisma",
  drizzle: ".ts",
  mongoose: ".js",
}

interface CodePanelProps {
  projectName: string
}

export function CodePanel({ projectName }: CodePanelProps) {
  const {
    selectedLanguage,
    setSelectedLanguage,
    generatedCode,
    setGeneratedCode,
    isGenerating,
    setIsGenerating,
    nodes,
    edges,
  } = useSchemaStore()
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges, language: selectedLanguage }),
      })
      if (res.ok) {
        const data = await res.json()
        setGeneratedCode(data.code)
      }
    } catch (err) {
      console.error("Generation failed:", err)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const ext = langToExt[selectedLanguage]
    const blob = new Blob([generatedCode], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${projectName || "schema"}${ext}`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex h-full w-80 flex-col border-l border-border bg-card">
      {/* Language select */}
      <div className="p-3 border-b border-border bg-muted/50">
        <Select
          value={selectedLanguage}
          onValueChange={(val) => setSelectedLanguage(val as Language)}
        >
          <SelectTrigger className="h-8 w-full font-mono text-xs">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.value} value={lang.value} className="font-mono text-xs">
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Code area */}
      <div className="flex-1 overflow-y-auto">
        {generatedCode ? (
          <SyntaxHighlighter
            language={langToSyntax[selectedLanguage]}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: "1rem",
              background: "transparent",
              fontSize: "12px",
              lineHeight: "1.6",
            }}
            wrapLongLines
          >
            {generatedCode}
          </SyntaxHighlighter>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <Code className="h-8 w-8 text-muted-foreground mb-3 opacity-40" />
            <p className="text-sm text-muted-foreground">
              Add some tables to the canvas, then click Generate to see your
              code.
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex border-t border-border">
        <button
          onClick={handleGenerate}
          disabled={isGenerating || nodes.length === 0}
          className="flex-1 bg-foreground text-background text-sm font-medium py-2.5 rounded-none hover:bg-foreground/90 flex items-center justify-center disabled:opacity-50 transition-colors"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate"
          )}
        </button>
        <button
          onClick={handleCopy}
          disabled={!generatedCode}
          className="border-l border-border text-muted-foreground hover:text-foreground text-sm px-4 bg-muted/50 disabled:opacity-50 transition-colors flex items-center justify-center"
          title="Copy to clipboard"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
        <button
          onClick={handleDownload}
          disabled={!generatedCode}
          className="border-l border-border text-muted-foreground hover:text-foreground text-sm px-4 bg-muted/50 disabled:opacity-50 transition-colors flex items-center justify-center"
          title="Download file"
        >
          <Download className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
