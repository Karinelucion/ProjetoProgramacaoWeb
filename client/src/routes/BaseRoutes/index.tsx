import { Route, Routes } from "react-router-dom";
// import { CategoryFormPage } from "@/pages/CategoryFormPage";
// import { ProductListPage } from "@/pages/ProductListPage";
// import { ProductFormPage } from "@/pages/ProductFormPage";
// import { ProductListPageV2 } from "@/pages/ProductListPageV2";
// import { ProductFormPageV2 } from "@/pages/ProductFormPageV2";
// import { LoginPage } from "@/pages/LoginPage";
// import { UserSignupPage } from "@/pages/UserSignupPage";
// import { AuthenticatedRoutes } from "../AuthenticatedRoutes";
// import { HomePage } from "@/pages/HomePage";
// import { CategoryListPage } from "@/pages/CategoryListPage";

export function BaseRoutes() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
        {/* <Route path="/usuario" element={<UserSignupPage />} /> */}

        {/* Protected Routes */}
        <Route element={<AuthenticatedRoutes />}>
            <Route path="/inicio" element={<HomePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/categorias" element={<CategoryListPage />} />
            {/* <Route path="/categorias/new" element={<CategoryFormPage />} /> */}
            <Route path="/categorias/:id" element={<CategoryFormPage />} />

            <Route path="/produtos" element={<ProductListPage />} />
            {/* <Route path="/produtos/new" element={<ProductFormPage />} /> */}
            <Route path="/produtos/:id" element={<ProductFormPage />} />
        </Route>

      </Routes>
    </>
  );
}