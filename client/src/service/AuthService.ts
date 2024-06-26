import { ILoginUsuario, ICadastroUsuario } from "@/commons/interfaces";
import { api } from "@/lib/axios";


const signup = async (usuario: ICadastroUsuario): Promise<any> => {
  let response;
  try {
    response = await api.post("/usuario", usuario);
  } catch (err: any) {
    response = err.response;
  }
  return response;
};

const login = async (usuario: ILoginUsuario) => {
  let response;
  try {
    response = await api.post("/login", usuario);
    localStorage.setItem("token", JSON.stringify(response.data.token));
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.token}`;
  } catch (err: any) {
    response = err.response;
  }
  return response;
};

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      token
    )}`;
  }

  return token ? true : false;
};


const logout = () => {
  localStorage.removeItem("token");
};

const AuthService = {
  signup,
  login,
  isAuthenticated,
  logout,
};
export default AuthService;