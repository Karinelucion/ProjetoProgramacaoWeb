import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Box, Grid, Heading, Stack, Image, Text, Flex, Card, CardBody, CardFooter, Divider } from "@chakra-ui/react";
import ProdutoService from "@/service/ProdutoService";
import CarrinhoService from "@/service/CarrinhoService";
import { Header } from "@/components/Header";
import { IProduto } from "@/commons/interfaces";
import "./style.scss";

export function ProdutosPorCategoria() {
    const [data, setData] = useState<IProduto[]>([]);
    const [apiError, setApiError] = useState<string>("");
    const { id } = useParams<{ id: string }>();
    const {findByCategoriaId} = ProdutoService;

    useEffect(() => {
        if (id) {
            loadData();
        }
    }, [id]);

    const loadData = async () => {
        try {
            if (!id) {
                throw new Error("ID da categoria não está definido.");
            }
            const response = await findByCategoriaId(id);
            setData(response);
            setApiError("");
        } catch (error) {
            setApiError("Falha ao carregar a lista de produtos.");
        }
    };

    const onClickAdicionarAoCarrinho = (produto: IProduto) => {
        CarrinhoService.adicionarAoCarrinho(produto);
    };

    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    return (
        <>
            <Header />
            <Box className="background" mt="4rem" mx="auto" px={4}>
                <div className="m-5 d-flex text-center justify-content-center align-items-center">
                    <hr className="my-4 hr hr-blurry w-50 divisor-color" />
                    <h1 className="mx-4 flex-fill categorias-title">Produtos da categoria {id}</h1>
                    <hr className="my-4 hr hr-blurry w-50 divisor-color" />
                </div>
                {data.length === 0 ? (
                <Box mt={8} textAlign="center">
                    <Text fontSize="lg">Nenhum produto encontrado para esta categoria.</Text>
                </Box>
            ) : (
                <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={8}>
                    {data.map((produto) => (
                        
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
                                    <Link to={`/produto/${produto.id}`}>Ver produto</Link>
                                </Button>
                                <Button onClick={() => onClickAdicionarAoCarrinho(produto)} className="btn btn-outline-primary ">
                                    Adicionar ao carrinho
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </Grid>
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
