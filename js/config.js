// utils
const CONFIG = {
  API_URL: 'https://api.github.com',
  CACHE_MINUTOS: 10,
  POR_PAGINA: 8,
  CHAVE_USUARIO: 'radar:ultimoUsuario',
  CHAVE_CACHE: 'radar:cache:',
  CHAVE_COLECAO: 'radar:colecao',
  STATUS: ['quero estudar', 'estudando', 'concluído'],
};

// Criacao de elementos
function criar(tag, texto, classe) {
  const e = document.createElement(tag);
  if (texto !== undefined && texto !== null) e.textContent = texto;
  if (classe) e.className = classe;
  return e;
}
function limpar(e) { e.innerHTML = ''; }
function erroCampo(campo, msg) {
  const e = new Error(msg);
  e.campo = campo;
  return e;
}
const fmtNum = new Intl.NumberFormat('pt-BR');
const fmtData = new Intl.DateTimeFormat('pt-BR');