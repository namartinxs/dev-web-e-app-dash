class PainelUI {
  #repos = [];
  constructor() {
    this.criterio = document.getElementById('top-criterio');
    this.criterio.addEventListener('change', () => this.top5());
  }
  atualizar(usuario, repos, itens) {
    if (repos) this.#repos = repos;
    if (usuario) this.usuario = usuario;
    this.indicadores(itens.length);
    this.linguagens();
    this.top5();
    this.progresso(itens);
  }
  indicadores(qtdColecao) {
    const alvo = document.getElementById('indicadores');
    limpar(alvo);
    const estrelas = this.#repos.reduce((s, r) => s + r.estrelas, 0);
    const dados = [
      ['Repositórios públicos', this.usuario ? this.usuario.reposPublicos : 0, 'i-livro', 'q-rosa'],
      ['Estrelas somadas', estrelas, 'i-estrela', 'q-amarelo'],
      ['Seguidores', this.usuario ? this.usuario.seguidores : 0, 'i-pessoas', 'q-azul'],
      ['Na minha coleção', qtdColecao, 'i-marcador', 'q-verde'],
    ];
    dados.forEach(([rotulo, valor, icone, cor]) => {
      const c = criar('div', null, 'indicador');
      const quadro = criar('span', null, 'quadro ' + cor);
      const desenho = criar('span', null, 'icone ' + icone);
      desenho.setAttribute('aria-hidden', 'true');
      quadro.append(desenho);
      const texto = criar('div', null, 'indicador-texto');
      texto.append(criar('strong', fmtNum.format(valor)), criar('span', rotulo));
      c.append(quadro, texto);
      alvo.append(c);
    });
  }
  #linhaBarra(rotulo, pct, texto, classe) {
    const l = criar('div', null, 'barra-linha');
    l.append(criar('div', rotulo + ' - ' + texto));
    const t = criar('div', null, 'barra-trilho');
    const b = criar('div', null, 'barra ' + (classe || ''));
    b.style.width = Math.max(pct, 2) + '%';
    t.append(b);
    l.append(t);
    return l;
  }
  linguagens() {
    const alvo = document.getElementById('grafico-linguagens');
    limpar(alvo);
    if (!this.#repos.length) return alvo.append(criar('p', 'Sem dados ainda.', 'aviso'));
    const cont = {};
    this.#repos.forEach((r) => { cont[r.linguagem] = (cont[r.linguagem] || 0) + 1; });
    Object.entries(cont).sort((a, b) => b[1] - a[1]).slice(0, 6).forEach(([ling, n], i) => {
      const pct = (n / this.#repos.length) * 100;
      alvo.append(this.#linhaBarra(ling, pct, pct.toFixed(0) + '%', 'c' + (i % 5)));
    });
  }
  top5() {
    const alvo = document.getElementById('grafico-top');
    const aviso = document.getElementById('top-aviso');
    limpar(alvo); aviso.textContent = '';
    if (!this.#repos.length) return alvo.append(criar('p', 'Sem dados ainda.', 'aviso'));
    const crit = this.criterio.value;
    const valor = (r) => crit === 'estrelas' ? r.estrelas : crit === 'tamanho' ? r.tamanho : new Date(r.atualizadoEm).getTime();
    if (crit === 'estrelas' && this.#repos.every((r) => r.estrelas === 0))
      aviso.textContent = 'Todos os repositórios têm 0 estrelas. Experimente ordenar por tamanho ou atualização.';
    const top = [...this.#repos].sort((a, b) => valor(b) - valor(a)).slice(0, 5);
    const max = Math.max(...top.map(valor)) || 1;
    top.forEach((r, i) => {
      const texto = crit === 'estrelas' ? fmtNum.format(r.estrelas) + ' ★'
        : crit === 'tamanho' ? fmtNum.format(r.tamanho) + ' KB' : fmtData.format(new Date(r.atualizadoEm));
      alvo.append(this.#linhaBarra(r.nome, crit === 'atualizacao' ? 100 - i * 12 : (valor(r) / max) * 100, texto, 'c' + (i % 5)));
    });
  }
  progresso(itens) {
    const alvo = document.getElementById('grafico-progresso');
    limpar(alvo);
    if (!itens.length) return alvo.append(criar('p', 'Sua coleção está vazia.', 'aviso'));
    const classes = { 'quero estudar': 's-quero', estudando: 's-estudando', 'concluído': 's-concluido' };
    const trilho = criar('div', null, 'barra-trilho');
    const legenda = criar('div', null, 'legenda');
    CONFIG.STATUS.forEach((s) => {
      const n = itens.filter((i) => i.status === s).length;
      const b = criar('div', null, 'barra ' + classes[s]);
      b.style.width = (n / itens.length) * 100 + '%';
      b.style.borderRadius = '0';
      trilho.append(b);
      legenda.append(criar('span', s + ': ' + n, classes[s]));
    });
    alvo.append(trilho, legenda);
  }
}