import React from 'react';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';
import AuthService from '@/service/AuthService';
import "./style.scss";

export function Header(){
    const onClickLogout = () => {
        AuthService.logout();
        window.location.reload();
      };
    
    return (
        <nav className="navbar fixed-top navbar-expand-lg nav-settings">
            <div className="container-fluid">
                <div className="d-flex">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                <ul className="navbar-nav flex-row">
                    <Link to="/login" type="button" className="btn btn-outline-primary" data-mdb-ripple-color="dark" data-mdb-toggle="modal" data-mdb-target="#loginModal">Entrar</Link>
                    <div className="h-100 align-items-center my-auto">
                        <Link to="/usuario" type="button" className="btn btn-outline-primary btn-cadastrar" data-mdb-ripple-color="dark" data-mdb-toggle="modal" data-mdb-target="#cadastroModal">Cadastre-se já!</Link>
                    </div>
                    <li className="nav-item me-3 me-lg-1">
                        <a className="nav-link text-center" href="pedido.html" id="carrinho">
                            <span><i className="fas fa-shopping-bag fa-lg icon-color icon-settings align-items-center"></i></span>
                            <span className="badge rounded-pill badge-notification bg-danger" id="badgeCarrinho">0</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

