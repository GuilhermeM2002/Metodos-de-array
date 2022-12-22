let livros = [];
let endpointDaAPI =
  "https://guilhermeonrails.github.io/casadocodigo/livros.json";

const elementoInserirLivro = document.querySelector("#livros");
const buttonFiltrar = document.querySelectorAll(".btn");
const elementoInserirPrecoTotal = document.querySelector(
  "#valor_total_livros_disponiveis"
);

buttonFiltrar.forEach((btn) => btn.addEventListener("click", filtraLivros));

buscaLivroApi();

async function buscaLivroApi() {
  const res = await fetch(endpointDaAPI);
  livros = await res.json();
  criaLivros(livros);
}

function criaLivros(livros) {
  elementoInserirLivro.innerHTML = "";

  livros.forEach((livro) => {
    let disponibilidade =
      livro.quantidade > 0 ? "livro__imagens" : "livro__imagens indisponivel";

    elementoInserirLivro.innerHTML += `
            <div class="livro">
                <img class="${disponibilidade}" src="${livro.imagem}" alt="${livro.alt}" />
                <h2 class="livro__titulo">
                    ${livro.titulo}
                </h2>
                <p class="livro__descricao">${livro.autor}</p>
                <p class="livro__preco" id="preco">R$${livro.preco}</p>
                <div class="tags">
                    <span class="tag">${livro.categoria}</span>
                </div>
            </div>
        `;
    adcionaPrecoTotal(livros);
  });
}

function filtraLivros() {
  const botao = document.getElementById(this.id);
  const categoria = botao.value;

  let livrosFiltrados =
    categoria == "disponivel"
      ? livros.filter((livro) => livro.quantidade > 0)
      : livros.filter((livro) => livro.categoria == categoria);
  criaLivros(livrosFiltrados);
}

function adcionaPrecoTotal(livros) {
  let precoTotal = livros.reduce(
    (acumulador, livro) =>
      livro.quantidade > 0 ? acumulador + livro.preco : acumulador,
    0
  );
  let precoTotalArredondado = Math.round(precoTotal);

  elementoInserirPrecoTotal.innerHTML = `
        <div class="livros__disponiveis">
            <p>Todos os livros disponíveis por R$ <span id="valor">${precoTotalArredondado}</span></p>
        </div>
    `;
}
