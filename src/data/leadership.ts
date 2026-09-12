export interface LeadershipMember {
  id: string;
  slug: string;
  name: string;
  designation: string;
  bio: string;
  expertise: string[];
}

export const leadershipMembers: LeadershipMember[] = [
  {
    id: '1',
    slug: 'leadership-member-01',
    name: 'Leadership Member 01',
    designation: 'Senior Partner',
    bio: 'A seasoned professional with over 25 years of experience in audit, assurance, and advisory services. Known for providing strategic counsel to leading corporations and fostering long-term client relationships built on trust and excellence.',
    expertise: [
      'Audit & Assurance',
      'Corporate Governance',
      'Strategic Advisory',
      'Regulatory Compliance',
    ],
  },
  {
    id: '2',
    slug: 'leadership-member-02',
    name: 'Leadership Member 02',
    designation: 'Managing Partner',
    bio: 'Brings deep expertise in taxation and business structuring with more than 20 years of professional practice. Has advised numerous businesses on complex tax planning and compliance matters across multiple jurisdictions.',
    expertise: [
      'Direct Taxation',
      'Business Structuring',
      'Transfer Pricing',
      'Tax Litigation',
    ],
  },
  {
    id: '3',
    slug: 'leadership-member-03',
    name: 'Leadership Member 03',
    designation: 'Partner',
    bio: 'Specializes in indirect taxation and regulatory advisory with extensive experience in helping businesses navigate the complexities of GST and customs regulations. A recognized thought leader in the profession.',
    expertise: [
      'Indirect Taxation',
      'GST Advisory',
      'Customs & Trade',
      'Regulatory Compliance',
    ],
  },
  {
    id: '4',
    slug: 'leadership-member-04',
    name: 'Leadership Member 04',
    designation: 'Partner',
    bio: 'An accomplished professional with a focus on business advisory and financial consulting. Has led numerous engagements involving due diligence, valuations, and strategic planning for organizations of all sizes.',
    expertise: [
      'Business Advisory',
      'Due Diligence',
      'Valuations',
      'Financial Consulting',
    ],
  },
  {
    id: '5',
    slug: 'leadership-member-05',
    name: 'Leadership Member 05',
    designation: 'Director',
    bio: 'Leads the firm\'s technology advisory practice with over 15 years of experience in IT risk, digital transformation, and cybersecurity. Passionate about helping organizations leverage technology for competitive advantage.',
    expertise: [
      'IT Risk Advisory',
      'Digital Transformation',
      'Cybersecurity',
      'Data Analytics',
    ],
  },
  {
    id: '6',
    slug: 'leadership-member-06',
    name: 'Leadership Member 06',
    designation: 'Director',
    bio: 'Oversees the firm\'s accounting and process outsourcing practice. Known for building efficient operational frameworks that help businesses streamline their financial operations and focus on growth.',
    expertise: [
      'Process Outsourcing',
      'Financial Operations',
      'Compliance Management',
      'ERP Advisory',
    ],
  },
];

export function getLeaderBySlug(slug: string): LeadershipMember | undefined {
  return leadershipMembers.find((m) => m.slug === slug);
}
