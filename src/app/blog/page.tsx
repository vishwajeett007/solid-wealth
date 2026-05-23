import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export default function BlogPage() {
  return (
    <div className="w-full bg-white font-sans text-[#1a1a1a]">
      {/* 1. Hero Banner */}
      <section className="relative w-full h-[500px] flex items-center justify-center bg-[#0a0a0a] overflow-hidden">
        {/* Glow effect / Background image */}
        <div className="absolute inset-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2874&auto=format&fit=crop"
            alt="Hero background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 text-center max-w-3xl px-5">
          <span className="inline-block px-3 py-1 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full mb-6">
            Special Report
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
            The Future of
            <br />
            Decentered Intelligence
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
            Exploring how artificial agency is reshaping the way we think about
            creativity, autonomy, and the human spirit.
          </p>
          <Link
            href="#"
            className="inline-flex items-center justify-center px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            Read the Essay <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-[1280px] mx-auto px-5 md:px-8 py-16">
        {/* 2. Editor's Pick */}
        <div className="mb-20">
          <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-6 flex items-center gap-2">
            <span className="w-1 h-4 bg-black rounded-full"></span> Editor's
            Pick
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop"
                alt="Editor's pick"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 text-xs text-gray-500 font-semibold mb-4 uppercase tracking-wider">
                <span>May 12, 2026</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span>12 Min Read</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                Quantum Leap: The Silent Revolution in Computing
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                What happens when binary logic is no longer the bottleneck of
                progress? We delve into the breakthrough architectures defining
                the next decade.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 relative rounded-full overflow-hidden border border-gray-100 shadow-sm">
                  <Image
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2940&auto=format&fit=crop"
                    alt="Author"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="font-semibold text-sm">Marcus Thorne</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Recent Perspectives & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Content (8 cols) */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-8">
              <h3 className="text-2xl font-bold">Recent Perspectives</h3>
              <div className="flex items-center gap-4 text-sm font-semibold">
                <button className="text-black border-b-2 border-black pb-4 -mb-[18px]">
                  Latest
                </button>
                <button className="text-gray-400 hover:text-gray-800 pb-4 -mb-[18px]">
                  Trending
                </button>
              </div>
            </div>

            <div className="space-y-10">
              {/* Post 1 */}
              <article className="flex flex-col sm:flex-row gap-6 group">
                <div className="relative w-full sm:w-[280px] h-[180px] rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop"
                    alt="Post"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-xs text-gray-500 font-semibold mb-3 uppercase tracking-wider">
                    <span className="text-black">Design</span>
                    <span>May 10, 2026</span>
                  </div>
                  <h4 className="text-xl font-bold mb-3 group-hover:text-black transition-colors">
                    The Architecture of Meaningful Suburbia
                  </h4>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    Why modern urban planning is failing the social contract and
                    how modular design could save it.
                  </p>
                  <Link
                    href="#"
                    className="text-xs font-bold text-black uppercase tracking-wider flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Read Article <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>

              {/* Post 2 */}
              <article className="flex flex-col sm:flex-row gap-6 group">
                <div className="relative w-full sm:w-[280px] h-[180px] rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2940&auto=format&fit=crop"
                    alt="Post"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-xs text-gray-500 font-semibold mb-3 uppercase tracking-wider">
                    <span className="text-black">Technology</span>
                    <span>May 08, 2026</span>
                  </div>
                  <h4 className="text-xl font-bold mb-3 group-hover:text-black transition-colors">
                    Decentralized Governance: Dreams and Realities
                  </h4>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    A critical examination of the current state of DAOs and why
                    human coordination remains fundamentally difficult.
                  </p>
                  <Link
                    href="#"
                    className="text-xs font-bold text-black uppercase tracking-wider flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Read Article <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>

              {/* Post 3 */}
              <article className="flex flex-col sm:flex-row gap-6 group">
                <div className="relative w-full sm:w-[280px] h-[180px] rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2940&auto=format&fit=crop"
                    alt="Post"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-xs text-gray-500 font-semibold mb-3 uppercase tracking-wider">
                    <span className="text-black">Philosophy</span>
                    <span>May 05, 2026</span>
                  </div>
                  <h4 className="text-xl font-bold mb-3 group-hover:text-black transition-colors">
                    The Aesthetics of Loneliness in Digital Spaces
                  </h4>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    How UI design unintentionally mirrors the isolation of
                    modern life, and the movement pushing against it.
                  </p>
                  <Link
                    href="#"
                    className="text-xs font-bold text-black uppercase tracking-wider flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Read Article <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            </div>

            {/* Pagination */}
            <div className="mt-14 flex items-center justify-center gap-2">
              <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black">
                &lt;
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full border border-black text-black font-bold">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black">
                3
              </button>
              <span className="text-gray-400">...</span>
              <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black">
                12
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black">
                &gt;
              </button>
            </div>
          </div>

          {/* Right Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-12">
            {/* Author Card */}
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-6">
                From the Editor
              </h4>
              <div className="w-16 h-16 relative rounded-full overflow-hidden mb-4 shadow-md">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2776&auto=format&fit=crop"
                  alt="Editor"
                  fill
                  className="object-cover"
                />
              </div>
              <h5 className="text-lg font-bold mb-2">Elena Vance</h5>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Exploring the intersection of ethics, technology, and aesthetic
                philosophy for over 15 years.
              </p>
              <div className="flex gap-4">
                {/* Social icons placeholders */}
                <span className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-black hover:border-black cursor-pointer transition-colors text-xs font-bold">
                  In
                </span>
                <span className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-black hover:border-black cursor-pointer transition-colors text-xs font-bold">
                  Tw
                </span>
              </div>
            </div>

            {/* Recent Thinking */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-6 border-b border-gray-200 pb-3">
                Recent Thinking
              </h4>
              <ul className="space-y-5">
                <li>
                  <span className="block text-[10px] text-black font-bold uppercase tracking-wider mb-1">
                    Culture
                  </span>
                  <Link
                    href="#"
                    className="font-semibold text-gray-800 hover:text-black transition-colors"
                  >
                    The New Minimalism
                  </Link>
                </li>
                <li>
                  <span className="block text-[10px] text-black font-bold uppercase tracking-wider mb-1">
                    Technology
                  </span>
                  <Link
                    href="#"
                    className="font-semibold text-gray-800 hover:text-black transition-colors"
                  >
                    Web4 Speculations
                  </Link>
                </li>
                <li>
                  <span className="block text-[10px] text-black font-bold uppercase tracking-wider mb-1">
                    Philosophy
                  </span>
                  <Link
                    href="#"
                    className="font-semibold text-gray-800 hover:text-black transition-colors"
                  >
                    AI and Ethics
                  </Link>
                </li>
              </ul>
            </div>

            {/* Popular Topics */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-6 border-b border-gray-200 pb-3">
                Popular Topics
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:border-black cursor-pointer transition-colors group">
                  <span className="text-sm font-medium text-gray-600 group-hover:text-black">
                    Artificial Intelligence
                  </span>
                  <span className="text-xs font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded group-hover:bg-gray-50 group-hover:text-black">
                    24
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:border-black cursor-pointer transition-colors group">
                  <span className="text-sm font-medium text-gray-600 group-hover:text-black">
                    Urban Architecture
                  </span>
                  <span className="text-xs font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded group-hover:bg-gray-50 group-hover:text-black">
                    18
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:border-black cursor-pointer transition-colors group">
                  <span className="text-sm font-medium text-gray-600 group-hover:text-black">
                    Ethical Philosophy
                  </span>
                  <span className="text-xs font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded group-hover:bg-gray-50 group-hover:text-black">
                    12
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:border-black cursor-pointer transition-colors group">
                  <span className="text-sm font-medium text-gray-600 group-hover:text-black">
                    Digital Culture
                  </span>
                  <span className="text-xs font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded group-hover:bg-gray-50 group-hover:text-black">
                    09
                  </span>
                </div>
              </div>
            </div>

            {/* Ad / Workshop Promo */}
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 text-center">
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-black mb-3">
                Ad - Deep Dive Workshop
              </span>
              <h4 className="text-lg font-bold mb-6 text-gray-900">
                Join our next live virtual session on "The Ethics of Generative
                Models."
              </h4>
              <Link
                href="#"
                className="inline-block px-6 py-3 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors w-full"
              >
                Reserve Seat
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* 4. Weekly Perspective Newsletter */}
      <section className="w-full bg-orange-50/80 py-24 px-5 border-t border-gray-200 mt-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-100">
            <Mail className="w-5 h-5 text-black" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Weekly Perspective</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Curated long-form essays and industry insights delivered to your
            inbox every Sunday morning. No noise, just perspective.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4">
            <input
              type="email"
              placeholder="you@email.com"
              className="flex-1 px-5 py-3.5 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none shadow-sm"
              required
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-colors shadow-md whitespace-nowrap"
            >
              Join 50k Readers
            </button>
          </form>
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
            Private and secure. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
}
