import React from 'react';

interface RaheKonkurLogoProps {
  size?: number | string;
  className?: string;
  animated?: boolean;
}

export const RaheKonkurLogo: React.FC<RaheKonkurLogoProps> = ({
  size = 48,
  className = '',
  animated = false,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none flex-shrink-0 ${className}`}
    >
      {/* Background Rounded Canvas matching logo */}
      <rect width="512" height="512" rx="110" fill="#EFF3F1" />

      {/* Row 0 */}
      {/* (0,0) - Highlighted active node with double outer glow ring */}
      <circle
        cx="132"
        cy="132"
        r="48"
        stroke="#F69EB5"
        strokeWidth="12"
        fill="none"
        className={animated ? 'animate-pulse' : ''}
      />
      <circle cx="132" cy="132" r="33" fill="#E83B67" />

      {/* (0,1) */}
      <circle cx="214" cy="132" r="28" stroke="#A0AAB0" strokeWidth="12" fill="none" />
      {/* (0,2) */}
      <circle cx="298" cy="132" r="28" stroke="#A0AAB0" strokeWidth="12" fill="none" />
      {/* (0,3) */}
      <circle cx="382" cy="132" r="28" stroke="#A0AAB0" strokeWidth="12" fill="none" />

      {/* Row 1 */}
      {/* (1,0) */}
      <circle cx="132" cy="216" r="28" stroke="#A0AAB0" strokeWidth="12" fill="none" />
      {/* (1,1) - Filled active path node */}
      <circle cx="214" cy="216" r="30" fill="#E83B67" />
      {/* (1,2) */}
      <circle cx="298" cy="216" r="28" stroke="#A0AAB0" strokeWidth="12" fill="none" />
      {/* (1,3) */}
      <circle cx="382" cy="216" r="28" stroke="#A0AAB0" strokeWidth="12" fill="none" />

      {/* Row 2 */}
      {/* (2,0) */}
      <circle cx="132" cy="300" r="28" stroke="#A0AAB0" strokeWidth="12" fill="none" />
      {/* (2,1) */}
      <circle cx="214" cy="300" r="28" stroke="#A0AAB0" strokeWidth="12" fill="none" />
      {/* (2,2) - Filled active path node */}
      <circle cx="298" cy="300" r="30" fill="#E83B67" />
      {/* (2,3) */}
      <circle cx="382" cy="300" r="28" stroke="#A0AAB0" strokeWidth="12" fill="none" />

      {/* Row 3 */}
      {/* (3,0) */}
      <circle cx="132" cy="384" r="28" stroke="#A0AAB0" strokeWidth="12" fill="none" />
      {/* (3,1) */}
      <circle cx="214" cy="384" r="28" stroke="#A0AAB0" strokeWidth="12" fill="none" />
      {/* (3,2) */}
      <circle cx="298" cy="384" r="28" stroke="#A0AAB0" strokeWidth="12" fill="none" />
      {/* (3,3) - Filled active path node */}
      <circle cx="382" cy="384" r="30" fill="#E83B67" />
    </svg>
  );
};
