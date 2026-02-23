import React, { useState, useEffect, useMemo } from 'react';
import { 
  Waves, 
  Compass, 
  ShieldCheck, 
  Camera, 
  ChevronDown, 
  ArrowRight,
  Info,
  User,
  CheckCircle2,
  Lock,
  ArrowLeft,
  Clock,
  Phone,
  Mail,
  Zap,
  Globe,
  ChevronLeft,
  ChevronRight,
  Ship,
  MapPin,
  Quote,
  X,
  Star,
  Activity,
  Heart,
  Eye,
  ShieldAlert,
  Crown,
  Anchor,
  Loader2,
  Facebook,
  Instagram
} from 'lucide-react';

// --- Background Components ---
const MarineSnow = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
    {[...Array(30)].map((_, i) => (
      <div 
        key={`snow-${i}`}
        className="absolute bg-white rounded-full animate-pulse"
        style={{
          width: Math.random() * 2 + 'px',
          height: Math.random() * 2 + 'px',
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          animationDuration: Math.random() * 10 + 5 + 's',
          opacity: Math.random() * 0.3
        }}
      />
    ))}
  </div>
);

const App = () => {
  const [scrollDepth, setScrollDepth] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [adventureType, setAdventureType] = useState('leisure');
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [activePillar, setActivePillar] = useState(null);
  
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    date: new Date(),
    time: '10:00 AM'
  });

  const [viewDate, setViewDate] = useState(new Date());

  const experiences = [
    { 
      id: 'whale-watching',
      title: "Whale Watching", 
      label: "For Families", 
      img: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&q=80&w=800",
      description: "Experience the magic of the ocean's gentle giants. Our expert guides will take you to the best spots to witness humpback whales and dolphins in their natural habitat. Perfect for all ages, this tour focuses on education, conservation, and breathtaking photography opportunities in a relaxing, safe environment."
    },
    { 
      id: 'glow-night',
      title: "Glow in the Dark", 
      label: "Night Dives", 
      img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800",
      description: "When the sun goes down, a new world wakes up. Dive into a shimmering universe of bioluminescence. You'll see tiny organisms light up like stars as you move through the water. It's a peaceful, surreal experience that feels like floating through a galaxy of living light."
    },
    { 
      id: 'hidden-caves',
      title: "Hidden Caves", 
      label: "Deep Secrets", 
      img: "https://images.unsplash.com/photo-1544552866-d3ed42536cfd?auto=format&fit=crop&q=80&w=800",
      description: "For those who want to see the unseen. Explore ancient underwater cathedrals and crystal-clear cavern systems. This guided tour reveals stunning rock formations and hidden chambers that have been tucked away from the world for thousands of years, all led by our most experienced safety divers."
    }
  ];

  const galleryImages = [
    { url: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&q=80&w=1200", title: "Manta Ray Dance", location: "Kona Coast" },
    { url: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&q=80&w=1200", title: "Deep Submergence", location: "Mariana Rift" },
    { url: "https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&q=80&w=1200", title: "Biolume Jelly", location: "Midnight Zone" },
    { url: "https://images.unsplash.com/photo-1544551763-8dd44758c2dd?auto=format&fit=crop&q=80&w=1200", title: "Apex Predator", location: "Great White Alley" },
    { url: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&q=80&w=1200", title: "Silent Descent", location: "Blue Hole" },
    { url: "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&q=80&w=1200", title: "Corroded History", location: "Aegean Wrecks" }
  ];

  const pillars = [
    { id: 'safety', title: "Safety First", desc: "Triple-redundant oxygen systems for every dive. We leave nothing to chance.", icon: <ShieldCheck className="text-[#0A9396]" size={40} /> },
    { id: 'guides', title: "Master Explorers", desc: "Veteran divers with over 20 years of experience in the dark blue.", icon: <Anchor className="text-[#0A9396]" size={40} /> },
    { id: 'luxury', title: "High-End Comfort", desc: "Climate-controlled submersibles with 5-star seating and panoramas.", icon: <Crown className="text-[#0A9396]" size={40} /> },
    { id: 'purpose', title: "Ocean Legacy", desc: "Every booking supports marine conservation and deep-sea research.", icon: <Heart className="text-[#0A9396]" size={40} /> }
  ];

  const globalStats = [
    { label: "Dives Logged", val: "14,200+" },
    { label: "Perfect Safety Record", val: "100%" },
    { label: "Unique Sites", val: "48" },
    { label: "Max Depth Reach", val: "10,935M" }
  ];

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

  const calendarDays = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const startDay = new Date(year, month, 1).getDay();
    const days = [];
    for (let i = 0; i < startDay; i++) days.push(null);
    for (let i = 1; i <= totalDays; i++) days.push(new Date(year, month, i));
    return days;
  }, [viewDate]);

  const handlePrevMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1));
  const handleNextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1));

  const nextSlide = () => setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
  const prevSlide = () => setGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  const handleConfirmExpedition = () => {
    setIsBookingLoading(true);
    setTimeout(() => {
      setIsBookingLoading(false);
      setBookingStep(4);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#001219] text-gray-100 font-sans selection:bg-[#0A9396] selection:text-white overflow-x-hidden">
      
      {/* --- MODALS (About, Activity, Booking, Privacy, Terms) --- */}
      {isAboutOpen && (
        <div className="fixed inset-0 z-[120] bg-[#001219]/95 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="bg-white text-[#001219] w-full max-w-3xl rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-500">
            <button onClick={() => setIsAboutOpen(false)} className="absolute top-8 right-8 p-3 hover:bg-gray-100 rounded-full transition-colors text-gray-400"><X size={24} /></button>
            <div className="p-8 md:p-16 text-center md:text-left">
              <div className="w-16 h-16 bg-[#0A9396]/10 rounded-3xl flex items-center justify-center mb-8 mx-auto md:mx-0">
                <Compass className="text-[#0A9396]" size={32} />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold italic mb-8 uppercase tracking-tighter">Our Philosophy</h2>
              <div className="space-y-6 text-gray-600 text-base md:text-lg leading-relaxed italic">
                <p>Abyssal Expeditions was born from a simple question: Why do we explore the stars before we know our own oceans?</p>
                <p>We are a team of oceanographers, master divers, and luxury travel experts dedicated to bringing the wonders of the deep to everyone. Our mission is to inspire stewardship of the blue planet by showing you its most hidden, beautiful secrets.</p>
              </div>
              <button onClick={() => { setIsAboutOpen(false); setIsBookingOpen(true); }} className="mt-12 w-full py-5 bg-[#001219] text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-[#0A9396] transition-all">Join Our Next Chapter</button>
            </div>
          </div>
        </div>
      )}

      {isPrivacyOpen && (
        <div className="fixed inset-0 z-[130] bg-[#001219]/98 backdrop-blur-2xl flex items-center justify-center p-4">
          <div className="bg-white text-[#001219] w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl relative">
            <button onClick={() => setIsPrivacyOpen(false)} className="absolute top-8 right-8 p-3 hover:bg-gray-100 rounded-full text-gray-400"><X size={24} /></button>
            <div className="p-10 md:p-14 max-h-[80vh] overflow-y-auto">
              <h2 className="text-3xl font-black italic uppercase mb-8 tracking-tighter">Privacy Protocol</h2>
              <div className="space-y-6 text-gray-600 text-sm leading-relaxed italic">
                <p className="font-bold text-[#001219]">Data Sovereignty</p>
                <p>Your biometric data, dive logs, and personal identity are protected via encrypted end-to-end uplinks. We do not share expedition metrics with third-party surface entities.</p>
                <p className="font-bold text-[#001219]">Safety Tracking</p>
                <p>Real-time health monitoring is used strictly for safety during active descents and is purged from our primary nodes 48 hours post-expedition unless requested otherwise by the traveler.</p>
                <p>Abyssal Expeditions adheres to the highest standards of international data protection and maritime confidentiality.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {isTermsOpen && (
        <div className="fixed inset-0 z-[130] bg-[#001219]/98 backdrop-blur-2xl flex items-center justify-center p-4">
          <div className="bg-white text-[#001219] w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl relative">
            <button onClick={() => setIsTermsOpen(false)} className="absolute top-8 right-8 p-3 hover:bg-gray-100 rounded-full text-gray-400"><X size={24} /></button>
            <div className="p-10 md:p-14 max-h-[80vh] overflow-y-auto">
              <h2 className="text-3xl font-black italic uppercase mb-8 tracking-tighter">Expedition Terms</h2>
              <div className="space-y-6 text-gray-600 text-sm leading-relaxed italic">
                <p className="font-bold text-[#001219]">Assumption of Descent Risk</p>
                <p>Descent into deep-sea environments involves inherent risks related to hydrostatic pressure and artificial life support. By booking, the traveler acknowledges full awareness of these professional parameters.</p>
                <p className="font-bold text-[#001219]">Medical Clearance</p>
                <p>All travelers must provide a verified medical fitness certificate prior to Hadal Zone descents. Surface-level tours require a basic health disclosure for safety synchronization.</p>
                <p className="font-bold text-[#001219]">Cancellations</p>
                <p>Due to the complexity of submersible logistics, expedition windows are non-refundable within 72 hours of scheduled deployment.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedActivity && (
        <div className="fixed inset-0 z-[110] bg-[#001219]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white text-[#001219] w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl relative animate-in zoom-in duration-300">
            <button onClick={() => setSelectedActivity(null)} className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full transition-colors text-[#001219] z-10"><X size={24} /></button>
            <img src={selectedActivity.img} className="w-full h-48 md:h-64 object-cover" alt={selectedActivity.title} />
            <div className="p-8 md:p-12">
              <span className="text-[#0A9396] font-bold text-xs uppercase tracking-[0.2em] mb-3 block">{selectedActivity.label}</span>
              <h3 className="text-3xl md:text-4xl font-bold italic mb-6">{selectedActivity.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-8 italic">{selectedActivity.description}</p>
              <button onClick={() => { setSelectedActivity(null); setIsBookingOpen(true); }} className="w-full py-4 bg-[#001219] text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-[#0A9396] transition-colors">Check Availability</button>
            </div>
          </div>
        </div>
      )}

      {isBookingOpen && (
        <div className="fixed inset-0 z-[100] bg-[#001219]/95 backdrop-blur-xl flex items-center justify-center p-2 md:p-10 overflow-y-auto">
          <div className="bg-white text-[#001219] w-full max-w-4xl rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl relative">
            <button onClick={() => { setIsBookingOpen(false); setBookingStep(1); }} className="absolute top-4 right-4 md:top-6 md:right-6 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"><X size={24} /></button>
            <div className="flex flex-col md:flex-row h-full">
              <div className="md:w-1/3 bg-[#001219] p-6 md:p-10 text-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-6 md:mb-8">
                    <Waves className="text-[#0A9396]" size={24} />
                    <span className="font-bold uppercase tracking-widest text-sm">Abyssal</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-4 tracking-tighter">Your Journey Starts Here.</h2>
                  <p className="text-gray-400 text-xs md:text-sm italic">Join us for a world-class exploration of the deep.</p>
                </div>
                <div className="mt-8 md:mt-12 space-y-4">
                  {[1, 2, 3].map((s) => (
                    <div key={`step-indicator-${s}`} className="flex items-center gap-4">
                      <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full border flex items-center justify-center text-[10px] md:text-xs font-bold ${bookingStep === s ? 'bg-[#0A9396] border-transparent text-white' : 'border-gray-700 text-gray-500'}`}>{s}</div>
                      <span className={`text-[8px] md:text-[10px] font-bold uppercase tracking-widest ${bookingStep === s ? 'text-white' : 'text-gray-600'}`}>{s === 1 ? 'Adventure' : s === 2 ? 'Details' : 'Date'}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 p-6 md:p-16">
                {bookingStep === 1 && (
                  <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                    <h3 className="text-xl md:text-2xl font-bold mb-8 italic">What kind of experience are you looking for?</h3>
                    <div className="grid gap-4">
                      <button onClick={() => { setAdventureType('leisure'); setBookingStep(2); }} className="p-5 md:p-6 border-2 border-gray-100 rounded-2xl md:rounded-3xl hover:border-[#0A9396] hover:bg-blue-50/50 text-left transition-all group">
                        <h4 className="font-bold text-base md:text-lg mb-1 group-hover:text-[#0A9396]">The Guided Tour</h4>
                        <p className="text-xs md:text-sm text-gray-500 italic font-medium">Relaxing, cinematic, and perfect for everyone.</p>
                      </button>
                      <button onClick={() => { setAdventureType('pro'); setBookingStep(2); }} className="p-5 md:p-6 border-2 border-gray-100 rounded-2xl md:rounded-3xl hover:border-[#EE9B00] hover:bg-orange-50/50 text-left transition-all group">
                        <h4 className="font-bold text-base md:text-lg mb-1 group-hover:text-[#EE9B00]">Deep Sea Pro</h4>
                        <p className="text-xs md:text-sm text-gray-500 italic font-medium">For thrill-seekers and experienced divers.</p>
                      </button>
                    </div>
                  </div>
                )}

                {bookingStep === 2 && (
                  <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                    <button onClick={() => setBookingStep(1)} className="text-[10px] font-bold text-gray-400 flex items-center gap-2 mb-6 hover:text-[#001219] uppercase tracking-widest"><ArrowLeft size={12}/> BACK</button>
                    <h3 className="text-xl md:text-2xl font-bold mb-8 italic tracking-tighter">Help us get to know you.</h3>
                    <div className="space-y-4">
                      <input value={bookingData.name} onChange={(e) => setBookingData(prev => ({...prev, name: e.target.value}))} className="w-full bg-gray-50 border border-gray-200 rounded-xl md:rounded-2xl px-6 py-4 focus:outline-none focus:border-[#0A9396] text-sm md:text-base font-medium" placeholder="Full Name" />
                      <input value={bookingData.phone} onChange={(e) => setBookingData(prev => ({...prev, phone: e.target.value}))} className="w-full bg-gray-50 border border-gray-200 rounded-xl md:rounded-2xl px-6 py-4 focus:outline-none focus:border-[#0A9396] text-sm md:text-base font-medium" placeholder="Phone Number" />
                      <input value={bookingData.email} onChange={(e) => setBookingData(prev => ({...prev, email: e.target.value}))} className="w-full bg-gray-50 border border-gray-200 rounded-xl md:rounded-2xl px-6 py-4 focus:outline-none focus:border-[#0A9396] text-sm md:text-base font-medium" placeholder="Email Address" />
                    </div>
                    <button onClick={() => setBookingStep(3)} disabled={!bookingData.name || !bookingData.phone} className="w-full mt-10 py-5 bg-[#001219] text-white rounded-xl md:rounded-2xl font-bold uppercase tracking-widest disabled:opacity-20 transition-all text-sm">Next Step</button>
                  </div>
                )}

                {bookingStep === 3 && (
                  <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                    <button onClick={() => setBookingStep(2)} className="text-[10px] font-bold text-gray-400 flex items-center gap-2 mb-6 hover:text-[#001219] uppercase tracking-widest"><ArrowLeft size={12}/> BACK</button>
                    <h3 className="text-xl md:text-2xl font-bold mb-6 italic tracking-tighter">Choose Your Window.</h3>
                    <div className="bg-gray-50 p-4 md:p-6 rounded-[2rem] mb-6 border border-gray-100 shadow-sm">
                      <div className="flex justify-between items-center mb-4 px-2">
                        <span className="font-bold text-xs md:text-sm uppercase tracking-widest">{viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                        <div className="flex gap-1">
                          <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-200 rounded-full transition-colors"><ChevronLeft size={14}/></button>
                          <button onClick={handleNextMonth} className="p-2 hover:bg-gray-200 rounded-full transition-colors"><ChevronRight size={14}/></button>
                        </div>
                      </div>
                      <div className="grid grid-cols-7 gap-1 text-center">
                        {['S','M','T','W','T','F','S'].map((d, idx) => (
                          <div key={`cal-label-${idx}`} className="text-[10px] font-bold text-gray-300 pb-2">{d}</div>
                        ))}
                        {calendarDays.map((day, i) => {
                          const isPast = day && day < new Date(new Date().setHours(0,0,0,0));
                          const isSelected = day && day.toDateString() === bookingData.date.toDateString();
                          return (
                            <button key={`cal-day-${i}`} onClick={() => day && setBookingData(prev => ({...prev, date: day}))} disabled={!day || isPast} className={`aspect-square text-[10px] md:text-xs font-bold rounded-xl flex items-center justify-center transition-all ${!day ? 'opacity-0' : isPast ? 'text-gray-200 cursor-not-allowed' : isSelected ? 'bg-[#0A9396] text-white shadow-lg' : 'hover:bg-gray-200'}`}>{day?.getDate()}</button>
                          );
                        })}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-8">
                        {['10:00 AM', '02:00 PM', '06:00 PM'].map(t => (
                        <button 
                            key={`time-select-${t}`} 
                            onClick={() => setBookingData(prev => ({...prev, time: t}))}
                            className={`py-3 md:py-4 rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-bold transition-all border-2 ${bookingData.time === t ? 'border-[#0A9396] bg-[#0A9396]/5 text-[#0A9396]' : 'border-gray-100 text-gray-400 hover:border-gray-200'}`}
                        >
                            {t}
                        </button>
                        ))}
                    </div>
                    <button 
                        onClick={handleConfirmExpedition} 
                        disabled={isBookingLoading}
                        className="w-full py-5 bg-[#0A9396] text-white rounded-xl md:rounded-2xl font-bold uppercase tracking-widest shadow-lg text-sm flex items-center justify-center gap-3 relative overflow-hidden"
                    >
                        {isBookingLoading ? <><Loader2 size={18} className="animate-spin" /> <span>Synchronizing Link...</span></> : "Confirm Expedition"}
                    </button>
                  </div>
                )}

                {bookingStep === 4 && (
                  <div className="text-center py-6 md:py-10 animate-in zoom-in duration-500">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8"><CheckCircle2 size={40} /></div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tighter uppercase italic">Request Sent!</h3>
                    <p className="text-gray-500 mb-8 max-w-sm mx-auto text-sm md:text-base italic leading-relaxed">We've received your request for <strong>{bookingData.date.toDateString()}</strong> at <strong>{bookingData.time}</strong>. Our concierge will be in touch shortly.</p>
                    <button onClick={() => { setIsBookingOpen(false); setBookingStep(1); }} className="px-10 py-4 bg-[#001219] text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-[#0A9396] transition-all">Return Home</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- STICKY NAV --- */}
      <nav className="fixed top-0 w-full z-50 px-4 md:px-6 py-4 md:py-6 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-[#001219]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-3 md:p-4 pointer-events-auto shadow-2xl">
          <div className="flex items-center gap-2 pl-2 md:pl-4">
            <Waves className="text-[#0A9396]" size={20} />
            <span className="font-bold tracking-widest text-base md:text-lg uppercase italic">Abyssal</span>
          </div>
          <div className="hidden lg:flex items-center gap-10 text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">
            <a href="#tours" className="hover:text-white transition-colors">Experiences</a>
            <a href="#gallery" className="hover:text-white transition-colors">Gallery</a>
            <a href="#about" className="hover:text-white transition-colors">Why Us</a>
            <button onClick={() => setIsBookingOpen(true)} className="bg-white text-[#001219] px-8 py-3 rounded-full hover:bg-[#0A9396] hover:text-white transition-all font-bold">Start Adventure</button>
          </div>
          <div className="flex flex-col items-end pr-2 md:pr-4">
            <span className="text-[8px] md:text-[10px] text-gray-500 font-bold uppercase tabular-nums tracking-wider italic">Depth: {scrollDepth}M</span>
          </div>
        </div>
      </nav>

      {/* --- HERO --- */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#005F73]/20 via-[#001219] to-[#001219]"></div>
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-[20%] left-[10%] w-[50vw] h-[50vw] bg-[#0A9396]/10 blur-[150px] rounded-full animate-pulse"></div>
        </div>
        <MarineSnow />
        <div className="z-10 max-w-5xl animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <span className="text-[#0A9396] font-bold tracking-[0.3em] uppercase mb-4 md:mb-6 block text-[10px] md:text-xs">A New World Awaits</span>
          <h1 className="text-5xl md:text-9xl font-bold tracking-tighter mb-8 leading-tight md:leading-none uppercase">EXPLORE THE <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A9396] via-white to-[#005F73] italic">DARK BLUE.</span></h1>
          <p className="text-lg md:text-2xl text-gray-400 font-medium max-w-2xl mx-auto mb-10 md:mb-12 italic leading-relaxed px-4">Unforgettable deep-sea experiences for the curious traveler. See what most humans will never see.</p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center px-6">
            <button onClick={() => setIsBookingOpen(true)} className="px-10 md:px-14 py-5 md:py-6 bg-[#0A9396] text-white font-bold uppercase tracking-widest hover:scale-105 transition-all rounded-3xl shadow-2xl shadow-[#0A9396]/20 flex items-center justify-center gap-2 text-sm">Start My Journey <ArrowRight size={18}/></button>
            <button onClick={() => setIsAboutOpen(true)} className="px-10 md:px-14 py-5 md:py-6 border border-white/10 font-bold uppercase tracking-widest hover:bg-white/5 transition-all rounded-3xl text-gray-400 text-sm">Learn More</button>
          </div>
        </div>
        <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 animate-bounce z-10"><ChevronDown size={24} md:size={30} /></div>
      </section>

      {/* --- EXPERIENCES --- */}
      <section id="tours" className="py-20 md:py-32 px-6 md:px-20 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 italic uppercase tracking-tighter">Adventure for Everyone.</h2>
          <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto italic leading-relaxed">Whether you are a family looking for wonders or a seeker of thrill, we have the perfect seat for you.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {experiences.map((item, idx) => (
            <div key={`experience-${idx}`} onClick={() => setSelectedActivity(item)} className="group relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] aspect-[4/5] cursor-pointer shadow-xl border border-white/5">
              <img src={item.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-70" alt={item.title}/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#001219] to-transparent"></div>
              <div className="absolute bottom-0 p-8 md:p-10 w-full">
                <span className="text-[#0A9396] font-bold text-[10px] uppercase tracking-widest mb-2 block">{item.label}</span>
                <h3 className="text-2xl md:text-3xl font-bold italic uppercase tracking-tighter leading-none">{item.title}</h3>
                <div className="flex items-center gap-2 text-white/40 text-[10px] md:text-xs font-bold mt-4 group-hover:text-white transition-colors uppercase tracking-widest">View Story <ArrowRight size={14}/></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- GALLERY SLIDER --- */}
      <section id="gallery" className="py-20 md:py-32 bg-white/[0.01] border-y border-white/5 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-8 text-center md:text-left">
            <div className="space-y-4">
              <span className="text-[#0A9396] font-bold text-[10px] md:text-xs uppercase tracking-widest block italic">Expedition Archive</span>
              <h2 className="text-4xl md:text-6xl font-bold italic uppercase leading-none tracking-tighter">Frozen Moments</h2>
            </div>
            <div className="flex gap-4 mx-auto md:mx-0">
              <button onClick={prevSlide} className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-white text-white hover:text-black transition-all group active:scale-90 shadow-xl"><ChevronLeft size={24} md:size={28} /></button>
              <button onClick={nextSlide} className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-white text-white hover:text-black transition-all group active:scale-90 shadow-xl"><ChevronRight size={24} md:size={28} /></button>
            </div>
          </div>
          <div className="relative h-[450px] md:h-[650px] rounded-[3rem] md:rounded-[5rem] overflow-hidden group shadow-[0_0_80px_rgba(0,0,0,0.5)] border border-white/5">
            {galleryImages.map((img, i) => (
              <div key={`gallery-${i}`} className={`absolute inset-0 transition-all duration-1000 ease-in-out ${i === galleryIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'}`}>
                <img src={img.url} className="w-full h-full object-cover" alt={img.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001219] via-transparent to-transparent"></div>
                <div className="absolute bottom-8 md:bottom-16 left-8 md:left-16 right-8 md:right-16">
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-[#0A9396] block mb-2 md:mb-4 italic">{img.location}</span>
                    <h3 className="text-2xl md:text-5xl font-bold italic uppercase tracking-tighter leading-none">{img.title}</h3>
                </div>
              </div>
            ))}
            <div className="absolute top-8 md:top-16 right-8 md:right-16 flex flex-col items-end gap-3 scale-75 md:scale-100">
               <span className="text-xs font-mono font-bold text-white/40">0{galleryIndex + 1} / 0{galleryImages.length}</span>
               <div className="flex gap-2">
                 {galleryImages.map((_, i) => (
                   <div key={`dot-${i}`} className={`h-1.5 transition-all duration-500 rounded-full ${i === galleryIndex ? 'w-12 md:w-16 bg-[#0A9396]' : 'w-4 bg-white/20'}`} />
                 ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE OUR DESCENT --- */}
      <section id="about" className="py-24 md:py-40 px-6 md:px-20 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 md:mb-24 gap-12">
          <div className="max-w-2xl text-center md:text-left mx-auto md:mx-0">
            <span className="text-[#0A9396] font-bold text-[10px] md:text-xs uppercase tracking-widest mb-6 block italic">The Abyssal Standard</span>
            <h2 className="text-5xl md:text-7xl font-bold italic uppercase mb-8 leading-[0.85] tracking-tighter">Why Choose <br /> Our Descent?</h2>
          </div>
          <p className="text-gray-500 text-lg md:text-xl max-w-sm italic leading-relaxed md:border-l-2 md:border-[#0A9396]/30 md:pl-8 text-center md:text-left mx-auto md:mx-0">We engineered a bridge to the Earth's final frontier, grounded in comfort and absolute safety.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => (
            <div 
              key={`pillar-${i}`} 
              onMouseEnter={() => setActivePillar(i)}
              onMouseLeave={() => setActivePillar(null)}
              className={`relative p-8 md:p-10 rounded-[3rem] md:rounded-[4rem] border transition-all duration-700 cursor-default group overflow-hidden h-[360px] md:h-[400px]
                ${activePillar === i ? 'bg-[#0A9396]/15 border-[#0A9396] shadow-[0_0_50px_rgba(10,147,150,0.3)] scale-[1.02]' : 'bg-white/[0.02] border-white/5'}
                ${activePillar !== null && activePillar !== i ? 'opacity-40 grayscale blur-[1px] scale-95' : ''}
              `}
            >
              <div className="flex flex-col h-full relative z-10 items-center md:items-start text-center md:text-left">
                <div className="mb-10 inline-flex items-center justify-center p-5 md:p-6 bg-black/40 rounded-[2.5rem] transition-transform duration-500 shadow-xl border border-white/5 w-fit">
                  {pillar.icon}
                </div>
                <h4 className="text-2xl font-bold uppercase italic mb-4 tracking-tighter group-hover:text-[#0A9396] transition-colors">{pillar.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed font-medium mb-6 italic">{pillar.desc}</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 group-hover:to-transparent pointer-events-none transition-all duration-700" />
            </div>
          ))}
        </div>

        <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-white/5 pt-12 text-center md:text-left">
           {globalStats.map((stat, i) => (
             <div key={i} className="group cursor-default animate-in fade-in duration-1000 delay-150">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1 italic tracking-tighter group-hover:text-[#0A9396] transition-colors">{stat.val}</div>
                <div className="text-[8px] md:text-[10px] font-bold text-gray-600 uppercase tracking-widest">{stat.label}</div>
             </div>
           ))}
        </div>
      </section>

      {/* --- FLEET --- */}
      <section id="fleet" className="py-20 md:py-32 px-6 md:px-20 bg-white/[0.02] relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 md:gap-24">
          <div className="flex-1 space-y-8 md:y-10 text-center lg:text-left">
            <h2 className="text-5xl md:text-7xl font-bold leading-tight md:leading-[0.85] italic uppercase tracking-tighter">Travel in Total <br className="hidden md:block" /> Safety & Luxury</h2>
            <div className="space-y-6">
              {[
                { name: "The Explorer", desc: "A high-visibility vessel for surface-level wonders.", icon: <Ship className="text-[#0A9396]" size={32}/> },
                { name: "The Hadal-7", desc: "Go deeper in climate-controlled comfort.", icon: <Zap className="text-[#EE9B00]" size={32}/> }
              ].map((boat, i) => (
                <div key={`boat-${i}`} className="flex items-start gap-6 md:gap-8 p-8 md:p-10 bg-white/[0.03] border border-white/5 rounded-[3rem] md:rounded-[3.5rem] hover:bg-white/[0.06] transition-all group text-left shadow-lg">
                  <div className="mt-2 p-3 md:p-4 bg-black/40 rounded-2xl group-hover:scale-110 transition-transform">{boat.icon}</div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-bold uppercase italic mb-2 tracking-tighter">{boat.name}</h4>
                    <p className="text-xs md:text-sm text-gray-500 font-medium italic leading-relaxed">{boat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 relative rounded-[3rem] md:rounded-[5rem] overflow-hidden group shadow-2xl border border-white/5 w-full aspect-square md:aspect-auto h-[400px] md:h-[600px]">
            <img src="https://images.unsplash.com/photo-1544551763-8dd44758c2dd?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" alt="Submersible"/>
            <div className="absolute inset-0 bg-gradient-to-t from-[#001219]/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section id="echoes" className="py-20 md:py-32 px-6 md:px-20 max-w-7xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold italic mb-16 md:mb-20 uppercase tracking-tighter">Explorers' Tales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "Sarah J.", text: "The night dive was magical. I've never seen colors like that.", role: "Family Traveler" },
            { name: "Tom Baker", text: "Truly a once-in-a-lifetime experience. Pure luxury.", role: "Adventure Blogger" },
            { name: "M. Chen", text: "Professional, friendly, and breathtaking.", role: "Scuba Diver" }
          ].map((t, i) => (
            <div key={`testimonial-${i}`} className="p-10 md:p-12 bg-white/[0.02] border border-white/5 rounded-[3rem] md:rounded-[4rem] flex flex-col justify-between text-left hover:bg-white/[0.05] transition-all group shadow-xl">
              <div>
                <div className="flex gap-1 mb-8 text-[#0A9396]">
                  {[...Array(5)].map((_, star) => <Star key={`star-${i}-${star}`} size={14} md:size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-400 text-base md:text-xl italic leading-relaxed mb-8 md:mb-10">"{t.text}"</p>
              </div>
              <div className="pt-8 md:pt-10 border-t border-white/5">
                 <h5 className="font-bold text-white text-base md:text-lg uppercase italic tracking-tighter">{t.name}</h5>
                 <p className="text-[10px] text-[#0A9396] font-bold uppercase tracking-[0.2em]">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section id="portal" className="py-24 md:py-40 px-6 md:px-20 text-center relative z-10">
        <div className="max-w-5xl mx-auto p-12 md:p-32 rounded-[4rem] md:rounded-[6rem] bg-gradient-to-t from-[#0A9396]/20 to-transparent border border-[#0A9396]/20 relative overflow-hidden group shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-8xl font-bold italic uppercase mb-10 leading-tight tracking-tighter">Ready for your <br className="hidden md:block" /> Expedition?</h2>
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="px-10 md:px-20 py-6 md:py-8 bg-white text-[#001219] font-black uppercase tracking-[0.2em] rounded-2xl md:rounded-3xl hover:bg-[#0A9396] hover:text-white transition-all shadow-2xl hover:scale-105 active:scale-95 text-base md:text-lg"
            >
              Start Your Adventure
            </button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-[#0A9396]/10 blur-[120px] rounded-full group-hover:scale-150 transition-transform duration-[2s]"></div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-16 md:py-24 px-6 border-t border-white/5 bg-[#001219] relative z-10 text-center md:text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 md:gap-16">
          <div className="flex flex-col gap-6 items-center md:items-start">
            <div className="flex items-center gap-3">
              <Waves className="text-[#0A9396]" size={32} md:size={36} />
              <span className="font-black text-2xl md:text-3xl uppercase italic tracking-tighter">Abyssal</span>
            </div>
            <p className="text-gray-600 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] italic">The Premier Global Deep Sea Agency</p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-10 text-[10px] font-bold uppercase tracking-widest text-gray-500">
            <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={() => setIsTermsOpen(true)} className="hover:text-white transition-colors">Terms of Service</button>
            <div className="w-full md:w-auto h-px md:h-8 md:w-px bg-white/5 md:mx-2 hidden md:block"></div>
            <span className="opacity-40 italic">© 2026 ABYSSAL EXPEDITIONS</span>
          </div>

          <div className="flex gap-6 md:gap-8 text-gray-600">
             <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
             <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
             <a href="#" className="hover:text-white transition-colors"><Globe size={20} /></a>
             <a href="#" className="hover:text-white transition-colors"><ShieldCheck size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;