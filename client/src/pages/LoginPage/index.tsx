import { ChangeEvent, useState } from "react";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import { ILoginUsuario } from "@/commons/interfaces";
import AuthService from "@/service/AuthService";
import { ButtonWithProgress } from "@/components/ButtonWithProgress";
import { Header } from "@/components/Header";
import { useColorModeValue, Box, Heading, Text } from '@chakra-ui/react';


export function LoginPage() {
  const [form, setForm] = useState({
    nomeUsuario: "",
    senha: "",
  });
  const navigate = useNavigate();
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");
  const textColor = useColorModeValue('whiteAlpha.900', 'whiteAlpha.900');
  const bgColor = useColorModeValue('gray.800', 'gray.900');

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setApiError("");
  };

  const onClickLogin = async () => {
    setPendingApiCall(true);
    event?.preventDefault();
    const usuario: ILoginUsuario = {
      nomeUsuario: form.nomeUsuario,
      senha: form.senha,
    };

    const response = await AuthService.login(usuario);
    if (response.status === 200) {
      setApiSuccess("Autenticado com sucesso!");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      setPendingApiCall(false);
      setApiError("Falha ao autenticar o usuário!");
    }
  };

  return (
    <>
      <Header />
      <div className="background" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh', paddingTop: '4rem'}}>
        <Box bg={bgColor} p={4} className="container" style={{ width: '50%' }}>
          <div className="d-flex justify-content-center">
            <Heading color={textColor} as="h3" size="lg" mb={4}>Login</Heading>
          </div>
          <main className="form-signup w-100 m-auto">
            <form>
              <div className="form-floating">
                <input
                  id="nomeUsuario"
                  name="nomeUsuario"
                  className="form-control"
                  type="text"
                  placeholder="Informe o usuário"
                  onChange={onChange}
                />
                <label htmlFor="nomeUsuario">Informe o usuário</label>
              </div>
              <div className="form-floating">
                <input
                  id="senha"
                  name="senha"
                  className="form-control"
                  type="password"
                  placeholder="Informe a senha"
                  onChange={onChange}
                />
                <label htmlFor="senha">Informe a senha</label>
              </div>

              {apiError && (
                <div className="col-12 mb-3">
                  <div className="alert alert-danger">{apiError}</div>
                </div>
              )}
              {apiSuccess && (
                <div className="col-12 mb-3">
                  <div className="alert alert-success">{apiSuccess}</div>
                </div>
              )}

              <ButtonWithProgress
                className="w-100 btn btn-lg btn-success mb-3"
                onClick={onClickLogin}
                disabled={pendingApiCall}
                pendingApiCall={pendingApiCall}
                text="Login"
              />
            </form>
            <div className="text-center">

            <Text color={textColor} className="my-0">Não possui cadastro?<Link to="/usuario" className="link-primary">Clique aqui!</Link></Text>
            </div>
          </main>
        </Box>
      </div>
    </>
  );
}