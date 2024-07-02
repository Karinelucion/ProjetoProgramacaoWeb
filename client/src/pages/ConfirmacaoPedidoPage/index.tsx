import React, { useState, useEffect } from 'react';
import { Box, Button, Heading, List, ListItem, Text, useColorModeValue } from '@chakra-ui/react';
import CarrinhoService from "@/service/CarrinhoService";
import { IProdutosPedido, IPedido } from "@/commons/interfaces";
import { Link, useNavigate } from 'react-router-dom';
import { Header } from "@/components/Header";
import PedidoService from "@/service/PedidoService";
import moment from 'moment-timezone';

import "./style.scss";

export function ConfirmacaoPedidoPage() {
    const [produtosPedido, setProdutosPedido] = useState<IProdutosPedido[]>([]);
    const bgColor = useColorModeValue('gray.800', 'gray.900');
    const textColor = useColorModeValue('whiteAlpha.900', 'whiteAlpha.900');
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const navigate = useNavigate();
    const [apiError, setApiError] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        const produtosPedido = CarrinhoService.consultarCarrinho;
        setProdutosPedido(produtosPedido);
    };

    const [pedido, setPedido] = useState<IPedido>({
        dataHora: new Date(),
        produtosPedido: [],
      });

    const onClickConfirmarPedido = async () => { 
    const dataHoraStr = moment.tz('America/Sao_Paulo').subtract(3, 'hours');
    const utcDate = moment.utc(dataHoraStr.format()); 

    const pedido: IPedido = {
        usuario: undefined,
        dataHora: utcDate.toDate(),
        produtosPedido: produtosPedido,
    };

    console.log(moment.tz('America/Sao_Paulo').toDate());
    setPendingApiCall(true);

    const response = await PedidoService.registrarPedido(pedido);

    if (response.status === 200 || response.status === 201) {
        navigate("/");
    } else if (response) {
        if (response.data && response.data.validationErrors) {
        }
        setApiError("Ocorreu um erro ao registar o pedido");
    }
    setPendingApiCall(false);
    };

    const valorTotal = produtosPedido.reduce((total, p) => total + p.produto.preco * p.quantidade, 0);

    return (
        <>
            <Header />
            <div className="background" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh', paddingTop: '4rem'}}>
                <Box bg={bgColor} color={textColor} p={4} className="container">
                    <Heading as="h3" size="lg" mb={4}>Confirmação do pedido</Heading>
                    {produtosPedido.length === 0 ? (
                        <div className='d-flex justify-content-center align-items-center mt-2'>
                            <Text fontSize="xl">Seu carrinho está vazio.</Text>
                        </div>
                    ) : (
                        <List spacing={3} className="list-group">
                        {produtosPedido.map((p) => (
                            <ListItem key={p.produto.id} color={textColor} className="list-group-item d-flex justify-content-between align-items-center produtos">
                                <Box>
                                    <Text fontWeight="bold" fontSize='lg' className='my-1'>{p.produto.nome}</Text>
                                    <Text className='my-0'>Valor: ${p.produto.preco.toFixed(2)} x {p.quantidade} = ${(p.produto.preco * p.quantidade).toFixed(2)}</Text>
                                    <Text className='my-1'>Quantidade: {p.quantidade}</Text>
                                    <Text className='my-0'>Valor total: ${(p.produto.preco * p.quantidade).toFixed(2)}</Text>
                                </Box>
                            </ListItem>
                        ))}
                        </List>
                        
                    )}
                    {produtosPedido.length === 0 ? (
                        <div className='d-flex justify-content-center align-items-center mt-2'>
                            <Link to="/">
                                <Button colorScheme='yellow'>Voltar para a loja</Button>    
                            </Link>
                        </div>
                    ) : (
                        <div className='d-flex justify-content-between align-items-center mt-2'>
                            <Heading as="h4" size="md" mt={4}>Valor Total: ${valorTotal.toFixed(2)}</Heading>
                            <div>
                                <Link to="/carrinho">
                                    <Button colorScheme='yellow'>Voltar para o carrinho</Button>    
                                </Link>
                                <Link to="/pedido" className='mx-2'>
                                    <Button onClick={onClickConfirmarPedido} colorScheme='green'>Confirmar pedido</Button>    
                                </Link>
                            </div>
                            
                        </div>
                    )}
                </Box>
            </div>
        </>
    )
        
}