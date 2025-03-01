// Seleciona os elementos do formulário
const produtoInput = document.getElementById("produto");
const quantidadeInput = document.getElementById("quantidade");
const listaProdutos = document.getElementById("lista-produtos");
const valorTotal = document.getElementById("valor-total");

// Modal para edição de quantidade
const modal = document.getElementById("modal");
const modalQuantidadeInput = document.getElementById("modal-quantidade");
const modalSalvar = document.getElementById("modal-salvar");
const modalFechar = document.getElementById("modal-fechar");

// Carrinho inicial
let carrinho = [
    { nome: "Celular", preco: 1400, quantidade: 1 }
];

let itemEditandoIndex = null;

// Função para atualizar a exibição do carrinho
function atualizarCarrinho() {
    listaProdutos.innerHTML = "";
    let total = 0;

    carrinho.forEach((produto, index) => {
        let item = document.createElement("section");
        item.classList.add("carrinho__produtos__produto");

        item.innerHTML = `
            <div class="produto-container">
                <button class="editar-produto" onclick="abrirModal(${index})">✎</button>
                <span class="texto-azul quantidade-produto">${produto.quantidade}x</span> 
                <span class="nome-produto">${produto.nome}</span> 
                <span class="texto-azul preco-produto">R$${produto.preco * produto.quantidade}</span>
                <button class="remover-produto" onclick="removerProduto(${index})">✖</button>
            </div>
        `;

        listaProdutos.appendChild(item);
        total += produto.preco * produto.quantidade;
    });

    valorTotal.textContent = `R$${total}`;
}

// Função para adicionar produto ao carrinho
function adicionar() {
    let produtoSelecionado = produtoInput.value;
    let quantidade = parseInt(quantidadeInput.value);

    if (isNaN(quantidade) || quantidade <= 0) {
        alert("Por favor, insira uma quantidade válida.");
        return;
    }

    let match = produtoSelecionado.match(/(.+) - R\$(\d+)/);
    if (!match) {
        alert("Erro ao ler o produto selecionado.");
        return;
    }

    let nome = match[1].trim();
    let preco = parseFloat(match[2]);

    let produtoExistente = carrinho.find(item => item.nome === nome);

    if (produtoExistente) {
        produtoExistente.quantidade += quantidade;
    } else {
        carrinho.push({ nome, preco, quantidade });
    }

    atualizarCarrinho();
}

// Função para remover um produto específico
function removerProduto(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// Função para abrir o modal de edição
function abrirModal(index) {
    itemEditandoIndex = index;
    modalQuantidadeInput.value = carrinho[index].quantidade;
    modal.style.display = "flex";
}

// Função para salvar a edição do modal
modalSalvar.addEventListener("click", () => {
    let novaQuantidade = parseInt(modalQuantidadeInput.value);
    if (isNaN(novaQuantidade) || novaQuantidade <= 0) {
        alert("Por favor, insira uma quantidade válida.");
        return;
    }

    carrinho[itemEditandoIndex].quantidade = novaQuantidade;
    modal.style.display = "none";
    atualizarCarrinho();
});

// Fechar o modal
modalFechar.addEventListener("click", () => {
    modal.style.display = "none";
});

// Função para limpar todo o carrinho
function limpar() {
    carrinho = [];
    atualizarCarrinho();
}

// Atualiza o carrinho ao carregar a página
atualizarCarrinho();