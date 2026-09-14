import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    quote: "Quality is not an act, it is a habit.",
    author: "Aristotle",
    image: "/images/hero/slide1.png"
  },
  {
    id: 2,
    quote: "It takes 20 years to build a reputation and five minutes to ruin it.",
    author: "Warren Buffett",
    image: "/images/hero/slide2.png"
  },
  {
    id: 3,
    quote: "An investment in knowledge pays the best interest.",
    author: "Benjamin Franklin",
    image: "/images/hero/slide3.png"
  },
  {
    id: 4,
    quote: "The price of greatness is responsibility.",
    author: "Winston Churchill",
    image: "/images/hero/slide4.png"
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  return (
    <section 
      className="relative w-full h-[60vh] md:h-[80vh] md:min-h-[600px] overflow-hidden bg-primary"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Testimonial Carousel"
    >
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full flex flex-col justify-center items-center px-4 sm:px-6 md:px-20 transition-opacity duration-1000 ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            aria-hidden={!isActive}
          >
            {/* Background Image without blur effect for premium feel */}
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] ease-out"
              style={{ 
                backgroundImage: `url(${slide.image})`, 
                transform: isActive ? 'scale(1.05)' : 'scale(1)'
              }}
            />
            {/* Elegant Dark Overlay for contrast and readability */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-primary/90 via-primary/75 to-primary/95" />
            
            {/* Geometric Decoration */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-white/[0.03] pointer-events-none select-none font-heading" 
              style={{ fontSize: 'clamp(200px, 30vw, 400px)', lineHeight: 1 }}
            >
              &ldquo;
            </div>
            
            {/* Content */}
            <div className="relative z-20 text-center max-w-5xl mx-auto flex flex-col items-center px-4 sm:px-6 md:px-12 w-full">
              <h2 
                className={`text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading leading-tight md:leading-tight w-full ${
                  isActive ? 'carousel-quote-active' : ''
                }`}
              >
                "{slide.quote}"
              </h2>
              
              <div className="w-16 sm:w-24 h-[1px] bg-accent/60 mx-auto mt-8 mb-6 sm:mt-10 sm:mb-8"></div>
              
              <p 
                className={`text-accent text-sm sm:text-base md:text-lg tracking-[0.2em] uppercase font-body font-medium ${
                  isActive ? 'carousel-author-active' : ''
                }`}
              >
                {slide.author}
              </p>
            </div>
          </div>
        );
      })}

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="hidden md:flex absolute left-4 lg:left-12 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-transparent hover:bg-white/10 text-white transition-all duration-300 border border-white/20 hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-accent"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 stroke-[1.5]" />
      </button>
      
      <button 
        onClick={nextSlide}
        className="hidden md:flex absolute right-4 lg:right-12 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-transparent hover:bg-white/10 text-white transition-all duration-300 border border-white/20 hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-accent"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 stroke-[1.5]" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary ${
              index === currentSlide ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60 w-2'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
