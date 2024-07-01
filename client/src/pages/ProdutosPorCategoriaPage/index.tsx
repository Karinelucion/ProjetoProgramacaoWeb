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
            const response = await ProdutoService.findByCategoriaId(id);
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
                        <Card key={produto.id} borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md">
                            <Image src={produto.imagem} alt={produto.nome} w="100%" h="200px" objectFit="cover" />
                            <CardBody p={4}>
                                <Heading as="h3" size="md" mb={2}>{produto.nome}</Heading>
                                <Text fontSize="sm" color="gray.600" mb={4} noOfLines={showFullDescription ? undefined : 3}>
                                    {produto.descricao}
                                </Text>
                                <Flex justify="space-between" align="center">
                                    <Text fontSize="lg" fontWeight="bold">{produto.preco}</Text>

                                </Flex>
                            </CardBody>
                            <Divider />
                            <CardFooter className="d-flex justify-content-around">
                                <Stack direction="row" spacing={4}>
                                    <Button as={Link} to={`/produto/${produto.id}`} className="btn btn-outline-dark">Ver produto</Button>
                                    <Button onClick={() => onClickAdicionarAoCarrinho(produto)} className="btn btn-outline-dark">Adicionar ao carrinho</Button>
                                </Stack>
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
