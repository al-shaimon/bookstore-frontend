import { Spinner } from '@/components/ui/spinner';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <Spinner size="large" />
    </div>
  );
};

export default LoadingSpinner;
