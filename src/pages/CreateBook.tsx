import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { BookPlus } from 'lucide-react';
import BackButton from '@/components/BackButton';
import LoadingSpinner from '@/components/LoadingSpinner';
import API_URL from '@/config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveBook = () => {
    if (!title || !author || !publishYear) {
      toast.error('Please fill in all fields');
      return;
    }

    const data = {
      title,
      author,
      publishYear: parseInt(publishYear),
    };
    setLoading(true);
    axios
      .post(`${API_URL}/books`, data)
      .then(() => {
        setLoading(false);
        toast.success('Book created successfully');
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        toast.error('Failed to create book');
        console.log(error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <BackButton />

      <div className="mt-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookPlus className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl">Add New Book</CardTitle>
            </div>
            <CardDescription>
              Fill in the details to add a new book to your collection
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter book title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Enter author name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="publishYear">Publish Year</Label>
                  <Input
                    id="publishYear"
                    type="number"
                    value={publishYear}
                    onChange={(e) => setPublishYear(e.target.value)}
                    placeholder="Enter publish year"
                    min="1000"
                    max="2100"
                  />
                </div>
                <Button onClick={handleSaveBook} className="w-full">
                  Save Book
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateBook;
