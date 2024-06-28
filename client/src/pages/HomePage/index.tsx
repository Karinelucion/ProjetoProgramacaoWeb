import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardFooter, Divider, Heading, Stack } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import CategoriaService from "@/service/CategoriaService";
import { ICategoria, IProduto } from "@/commons/interfaces";
import blackfriday from "@/assets/blackfriday.png";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import ProdutoService from "@/service/ProdutoService";

import "./style.scss";

export function HomePage() {
    const [categoriaData, setCategoria] = useState<ICategoria[]>([]);
    const [produtoData, setProduto] = useState<IProduto[]>([]);
    const [apiError, setApiError] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const responseCategoria = await CategoriaService.findAll();
            setCategoria(responseCategoria.data);
            const responseProduto = await ProdutoService.findAll();
            setProduto(responseProduto.data);
            setApiError("");
        } catch (error) {
            setApiError("Falha ao carregar a lista de categorias.");
        }
    };

    const onEdit = (url: string) => {
        navigate(url);
    };

    const onRemove = async (id: number) => {
        try {
            const response = await CategoriaService.remove(id);
            if (response.status === 200 || response.status === 204) {
                setCategoria(categoriaData.filter(categoria => categoria.id !== id));
                setProduto(produtoData.filter(produto => produto.id !== id));
                setApiError("");
            } else {
                setApiError("Falha ao remover a categoria.");
            }
        } catch (error) {
            setApiError("Falha ao remover a categoria.");
        }
    };

    const chunkArray = <T extends any>(arr: T[], chunkSize: number) => {
        const chunkedArray: T[][] = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            chunkedArray.push(arr.slice(i, i + chunkSize));
        }
        return chunkedArray;
    };

    return (
        <>
            <Header />
            <main className="container">
                <div className="background">
                    <figure>
                        <img src={blackfriday} alt="BlackFriday" />
                    </figure>
                    <div className="mx-5 hp-principal">
                        <div className="m-5 d-flex text-center justify-content-center align-items-center">
                            <hr className="my-4 hr hr-blurry w-50 divisor-color" />
                            <h1 className="mx-4 flex-fill categorias-title">Categorias</h1>
                            <hr className="my-4 hr hr-blurry w-50 divisor-color" />
                        </div>
                        <div id="carouselExampleFadeCategorias" className="carousel slide carousel-fade">
                            <div className="carousel-inner">
                                {chunkArray(categoriaData, 3).map((chunk, index) => (
                                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                        <Stack direction={{ base: 'column', sm: 'row' }} spacing="4">
                                            {chunk.map(categoria => (
                                                <Card
                                                    key={categoria.id}
                                                    _hover={{ cursor: "pointer", background: "#eee" }}
                                                    overflow='hidden'
                                                    variant='outline'
                                                    className="my-4"
                                                >
                                                    <Stack>
                                                        <CardBody>
                                                            <Heading size='md'>{categoria.nome}</Heading>
                                                        </CardBody>
                                                        <CardFooter>
                                                            <Link to={`/categoria/${categoria.id}`} type="button" className="btn btn-">
                                                                Ver produtos desta categoria
                                                            </Link>
                                                        </CardFooter>
                                                    </Stack>
                                                </Card>
                                            ))}
                                        </Stack>
                                    </div>
                                ))}
                                {apiError && <div className="alert alert-danger">{apiError}</div>}
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFadeCategorias" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFadeCategorias" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>

                    <div className="m-5 d-flex text-center justify-content-center align-items-center">
                        <hr className="my-4 hr hr-blurry w-50 divisor-color" />
                        <h1 className="mx-4 flex-fill categorias-title">Produtos em destaque</h1>
                        <hr className="my-4 hr hr-blurry w-50 divisor-color" />
                    </div>
                    <div id="carouselExampleFadeProdutos" className="carousel slide carousel-fade">
                        <div className="carousel-inner">
                            {chunkArray(produtoData, 3).map((chunk, index) => (
                                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                    <Stack direction={{ base: 'column', sm: 'row' }} spacing="4">
                                        {chunk.map(produto => (
                                            <Card
                                                key={produto.id}
                                                _hover={{ cursor: "pointer", background: "#eee" }}
                                                maxW='sm'
                                                className="my-4"
                                            >
                                                <CardBody>
                                                    <img
                                                        src={produto.imagem}
                                                        alt='produto'
                                                    />
                                                    <Stack mt='6' spacing='3'>
                                                        <Heading size='md'>{produto.nome}</Heading>
                                                        <p>
                                                            {produto.descricao}.
                                                        </p>
                                                        <h1 color='blue.600' >
                                                            {produto.preco}
                                                        </h1>
                                                    </Stack>
                                                </CardBody>
                                                <Divider />
                                                <CardFooter>
                                                    <Link to={`/produto/${produto.id}`} type="button" className='btn btn-primary'>Ver produto</Link>
                                                    <Button colorScheme='blue'>
                                                        Adicionar ao carrinho
                                                    </Button>
                                                </CardFooter>
                                            </Card>
                                        ))}
                                    </Stack>
                                </div>
                            ))}
                            {apiError && <div className="alert alert-danger">{apiError}</div>}
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFadeProdutos" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFadeProdutos" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                    <div className="d-flex justify-content-center">
                        <Link to='/produtos' type="button" className="btn btn-light">Ver todos os produtos</Link>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
