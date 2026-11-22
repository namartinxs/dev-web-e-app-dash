class ColecaoService {
  #arm; #itens;
  constructor(arm) {
    this.#arm = arm;
    const bruto = arm.ler(CONFIG.CHAVE_COLECAO, []);
    this.#itens = [];
    if (Array.isArray(bruto)) {
      bruto.forEach((d) => { try { this.#itens.push(new ItemColecao(d)); } catch (e) { /* ignora item corrompido */ } });
    }
  }
  #salvar() { this.#arm.gravar(CONFIG.CHAVE_COLECAO, this.#itens); }
  listar() { return [...this.#itens]; }
  existe(dono, nome) {
    return this.#itens.some((i) => i.dono === dono && i.nome === nome);
  }
  criar(d) {
    if (this.existe(d.dono, d.nome)) throw erroCampo('repo', 'Este repositório já está na coleção');
    const item = new ItemColecao(d);
    this.#itens.push(item);
    this.#salvar();
    return item;
  }
  atualizar(id, d) {
    const item = this.#itens.find((i) => i.id === id);
    if (!item) throw new Error('Item não encontrado');
    item.status = d.status;
    item.prioridade = d.prioridade;
    item.anotacao = d.anotacao;
    this.#salvar();
  }
  mudarStatus(id, status) {
    const item = this.#itens.find((i) => i.id === id);
    if (!item) throw new Error('Item não encontrado');
    item.status = status;
    this.#salvar();
  }
  excluir(id) {
    this.#itens = this.#itens.filter((i) => i.id !== id);
    this.#salvar();
  }
}
