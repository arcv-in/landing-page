"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { IsoRobotAssistant } from "./IsometricAssets";

export function CtaSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("https://formbold.com/s/3jm5l", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error("Erro na solicitação. Tente novamente.");
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Formbold submit error:", err);
      setError("Não foi possível enviar agora. Verifique seu e-mail e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="teste" className="py-24 bg-[#F3F3F3] border-t border-gray-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* High-Contrast Dark Card (#141414) on Light Canvas (#F3F3F3) */}
        <div className="bg-[#141414] rounded-3xl p-8 sm:p-12 lg:p-14 text-white relative overflow-hidden shadow-2xl border border-white/10">
          {/* Ambient Accent Glow inside */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-[#F0FD63]/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-left">
            <div className="max-w-xl space-y-4">
              <div className="inline-flex items-center gap-1.5 bg-white/10 text-[#F0FD63] px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border border-white/10">
                <span>Implantação em 10 Minutos</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Concilie seu financeiro com clareza absoluta.
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Conecte seus bancos e canais hoje e pare de perder tempo com conciliação manual.
              </p>

              {submitted ? (
                <div className="bg-[#F0FD63] text-[#1D1D1D] p-4 rounded-2xl font-bold text-xs flex items-center gap-3 shadow-md border border-[#E2EF4E]">
                  <CheckCircle2 className="w-5 h-5 text-[#1D1D1D] shrink-0" />
                  <div>
                    <span className="block font-extrabold text-sm text-[#1D1D1D]">Solicitação recebida com sucesso!</span>
                    <span className="font-normal text-xs text-[#1D1D1D]/80">Nossa equipe entrará em contato em instantes no e-mail informado.</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <form
                    onSubmit={handleSubmit}
                    className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 max-w-md"
                  >
                    <input
                      type="email"
                      required
                      disabled={loading}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Seu e-mail corporativo..."
                      className="w-full px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 text-xs focus:outline-none focus:border-[#F0FD63] transition-colors disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#F0FD63] hover:bg-[#E2EF4E] disabled:opacity-60 text-[#1D1D1D] font-bold text-xs px-6 py-3 rounded-full transition-all shrink-0 hover:scale-105 active:scale-95 shadow-md"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 text-[#1D1D1D] animate-spin" />
                          <span>Enviando...</span>
                        </>
                      ) : (
                        <>
                          <span>Testar Grátis</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#1D1D1D]" />
                        </>
                      )}
                    </button>
                  </form>

                  {error && (
                    <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-3.5 py-2.5 rounded-xl max-w-md">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{error}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="pt-2 text-[11px] text-gray-400">
                Sem cartão de crédito necessário • Suporte guiado por especialista
              </div>
            </div>

            {/* Friendly 3D Isometric Robot Assistant */}
            <div className="hidden sm:flex flex-col items-center justify-center shrink-0">
              <IsoRobotAssistant />
              <div className="text-[10px] font-mono font-bold text-[#F0FD63] uppercase tracking-widest -mt-1 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">
                Audit Bot Ativo
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
