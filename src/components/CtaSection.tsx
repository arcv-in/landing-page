"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, AlertCircle, ChevronDown } from "lucide-react";
import { IsoRobotAssistant } from "./IsometricAssets";

export function CtaSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [regimeTributario, setRegimeTributario] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatCNPJ = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 14);
    if (digits.length <= 2) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
    if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
    if (digits.length <= 12) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12, 14)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name || !cnpj || !regimeTributario || loading) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("https://formbold.com/s/3jm5l", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          cnpj,
          regimeTributario,
        }),
      });

      if (!res.ok) {
        throw new Error("Erro na solicitação. Tente novamente.");
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Formbold submit error:", err);
      setError("Não foi possível enviar agora. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="teste" className="py-24 bg-[#F3F3F3] border-t border-gray-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* High-Contrast Dark Card (#141414) on Light Canvas (#F3F3F3) */}
        <div className="bg-[#141414] rounded-3xl p-8 sm:p-10 lg:p-12 text-white relative overflow-hidden shadow-2xl border border-white/10">
          {/* Ambient Accent Glow inside */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-[#F0FD63]/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 text-left">
            <div className="w-full flex-1 space-y-4">
              <div className="inline-flex items-center gap-1.5 bg-white/10 text-[#F0FD63] px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border border-white/10">
                <span>Implantação em 10 Minutos</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Concilie seu financeiro com clareza absoluta.
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-xl">
                Conecte seus bancos e canais hoje e pare de perder tempo com conciliação manual. Preencha seus dados para receber acesso imediato:
              </p>

              {submitted ? (
                <div className="bg-[#F0FD63] text-[#1D1D1D] p-5 rounded-2xl font-bold text-xs flex items-center gap-3 shadow-md border border-[#E2EF4E]">
                  <CheckCircle2 className="w-6 h-6 text-[#1D1D1D] shrink-0" />
                  <div>
                    <span className="block font-extrabold text-sm text-[#1D1D1D]">Solicitação recebida com sucesso!</span>
                    <span className="font-normal text-xs text-[#1D1D1D]/90">
                      Obrigado, {name}. Nossa equipe técnica entrará em contato em instantes no e-mail {email}.
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 pt-2">
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-3.5 max-w-xl"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Nome */}
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                          Nome Completo
                        </label>
                        <input
                          type="text"
                          required
                          disabled={loading}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Seu nome"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:border-[#F0FD63] transition-colors disabled:opacity-50"
                        />
                      </div>

                      {/* E-mail */}
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                          E-mail Corporativo
                        </label>
                        <input
                          type="email"
                          required
                          disabled={loading}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="seu@empresa.com.br"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:border-[#F0FD63] transition-colors disabled:opacity-50"
                        />
                      </div>

                      {/* CNPJ */}
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                          CNPJ da Empresa
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          required
                          disabled={loading}
                          value={cnpj}
                          onChange={(e) => setCnpj(formatCNPJ(e.target.value))}
                          placeholder="00.000.000/0000-00"
                          maxLength={18}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:border-[#F0FD63] transition-colors disabled:opacity-50 font-mono"
                        />
                      </div>

                      {/* Regime Tributário */}
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                          Regime Tributário
                        </label>
                        <div className="relative">
                          <select
                            required
                            disabled={loading}
                            value={regimeTributario}
                            onChange={(e) => setRegimeTributario(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs sm:text-sm focus:outline-none focus:border-[#F0FD63] transition-colors disabled:opacity-50 appearance-none cursor-pointer pr-9"
                          >
                            <option value="" disabled className="bg-[#1D1D1D] text-gray-400">
                              Selecione o regime...
                            </option>
                            <option value="Simples Nacional" className="bg-[#1D1D1D] text-white">
                              Simples Nacional
                            </option>
                            <option value="Lucro Presumido" className="bg-[#1D1D1D] text-white">
                              Lucro Presumido
                            </option>
                            <option value="Lucro Real" className="bg-[#1D1D1D] text-white">
                              Lucro Real
                            </option>
                            <option value="MEI" className="bg-[#1D1D1D] text-white">
                              MEI (Microempreendedor Individual)
                            </option>
                            <option value="Outro" className="bg-[#1D1D1D] text-white">
                              Outro
                            </option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#F0FD63] hover:bg-[#E2EF4E] disabled:opacity-60 text-[#1D1D1D] font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full transition-all shrink-0 hover:scale-[1.01] active:scale-[0.99] shadow-md mt-1"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 text-[#1D1D1D] animate-spin" />
                          <span>Enviando solicitação...</span>
                        </>
                      ) : (
                        <>
                          <span>Solicitar Acesso & Demonstração</span>
                          <ArrowRight className="w-4 h-4 text-[#1D1D1D]" />
                        </>
                      )}
                    </button>
                  </form>

                  {error && (
                    <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-3.5 py-2.5 rounded-xl max-w-xl">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{error}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="pt-1 text-[11px] text-gray-400">
                Sem cartão de crédito necessário • Suporte guiado por especialista
              </div>
            </div>

            {/* Friendly 3D Isometric Robot Assistant */}
            <div className="hidden lg:flex flex-col items-center justify-center shrink-0">
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
