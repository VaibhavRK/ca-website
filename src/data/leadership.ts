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
    designation: '',
    image: '/images/leadership/devansh-singhal.jpg',
    bio: 'Devansh Singhal is the Founder of Devansh Singhal & Company and a Chartered Accountant in practice with a core focus on taxation, particularly tax advisory and litigation. His practice spans GST, Customs, Income Tax, Foreign Trade and regulatory matters, where he advises businesses, promoters and professionals on complex tax and regulatory issues.',
    fullBio: [
      'Devansh Singhal is the Founder of Devansh Singhal & Company and a Chartered Accountant in practice with a core focus on taxation, particularly tax advisory and litigation. His practice spans GST, Customs, Income Tax, Foreign Trade and regulatory matters, where he advises businesses, promoters and professionals on complex tax and regulatory issues.',
      'His work encompasses tax advisory, litigation strategy, investigations, show cause and adjudication proceedings, assessments, drafting of replies and appeals, and representation before departmental authorities and appellate forums, including the GST Appellate Tribunal and Income Tax Appellate Tribunal. He has also assisted in writ proceedings and regularly works on contentious issues involving classification, valuation, input tax credit, refunds and other interpretational matters.',
      'Prior to establishing his independent practice, Devansh worked with Price Waterhouse & Co. LLP, NITYA Tax Associates, Bobby Parikh Associates and ITC Hotels Limited, gaining experience across indirect tax litigation, transaction advisory, tax technology and corporate tax functions. This diverse exposure has shaped an approach that combines technical depth and independent analysis with an understanding of the commercial context in which tax issues arise.',
      'Beyond professional practice, Devansh has a strong interest in tax research and evolving jurisprudence. He regularly writes and contributes on significant judicial and regulatory developments, with his articles and analyses published by professional tax and legal platforms including Taxsutra and VILGST.',
      'As Founder, he also oversees the Firm’s broader professional practice across audit and assurance, regulatory compliance, business advisory and allied services.'
    ],
    expertise: [
      'GST, Customs, Income Tax, Foreign Trade, Regulatory Matters'
    ]
  }
];

export function getLeaderBySlug(slug: string): LeadershipMember | undefined {
  return leadershipMembers.find((m) => m.slug === slug);
}
