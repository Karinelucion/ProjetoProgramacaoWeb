import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProdutoService from "@/service/ProdutoService";
import { IProduto } from "@/commons/interfaces";
import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Stack } from "@chakra-ui/react";

export function ProdutosPorCategoria() {
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
            <div className="">
                <img className="white-space-header" src="img/White-space.png" alt=""/></div>

            <div className="m-5 p-5 product-page h-100">
                <div className="row row-cols row-cols-lg-2 m-5 justify-content-between">
                    <div className="justify-content-center text-center images-wrapper pb-3">
                        <div className="bg-image hover-zoom">
                            <img src="img/mouse-produto.png" alt="" id="main-img"/>
                        </div>
                        <ul className="list-group list-group-horizontal justify-content-center">
                            <a href="#"><li className="list-group-item images-list bg-image hover-zoom p-0"><img src="img/mouse-produto.png" className="product-mimalist-images" alt=""/></li></a>
                            <a href="#"><li className="list-group-item images-list bg-image hover-zoom p-0"><img src="img/g403-img02.png" className="product-mimalist-images" alt=""/></li></a>
                            <a href="#"><li className="list-group-item images-list bg-image hover-zoom p-0"><img src="img/g403-img03.png" className="product-mimalist-images" alt=""/></li></a>
                            <a href="#"><li className="list-group-item images-list bg-image hover-zoom p-0"><img src="img/g403-img04.png" className="product-mimalist-images" alt=""/></li></a>
                        </ul>
                    </div>

                    <div className="details-wrapper">
                        <h1 className="product-title"><b>Logitech G403 Hero</b></h1>
                        <p className="mt-5 my-0">RGB LIGHTSYNC</p>
                        <p className="my-0">6 Botões Programáveis</p>
                        <p className="my-0 mb-3">Ajuste de Peso e Sensor HERO 25K</p>
                        <p className="my-0">SKU: 910-005631</p>
                        <p className="my-0">Disponibilidade:Imediata</p>
                        <p className="my-0 mb-3">Garantia: 2 anos</p>
                        <p className="">
                            O G403 HERO Gaming Mouse apresenta o sensor HERO 25K de última geração, com rastreamento 1: 1, mais de 400 IPS e sensibilidade máxima de 400- 25.600 DPI -
                            além de suavização, filtragem ou aceleração zero. A iluminação RGB de espectro total responde à ação do jogo, áudio e cor da tela.
                            Personalize os efeitos de iluminação de aproximadamente 16,8 milhões de cores com o software Logitech G HUB e sincronize com seus equipamentos G.
                            O G403 HERO é confortavelmente projetado para jogos com uma forma que é fácil de segurar e controlar.
                        </p>
                        <div className="mt-5 row row-cols-4 align-items-center justify-content-between">
                            <div className="d-flex w-50 p-0">
                                <p className="price-color w-auto p-0"><b>R$ 299,90</b></p>
                                <p className="p-0 w-25">à vista</p>
                            </div>
                            <div className="w-50 text-end p-0">
                                <p className="m-0">Ou até 6x de R$56,26</p>
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
                                                <div className="ms-2 me-auto">2x sem juros de R$ 116,10</div>
                                                <div className="fw-bold">Total: R$ 232,21</div>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-start modal-list">
                                                <div className="ms-2 me-auto">3x sem juros de R$ 77,40</div>
                                                <div className="fw-bold">Total: R$ 232,21</div>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-start modal-list">
                                                <div className="ms-2 me-auto">4x sem juros de R$ 58,05</div>
                                                <div className="fw-bold">Total: R$ 232,21</div>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-start modal-list">
                                                <div className="ms-2 me-auto">5x sem juros de R$ 46,44</div>
                                                <div className="fw-bold">Total: R$ 232,21</div>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-start modal-list">
                                                <div className="ms-2 me-auto">6x sem juros de R$ 38,70</div>
                                                <div className="fw-bold">Total: R$ 232,21</div>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-start modal-list">
                                                <div className="ms-2 me-auto">7x sem juros de R$ 33,17</div>
                                                <div className="fw-bold">Total: R$ 232,21</div>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-start modal-list">
                                                <div className="ms-2 me-auto">8x sem juros de R$ 29,02</div>
                                                <div className="fw-bold">Total: R$ 232,21</div>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-start modal-list">
                                                <div className="ms-2 me-auto">9x sem juros de R$ 25,80</div>
                                                <div className="fw-bold">Total: R$ 232,21</div>
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
                            <div className="d-flex justify-content-between">


                            </div>
                        </div>
                    </div>
                </div>

                <hr className="mx-5 divisor-margin hr hr-blurry w-auto divisor-color" />

                <div className="m-5">
                    <h1 className="my-5"><b>Características</b></h1>
                    <ul className="list-group list-group-light">
                        <li className="list-group-item product-attributes px-4 py-3">
                            Sensor HERO 25K – O sensor para jogos da próxima geração com rastreamento 1:1,
                            IPS de 400+ e resolução máxima de DPI de 100 a 25.600, além de suavização, filtragem e aceleração nulas.
                        </li>
                        <li className="list-group-item product-attributes px-4 py-3">
                            LIGHTSYNC RGB – Iluminação com espectro completo inteligente que responde às ações,
                            ao áudio e às cores da tela no jogo. Personalize os efeitos de iluminação com aproximadamente 16,8 milhões de cores com o software para
                            jogos G HUB e sincronize com seu equipamento G
                        </li>
                        <li className="list-group-item product-attributes px-4 py-3">
                            Conforto e durabilidade supremos – O G403 HERO é confortavelmente projetado para jogos,
                            com um formato fácil de segurar e controlar, materiais de alta qualidade, fabricação leve (87 g), laterais emborrachadas e peso removível de 10 g.
                        </li>
                        <li className="list-group-item product-attributes px-4 py-3">
                            LOGITECH G HUB – Configure seis botões programáveis para simplificar as ações no jogo.
                            A alternância de DPI imediata permite programar e alternar entre até cinco configurações de sensibilidade, de 100 a 25.600 DPI*.
                            Requer o software Logitech G HUB, disponível em logitechG.com/GHUB.
                        </li>
                        <li className="list-group-item product-attributes px-4 py-3">
                            Desempenho de jogo avançado – Até 8x mais rápido que mouses padrão, com uma taxa de transmissão de 1 ms,
                            e tensionamento de botões por mola que propiciam uma resposta melhor com menos força.
                        </li>
                    </ul>


                </div>

                <div className="m-5 d-flex text-center justify-content-center align-items-center">
                    <hr className="my-4 hr hr-blurry w-50 divisor-color" />
                    <h1 className="mx-4 flex-fill categorias-title">Outros produtos</h1>
                    <hr className="my-4 hr hr-blurry w-50 divisor-color" />
                </div>
                <section>
                    <div className="row row-cols-1 row-cols-md-2 g-4 justify-content-center w-100 m-0">
                        <div className="col mx-2 card-hp-produtos-settings">
                            <a href="produto.html">
                                <div className="card h-100 card-hp-produtos-conteudo p-3 justify-content-center text-center" id="item-5">
                                    <img src="img/mouse2-produto-removebg-preview.png" className="w-100 h-auto" alt="" data-aos="flip-up" data-aos-delay="100" data-aos-duration="500"/>
                                        <h2 className="produto-title">DeathAdder</h2>
                                        <h5 className="produto-brand my-2">Razer</h5>
                                        <h2 className="produto-price my-2">R$ 129,90</h2>
                                        <button type="button" className="btn btn-outline-primary btn-cadastrar mt-3" data-mdb-ripple-color="dark"><i className="fas fa-plus-circle me-2"></i>Comprar</button>
                                </div>
                            </a>

                        </div>

                        <div className="col mx-2 card-hp-produtos-settings">
                            <a href="produto.html">
                                <div className="card h-100 card-hp-produtos-conteudo p-3 justify-content-center text-center" id="item-6">
                                    <img src="img/teclado2-produto-removebg-preview.png" className="w-100 h-auto "  alt="" data-aos="flip-up" data-aos-delay="400" data-aos-duration="500"/>

                                        <h2 className="produto-title">Ocean Star</h2>
                                        <h5 className="produto-brand my-2">Akko</h5>
                                        <h2 className="produto-price my-2">R$ 699,90</h2>
                                        <button type="button" className="btn btn-outline-primary btn-cadastrar mt-3" data-mdb-ripple-color="dark"><i className="fas fa-plus-circle me-2"></i>Comprar</button>


                                </div>
                            </a>

                        </div>

                        <div className="col mx-2 card-hp-produtos-settings">
                            <a href="produto.html">
                                <div className="card h-100 card-hp-produtos-conteudo p-3 justify-content-center text-center" id="item-7">
                                    <img src="img/headset2-produto-removebg-preview.png" className="w-100 h-auto" alt="" data-aos="flip-up" data-aos-delay="700" data-aos-duration="500"/>
                                        <h2 className="produto-title">Virtuoso</h2>
                                        <h5 className="produto-brand my-2">Corsair</h5>
                                        <h2 className="produto-price my-2">R$ 899,90</h2>
                                        <button type="button" className="btn btn-outline-primary btn-cadastrar mt-3" data-mdb-ripple-color="dark"><i className="fas fa-plus-circle me-2"></i>Comprar</button>
                                </div>
                            </a>

                        </div>

                        <div className="col mx-2 card-hp-produtos-settings">
                            <a href="produto.html">
                                <div className="card h-100 card-hp-produtos-conteudo p-3 justify-content-center text-center" id="item-8">
                                    <img src="img/teclado3-produto-removebg-preview.png" className="w-100 h-auto " alt="" data-aos="flip-up" data-aos-delay="1000" data-aos-duration="500"/>
                                        <h2 className="produto-title">9009 Retro</h2>
                                        <h5 className="produto-brand my-2">Akko</h5>
                                        <h2 className="produto-price my-2">R$ 699,90</h2>
                                        <button type="button" className="btn btn-outline-primary btn-cadastrar mt-3" data-mdb-ripple-color="dark"><i className="fas fa-plus-circle me-2"></i>Comprar</button>
                                </div>
                            </a>

                        </div>
                    </div>

                    <nav aria-label="Page navigation example">
                        <ul className="pagination d-flex justify-content-center text-center mt-4">
                            <li className="page-item">
                                <a className="page-link pagination-settings" href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            <li className="page-item"><a className="page-link pagination-settings" href="#">1</a></li>
                            <li className="page-item"><a className="page-link pagination-settings" href="#">2</a></li>
                            <li className="page-item"><a className="page-link pagination-settings" href="#">3</a></li>
                            <li className="page-item">
                                <a className="page-link pagination-settings" href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </section>

            </div>
        </>);

}