import { SVGProps } from '@/types/svg';
import React, { FunctionComponent } from 'react';

const SavvyCal: FunctionComponent<SVGProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="158"
      height="48"
      className={className}
      fill="none"
    >
      <path
        className={className}
        fill="#111827"
        fill-rule="evenodd"
        d="M24.005 6.799c13.842-2.43 17.83.244 20.29 14.16 2.463 13.913-.042 17.73-14.206 20.219-14.165 2.487-17.827-.24-20.29-14.158C7.335 13.1 10.164 9.232 24.005 6.799h-.001Zm1.595 6.148c-2.65.466-4.566 1.678-5.668 3.44-.865 1.384-1.141 3.005-.891 4.318.552 2.895 2.95 4.717 7.809 5.085l.38.027.377.03.358.034c1.694.169 2.778.456 3.376.825.4.245.56.513.674 1.162.218 1.232-.745 2.348-3.28 2.793-1.677.295-3.467-.06-5.423-1.123a2.123 2.123 0 0 0-2.873.843 2.103 2.103 0 0 0 .846 2.862c2.76 1.5 5.509 2.044 8.186 1.574 4.673-.821 7.375-3.949 6.715-7.682-.628-3.544-3.136-5.126-8.671-5.528l-.365-.026c-1.782-.136-2.898-.481-3.487-.92-.291-.218-.399-.41-.463-.742-.055-.296.037-.839.325-1.3.443-.706 1.305-1.252 2.811-1.516 1.335-.235 2.625-.01 3.947.706a2.121 2.121 0 0 0 3.117-1.632 2.103 2.103 0 0 0-1.094-2.075c-2.149-1.164-4.41-1.559-6.706-1.155Z"
        clip-rule="evenodd"
      />
      <path
        className={className}
        fill="#111827"
        d="M59.792 31.34c3.154 0 5.364-1.654 5.364-4.435v-.042c0-2.463-1.63-3.588-4.807-4.351-2.897-.679-3.583-1.189-3.583-2.335v-.043c0-.975.9-1.76 2.447-1.76 1.18 0 2.295.382 3.454 1.125.215.127.43.191.687.191.686 0 1.244-.531 1.244-1.21 0-.51-.279-.871-.58-1.041-1.35-.891-2.875-1.38-4.764-1.38-2.981 0-5.127 1.762-5.127 4.31v.042c0 2.737 1.802 3.671 5 4.436 2.788.636 3.389 1.21 3.389 2.27v.043c0 1.102-1.03 1.867-2.66 1.867-1.631 0-2.961-.55-4.206-1.527-.171-.127-.407-.234-.772-.234-.686 0-1.245.53-1.245 1.21 0 .424.214.786.516.997a9.418 9.418 0 0 0 5.643 1.867Zm11.398.023c1.738 0 2.918-.722 3.69-1.635v.424c0 .574.516 1.083 1.267 1.083.708 0 1.265-.531 1.265-1.231v-5.518c0-1.465-.386-2.653-1.222-3.46-.794-.806-2.06-1.252-3.755-1.252-1.48 0-2.575.255-3.648.659a1.125 1.125 0 0 0-.708 1.018c0 .594.493 1.06 1.095 1.06a1.47 1.47 0 0 0 .406-.063c.708-.276 1.525-.445 2.511-.445 1.824 0 2.812.848 2.812 2.441v.275a9.563 9.563 0 0 0-3.049-.467c-2.766 0-4.676 1.189-4.676 3.608v.043c0 2.25 1.888 3.46 4.012 3.46Zm.73-1.867c-1.246 0-2.21-.617-2.21-1.7v-.042c0-1.168.986-1.867 2.66-1.867 1.03 0 1.91.19 2.574.445v.765c0 1.42-1.308 2.397-3.025 2.397v.002ZM84.84 31.34c.708 0 1.18-.467 1.48-1.126l3.777-8.573c.093-.192.144-.402.15-.616 0-.7-.557-1.23-1.265-1.23-.687 0-1.03.445-1.223.89l-2.961 7.47-2.919-7.426c-.214-.532-.58-.934-1.287-.934-.708 0-1.287.594-1.287 1.23 0 .233.086.446.15.637l3.777 8.552c.3.68.772 1.125 1.479 1.125h.13Zm12.214 0c.708 0 1.18-.467 1.48-1.126l3.777-8.573c.093-.192.144-.402.15-.616 0-.7-.557-1.23-1.265-1.23-.687 0-1.03.445-1.223.89l-2.962 7.47-2.918-7.426c-.215-.532-.58-.934-1.287-.934-.708 0-1.287.594-1.287 1.23 0 .233.086.446.15.637l3.775 8.552c.302.68.774 1.125 1.482 1.125h.128Zm9.553 3.247c1.825 0 2.854-.849 3.82-3.14l4.141-9.828c.043-.127.107-.402.107-.615 0-.68-.558-1.21-1.244-1.21-.666 0-1.031.446-1.245.976l-2.832 7.45-3.047-7.45c-.236-.594-.601-.975-1.266-.975-.729 0-1.287.53-1.287 1.252 0 .169.063.424.15.615l4.205 9.296-.086.233c-.429.87-.836 1.19-1.609 1.19-.365 0-.601-.065-.901-.15-.129-.042-.257-.085-.472-.085a1.046 1.046 0 0 0-.978.655 1.03 1.03 0 0 0-.073.407c0 .615.429.934.815 1.061.536.211 1.073.318 1.802.318Zm17.771-3.205c2.425 0 4.034-.765 5.451-1.994a1.25 1.25 0 0 0 .429-.934c0-.658-.579-1.21-1.245-1.21-.322 0-.601.128-.794.296-1.094.914-2.168 1.422-3.755 1.422-2.875 0-4.957-2.355-4.957-5.262v-.043c0-2.908 2.104-5.243 4.957-5.243 1.438 0 2.554.51 3.583 1.338a1.3 1.3 0 0 0 .794.254c.731 0 1.31-.551 1.31-1.273 0-.467-.237-.827-.515-1.04-1.31-.998-2.833-1.676-5.151-1.676-4.549 0-7.745 3.46-7.745 7.683v.042c0 4.265 3.261 7.64 7.638 7.64Zm11.785-.021c1.739 0 2.918-.721 3.692-1.634v.424c0 .574.514 1.083 1.264 1.083.709 0 1.267-.531 1.267-1.231v-5.518c0-1.465-.386-2.653-1.224-3.46-.793-.806-2.059-1.252-3.754-1.252-1.481 0-2.575.255-3.648.659a1.126 1.126 0 0 0-.709 1.018c0 .594.495 1.06 1.095 1.06.138-.001.275-.023.407-.063.709-.276 1.524-.445 2.511-.445 1.824 0 2.811.848 2.811 2.441v.275a9.56 9.56 0 0 0-3.047-.467c-2.767 0-4.678 1.189-4.678 3.608v.043c0 2.25 1.889 3.459 4.013 3.459Zm.729-1.868c-1.244 0-2.209-.615-2.209-1.698v-.042c0-1.168.987-1.867 2.66-1.867 1.031 0 1.91.19 2.575.445v.765c0 1.42-1.31 2.397-3.026 2.397Zm10.004 1.74c.73 0 1.309-.55 1.309-1.273V16.803c0-.7-.579-1.273-1.309-1.273-.729 0-1.288.572-1.288 1.273v13.158c0 .723.581 1.274 1.288 1.274Z"
      />
    </svg>
  );
};

export default SavvyCal;
