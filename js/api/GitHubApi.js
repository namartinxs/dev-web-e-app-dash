//realiza a busca
class GitHubApi {
  async #get(caminho) {
    let resposta;
    try {
      resposta = await fetch(CONFIG.API_URL + caminho);
    } catch (e) {
      throw new ApiError('Não foi possível conectar à API', 0, 'rede');
    }
    if (!resposta.ok) {
      if (resposta.status === 404) throw new ApiError('Usuário não encontrado', 404, 'nao-encontrado');
      if (resposta.status === 403 || resposta.status === 429)
        throw new ApiError('O limite de requisições da API foi atingido. Tente novamente mais tarde.', resposta.status, 'limite');
      throw new ApiError('Erro ao consultar a API (status ' + resposta.status + ')', resposta.status, 'http');
    }
    try {
      return await resposta.json();
    } catch (e) {
      throw new ApiError('Resposta inválida da API', resposta.status, 'http');
    }
  }
  buscarUsuario(login) { return this.#get('/users/' + encodeURIComponent(login)); }
  buscarRepos(login) { return this.#get('/users/' + encodeURIComponent(login) + '/repos?per_page=100'); }
}
