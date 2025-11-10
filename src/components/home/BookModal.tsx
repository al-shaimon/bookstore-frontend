import { X, BookOpen, User, Calendar } from 'lucide-react';
import type { Book } from '@/types/book';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface BookModalProps {
  book: Book;
  onClose: () => void;
}

const BookModal = ({ book, onClose }: BookModalProps) => {
  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <Card
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
      >
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex-1 pr-4">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-6 w-6 text-primary" />
                <Badge variant="secondary">{book.publishYear}</Badge>
              </div>
              <CardTitle className="text-2xl mb-2">{book.title}</CardTitle>
              <CardDescription className="flex items-center gap-2 text-base">
                <User className="h-4 w-4" />
                by {book.author}
              </CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="shrink-0">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Book ID</p>
              <p className="text-sm font-mono bg-muted px-3 py-2 rounded">{book._id}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Publish Year
                </p>
                <p className="text-sm px-3 py-2">{book.publishYear}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Author</p>
                <p className="text-sm px-3 py-2">{book.author}</p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Created</p>
              <p className="text-sm">{new Date(book.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
              <p className="text-sm">{new Date(book.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookModal;
