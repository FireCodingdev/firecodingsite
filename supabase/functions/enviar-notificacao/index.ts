import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = 'Sre_A2NU7e9m_Pn9NsZ5VdMbz8cgyBB9ygN2e' // Pegue em resend.com

serve(async (req) => {
  // O Supabase Webhook envia os dados dentro do objeto "record"
  const { record } = await req.json()

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'FireCoding <onboarding@resend.dev>',
      to: ['firecodingdev@gmail.com'], // Onde você quer receber o aviso
      subject: `🔥 Novo Orçamento: ${record.nome}`,
      html: `
        <h1>Novo Lead no Site!</h1>
        <p><strong>Nome:</strong> ${record.nome}</p>
        <p><strong>E-mail:</strong> ${record.email}</p>
        <p><strong>Projeto:</strong> ${record.projeto}</p>
        <p><strong>Mensagem:</strong> ${record.mensagem}</p>
        <hr>
        <p>Enviado automaticamente pelo sistema FireCoding.</p>
      `,
    }),
  })

  const data = await res.json()
  return new Response(JSON.stringify(data), { 
    headers: { "Content-Type": "application/json" } 
  })
})