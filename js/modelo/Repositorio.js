class Repositorio {
  #nome; #dono; #linguagem; #estrelas; #forks; #tamanho; #atualizadoEm; #url;
  constructor(d) {
    this.nome = d.name ?? d.nome;
    this.dono = d.owner?.login ?? d.dono;
    this.linguagem = d.language ?? d.linguagem;
    this.estrelas = d.stargazers_count ?? d.estrelas;
    this.#forks = Number(d.forks_count ?? d.forks) || 0;
    this.#tamanho = Number(d.size ?? d.tamanho) || 0;
    this.#atualizadoEm = d.updated_at ?? d.atualizadoEm ?? '';
    this.#url = d.html_url ?? d.url ?? '';
  }
  get nome() { return this.#nome; }
  set nome(v) {
    if (typeof v !== 'string' || !v.trim()) throw erroCampo('repo', 'Repositório inválido');
    this.#nome = v;
  }
  get dono() { return this.#dono; }
  set dono(v) {
    if (typeof v !== 'string' || !v.trim()) throw erroCampo('repo', 'Dono inválido');
    this.#dono = v;
  }
  get linguagem() { return this.#linguagem || 'Sem linguagem'; }
  set linguagem(v) { this.#linguagem = v || ''; }
  get estrelas() { return this.#estrelas; }
  set estrelas(v) { this.#estrelas = Number.isFinite(Number(v)) && Number(v) >= 0 ? Number(v) : 0; }
  get forks() { return this.#forks; }
  get tamanho() { return this.#tamanho; }
  get atualizadoEm() { return this.#atualizadoEm; }
  get url() { return this.#url; }
  toJSON() {
    return {
      dono: this.#dono, nome: this.#nome, linguagem: this.linguagem,
      estrelas: this.#estrelas, forks: this.#forks, tamanho: this.#tamanho,
      atualizadoEm: this.#atualizadoEm, url: this.#url,
    };
  }
}
