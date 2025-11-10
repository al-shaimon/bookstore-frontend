import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plus, Table2, LayoutGrid, BookOpen, Search } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import type { Book } from '@/types/book';
import API_URL from '@/config';
import LoadingSpinner from '@/components/LoadingSpinner';
import BooksTable from '@/components/home/BooksTable';
import BooksCard from '@/components/home/BooksCard';
import BookPagination from '@/components/BookPagination';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Home = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState<'table' | 'card'>('card');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const fetchBooks = () => {
    setLoading(true);
    axios
      .get(`${API_URL}/books`)
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Failed to fetch books');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Refetch books when returning from delete/edit with state
  useEffect(() => {
    if (location.state?.refresh) {
      fetchBooks();
    }
  }, [location.state]);

  // Filter books based on search query
  const filteredBooks = useMemo(() => {
    if (!searchQuery.trim()) return books;

    const query = searchQuery.toLowerCase();
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.publishYear.toString().includes(query)
    );
  }, [books, searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  const paginatedBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredBooks.slice(startIndex, endIndex);
  }, [filteredBooks, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header Section */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 rounded-lg blur-xl" />
            <div className="relative bg-linear-to-br from-blue-600 to-indigo-600 p-3 rounded-lg shadow-lg">
              <BookOpen className="h-7 w-7 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Book Store</h1>
            {books.length > 0 && (
              <p className="text-sm text-muted-foreground mt-1">
                {books.length} {books.length === 1 ? 'book' : 'books'} in your collection
              </p>
            )}
          </div>
        </div>
        <Link to="/books/create" className="hidden sm:block">
          <Button size="lg" className="gap-2 shadow-md">
            <Plus className="h-5 w-5" />
            Add Book
          </Button>
        </Link>
      </div>

      {/* Controls */}
      <Card className="p-4 mb-6 shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <div className="flex gap-2">
              <Button
                variant={showType === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setShowType('table')}
                className="gap-2"
              >
                <Table2 className="h-4 w-4" />
                Table
              </Button>
              <Button
                variant={showType === 'card' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setShowType('card')}
                className="gap-2"
              >
                <LayoutGrid className="h-4 w-4" />
                Cards
              </Button>
            </div>
            {books.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="h-4 w-px bg-border" />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Show:</span>
                  <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
                    <SelectTrigger className="w-20 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="8">8</SelectItem>
                      <SelectItem value="12">12</SelectItem>
                      <SelectItem value="16">16</SelectItem>
                      <SelectItem value="24">24</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 w-full lg:w-auto">
            {books.length > 0 && (
              <div className="relative flex-1 lg:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search books..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-9 h-9"
                />
              </div>
            )}
            <Link to="/books/create" className="sm:hidden">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Book
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* Content */}
      {loading ? (
        <LoadingSpinner />
      ) : books.length === 0 ? (
        <Card className="p-12 text-center">
          <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">No books yet</h3>
          <p className="text-muted-foreground mb-4">Get started by adding your first book</p>
          <Link to="/books/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Book
            </Button>
          </Link>
        </Card>
      ) : filteredBooks.length === 0 ? (
        <Card className="p-12 text-center">
          <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">No books found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search query</p>
          <Button variant="outline" onClick={() => setSearchQuery('')}>
            Clear Search
          </Button>
        </Card>
      ) : (
        <>
          {showType === 'table' ? (
            <BooksTable books={paginatedBooks} />
          ) : (
            <BooksCard books={paginatedBooks} />
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <BookPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
