import IconComponent from '../ui/icon-component';
import { Skeleton } from '../ui/skeleton';

type BootcampCardProps = {
  icon: JSX.Element;
  title: string;
  description: string;
  loading: boolean;
};

const BootcampCard = ({ icon, title, description, loading }: BootcampCardProps) => {
  return (
    <div className="rounded-2xl border border-neutral-200 p-4 shadow">
      <div className="w-max rounded-xl bg-indigo p-4">
        <IconComponent icon={icon} className="text-indigo-700" />
      </div>
      <div className="mt-4">
        <p className="text-sm text-neutral-600">{title}</p>
        {loading ? (
          <div>
            <Skeleton className="mt-2 h-8 w-[350px] rounded-lg bg-neutral-200" />
            <Skeleton className="mt-2 h-8 w-[300px] rounded-lg bg-neutral-200" />
          </div>
        ) : (
          <p className="mt-1 max-w-[200px] text-xl font-medium text-neutral-900">{description}</p>
        )}
      </div>
    </div>
  );
};

export default BootcampCard;
