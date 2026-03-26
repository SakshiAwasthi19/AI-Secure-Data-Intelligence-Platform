"use client";

import React from 'react';
import { Sparkles, ShieldAlert, Target, Lightbulb, ShieldX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIInsightsCardProps {
  summary: string;
  insights: string[];
  riskScore: number;
  riskLevel: string;
  action: 'blocked' | 'masked' | 'allowed';
}

export default function AIInsightsCard({ summary, insights, riskScore, riskLevel, action }: AIInsightsCardProps) {
  const isBlocked = action === 'blocked';

  return (
    <div className="relative overflow-hidden rounded-3xl border border-indigo-200/50 bg-white shadow-xl shadow-indigo-100/20">
      {/* Background Glows */}
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-200">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <h4 className="text-xl font-black text-slate-800 tracking-tight">AI Security Insights</h4>
                {isBlocked && (
                  <span className="inline-flex items-center space-x-1.5 rounded-full bg-red-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-red-600 border border-red-200">
                    <ShieldX size={12} />
                    <span>Policy Blocked</span>
                  </span>
                )}
              </div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">Analysis by Gemini Flash 1.5</p>
            </div>
          </div>

          <div className="flex items-center gap-4 self-end md:self-auto">
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Risk Score</p>
              <div className="flex items-baseline space-x-1">
                <span className={cn(
                  "text-4xl font-black tabular-nums tracking-tighter",
                  riskScore > 75 ? "text-red-500" : riskScore > 40 ? "text-orange-500" : "text-emerald-500"
                )}>
                  {riskScore}
                </span>
                <span className="text-sm font-bold text-slate-300">/ 100</span>
              </div>
            </div>
            <div className={cn(
              "h-12 w-1.5 rounded-full",
              riskScore > 75 ? "bg-red-500" : riskScore > 40 ? "bg-orange-500" : "bg-emerald-500"
            )} />
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-12">
            <div className="rounded-2xl bg-slate-50 p-6 border border-slate-100">
              <div className="flex items-center space-x-2 mb-3">
                <Target className="h-4 w-4 text-indigo-500" />
                <span className="text-xs font-black uppercase tracking-widest text-slate-500">Executive Summary</span>
              </div>
              <p className="text-slate-700 leading-relaxed font-medium">
                {summary || "Analyzing security posture..."}
              </p>
            </div>
          </div>

          {insights.length > 0 && (
            <div className="md:col-span-12">
              <div className="flex items-center space-x-2 mb-4 pl-1">
                <Lightbulb className="h-4 w-4 text-amber-500" />
                <span className="text-xs font-black uppercase tracking-widest text-slate-500">Key Risk Callouts</span>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {insights.map((insight, idx) => (
                  <div key={idx} className="flex space-x-3 p-3 rounded-xl bg-white border border-slate-100 shadow-sm hover:border-indigo-100 transition-colors">
                    <div className="flex-shrink-0 mt-1">
                      <ShieldAlert className="h-4 w-4 text-indigo-400" />
                    </div>
                    <span className="text-sm text-slate-600 font-medium">{insight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
