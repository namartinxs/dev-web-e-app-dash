class Usuario {
  #login; #nome; #bio; #avatar; #url; #seguidores; #repos;
  constructor(d) {
    this.login = d.login;
    this.#nome = d.name || '';
    this.#bio = d.bio || '';
    this.#avatar = d.avatar_url || '';
    this.#url = d.html_url || '';
    this.seguidores = d.followers;
    this.reposPublicos = d.public_repos;
  }
  get login() { return this.#login; }
  set login(v) {
    if (typeof v !== 'string' || !v.trim()) throw new Error('Login inválido');
    this.#login = v.trim();
  }
  get nome() { return this.#nome || this.#login; }
  get bio() { return this.#bio || 'Sem bio'; }
  get avatar() { return this.#avatar; }
  get url() { return this.#url; }
  get seguidores() { return this.#seguidores; }
  set seguidores(v) { this.#seguidores = Number.isFinite(v) && v >= 0 ? v : 0; }
  get reposPublicos() { return this.#repos; }
  set reposPublicos(v) { this.#repos = Number.isFinite(v) && v >= 0 ? v : 0; }
}
