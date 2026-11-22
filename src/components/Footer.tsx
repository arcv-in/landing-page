"use client";

import React from "react";

export function Footer() {
  return (
    <footer className="bg-[#111111] text-gray-400 border-t border-white/10 py-12 text-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[#F0FD63] font-bold text-xs border border-white/10">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <polygon points="12 2 22 20 2 20" />
              </svg>
            </div>
            <div>
              <span className="font-extrabold text-base text-white tracking-tight">
                arcv
              </span>
              <span className="text-[10px] text-gray-400 block -mt-1 font-mono">
                Financial Archive
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-300">
            <a href="#como-funciona" className="hover:text-[#F0FD63] transition-colors">
              Como Funciona
            </a>
            <a href="#pilares" className="hover:text-[#F0FD63] transition-colors">
              Pilares
            </a>
            <a href="#comparativo" className="hover:text-[#F0FD63] transition-colors">
              Comparativo
            </a>
            <a href="#depoimentos" className="hover:text-[#F0FD63] transition-colors">
              Depoimentos
            </a>
            <a href="#faq" className="hover:text-[#F0FD63] transition-colors">
              FAQ
            </a>
          </div>

          {/* Copyright */}
          <div className="text-gray-400 text-center md:text-right text-[11px]">
            © {new Date().getFullYear()} Arcv Tecnologia Financeira. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
