import React from 'react';

interface CuteStudyBlobProps {
  isStudying?: boolean;
  className?: string;
}

export const CuteStudyBlob: React.FC<CuteStudyBlobProps> = ({ isStudying = true, className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 340 300"
        className="w-64 h-64 sm:w-72 sm:h-72 select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Table line */}
        <line
          x1="20"
          y1="190"
          x2="320"
          y2="198"
          stroke="#1E1E2D"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Character main body outline (cute smooth blob) */}
        <path
          d="M 68 188 
             C 65 170, 72 135, 88 105 
             C 105 75, 130 55, 175 52 
             C 225 50, 260 80, 275 120 
             C 285 145, 287 172, 280 195 
             Z"
          fill="#FFFFFF"
          stroke="#1E1E2D"
          strokeWidth="4.5"
          strokeLinejoin="round"
        />

        {/* Left shoulder curve */}
        <path
          d="M 66 188 C 75 170, 92 165, 110 166"
          fill="none"
          stroke="#1E1E2D"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Eyes & tiny nose */}
        <ellipse cx="148" cy="120" rx="3" ry="4" fill="#1E1E2D" />
        <ellipse cx="178" cy="122" rx="3" ry="4" fill="#1E1E2D" />
        <circle cx="165" cy="126" r="1.5" fill="#1E1E2D" />

        {/* Open Notebook / Book on desk */}
        <g id="notebook" transform="translate(85, 180)">
          {/* Left page */}
          <path
            d="M 60 12 C 45 8, 25 10, 10 20 L 14 72 C 30 64, 48 64, 60 70 Z"
            fill="#FFFFFF"
            stroke="#1E1E2D"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Right page */}
          <path
            d="M 60 12 C 75 8, 95 10, 110 20 L 106 72 C 90 64, 72 64, 60 70 Z"
            fill="#FFFFFF"
            stroke="#1E1E2D"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Spine center */}
          <line x1="60" y1="12" x2="60" y2="70" stroke="#1E1E2D" strokeWidth="3" />

          {/* Left page text lines */}
          <line x1="20" y1="28" x2="52" y2="24" stroke="#1E1E2D" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="18" y1="36" x2="52" y2="32" stroke="#1E1E2D" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="20" y1="44" x2="50" y2="40" stroke="#1E1E2D" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="21" y1="52" x2="48" y2="48" stroke="#1E1E2D" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="22" y1="60" x2="46" y2="56" stroke="#1E1E2D" strokeWidth="2.5" strokeLinecap="round" />

          {/* Right page text lines */}
          <line x1="68" y1="24" x2="100" y2="28" stroke="#1E1E2D" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="68" y1="32" x2="102" y2="36" stroke="#1E1E2D" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="70" y1="40" x2="100" y2="44" stroke="#1E1E2D" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="71" y1="48" x2="98" y2="52" stroke="#1E1E2D" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="72" y1="56" x2="95" y2="60" stroke="#1E1E2D" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Hand, Arm & Pencil */}
        <g
          id="hand-pencil"
          className={isStudying ? 'animate-[bounce_1.5s_infinite]' : ''}
          style={{ transformOrigin: '150px 180px' }}
        >
          {/* Arm curve coming down */}
          <path
            d="M 125 150 C 135 155, 142 165, 145 178"
            fill="none"
            stroke="#1E1E2D"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Little hand / paw gripping pencil */}
          <circle cx="152" cy="180" r="10" fill="#FFFFFF" stroke="#1E1E2D" strokeWidth="3.5" />

          {/* Pencil */}
          <polygon
            points="146,165 158,160 144,198 139,195"
            fill="#1E1E2D"
          />
          <polygon
            points="144,198 139,195 137,204"
            fill="#1E1E2D"
          />
        </g>
      </svg>
    </div>
  );
};
