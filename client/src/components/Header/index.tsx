import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';
import AuthService from '@/service/AuthService';
import "./style.scss";
import { FaShoppingCart } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi"
import { Button, IconButton } from '@chakra-ui/react';
import CarrinhoService from '@/service/CarrinhoService';

export function Header() {
    const [quantidadeProdutos, setQuantidadeProdutos] = useState(0);

    const onClickLogout = () => {
        AuthService.logout();
        window.location.reload();
    };

    useEffect(() => {
        const updateQuantidadeProdutos = () => {
            const quantidade = CarrinhoService.consultarCarrinho().length;
            setQuantidadeProdutos(quantidade);
        };
        updateQuantidadeProdutos();

        const listener = () => {
            updateQuantidadeProdutos();
        };
        document.addEventListener('carrinhoAtualizado', listener);

        return () => {
            document.removeEventListener('carrinhoAtualizado', listener);
        };
    }, []);

    return (
        <nav className="navbar fixed-top navbar-expand-lg nav-settings">
            <div className="container-fluid">
                <div className="d-flex">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                <ul className="navbar-nav flex-row align-itens-center">
                    {AuthService.isAuthenticated() ? (
                        <>
                            <div className="h-100 align-items-center my-auto">
                                <Link to="/meuspedidos" type="button" className="btn btn-outline-success" data-mdb-ripple-color="dark" data-mdb-toggle="modal" data-mdb-target="#cadastroModal">Meus pedidos</Link>
                            </div>
                            <IconButton
                                colorScheme="white"
                                size="sm"
                                icon={<FiLogOut />}
                                aria-label="Remover produto"
                                onClick={onClickLogout}
                                className='fs-4 mx-3'
                            />
                        </>
                    ) : (
                        <>
                            <div className="h-100 align-items-center my-auto">
                                <Link to="/login" type="button" className="btn btn-outline-success" data-mdb-ripple-color="dark" data-mdb-toggle="modal" data-mdb-target="#loginModal">Entrar</Link>
                            </div>
                            <div className="h-100 align-items-center my-auto mx-3">
                                <Link to="/usuario" type="button" className="btn btn-outline-success" data-mdb-ripple-color="dark" data-mdb-toggle="modal" data-mdb-target="#cadastroModal">Cadastre-se já!</Link>
                            </div>
                        </>
                    )}
                    <li className="nav-item me-3 align-self-center ">
                        <Link to="/carrinho" type='button' className='text-light position-relative'>
                            <FaShoppingCart className='fs-4' />
                            {quantidadeProdutos > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-notification bg-success" id="badgeCarrinho">{quantidadeProdutos}</span>
                            )}
                        </Link>
                    </li>

                </ul>
            </div>
        </nav>
    );
}

