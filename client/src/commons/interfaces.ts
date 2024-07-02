export interface ICategoria {
    id?: number;
    nome: string;
}

export interface IProduto {
    id?: number;
    nome: string;
    descricao: string;
    preco: number;
    urlImagem: string;
    categoria: ICategoria;
  }

export interface ICadastroUsuario{
    id?: number;
    nomeUsuario: string;
    nomeExibicao: string;
    senha: string;
    senhaRepeat: string;
}

export interface ILoginUsuario{
    nomeUsuario: string;
    senha: string;
}

export interface IProdutosPedido{
    id?: number;
    pedido?: number;
    produto: IProduto;
    quantidade: number;
}

export interface IPedido{
    id?: number;
    usuario?: ICadastroUsuario;
    dataHora: Date;
    valorTotal?: number;
    produtosPedido: IProdutosPedido[];

}