class App {
  constructor() {
    this.servicoGit = new GitHubService(new GitHubApi(), new Armazenamento());
    this.colecao = new ColecaoService(new Armazenamento());
    this.msg = new MensagemUI();
    this.perfil = new PerfilUI();
    this.painel = new PainelUI();
    this.colecaoUI = new ColecaoUI(this.colecao, this.msg, () => {
      this.painel.atualizar(null, null, this.colecao.listar());
      this.tabela.render();
    });
    this.tabela = new RepositoriosUI((r) => this.colecaoUI.escolher(r), (r) => this.colecao.existe(r.dono, r.nome));
    this.campo = document.getElementById('busca-login');
    this.erro = document.getElementById('busca-erro');
    document.getElementById('form-busca').addEventListener('submit', (e) => { e.preventDefault(); this.buscar(this.campo.value); });
  }
  async buscar(texto) {
    const login = texto.trim();
    this.erro.textContent = '';
    if (!login) { this.erro.textContent = 'Digite um usuário do GitHub'; return; }
    this.msg.carregando(true);
    try {
      const { usuario, repos } = await this.servicoGit.carregar(login);
      this.perfil.mostrar(usuario);
      this.painel.atualizar(usuario, repos, this.colecao.listar());
      this.tabela.definir(repos);
      this.campo.value = usuario.login;
      this.msg.limpar();
    } catch (e) {
      this.msg.erro(e instanceof ApiError ? e.message : 'Algo deu errado: ' + e.message);
    } finally {
      this.msg.carregando(false);
    }
  }
  marcarMenu() {
    const links = document.querySelectorAll('.menu-links a');
    const marcar = () => {
      const alvo = location.hash || '#dashboard';
      links.forEach((a) => {
        if (a.getAttribute('href') === alvo) a.setAttribute('aria-current', 'page');
        else a.removeAttribute('aria-current');
      });
    };
    window.addEventListener('hashchange', marcar);
    marcar();
  }
  iniciar() {
    this.marcarMenu();
    this.perfil.vazio();
    this.painel.atualizar(null, [], this.colecao.listar());
    this.tabela.definir([]);
    const ultimo = this.servicoGit.ultimoUsuario();
    if (ultimo) this.buscar(ultimo);
  }
}
new App().iniciar();