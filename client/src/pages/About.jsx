import React, {
  memo,
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import TargetCursor from "../components/TargetCursor";
import coffeeBg from "../assets/coffee-bg.jpg";

const Lottie = lazy(() => import("lottie-react"));

/* ✅ CoffeeBean (memoized, uses pure CSS animation) */
const CoffeeBean = memo(({ style, size }) => (
  <div
    className={`absolute pointer-events-none animate-bean-float ${size}`}
    style={style}
    aria-hidden
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#d4a76a"
      className="opacity-70 drop-shadow-lg"
    >
      <path d="M12 2C7 2 2 7 2 12s5 10 10 10 10-5 10-10S17 2 12 2zm1 17.93c-1.78.46-3.63-.15-4.95-1.47-1.33-1.33-1.94-3.17-1.48-4.96.1-.38.64-.42.83-.06.65 1.22 1.77 2.33 2.99 2.99.36.19.32.73-.07.83-.11.03-.21.06-.32.1z" />
    </svg>
  </div>
));

/* ✅ Stat counter (memoized with RAF animation) */
const Stat = memo(({ label, target, start, duration = 1500 }) => {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!start) return;
    let startTime = null;

    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [start, target, duration]);

  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-3xl sm:text-4xl font-extrabold text-[#ffdca6]">
        {value}
        {label.includes("%") ? "%" : ""}
      </div>
      <div className="text-sm text-white/80 mt-1">{label}</div>
    </div>
  );
});

const About = () => {
  const lottieWrapRef = useRef(null);
  const [showLottie, setShowLottie] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const [statsStart, setStatsStart] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  /* ✅ Pre-generate coffee bean positions (runs once) */
  const beans = useRef(
    Array.from({ length: 6 }).map(() => ({
      top: `${Math.random() * 92 + 2}%`,
      left: `${Math.random() * 92 + 2}%`,
      size: Math.random() > 0.6 ? "w-4 h-4" : "w-6 h-6",
      rotate: `${Math.random() * 360}deg`,
    }))
  ).current;

  /* ✅ IntersectionObserver to trigger Lottie + stats */
  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowLottie(true);
          setStatsStart(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    if (lottieWrapRef.current) io.observe(lottieWrapRef.current);
    return () => io.disconnect();
  }, []);

  /* ✅ Lazy load Lottie JSON only when needed */
  useEffect(() => {
    if (showLottie && !animationData) {
      import("../assets/about.json").then((mod) =>
        setAnimationData(mod.default || mod)
      );
    }
  }, [showLottie, animationData]);

  /* ✅ Scroll listener (progress + back-to-top) */
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setShowTopBtn(scrollY > 400);

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initialize
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans flex flex-col bg-[#0f0a06] text-amber-50 relative">
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 h-1 z-50 transition-all"
        style={{
          width: `${scrollProgress}%`,
          background: "linear-gradient(90deg,#ffdca6,#d4a76a)",
        }}
      />

      <TargetCursor />
      <Header />

      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={coffeeBg}
          alt="Coffee background"
          loading="lazy"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0a06]/90 via-[#0f0a06]/70 to-[#2c1c12]/60 backdrop-blur-[2px]" />
      </div>

      {/* Floating beans */}
      {beans.map((b, i) => (
        <CoffeeBean
          key={i}
          size={b.size}
          style={{
            top: b.top,
            left: b.left,
            transform: `rotate(${b.rotate})`,
          }}
        />
      ))}

      <main className="relative z-10 flex-1 flex items-center p-6 sm:p-10">
        <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-stretch gap-8 rounded-[2rem] border border-[#d4a76a]/25 bg-gradient-to-b from-white/3 to-white/2 p-6 sm:p-10 shadow-[0_0_60px_rgba(0,0,0,0.45)]">
          {/* LEFT SIDE */}
          <section className="lg:w-1/2 flex flex-col justify-center gap-6">
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-[#ffdca6] via-[#d4a76a] to-[#7a4a23]">
              About Us
            </h1>
            <p className="text-lg text-amber-100">
              At{" "}
              <span className="text-[#d4a76a] font-semibold">COFFEE HOUSE</span>
              , every cup tells a story. We source responsibly, roast
              thoughtfully, and brew with care — creating cozy moments, one cup
              at a time.
            </p>
            <p className="text-base text-amber-100/80">
              Stop by for an espresso, a slow pour, or a friendly chat — we're
              here to make your day warmer.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-2">
              {[
                { label: "Years", target: 6 },
                { label: "Beans Roasted", target: 1200 },
                { label: "Cups Served", target: 32000 },
              ].map((s, i) => (
                <div
                  key={i}
                  className="bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/6"
                >
                  <Stat label={s.label} target={s.target} start={statsStart} />
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-4">
              <Link
                to="/Menu"
                className="px-6 py-2 rounded-full bg-gradient-to-r from-[#d4a76a] to-[#ffdcaa] text-black font-semibold shadow hover:scale-105 transition-transform"
              >
                View Menu
              </Link>
              <Link
                to="/contact"
                className="px-6 py-2 rounded-full border border-amber-100/10 text-amber-100 font-medium hover:bg-amber-100/5"
              >
                Contact Us
              </Link>
            </div>
          </section>

          {/* RIGHT SIDE (Lottie) */}
          <aside className="lg:w-1/2 flex items-center justify-center">
            <div
              ref={lottieWrapRef}
              className="relative w-full max-w-md h-[380px] sm:h-[480px] rounded-xl overflow-hidden border border-amber-100/6 p-2"
            >
              {!animationData && showLottie && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-black/20 to-white/2">
                  <div className="w-32 h-32 rounded-md animate-pulse bg-gradient-to-r from-[#d4a76a]/20 to-[#ffdca6]/10 text-amber-100/60 flex items-center justify-center">
                    Loading...
                  </div>
                </div>
              )}

              {animationData ? (
                <Suspense
                  fallback={
                    <div className="text-amber-100">Loading animation...</div>
                  }
                >
                  <Lottie animationData={animationData} loop autoplay />
                </Suspense>
              ) : (
                !showLottie && (
                  <div className="w-full h-full flex items-center justify-center text-amber-100/60">
                    <div className="text-center">
                      <div className="text-lg font-semibold">
                        Our story in motion
                      </div>
                      <div className="text-sm mt-2 text-amber-100/50">
                        Scroll to see the animation
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </aside>
        </div>
      </main>

      {/* Back to top button */}
      {showTopBtn && (
        <button
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
          className="fixed right-6 bottom-6 z-50 bg-[#d4a76a] text-black p-3 rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          ↑
        </button>
      )}

      {/* Floating bean CSS animation */}
      <style>{`
        @keyframes beanFloat {
          0% { transform: translateY(0) rotate(var(--rotate)); opacity: 0.6; }
          50% { transform: translateY(-20px) rotate(var(--rotate)); opacity: 1; }
          100% { transform: translateY(0) rotate(var(--rotate)); opacity: 0.6; }
        }
        .animate-bean-float {
          animation: beanFloat 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default About;
