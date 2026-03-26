"use client";

import React, { useState } from 'react';
import { Upload, FileText, Send, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScanFormProps {
  onResults: (results: any) => void;
}

export default function ScanForm({ onResults }: ScanFormProps) {
  const [activeTab, setActiveTab] = useState<'text' | 'file'>('text');
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async () => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      
      if (activeTab === 'text') {
        if (!text.trim()) throw new Error('Please enter some text to scan.');
        formData.append('text', text);
        formData.append('sourceType', 'text');
      } else {
        if (!file) throw new Error('Please select a file to scan.');
        formData.append('file', file);
        // extension handling is done on backend, but we can hint if we want
      }

      const response = await fetch('http://localhost:3001/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Scan failed');
      }

      const results = await response.json();
      onResults(results);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('text')}
          className={cn(
            "flex-1 flex items-center justify-center space-x-2 py-2 text-sm font-medium rounded-md transition-all",
            activeTab === 'text' ? "bg-white shadow-sm text-blue-600" : "text-slate-500 hover:bg-slate-50"
          )}
        >
          <FileText size={18} />
          <span>Manual Text</span>
        </button>
        <button
          onClick={() => setActiveTab('file')}
          className={cn(
            "flex-1 flex items-center justify-center space-x-2 py-2 text-sm font-medium rounded-md transition-all",
            activeTab === 'file' ? "bg-white shadow-sm text-blue-600" : "text-slate-500 hover:bg-slate-50"
          )}
        >
          <Upload size={18} />
          <span>File Upload</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm min-h-[300px] flex flex-col">
        {activeTab === 'text' ? (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste text, code, or logs here..."
            className="flex-1 w-full p-4 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-slate-700 font-mono text-sm leading-relaxed"
          />
        ) : (
          <div 
            className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-lg hover:border-blue-400 transition-colors bg-slate-50 relative group cursor-pointer"
            onClick={() => document.getElementById('fileInput')?.click()}
          >
            <input 
              id="fileInput" 
              type="file" 
              className="hidden" 
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              accept=".pdf,.doc,.docx,.txt,.log"
            />
            <div className="text-center p-8">
              <Upload className="mx-auto h-12 w-12 text-slate-400 group-hover:text-blue-500 transition-colors" />
              <p className="mt-4 text-sm font-medium text-slate-700">
                {file ? file.name : "Drop or click to upload security log"}
              </p>
              <p className="mt-1 text-xs text-slate-500 uppercase tracking-widest">
                PDF, DOC, DOCX, TXT, LOG (Max 5MB)
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            {activeTab === 'text' ? `${text.length} characters` : (file ? `${(file.size / 1024).toFixed(1)} KB` : 'No file selected')}
          </div>
          <button
            onClick={handleScan}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Send size={18} className="group-hover:translate-x-1 transition-transform" />
            )}
            <span>{loading ? 'Analyzing...' : 'Scan Now'}</span>
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center space-x-2 text-red-600 text-sm">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
}
