"use client";

import React, { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#F3F3F3]/80 backdrop-blur-md border-b border-gray-200/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-[#1D1D1D] flex items-center justify-center text-[#F0FD63] font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <polygon points="12 2 22 20 2 20" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-2xl tracking-tight text-[#1D1D1D]">
              arcv
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#919EAB] -mt-1 font-mono">
              Financial Archive
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#como-funciona" className="hover:text-[#1D1D1D] transition-colors">
            Como Funciona
          </a>
          <a href="#pilares" className="hover:text-[#1D1D1D] transition-colors">
            Pilares
          </a>
          <a href="#comparativo" className="hover:text-[#1D1D1D] transition-colors">
            Comparativo
          </a>
          <a href="#faq" className="hover:text-[#1D1D1D] transition-colors">
            FAQ
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#login"
            className="text-sm font-semibold text-gray-700 hover:text-[#1D1D1D] px-3 py-2 transition-colors"
          >
            Entrar
          </a>
          <a
            href="#teste"
            className="inline-flex items-center gap-2 bg-[#1D1D1D] hover:bg-black text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Testar na Minha Empresa</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F0FD63]" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-200/60"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F3F3F3] border-b border-gray-200 px-4 pt-3 pb-6 space-y-4">
          <nav className="flex flex-col gap-3 text-sm font-medium text-gray-700">
            <a
              href="#como-funciona"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 hover:text-[#1D1D1D]"
            >
              Como Funciona
            </a>
            <a
              href="#pilares"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 hover:text-[#1D1D1D]"
            >
              Pilares
            </a>
            <a
              href="#comparativo"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 hover:text-[#1D1D1D]"
            >
              Comparativo
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 hover:text-[#1D1D1D]"
            >
              FAQ
            </a>
          </nav>
          <div className="pt-2 border-t border-gray-200">
            <a
              href="#teste"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-[#1D1D1D] text-white font-bold text-xs py-3 rounded-full text-center"
            >
              <span>Testar na Minha Empresa</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F0FD63]" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
