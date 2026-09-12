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
                  <p className="font-body text-text-primary">123 Business District, Financial Tower, New Delhi - 110001</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-bg-alt rounded-sm flex items-center justify-center text-primary shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-text-secondary mb-1">Phone</h3>
                  <p className="font-body text-text-primary">+91 11 XXXX XXXX</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-bg-alt rounded-sm flex items-center justify-center text-primary shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-text-secondary mb-1">Email</h3>
                  <p className="font-body text-text-primary">info@devanshsinghal.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-bg-alt rounded-sm flex items-center justify-center text-primary shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-text-secondary mb-1">Working Hours</h3>
                  <p className="font-body text-text-primary">Mon - Fri: 9:30 AM - 6:00 PM</p>
                  <p className="font-body text-text-primary">Saturday: 10:00 AM - 2:00 PM</p>
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
