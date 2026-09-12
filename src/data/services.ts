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
    slug: 'service-one',
    name: 'Audit & Assurance',
    icon: Shield,
    shortDescription:
      'Independent audit and assurance services that build stakeholder confidence and strengthen organizational governance.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80',
    paragraphs: [
      'In an era of increasing regulatory scrutiny and stakeholder expectations, a robust audit and assurance function is no longer optional — it is a cornerstone of sound corporate governance. Our Audit & Assurance practice brings together seasoned professionals with deep sector knowledge to deliver engagements that go beyond mere compliance. We examine financial statements, internal controls, and operational processes with a critical yet constructive lens, ensuring that the information your stakeholders rely upon is accurate, complete, and fairly presented.',
      'Our methodology is risk-based and tailored to the unique characteristics of each client. We invest time upfront to understand your business model, industry dynamics, and the specific risks that could affect your financial reporting. This allows us to focus our efforts where they matter most, delivering an efficient engagement without compromising on quality. Throughout the process, we maintain open communication with management and those charged with governance, sharing observations and insights as they emerge rather than waiting until the end of the engagement.',
      'Beyond the audit opinion, our teams provide management letters and detailed observations that highlight control weaknesses, process inefficiencies, and areas of emerging risk. These insights serve as a practical roadmap for improvement, helping your organization strengthen its internal environment and build resilience. Our partner-led teams are committed to long-term relationships, ensuring continuity of knowledge and a deep understanding of your evolving business needs year after year.',
    ],
    keyOfferings: [
      'Statutory and regulatory audit engagements',
      'Internal control assessments and gap analysis',
      'Risk-based audit planning and execution',
      'Management letters and improvement recommendations',
      'Industry-specific assurance services',
      'Compliance monitoring and reporting',
    ],
    benefits: [
      'Enhanced credibility with investors and lenders',
      'Stronger internal controls and governance',
      'Early identification of financial and operational risks',
      'Actionable insights beyond the audit opinion',
      'Partner-led teams with deep industry knowledge',
    ],
  },
  {
    id: '2',
    slug: 'service-two',
    name: 'Taxation Advisory',
    icon: FileText,
    shortDescription:
      'Strategic tax planning and compliance services that optimize your tax position while ensuring full regulatory adherence.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80',
    paragraphs: [
      'Navigating the complexities of India\'s tax landscape requires both technical precision and strategic foresight. Our Taxation Advisory practice offers a comprehensive suite of direct and indirect tax services designed to help businesses and individuals manage their tax obligations efficiently while remaining fully compliant with applicable laws. From corporate income tax planning to GST advisory, our specialists bring clarity to complex tax matters and help you make informed decisions that align with your broader financial objectives.',
      'Tax laws are constantly evolving, and staying ahead of legislative changes is critical to avoiding unexpected liabilities. Our team monitors regulatory developments closely and proactively advises clients on the implications of new rules, amendments, and judicial pronouncements. Whether you are structuring a new business, evaluating a transaction, or managing a tax dispute, we provide timely, practical guidance that minimizes risk and maximizes opportunity. Our cross-border expertise is particularly valuable for businesses with international operations or those considering expansion into new markets.',
      'We believe that effective tax planning is not about aggressive avoidance but about understanding the law thoroughly and applying it intelligently. Our approach is transparent, ethical, and aligned with the spirit of the legislation. We work closely with your finance and legal teams to integrate tax considerations into your overall business strategy, ensuring that tax efficiency is achieved without compromising compliance or reputation. Our representation services before tax authorities and appellate tribunals further ensure that your interests are robustly protected at every stage.',
    ],
    keyOfferings: [
      'Corporate and personal income tax planning',
      'GST registration, compliance, and advisory',
      'Transfer pricing documentation and advisory',
      'Tax due diligence for transactions',
      'Representation before tax authorities',
      'Cross-border and international tax advisory',
    ],
    benefits: [
      'Optimized tax position and reduced liability',
      'Proactive compliance with evolving regulations',
      'Expert representation in disputes and assessments',
      'Integrated tax strategy aligned with business goals',
      'Transparent and ethical advisory approach',
    ],
  },
  {
    id: '3',
    slug: 'service-three',
    name: 'Regulatory & Compliance',
    icon: TrendingUp,
    shortDescription:
      'End-to-end regulatory compliance solutions that help businesses meet their obligations and manage risk effectively.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80',
    paragraphs: [
      'The regulatory environment facing businesses today is more complex and demanding than ever before. From company law and SEBI regulations to sector-specific compliance requirements, organizations must navigate a dense web of obligations that carry significant legal and reputational consequences if not met. Our Regulatory & Compliance practice provides end-to-end support to help businesses understand their obligations, implement robust compliance frameworks, and maintain ongoing adherence to applicable laws and regulations.',
      'Our specialists work across a broad range of regulatory domains, bringing deep expertise in corporate law, securities regulations, foreign exchange management, and sector-specific requirements. We begin each engagement with a thorough compliance health check, mapping your current practices against applicable requirements to identify gaps and areas of risk. From there, we develop a structured remediation plan and work alongside your team to implement the necessary changes, whether that involves updating policies, strengthening processes, or enhancing documentation practices.',
      'Compliance is not a one-time exercise — it requires continuous monitoring and adaptation as regulations evolve. Our ongoing compliance support services ensure that your organization stays current with regulatory changes and that your compliance framework remains effective over time. We also provide training programs for your teams, building internal capability and fostering a culture of compliance throughout the organization. With our support, you can focus on your core business with the confidence that your regulatory obligations are being managed professionally and proactively.',
    ],
    keyOfferings: [
      'Compliance health checks and gap assessments',
      'Corporate law and secretarial compliance',
      'SEBI and capital markets regulatory advisory',
      'FEMA and foreign exchange compliance',
      'Sector-specific regulatory advisory',
      'Compliance training and capacity building',
    ],
    benefits: [
      'Reduced risk of regulatory penalties and sanctions',
      'Structured and documented compliance framework',
      'Proactive monitoring of regulatory changes',
      'Stronger governance and accountability',
      'Trained and compliance-aware internal teams',
    ],
  },
  {
    id: '4',
    slug: 'service-four',
    name: 'Business Advisory',
    icon: Building2,
    shortDescription:
      'Strategic business advisory services that support critical decisions, transactions, and organizational transformation.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80',
    paragraphs: [
      'Every significant business decision carries financial, operational, and strategic implications that require careful analysis and expert guidance. Our Business Advisory practice supports organizations at critical junctures — whether you are evaluating an acquisition, restructuring your operations, entering a new market, or planning for succession. We bring a multidisciplinary perspective that combines financial analysis, industry knowledge, and strategic thinking to help you make decisions with confidence and clarity.',
      'Our due diligence services are particularly valued by clients involved in mergers, acquisitions, and investment transactions. We conduct thorough financial, tax, and operational due diligence that uncovers risks and opportunities not visible on the surface, giving you a complete picture before you commit. Our valuation services apply rigorous methodologies to determine the fair value of businesses, assets, and financial instruments, supporting transactions, financial reporting, and dispute resolution. In each engagement, we go beyond the numbers to provide context and interpretation that drives better outcomes.',
      'For organizations undergoing transformation, our advisory teams provide hands-on support throughout the change process. From designing new operating models to supporting post-merger integration, we work as an extension of your management team to ensure that strategic initiatives are executed effectively. Our performance improvement practice identifies inefficiencies and untapped opportunities within your business, developing practical recommendations that deliver measurable results. We are committed to being a long-term partner in your growth journey, not just a transactional advisor.',
    ],
    keyOfferings: [
      'Financial and tax due diligence',
      'Business and asset valuations',
      'Mergers and acquisitions advisory',
      'Post-merger integration support',
      'Performance improvement consulting',
      'Market entry and growth strategy',
    ],
    benefits: [
      'Informed decision-making backed by rigorous analysis',
      'Comprehensive risk identification before transactions',
      'Independent and credible valuation opinions',
      'Practical strategies for sustainable growth',
      'Hands-on support through complex transformations',
    ],
  },
  {
    id: '5',
    slug: 'service-five',
    name: 'Accounting & Outsourcing',
    icon: Calculator,
    shortDescription:
      'Reliable accounting, bookkeeping, and finance outsourcing services that free your team to focus on growth.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    paragraphs: [
      'Maintaining accurate, timely, and compliant financial records is fundamental to every business, yet it demands significant time, expertise, and resources. Our Accounting & Outsourcing practice provides a comprehensive range of finance and accounting services that allow businesses to access high-quality financial management without the overhead of building and maintaining a large in-house team. From day-to-day bookkeeping to complex financial reporting, we handle the full spectrum of accounting functions with precision and professionalism.',
      'Our outsourcing model is built on a foundation of robust processes, advanced technology platforms, and a team of qualified accounting professionals. We invest in understanding your business thoroughly so that we can deliver outputs that are not just accurate but genuinely useful for decision-making. Our management reporting services provide your leadership team with clear, timely financial insights — dashboards, variance analyses, and cash flow forecasts — that support effective business management. We also handle payroll processing, statutory filings, and regulatory compliance, ensuring that all your financial obligations are met on time.',
      'Scalability is a key advantage of our outsourcing model. As your business grows or your needs change, our services can be scaled up or down quickly without the disruption of hiring or restructuring an internal team. We operate as a seamless extension of your organization, maintaining confidentiality and delivering consistent quality. Our clients benefit from access to a broad pool of expertise — including tax specialists, compliance professionals, and financial analysts — that would be difficult and costly to replicate in-house. With us managing your accounting function, your leadership team can focus their energy on strategy and growth.',
    ],
    keyOfferings: [
      'Bookkeeping and accounts maintenance',
      'Financial statement preparation and reporting',
      'Payroll processing and compliance',
      'Management reporting and MIS',
      'Accounts payable and receivable management',
      'Statutory filing and regulatory compliance',
    ],
    benefits: [
      'Reduced overhead and operational costs',
      'Access to qualified accounting professionals',
      'Accurate and timely financial reporting',
      'Scalable services that grow with your business',
      'Freedom to focus on core business activities',
    ],
  },
  {
    id: '6',
    slug: 'service-six',
    name: 'Technology Advisory',
    icon: Monitor,
    shortDescription:
      'Technology risk and digital transformation advisory that helps organizations harness technology safely and effectively.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80',
    paragraphs: [
      'Technology is both an enabler of competitive advantage and a source of significant risk. As organizations accelerate their digital transformation journeys, the need for expert guidance on technology governance, risk management, and cybersecurity has never been greater. Our Technology Advisory practice helps organizations navigate the complex intersection of technology and business, ensuring that digital investments deliver their intended value while risks are identified and managed effectively.',
      'Our IT risk and assurance services provide independent assessments of your technology environment, evaluating the design and effectiveness of controls across your IT infrastructure, applications, and data management practices. We identify vulnerabilities, assess the maturity of your cybersecurity posture, and provide practical recommendations for improvement. Our digital transformation advisory services help organizations develop and execute technology strategies that are aligned with business objectives, whether that involves implementing new ERP systems, migrating to the cloud, or leveraging data analytics for better decision-making.',
      'Data has become one of the most valuable assets an organization possesses, and managing it responsibly is both a strategic imperative and a regulatory requirement. Our data governance and analytics services help organizations establish robust frameworks for data management, quality, and security, while also unlocking the analytical potential of their data assets. We work with your technology and business teams to design solutions that are practical, scalable, and aligned with your long-term vision. Our goal is to be a trusted advisor who helps you harness the power of technology with confidence and control.',
    ],
    keyOfferings: [
      'IT risk assessment and assurance',
      'Cybersecurity assessment and advisory',
      'Digital transformation strategy and support',
      'ERP implementation advisory and review',
      'Data governance and analytics advisory',
      'IT governance framework design',
    ],
    benefits: [
      'Reduced technology and cybersecurity risks',
      'Aligned technology and business strategy',
      'Stronger data governance and compliance',
      'Improved return on technology investments',
      'Confident and controlled digital transformation',
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
