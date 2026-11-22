class PerfilUI {
  #alvo = document.getElementById('perfil');
  mostrar(u) {
    limpar(this.#alvo);
    this.#alvo.hidden = false;
    const img = criar('img');
    img.src = u.avatar;
    img.alt = 'Foto de ' + u.nome;
    const info = criar('div');
    info.append(criar('h3', u.nome), criar('p', '@' + u.login));
    info.append(criar('p', u.bio, u.bio === 'Sem bio' ? 'vazio' : ''));
    const link = criar('a', 'Ver no GitHub');
    link.href = u.url; link.target = '_blank'; link.rel = 'noopener';
    info.append(link);
    this.#alvo.append(img, info);
  }
  vazio() {
    limpar(this.#alvo);
    this.#alvo.append(criar('p', 'Busque um usuário do GitHub para começar.', 'vazio'));
  }
}
