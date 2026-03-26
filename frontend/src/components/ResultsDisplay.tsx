"use client";

import React from 'react';
import { Shield, AlertTriangle, Info, CheckCircle, ShieldCheck, FileSearch, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Finding {
  patternId: string;
  patternName: string;
  category: string;
  matchedText: string;
  lineNumber: number;
  lineContent: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'None';
}

interface ResultsDisplayProps {
  results: {
    timestamp: string;
    sourceType: string;
    totalFindings: number;
    findings: Finding[];
    overallSeverity: 'Critical' | 'High' | 'Medium' | 'Low' | 'None';
  } | null;
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  if (!results) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-100 rounded-xl bg-slate-50 text-slate-400">
        <FileSearch size={48} className="mb-4 opacity-50" />
        <p className="text-sm">Scan results will appear here</p>
      </div>
    );
  }

  const severityColors = {
    Critical: 'bg-red-600 text-white',
    High: 'bg-orange-500 text-white',
    Medium: 'bg-amber-400 text-slate-900',
    Low: 'bg-blue-400 text-white',
    None: 'bg-emerald-500 text-white',
  };

  const severityIcons = {
    Critical: <AlertTriangle size={24} className="text-red-200" />,
    High: <AlertTriangle size={24} className="text-orange-200" />,
    Medium: <Info size={24} className="text-amber-100" />,
    Low: <Info size={24} className="text-blue-100" />,
    None: <ShieldCheck size={24} className="text-emerald-100" />,
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Risk Summary Card */}
      <div className={cn(
        "p-6 rounded-2xl flex items-center justify-between shadow-lg text-white",
        results.overallSeverity === 'Critical' ? "bg-gradient-to-br from-red-600 to-rose-700" :
        results.overallSeverity === 'High' ? "bg-gradient-to-br from-orange-500 to-amber-600" :
        results.overallSeverity === 'Medium' ? "bg-gradient-to-br from-amber-400 to-orange-400 text-slate-900" :
        results.overallSeverity === 'Low' ? "bg-gradient-to-br from-blue-500 to-indigo-600" :
        "bg-gradient-to-br from-emerald-500 to-teal-600"
      )}>
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            {severityIcons[results.overallSeverity]}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-0.5">Overall Security Risk</p>
            <h2 className="text-3xl font-black tracking-tight">{results.overallSeverity}</h2>
          </div>
        </div>
        <div className="text-right">
          <div className="text-4xl font-black">{results.totalFindings}</div>
          <div className="text-xs font-medium uppercase tracking-widest opacity-80">Findings Detected</div>
        </div>
      </div>

      {/* Findings List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
          <Shield size={20} className="text-blue-600" />
          <span>Detailed Findings ({results.totalFindings})</span>
        </h3>

        {results.findings.length === 0 ? (
          <div className="p-12 text-center bg-white border border-slate-200 rounded-xl">
            <CheckCircle className="mx-auto h-12 w-12 text-emerald-500 mb-4" />
            <h4 className="text-lg font-semibold text-slate-800">Clear Scan</h4>
            <p className="text-slate-500 text-sm">No sensitive patterns detected in this input.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {results.findings.map((finding, idx) => (
              <div 
                key={idx} 
                className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 transition-all hover:shadow-md"
              >
                <div className="flex items-center justify-between p-4 bg-slate-50/50">
                  <div className="flex items-center space-x-3">
                    <span className={cn(
                      "px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider",
                      severityColors[finding.severity]
                    )}>
                      {finding.severity}
                    </span>
                    <span className="font-bold text-slate-800 text-sm">{finding.patternName}</span>
                    <span className="text-slate-400 text-xs px-2 py-0.5 bg-slate-100 rounded border border-slate-200 font-medium">{finding.category}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-400">
                    <Hash size={14} />
                    <span className="text-xs font-mono font-bold">Line {finding.lineNumber}</span>
                  </div>
                </div>
                
                <div className="p-4 space-y-3">
                  <div className="bg-slate-900 rounded-lg p-3 font-mono text-sm overflow-x-auto border-l-4 border-blue-500">
                    <div className="flex space-x-3">
                      <span className="text-slate-500 select-none w-4">{finding.lineNumber}</span>
                      <code className="text-slate-300 whitespace-pre">
                        {finding.lineContent.split(finding.matchedText).map((part, i, arr) => (
                          <React.Fragment key={i}>
                            {part}
                            {i < arr.length - 1 && (
                              <span className="bg-red-500/30 text-red-200 px-1 py-0.5 rounded border border-red-400/30 font-bold">
                                {finding.matchedText}
                              </span>
                            )}
                          </React.Fragment>
                        ))}
                      </code>
                    </div>
                  </div>
                  <div className="flex items-center text-[10px] text-slate-400 font-medium uppercase tracking-widest pl-1">
                    <span className="text-blue-500 mr-2">Matched Segment:</span>
                    <span className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded">{finding.matchedText}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
