import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

export function LoginPage() {
  const [form, setForm] = useState({
    nomeUsuario: "",
    senha: "",
  });

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setForm((previousForm) => {
      return {
        ...previousForm,
        [name]: value,
      };
    });
  };

  const onClickLogin = () => {
    const login = {
      username: form.nomeUsuario,
      password: form.senha,
    };

    axios
      .post("/login", login)
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container">
        <h1 className="text-center">
          Login
        </h1>
        <div className="col-12 mb-3">
          <label htmlFor="nomeUsuario">Informe seu usuário:</label>
          <input
            type="text"
            id="nomeUsuario"
            name="nomeUsuario"
            value={form.nomeUsuario}
            placeholder="Informe seu usuário"
            className="form-control"
            onChange={onChange}
          />
        </div>
        <div className="col-12 mb-3">
          <label htmlFor="senha">Informe sua senha:</label>
          <input
            type="senha"
            id="senha"
            name="senha"
            value={form.senha}
            placeholder="******"
            className="form-control"
            onChange={onChange}
          />
        </div>
        <div className="text-center">
          <button className="btn btn-primary" onClick={onClickLogin}>
            Login
          </button>
        </div>
        <div className="text-center">
            <Link to="/usuario">Cadastre-se</Link>
        </div>
      </div>
    </>
  );
}