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
        console.log(produto.imagem);
    };

    return (
        <>
        <Header/>
            {data && (
                <div className="p-5 background ">
                    <div className="row row-cols row-cols-lg-2 m-5 justify-content-between">
                        <div className="justify-content-center text-center pb-3">
                            <div className="bg-image hover-zoom">    
                                <img src={data.imagem} alt={data.nome} id="main-img" />
                            </div>
                        </div>

                        <div className="details-wrapper">
                            <h1 className="product-title"><b>{data.nome}</b></h1>
                            <p className="">{data.descricao}</p>
                            <div className="mt-5 row row-cols-4 align-items-center justify-content-between">
                                <div className="d-flex w-50 p-0">
                                    <p className="price-color w-auto p-0"><b>{data.preco}</b></p>
                                    <p className="p-0 w-25">à vista</p>
                                </div>
                                <div className="w-50 text-end p-0">
                                    <p className="m-0">Ou até 6x de R${(data.preco / 6).toFixed(2)}</p>
                                    <button type="button" className="btn btn-outline-primary btn-cadastrar w-auto" data-mdb-ripple-color="dark" data-mdb-toggle="modal" data-mdb-target="#parcelasModal">Ver parcelas</button>
                                </div>
                            </div>

                            {/* Modal de parcelas */}
                            <div className="modal fade" id="parcelasModal" aria-labelledby="parcelasModal" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Opções de parcelamento</h5>
                                            <button type="button" className="btn-close modal-close" data-mdb-dismiss="modal" aria-label="Close"><i className="fas fa-times modal-close"></i></button>
                                        </div>
                                        <div className="modal-body">
                                            <ul className="list-group list-group-light">
                                                {[2, 3, 4, 5, 6].map((parcela) => (
                                                    <li key={parcela} className="list-group-item d-flex justify-content-between align-items-start modal-list">
                                                        <div className="ms-2 me-auto">{parcela}x sem juros de R$ {(data.preco / parcela).toFixed(2)}</div>
                                                        <div className="fw-bold">Total: R$ {data.preco}</div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Botão adicionar ao carrinho */}
                            <div className="d-flex mt-3 align-items-end calcular-frete">
                                <div className="form-outline form-white calcular-frete w-auto align-items-center">
                                    <input type="text" id="formWhite" className="form-control calcular-frete" />
                                    <label className="form-label">CEP</label>
                                </div>
                                <button type="submit" className="btn btn-outline-light btn-calcular">
                                    Calcular
                                </button>
                            </div>

                            <div className="d-flex mt-5 align-items-end justify-content-center">
                                <button onClick={() => onClickAdicionarAoCarrinho(data)} type="button" className="btn btn-outline-primary btn-cadastrar btn-adicionar w-50" data-mdb-ripple-color="dark">
                                    <i className="fas fa-plus-circle me-2"></i>
                                    Comprar
                                </button>
                            </div>
                        </div>
                    </div>

                    <hr className="mx-5 divisor-margin hr hr-blurry w-auto divisor-color" />

                    <div className="m-5">
                        <h1 className="my-5"><b>Características</b></h1>
                        <ul className="list-group list-group-light">
                            <li className="list-group-item product-attributes px-4 py-3">
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
