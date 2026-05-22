import { Mail, Phone, MapPin, Send } from "lucide-react";

export function CTASection() {
  return (
    <section id="contact" className="w-full bg-white py-20 px-5 md:px-8 lg:px-20 border-t border-gray-100">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left Column: Form */}
        <div>
          <span className="inline-block px-3 py-1 bg-wealth-accent text-white text-sm font-bold tracking-wider uppercase rounded-md mb-6">
            Contact Us
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-wealth-primary mb-5">
            04. Get in Touch with Us
          </h2>
          <p className="text-wealth-secondary text-[17px] md:text-lg mb-8 leading-relaxed max-w-[500px]">
            Have questions about CAN registration or our Risk Analyzer? Our team
            is here to help you streamline your investment journey. Reach out
            today.
          </p>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-wealth-primary">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3.5 rounded-lg border border-gray-200 focus:border-[#5d5fef] focus:ring-1 focus:ring-[#5d5fef] outline-none transition-all placeholder:text-gray-400 bg-white shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-wealth-primary">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-3.5 rounded-lg border border-gray-200 focus:border-[#5d5fef] focus:ring-1 focus:ring-[#5d5fef] outline-none transition-all placeholder:text-gray-400 bg-white shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-wealth-primary">
                Your Message
              </label>
              <textarea
                placeholder="How can we help you?"
                rows={5}
                className="w-full px-4 py-3.5 rounded-lg border border-gray-200 focus:border-[#5d5fef] focus:ring-1 focus:ring-[#5d5fef] outline-none transition-all placeholder:text-gray-400 bg-white shadow-sm resize-none"
              ></textarea>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center px-8 py-4 bg-wealth-primary text-white font-bold rounded-full hover:bg-[#4f51cc] transition-colors shadow-md"
            >
              Send Message <Send className="ml-2 w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right Column: Details */}
        <div className="lg:pl-8 flex flex-col justify-center">
          <h3 className="text-xl font-bold text-wealth-primary mb-6">
            Contact Details
          </h3>

          <div className="space-y-6 mb-12">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 bg-[#f4f5fc] rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-[#5d5fef]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-wealth-primary mb-1">
                  Email us at
                </h4>
                <p className="text-[#64748b]">support@wealthwise.com</p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 bg-[#f4f5fc] rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-[#5d5fef]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-wealth-primary mb-1">
                  Call our support
                </h4>
                <p className="text-[#64748b]">+1 (555) 000-1234</p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 bg-[#f4f5fc] rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[#5d5fef]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-wealth-primary mb-1">
                  Visit our office
                </h4>
                <p className="text-[#64748b] leading-relaxed">
                  123 Financial District, Tech Plaza
                  <br />
                  San Francisco, CA 94105
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-wealth-primary mb-6">
            Follow Our Journey
          </h3>
          <div className="flex items-center gap-4 mb-8">
            <a
              href="#"
              className="w-10 h-10 bg-[#f8fafc] border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-[#5d5fef] hover:border-[#5d5fef] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-[#f8fafc] border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-[#5d5fef] hover:border-[#5d5fef] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-[#f8fafc] border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-[#5d5fef] hover:border-[#5d5fef] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-[#f8fafc] border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-[#5d5fef] hover:border-[#5d5fef] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>

          {/* Decorative Box
          <div className="relative w-full h-40 bg-[#f4f5fc] rounded-xl overflow-hidden flex items-center justify-center mt-2 border border-[#e8ebf8]">
            <div className="absolute top-[-40px] right-[-20px] w-48 h-48 border border-[#e8ebf8] rounded-full opacity-70"></div>
            <div className="absolute top-[20px] left-[-30px] w-64 h-64 border border-[#e8ebf8] rounded-full opacity-70"></div>
            <p className="relative z-10 text-[#5d5fef] font-medium italic tracking-wide">
              "Simplifying wealth for everyone"
            </p>
          </div> */}
        </div>
      </div>
    </section>
  );
}
