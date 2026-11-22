class RepositoriosUI {
  #repos = []; #pagina = 1;
  constructor(aoAdicionar) {
    this.aoAdicionar = aoAdicionar;
    this.busca = document.getElementById('repo-busca');
    this.ling = document.getElementById('repo-linguagem');
    this.ordem = document.getElementById('repo-ordem');
    [this.busca, this.ling, this.ordem].forEach((c) => {
      c.addEventListener(c === this.busca ? 'input' : 'change', () => { this.#pagina = 1; this.render(); });
    });
  }
  definir(repos) {
    this.#repos = repos; this.#pagina = 1;
    limpar(this.ling);
    this.ling.append(criar('option', 'Todas as linguagens'));
    this.ling.firstChild.value = '';
    [...new Set(repos.map((r) => r.linguagem))].sort().forEach((l) => {
      const o = criar('option', l); o.value = l; this.ling.append(o);
    });
    this.render();
  }
  render() {
    const tbody = document.getElementById('repo-tbody');
    const pag = document.getElementById('repo-pag');
    limpar(tbody); limpar(pag);
    const termo = this.busca.value.trim().toLowerCase();
    let lista = this.#repos.filter((r) => r.nome.toLowerCase().includes(termo) && (!this.ling.value || r.linguagem === this.ling.value));
    const o = this.ordem.value;
    lista.sort((a, b) => o === 'estrelas' ? b.estrelas - a.estrelas
      : o === 'atualizacao' ? new Date(b.atualizadoEm) - new Date(a.atualizadoEm) : a.nome.localeCompare(b.nome));
    const total = Math.max(1, Math.ceil(lista.length / CONFIG.POR_PAGINA));
    if (this.#pagina > total) this.#pagina = total;
    const inicio = (this.#pagina - 1) * CONFIG.POR_PAGINA;
    if (!lista.length) {
      const tr = criar('tr'); const td = criar('td', 'Nenhum repositório encontrado.'); td.colSpan = 5;
      tr.append(td); tbody.append(tr);
    }
    lista.slice(inicio, inicio + CONFIG.POR_PAGINA).forEach((r) => {
      const tr = criar('tr');
      const nome = criar('td'); const a = criar('a', r.nome); a.href = r.url; a.target = '_blank'; a.rel = 'noopener'; nome.append(a);
      const btn = criar('button', 'Adicionar à coleção', 'mini'); btn.type = 'button';
      btn.addEventListener('click', () => this.aoAdicionar(r));
      const acao = criar('td'); acao.append(btn);
      tr.append(nome, criar('td', r.linguagem), criar('td', fmtNum.format(r.estrelas)),
        criar('td', r.atualizadoEm ? fmtData.format(new Date(r.atualizadoEm)) : '-'), acao);
      tbody.append(tr);
    });
    const ant = criar('button', 'Anterior', 'secundario mini'); ant.type = 'button'; ant.disabled = this.#pagina <= 1;
    const prox = criar('button', 'Próxima', 'secundario mini'); prox.type = 'button'; prox.disabled = this.#pagina >= total;
    ant.addEventListener('click', () => { this.#pagina--; this.render(); });
    prox.addEventListener('click', () => { this.#pagina++; this.render(); });
    pag.append(ant, criar('span', 'Página ' + this.#pagina + ' de ' + total), prox);
  }
}