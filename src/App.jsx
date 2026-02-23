import React, { useState, useEffect, useMemo } from 'react';
import { 
  Waves, 
  Compass, 
  ShieldCheck, 
  Camera, 
  ChevronDown, 
  Droplets, 
  Zap, 
  Activity,
  ArrowRight,
  Info,
  User,
  CheckCircle2,
  Lock,
  ArrowLeft
} from 'lucide-react';

// --- Custom SVG Components ---
const RebreatherIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <path d="M7 2v4M17 2v4M4 6h16v12a4 4 0 01-4 4H8a4 4 0 01-4-4V6z" />
    <path d="M9 10h6M9 14h6" strokeLinecap="round" />
    <circle cx="12" cy="18" r="1.5" fill="currentColor" />
  </svg>
);

const App = () => {
  const [scrollDepth, setScrollDepth] = useState(0);
  const [diveLevel, setDiveLevel] = useState('touring'); 
  const [activeStep, setActiveStep] = useState(1);
  const [funnelModal, setFunnelModal] = useState({ isOpen: false, type: null });

  // --- Depth Gauge Logic ---
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.pageYOffset;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (winScroll / height) * 11000;
      setScrollDepth(Math.round(scrolled));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const themeColors = useMemo(() => {
    return diveLevel === 'technical' 
      ? { accent: 'text-[#EE9B00]', border: 'border-[#EE9B00]', bg: 'bg-[#EE9B00]', glow: 'shadow-[#EE9B00]/20', lightBg: 'bg-[#EE9B00]/10' }
      : { accent: 'text-[#0A9396]', border: 'border-[#0A9396]', bg: 'bg-[#0A9396]', glow: 'shadow-[#0A9396]/20', lightBg: 'bg-[#0A9396]/10' };
  }, [diveLevel]);

  // --- Funnel Modal Component ---
  const FunnelOverlay = () => {
    if (!funnelModal.isOpen) return null;
    return (
      <div className="fixed inset-0 z-[100] bg-[#001219]/95 backdrop-blur-xl flex items-center justify-center p-6 overflow-y-auto">
        <div className="max-w-2xl w-full bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 relative shadow-2xl">
          <button 
            onClick={() => setFunnelModal({ isOpen: false, type: null })}
            className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
          >
            <Lock size={20} />
          </button>

          {funnelModal.type === 'briefing' ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <span className="text-[#0A9396] font-mono text-xs tracking-widest uppercase mb-4 block">The Abyssal Standard</span>
              <h2 className="text-4xl font-bold mb-6 italic">Where human curiosity meets professional precision.</h2>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p>We don't just dive; we explore. Every expedition is built on three core pillars: Safety, Discovery, and Stewardship.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <h4 className="text-white font-bold mb-1">Human Focus</h4>
                    <p className="text-xs text-gray-400">Our guides are world-class mentors who prioritize your psychological and physical comfort.</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <h4 className="text-white font-bold mb-1">Tech Excellence</h4>
                    <p className="text-xs text-gray-400">Industry-leading redundancy protocols ensuring you stay focused on the wonder of the blue.</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => { setFunnelModal({ isOpen: false }); document.getElementById('portal').scrollIntoView({behavior: 'smooth'}); }}
                className="mt-10 w-full py-4 bg-[#0A9396] text-[#001219] font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#94D2BD] transition-all"
              >
                Join the Mission <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <div className="text-center animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 bg-[#0A9396]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Waves className="text-[#0A9396]" />
              </div>
              <h2 className="text-3xl font-bold mb-4 uppercase italic">Begin Your Descent</h2>
              <p className="text-gray-400 mb-8">Choose your immersion level to tailor your expedition profile.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => { setDiveLevel('touring'); setFunnelModal({ isOpen: false }); document.getElementById('portal').scrollIntoView({behavior: 'smooth'}); }}
                  className="p-6 border border-[#0A9396]/30 rounded-2xl hover:bg-[#0A9396]/10 text-left transition-all"
                >
                  <h4 className="font-bold text-[#0A9396]">Surface Expedition</h4>
                  <p className="text-xs text-gray-400 mt-1">Snorkeling, whales, and coral gardens (0-20m).</p>
                </button>
                <button 
                  onClick={() => { setDiveLevel('technical'); setFunnelModal({ isOpen: false }); document.getElementById('portal').scrollIntoView({behavior: 'smooth'}); }}
                  className="p-6 border border-[#EE9B00]/30 rounded-2xl hover:bg-[#EE9B00]/10 text-left transition-all"
                >
                  <h4 className="font-bold text-[#EE9B00]">Deep Immersion</h4>
                  <p className="text-xs text-gray-400 mt-1">Wrecks, caves, and decompression diving (40m+).</p>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#001219] text-gray-100 font-sans selection:bg-[#0A9396] selection:text-white">
      <FunnelOverlay />
      
      {/* --- MODERN STICKY NAV --- */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-[#001219]/40 backdrop-blur-xl border border-white/5 rounded-2xl p-4 pointer-events-auto shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#0A9396] rounded-lg flex items-center justify-center rotate-3">
              <Waves className="text-[#001219]" size={18} />
            </div>
            <span className="font-bold tracking-tighter text-lg uppercase italic">Abyssal</span>
          </div>

          <div className="hidden lg:flex items-center gap-10 text-xs font-bold tracking-widest uppercase text-gray-400">
            <a href="#tours" className="hover:text-white transition-colors">Experiences</a>
            <a href="#technical" className="hover:text-white transition-colors">The Deep</a>
            <a href="#safety" className="hover:text-white transition-colors">Safety</a>
            <button 
              onClick={() => document.getElementById('portal').scrollIntoView({behavior: 'smooth'})}
              className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition-all text-[10px]"
            >
              Book Expedition
            </button>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[8px] text-gray-500 font-mono tracking-widest uppercase">Depth Gauge</span>
            <div className="flex items-center gap-2">
              <div className="h-1 w-20 bg-gray-800 rounded-full overflow-hidden hidden sm:block">
                <div className="h-full bg-[#0A9396] transition-all duration-300" style={{ width: `${(scrollDepth/11000)*100}%` }}></div>
              </div>
              <span className="text-lg font-mono text-[#0A9396] font-bold tabular-nums">
                {scrollDepth.toLocaleString()}<span className="text-[10px] ml-0.5 opacity-60">M</span>
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#005F73]/10 to-[#001219]">
          <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] bg-[#0A9396]/10 blur-[120px] rounded-full animate-pulse"></div>
          <div className="absolute bottom-[20%] right-[10%] w-[30vw] h-[30vw] bg-[#005F73]/10 blur-[100px] rounded-full"></div>
        </div>
        
        <div className="z-10 text-center px-4 max-w-5xl">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0A9396] animate-pulse"></div>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">Current Season: Epipelagic Migration</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-black tracking-tight mb-8 leading-[0.9] italic">
            BEYOND <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005F73] via-[#0A9396] to-white">THE BLUE.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
            From sunlight to silence. Experience the ocean through the eyes of world-class technical explorers.
          </p>
          <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
            <button 
              onClick={() => setFunnelModal({ isOpen: true, type: 'descent' })}
              className="px-12 py-5 bg-[#0A9396] text-[#001219] font-black uppercase tracking-widest hover:scale-105 transition-all rounded-2xl flex items-center gap-3 shadow-2xl shadow-[#0A9396]/20"
            >
              Begin Descent <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => setFunnelModal({ isOpen: true, type: 'briefing' })}
              className="px-12 py-5 border-2 border-white/10 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all rounded-2xl"
            >
              The Briefing
            </button>
          </div>
        </div>

        <div className="absolute bottom-12 flex flex-col items-center gap-4 opacity-40">
          <div className="h-12 w-[1px] bg-gradient-to-b from-transparent to-white animate-bounce"></div>
          <span className="text-[10px] font-bold tracking-widest uppercase">Deep Discoveries Await</span>
        </div>
      </section>

      {/* --- THE DESCENT (EXPERIENCES) --- */}
      <section id="tours" className="py-32 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <div className="max-w-xl">
              <span className="text-[#0A9396] font-bold text-xs tracking-widest uppercase mb-4 block">Immersive Explorations</span>
              <h2 className="text-5xl md:text-6xl font-black italic uppercase leading-none">The Human <br />Descent</h2>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed max-w-sm border-l border-white/10 pl-6">
              A curated selection of photic-zone expeditions for the curious observer and the veteran diver alike.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { title: "Ocean Giants", label: "Whale Encounters", img: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&q=80&w=800" },
              { title: "Biolume Night", label: "Nocturnal Drift", img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800" },
              { title: "Coral Cathedral", label: "Reef Architecture", img: "https://images.unsplash.com/photo-1544552866-d3ed42536cfd?auto=format&fit=crop&q=80&w=800" }
            ].map((tour, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-[3rem] aspect-[4/5] cursor-pointer shadow-2xl">
                <img src={tour.img} alt={tour.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001219] via-[#001219]/20 to-transparent"></div>
                <div className="absolute bottom-0 p-10 w-full">
                  <span className="bg-white/10 backdrop-blur-md text-[10px] px-3 py-1 rounded-full text-white font-bold mb-3 inline-block uppercase tracking-widest">{tour.label}</span>
                  <h3 className="text-3xl font-black mb-4 uppercase italic tracking-tighter">{tour.title}</h3>
                  <div className="flex items-center gap-2 text-[#0A9396] font-bold text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    View Details <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MODERN ABYSS SECTION --- */}
      <section id="technical" className="py-32 px-6 md:px-20 bg-black/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1 relative rounded-[4rem] overflow-hidden group shadow-2xl shadow-[#EE9B00]/10">
            <img 
              src="https://images.unsplash.com/photo-1544551763-8dd44758c2dd?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover grayscale-0 brightness-75 group-hover:brightness-100 transition-all duration-700" 
              alt="Technical Diver" 
            />
            <div className="absolute top-8 right-8 bg-[#EE9B00] text-black px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">Master Instructor Present</div>
          </div>

          <div className="order-1 lg:order-2 space-y-8">
            <div className="inline-flex bg-[#EE9B00]/20 text-[#EE9B00] px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest italic">
              Elite Tier Exploration
            </div>
            <h2 className="text-6xl font-black italic uppercase leading-none tracking-tighter text-white">The Hadal <br />Expedition</h2>
            <p className="text-gray-400 text-lg leading-relaxed font-medium italic">
              "In the deep, time slows down. Every breath is a calculated decision, every meter a discovery of the self."
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Technical Prep', value: '48H Session' },
                { label: 'Decompression', value: 'Clinical Grade' },
                { label: 'Max Capacity', value: '3 Divers Only' },
                { label: 'Certification', value: 'IANTD / GUE' },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl group hover:border-[#EE9B00]/30 transition-all">
                  <span className="text-[10px] text-gray-500 font-bold uppercase block mb-1">{item.label}</span>
                  <span className="text-xl font-black text-white group-hover:text-[#EE9B00] transition-colors uppercase">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- THE INITIATION PORTAL (MODERN BOOKING) --- */}
      <section id="portal" className="py-40 px-6 md:px-20">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-5xl font-black italic uppercase mb-6">The Initiation</h2>
          <p className="text-gray-400 font-medium max-w-lg mx-auto">Select your immersion profile to begin the onboarding sequence with our expedition coordinators.</p>
        </div>

        <div className={`max-w-4xl mx-auto bg-white/[0.02] border ${themeColors.border} rounded-[4rem] p-10 md:p-16 transition-all duration-700 shadow-2xl ${themeColors.glow}`}>
          
          {/* Progress Indicator */}
          <div className="flex justify-between items-center mb-16 relative">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2 z-0"></div>
            {[1, 2, 3].map((step) => (
              <div 
                key={step} 
                className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-500 border-2 ${activeStep >= step ? `${themeColors.bg} border-transparent text-[#001219]` : 'bg-[#001219] border-white/10 text-gray-500'}`}
              >
                {activeStep > step ? <CheckCircle2 size={20} /> : step}
              </div>
            ))}
          </div>

          {activeStep === 1 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-10 duration-500">
              <h3 className="text-2xl font-bold italic uppercase text-center">Choose Your Environment</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button 
                  onClick={() => setDiveLevel('touring')}
                  className={`p-8 rounded-[3rem] border-2 transition-all text-left group ${diveLevel === 'touring' ? 'border-[#0A9396] bg-[#0A9396]/10' : 'border-white/5 hover:border-white/20 bg-white/5'}`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors ${diveLevel === 'touring' ? 'bg-[#0A9396] text-[#001219]' : 'bg-white/10 text-white'}`}>
                    <User size={24} />
                  </div>
                  <h4 className="text-xl font-black uppercase mb-2 italic">Surface Guest</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">Perfect for photography, family expeditions, and marine life observation. No advanced certs required.</p>
                </button>
                <button 
                  onClick={() => setDiveLevel('technical')}
                  className={`p-8 rounded-[3rem] border-2 transition-all text-left group ${diveLevel === 'technical' ? 'border-[#EE9B00] bg-[#EE9B00]/10' : 'border-white/5 hover:border-white/20 bg-white/5'}`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors ${diveLevel === 'technical' ? 'bg-[#EE9B00] text-[#001219]' : 'bg-white/10 text-white'}`}>
                    <Activity size={24} />
                  </div>
                  <h4 className="text-xl font-black uppercase mb-2 italic">Deep Operator</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">For certified tech divers. Focus on Trimix, CCR logistics, and overhead environment exploration.</p>
                </button>
              </div>
              <button 
                onClick={() => setActiveStep(2)}
                className={`w-full py-6 rounded-3xl font-black uppercase tracking-widest text-lg transition-all ${themeColors.bg} text-[#001219] shadow-2xl hover:scale-[1.02]`}
              >
                Confirm Experience Profile
              </button>
            </div>
          )}

          {activeStep === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-10 duration-500">
              <button onClick={() => setActiveStep(1)} className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-colors mb-4">
                <ArrowLeft size={16} /> Back to selection
              </button>
              <h3 className="text-2xl font-bold italic uppercase">Personnel Identification</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-4">Legal Name</label>
                  <input type="text" placeholder="Johnathan Doe" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:outline-none focus:border-white transition-all text-white placeholder:text-gray-700" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-4">Contact Link</label>
                  <input type="email" placeholder="john@abyss.com" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:outline-none focus:border-white transition-all text-white placeholder:text-gray-700" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-4">Experience Brief (Optional)</label>
                  <textarea placeholder="Tell us about your most memorable immersion..." className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:outline-none focus:border-white transition-all text-white placeholder:text-gray-700 h-32 resize-none" />
                </div>
              </div>
              <button 
                onClick={() => setActiveStep(3)}
                className={`w-full py-6 rounded-3xl font-black uppercase tracking-widest text-lg transition-all ${themeColors.bg} text-[#001219] shadow-2xl hover:scale-[1.02]`}
              >
                Secure Booking
              </button>
            </div>
          )}

          {activeStep === 3 && (
            <div className="text-center py-10 animate-in fade-in zoom-in duration-700">
              <div className={`w-24 h-24 ${themeColors.bg} text-[#001219] rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl`}>
                <CheckCircle2 size={48} strokeWidth={3} />
              </div>
              <h3 className="text-4xl font-black italic uppercase mb-4">Inquiry Received</h3>
              <p className="text-gray-400 max-w-md mx-auto leading-relaxed mb-8">
                Your profile has been transmitted. An expedition coordinator will establish a secure uplink within 12 hours to finalize logistics.
              </p>
              <button 
                onClick={() => setActiveStep(1)}
                className="text-xs font-bold uppercase tracking-[0.3em] text-[#0A9396] hover:text-white transition-colors"
              >
                Create New Profile
              </button>
            </div>
          )}

          <div className="mt-12 flex items-center justify-center gap-4 py-6 border-t border-white/5 grayscale opacity-30">
            <ShieldCheck size={16} /> <span className="text-[10px] font-bold uppercase tracking-widest">Encrypted Transmission Secured</span>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 px-6 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <Waves className="text-[#0A9396]" size={20} />
              <span className="font-bold tracking-tighter text-xl uppercase italic">Abyssal</span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Established 2024 • Benthic Frontier Ops</p>
          </div>

          <div className="flex gap-12">
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white mb-2">Base Camp</span>
              <a href="#" className="text-xs text-gray-500 hover:text-[#0A9396] transition-colors">Port of Raja Ampat</a>
              <a href="#" className="text-xs text-gray-500 hover:text-[#0A9396] transition-colors">Tenerife Base</a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white mb-2">Social Hub</span>
              <a href="#" className="text-xs text-gray-500 hover:text-[#0A9396] transition-colors">Instagram</a>
              <a href="#" className="text-xs text-gray-500 hover:text-[#0A9396] transition-colors">Vimeo</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;