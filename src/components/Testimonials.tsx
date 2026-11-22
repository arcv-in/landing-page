/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Roberto Mendes",
      role: "Diretor Financeiro de Franquias",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      quote:
        "Centralizamos 5 contas bancárias e 3 canais de pagamento em um só lugar. O fechamento financeiro que levava dias agora é instantâneo.",
    },
    {
      name: "Carolina Siqueira",
      role: "Gestora Financeira & Controladora",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80",
      quote:
        "A segurança de saber que cada Pix, boleto e cartão está devidamente casado com o extrato bancário oficial não tem preço.",
    },
    {
      name: "Felipe Duarte",
      role: "Sócio e Administrador",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
      quote:
        "O Arcv nos deu previsibilidade real de caixa. Identificamos divergências de tarifas bancárias que passavam totalmente batidas.",
    },
  ];

  return (
    <section id="depoimentos" className="py-24 bg-[#F3F3F3] border-t border-gray-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-white text-[#1D1D1D] px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border border-gray-200/80 shadow-xs">
            <span>Depoimentos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1D1D1D] tracking-tight mt-3">
            Quem confia no Arcv
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            A tranquilidade de quem recuperou a soberania e o controle do seu fluxo financeiro.
          </p>
        </div>

        {/* 3 Clean Testimonial Cards on #F3F3F3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-[#1D1D1D] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#F0FD63] text-[#1D1D1D]"
                    />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-3">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-9 h-9 rounded-full object-cover border-2 border-[#F0FD63]"
                />
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#1D1D1D]">
                    {t.name}
                  </h4>
                  <p className="text-[11px] text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
