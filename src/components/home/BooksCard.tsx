import type { Book } from '@/types/book';
import BookSingleCard from './BookSingleCard';

interface BooksCardProps {
  books: Book[];
}

const BooksCard = ({ books }: BooksCardProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {books.map((book) => (
        <BookSingleCard key={book._id} book={book} />
      ))}
    </div>
  );
};

export default BooksCard;
