import {
  Shield,
  FileText,
  TrendingUp,
  Building2,
  Calculator,
  Monitor,
} from 'lucide-react';
import type { ComponentType } from 'react';

export interface Service {
  id: string;
  slug: string;
  name: string;
  icon: ComponentType<{ className?: string; size?: number }>;
  shortDescription: string;
  image: string;
  paragraphs: string[];
  keyOfferings: string[];
  benefits: string[];
}

export const services: Service[] = [
  {
    id: '1',
    slug: 'indirect-taxation',
    name: 'Indirect Taxation',
    icon: FileText,
    shortDescription:
      'Our Indirect Tax practice provides comprehensive advisory, compliance and litigation support across GST, Customs and allied indirect tax laws.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80',
    paragraphs: [
      'Our Indirect Tax practice provides comprehensive advisory, compliance and litigation support across GST, Customs and allied indirect tax laws. We assist businesses in navigating complex and evolving tax frameworks, evaluating tax positions, managing transactional and compliance risks, and effectively addressing disputes before tax authorities and appellate forums.',
      'Our approach combines technical understanding of the law with a practical appreciation of business transactions. From structuring and advisory to departmental proceedings and appellate litigation, we work closely with clients to develop legally sustainable and commercially workable solutions.'
    ],
    keyOfferings: [
      'GST Advisory & Transaction Structuring',
      'GST Litigation & Dispute Resolution',
      'Representation before GST Authorities & GST Appellate Tribunal',
      'GST Audits, Investigations & Departmental Proceedings',
      'Input Tax Credit Advisory & Disputes',
      'Classification, Valuation & Place of Supply',
      'GST Refunds & Export-related Advisory',
      'Customs Advisory & Litigation',
      'Customs Classification, Valuation & Exemptions',
      'Import & Export Tax Advisory',
      'Foreign Trade Policy (FTP) & DGFT Matters',
      'Indirect Tax Health Checks & Risk Reviews',
      'Indirect Tax Due Diligence',
      'Indirect Tax Compliance & Procedural Support'
    ],
    benefits: []
  },
  {
    id: '2',
    slug: 'direct-taxation',
    name: 'Direct Taxation',
    icon: Calculator,
    shortDescription:
      'Our Direct Tax practice provides comprehensive advisory, compliance and litigation support under the Income-tax Act and allied direct tax laws.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80',
    paragraphs: [
      'Our Direct Tax practice provides comprehensive advisory, compliance and litigation support under the Income-tax Act and allied direct tax laws. We assist businesses and individuals in evaluating tax positions, structuring transactions, managing tax risks and navigating assessments, reassessments and other proceedings before tax authorities and appellate forums.',
      'Our approach combines a strong understanding of tax law and evolving jurisprudence with the commercial context of each matter. From day-to-day advisory and tax planning to complex disputes and appellate proceedings, we focus on providing technically sound, practical and sustainable solutions.'
    ],
    keyOfferings: [
      'Income Tax Advisory & Tax Planning',
      'Direct Tax Litigation & Dispute Resolution',
      'Representation before Income Tax Authorities & Income Tax Appellate Tribunal',
      'Assessment & Reassessment Proceedings',
      'Search, Survey & Investigation Matters',
      'Penalty & Prosecution Proceedings',
      'Taxation of Business Restructuring & Transactions',
      'Capital Gains & Investment-related Tax Advisory',
      'Withholding Tax (TDS/TCS) Advisory & Compliance',
      'International Taxation & Cross-border Transactions',
      'Transfer Pricing Advisory & Documentation',
      'Tax Due Diligence & Risk Assessment',
      'Tax Audit & Income Tax Compliance',
      'Refund, Rectification & Other Procedural Matters'
    ],
    benefits: []
  },
  {
    id: '3',
    slug: 'audit-assurance',
    name: 'Audit & Assurance',
    icon: Shield,
    shortDescription:
      'Our Audit & Assurance practice provides independent and objective services aimed at enhancing the reliability of financial reporting.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80',
    paragraphs: [
      'Our Audit & Assurance practice provides independent and objective services aimed at enhancing the reliability of financial reporting, strengthening internal control frameworks and supporting sound governance. We undertake assurance and related engagements in accordance with applicable professional standards and regulatory requirements.',
      'Our approach goes beyond procedural compliance, with an emphasis on understanding the business, identifying areas of risk and applying professional judgement throughout the engagement. We seek to deliver assurance that inspires confidence while providing meaningful insights into financial reporting and control processes.'
    ],
    keyOfferings: [
      'Statutory Audit',
      'Tax Audit',
      'Internal Audit',
      'Internal Financial Controls (IFC)',
      'Agreed-Upon Procedures (AUP)',
      'Limited Review & Other Assurance Engagements',
      'Forensic & Investigative Audit',
      'Certification & Attestation Services',
      'Financial Statement Review & Reporting',
      'Ind AS & Accounting Advisory',
      'Special Purpose Audits & Reviews',
      'Due Diligence & Financial Reviews'
    ],
    benefits: []
  },
  {
    id: '4',
    slug: 'regulatory-compliance',
    name: 'Regulatory & Compliance',
    icon: TrendingUp,
    shortDescription:
      'Our Regulatory & Compliance practice assists businesses in navigating regulatory requirements that extend beyond conventional tax and financial laws.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80',
    paragraphs: [
      'Our Regulatory & Compliance practice assists businesses in navigating regulatory requirements that extend beyond conventional tax and financial laws. We advise on product, packaging, environmental and other business regulations, helping clients understand their obligations, structure compliant processes and manage regulatory risks.',
      'Our approach is focused on interpreting regulatory requirements in the context of the client’s products and business operations, providing practical support across compliance reviews, product and packaging assessments, regulatory filings and proceedings before the relevant authorities.'
    ],
    keyOfferings: [
      'Legal Metrology Advisory & Compliance',
      'Legal Metrology (Packaged Commodities) Rules Advisory',
      'Product Labels, Packaging & Artwork Review',
      'Plastic Waste Management (PWM) Rules',
      'Extended Producer Responsibility (EPR) Compliance',
      'E-Waste Management Rules',
      'Battery Waste Management Rules',
      'Environmental & Product Compliance Advisory',
      'Regulatory Registrations, Filings & Renewals',
      'Regulatory Health Checks & Compliance Reviews',
      'Advisory on Notices & Regulatory Proceedings',
      'Representation before Regulatory Authorities',
      'Regulatory Due Diligence & Risk Assessment'
    ],
    benefits: []
  },
  {
    id: '5',
    slug: 'business-advisory',
    name: 'Business Advisory',
    icon: Building2,
    shortDescription:
      'Our Business Advisory practice supports businesses, entrepreneurs and promoters across key stages of their business lifecycle.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    paragraphs: [
      'Our Business Advisory practice supports businesses, entrepreneurs and promoters across key stages of their business lifecycle. We assist clients in evaluating commercial and financial matters, structuring business arrangements and addressing strategic, transactional and governance requirements.',
      'Our approach combines financial understanding with tax and regulatory perspectives, enabling us to provide practical and commercially relevant advice tailored to the nature and objectives of each business.'
    ],
    keyOfferings: [
      'Business Structuring & Reorganisation',
      'Transaction Advisory',
      'Financial & Commercial Due Diligence',
      'Business Valuation & Financial Analysis',
      'Business Plans & Financial Modelling',
      'Transaction Documentation & Commercial Agreements',
      'Partnership, LLP & Shareholders’ Arrangements',
      'Corporate & Financial Restructuring',
      'Startup & Promoter Advisory',
      'Business Risk Assessment',
      'Management & Strategic Advisory',
      'Succession & Ownership Structuring',
      'Investment & Funding Advisory',
      'Transaction Support & Deal Assistance'
    ],
    benefits: []
  },
  {
    id: '6',
    slug: 'accounting-outsourcing',
    name: 'Accounting & Outsourcing',
    icon: Monitor,
    shortDescription:
      'Our Accounting & Outsourcing practice assists businesses in managing their finance and accounting functions through reliable, structured and scalable support.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80',
    paragraphs: [
      'Our Accounting & Outsourcing practice assists businesses in managing their finance and accounting functions through reliable, structured and scalable support. We work with businesses to maintain accurate financial records, streamline routine finance processes and ensure timely availability of financial information for compliance and decision-making purposes.',
      'Our services can be tailored to supplement an existing finance team or operate as an outsourced finance function, allowing management to focus on core business activities while maintaining appropriate financial discipline and reporting.'
    ],
    keyOfferings: [
      'Bookkeeping & Accounting',
      'Preparation & Finalisation of Financial Statements',
      'Management Information System (MIS) Reporting',
      'Accounts Payable & Receivable Management',
      'Payroll Processing & Related Compliance',
      'Bank & Account Reconciliations',
      'Monthly & Periodic Financial Closing',
      'Virtual CFO & Finance Function Support',
      'Budgeting, Forecasting & Cash Flow Management',
      'Accounting Process Review & Improvement',
      'Financial Reporting & Management Reporting',
      'Outsourced Finance & Accounting Function',
      'Accounting Support for Startups & Growing Businesses',
      'Coordination of Tax, Accounting & Financial Compliance'
    ],
    benefits: []
  }
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
