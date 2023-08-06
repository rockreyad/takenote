import Link from 'next/link';
import { FunctionComponent } from 'react';
import { LogoIcon } from './logo-icon';
import clsx from 'clsx';

interface LogoProps {
  variant?: 'default' | 'small';
  activeLink?: boolean;
  logoText?: string;
}

const LogoText: FunctionComponent<LogoProps> = ({ logoText }) => (
  <h1
    className={
      'text-[10px] md:text-[28px] text-[#7F8182] tracking-wider font-medium capitalize'
    }
  >
    {logoText || 'TakeNote'}
  </h1>
);

const LogoImageWithText: FunctionComponent<LogoProps> = ({
  variant = 'default'
}) => {
  const icon = <LogoIcon className="h-7 w-7" />;

  return (
    <main
      className={clsx(
        `flex flex-col ${
          variant === 'small'
            ? 'space-y-0'
            : 'md:flex-row space-y-0.5 md:space-y-0 md:space-x-0.5'
        } items-center`
      )}
    >
      {(variant === 'small' || variant === 'default') && icon}
      <LogoText />
    </main>
  );
};

const withLink = <P extends object>(
  Component: React.ComponentType<P & LogoProps>
): FunctionComponent<P & LogoProps> => {
  const WrappedComponent: FunctionComponent<P & LogoProps> = ({
    activeLink = true,
    ...props
  }) =>
    activeLink ? (
      <Link href="/" passHref>
        <Component {...(props as P)} />
      </Link>
    ) : (
      <Component {...(props as P)} />
    );

  WrappedComponent.displayName = `withLink(${
    Component.displayName || Component.name
  })`;

  return WrappedComponent;
};

const Logo = withLink(LogoImageWithText);
export default Logo;
