import { Box, Container, Heading, Text, Button, Flex, Divider } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import CartItem from '../../components/features/Cart/CartItem';
import CartSummary from '../../components/features/Cart/CartSummary';
import { useCart } from '../../hooks/useCart';

export default function Cart() {
  const { cart, emptyCart } = useCart();

  return (
    <Box py={10}>
      <Container maxW={'7xl'}>
        <Heading size="lg" mb={6}>
          Carrito de compras
        </Heading>

        {cart.items.length === 0 ? (
          <Box textAlign="center" py={10}>
            <Text fontSize="xl" mb={6}>
              Tu carrito está vacío
            </Text>
            <Button as={RouterLink} to="/" colorScheme="teal">
              Ir a comprar
            </Button>
          </Box>
        ) : (
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            align={{ base: 'stretch', lg: 'start' }}
          >
            <Box flex="3" mr={{ base: 0, lg: 10 }} mb={{ base: 10, lg: 0 }}>
              {cart.items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
              <Divider my={6} />
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontWeight="bold">
                  Total ({cart.totalItems} {cart.totalItems === 1 ? 'item' : 'items'}):{' '}
                  <Box as="span" fontSize="xl">
                    ${cart.totalAmount.toFixed(2)}
                  </Box>
                </Text>
                <Button colorScheme="red" variant="outline" onClick={emptyCart}>
                  Vaciar carrito
                </Button>
              </Flex>
            </Box>
            <Box flex="1">
              <CartSummary />
            </Box>
          </Flex>
        )}
      </Container>
    </Box>
  );
}
