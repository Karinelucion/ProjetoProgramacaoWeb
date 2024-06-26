import { Route, Routes } from "react-router-dom";
// import { CategoryFormPage } from "@/pages/CategoryFormPage";
import { ListagemDeProdutos } from "@/pages/ListagemDeProdutosPage";
import { AuthenticatedRoutes } from "../AuthenticatedRoutes";
// import { ProductFormPage } from "@/pages/ProductFormPage";
// import { ProductListPageV2 } from "@/pages/ProductListPageV2";
// import { ProductFormPageV2 } from "@/pages/ProductFormPageV2";
// import { LoginPage } from "@/pages/LoginPage";
 import { CadastroUsuario } from "@/pages/CadastroUsuarioPage";
import { LoginPage } from "@/pages/LoginPage";
import { HomePage } from "@/pages/HomePage";
// import { AuthenticatedRoutes } from "../AuthenticatedRoutes";
// import { HomePage } from "@/pages/HomePage";
// import { CategoryListPage } from "@/pages/CategoryListPage";

export function BaseRoutes() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/usuario" element={<CadastroUsuario/>} />
        <Route path="/inicio" element={<HomePage />} />
            <Route path="/" element={<HomePage />} /> 

        {/* Protected Routes */}
        <Route element={<AuthenticatedRoutes />}>
            
            {/* <Route path="/categorias" element={<CategoryListPage />} /> */}
            {/* <Route path="/categorias/:id" element={<CategoryFormPage />} /> */}

            <Route path="/produtos" element={<ListagemDeProdutos />} />
            {/* <Route path="/produtos/:id" element={<ProductFormPage />} /> */}
        </Route>

      </Routes>
    </>
  );
}