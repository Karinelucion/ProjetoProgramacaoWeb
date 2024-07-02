import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardFooter, Divider, Heading, Stack } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import CategoriaService from "@/service/CategoriaService";
import { ICategoria, IProduto } from "@/commons/interfaces";
import blackfriday from "@/assets/blackfriday.png";
import { Header } from "@/components/Header";
import ProdutoService from "@/service/ProdutoService";
import CarrinhoService from "@/service/CarrinhoService";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

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
            setApiError("Falha ao carregar a lista de categorias e produtos.");
        }
    };

    const onClickAdicionarAoCarrinho = (produto: IProduto) => {
        CarrinhoService.adicionarAoCarrinho(produto);
    };

    const PaginatedCategoria = () => {
        const [currentPage, setCurrentPage] = useState(0);
        const pageSize = 3;
        const totalPages = Math.ceil(categoriaData.length / pageSize);

        const paginatedData = categoriaData.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

        const nextPage = () => {
            if (currentPage < totalPages - 1) {
                setCurrentPage(currentPage + 1);
            }
        };

        const prevPage = () => {
            if (currentPage > 0) {
                setCurrentPage(currentPage - 1);
            }
        };

        return (
            <div>
                <div className="d-flex justify-content-center">
                    <Stack direction={{ base: 'column', sm: 'row' }} spacing="3">
                        {paginatedData.map(categoria => (
                            <Card
                                key={categoria.id}
                                _hover={{ cursor: "pointer" }}
                                overflow='hidden'
                                variant='outline'
                            >
                                <Stack>
                                    <CardBody>
                                        <Heading size='md'>{categoria.nome}</Heading>
                                    </CardBody>
                                    <CardFooter>
                                        <Button className="btn btn-outline-dark">
                                            <Link to={`/categoria/${categoria.id}`} type="button">
                                                Ver produtos desta categoria
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </Stack>
                            </Card>
                        ))}
                    </Stack>
                    </div>
                    <div className="mt-3 d-flex justify-content-center ">
                        <Button onClick={prevPage} disabled={currentPage === 0} leftIcon={<IoIosArrowBack />} className="btn me-1"></Button>
                        <Button onClick={nextPage} disabled={currentPage === totalPages - 1} rightIcon={<IoIosArrowForward />} className="btn"></Button>
                    </div>
                </div>
        );
    };

    const PaginatedProduto = () => {
        const [currentPage, setCurrentPage] = useState(0);
        const pageSize = 3;
        const totalPages = Math.ceil(produtoData.length / pageSize);

        const paginatedData = produtoData.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

        const [showFullDescription, setShowFullDescription] = useState(false);

        const toggleDescription = () => {
            setShowFullDescription(!showFullDescription);
        };

        const nextPage = () => {
            if (currentPage < totalPages - 1) {
                setCurrentPage(currentPage + 1);
            }
        };

        const prevPage = () => {
            if (currentPage > 0) {
                setCurrentPage(currentPage - 1);
            }
        };

        return (
            <div>
            <div className="d-flex justify-content-center">
                <Stack direction={{ base: 'column', sm: 'row' }} spacing="4">
                    {paginatedData.map(produto => (
                        <Card
                            key={produto.id}
                            _hover={{ cursor: "pointer" }}
                            maxW='sm'
                            className="my-4 card"
                        >
                            <CardBody>
                                <img
                                    src={produto.imagem}
                                    alt={produto.nome}
                                />
                                <Stack mt='6' spacing='3'>
                                    <Heading size='md'>{produto.nome}</Heading>
                                    <p>
                                        {showFullDescription ? produto.descricao : (produto.descricao.length > 50 ? `${produto.descricao.substring(0, 100)}...` : produto.descricao)}
                                        {!showFullDescription && produto.descricao.length > 100 && (
                                            <Button onClick={toggleDescription} variant="link" colorScheme="blue" size="sm">
                                                Ver mais
                                            </Button>
                                        )}
                                    </p>
                                    <h1 className="preco my-2">
                                        {produto.preco}
                                    </h1>
                                </Stack>
                            </CardBody>
                            <Divider />
                            <CardFooter className="d-flex justify-content-around">
                                <Button className='btn btn-outline-primary'>
                                    <Link to={`/produtos/${produto.id}`}>Ver produto</Link>
                                </Button>
                                <Button onClick={() => onClickAdicionarAoCarrinho(produto)} className="btn btn-outline-primary ">
                                    Adicionar ao carrinho
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </Stack>
                </div>
                <div className="mt-3 d-flex justify-content-center mb-4">
                    <Button onClick={prevPage} disabled={currentPage === 0} leftIcon={<IoIosArrowBack />} className="btn me-1"></Button>
                    <Button onClick={nextPage} disabled={currentPage === totalPages - 1} rightIcon={<IoIosArrowForward />} className="btn"></Button>
                    <Button  as={Link} to='/produtos' className="btn ms-1">Ver todos os produtos</Button>
                </div>
            </div>
        );
    };

    return (
        <>
            <Header />
            <div style={{ height: '4rem' }} />
            <main className="">
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
                        <PaginatedCategoria />
                    </div>

                    <div className="m-5 d-flex text-center justify-content-center align-items-center">
                        <hr className="my-4 hr hr-blurry w-50 divisor-color" />
                        <h1 className="mx-4 flex-fill categorias-title">Produtos em destaque</h1>
                        <hr className="my-4 hr hr-blurry w-50 divisor-color" />
                    </div>
                    <PaginatedProduto />

                    <div className="d-flex justify-content-center">
                    </div>
                </div>
            </main>
        </>
    );
}
