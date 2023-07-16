import { SVGProps } from '@/types/svg';
import React, { FunctionComponent } from 'react';

const Tuple: FunctionComponent<SVGProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="158"
      height="48"
      className={className}
      fillRule={'inherit'}
    >
      <path
        className={className}
        fillRule="evenodd"
        d="m45 4-18 6v19.5l6 2V37l18 6V11.5l-6 2V4ZM35 32.167 45 35.5V15.608l4-1.333v25.95L35 35.56v-3.393Z"
        clip-rule="evenodd"
      />
      <path
        className={className}
        fill="#111827"
        d="M69.9 20.45V31h4.447V20.45h3.53v-3.392H66.39v3.393h3.51Zm10.206 4.798c0 3.978 2.3 6.006 6.376 6.006 3.9 0 6.396-1.853 6.396-6.045v-8.15h-4.446v7.994c0 1.833-.39 2.73-1.95 2.73-1.58 0-1.97-.897-1.97-2.71v-8.015h-4.406v8.19Z"
      />
      <path
        className={className}
        fill="#111827"
        fill-rule="evenodd"
        d="M95.969 31V17.058h5.558c4.017 0 5.733 1.794 5.733 4.777v.078c0 2.906-1.93 4.544-5.538 4.544h-1.346V31h-4.407Zm5.323-7.507h-.916v-3.14h.936c1.15 0 1.755.43 1.755 1.502v.078c0 1.033-.605 1.56-1.775 1.56Z"
        clip-rule="evenodd"
      />
      <path
        className={className}
        fill="#111827"
        d="M109.562 31V17.058h4.427v10.53h5.07V31h-9.497Zm11.999-13.942V31h10.218v-3.393h-5.811v-2.086h4.368v-3.1h-4.368v-1.97h5.499v-3.393h-9.906Z"
      />
    </svg>
  );
};

export default Tuple;
