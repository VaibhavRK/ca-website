import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Service } from '../data/services';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const Icon = service.icon;

  return (
    <div className="bg-white border border-border hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out p-6 flex flex-col h-full group/card">
      <div className="flex-1">
        {Icon && <Icon size={36} className="text-accent mb-5" />}
        <h3 className="text-lg font-heading font-semibold text-primary mb-3">
          {service.name}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-6">
          {service.shortDescription}
        </p>
      </div>
      <Link
        to={`/services/${service.slug}`}
        className="group inline-flex items-center text-accent font-medium text-sm mt-auto w-fit"
      >
        <span className="relative pb-0.5">
          Read More
          <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
        </span>
        <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );
};

export default ServiceCard;
