import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  centered = true,
  light = false,
}) => {
  return (
    <div className={`mb-10 md:mb-14 flex flex-col ${centered ? 'items-center text-center' : 'items-start'}`}>
      <div className="w-10 h-0.5 bg-accent mb-3" />
      <h2
        className={`text-2xl md:text-3xl font-heading font-semibold mb-4 ${
          light ? 'text-white' : 'text-primary'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`max-w-2xl text-base leading-relaxed ${
            light ? 'text-white/80' : 'text-text-secondary'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
