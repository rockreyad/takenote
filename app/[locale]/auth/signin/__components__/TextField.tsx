import { InputHTMLAttributes, ReactNode } from 'react';

const input_style =
  'form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none';

interface LabelProps {
  id: string;
  children: ReactNode;
}
const Label = ({ id, children }: LabelProps) => {
  return (
    <label
      htmlFor={id}
      className="mb-2 block text-sm font-semibold text-gray-900"
    >
      {children}
    </label>
  );
};

interface TextFieldProps
  extends Pick<
    InputHTMLAttributes<HTMLInputElement>,
    keyof InputHTMLAttributes<HTMLInputElement>
  > {
  id: string;
  label?: string;
  className?: string;
}
const TextField = ({
  id,
  label,
  type = 'text',
  className,
  ...props
}: TextFieldProps) => {
  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <input
        required
        id={id}
        type={type}
        {...props}
        className={`${input_style}`}
      />
    </div>
  );
};

export default TextField;
