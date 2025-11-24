import './App.css'
import './index.css'
import  { useLayoutEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
import { 
  Bot, Globe2, Sparkles,
  CheckCircle2,LayoutDashboard, 
  CreditCard, Map,  ChevronRight, Star,
   MapPin, 
  DollarSign,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const splitText = (text: string) => {
  return text.split("").map((char, index) => (
    <span key={index} className="inline-block hero-char opacity-0 translate-y-full origin-bottom transform-style-3d">
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

function App() {
const mainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const workflowRef = useRef<HTMLDivElement>(null);
  const featureRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 0. Cursor Spotlight
      window.addEventListener('mousemove', (e) => {
        gsap.to(spotlightRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.6,
          ease: 'power2.out'
        });
        
        // Parallax for Hero Dashboard
        if (dashboardRef.current && heroRef.current) {
            const rect = heroRef.current.getBoundingClientRect();
            const relX = (e.clientX - rect.left) / rect.width - 0.5;
            const relY = (e.clientY - rect.top) / rect.height - 0.5;
            
            gsap.to(dashboardRef.current, {
                rotationY: relX * 15,
                rotationX: -relY * 15,
                duration: 1,
                ease: 'power2.out'
            });
        }
      });

      // 1. Preloader Sequence
      const tl = gsap.timeline();
      
      tl.to(".preloader-text", { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
        .to(".preloader-text", { y: -50, opacity: 0, duration: 0.5, delay: 0.5 })
        .to(".preloader", { yPercent: -100, duration: 1, ease: "expo.inOut" }, "-=0.2")
        .from(".navbar-item", { y: -20, opacity: 0, stagger: 0.05, duration: 0.5 }, "-=0.5");

      // 2. Hero Text Explosion
      tl.to(".hero-char", {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.03,
        duration: 1,
        ease: "back.out(1.7)"
      }, "-=0.8");

      tl.from(".hero-sub", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");
      tl.from(".hero-cta", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 }, "-=0.4");
      
      // 3. Hero Dashboard Entrance
      tl.from(dashboardRef.current, { 
        y: 100, 
        opacity: 0, 
        rotateX: 45, 
        duration: 1.5, 
        ease: "power4.out" 
      }, "-=0.8");

      // 4. Background Scrubbing Parallax
      gsap.to(".bg-blob", {
        y: "30%",
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5
        }
      });

      // 5. Marquee Continuous Loop
      gsap.to(".marquee-inner", {
        xPercent: -50,
        repeat: -1,
        duration: 30,
        ease: "linear"
      });

      // 6. Workflow Pinning & Transitions
      const workflowTl = gsap.timeline({
        scrollTrigger: {
            trigger: workflowRef.current,
            start: "top top",
            end: "+=300%",
            pin: true,
            scrub: 0.5,
        }
      });

      // Transition 1 -> 2
      workflowTl
        .to(".workflow-1", { opacity: 0, y: -20, scale: 0.95, duration: 1 })
        .fromTo(".workflow-2", { opacity: 0, y: 50, scale: 1.05 }, { opacity: 1, y: 0, scale: 1, duration: 1 }, "<")
        // Transition 2 -> 3
        .to(".workflow-2", { opacity: 0, y: -20, scale: 0.95, duration: 1 })
        .fromTo(".workflow-3", { opacity: 0, y: 50, scale: 1.05 }, { opacity: 1, y: 0, scale: 1, duration: 1 }, "<");

      // 7. Feature Cards Staggered Reveal
      ScrollTrigger.batch(".feature-card", {
        start: "top 85%",
        onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power3.out" })
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="bg-slate-950 text-white selection:bg-indigo-500 selection:text-white overflow-x-hidden font-sans cursor-default">
      
      {/* Dynamic Cursor Spotlight */}
      <div 
        ref={spotlightRef} 
        className="pointer-events-none fixed top-0 left-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 z-0 mix-blend-screen"
      />

      {/* Preloader Overlay */}
      <div className="preloader fixed inset-0 z-100 bg-slate-950 flex items-center justify-center">
        <div className="preloader-text opacity-0 translate-y-10 flex items-center gap-3">
             <Globe2 className="w-10 h-10 text-indigo-500 animate-spin-slow" />
             <span className="text-3xl font-bold font-display tracking-tight">TripSync</span>
        </div>
      </div>
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="navbar-item flex items-center gap-2 cursor-pointer group">
            <div className="w-9 h-9 bg-linear-to-tr from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:rotate-12 transition-transform duration-500">
              <Globe2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight font-display group-hover:text-indigo-200 transition-colors">TripSync</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            {['Platform', 'Workflow', 'features', 'Pricing'].map((item, i) => (
                <a key={i} href={`#${item.toLowerCase()}`} className="navbar-item hover:text-white transition-colors relative group">
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
            ))}
          </div>
          <div className="navbar-item flex items-center gap-4">
            {/* <Link to="/login" className="hidden md:block text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Log in
            </Link>
            <Link 
              to="/login" 
              className="px-6 py-2.5 bg-white text-slate-950 text-sm font-bold rounded-full hover:bg-indigo-50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95"
            >
              Get Started
            </Link> */}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 perspective-1000">
        {/* Animated Background Blobs */}
        <div className="bg-blob absolute top-0 left-1/2 -translate-x-1/2 w-screen h-screen overflow-hidden -z-10 pointer-events-none">
             <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
             <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-fuchsia-600/20 rounded-full blur-[100px] mix-blend-screen animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        <div className="absolute inset-0 landing-grid-bg -z-5 opacity-40"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="hero-sub inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md hover:bg-white/10 transition-colors cursor-pointer group">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="text-sm font-medium text-indigo-200 group-hover:text-white transition-colors">New: Itinerary BOT V2.0</span>
            <ChevronRight className="w-3 h-3 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>
          
          <h1 className="text-5xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1] font-display">
            <div className="overflow-hidden">
                {splitText("Orchestrate Trips.")}
            </div>
            <div className="text-transparent bg-clip-text bg-linear-to-r from-indigo-300 via-purple-300 to-pink-300 overflow-hidden">
                {splitText("Not Spreadsheets.")}
            </div>
          </h1>
          
          <p className="hero-sub text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            The operating system for modern travel agencies. 
            AI-powered itineraries, global payments, and client portals in one stunning interface.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24">
            {/* <Link 
              to="/login"
              className="hero-cta w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold text-lg transition-all shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 hover:scale-110 active:scale-95"
            >
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </Link> */}
            <button className="hero-cta w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full font-bold text-lg transition-all backdrop-blur-sm flex items-center justify-center gap-2 hover:scale-105 active:scale-95">
              <div className="w-6 h-6 rounded-full bg-white text-slate-900 flex items-center justify-center">
                 <div className="w-0 h-0 border-t-4 border-t-transparent border-l-[6px] border-l-slate-900 border-b-4 border-b-transparent ml-0.5"></div>
              </div>
              Watch Demo
            </button>
          </div>

          {/* 3D Dashboard Mockup */}
          <div ref={dashboardRef} className="relative max-w-6xl mx-auto perspective-1000 z-20">
            <div className="relative transform-style-3d shadow-[0_0_100px_rgba(79,70,229,0.2)] rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl overflow-hidden group">
              {/* Fake UI Header */}
              <div className="h-10 bg-slate-800/50 border-b border-white/5 flex items-center px-4 gap-2">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                </div>
                <div className="mx-auto w-96 h-6 bg-white/5 rounded-md flex items-center justify-center text-[10px] text-slate-500 font-mono">
                    TripSync.app/dashboard
                </div>
              </div>
              
              {/* Content Mockup */}
              <div className="grid grid-cols-12 h-[600px] lg:h-[700px] bg-slate-950/50">
                 {/* Sidebar */}
                 <div className="col-span-1 lg:col-span-2 border-r border-white/5 p-4 space-y-4 hidden md:block">
                    <div className="h-8 w-3/4 bg-indigo-500/20 rounded-lg animate-pulse mb-8"></div>
                    {[1,2,3,4,5,6].map(i => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded bg-white/5"></div>
                            <div className="h-4 w-2/3 bg-white/5 rounded"></div>
                        </div>
                    ))}
                 </div>
                 {/* Main */}
                 <div className="col-span-12 md:col-span-11 lg:col-span-10 p-8 overflow-hidden relative">
                    {/* Floating UI Elements */}
                    <div className="absolute top-20 right-20 z-20 glass-card p-4 rounded-xl animate-float shadow-2xl" style={{animationDelay: '1s'}}>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5 text-green-400" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400">Payment Received</p>
                                <p className="font-bold font-display">$12,450.00</p>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-32 left-10 z-20 glass-card p-4 rounded-xl animate-float shadow-2xl" style={{animationDelay: '2s'}}>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                                <Bot className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400">AI Suggestion</p>
                                <p className="font-bold font-display text-sm">Add Kyoto Day Trip?</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-full bg-slate-900/50 rounded-xl border border-white/5 p-6 backdrop-blur-sm">
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <div className="h-4 w-32 bg-white/10 rounded mb-2"></div>
                                <div className="h-10 w-64 bg-white/10 rounded"></div>
                            </div>
                            <div className="h-10 w-32 bg-indigo-600 rounded shadow-lg shadow-indigo-600/20"></div>
                        </div>
                        <div className="grid grid-cols-3 gap-6">
                            {[1,2,3].map(i => (
                                <div key={i} className="h-40 bg-white/5 rounded-xl border border-white/5 relative overflow-hidden group/card hover:border-indigo-500/30 transition-colors">
                                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-indigo-500/10 to-transparent"></div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 h-64 bg-white/5 rounded-xl border border-white/5"></div>
                    </div>
                 </div>
              </div>
            </div>
            
            {/* Reflection */}
            <div className="absolute -bottom-20 left-4 right-4 h-20 bg-linear-to-t from-transparent to-indigo-600/20 blur-xl opacity-50 transform scale-x-90"></div>
          </div>
        </div>
      </section>

      {/* Trusted By Marquee */}
      <section className="py-10 border-y border-white/5 bg-slate-950/50 backdrop-blur-sm relative z-20">
        <p className="text-center text-sm font-medium text-slate-500 mb-8 uppercase tracking-widest">Powering 2,000+ Modern Agencies</p>
        <div className="overflow-hidden whitespace-nowrap mask-linear-gradient">
            <div className="marquee-inner inline-block">
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="inline-flex items-center gap-20 mx-10 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                        {['Expedia', 'Airbnb', 'Booking.com', 'TripAdvisor', 'Skyscanner', 'Uber', 'Marriott'].map(brand => (
                            <span key={brand} className="text-2xl font-display font-bold hover:text-white transition-colors cursor-default">{brand}</span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Workflow Parallax Section */}
      <section ref={workflowRef} id="workflow" className="relative min-h-screen bg-slate-950 py-24 border-b border-white/5 z-20">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center h-full">
            {/* Left Content (Pinned via GSAP) */}
            <div className="h-[500px] flex flex-col justify-center relative perspective-1000">
               
               {/* STEP 1 TEXT */}
               <div className="workflow-1 absolute inset-0 flex flex-col justify-center bg-slate-950">
                   <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-8 border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                       <Sparkles className="w-8 h-8 text-blue-400" />
                   </div>
                   <h2 className="text-4xl lg:text-5xl font-bold font-display mb-6 leading-tight">Capture & <br/><span className="text-blue-400">Qualify Instantly.</span></h2>
                   <p className="text-lg text-slate-400 leading-relaxed">
                       Stop manually grading leads. Our AI scores every incoming request, enriches profile data, and suggests the perfect package match instantly.
                   </p>
               </div>

               {/* STEP 2 TEXT */}
               <div className="workflow-2 absolute inset-0 flex flex-col justify-center opacity-0 bg-slate-950 transform translate-y-10">
                   <div className="w-16 h-16 bg-fuchsia-500/20 rounded-2xl flex items-center justify-center mb-8 border border-fuchsia-500/30 shadow-[0_0_30px_rgba(217,70,239,0.2)]">
                       <Map className="w-8 h-8 text-fuchsia-400" />
                   </div>
                   <h2 className="text-4xl lg:text-5xl font-bold font-display mb-6 leading-tight">Plan Visually <br/><span className="text-fuchsia-400">in 3 Dimensions.</span></h2>
                   <p className="text-lg text-slate-400 leading-relaxed">
                       Drag, drop, and dream. Build stunning day-by-day itineraries on a 3D globe. Add flights, hotels, and experiences with real-time availability.
                   </p>
               </div>

               {/* STEP 3 TEXT */}
               <div className="workflow-3 absolute inset-0 flex flex-col justify-center opacity-0 bg-slate-950 transform translate-y-10">
                   <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-8 border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                       <CreditCard className="w-8 h-8 text-emerald-400" />
                   </div>
                   <h2 className="text-4xl lg:text-5xl font-bold font-display mb-6 leading-tight">Get Paid <br/><span className="text-emerald-400">Faster Than Ever.</span></h2>
                   <p className="text-lg text-slate-400 leading-relaxed">
                       Automated invoicing, payment reminders, and revenue forecasting. Handle multi-currency deposits and split payments effortlessly.
                   </p>
               </div>
            </div>

            {/* Right Visuals Container */}
            <div className="relative h-[600px] w-full bg-slate-900 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
               <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-800 to-indigo-900/20 z-0">
                   <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
               </div>
               
               {/* --- VISUAL 1: LEAD INTELLIGENCE --- */}
               <div className="workflow-1 absolute inset-0 flex items-center justify-center p-8 z-10">
                   <div className="w-full max-w-sm bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                       <div className="h-2 bg-linear-to-r from-blue-500 to-indigo-600"></div>
                       <div className="p-6">
                           <div className="flex justify-between items-start mb-6">
                               <div className="flex gap-4">
                                   <div className="w-12 h-12 rounded-full bg-slate-800 border border-white/10 overflow-hidden">
                                       <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" alt="Lead" className="w-full h-full object-cover" />
                                   </div>
                                   <div>
                                       <h4 className="font-bold text-white">Sarah Miller</h4>
                                       <p className="text-xs text-slate-400">Potential Client • 2 mins ago</p>
                                   </div>
                               </div>
                               <div className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded animate-pulse">High Intent</div>
                           </div>
                           
                           <div className="space-y-3">
                               <div className="flex items-center justify-between">
                                   <span className="text-sm text-slate-400">Lead Score</span>
                                   <span className="text-lg font-bold text-blue-400">92/100</span>
                               </div>
                               <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                   <div className="h-full bg-blue-500 w-[92%] animate-pulse"></div>
                               </div>
                               <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg flex gap-3">
                                   <Bot className="w-5 h-5 text-blue-400 shrink-0" />
                                   <p className="text-xs text-blue-200">Recommendation: Send "Spring in Kyoto" luxury package immediately.</p>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>

               {/* --- VISUAL 2: MAP PLANNER --- */}
               <div className="workflow-2 absolute inset-0 flex items-center justify-center p-8 z-10 opacity-0 transform scale-110">
                   <div className="w-full max-w-md bg-slate-900 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                       <div className="h-48 bg-slate-800 relative overflow-hidden">
                           <div className="absolute inset-0 opacity-50 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/139.6917,35.6895,9,0/600x300?access_token=pk.eyJ1IjoidGVtcCIsImEiOiJjbHJsIn0.temp')] bg-cover bg-center grayscale"></div>
                           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-fuchsia-500 rounded-full ring-4 ring-fuchsia-500/30 animate-ping"></div>
                       </div>
                       <div className="p-4 bg-slate-900/90 backdrop-blur-xl relative -mt-4 rounded-t-2xl border-t border-white/10">
                           <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                               <MapPin className="w-4 h-4 text-fuchsia-500" />
                               Tokyo & Kyoto Explorer
                           </h4>
                           <div className="space-y-3">
                               <div className="flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                                   <div className="w-10 h-10 rounded bg-fuchsia-500 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-fuchsia-500/30">D2</div>
                                   <div className="flex-1">
                                       <p className="text-sm font-medium text-white">Shibuya Sky Tour</p>
                                       <p className="text-xs text-slate-400">02:00 PM • Guided</p>
                                   </div>
                                   <div className="h-2 w-2 rounded-full bg-green-500"></div>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>

               {/* --- VISUAL 3: PAYMENTS --- */}
               <div className="workflow-3 absolute inset-0 flex items-center justify-center p-8 z-10 opacity-0 transform scale-110">
                   <div className="relative w-full max-w-sm">
                       {/* Floating Credit Card */}
                       <div className="absolute -top-12 -right-4 w-48 h-32 bg-linear-to-br from-emerald-400 to-teal-600 rounded-xl shadow-2xl transform rotate-12 z-0 border border-white/20 p-4 flex flex-col justify-between animate-float">
                           <div className="flex justify-between items-start">
                               <div className="w-8 h-5 bg-white/20 rounded"></div>
                               <div className="text-white/80 font-mono text-xs">DEBIT</div>
                           </div>
                           <div>
                               <div className="text-white font-mono text-sm tracking-widest mb-1">•••• 4242</div>
                               <div className="text-white/60 text-[10px]">ALEX JOHNSON</div>
                           </div>
                       </div>
                       
                       {/* Payment Dashboard Card */}
                       <div className="relative z-10 bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl">
                           <div className="text-center py-6 border-b border-white/5">
                               <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                   <DollarSign className="w-8 h-8 text-emerald-400" />
                               </div>
                               <h2 className="text-3xl font-bold text-white mb-1">$4,250.00</h2>
                               <p className="text-sm text-emerald-400 font-medium">Payment Received</p>
                           </div>
                       </div>
                   </div>
               </div>

            </div>
         </div>
      </section>

      {/* Feature Bento Grid */}
      <section ref={featureRef} id="features" className="py-32 relative bg-slate-950 z-20">
        <div className="max-w-7xl mx-auto px-6 relative">
           <div className="text-center mb-20">
              <span className="text-indigo-400 font-semibold tracking-wider text-sm uppercase">Unfair Advantage</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-4 font-display">Everything you need to <br/> dominate the market</h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[350px]">
              {/* Feature 1: AI */}
              <div className="feature-card md:col-span-2 glass-card rounded-4xl p-10 relative overflow-hidden group hover:border-indigo-500/30 transition-all duration-500 opacity-0 translate-y-10 hover:shadow-[0_0_50px_rgba(79,70,229,0.1)]">
                 <div className="absolute top-0 right-0 p-12 opacity-50 group-hover:opacity-80 transition-opacity duration-500 transform group-hover:scale-110">
                    <Bot className="w-80 h-80 text-indigo-500/5 rotate-12" />
                 </div>
                 <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                        <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center mb-6 border border-indigo-500/30">
                            <Sparkles className="w-7 h-7 text-indigo-400" />
                        </div>
                        <h3 className="text-3xl font-bold mb-4 font-display">Generative AI Core</h3>
                        <p className="text-slate-400 max-w-md text-lg">Built-in Gemini models to score leads, write itineraries, and suggest dynamic pricing packages instantly.</p>
                    </div>
                 </div>
              </div>

              {/* Feature 2: Maps */}
              <div className="feature-card glass-card rounded-4xl p-10 relative overflow-hidden group hover:border-amber-500/30 transition-all duration-500 opacity-0 translate-y-10">
                 <div className="absolute inset-0 bg-linear-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center mb-6 border border-amber-500/30">
                        <Map className="w-7 h-7 text-amber-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 font-display">3D Maps</h3>
                    <p className="text-slate-400 text-lg">Visualize destinations with immersive 3D globes and integrated booking overlays.</p>
                 </div>
              </div>

              {/* Feature 3: Finance */}
              <div className="feature-card glass-card rounded-4xl p-10 relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-500 opacity-0 translate-y-10">
                 <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-6 border border-emerald-500/30">
                        <CreditCard className="w-7 h-7 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 font-display">Global Pay</h3>
                    <p className="text-slate-400 text-lg">Multi-currency invoicing and automated payment reminders powered by Stripe.</p>
                 </div>
              </div>

               {/* Feature 4: Dashboard */}
               <div className="feature-card md:col-span-2 glass-card rounded-4xl p-10 relative overflow-hidden group flex items-center hover:border-pink-500/30 transition-all duration-500 opacity-0 translate-y-10">
                 <div className="w-full md:w-1/2 relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-pink-500/20 flex items-center justify-center mb-6 border border-pink-500/30">
                        <LayoutDashboard className="w-7 h-7 text-pink-400" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4 font-display">Command Center</h3>
                    <p className="text-slate-400 text-lg">A unified dashboard to track leads, guide allocations, and revenue streams in real-time.</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Testimonials */}
      {/* <section id="testimonials" className="py-24 border-t border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16 font-display">Loved by top agents</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { text: "TripSync completely transformed how we handle luxury bookings. The AI suggestions are uncannily accurate.", author: "Sarah Jenkins", role: "CEO, LuxTravel", stars: 5 },
                    { text: "I used to spend 4 hours on a proposal. Now it takes 15 minutes. The 3D map feature blows clients away.", author: "Marcus Chen", role: "Senior Agent", stars: 5 },
                    { text: "The best CRM for travel, period. The automated payment chasing alone paid for the subscription.", author: "Elena Rodriguez", role: "Founder, Wanderlust", stars: 5 }
                ].map((testimonial, i) => (
                    <div key={i} className="bg-slate-900 border border-white/10 p-8 rounded-2xl hover:bg-slate-800 transition-colors hover:-translate-y-2 duration-300">
                        <div className="flex gap-1 mb-4">
                            {[...Array(testimonial.stars)].map((_, j) => (
                                <Star key={j} className="w-4 h-4 text-amber-500 fill-amber-500" />
                            ))}
                        </div>
                        <p className="text-slate-300 mb-6 leading-relaxed">"{testimonial.text}"</p>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-linear-to-br from-slate-700 to-slate-600"></div>
                            <div>
                                <p className="font-bold text-sm">{testimonial.author}</p>
                                <p className="text-xs text-slate-500">{testimonial.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section> */}

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-slate-950 border-t border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 font-display">Simple, Transparent Pricing</h2>
              <p className="text-slate-400 text-lg">Start free, upgrade when you scale.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'Starter', price: '$0', desc: 'Perfect for solo agents', features: ['5 Active Itineraries', 'Basic CRM', 'Email Support'] },
                { name: 'Pro', price: '$49', desc: 'For growing agencies', features: ['Unlimited Itineraries', 'AI Assistant', 'Payment Gateway', 'Priority Support'], popular: true },
                { name: 'Enterprise', price: '$199', desc: 'Maximum power & scale', features: ['Custom API', 'White Labeling', 'Dedicated Account Manager', 'SLA'] },
              ].map((plan, i) => (
                  <div key={i} className={`p-8 rounded-4xl border ${plan.popular ? 'bg-indigo-900/10 border-indigo-500 ring-1 ring-indigo-500/50 relative' : 'bg-transparent border-white/10'} hover:bg-white/5 transition-all duration-300 hover:-translate-y-2 group`}>
                      {plan.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-xs font-bold rounded-full uppercase tracking-wide shadow-lg shadow-indigo-500/40">Most Popular</div>}
                      <h3 className="text-xl font-semibold mb-2 font-display">{plan.name}</h3>
                      <div className="flex items-baseline gap-1 mb-4">
                        <span className="text-5xl font-bold tracking-tight group-hover:text-indigo-400 transition-colors">{plan.price}</span>
                        <span className="text-slate-500">/mo</span>
                      </div>
                      <p className="text-slate-400 text-sm mb-8">{plan.desc}</p>
                      <ul className="space-y-4 mb-8">
                        {plan.features.map(f => (
                            <li key={f} className="flex items-center gap-3 text-sm text-slate-300">
                                <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                                {f}
                            </li>
                        ))}
                      </ul>
                      {/* <Link to="/login" className={`block w-full py-4 rounded-xl text-center font-bold transition-all ${plan.popular ? 'bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-900/20 hover:shadow-indigo-500/40' : 'bg-white/10 hover:bg-white/20'}`}>
                        Choose {plan.name}
                      </Link> */}
                  </div>
              ))}
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden z-20">
          <div className="absolute inset-0 bg-indigo-600/10"></div>
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
              <h2 className="text-5xl md:text-7xl font-bold font-display mb-8">Ready for takeoff?</h2>
              <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">Join thousands of modern travel agents building the future of travel planning today.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  {/* <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-indigo-50 transition-colors hover:scale-105 active:scale-95">
                      Get Started for Free
                  </Link> */}
                  <button className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
                      DEMO
                  </button>
              </div>
          </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-slate-950 relative z-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
                <Globe2 className="w-6 h-6 text-indigo-500" />
                <span className="font-bold text-lg font-display">TripSync</span>
            </div>
            <div className="flex gap-8 text-sm text-slate-400">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
            <p className="text-slate-600 text-sm">© 2025 TripSync Inc.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
