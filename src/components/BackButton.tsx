import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BackButtonProps {
  destination?: string;
}

const BackButton = ({ destination = '/' }: BackButtonProps) => {
  return (
    <Link to={destination}>
      <Button variant="outline" size="sm" className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>
    </Link>
  );
};

export default BackButton;
