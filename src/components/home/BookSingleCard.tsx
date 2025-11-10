import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, User, Eye, Pencil, Trash2, Info } from 'lucide-react';
import type { Book } from '@/types/book';
import BookModal from '@/components/home/BookModal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BookSingleCardProps {
  book: Book;
}

const BookSingleCard = ({ book }: BookSingleCardProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start mb-2">
            <Badge variant="secondary" className="text-xs">
              {book.publishYear}
            </Badge>
          </div>
          <CardTitle className="text-lg flex items-start gap-2 line-clamp-2">
            <BookOpen className="h-5 w-5 mt-0.5 text-primary shrink-0" />
            <span>{book.title}</span>
          </CardTitle>
          <CardDescription className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="line-clamp-1">{book.author}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0 mt-auto">
          <div className="flex justify-between items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowModal(true)}
              className="gap-1 flex-1"
            >
              <Eye className="h-4 w-4" />
              Quick View
            </Button>
            <div className="flex gap-1">
              <Link to={`/books/details/${book._id}`}>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Info className="h-4 w-4 text-blue-600" />
                </Button>
              </Link>
              <Link to={`/books/edit/${book._id}`}>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Pencil className="h-4 w-4 text-amber-600" />
                </Button>
              </Link>
              <Link to={`/books/delete/${book._id}`}>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {showModal && <BookModal book={book} onClose={() => setShowModal(false)} />}
    </>
  );
};

export default BookSingleCard;
