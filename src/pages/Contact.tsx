import React, { useState, useEffect } from 'react';
import PageHero from '../components/PageHero';
import { MapPin, Phone, Mail, Clock, ArrowRight, CheckCircle } from 'lucide-react';

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
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
      });
    }, 5000);
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
                  <p className="font-body text-text-primary">(+91) 8449317920</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-bg-alt rounded-sm flex items-center justify-center text-primary shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-text-secondary mb-1">Email</h3>
                  <p className="font-body text-text-primary">devansh.singhal@dsca.in</p>
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
          </div>

          {/* Right column: Contact Form */}
          <div className="col-span-3">
            <h2 className="font-heading text-2xl text-primary mb-6">Send Us a Message</h2>
            
            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-sm p-8 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="text-xl font-medium text-green-800 mb-2">Message Sent Successfully!</h3>
                <p className="font-body text-green-700">Thank you for your message. We will get back to you shortly.</p>
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
