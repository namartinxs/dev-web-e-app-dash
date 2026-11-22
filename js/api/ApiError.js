class ApiError extends Error {
  #status;
  #tipo;
  constructor(mensagem, status, tipo) {
    super(mensagem);
    this.name = 'ApiError';
    this.#status = status;
    this.#tipo = tipo; // 'nao-encontrado' | 'limite' | 'rede' | 'http'
  }
  get status() { return this.#status; }
  get tipo() { return this.#tipo; }
}
