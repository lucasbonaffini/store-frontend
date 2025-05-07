import { useState } from 'react';
import { Input, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../../hooks/useProducts';

export default function SearchBar() {
  const navigate = useNavigate();
  const { searchProducts, searchTerm } = useProducts();
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const handleSearch = () => {
    searchProducts(localSearchTerm);
    navigate('/');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type="text"
        placeholder="Buscar productos..."
        value={localSearchTerm}
        onChange={(e) => setLocalSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <InputRightElement width="4.5rem">
        <IconButton
          h="1.75rem"
          size="sm"
          aria-label="Buscar"
          icon={<SearchIcon />}
          onClick={handleSearch}
        />
      </InputRightElement>
    </InputGroup>
  );
}
