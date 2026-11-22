"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { IsometricBackground } from "./IsometricBackground";

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center pt-2 pb-8 px-4 sm:px-6 lg:px-12 overflow-hidden bg-ambient-glow">
      {/* Desktop: 3D Isometric Animation as Full Hero Background on the right */}
      <div className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-0">
        <IsometricBackground />
      </div>

      {/* 10% Accent Neon Radial Ambient Aura */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#F0FD63]/25 blur-3xl pointer-events-none -z-10" />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-center h-full py-4 sm:py-6">
        <div className="max-w-xl lg:max-w-2xl text-left">
          {/* Subtle Category Pill */}
          <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-xs text-[#1D1D1D] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-5 sm:mb-6 border border-gray-200/80 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#F0FD63]" />
            <span>Conciliação Financeira & Livro Razão</span>
          </div>

          {/* Short, Direct Headline (Focused on Total Financial Reconciliation) */}
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[52px] font-extrabold tracking-tight text-[#1D1D1D] leading-[1.14]">
            Toda a sua movimentação financeira.{" "}
            <span className="relative inline-block">
              <span className="relative z-10">100% conciliada.</span>
              <span
                className="absolute left-0 bottom-1 w-full h-3 bg-[#F0FD63] -z-0 rounded-sm"
                style={{ transform: "rotate(-1deg)" }}
              />
            </span>
          </h1>

          {/* Concise 2-Line Subtitle */}
          <p className="mt-4 sm:mt-5 text-sm sm:text-base text-gray-600 font-normal leading-relaxed max-w-lg">
            Conecte bancos, adquirentes e ERP em minutos. O Arcv audita cada
            entrada e saída no seu livro razão em tempo real. Sem furos de
            caixa e sem planilhas manuais.
          </p>

          {/* CTA: 30% Obsidian Dark Pill */}
          <div className="mt-6 sm:mt-7 flex items-center">
            <a
              href="#teste"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1D1D1D] hover:bg-black text-white text-xs sm:text-sm font-bold px-8 py-3.5 rounded-full shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all text-center"
            >
              <span>Começar Agora</span>
              <ArrowRight className="w-4 h-4 text-[#F0FD63]" />
            </a>
          </div>

          {/* Micro-Trust Indicators */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-gray-200/80 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-gray-500 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#1D1D1D]" />
              <span>Auditoria 3-Way</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#F0FD63] border border-[#1D1D1D]/20" />
              <span>Zero saldo duplicado</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Setup em 10 minutos</span>
            </div>
          </div>
        </div>

        {/* Mobile-Only 3D Diorama: Positioned cleanly below the copy with zero text obstruction */}
        <div className="lg:hidden w-full h-[280px] sm:h-[340px] mt-4 relative flex items-center justify-center pointer-events-none">
          <IsometricBackground />
        </div>
      </div>
    </section>
  );
}
