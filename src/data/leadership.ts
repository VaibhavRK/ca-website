export interface LeadershipMember {
  id: string;
  slug: string;
  name: string;
  designation: string;
  bio: string;
  fullBio?: string[];
  image?: string;
  expertise: string[];
  previousExperience?: string[];
  publications?: string[];
}

export const leadershipMembers: LeadershipMember[] = [
  {
    id: 'devansh-singhal',
    slug: 'ca-devansh-singhal',
    name: 'CA Devansh Singhal',
    designation: 'Founder & Managing Partner',
    image: '/images/leadership/devansh-singhal.jpg',
    bio: 'Chartered Accountant specializing in GST, Customs, Income Tax, Foreign Trade, and Legal Metrology. Combines strategic advisory with strong litigation capabilities across regulatory and appellate forums.',
    fullBio: [
      'Devansh Singhal & Company is founded by CA Devansh Singhal. He is a Chartered Accountant with a practice focused on GST, Customs, Income Tax, Foreign Trade, and Legal Metrology. He advises businesses, promoters, and professionals on complex tax matters, combining strategic advisory with strong litigation capabilities across regulatory and appellate forums.',
      'Prior to establishing his independent practice, he worked with Price Waterhouse & Co. LLP, NITYA Tax Associates, Bobby Parikh Associates, and ITC Hotels Limited, where he gained experience in indirect tax litigation, transaction advisory, tax technology, and corporate tax functions. This diverse exposure enables him to deliver solutions that are both technically sound and commercially practical.',
      'His litigation practice includes investigations, show cause notices, adjudication, assessment, appeals, GSTAT, ITAT matters, customs disputes, refund litigation, and high-value departmental representations. He has also assisted in writ proceedings and regularly works on matters involving classification, valuation, input tax credit, and other contentious tax issues.',
      'Beyond his professional practice, Devansh is an active researcher and published author. His articles have been featured by Taxsutra and VILGST, and he regularly publishes technical analyses on significant judicial decisions and evolving developments in Indian tax law.'
    ],
    expertise: [
      'GST & Indirect Taxation',
      'Income Tax & Corporate Tax',
      'Customs & Foreign Trade Policy',
      'Legal Metrology & Regulatory Compliance',
      'GSTAT & ITAT Appeals',
      'Indirect Tax Litigation',
      'Transaction Advisory & Tax Tech'
    ],
    previousExperience: [
      'Price Waterhouse & Co. LLP',
      'NITYA Tax Associates',
      'Bobby Parikh Associates',
      'ITC Hotels Limited'
    ],
    publications: [
      'Taxsutra - Feature Technical Articles on Indian Tax Law',
      'VILGST - Case Analysis & Judicial Decision Reviews',
      'Regular Technical Papers on Contentious GST & Customs Issues'
    ]
  },
  {
    id: '2',
    slug: 'leadership-member-02',
    name: 'Senior Partner',
    designation: 'Partner - Direct Taxation',
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
    name: 'Partner - Indirect Tax',
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
    name: 'Partner - Corporate Advisory',
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
    name: 'Director - Technology Advisory',
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
    name: 'Director - Business Solutions',
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
