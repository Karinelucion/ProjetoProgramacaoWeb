import { Link, NavLink } from "react-router-dom";
import logo from "@/assets/logo.png";
//import AuthService from "@/service/AuthService";

export function Header() {
    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-light nav-settings">
            <div className="container-fluid">
                <div className="d-flex">
                    <Link to="/" className="navbar-brand mt-2 mt-lg-0" >
                        <img className="logo-settings img-fluid" src={logo} alt="logo" />
                    </Link>
                </div>
                <ul className="navbar-nav flex-row">

                    <button type="button" className="btn btn-outline-primary btn-entrar" data-mdb-ripple-color="dark" data-mdb-toggle="modal" data-mdb-target="#loginModal">Entrar</button>

                    <div className="h-100 align-items-center my-auto">
                        <button type="button" className="btn btn-outline-primary btn-cadastrar" data-mdb-ripple-color="dark" data-mdb-toggle="modal" data-mdb-target="#cadastroModal">Cadastre-se já!</button>
                    </div>


                    <li className="nav-item me-3 me-lg-1">
                        <a className="nav-link text-center" href="pedido.html" id="carrinho">
                            <span className=""><i className="fas fa-shopping-bag fa-lg icon-color icon-settings align-items-center"></i></span>
                            <span className="badge rounded-pill badge-notification bg-danger" id="badgeCarrinho">0</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
