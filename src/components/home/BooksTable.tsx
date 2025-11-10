import { Link } from 'react-router-dom';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import type { Book } from '@/types/book';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BooksTableProps {
  books: Book[];
}

const BooksTable = ({ books }: BooksTableProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">No</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Author</TableHead>
              <TableHead className="hidden sm:table-cell">Year</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book, index) => (
              <TableRow key={book._id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">{book.title}</TableCell>
                <TableCell className="hidden md:table-cell">{book.author}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant="outline">{book.publishYear}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2">
                    <Link to={`/books/details/${book._id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4 text-blue-600" />
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default BooksTable;
