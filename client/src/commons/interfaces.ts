export interface ICategoria {
    id?: number;
    nome: string;
}

export interface IProduto {
    id?: number;
    nome: string;
    descricao: string;
    preco: number;
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