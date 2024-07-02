import { IPedido } from "@/commons/interfaces";
import { api } from "@/lib/axios";

const registrarPedido = async (pedido: IPedido): Promise<any> => {
    let response;
    try {
      response = await api.post("/pedidos/salvar", pedido);
    } catch (err: any) {
      response = err.response;
    }
    return response;
  };

  const consultarPedidosUsuario = async (): Promise<any> => {
    let response;

    try {
      response = await api.get("/pedidos/meuspedidos");
    } catch (err: any) {
      response = err.response;
    }
    return response;
  }

  const PedidoService = {
    registrarPedido,
    consultarPedidosUsuario,
  };
  export default PedidoService;