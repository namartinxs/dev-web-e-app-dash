class MensagemUI {
  #caixa; #botao;
  constructor() {
    this.#caixa = document.getElementById('mensagem');
    this.#botao = document.getElementById('busca-botao');
  }
  #mostrar(texto, classe) { this.#caixa.textContent = texto; this.#caixa.className = 'mensagem ' + classe; }
  carregando(ativo) {
    this.#botao.disabled = ativo;
    if (ativo) this.#mostrar('Carregando…', '');
    else if (this.#caixa.textContent === 'Carregando…') this.limpar();
  }
  sucesso(t) { this.#mostrar(t, 'sucesso'); }
  erro(t) { this.#mostrar(t, 'erro'); }
  limpar() { this.#caixa.textContent = ''; this.#caixa.className = 'mensagem'; }
}
