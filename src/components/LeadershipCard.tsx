import React, { useState } from 'react';
import { ArrowRight, User, X, Briefcase, BookOpen, Award, CheckCircle2 } from 'lucide-react';
import type { LeadershipMember } from '../data/leadership';

interface LeadershipCardProps {
  member: LeadershipMember;
}

const LeadershipCard: React.FC<LeadershipCardProps> = ({ member }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className="group cursor-pointer bg-white border border-border shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col h-full rounded-md overflow-hidden"
      >
        {/* Profile Image container */}
        <div className="aspect-[4/3] w-full bg-slate-900 flex items-center justify-center relative overflow-hidden">
          {member.image ? (
            <img 
              src={member.image} 
              alt={member.name}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
              <User className="w-20 h-20 text-white/20 group-hover:scale-105 transition-transform duration-500" />
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 z-10">
            <span className="text-accent font-medium text-sm flex items-center gap-2 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
              View Profile & Credentials <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Info Box */}
        <div className="p-6 flex flex-col flex-1 bg-white">
          <div className="flex-1">
            <h3 className="text-xl font-heading font-bold text-primary group-hover:text-accent transition-colors">
              {member.name}
            </h3>
            <p className="text-accent font-semibold text-xs tracking-wider uppercase mt-1">
              {member.designation}
            </p>
            <p className="text-text-secondary text-sm mt-3 leading-relaxed line-clamp-3">
              {member.bio}
            </p>
          </div>

          {/* Expertise Tags */}
          <div className="mt-5 pt-4 border-t border-border/60 flex flex-wrap gap-1.5">
            {member.expertise.slice(0, 3).map((exp, i) => (
              <span 
                key={i} 
                className="text-[11px] font-medium bg-bg-alt text-primary/80 px-2.5 py-1 rounded-full border border-border/80"
              >
                {exp}
              </span>
            ))}
            {member.expertise.length > 3 && (
              <span className="text-[11px] font-medium bg-accent/10 text-accent-dark px-2 py-1 rounded-full">
                +{member.expertise.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-border relative animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors flex items-center justify-center"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header Banner */}
            <div className="bg-primary text-white p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 border-b border-white/10">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-lg overflow-hidden border-2 border-accent/40 shadow-lg shrink-0 bg-slate-800">
                {member.image ? (
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary-dark">
                    <User className="w-16 h-16 text-white/30" />
                  </div>
                )}
              </div>
              <div className="text-center md:text-left flex-1">
                <span className="inline-block px-3 py-1 bg-accent/20 text-accent font-semibold text-xs tracking-wider uppercase rounded-full mb-2 border border-accent/30">
                  {member.designation}
                </span>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">
                  {member.name}
                </h2>
                <p className="text-white/80 text-sm mt-2 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8 space-y-8 bg-white">
              {/* Full Bio Paragraphs */}
              {member.fullBio && member.fullBio.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-heading font-bold text-primary border-b border-border pb-2 flex items-center gap-2">
                    <Award className="w-5 h-5 text-accent" /> Professional Background
                  </h4>
                  {member.fullBio.map((paragraph, idx) => (
                    <p key={idx} className="text-slate-700 text-sm leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              {/* Previous Experience */}
              {member.previousExperience && member.previousExperience.length > 0 && (
                <div>
                  <h4 className="text-lg font-heading font-bold text-primary border-b border-border pb-2 mb-3 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-accent" /> Prior Firm & Corporate Experience
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {member.previousExperience.map((firm, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 p-3 rounded-lg bg-bg-alt border border-border/80">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                        <span className="text-xs font-semibold text-slate-800">{firm}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Publications & Articles */}
              {member.publications && member.publications.length > 0 && (
                <div>
                  <h4 className="text-lg font-heading font-bold text-primary border-b border-border pb-2 mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-accent" /> Research & Publications
                  </h4>
                  <ul className="space-y-2">
                    {member.publications.map((pub, idx) => (
                      <li key={idx} className="text-xs text-slate-700 bg-slate-50 p-3 rounded-md border border-slate-200 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0"></span>
                        <span>{pub}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Areas of Practice & Expertise */}
              <div>
                <h4 className="text-lg font-heading font-bold text-primary border-b border-border pb-2 mb-3">
                  Areas of Practice & Expertise
                </h4>
                <div className="flex flex-wrap gap-2">
                  {member.expertise.map((item, idx) => (
                    <span key={idx} className="text-xs font-medium bg-primary/10 text-primary px-3 py-1.5 rounded-md border border-primary/20">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Footer inside Modal */}
              <div className="pt-4 border-t border-border flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2.5 bg-primary text-white text-sm font-medium rounded-md hover:bg-accent transition-colors"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LeadershipCard;
