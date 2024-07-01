import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProdutoService from "@/service/ProdutoService";
import { IProduto } from "@/commons/interfaces";
import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Stack } from "@chakra-ui/react";
import CarrinhoService from "@/service/CarrinhoService";

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

    const onClickAdicionarAoCarrinho = (produto: IProduto) => {
        CarrinhoService.adicionarAoCarrinho(produto);
    };

    return (
        <div className="container">
            <h1 className="fs-2 mb-4 text-center">Lista de Produtos</h1>
            {data.map(produto => (
                <Card
                    key={produto.id}
                    _hover={{ cursor: "pointer", background: "#eee" }} maxW='sm'>
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
                        <Button onClick={() => onClickAdicionarAoCarrinho(produto)} variant='ghost' colorScheme='blue'>
                            Adicionar ao carrinho
                        </Button>
                    </CardFooter>
                </Card>
            ))}
            {apiError && <div className="alert alert-danger">{apiError}</div>}
        </div>
    );
}