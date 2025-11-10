import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { AlertTriangle } from 'lucide-react';
import BackButton from '@/components/BackButton';
import LoadingSpinner from '@/components/LoadingSpinner';
import API_URL from '@/config';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`${API_URL}/books/${id}`)
      .then(() => {
        setLoading(false);
        toast.success('Book deleted successfully');
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        toast.error('Failed to delete book');
        console.log(error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <BackButton />

      <div className="mt-6">
        <Card className="border-destructive">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              <CardTitle className="text-2xl">Delete Book</CardTitle>
            </div>
            <CardDescription>This action cannot be undone</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <div className="space-y-4">
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Are you sure you want to delete this book? This will permanently remove the book
                    from your collection.
                  </AlertDescription>
                </Alert>
                <div className="flex gap-3">
                  <Button variant="destructive" onClick={handleDeleteBook} className="flex-1">
                    Yes, Delete Book
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/')} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeleteBook;
