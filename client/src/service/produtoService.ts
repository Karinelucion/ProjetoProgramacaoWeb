import { IProduto } from "@/commons/interfaces";
import { api } from "@/lib/axios";

const produtoURL = "/produtos";

const save = async (produto: IProduto): Promise<any> => {
  let response;
  try {
    response = await api.post(produtoURL, produto);
  } catch (err: any) {
    response = err.response;
  }
  return response;
};

const findAll = async (): Promise<any> => {
  let response;
  try {
    response = await api.get(produtoURL);
  } catch (err: any) {
    response = err.response;
  }
  return response;
};

const findOne = async (id: number): Promise<any> => {
  let response;
  try {
    response = await api.get(`${produtoURL}/${id}`);
  } catch (err: any) {
    response = err.response;
  }
  return response;
};

const remove = async (id: number): Promise<any> => {
  let response;
  try {
    response = await api.delete(`${produtoURL}/${id}`);
  } catch (err: any) {
    response = err.response;
  }
  return response;
};

const ProdutoService = {
  save,
  findAll,
  findOne,
  remove,
};

export default ProdutoService;