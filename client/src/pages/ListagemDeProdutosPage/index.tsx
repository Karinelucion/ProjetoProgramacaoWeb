import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProdutoService from "@/service/ProdutoService";
import { IProduto } from "@/commons/interfaces";
import { Button, Box, Grid, Heading, Stack, Image, Text, Flex, Card, CardBody, CardFooter, Divider } from "@chakra-ui/react";
import CarrinhoService from "@/service/CarrinhoService";
import { Header } from "@/components/Header";

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import "./style.scss";

export function ListagemDeProdutos() {
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

    const onClickAdicionarAoCarrinho = (produto: IProduto) => {
        CarrinhoService.adicionarAoCarrinho(produto);
        //window.location.reload(); 
    };

    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const PaginatedProduto = () => {
        const [currentPage, setCurrentPage] = useState(0);
        const pageSize = 8;
        const totalPages = Math.ceil(data.length / pageSize);

        const paginatedData = data.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

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
            <>
                <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={4}>
                    {paginatedData.map((produto) => (
                        <Card
                            key={produto.id}
                            _hover={{ cursor: "pointer" }}
                            maxW='sm'
                            className="my-4"
                        >
                            <CardBody className="text-center p-">
                                <div className="d-flex justify-content-center">
                                    <img
                                        src={produto.urlImagem}
                                        alt={produto.nome}
                                        className="imagem-card"
                                    />
                                </div>

                                <Stack mt='6' spacing='3'>
                                    <Heading size='md'>{produto.nome}</Heading>
                                    <h1 className="preco">
                                        R${produto.preco}
                                    </h1>
                                    <p>À vista no PIX</p>
                                </Stack>
                            </CardBody>
                            <CardFooter className="d-flex justify-content-around pt-0 px-2">
                                <Button className='btn btn-outline-primary me-1'>
                                    <Link to={`/produtos/${produto.id}`}>Ver produto</Link>
                                </Button>
                                <Button onClick={() => onClickAdicionarAoCarrinho(produto)} className="btn btn-outline-primary">
                                    Adicionar ao carrinho
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </Grid>
                <div className="mt-3 d-flex justify-content-center">
                    <Button onClick={prevPage} disabled={currentPage === 0} leftIcon={<IoIosArrowBack />} className="btn me-1"></Button>
                    <Button onClick={nextPage} disabled={currentPage === totalPages - 1} rightIcon={<IoIosArrowForward />} className="btn"></Button>
                </div>
            </>
        )

    }

    return (
        <>
            <Header />
            <Box className="background" mt="4rem" mx="auto" px={4}>
                <div className="m-5 d-flex text-center justify-content-center align-items-center">
                    <hr className="my-4 hr hr-blurry w-50 divisor-color" />
                    <h1 className="mx-4 flex-fill categorias-title">Listagem de produtos</h1>
                    <hr className="my-4 hr hr-blurry w-50 divisor-color" />
                </div>
                {data.length === 0 ? (
                    <Box mt={8} textAlign="center">
                        <Text fontSize="lg">Nenhum produto encontrado.</Text>
                    </Box>
                ) : (
                    <PaginatedProduto />
                )}
            </Box>
            {apiError && (
                <Box mt={4} textAlign="center">
                    <Text fontSize="lg" color="red.500">{apiError}</Text>
                </Box>
            )}
        </>
    );
}