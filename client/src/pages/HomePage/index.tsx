import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"

export function HomePage() {
    return (
        <>
            <Header/>
            <main className="container">
                <body className="background">
                    <div>
                        <figure>
                            <img src="img/blackfriday.png" alt="BlackFriday" className="figura-promocao" />
                        </figure>


                        <div className="mx-5 hp-principal">

                            <div className="mx-5 d-flex text-center justify-content-center">
                                <hr className="my-4 hr hr-blurry divisor-color" />
                                <h1 className="mx-4 categorias-title">Categorias</h1>
                                <hr className="my-4 hr hr-blurry divisor-color" />
                            </div>

                            <div>
                                <div className="d-flex row row-cols-md-2 row-cols-xl-2 g-4 justify-content-center w-100 m-0">
                                    <div className="col-6 mx-3 card-hp-settings">
                                        <div className="card h-100 card-hp-conteudo p-5">
                                            <div className="card-body row row-cols-md-2 p-0">
                                                <div className="col">
                                                    <a href="" className=" card-title"><h1 className="me-5 categorias">Mouse</h1></a>
                                                    <p className="card-text mt-3 card-hp-detalhamento"><b> A partir de</b></p>
                                                    <h2 className="mt-3 preco">R$ 79 -</h2>
                                                    <button type="button" className="btn btn-outline-primary btn-cadastrar mt-3" data-mdb-ripple-color="dark">Ver ofertas</button>
                                                </div>

                                                <div className="col h-100 align-items-center">
                                                    <img src="img/mouses.png" alt="" data-aos="zoom-in-left" data-aos-delay="100" data-aos-duration="300" className="p-3 card-hp-img-mouse" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-6 mx-3 card-hp-settings">
                                        <div className="card h-100 card-hp-conteudo p-5">
                                            <div className="card-body row row-cols-md-2 p-0">
                                                <div className="col">
                                                    <a href="" className=" card-title"><h1 className="me-5 categorias">Teclado</h1></a>
                                                    <p className="card-text mt-3 card-hp-detalhamento"><b> A partir de</b></p>
                                                    <h2 className="mt-3 preco">R$ 160 -</h2>
                                                    <button type="button" className="btn btn-outline-primary btn-cadastrar mt-3" data-mdb-ripple-color="dark">Ver ofertas</button>
                                                </div>
                                                <div className="col h-100 align-items-center">
                                                    <img src="img/teclados.png" alt="" data-aos="zoom-in-left" data-aos-delay="400" data-aos-duration="300" className="ps-3 card-hp-img-teclado" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col mx-3 card-hp-settings">
                                        <div className="card h-100 card-hp-conteudo p-5">
                                            <div className="card-body row row-cols-md-2 p-0">
                                                <div className="col">
                                                    <a href="" className="card-title"><h1 className="me-5 categorias">Headset</h1></a>
                                                    <p className="card-text mt-3 card-hp-detalhamento"><b> A partir de</b></p>
                                                    <h2 className="mt-3 preco">R$ 115 -</h2>
                                                    <button type="button" className="btn btn-outline-primary btn-cadastrar mt-3" data-mdb-ripple-color="dark">Ver ofertas</button>
                                                </div>
                                                <div className="col h-100 align-items-center">
                                                    <img src="img/headsets.png" alt="" data-aos="zoom-in-left" data-aos-delay="700" data-aos-duration="300" className="ps-3 card-hp-img-headset" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col mx-3 card-hp-settings">
                                        <div className="card h-100 card-hp-conteudo p-5">
                                            <div className="card-body row row-cols-md-2 p-0">
                                                <div className="col">
                                                    <a href="" className=" card-title"><h1 className="categorias">Mousepad</h1></a>
                                                    <p className="card-text mt-3 card-hp-detalhamento"><b> A partir de</b></p>
                                                    <h2 className="mt-3 preco">R$ 29 -</h2>
                                                    <button type="button" className="btn btn-outline-primary btn-cadastrar mt-3" data-mdb-ripple-color="dark">Ver ofertas</button>
                                                </div>
                                                <div className="col h-100 align-items-center">
                                                    <img src="img/mousepads.png" alt="" data-aos="zoom-in-left" data-aos-delay="1000" data-aos-duration="300" className="ps-3 card-hp-img-mousepad" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="m-5 d-flex text-center justify-content-center align-items-center">
                                <hr className="my-4 hr hr-blurry w-50 divisor-color" />
                                <h1 className="mx-4 flex-fill categorias-title">Produtos em destaque</h1>
                                <hr className="my-4 hr hr-blurry w-50 divisor-color" />
                            </div>
                            <section>
                                <div className="row row-cols-1 row-cols-md-2 g-4 justify-content-center w-100 m-0">
                                    <div className="col mx-2 card-hp-produtos-settings">
                                        <div className="card h-100 card-hp-produtos-conteudo p-3 justify-content-center text-center" id="item-1">
                                            <a href="produto.html">
                                                <img src="img/mouse-produto.png" className="w-100 h-auto produto-img" alt="" data-aos="flip-up" data-aos-delay="100" data-aos-duration="500" />
                                                <h2 className="produto-title">G403 Hero</h2>
                                                <h5 className="produto-brand my-2">Logitech</h5>
                                                <h2 className="produto-price my-2">R$ 299,90</h2>
                                            </a>
                                            <button type="button" className="btn btn-outline-primary btn-cadastrar mt-3" data-mdb-ripple-color="dark"><i className="fas fa-plus-circle me-2"></i>Comprar</button>
                                        </div>

                                    </div>

                                    <div className="col mx-2 card-hp-produtos-settings">

                                        <div className="card h-100 card-hp-produtos-conteudo p-3 justify-content-center text-center" id="item-2">
                                            <a>
                                                <img src="img/teclado1-produto.png" className="w-100 h-auto produto-img" alt="" data-aos="flip-up" data-aos-delay="400" data-aos-duration="500" />
                                                <h2 className="produto-title">G713</h2>
                                                <h5 className="produto-brand my-2">Logitech</h5>
                                                <h2 className="produto-price my-2">R$ 1.199,90</h2>
                                            </a>
                                            <button type="button" className="btn btn-outline-primary btn-cadastrar mt-3" data-mdb-ripple-color="dark"><i className="fas fa-plus-circle me-2"></i>Comprar</button>
                                        </div>
                                    </div>

                                    <div className="col mx-2 card-hp-produtos-settings">
                                        <div className="card h-100 card-hp-produtos-conteudo p-3 justify-content-center text-center" id="item-3">
                                            <a href="produto.html">
                                                <img src="img/headset1-produto.png" className="w-100 h-auto produto-img" alt="" data-aos="flip-up" data-aos-delay="700" data-aos-duration="500" />
                                                <h2 className="produto-title">G733 7.1</h2>
                                                <h5 className="produto-brand my-2">Logitech</h5>
                                                <h2 className="produto-price my-2">R$ 1.099,90</h2>
                                            </a>
                                            <button type="button" className="btn btn-outline-primary btn-cadastrar mt-3" data-mdb-ripple-color="dark"><i className="fas fa-plus-circle me-2"></i>Comprar</button>
                                        </div>
                                    </div>

                                    <div className="col mx-2 card-hp-produtos-settings">

                                        <div className="card h-100 card-hp-produtos-conteudo p-3 justify-content-center text-center" id="item-4">
                                            <a href="produto.html">
                                                <img src="img/mousepad1-produto.png" className="w-100 h-auto produto-img" alt="" data-aos="flip-up" data-aos-delay="1000" data-aos-duration="500" />
                                                <h2 className="produto-title">G840</h2>
                                                <h5 className="produto-brand my-2">Logitech</h5>
                                                <h2 className="produto-price my-2">R$ 319,90</h2>
                                            </a>
                                            <button type="button" className="btn btn-outline-primary btn-cadastrar mt-3" data-mdb-ripple-color="dark"><i className="fas fa-plus-circle me-2"></i>Comprar</button>
                                        </div>
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
                            <div className="m-5 d-flex text-center justify-content-center align-items-center">
                                <hr className="my-4 hr hr-blurry w-50 divisor-color" />
                                <h1 className="mx-4 flex-fill categorias-title">Lançamentos</h1>
                                <hr className="my-4 hr hr-blurry w-50 divisor-color" />
                            </div>
                            <section>
                                <div className="row row-cols-1 row-cols-md-2 g-4 justify-content-center w-100 m-0">
                                    <div className="col mx-2 card-hp-produtos-settings">

                                        <div className="card h-100 card-hp-produtos-conteudo p-3 justify-content-center text-center" id="item-5">
                                            <a href="produto.html">
                                                <img src="img/mouse2-produto-removebg-preview.png" className="w-100 h-auto produto-img" alt="" data-aos="flip-up" data-aos-delay="100" data-aos-duration="500" />
                                                <h2 className="produto-title">DeathAdder</h2>
                                                <h5 className="produto-brand my-2">Razer</h5>
                                                <h2 className="produto-price my-2">R$ 129,90</h2>
                                            </a>
                                            <button type="button" className="btn btn-outline-primary btn-cadastrar mt-3" data-mdb-ripple-color="dark"><i className="fas fa-plus-circle me-2"></i>Comprar</button>
                                        </div>

                                    </div>

                                    <div className="col mx-2 card-hp-produtos-settings">
                                        <div className="card h-100 card-hp-produtos-conteudo p-3 justify-content-center text-center" id="item-6">
                                            <a href="produto.html">
                                                <img src="img/teclado2-produto-removebg-preview.png" className="w-100 h-auto  produto-img" alt="" data-aos="flip-up" data-aos-delay="400" data-aos-duration="500" />
                                                <h2 className="produto-title">Ocean Star</h2>
                                                <h5 className="produto-brand my-2">Akko</h5>
                                                <h2 className="produto-price my-2">R$ 699,90</h2>
                                            </a>
                                            <button type="button" className="btn btn-outline-primary btn-cadastrar mt-3" data-mdb-ripple-color="dark"><i className="fas fa-plus-circle me-2"></i>Comprar</button>
                                        </div>
                                    </div>

                                    <div className="col mx-2 card-hp-produtos-settings">

                                        <div className="card h-100 card-hp-produtos-conteudo p-3 justify-content-center text-center" id="item-7">
                                            <a href="produto.html">
                                                <img src="img/headset2-produto-removebg-preview.png" className="w-100 h-auto produto-img" alt="" data-aos="flip-up" data-aos-delay="700" data-aos-duration="500" />
                                                <h2 className="produto-title">Virtuoso</h2>
                                                <h5 className="produto-brand my-2">Corsair</h5>
                                                <h2 className="produto-price my-2">R$ 899,90</h2>
                                            </a>
                                            <button type="button" className="btn btn-outline-primary btn-cadastrar mt-3" data-mdb-ripple-color="dark"><i className="fas fa-plus-circle me-2"></i>Comprar</button>
                                        </div>
                                    </div>

                                    <div className="col mx-2 card-hp-produtos-settings">

                                        <div className="card h-100 card-hp-produtos-conteudo p-3 justify-content-center text-center" id="item-8">
                                            <a href="produto.html">
                                                <img src="img/teclado3-produto-removebg-preview.png" className="w-100 h-auto  produto-img" alt="" data-aos="flip-up" data-aos-delay="1000" data-aos-duration="500" />
                                                <h2 className="produto-title">9009 Retro</h2>
                                                <h5 className="produto-brand my-2">Akko</h5>
                                                <h2 className="produto-price my-2">R$ 699,90</h2>
                                            </a>
                                            <button type="button" className="btn btn-outline-primary btn-cadastrar mt-3" data-mdb-ripple-color="dark"><i className="fas fa-plus-circle me-2"></i>Comprar</button>
                                        </div>
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
                        </div >
                    </div >
                </body>
            </main>
            <Footer>
            </Footer>
        </>
    );
}