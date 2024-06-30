import React from 'react';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';
import AuthService from '@/service/AuthService';
import "./style.scss";
import { FaShoppingCart } from "react-icons/fa";

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
                    <div className="h-100 align-items-center my-auto mx-1">  
                        <Link to="/login" type="button" className="btn btn-outline-success" data-mdb-ripple-color="dark" data-mdb-toggle="modal" data-mdb-target="#loginModal">Entrar</Link>
                    </div>
                    <div className="h-100 align-items-center my-auto mx-1">
                        <Link to="/usuario" type="button" className="btn btn-outline-success" data-mdb-ripple-color="dark" data-mdb-toggle="modal" data-mdb-target="#cadastroModal">Cadastre-se já!</Link>
                    </div>
                    <li className="nav-item me-3 me-lg-1 ms-2 align-self-center ">
                        <Link to="/carrinho" type='button' className='text-light position-relative'>
                            <FaShoppingCart className='fs-4'/>
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-notification bg-success" id="badgeCarrinho">0</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

