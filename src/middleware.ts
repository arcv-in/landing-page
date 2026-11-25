// middleware.ts (Next.js App Router & Pages Router)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { VoightTraceCollector } from '@voight-trace/voighttrace-sdk';

// 1. Inicializa o coletor seguro a partir de variáveis de ambiente
const tracker = new VoightTraceCollector({
    apiKey: process.env.VOIGHT_TRACE_API_KEY || '',
    siteId: process.env.VOIGHT_TRACE_SITE_ID || ''
});

// 2. Middleware não-bloqueante na borda (zero impacto na latência do usuário)
export const middleware = tracker.nextMiddleware(async (_request: NextRequest) => {
    // Lógica customizada de autenticação ou roteamento da sua aplicação
    return NextResponse.next();
});

// 3. Ignora arquivos estáticos, bundles internos do Next e favicon
export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};