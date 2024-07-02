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
            <div className="background" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh', paddingTop: '4rem'}}>
                <Box bg={bgColor} color={textColor} p={4} className="container">
                    <Heading as="h3" size="lg" mb={4}>Meus pedidos</Heading>
                    {pedidos.length === 0 ? (
                        <div className='d-flex justify-content-center align-items-center mt-2'>
                            <Text fontSize="xl">Você ainda não realizou nenhum pedido.</Text>
                        </div>
                    ) : (
                        <List spacing={3} className="list-group">
                        {pedidos.map((p) => (
                            <ListItem key={p.id} color={textColor} className="list-group-item d-flex justify-content-between align-items-center produtos">
                                <Box>
                                    <Text fontWeight="bold" fontSize='lg' className='my-1'>Data e hora do pedido: {format(p.dataHora, 'dd/MM/yyyy HH:mm:ss')}</Text>
                                    <Text className='my-0'>Valor total do pedido: ${p.valorTotal}</Text>
                                </Box>
                            </ListItem>
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