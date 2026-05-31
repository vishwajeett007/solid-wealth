import Image from "next/image";

export function ContactUsSection() {
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
              <form className="flex flex-col gap-10">
                {/* Full Name */}
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full border-b border-gray-300 pb-3 text-lg md:text-xl focus:outline-none focus:border-[#fe9800] transition-colors placeholder:text-gray-400 placeholder:italic font-medium text-gray-800 bg-transparent"
                  />
                </div>

                {/* Phone */}
                <div className="flex gap-6">
                  <input
                    type="text"
                    className="w-20 border-b border-gray-300 pb-3 text-lg md:text-xl focus:outline-none focus:border-[#fe9800] transition-colors font-medium text-gray-800 bg-transparent text-center"
                    placeholder="+91"
                  />
                  <input
                    type="tel"
                    placeholder="99XXXXXXXXXX"
                    className="flex-1 border-b border-gray-300 pb-3 text-lg md:text-xl focus:outline-none focus:border-[#fe9800] transition-colors placeholder:text-gray-400 placeholder:italic font-medium text-gray-800 bg-transparent"
                  />
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    placeholder="name@domain.com"
                    className="w-full border-b border-gray-300 pb-3 text-lg md:text-xl focus:outline-none focus:border-[#fe9800] transition-colors placeholder:text-gray-400 placeholder:italic font-medium text-gray-800 bg-transparent"
                  />
                </div>

                {/* Interest Tags */}
                <div className="flex flex-wrap gap-3 mt-4">
                  {["Mutual Funds", "Retirement", "Tax Planning", "Stocks", "Wealth Management", "Insurance", "Other"].map((tag) => (
                    <label key={tag} className="cursor-pointer">
                      <input type="checkbox" className="peer sr-only" />
                      <div className="px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-sm font-medium text-gray-500 hover:border-[#fe9800]/50 hover:bg-orange-50 peer-checked:bg-[#fe9800] peer-checked:text-white peer-checked:border-[#fe9800] transition-all">
                        {tag}
                      </div>
                    </label>
                  ))}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="mt-6 bg-[#fe9800] hover:bg-[#e58900] text-white font-bold text-lg h-14 rounded-full w-full max-w-[220px] transition-all shadow-[0_8px_20px_rgba(254,152,0,0.3)] hover:shadow-[0_8px_25px_rgba(254,152,0,0.45)]"
                >
                  Get Started
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
