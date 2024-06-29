import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProdutoService from "@/service/ProdutoService";
import { IProduto } from "@/commons/interfaces";
import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Stack } from "@chakra-ui/react";

export function ProdutosDetalhes() {
    const [data, setData] = useState<IProduto[]>([]);
    const [apiError, setApiError] = useState("");
    const navigate = useNavigate();
    const { findAll, remove } = ProdutoService;

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const response = await findAll();
        if (response.status === 200) {
            setData(response.data);
            setApiError("");
        } else {
            setApiError("Falha ao carregar a lista de produtos.");
        }
    };

    const onEdit = (url: string) => {
        navigate(url);
    };

    const onRemove = async (id: number) => {
        const response = await remove(id);
        if (response.status === 200 || response.status === 204) {
            setData(
                data.filter((produto) => {
                    return produto.id !== id;
                })
            );
            console.log(data);
            setApiError("");
        } else {
            setApiError("Falha ao remover o produto.");
        }
    };

    return (
        <>
        {data.map(produto => (
            <div className="m-5 p-5 product-page h-100">
                <div className="row row-cols row-cols-lg-2 m-5 justify-content-between">
                    <div className="justify-content-center text-center images-wrapper pb-3">
                        <div className="bg-image hover-zoom">
                            <img src={produto.imagem} alt="" id="main-img"/>
                        </div>
                        {/* <ul className="list-group list-group-horizontal justify-content-center">
                            <a href="#"><li className="list-group-item images-list bg-image hover-zoom p-0"><img src="img/mouse-produto.png" className="product-mimalist-images" alt=""/></li></a>
                            <a href="#"><li className="list-group-item images-list bg-image hover-zoom p-0"><img src="img/g403-img02.png" className="product-mimalist-images" alt=""/></li></a>
                            <a href="#"><li className="list-group-item images-list bg-image hover-zoom p-0"><img src="img/g403-img03.png" className="product-mimalist-images" alt=""/></li></a>
                            <a href="#"><li className="list-group-item images-list bg-image hover-zoom p-0"><img src="img/g403-img04.png" className="product-mimalist-images" alt=""/></li></a>
                        </ul> */}
                    </div>

                    <div className="details-wrapper">
                        <h1 className="product-title"><b>{produto.nome}</b></h1>
                        <p className="">
                            {produto.descricao}
                        </p>
                        <div className="mt-5 row row-cols-4 align-items-center justify-content-between">
                            <div className="d-flex w-50 p-0">
                                <p className="price-color w-auto p-0"><b>{produto.preco}</b></p>
                                <p className="p-0 w-25">à vista</p>
                            </div>
                            <div className="w-50 text-end p-0">
                                <p className="m-0">Ou até 6x de R${produto.preco/6}</p>
                                <button type="button" className="btn btn-outline-primary btn-cadastrar w-auto" data-mdb-ripple-color="dark" data-mdb-toggle="modal" data-mdb-target="#parcelasModal">Ver parcelas</button>
                            </div>

                        </div>
                        <div className="modal fade" id="parcelasModal" aria-labelledby="parcelasModal" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Opções de parcelamento</h5>
                                        <button type="button" className="btn-close modal-close" data-mdb-dismiss="modal" aria-label="Close"><i className="fas fa-times modal-close"></i></button>
                                    </div>

                                    <div className="modal-body">
                                        <ul className="list-group list-group-light">
                                            <li className="list-group-item d-flex justify-content-between align-items-start modal-list">
                                                <div className="ms-2 me-auto">2x sem juros de R$ {produto.preco/2}</div>
                                                <div className="fw-bold">Total: R$ {produto.preco}</div>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-start modal-list">
                                                <div className="ms-2 me-auto">3x sem juros de R${produto.preco/3}</div>
                                                <div className="fw-bold">Total: R$ {produto.preco}</div>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-start modal-list">
                                                <div className="ms-2 me-auto">4x sem juros de R$ {produto.preco/4}</div>
                                                <div className="fw-bold">Total: R$ {produto.preco}</div>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-start modal-list">
                                                <div className="ms-2 me-auto">5x sem juros de R$ {produto.preco/5}</div>
                                                <div className="fw-bold">Total: R$ {produto.preco}</div>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-start modal-list">
                                                <div className="ms-2 me-auto">6x sem juros de R$ {produto.preco/6}</div>
                                                <div className="fw-bold">Total: R$ {produto.preco}</div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex mt-3 align-items-end calcular-frete">
                            <div className="form-outline form-white calcular-frete w-auto align-items-center">
                                <input type="text" id="formWhite" className="form-control calcular-frete" />
                                <label className="form-label" >CEP</label>
                            </div>
                            <button type="submit" className="btn btn-outline-light btn-calcular">
                                Calcular
                            </button>
                        </div>

                        <div className="d-flex mt-5 align-items-end justify-content-center">
                            <button type="button" className="btn btn-outline-primary btn-cadastrar btn-adicionar w-50" data-mdb-ripple-color="dark"><i className="fas fa-plus-circle me-2"></i>Comprar</button>
                        </div>
                        <div className="w-100 row align-items-end justify-content-between">
                        </div>
                    </div>
                </div>

                <hr className="mx-5 divisor-margin hr hr-blurry w-auto divisor-color" />

                <div className="m-5">
                    <h1 className="my-5"><b>Características</b></h1>
                    <ul className="list-group list-group-light">
                        <li className="list-group-item product-attributes px-4 py-3">
                            {produto.descricao} </li>
                    </ul>
                </div>
            </div>
        ))}
        </>);

}