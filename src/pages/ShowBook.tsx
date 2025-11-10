import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { BookOpen, Calendar, User, Clock } from 'lucide-react';
import type { Book } from '@/types/book';
import BackButton from '@/components/BackButton';
import LoadingSpinner from '@/components/LoadingSpinner';
import API_URL from '@/config';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const ShowBook = () => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Failed to fetch book details');
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <BackButton />

      <div className="mt-6">
        {loading ? (
          <LoadingSpinner />
        ) : book ? (
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle className="text-3xl">{book.title}</CardTitle>
                    <CardDescription className="mt-2 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      by {book.author}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {book.publishYear}
                </Badge>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Book ID</p>
                    <p className="text-sm font-mono bg-muted px-3 py-2 rounded">{book._id}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Publish Year
                    </p>
                    <p className="text-sm px-3 py-2">{book.publishYear}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 mt-1 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground">Created</p>
                      <p className="text-sm">{new Date(book.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 mt-1 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                      <p className="text-sm">{new Date(book.updatedAt).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">Book not found</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ShowBook;
