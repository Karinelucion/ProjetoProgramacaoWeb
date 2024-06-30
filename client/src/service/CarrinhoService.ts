import { IProdutosPedido, IProduto } from "@/commons/interfaces";

// Função para adicionar ao carrinho com localStorage
export const adicionarAoCarrinho = (produto: IProduto) => {
    // Recupera produtos do localStorage, ou inicia um array vazio
    const produtosPedido: IProdutosPedido[] = JSON.parse(
      localStorage.getItem("produtosPedido") || "[]"
    );
  
    // Verifica se o produto já está na lista de produtos pedidos
    const produtoExistente = produtosPedido.find(
      (p) => p.produto.id === produto.id
    );
  
    if (produtoExistente) {
      // Se o produto já está na lista, aumenta a quantidade
      produtoExistente.quantidade += 1;
    } else {
      // Se o produto não está na lista, adiciona o novo produto com quantidade 1
      const novoProdutoPedido: IProdutosPedido = {
        produto: produto,
        quantidade: 1,
      };
      produtosPedido.push(novoProdutoPedido);
    }
  
    // Salva produtos de volta no localStorage
    localStorage.setItem("produtosPedido", JSON.stringify(produtosPedido));
  
    console.log(produtosPedido);
  };
  
  // Função para consultar a lista do localStorage
  export const consultarCarrinho = (): IProdutosPedido[] => {
    // Recupera e retorna os produtos do localStorage
    const produtosPedido: IProdutosPedido[] = JSON.parse(
      localStorage.getItem("produtosPedido") || "[]"
    );
    return produtosPedido;
  };

  export const atualizarCarrinho = (novosProdutosPedido: IProdutosPedido[]) => {
    localStorage.setItem("produtosPedido", JSON.stringify(novosProdutosPedido));
  }

  const aumentarQuantidade = (produto: IProduto) => {
    const produtosPedido = consultarCarrinho();
  
    const novosProdutosPedido = produtosPedido.map((p) => {
      if (p.produto.id === produto.id) {
        return { ...p, quantidade: p.quantidade + 1 };
      }
      return p;
    });
  
    atualizarCarrinho(novosProdutosPedido);

    return novosProdutosPedido;
  };

  const diminuirQuantidade = (produto: IProduto) => {
    const produtosPedido = consultarCarrinho();
  
    const novosProdutosPedido = produtosPedido.map((p) => {
      if (p.produto.id === produto.id) {
        return { ...p, quantidade: p.quantidade - 1 };
      }
      return p;
    }).filter((p) => p.quantidade > 0);
  
    atualizarCarrinho(novosProdutosPedido);

    return novosProdutosPedido;
  };

  const removerProduto = (produto: IProduto) => {
    const produtosPedido = consultarCarrinho(); 

    const novosProdutosPedido = produtosPedido.filter((p) => p.produto.id !== produto.id);

    atualizarCarrinho(novosProdutosPedido);

    return novosProdutosPedido;
  };

  const CarrinhoService = {
    adicionarAoCarrinho,
    consultarCarrinho,
    aumentarQuantidade,
    diminuirQuantidade,
    removerProduto,
  };
  
  export default CarrinhoService;