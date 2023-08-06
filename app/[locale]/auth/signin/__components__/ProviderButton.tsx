import { cn } from '@/lib/utils';
import { AnchorHTMLAttributes, ReactNode } from 'react';

const btn_style =
  'px-7 py-2 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3';

interface ProviderBtnProps
  extends Pick<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof AnchorHTMLAttributes<HTMLAnchorElement>
  > {
  id?: string;
  label?: string;
  className?: string;
  backgroundColor?: string;
  icon?: ReactNode;
}
const ProviderButton = ({
  id,
  label,
  className,
  backgroundColor,
  icon,
  ...props
}: ProviderBtnProps) => {
  return (
    <a
      id={id}
      className={cn(`${btn_style} ${className}`)}
      style={{ backgroundColor: `${backgroundColor}` }}
      onClick={() => alert('Not implemented yet')}
      {...props}
      role="button"
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
      {label}
    </a>
  );
};

export default ProviderButton;
