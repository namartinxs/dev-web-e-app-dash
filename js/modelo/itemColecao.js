class ItemColecao extends Repositorio {
  #id; #status; #prioridade; #anotacao; #criadoEm;
  constructor(d) {
    super(d);
    this.#id = d.id || String(Date.now());
    this.#criadoEm = d.criadoEm || new Date().toISOString();
    this.status = d.status;
    this.prioridade = d.prioridade;
    this.anotacao = d.anotacao;
  }
  get id() { return this.#id; }
  get criadoEm() { return this.#criadoEm; }
  get status() { return this.#status; }
  set status(v) {
    if (!CONFIG.STATUS.includes(v)) throw erroCampo('status', 'Escolha um status válido');
    this.#status = v;
  }
  get prioridade() { return this.#prioridade; }
  set prioridade(v) {
    const n = Number(v);
    if (!Number.isInteger(n) || n < 1 || n > 5) throw erroCampo('prioridade', 'A prioridade vai de 1 a 5');
    this.#prioridade = n;
  }
  get anotacao() { return this.#anotacao; }
  set anotacao(v) {
    const t = typeof v === 'string' ? v.trim() : '';
    if (t.length < 10) throw erroCampo('anotacao', 'A anotação precisa ter pelo menos 10 caracteres');
    if (t.length > 280) throw erroCampo('anotacao', 'A anotação pode ter no máximo 280 caracteres');
    this.#anotacao = t;
  }
  toJSON() {
    return {
      id: this.#id, dono: this.dono, nome: this.nome, linguagem: this.linguagem,
      status: this.#status, prioridade: this.#prioridade,
      anotacao: this.#anotacao, criadoEm: this.#criadoEm,
    };
  }
}