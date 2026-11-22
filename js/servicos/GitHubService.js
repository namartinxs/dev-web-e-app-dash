class GitHubService {
  #api; #arm;
  constructor(api, arm) { this.#api = api; this.#arm = arm; }

  async carregar(login) {
    const chave = CONFIG.CHAVE_CACHE + login.toLowerCase();
    const cache = this.#arm.ler(chave, null);
    let dados;
    if (cache && cache.salvoEm && Date.now() - cache.salvoEm < CONFIG.CACHE_MINUTOS * 60000) {
      dados = cache;
    } else {
      const [perfil, repos] = await Promise.all([this.#api.buscarUsuario(login), this.#api.buscarRepos(login)]);
      dados = { perfil, repos, salvoEm: Date.now() };
      this.#arm.gravar(chave, dados);
    }
    this.#arm.gravar(CONFIG.CHAVE_USUARIO, dados.perfil.login);
    return { usuario: new Usuario(dados.perfil), repos: dados.repos.map((r) => new Repositorio(r)) };
  }
  ultimoUsuario() { return this.#arm.ler(CONFIG.CHAVE_USUARIO, ''); }
}
