import { ICategoria } from "@/commons/interfaces";
import { api } from "@/lib/axios";


const categoriaURL = "/categorias";

const save = async (categoria: ICategoria): Promise<any> => {
  let response;
  try {
    response = await api.post(categoriaURL, categoria);
  } catch (err: any) {
    response = err.response;
  }
  return response;
};


const findAll = async (): Promise<any> => {
  let response;
  try {
    response = await api.get(categoriaURL);
  } catch (err: any) {
    response = err.response;
  }
  return response;
};


const remove = async (id: number): Promise<any> => {
  let response;
  try {
    response = await api.delete(`${categoriaURL}/${id}`);
  } catch (err: any) {
    response = err.response;
  }
  return response;
};


const findById = async (id: number): Promise<any> => {
  let response;
  try {
    response = await api.get(`${categoriaURL}/${id}`);
  } catch (err: any) {
    response = err.response;
  }
  return response;
};

const CategoriaService = {
  save,
  findAll,
  remove,
  findById,
};

export default CategoriaService;