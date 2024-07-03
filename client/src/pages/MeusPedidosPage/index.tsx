import React, { useState, useEffect } from 'react';
import { Box, Button, Heading, List, ListItem, Text, useColorModeValue } from '@chakra-ui/react';
import { IPedido } from "@/commons/interfaces";
import { Link, useNavigate } from 'react-router-dom';
import { Header } from "@/components/Header";
import PedidoService from "@/service/PedidoService";
import { format } from 'date-fns';

export function MeusPedidosPage() {
    const [pedidos, setPedidos] = useState<IPedido[]>([]);
    const bgColor = useColorModeValue('gray.800', 'gray.900');
    const textColor = useColorModeValue('whiteAlpha.900', 'whiteAlpha.900');
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const navigate = useNavigate();
    const [apiError, setApiError] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const pedidos = await PedidoService.consultarPedidosUsuario();
            setPedidos(pedidos.data);    
        } catch (error) {
            setApiError("Falha ao carregar os pedidos do usuário");
        }

    };

    return (
        <>
            <Header />
            <div className="background" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: '100%', minHeight: '100vh', paddingTop: '6rem' }}>
                <Box bg={bgColor} color={textColor} p={4} className="container" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
                    <Heading as="h3" size="lg" mb={4}>Meus pedidos</Heading>
                    {pedidos.length === 0 ? (
                        <div className='d-flex justify-content-center align-items-center mt-2'>
                            <Text fontSize="xl">Você ainda não realizou nenhum pedido.</Text>
                        </div>
                    ) : (
                        <List spacing={3} className="list-group">
                            {pedidos.map((pedido) => (
                                <Box key={pedido.id} mb={4} p={4} borderWidth="1px" borderRadius="lg">
                                    <Heading as="h4" size="md" mb={2}>Pedido #{pedido.id}</Heading>
                                    <Text mb={2}><b>Data e hora do pedido:</b> {format(new Date(pedido.dataHora), 'dd/MM/yyyy HH:mm:ss')}</Text>
                                    <Text mb={2}><b>Valor total do pedido:</b> ${pedido.valorTotal?.toFixed(2)}</Text>
                                    <Text mb={2}><b>Itens do pedido:</b></Text>
                                    <List spacing={3} className="list-group">
                                        {pedido.produtosPedido.map((p) => (
                                            <ListItem key={p.id} color={textColor} className="list-group-item d-flex justify-content-between align-items-center produtos">
                                                <Box>
                                                    <Text fontWeight="bold" fontSize='lg' className='my-1'>{p.produto.nome}</Text>
                                                    <Text className='my-0'>Valor: ${p.produto.preco.toFixed(2)} x {p.quantidade} = ${(p.produto.preco * p.quantidade).toFixed(2)}</Text>
                                                    <Text className='my-1'>Quantidade: {p.quantidade}</Text>
                                                    <Text className='my-0'>Valor total: ${(p.produto.preco * p.quantidade).toFixed(2)}</Text>
                                                </Box>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            ))}
                        </List>
                    )}
                    <div className='d-flex justify-content-center align-items-center mt-2'>
                        <Link to="/">
                            <Button colorScheme='yellow'>Voltar para a loja</Button>
                        </Link>
                    </div>
                </Box>
            </div>
        </>
    )
}