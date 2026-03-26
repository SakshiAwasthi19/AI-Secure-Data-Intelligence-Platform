"use client";

import { useState } from "react";
import { ShieldAlert, Fingerprint, Lock, ShieldCheck } from "lucide-react";
import ScanForm from "@/components/ScanForm";
import ResultsDisplay from "@/components/ResultsDisplay";

export default function Home() {
  const [results, setResults] = useState(null);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <ShieldAlert className="text-white" size={20} />
            </div>
            <span className="font-black text-xl tracking-tight text-slate-800">
              SECURE<span className="text-blue-600">SCAN</span>
            </span>
          </div>
          <nav className="flex items-center space-x-6 text-sm font-medium text-slate-500">
            <span className="flex items-center space-x-1 cursor-default">
              <ShieldCheck size={16} className="text-emerald-500" />
              <span>Engine v1.0</span>
            </span>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Input */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-black text-slate-900 leading-tight">
                AI-Powered Security <br />
                <span className="text-blue-600 underline decoration-blue-200 underline-offset-8">Data Intelligence</span>
              </h1>
              <p className="text-slate-500 text-lg max-w-md leading-relaxed">
                Automatically detect PII, secrets, and credentials in your logs and documents before they become a liability.
              </p>
            </div>

            <ScanForm onResults={setResults} />

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center space-x-3 shadow-sm">
                <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600">
                  <Lock size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">Secure</p>
                  <p className="text-[10px] text-slate-400">Local isolation</p>
                </div>
              </div>
              <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center space-x-3 shadow-sm">
                <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                  <Fingerprint size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">Precise</p>
                  <p className="text-[10px] text-slate-400">Context aware</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="lg:sticky lg:top-28">
            <ResultsDisplay results={results} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 py-8 px-6 text-slate-500 mt-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-xs">
          <p>© 2026 AI Secure Data Intelligence Platform. Built with Hono & Next.js.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-white transition-colors cursor-pointer">Security Protocol</span>
            <span className="hover:text-white transition-colors cursor-pointer">API Docs</span>
            <span className="hover:text-white transition-colors cursor-pointer">v1.2.0-Alpha</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
