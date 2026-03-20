"use client"

import { useState } from "react"
import { Copy, Download, Code, Loader2 } from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Button } from "@/components/ui/button"
import { useSchemaStore } from "@/store/schemaStore"
import type { Language } from "@/types/schema"

const languages: { value: Language; label: string }[] = [
  { value: "sql", label: "SQL" },
  { value: "postgres", label: "PostgreSQL" },
  { value: "prisma", label: "Prisma" },
  { value: "drizzle", label: "Drizzle" },
  { value: "mongoose", label: "Mongoose" },
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
    <div className="flex h-full w-80 flex-col border-l border-white/5 bg-zinc-950">
      {/* Language tabs */}
      <div className="flex gap-1 border-b border-white/5 px-3 py-2 overflow-x-auto">
        {languages.map((lang) => (
          <button
            key={lang.value}
            onClick={() => setSelectedLanguage(lang.value)}
            className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-mono transition-colors cursor-pointer ${
              selectedLanguage === lang.value
                ? "bg-white/5 text-white"
                : "text-zinc-500 hover:text-white"
            }`}
          >
            {lang.label}
          </button>
        ))}
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
            <Code className="h-8 w-8 text-zinc-600 mb-3" />
            <p className="text-sm text-zinc-400">
              Add some tables to the canvas, then click Generate to see your
              code.
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 border-t border-white/5 p-3">
        <Button
          onClick={handleGenerate}
          disabled={isGenerating || nodes.length === 0}
          className="flex-1 text-xs"
          size="sm"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-1.5 h-3 w-3 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Code"
          )}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          disabled={!generatedCode}
          className="text-xs"
        >
          <Copy className="mr-1 h-3 w-3" />
          {copied ? "Copied!" : "Copy"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          disabled={!generatedCode}
          className="text-xs"
        >
          <Download className="mr-1 h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}
