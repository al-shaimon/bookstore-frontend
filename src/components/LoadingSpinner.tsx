import { Spinner } from '@/components/ui/spinner';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <Spinner className="w-12 h-12" />
    </div>
  );
};

export default LoadingSpinner;
