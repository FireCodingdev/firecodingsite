// api/enviar.js
const { createClient } = require('@supabase/supabase-js');

// Verifica se as chaves existem (ajuda a evitar crash silencioso)
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    console.error("Faltam variáveis de ambiente da Vercel!");
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = async function handler(req, res) {
  // Configura CORS caso necessário (boas práticas da Vercel)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  
  // Responde a requisições de "pré-vôo" do navegador
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { nome, email, projeto, mensagem } = req.body;

  const { data, error } = await supabase
    .from('orcamentos')
    .insert([{ nome, email, projeto, mensagem }]);

  if (error) {
      console.error("Erro no Supabase:", error);
      return res.status(500).json({ error: error.message });
  }
  
  return res.status(200).json({ success: true });
};