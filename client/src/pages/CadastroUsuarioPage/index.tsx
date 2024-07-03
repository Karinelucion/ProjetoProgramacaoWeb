import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ICadastroUsuario } from "@/commons/interfaces";
import { ButtonWithProgress } from "../../components/ButtonWithProgress";
import { Input } from "../../components/Input";
import { Header } from "../../components/Header";
import { useColorModeValue, Box, Heading, Text } from '@chakra-ui/react';
import AuthService from "@/service/AuthService";


export function CadastroUsuario() {
  const [form, setForm] = useState<ICadastroUsuario>({
    nomeExibicao: "",
    nomeUsuario: "",
    senha: "",
    senhaRepeat: "",
  });
  const [errors, setErrors] = useState({
    nomeExibicao: "",
    nomeUsuario: "",
    senha: "",
  });
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [senhaRepeatError, setSenhaRepeatError] = useState("");
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  const bgColor = useColorModeValue('gray.800', 'gray.900');
  const textColor = useColorModeValue('whiteAlpha.900', 'whiteAlpha.900');

  useEffect(() => {
    if (form.senha || form.senhaRepeat) {
      setSenhaRepeatError(
        form.senha === form.senhaRepeat
          ? ""
          : "As senhas devem ser iguais"
      );
    }
  }, [form]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setForm((previousForm) => {
      return {
        ...previousForm,
        [name]: value,
      };
    });
    
    setErrors((previousErrors) => {
      return {
        ...previousErrors,
        [name]: undefined,
      };
    });
  };

  const onClickSignup = async () => {
    const user: ICadastroUsuario = {
      nomeExibicao: form.nomeExibicao,
      nomeUsuario: form.nomeUsuario,
      senha: form.senha,
      senhaRepeat: form.senhaRepeat,
    };
    setPendingApiCall(true);

    const response = await AuthService.signup(user);

    if (response.status === 200 || response.status === 201) {
      navigate("/");
    } else if (response) {
      if (response.data && response.data.validationErrors) {
        setErrors(response.data.validationErrors);
      }
      setApiError("Ocorreu um erro ao salvar o usuário.");
    }
    setPendingApiCall(false);
  };

  return (
    <>
      <Header/>
      <div className="background" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh', paddingTop: '4rem'}}>
        <Box bg={bgColor} p={4} className="container" style={{width: '50%'}}>
          <div className="d-flex justify-content-center">
            <Heading color={textColor} as="h3" size="lg" mb={4}>Cadastre-se</Heading>
          </div>
          <main className="form-signup w-100 m-auto">
            <form>
              <div className="form-floating">
                <Input
                  name="nomeExibicao"
                  label="Informe o seu nome"
                  className="form-control"
                  type="text"
                  placeholder="Informe seu nome"
                  onChange={onChange}
                  value={form.nomeExibicao}
                  hasError={errors.nomeExibicao ? true : false}
                  error={errors.nomeExibicao} id={""}          />
              </div>
              <div className="form-floating">
                <Input
                  name="nomeUsuario"
                  label="Informe o usuário"
                  className="form-control"
                  type="text"
                  placeholder="Informe o usuário"
                  onChange={onChange}
                  value={form.nomeUsuario}
                  hasError={errors.nomeUsuario ? true : false}
                  error={errors.nomeUsuario} id={""}          />
              </div>
              <div className="form-floating">
                <Input
                  name="senha"
                  label="Informe a senha"
                  className="form-control"
                  type="password"
                  placeholder="Informe a senha"
                  onChange={onChange}
                  value={form.senha}
                  hasError={errors.senha ? true : false}
                  error={errors.senha} id={""}          />
              </div>
              <div className="form-floating">
                <Input
                  name="senhaRepeat"
                  label="Confirme sua senha"
                  className="form-control"
                  type="password"
                  placeholder="Informe sua senha"
                  onChange={onChange}
                  value={form.senhaRepeat}
                  hasError={senhaRepeatError ? true : false}
                  error={senhaRepeatError ? senhaRepeatError : ""} id={""}          />
              </div>
              {apiError && (
                <div className="col-12 mb-3">
                  <div className="alert alert-danger">{apiError}</div>
                </div>
              )}

              <ButtonWithProgress
                className="w-100 btn btn-lg btn-success mb-3"
                onClick={onClickSignup}
                disabled={pendingApiCall || senhaRepeatError ? true : false}
                text="Cadastrar"
                pendingApiCall={pendingApiCall}
              />

              <div  className="text-center">
                <Text color={textColor} className="my-0">Já possui cadastro? <Link to="/login" className="link-primary">Entre agora</Link></Text>
                
              </div>
            </form>
          </main>
        </Box>
      </div>
    </>
  );
}