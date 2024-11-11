import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
  };
}

interface BookApiResponse {
  items: Book[];
}

interface SearchBooksProps {
  searchQuery: string;
  onResults: (
    books: Book[] | null,
    error: string | null,
    loading: boolean,
  ) => void;
}

const SearchBooks: React.FC<SearchBooksProps> = ({
  searchQuery,
  onResults,
}) => {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        if (!searchQuery) {
          throw new Error('A query de busca não pode estar vazia.');
        }

        const encodedQuery = encodeURIComponent(searchQuery);
        const response = await axios.get<BookApiResponse>(
          `https://www.googleapis.com/books/v1/volumes?q=${encodedQuery}&key=${API_KEY}`,
        );

        setBooks(response.data.items);
        setError(null); // Limpa qualquer erro anterior
      } catch (error) {
        console.error('Erro na busca de livros:', error);
        setBooks(null); // Limpa os livros em caso de erro
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Ocorreu um erro desconhecido: ' + String(error));
        }
      } finally {
        setLoading(false);
        onResults(books, error, loading); // Callback com os resultados
      }
    };

    fetchBooks();
  }, [searchQuery, onResults]);

  return null; //  Este componente não renderiza nada diretamente
};

export default SearchBooks;
