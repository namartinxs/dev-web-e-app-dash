class ColecaoUI {
  #editando = null; #alvo = null;
  constructor(servico, msg, aoMudar) {
    this.servico = servico; this.msg = msg; this.aoMudar = aoMudar;
    const $ = (id) => document.getElementById(id);
    this.form = $('form-colecao'); this.repo = $('col-repo'); this.status = $('col-status');
    this.prio = $('col-prioridade'); this.nota = $('col-anotacao');
    this.cancelar = $('col-cancelar'); this.titulo = $('col-titulo');
    this.busca = $('col-busca'); this.filtro = $('col-filtro'); this.lista = $('col-lista');
    this.form.addEventListener('submit', (e) => { e.preventDefault(); this.salvar(); });
    this.cancelar.addEventListener('click', () => this.resetar());
    this.busca.addEventListener('input', () => this.render());
    this.filtro.addEventListener('change', () => this.render());
    this.render();
  }
  #erros(mapa) {
    ['repo', 'status', 'prioridade', 'anotacao'].forEach((c) => {
      document.getElementById('erro-' + c).textContent = mapa[c] || '';
    });
  }
  escolher(r) {
    this.#editando = null; this.#alvo = r;
    this.repo.value = r.dono + '/' + r.nome;
    this.titulo.textContent = 'Adicionar à coleção';
    this.cancelar.hidden = true; this.#erros({});
    this.form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    this.nota.focus();
  }
  editar(item) {
    this.#editando = item; this.#alvo = null;
    this.repo.value = item.dono + '/' + item.nome;
    this.status.value = item.status; this.prio.value = item.prioridade; this.nota.value = item.anotacao;
    this.titulo.textContent = 'Editar item'; this.cancelar.hidden = false; this.#erros({});
    this.form.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  resetar() {
    this.#editando = null; this.#alvo = null; this.form.reset(); this.prio.value = '3';
    this.titulo.textContent = 'Adicionar à coleção'; this.cancelar.hidden = true; this.#erros({});
  }
  salvar() {
    try {
      const dados = { status: this.status.value, prioridade: this.prio.value, anotacao: this.nota.value };
      if (this.#editando) {
        this.servico.atualizar(this.#editando.id, dados);
        this.msg.sucesso('Item atualizado com sucesso!');
      } else {
        if (!this.#alvo) throw erroCampo('repo', 'Escolha um repositório na tabela');
        const r = this.#alvo;
        this.servico.criar({ ...dados, dono: r.dono, nome: r.nome, linguagem: r.linguagem });
        this.msg.sucesso('Repositório adicionado à coleção!');
      }
      this.resetar(); this.render(); this.aoMudar();
    } catch (e) {
      if (e.campo) this.#erros({ [e.campo]: e.message });
      else this.msg.erro(e.message);
    }
  }
  // Botão quadrado só com ícone; o texto fica no aria-label e no title.
  #botaoIcone(classe, icone, rotulo) {
    const b = criar('button', null, 'icone-btn ' + classe);
    b.type = 'button'; b.title = rotulo; b.setAttribute('aria-label', rotulo);
    const desenho = criar('span', null, 'icone ' + icone);
    desenho.setAttribute('aria-hidden', 'true');
    b.append(desenho);
    return b;
  }
  render() {
    limpar(this.lista);
    const termo = this.busca.value.trim().toLowerCase();
    const itens = this.servico.listar().filter((i) =>
      (i.nome + ' ' + i.dono + ' ' + i.anotacao).toLowerCase().includes(termo) && (!this.filtro.value || i.status === this.filtro.value));
    if (!itens.length) return this.lista.append(criar('p', 'Nenhum item na coleção.', 'vazio-lista'));
    itens.forEach((i) => {
      const c = criar('article', null, 'item');
      const sel = criar('select');
      sel.setAttribute('aria-label', 'Status de ' + i.nome);
      CONFIG.STATUS.forEach((s) => { const o = criar('option', s.charAt(0).toUpperCase() + s.slice(1)); o.value = s; sel.append(o); });
      sel.value = i.status;
      sel.addEventListener('change', () => {
        try { this.servico.mudarStatus(i.id, sel.value); this.msg.sucesso('Status atualizado!'); this.render(); this.aoMudar(); }
        catch (e) { this.msg.erro(e.message); }
      });
      const ed = this.#botaoIcone('editar', 'i-lapis', 'Editar ' + i.nome);
      ed.addEventListener('click', () => this.editar(i));
      const ex = this.#botaoIcone('excluir', 'i-lixeira', 'Excluir ' + i.nome);
      ex.addEventListener('click', () => {
        if (!confirm('Excluir \"' + i.nome + '\" da coleção?')) return;
        this.servico.excluir(i.id);
        if (this.#editando && this.#editando.id === i.id) this.resetar();
        this.msg.sucesso('Item excluído.'); this.render(); this.aoMudar();
      });
      const etiquetas = criar('div', null, 'etiquetas');
      etiquetas.append(criar('span', 'Prioridade ' + i.prioridade, 'etiqueta'), criar('span', i.linguagem, 'etiqueta'));
      const info = criar('div', null, 'item-info');
      info.append(criar('h4', i.dono + '/' + i.nome), criar('p', i.anotacao), etiquetas, sel);
      const acoes = criar('div', null, 'item-acoes'); acoes.append(ex, ed);
      c.append(info, acoes);
      this.lista.append(c);
    });
  }
}
