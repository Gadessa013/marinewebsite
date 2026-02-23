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
  Calendar as CalendarIcon,
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
  Heart
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
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [adventureType, setAdventureType] = useState('leisure');
  
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

  return (
    <div className="min-h-screen bg-[#001219] text-gray-100 font-sans selection:bg-[#0A9396] selection:text-white overflow-x-hidden">
      
      {/* --- ACTIVITY DETAIL MODAL --- */}
      {selectedActivity && (
        <div className="fixed inset-0 z-[110] bg-[#001219]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white text-[#001219] w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl relative animate-in zoom-in duration-300">
            <button 
              onClick={() => setSelectedActivity(null)}
              className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full transition-colors text-[#001219] z-10"
            >
              <X size={24} />
            </button>
            <img src={selectedActivity.img} className="w-full h-64 object-cover" alt={selectedActivity.title} />
            <div className="p-8 md:p-12">
              <span className="text-[#0A9396] font-bold text-xs uppercase tracking-[0.2em] mb-3 block">{selectedActivity.label}</span>
              <h3 className="text-4xl font-bold italic mb-6">{selectedActivity.title}</h3>
              <p className="text-gray-600 leading-relaxed text-lg mb-8 italic">{selectedActivity.description}</p>
              <button 
                onClick={() => { setSelectedActivity(null); setIsBookingOpen(true); }}
                className="w-full py-4 bg-[#001219] text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-[#0A9396] transition-colors"
              >
                Check Availability
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- BOOKING FUNNEL WINDOW (MODAL) --- */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-[100] bg-[#001219]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 overflow-y-auto">
          <div className="bg-white text-[#001219] w-full max-w-4xl rounded-[3rem] overflow-hidden shadow-2xl relative">
            <button 
              onClick={() => { setIsBookingOpen(false); setBookingStep(1); }}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
            >
              <X size={24} />
            </button>
            <div className="flex flex-col md:flex-row h-full">
              <div className="md:w-1/3 bg-[#001219] p-10 text-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-8">
                    <Waves className="text-[#0A9396]" size={24} />
                    <span className="font-bold uppercase tracking-widest text-sm">Abyssal</span>
                  </div>
                  <h2 className="text-3xl font-bold leading-tight mb-4">Your Journey Starts Here.</h2>
                  <p className="text-gray-400 text-sm">Join us for a world-class exploration of the deep.</p>
                </div>
                <div className="mt-12 space-y-4">
                  {[1, 2, 3].map((s) => (
                    <div key={`step-indicator-${s}`} className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold ${bookingStep === s ? 'bg-[#0A9396] border-transparent text-white' : 'border-gray-700 text-gray-500'}`}>{s}</div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${bookingStep === s ? 'text-white' : 'text-gray-600'}`}>
                        {s === 1 ? 'Adventure Type' : s === 2 ? 'Your Details' : 'Choose Date'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 p-8 md:p-16">
                {bookingStep === 1 && (
                  <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                    <h3 className="text-2xl font-bold mb-8">What kind of experience are you looking for?</h3>
                    <div className="grid gap-4">
                      <button onClick={() => { setAdventureType('leisure'); setBookingStep(2); }} className="p-6 border-2 border-gray-100 rounded-3xl hover:border-[#0A9396] hover:bg-blue-50/50 text-left transition-all group">
                        <h4 className="font-bold text-lg mb-1 group-hover:text-[#0A9396]">The Guided Tour</h4>
                        <p className="text-sm text-gray-500">Relaxing, cinematic, and perfect for everyone. No experience needed.</p>
                      </button>
                      <button onClick={() => { setAdventureType('pro'); setBookingStep(2); }} className="p-6 border-2 border-gray-100 rounded-3xl hover:border-[#EE9B00] hover:bg-orange-50/50 text-left transition-all group">
                        <h4 className="font-bold text-lg mb-1 group-hover:text-[#EE9B00]">Deep Sea Pro</h4>
                        <p className="text-sm text-gray-500">For thrill-seekers and experienced divers looking to go deeper.</p>
                      </button>
                    </div>
                  </div>
                )}

                {bookingStep === 2 && (
                  <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                    <button onClick={() => setBookingStep(1)} className="text-xs font-bold text-gray-400 flex items-center gap-2 mb-6 hover:text-[#001219]"><ArrowLeft size={14}/> BACK</button>
                    <h3 className="text-2xl font-bold mb-8">Help us get to know you.</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Full Name</label>
                          <input 
                            value={bookingData.name} 
                            onChange={(e) => setBookingData(prev => ({...prev, name: e.target.value}))} 
                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#0A9396]" 
                            placeholder="Jane Doe" 
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Phone Number</label>
                          <input 
                            value={bookingData.phone} 
                            onChange={(e) => setBookingData(prev => ({...prev, phone: e.target.value}))} 
                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#0A9396]" 
                            placeholder="+1 000 000 0000" 
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Email Address</label>
                        <input 
                          value={bookingData.email} 
                          onChange={(e) => setBookingData(prev => ({...prev, email: e.target.value}))} 
                          className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#0A9396]" 
                          placeholder="jane@example.com" 
                        />
                      </div>
                    </div>
                    <button onClick={() => setBookingStep(3)} disabled={!bookingData.name || !bookingData.phone} className="w-full mt-10 py-5 bg-[#001219] text-white rounded-2xl font-bold uppercase tracking-widest disabled:opacity-20 transition-all">Choose Your Date</button>
                  </div>
                )}

                {bookingStep === 3 && (
                  <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                    <button onClick={() => setBookingStep(2)} className="text-xs font-bold text-gray-400 flex items-center gap-2 mb-6 hover:text-[#001219]"><ArrowLeft size={14}/> BACK</button>
                    <h3 className="text-2xl font-bold mb-6">When would you like to dive?</h3>
                    <div className="bg-gray-50 p-6 rounded-[2rem] mb-6">
                      <div className="flex justify-between items-center mb-4 px-2">
                        <span className="font-bold text-sm uppercase tracking-widest">{viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                        <div className="flex gap-1">
                          <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-200 rounded-full"><ChevronLeft size={16}/></button>
                          <button onClick={handleNextMonth} className="p-2 hover:bg-gray-200 rounded-full"><ChevronRight size={16}/></button>
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
                            <button 
                              key={`cal-day-${i}`} 
                              onClick={() => day && setBookingData(prev => ({...prev, date: day}))} 
                              disabled={!day || isPast} 
                              className={`aspect-square text-xs font-bold rounded-xl flex items-center justify-center transition-all ${!day ? 'opacity-0' : isPast ? 'text-gray-200 cursor-not-allowed' : isSelected ? 'bg-[#0A9396] text-white shadow-lg' : 'hover:bg-gray-200'}`}
                            >
                              {day?.getDate()}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex gap-3 mb-8">
                      {['10:00 AM', '02:00 PM', '06:00 PM'].map(t => (
                        <button key={`time-${t}`} onClick={() => setBookingData(prev => ({...prev, time: t}))} className={`flex-1 py-4 border-2 rounded-2xl text-xs font-bold transition-all ${bookingData.time === t ? 'border-[#0A9396] bg-blue-50 text-[#0A9396]' : 'border-gray-100 text-gray-400'}`}>{t}</button>
                      ))}
                    </div>
                    <button onClick={() => setBookingStep(4)} className="w-full py-5 bg-[#0A9396] text-white rounded-2xl font-bold uppercase tracking-widest shadow-xl shadow-[#0A9396]/20 transition-all hover:scale-[1.02]">Confirm Expedition</button>
                  </div>
                )}

                {bookingStep === 4 && (
                  <div className="text-center py-10 animate-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8"><CheckCircle2 size={48} /></div>
                    <h3 className="text-4xl font-bold mb-4">Request Sent!</h3>
                    <p className="text-gray-500 mb-8 max-w-sm mx-auto">We've received your request for <strong>{bookingData.date.toDateString()}</strong>. A concierge will call you at <strong>{bookingData.phone}</strong> shortly.</p>
                    <button onClick={() => { setIsBookingOpen(false); setBookingStep(1); }} className="px-10 py-4 bg-[#001219] text-white rounded-2xl font-bold">Return Home</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- STICKY NAV --- */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-[#001219]/40 backdrop-blur-xl border border-white/5 rounded-2xl p-4 pointer-events-auto">
          <div className="flex items-center gap-2 pl-4">
            <Waves className="text-[#0A9396]" size={24} />
            <span className="font-bold tracking-widest text-lg uppercase">Abyssal</span>
          </div>
          <div className="hidden lg:flex items-center gap-10 text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">
            <a href="#tours" className="hover:text-white transition-colors">Experiences</a>
            <a href="#fleet" className="hover:text-white transition-colors">The Boats</a>
            <a href="#about" className="hover:text-white transition-colors">Why Us</a>
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="bg-white text-[#001219] px-8 py-3 rounded-full hover:bg-[#0A9396] hover:text-white transition-all font-bold"
            >
              Start Adventure
            </button>
          </div>
          <div className="flex flex-col items-end pr-4">
            <span className="text-[10px] text-gray-500 font-bold uppercase tabular-nums tracking-wider">Depth: {scrollDepth}M</span>
          </div>
        </div>
      </nav>

      {/* --- HERO: UNIFIED EMOTIONAL APPEAL --- */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Background Gradient & Effects */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#005F73]/20 via-[#001219] to-[#001219]"></div>
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-[20%] left-[10%] w-[50vw] h-[50vw] bg-[#0A9396]/10 blur-[150px] rounded-full animate-pulse"></div>
        </div>
        <MarineSnow />
        
        <div className="z-10 max-w-5xl animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <span className="text-[#0A9396] font-bold tracking-[0.3em] uppercase mb-6 block text-xs">A New World Awaits</span>
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 leading-none">
            EXPLORE THE <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A9396] via-white to-[#005F73] italic">DARK BLUE.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-medium max-w-2xl mx-auto mb-12 italic leading-relaxed">
            Unforgettable deep-sea experiences for the curious traveler. See what most humans will never see.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="px-14 py-6 bg-[#0A9396] text-white font-bold uppercase tracking-widest hover:scale-105 transition-all rounded-3xl shadow-2xl shadow-[#0A9396]/20 flex items-center gap-2"
            >
              Start My Journey <ArrowRight size={20}/>
            </button>
            <button className="px-14 py-6 border border-white/10 font-bold uppercase tracking-widest hover:bg-white/5 transition-all rounded-3xl text-gray-400">Learn More</button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 animate-bounce z-10">
            <ChevronDown size={30} />
        </div>
      </section>

      {/* --- EXPERIENCES --- */}
      <section id="tours" className="py-32 px-6 md:px-20 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-5xl font-bold mb-6 italic uppercase">Adventure for Everyone.</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto italic leading-relaxed">Whether you are a family looking for wonders or a seeker of thrill, we have the perfect seat for you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {experiences.map((item, idx) => (
            <div 
              key={`experience-${idx}`} 
              onClick={() => setSelectedActivity(item)}
              className="group relative overflow-hidden rounded-[3rem] aspect-[4/5] cursor-pointer"
            >
              <img src={item.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-70" alt={item.title}/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#001219] to-transparent"></div>
              <div className="absolute bottom-0 p-10 w-full">
                <span className="text-[#0A9396] font-bold text-[10px] uppercase tracking-widest mb-2 block">{item.label}</span>
                <h3 className="text-3xl font-bold italic uppercase">{item.title}</h3>
                <div className="flex items-center gap-2 text-white/40 text-xs font-bold mt-4 group-hover:text-white transition-colors uppercase tracking-widest">
                  View Story <ArrowRight size={14}/>
                </div>
                <div className="h-1 w-0 bg-[#0A9396] group-hover:w-full transition-all duration-700 mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- WHY US SECTION --- */}
      <section id="about" className="py-32 px-6 md:px-20 bg-white/[0.01] border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold italic uppercase mb-6">The Abyssal Difference</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto italic">We built a bridge to the Earth's final frontier, grounded in comfort and safety.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: "Safety First", 
                desc: "Triple-redundant oxygen systems and world-class escape protocols for every dive.",
                icon: <ShieldCheck className="text-[#0A9396]" size={32} />
              },
              { 
                title: "Expert Guides", 
                desc: "Our lead explorers are veteran divers with over 20 years of experience in the dark blue.",
                icon: <User className="text-[#0A9396]" size={32} />
              },
              { 
                title: "Luxury Comfort", 
                desc: "Climate-controlled submersibles with 5-star seating and panoramic views.",
                icon: <Star className="text-[#0A9396]" size={32} />
              },
              { 
                title: "True Purpose", 
                desc: "Every booking supports marine conservation and deep-sea research projects.",
                icon: <Heart className="text-[#0A9396]" size={32} />
              }
            ].map((pillar, i) => (
              <div key={`pillar-${i}`} className="p-10 bg-white/[0.03] border border-white/5 rounded-[3rem] text-center hover:bg-white/[0.06] transition-all group">
                <div className="mb-6 flex justify-center group-hover:scale-110 transition-transform">{pillar.icon}</div>
                <h4 className="text-xl font-bold uppercase italic mb-4">{pillar.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FLEET --- */}
      <section id="fleet" className="py-32 px-6 md:px-20 bg-white/[0.02] relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 space-y-8">
            <h2 className="text-6xl font-bold leading-none italic uppercase">Travel in Total <br /> Safety & Luxury</h2>
            <p className="text-gray-400 text-lg leading-relaxed italic font-medium">Our fleet is built with the same care as space-shuttles, but with the comfort of a luxury lounge. Your safety is our #1 priority.</p>
            <div className="space-y-6">
              {[
                { name: "The Explorer", desc: "A fast, comfortable vessel for surface-level wonders.", icon: <Ship className="text-[#0A9396]" size={24}/> },
                { name: "The Deep-Sub", desc: "Our pride. Go deeper than ever before in total climate control.", icon: <Zap className="text-[#EE9B00]" size={24}/> }
              ].map((boat, i) => (
                <div key={`boat-${i}`} className="flex items-start gap-6 p-8 bg-white/[0.03] border border-white/5 rounded-3xl hover:bg-white/[0.05] transition-all">
                  <div className="mt-1">{boat.icon}</div>
                  <div>
                    <h4 className="text-xl font-bold uppercase italic mb-1">{boat.name}</h4>
                    <p className="text-sm text-gray-500 font-medium">{boat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 relative rounded-[4rem] overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1544551763-8dd44758c2dd?auto=format&fit=crop&q=80&w=1200" className="w-full aspect-square object-cover transition-all duration-1000 group-hover:scale-105" alt="Submersible"/>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section id="echoes" className="py-32 px-6 md:px-20 max-w-7xl mx-auto text-center relative z-10">
        <h2 className="text-5xl font-bold italic mb-20 uppercase">Our Explorers' Tales</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Sarah J.", text: "The night dive was magical. I've never seen colors like that. The team made me feel incredibly safe.", role: "Family Traveler" },
            { name: "Tom Baker", text: "Truly a once-in-a-lifetime experience. The submersible felt like a private jet underwater.", role: "Adventure Blogger" },
            { name: "M. Chen", text: "Professional, friendly, and breathtaking. I'll be coming back for the Hadal tour!", role: "Scuba Diver" }
          ].map((t, i) => (
            <div key={`testimonial-${i}`} className="p-12 bg-white/[0.03] border border-white/5 rounded-[3.5rem] flex flex-col justify-between text-left hover:bg-white/[0.05] transition-all">
              <div>
                <div className="flex gap-1 mb-6 text-[#0A9396]">
                  {[...Array(5)].map((_, star) => <Star key={`star-${i}-${star}`} size={14} fill="currentColor" />)}
                </div>
                <p className="text-gray-400 text-lg italic leading-relaxed mb-8">"{t.text}"</p>
              </div>
              <div className="pt-8 border-t border-white/5">
                 <h5 className="font-bold text-white uppercase italic">{t.name}</h5>
                 <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section id="portal" className="py-40 px-6 md:px-20 text-center relative z-10">
        <div className="max-w-4xl mx-auto p-16 md:p-32 rounded-[5rem] bg-gradient-to-t from-[#0A9396]/20 to-transparent border border-[#0A9396]/20 relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-bold italic uppercase mb-10 leading-none">Ready for your <br /> Expedition?</h2>
            <p className="text-gray-400 text-lg mb-12 max-w-lg mx-auto italic font-medium leading-relaxed">
              Booking takes less than 2 minutes. Your gateway to the blue starts with a single click.
            </p>
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="px-16 py-8 bg-white text-[#001219] font-black uppercase tracking-[0.2em] rounded-3xl hover:bg-[#0A9396] hover:text-white transition-all shadow-2xl hover:scale-105 active:scale-95"
            >
              Start Your Adventure
            </button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[#0A9396]/10 blur-[100px] rounded-full group-hover:scale-150 transition-transform duration-[2s]"></div>
        </div>
      </section>

      <footer className="py-24 px-6 border-t border-white/5 bg-black relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Waves className="text-[#0A9396]" size={28} />
              <span className="font-black text-2xl uppercase italic">Abyssal</span>
            </div>
            <p className="text-gray-600 text-xs font-bold uppercase tracking-widest">Global Deep Sea Exploration Agency</p>
          </div>
          <div className="text-[10px] font-bold text-gray-700 tracking-[0.4em] uppercase">
            © 2026 ABYSSAL EXPEDITIONS. DISCOVER THE DARK BLUE.
          </div>
          <div className="flex gap-8 text-gray-700">
             <Globe size={20} className="hover:text-white transition-colors cursor-pointer" />
             <ShieldCheck size={20} className="hover:text-white transition-colors cursor-pointer" />
             <Activity size={20} className="hover:text-white transition-colors cursor-pointer" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;