"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export function ContactUsSection() {
  const [name, setName] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("+91");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Lock body scroll when success modal is open
  useEffect(() => {
    if (showSuccessModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showSuccessModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://solidwealthindia.com";
      
      const requestBody: any = {
        name: name.trim(),
        email: email.trim()
      };

      if (phone.trim()) {
        requestBody.mobile_number = `${phonePrefix.trim()}${phone.trim()}`.trim();
      }
      
      const response = await fetch(`${baseUrl}/api/subscribers/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        setShowSuccessModal(true);
      } else {
        const errData = await response.json().catch(() => ({}));
        alert(errData.detail || "Failed to subscribe. Please check your inputs and try again.");
      }
    } catch (err) {
      console.error("Error subscribing:", err);
      alert("Network error. Please check your internet connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setShowSuccessModal(false);
    // Reset form fields
    setName("");
    setPhone("");
    setPhonePrefix("+91");
    setEmail("");
    setInterests([]);
  };

  return (
    <section id="contact" className="w-full bg-[#FFFDF4] py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="w-full mb-8 flex justify-start">
          <span className="inline-flex items-center px-6 py-2 text-sm font-semibold uppercase tracking-widest rounded-full bg-[#FFEAC9] text-[#B06D1A]">
            CONTACT US
          </span>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-16 lg:gap-12 xl:gap-20">

          {/* Left Side Content */}
          <div className="flex-1 w-full max-w-2xl lg:max-w-none flex flex-col justify-start">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-[54px] xl:text-[64px] font-black text-[#0f1a2c] leading-[1.05] tracking-tight mb-4">
                <span className="whitespace-nowrap">Let&apos;s Make <span className="text-[#fe9800]">Financial</span></span><br />
                <span className="text-[#fe9800]">Goals</span> Reality.
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-snug mb-12 max-w-md lg:max-w-lg font-medium">
                Tell us your financial goals and we&apos;ll help create a strategy designed for long-term growth and security.
              </p>
              <div className="relative w-full max-w-[500px] aspect-square -mt-4">
                <Image
                  src="/bro.svg"
                  alt="Financial Planning"
                  fill
                  className="object-contain object-left-top"
                />
              </div>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="flex-1 w-full max-w-2xl lg:max-w-none h-full lg:min-h-full py-4">
            <div className="bg-white rounded-[32px] p-8 sm:p-12 shadow-[0_0_60px_rgba(254,152,0,0.25)] relative transition-shadow hover:shadow-[0_0_80px_rgba(254,152,0,0.35)] h-full flex flex-col justify-center min-h-[720px]">
              <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                {/* Full Name */}
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-b border-gray-300 pb-3 text-lg md:text-xl focus:outline-none focus:border-[#fe9800] transition-colors placeholder:text-gray-400 placeholder:italic font-medium text-gray-800 bg-transparent"
                  />
                </div>

                {/* Phone */}
                <div className="flex gap-6">
                  <input
                    type="text"
                    value={phonePrefix}
                    onChange={(e) => setPhonePrefix(e.target.value)}
                    className="w-20 border-b border-gray-300 pb-3 text-lg md:text-xl focus:outline-none focus:border-[#fe9800] transition-colors font-medium text-gray-800 bg-transparent text-center"
                    placeholder="+91"
                  />
                  <input
                    type="tel"
                    placeholder="99XXXXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 border-b border-gray-300 pb-3 text-lg md:text-xl focus:outline-none focus:border-[#fe9800] transition-colors placeholder:text-gray-400 placeholder:italic font-medium text-gray-800 bg-transparent"
                  />
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    placeholder="name@domain.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-b border-gray-300 pb-3 text-lg md:text-xl focus:outline-none focus:border-[#fe9800] transition-colors placeholder:text-gray-400 placeholder:italic font-medium text-gray-800 bg-transparent"
                  />
                </div>

                {/* Interest Tags */}
                <div className="flex flex-wrap gap-3 mt-4">
                  {["Mutual Funds", "Retirement", "Tax Planning", "Stocks", "Wealth Management", "Insurance", "Other"].map((tag) => (
                    <label key={tag} className="cursor-pointer">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={interests.includes(tag)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setInterests([...interests, tag]);
                          } else {
                            setInterests(interests.filter((i) => i !== tag));
                          }
                        }}
                      />
                      <div className="px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-sm font-medium text-gray-500 hover:border-[#fe9800]/50 hover:bg-orange-50 peer-checked:bg-[#fe9800] peer-checked:text-white peer-checked:border-[#fe9800] transition-all">
                        {tag}
                      </div>
                    </label>
                  ))}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-6 bg-[#fe9800] hover:bg-[#e58900] disabled:bg-gray-400 text-white font-bold text-lg h-14 rounded-full w-full max-w-[220px] transition-all shadow-[0_8px_20px_rgba(254,152,0,0.3)] hover:shadow-[0_8px_25px_rgba(254,152,0,0.45)] flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Get Started"
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <>
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes modalFadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes modalZoomIn {
              from { transform: scale(0.95); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
            }
            .animate-modal-fade {
              animation: modalFadeIn 0.25s ease-out forwards;
            }
            .animate-modal-zoom {
              animation: modalZoomIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            }
          `}} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-modal-fade">
            <div className="bg-[#FFFDF4] rounded-[32px] w-full max-w-[480px] p-8 md:p-10 shadow-2xl flex flex-col items-center text-center animate-modal-zoom relative border border-gray-100">
              {/* Image Illustration */}
              <div className="relative w-full h-[220px] mb-6">
                <Image
                  src="/confirm.svg"
                  alt="Subscription Confirmed"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Thank You Header */}
              <h3 className="text-[#0f1a2c] font-black text-3xl leading-tight mb-3">
                Thank You for <br />
                <span className="text-[#fe9800]">Subscribing!</span>
              </h3>

              {/* Description */}
              <p className="text-gray-600 font-medium text-sm md:text-base mb-8 max-w-sm">
                Welcome to the Solid Wealth community. <br />
                You&apos;ll now receive expert market insights, investment updates, and wealth-building strategies directly in your inbox.
              </p>

              {/* Action Buttons */}
              <div className="flex gap-4 w-full">
                <a
                  href="https://mail.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-full transition-colors text-sm"
                >
                  View Inbox
                </a>
                <button
                  onClick={handleClose}
                  className="flex-1 h-12 bg-[#1a2332] hover:bg-[#121924] text-white font-bold rounded-full transition-colors text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
