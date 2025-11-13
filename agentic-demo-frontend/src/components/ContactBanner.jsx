import React from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Mail, Sparkles } from 'lucide-react'

export default function ContactBanner() {
  const bannerRef = React.useRef(null);
  const [dismissed, setDismissed] = React.useState(()=>{
    try { return typeof window !== 'undefined' && window.localStorage && window.localStorage.getItem('bannerDismissed') === '1'; } catch { return false }
  });

  React.useEffect(() => {
    const setBannerVar = () => {
      const el = bannerRef.current;
      if (!el || typeof window === 'undefined') return;
      const h = dismissed ? 0 : el.offsetHeight;
      document.documentElement.style.setProperty('--banner-h', `${h}px`);
    };

    setBannerVar();
    window.addEventListener('resize', setBannerVar);
    window.addEventListener('orientationchange', setBannerVar);
    return () => {
      window.removeEventListener('resize', setBannerVar);
      window.removeEventListener('orientationchange', setBannerVar);
    };
  }, [dismissed]);

  const close = () => {
    try { window.localStorage.setItem('bannerDismissed','1'); } catch {}
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <motion.div
      ref={bannerRef}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Desktop / large tablet banner (rich) */}
      <div className="hidden sm:block bg-gradient-to-r from-indigo-600 to-pink-500">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-md flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-white uppercase tracking-wider">Production-Ready AI Solutions</div>
              </div>
            </div>

            {/* Inline email only, no Contact button as requested */}
            <div className="flex items-center gap-3">
              <div className="text-sm text-white/90 tabular-nums">vjeai.tech@gmail.com</div>
              <button onClick={close} aria-label="Dismiss banner" className="ml-2 p-2 rounded-md bg-white/10 inline-flex items-center justify-center">
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: intentionally hide compact email banner to reduce clutter on small screens */}
    </motion.div>
  )
}
