import React from 'react';
import { ArrowRight, User } from 'lucide-react';
import type { LeadershipMember } from '../data/leadership';

interface LeadershipCardProps {
  member: LeadershipMember;
}

const LeadershipCard: React.FC<LeadershipCardProps> = ({ member }) => {
  return (
    <div className="group cursor-pointer bg-white border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col h-full">
      <div className="aspect-[3/4] w-full bg-bg-dark flex items-center justify-center relative overflow-hidden">
        <User className="w-16 h-16 text-text-muted/30 group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
          <span className="text-white font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            View Profile <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-body font-bold text-primary">
          {member.name}
        </h3>
        <p className="text-accent font-medium text-sm mt-1">{member.designation}</p>
        <p className="text-text-secondary text-sm mt-4 leading-relaxed line-clamp-3">
          {member.bio}
        </p>
      </div>
    </div>
  );
};

export default LeadershipCard;
