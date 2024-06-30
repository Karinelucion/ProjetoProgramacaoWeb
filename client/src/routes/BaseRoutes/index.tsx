import { Route, Routes } from "react-router-dom";
import { ListagemDeProdutos } from "@/pages/ListagemDeProdutosPage";
import { AuthenticatedRoutes } from "../AuthenticatedRoutes";
import { ProdutosDetalhes } from "@/pages/ProdutoDetalhesPage";
import { CadastroUsuario } from "@/pages/CadastroUsuarioPage";
import { LoginPage } from "@/pages/LoginPage";
import { HomePage } from "@/pages/HomePage";
import { ProdutosPorCategoria } from "@/pages/ProdutosPorCategoriaPage";
import { CarrinhoPage } from "@/pages/CarrinhoPage";

export function BaseRoutes() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/usuario" element={<CadastroUsuario/>} />
        <Route path="/inicio" element={<HomePage />} />
        <Route path="/" element={<HomePage />} /> 
        <Route path="/produtos" element={<ListagemDeProdutos />} />
        <Route path="/categorias/:id" element={<ProdutosPorCategoria />} />
        <Route path="/produtos/:id" element={<ProdutosDetalhes />} />
        <Route path="/carrinho" element={<CarrinhoPage />} />

        {/* Protected Routes */}
        <Route element={<AuthenticatedRoutes />}>

        </Route>

      </Routes>
    </>
  );
}