import React, { useState, useEffect } from 'react';
import { Box, Button, IconButton,  Flex, Heading, List, ListItem, Text, useColorModeValue } from '@chakra-ui/react';
import CarrinhoService from "@/service/CarrinhoService";
import { IProdutosPedido, IProduto } from "@/commons/interfaces";
import { Link } from 'react-router-dom';
import { DeleteIcon } from '@chakra-ui/icons';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import "./style.scss";

export function CarrinhoPage() {
    const [produtosPedido, setProdutosPedido] = useState<IProdutosPedido[]>([]);
    const bgColor = useColorModeValue('gray.800', 'gray.900');
    const textColor = useColorModeValue('whiteAlpha.900', 'whiteAlpha.900');


    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        const produtosPedido = CarrinhoService.consultarCarrinho;
        setProdutosPedido(produtosPedido);
    };

    const onClickAumentarQuantidade = (produto: IProduto) => {
        const novosProdutosPedido = CarrinhoService.aumentarQuantidade(produto);

        setProdutosPedido(novosProdutosPedido);
    };

    const onClickDiminuirQuantidade = (produto: IProduto) => {
        const novosProdutosPedido = CarrinhoService.diminuirQuantidade(produto);

        setProdutosPedido(novosProdutosPedido);
    };

    const onClickRemoverProduto = (produto: IProduto) => {
        const novosProdutosPedido = CarrinhoService.removerProduto(produto);

        setProdutosPedido(novosProdutosPedido);
    };

    const valorTotal = produtosPedido.reduce((total, p) => total + p.produto.preco * p.quantidade, 0);

    return (
        <>
            <Header />
            <div className="background" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh', paddingTop: '4rem'}}>
                <Box bg={bgColor} color={textColor} p={4} className="container">
                    <Heading as="h3" size="lg" mb={4}>Carrinho de Compras</Heading>
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
                                <Flex alignItems="center">
                                    <Button colorScheme="green" size="sm" onClick={() => onClickAumentarQuantidade(p.produto)} className="mx-1">+</Button>
                                    <Text className='mx-2 my-auto'>{p.quantidade}</Text>
                                    <Button colorScheme="yellow" size="sm" onClick={() => onClickDiminuirQuantidade(p.produto)} className="mx-1">-</Button>
                                    <IconButton
                                    colorScheme="red"
                                    size="sm"
                                    icon={<DeleteIcon />}
                                    aria-label="Remover produto"
                                    onClick={() => onClickRemoverProduto(p.produto)}
                                    className="mx-1"
                                    />
                                </Flex>
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
                            <Link to="/pedido">
                                <Button colorScheme='green'>Continuar para o pedido</Button>    
                            </Link>
                        </div>
                    )}
                </Box>
            </div>
        </>
    )
        
}