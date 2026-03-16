import { useEffect, useRef, useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react'

// ── Get your FREE key at https://web3forms.com ──────────────────
// Enter abelink2119@gmail.com → Create Access Key → verify email
const WEB3FORMS_KEY = 'f0a7b262-2116-4ce7-999b-dac6505e892f'
// ────────────────────────────────────────────────────────────────

const contactInfo = [
  { Icon: Mail,   label: 'Email',    value: 'abelink2119@gmail.com', href: 'mailto:abelink2119@gmail.com' },
  { Icon: Phone,  label: 'Phone',    value: '+251-948-102-787',      href: 'tel:+251948102787' },
  { Icon: MapPin, label: 'Location', value: 'Addis Ababa, Ethiopia', href: 'https://maps.google.com/?q=Addis+Ababa,Ethiopia' },
]

// SVG social icons — no deprecated lucide icons needed
const SocialLinks = ({ dark }) => (
  <div className="flex gap-3">
    {/* LinkedIn */}
    <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"
      className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 ${dark ? 'border-white/20 text-gray-400 hover:border-violet-500 hover:text-violet-400 hover:bg-violet-500/10' : 'border-gray-300 text-gray-500 hover:border-violet-400 hover:text-violet-600 hover:bg-violet-50'}`}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
    </a>
    {/* Twitter / X */}
    <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"
      className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 ${dark ? 'border-white/20 text-gray-400 hover:border-violet-500 hover:text-violet-400 hover:bg-violet-500/10' : 'border-gray-300 text-gray-500 hover:border-violet-400 hover:text-violet-600 hover:bg-violet-50'}`}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    </a>
    {/* Instagram */}
    <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"
      className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 ${dark ? 'border-white/20 text-gray-400 hover:border-violet-500 hover:text-violet-400 hover:bg-violet-500/10' : 'border-gray-300 text-gray-500 hover:border-violet-400 hover:text-violet-600 hover:bg-violet-50'}`}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
    </a>
    {/* GitHub */}
    <a href="https://github.com/Abelink2119" target="_blank" rel="noreferrer" aria-label="GitHub"
      className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 ${dark ? 'border-white/20 text-gray-400 hover:border-violet-500 hover:text-violet-400 hover:bg-violet-500/10' : 'border-gray-300 text-gray-500 hover:border-violet-400 hover:text-violet-600 hover:bg-violet-50'}`}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
    </a>
  </div>
)

export default function ContactSection({ theme }) {
  const dark = theme === 'dark'
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [emailError, setEmailError] = useState('')

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isValidEmail(form.email)) {
      setEmailError('Please enter a valid email (e.g. you@gmail.com)')
      return
    }
    setEmailError('')
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio message from ${form.name}`,
          name: form.name,
          email: form.email,
          message: form.message,
          botcheck: '',
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
        setEmailError('')
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        throw new Error(data.message)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const inputCls = `w-full px-4 py-3 rounded-lg text-sm outline-none border transition-colors duration-200 ${
    dark
      ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-violet-500'
      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-violet-500 focus:bg-white'
  }`

  return (
    <section id="contact" className="relative z-10 py-28 px-6">
      <div
        ref={ref}
        className={`max-w-5xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <h2 className={`text-4xl md:text-5xl font-bold text-center mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>
          Get In <span className="text-violet-400">Touch</span>
        </h2>
        <p className={`text-center mb-14 max-w-xl mx-auto leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
          Have a project in mind or want to collaborate? Feel free to reach out.
          I&apos;m always open to discussing new opportunities.
        </p>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Left — contact info */}
          <div>
            <h3 className={`text-xl font-semibold mb-7 ${dark ? 'text-white' : 'text-gray-900'}`}>
              Contact Information
            </h3>
            <div className="flex flex-col gap-5 mb-10">
              {contactInfo.map(({ Icon, label, value, href }) => (
                <a key={label} href={href} target={label === 'Location' ? '_blank' : undefined}
                  rel={label === 'Location' ? 'noreferrer' : undefined}
                  className="flex items-center gap-4 group">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    dark ? 'bg-violet-500/20 text-violet-400 group-hover:bg-violet-500/40' : 'bg-violet-100 text-violet-600 group-hover:bg-violet-200'
                  }`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className={`text-xs mb-0.5 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>{label}</p>
                    <p className={`text-sm font-medium transition-colors ${dark ? 'text-white group-hover:text-violet-400' : 'text-gray-900 group-hover:text-violet-600'}`}>{value}</p>
                  </div>
                </a>
              ))}
            </div>
            <p className={`text-sm mb-4 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>· Connect With Me</p>
            <SocialLinks dark={dark} />
          </div>

          {/* Right — form */}
          <div className={`p-7 rounded-2xl border relative overflow-hidden ${
            dark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-sm'
          }`}>

            {/* ── Success overlay ── */}
            {status === 'success' && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl bg-[#0a0a0f]/95 backdrop-blur-sm px-8 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center mb-4">
                  <CheckCircle size={32} className="text-green-400" />
                </div>
                <h4 className="text-white text-xl font-bold mb-2">Message Sent!</h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Thank you for reaching out. Abel will review your message and get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2 rounded-full bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 text-sm font-medium transition-all duration-200"
                >
                  Send Another Message
                </button>
              </div>
            )}

            {/* ── Error overlay ── */}
            {status === 'error' && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl bg-[#0a0a0f]/95 backdrop-blur-sm px-8 text-center">
                <div className="w-16 h-16 rounded-full bg-red-500/15 flex items-center justify-center mb-4">
                  <AlertCircle size={32} className="text-red-400" />
                </div>
                <h4 className="text-white text-xl font-bold mb-2">Something Went Wrong</h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Your message could not be delivered. Please check your connection and try again, or email directly at{' '}
                  <a href="mailto:abelink2119@gmail.com" className="text-violet-400 hover:underline">
                    abelink2119@gmail.com
                  </a>
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2 rounded-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 text-sm font-medium transition-all duration-200"
                >
                  Try Again
                </button>
              </div>
            )}

            <h3 className={`text-lg font-semibold mb-6 text-center ${dark ? 'text-white' : 'text-gray-900'}`}>
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className={`block text-xs mb-1.5 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>Your Name</label>
                <input
                  name="name"
                  autoComplete="name"
                  className={inputCls}
                  placeholder="Your Name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className={`block text-xs mb-1.5 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>Your Email</label>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  className={`w-full px-4 py-3 rounded-lg text-sm outline-none border transition-colors duration-200 ${
                    emailError
                      ? 'border-red-500 bg-red-500/5 text-red-400 placeholder-red-400/50 focus:border-red-500'
                      : dark
                        ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-violet-500'
                        : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-violet-500 focus:bg-white'
                  }`}
                  placeholder="you@gmail.com"
                  value={form.email}
                  onChange={e => {
                    const val = e.target.value
                    setForm({ ...form, email: val })
                    if (emailError && isValidEmail(val)) setEmailError('')
                  }}
                />
                {emailError && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                    {emailError}
                  </p>
                )}
              </div>
              <div>
                <label className={`block text-xs mb-1.5 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>Your Message</label>
                <textarea
                  name="message"
                  rows={4}
                  className={inputCls}
                  placeholder="Hello, I'd like to talk about..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-3 rounded-full bg-violet-600 hover:bg-violet-500 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer mt-1"
              >
                {status === 'sending'
                  ? <><Loader size={16} className="animate-spin" /> Sending...</>
                  : <><Send size={16} /> Send Message</>
                }
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
