import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProdutoService from "@/service/ProdutoService";
import CarrinhoService from "@/service/CarrinhoService";
import { IProduto } from "@/commons/interfaces";
import { Header } from "@/components/Header";

import "./style.scss"

export function ProdutosDetalhes() {
    const [data, setData] = useState<IProduto | null>(null);
    const [apiError, setApiError] = useState<string>("");
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ProdutoService.findOne(Number(id));
                setData(response.data);
                setApiError("");
            } catch (error) {
                setApiError("Falha ao carregar a lista de produtos.");
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    const onClickAdicionarAoCarrinho = (produto: IProduto) => {
        CarrinhoService.adicionarAoCarrinho(produto);
    };

    return (
        <>
        <Header/>
            {data && (
                <div className="p-5 background ">
                    <div className="row row-cols-lg-2 m-5 ">
                        <div>
                            <div >    
                                <img src={data.urlImagem} alt={data.nome} id="main-img"  className="rounded"/>
                            </div>
                        </div>

                        <div className="">
                            <h1 className="nome-produto fs-1"><b>{data.nome}</b></h1>
                            <p className="text-light">{data.descricao}</p>
                            <div className="mt-5 align-items-center justify-content-between">
                                <div className="d-flex w-50 p-0">
                                    <p className="price-color fs-2">R${data.preco}</p>
                                    <p className="texto-info">à vista</p>         
                                </div>
                                <div>
                                    <p className="m-0 texto-info">Ou até 6x de R${(data.preco / 6).toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="d-flex mt-5 align-items-end justify-content-center">
                                <button onClick={() => onClickAdicionarAoCarrinho(data)} type="button" className="btn btn-primary btn-cadastrar btn-adicionar w-50" data-mdb-ripple-color="dark">
                                    <i className="fas fa-plus-circle me-2"></i>
                                    Adicionar ao carrinho
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="m-5">
                    <div className="m-5 d-flex text-center justify-content-center align-items-center">
                            <hr className="my-4 hr hr-blurry w-50 divisor-color" />
                            <h1 className="mx-4 flex-fill categorias-title">Características do produto</h1>
                            <hr className="my-4 hr hr-blurry w-50 divisor-color" />
                        </div>
                        <ul className="">
                            <li className=" product-attributes px-4 py-3">
                                {data.descricao}
                            </li>
                        </ul>
                    </div>
                </div>
            )}

            {apiError && <p>{apiError}</p>}
        </>
    );
}
