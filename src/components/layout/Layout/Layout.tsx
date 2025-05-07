import { Box, Container } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Header />
      <Container maxW="container.xl" flex="1" py={8}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
}
