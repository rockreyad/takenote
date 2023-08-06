import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, ReactNode } from 'react';

const btn_style =
  'inline-block px-7 py-4 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full';

interface SubmitBtnProps
  extends Pick<
    ButtonHTMLAttributes<HTMLButtonElement>,
    keyof ButtonHTMLAttributes<HTMLButtonElement>
  > {
  id?: string;
  label?: string;
  className?: string;
  backgroundColor?: string;
  loading?: boolean;
  icon?: ReactNode;
}
const SubmitButton = ({
  id,
  label,
  className,
  backgroundColor = '#3446eb',
  loading,
  icon,
  ...props
}: SubmitBtnProps) => {
  return (
    <button
      id={id}
      className={cn(`${btn_style} ${className}`)}
      style={{ backgroundColor: `${loading ? '#ccc' : backgroundColor}` }}
      {...props}
      aria-label="Submit"
      disabled={loading}
    >
      {icon && (
        <div
          style={{
            height: '2.2rem'
          }}
          className="pr-2"
        >
          {icon}
        </div>
      )}
      {loading ? 'loading...' : label}
    </button>
  );
};

export default SubmitButton;
