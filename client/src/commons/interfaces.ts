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