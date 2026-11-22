class PerfilUI {
  #alvo = document.getElementById('perfil');
  // Selo decorativo com o logo do GitHub (desenhado pelo CSS).
  #selo() {
    const s = criar('span', null, 'selo-github');
    s.setAttribute('aria-hidden', 'true');
    return s;
  }
  mostrar(u) {
    limpar(this.#alvo);
    this.#alvo.hidden = false;
    const img = criar('img');
    img.src = u.avatar;
    img.alt = 'Foto de ' + u.nome;
    const info = criar('div', null, 'perfil-info');
    const link = criar('a', '@' + u.login);
    link.href = u.url; link.target = '_blank'; link.rel = 'noopener';
    info.append(criar('h3', u.nome), criar('p', u.bio, u.bio === 'Sem bio' ? 'vazio' : ''), link);
    this.#alvo.append(img, info, this.#selo());
  }
  vazio() {
    limpar(this.#alvo);
    const info = criar('div', null, 'perfil-info');
    info.append(criar('p', 'Busque um usuário do GitHub para começar.', 'vazio'));
    this.#alvo.append(criar('div', null, 'avatar-vazio'), info, this.#selo());
  }
}
