import {
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    Stack,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { useNavigate } from 'react-router-dom';
  import { useCart } from '../../../hooks/useCart';
  
  export default function CartSummary() {
    const { cart } = useCart();
    const navigate = useNavigate();
  
    const handleCheckout = () => {
      navigate('/checkout');
    };
  
    return (
      <Box
        borderWidth="1px"
        borderRadius="lg"
        p={6}
        bg={useColorModeValue('white', 'gray.800')}
      >
        <Heading size="md" mb={4}>
          Resumen del Pedido
        </Heading>
        <Stack spacing={4}>
          <Flex justify="space-between">
            <Text>Subtotal</Text>
            <Text fontWeight="bold">${cart.totalAmount.toFixed(2)}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text>Envío</Text>
            <Text fontWeight="bold">$0.00</Text>
          </Flex>
          <Divider />
          <Flex justify="space-between">
            <Text fontWeight="bold">Total</Text>
            <Text fontWeight="bold" fontSize="lg">
              ${cart.totalAmount.toFixed(2)}
            </Text>
          </Flex>
          <Button
            colorScheme="teal"
            size="lg"
            mt={4}
            onClick={handleCheckout}
            isDisabled={cart.totalItems === 0}
          >
            Proceder al Pago
          </Button>
        </Stack>
      </Box>
    );
  }
