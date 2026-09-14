import React, { useState, useEffect } from 'react';
import PageHero from '../components/PageHero';
import { MapPin, Phone, Mail, ArrowRight, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Contact Us | CA Firm';
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const recipientEmail = 'devansh.singhal@dsca.in';
    const subjectText = formData.subject ? `[Website Inquiry] ${formData.subject}` : 'Website Inquiry';
    const bodyText = 
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone || 'N/A'}\n` +
      `Company: ${formData.company || 'N/A'}\n\n` +
      `Message:\n${formData.message}`;

    const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;
    
    // Open default mail client prefilled with message directed to devansh.singhal@dsca.in
    window.location.href = mailtoUrl;

    setIsSubmitted(true);
  };

  return (
    <>
      <PageHero title="Contact Us" breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact', href: '/contact' }]} />
      
      <section className="py-16 md:py-24 bg-white">
        <div className="section-container">
          <div className="lg:grid lg:grid-cols-5 lg:gap-16">
          
          {/* Left column: Contact Information */}
          <div className="col-span-2 mb-12 lg:mb-0">
            <h2 className="font-heading text-2xl text-primary mb-6">Get In Touch</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-bg-alt rounded-sm flex items-center justify-center text-primary shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-text-secondary mb-1">Office Address</h3>
                  <p className="font-body text-text-primary">New Delhi</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-bg-alt rounded-sm flex items-center justify-center text-primary shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-text-secondary mb-1">Phone</h3>
                  <a href="tel:+918449317920" className="font-body text-text-primary hover:text-accent transition-colors">
                    (+91) 8449317920
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-bg-alt rounded-sm flex items-center justify-center text-primary shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-text-secondary mb-1">Email</h3>
                  <a href="mailto:devansh.singhal@dsca.in" className="font-body text-text-primary hover:text-accent transition-colors">
                    devansh.singhal@dsca.in
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-sm flex items-center justify-center text-[#25D366] shrink-0 border border-green-100">
                  <svg className="w-6 h-6 fill-current text-[#25D366]" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99 0-3.951-.5-5.688-1.448l-6.205 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-text-secondary mb-1">WhatsApp Messenger</h3>
                  <a 
                    href="https://wa.me/918449317920" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-body text-text-primary hover:text-accent transition-colors font-medium flex items-center gap-1.5"
                  >
                    <span>Chat on WhatsApp</span>
                    <ArrowRight className="w-4 h-4 text-[#25D366]" />
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-bg-alt rounded-sm flex items-center justify-center text-primary shrink-0">
                  <svg className="w-6 h-6 fill-current text-primary" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-text-secondary mb-1">LinkedIn</h3>
                  <a href="https://www.linkedin.com/in/ca-devansh-singhal-3ab650164/" target="_blank" rel="noopener noreferrer" className="font-body text-text-primary hover:text-accent transition-colors">
                    linkedin.com/in/ca-devansh-singhal-3ab650164
                  </a>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Action Banner */}
            <div className="mt-8 p-5 bg-emerald-50/90 border border-emerald-200 rounded-md">
              <h4 className="font-heading text-base text-emerald-950 font-semibold mb-1">Need Quick Assistance?</h4>
              <p className="text-xs text-emerald-800 mb-3 leading-relaxed">Connect directly with CA Devansh Singhal on WhatsApp for fast response.</p>
              <a 
                href="https://wa.me/918449317920" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold px-4 py-2.5 rounded shadow-sm transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99 0-3.951-.5-5.688-1.448l-6.205 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right column: Contact Form */}
          <div className="col-span-3">
            <h2 className="font-heading text-2xl text-primary mb-6">Send Us a Message</h2>
            
            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-sm p-8 flex flex-col items-center justify-center text-center min-h-[400px]">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="text-xl font-medium text-green-800 mb-2">Message Prepared &amp; Email App Opened!</h3>
                <p className="font-body text-green-700 max-w-md mb-6 leading-relaxed">
                  Your email client has been launched with your message pre-addressed to <strong>devansh.singhal@dsca.in</strong>.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a 
                    href={`mailto:devansh.singhal@dsca.in?subject=${encodeURIComponent(formData.subject ? `[Website Inquiry] ${formData.subject}` : 'Website Inquiry')}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'N/A'}\nCompany: ${formData.company || 'N/A'}\n\nMessage:\n${formData.message}`)}`}
                    className="bg-primary text-white text-sm font-medium px-5 py-2.5 rounded hover:bg-primary/90 transition-colors shadow-sm"
                  >
                    Click to Resend Email
                  </a>
                  <button 
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
                    }}
                    className="bg-white border border-gray-300 text-text-primary text-sm font-medium px-5 py-2.5 rounded hover:bg-gray-50 transition-colors shadow-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">Full Name *</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border bg-white text-text-primary focus:outline-none focus:border-primary transition-colors rounded-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">Email Address *</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border bg-white text-text-primary focus:outline-none focus:border-primary transition-colors rounded-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-text-secondary mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border bg-white text-text-primary focus:outline-none focus:border-primary transition-colors rounded-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-text-secondary mb-2">Company</label>
                    <input 
                      type="text" 
                      id="company" 
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border bg-white text-text-primary focus:outline-none focus:border-primary transition-colors rounded-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-text-secondary mb-2">Subject *</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border bg-white text-text-primary focus:outline-none focus:border-primary transition-colors rounded-sm"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">Message *</label>
                  <textarea 
                    id="message" 
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border bg-white text-text-primary focus:outline-none focus:border-primary transition-colors rounded-sm resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="group bg-accent text-primary px-10 py-4 font-medium hover:bg-white hover:-translate-y-1 transform transition-all duration-300 inline-flex items-center gap-2 rounded-sm shadow-md hover:shadow-lg w-full md:w-auto justify-center"
                >
                  <span>Send Message</span>
                  <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </div>
        </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-bg-alt">
        <div className="section-container">
          <h2 className="font-heading text-2xl text-primary mb-8 text-center md:text-left">Our Location</h2>
          <div className="w-full h-80 bg-white border border-border flex flex-col items-center justify-center text-text-muted rounded-sm">
            <MapPin className="w-12 h-12 mb-4 text-border" />
            <p className="font-body">Map will be displayed here</p>
          </div>
        </div>
      </section>
    </>
  );
}
