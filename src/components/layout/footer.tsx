import Link from "next/link";
import Image from "next/image";
import { FaPlay, FaLinkedinIn, FaFacebookF, FaInstagram, FaEnvelope } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="w-full bg-[#FFFDF4] px-3 sm:px-6 lg:px-8 pb-4 md:pb-6">
      <div className="mx-auto max-w-[95%] bg-[#0f172a] rounded-xl p-5 md:p-6 lg:p-8 flex flex-col gap-6 md:gap-8 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">

          {/* Left Column (Logo, Description, Socials, Button) */}
          <div className="md:col-span-8 lg:col-span-9 flex flex-col items-start gap-4">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 mb-1">
              <Image
                src="/logo1.png"
                alt="Solid Wealth Logo"
                width={44}
                height={44}
                className="object-contain"
              />
              <span className="text-white font-bold text-3xl md:text-4xl leading-tight">
                Solid<br />Wealth
              </span>
            </Link>

            {/* Description */}
            <p className="text-[#94a3b8] text-lg md:text-xl max-w-[700px] leading-relaxed">
              Solid Wealth is a trusted financial advisory firm dedicated to helping individuals and
              businesses grow, protect, and preserve their wealth through strategic investment solutions.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-1">
              {[
                { icon: FaPlay, label: "Play" },
                { icon: FaLinkedinIn, label: "LinkedIn" },
                { icon: FaFacebookF, label: "Facebook" },
                { icon: FaInstagram, label: "Instagram" },
                { icon: FaEnvelope, label: "Email" }
              ].map((Social, idx) => (
                <a
                  key={idx}
                  href="#"
                  aria-label={Social.label}
                  className="w-12 h-12 bg-[#fe9800] rounded-xl flex items-center justify-center text-[#0f172a] hover:bg-orange-400 hover:scale-105 transition-all"
                >
                  <Social.icon size={22} />
                </a>
              ))}
            </div>

            {/* Partner Button */}
            <button className="bg-white text-[#0f172a] font-bold py-3.5 px-10 rounded-xl w-max mt-2 text-lg md:text-xl hover:bg-gray-100 transition-colors shadow-md">
              The SAAS partner
            </button>
          </div>

          {/* Right Column (Links) */}
          <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-4">
            <h3 className="text-[#fe9800] font-bold text-2xl md:text-3xl mb-1">Links</h3>
            <div className="flex flex-col gap-3 text-lg md:text-xl">
              {["Home", "Research", "Calculators", "Mutual Funds", "Blogs"].map((link) => (
                <Link
                  key={link}
                  href="#"
                  className="text-gray-300 hover:text-white font-medium transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-slate-700/50 pt-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-base md:text-lg text-slate-500 font-medium">
          <p>
            Solidwealth <span className="text-blue-500 ml-1">&copy;</span> 2026
          </p>
          <p>All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
