import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  SimpleGrid,
  Divider,
  useToast,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { saveOrder } from '../../services/orderService';

// Interface for form data
interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

// Initial form state
const initialFormState: CheckoutForm = {
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  city: '',
  postalCode: '',
  country: '',
};

export default function Checkout() {
  const { cart, emptyCart } = useCart();
  const [form, setForm] = useState<CheckoutForm>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  // If the cart is empty, redirect to the home page
  // We use useEffect to avoid problems with redirects during render
  useEffect(() => {
    if (cart.items.length === 0) {
      navigate('/');
    }
  }, [cart.items.length, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare order data
      const orderData = {
        customerInfo: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          address: form.address,
          city: form.city,
          postalCode: form.postalCode,
          country: form.country,
        },
        items: cart.items,
        totalAmount: cart.totalAmount,
        date: new Date(),
      };

      // Save the order in Firebase
      const orderId = await saveOrder(orderData);

      // Show success message
      toast({
        title: 'Order completed',
        description: `Your order #${orderId.substring(0, 8)} has been processed successfully`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Empty cart
      emptyCart();

      // Redirect to confirmation page
      navigate('/');
    } catch (error) {
      console.error('Error processing the order:', error);
      toast({
        title: 'Error',
        description: 'An error occurred while processing your order. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box py={10}>
      <Container maxW={'7xl'}>
        <Heading size="lg" mb={6}>
          Finalizar compra
        </Heading>

        <Alert status="info" mb={6}>
          <AlertIcon />
          Completa los datos para finalizar tu pedido
        </Alert>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10}>
          <Box>
            <VStack as="form" spacing={6} align="stretch" onSubmit={handleSubmit}>
              <Heading size="md">Información Personal</Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Apellido</FormLabel>
                  <Input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                  />
                </FormControl>
              </SimpleGrid>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </FormControl>

              <Divider my={4} />

              <Heading size="md">Dirección de Envío</Heading>
              <FormControl isRequired>
                <FormLabel>Dirección</FormLabel>
                <Textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                />
              </FormControl>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Ciudad</FormLabel>
                  <Input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Codigo Postal</FormLabel>
                  <Input
                    name="postalCode"
                    value={form.postalCode}
                    onChange={handleChange}
                  />
                </FormControl>
              </SimpleGrid>
              <FormControl isRequired>
                <FormLabel>País</FormLabel>
                <Input
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                />
              </FormControl>

              <Button
                mt={8}
                colorScheme="teal"
                size="lg"
                type="submit"
                isLoading={isSubmitting}
                loadingText="Processing..."
              >
                Proceder al pago
              </Button>
            </VStack>
          </Box>

          <Box>
            <Heading size="md" mb={4}>
              Resumen del pedido
            </Heading>
            <VStack spacing={4} align="stretch" bg="gray.50" p={6} borderRadius="md">
              {cart.items.map((item) => (
                <Box key={item.id} display="flex" justifyContent="space-between">
                  <Text>
                    {item.product.title} ({item.quantity}x)
                  </Text>
                  <Text fontWeight="bold">${(item.product.price * item.quantity).toFixed(2)}</Text>
                </Box>
              ))}
              <Divider />
              <Box display="flex" justifyContent="space-between">
                <Text fontWeight="bold">Subtotal</Text>
                <Text fontWeight="bold">${cart.totalAmount.toFixed(2)}</Text>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Text fontWeight="bold">Envío</Text>
                <Text fontWeight="bold">$0.00</Text>
              </Box>
              <Divider />
              <Box display="flex" justifyContent="space-between">
                <Text fontWeight="bold" fontSize="lg">
                  Total
                </Text>
                <Text fontWeight="bold" fontSize="lg">
                  ${cart.totalAmount.toFixed(2)}
                </Text>
              </Box>
            </VStack>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
