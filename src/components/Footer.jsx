import { useState } from 'react'

const quickLinks = ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Certifications', 'Contact']
const services = ['Web Development', 'Mobile App Development', 'DevOps Consulting', 'Cloud Solutions', 'System Integration']

const SocialLinks = () => (
  <div className="flex gap-3 mt-4">
    <a href="https://github.com/Abelink2119" target="_blank" rel="noreferrer" aria-label="GitHub"
      className="w-9 h-9 rounded-full flex items-center justify-center border border-white/15 text-gray-400 hover:border-violet-500 hover:text-violet-400 transition-all">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
    </a>
    <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"
      className="w-9 h-9 rounded-full flex items-center justify-center border border-white/15 text-gray-400 hover:border-violet-500 hover:text-violet-400 transition-all">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
    </a>
    <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"
      className="w-9 h-9 rounded-full flex items-center justify-center border border-white/15 text-gray-400 hover:border-violet-500 hover:text-violet-400 transition-all">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    </a>
    <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"
      className="w-9 h-9 rounded-full flex items-center justify-center border border-white/15 text-gray-400 hover:border-violet-500 hover:text-violet-400 transition-all">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
    </a>
  </div>
)

const WEB3FORMS_KEY = 'f0a7b262-2116-4ce7-999b-dac6505e892f'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subStatus, setSubStatus] = useState('idle') // idle | sending | done | error

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email.includes('@')) return
    setSubStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: 'New Newsletter Subscriber',
          name: 'Newsletter Subscriber',
          email,
          message: `New subscriber: ${email}`,
          botcheck: '',
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSubStatus('done')
        setEmail('')
        setTimeout(() => setSubStatus('idle'), 4000)
      } else throw new Error()
    } catch {
      setSubStatus('error')
      setTimeout(() => setSubStatus('idle'), 4000)
    }
  }

  const go = (id) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="relative z-10 bg-[#080810] border-t border-white/8 pt-14 pb-6 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Col 1 — Brand */}
          <div>
            <h3 className="text-violet-400 font-bold text-lg mb-3">Abel Assefa</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-1">
              Software Engineer, Full Stack &amp; Mobile Developer, DevOps Engineer, and Solution Architect building scalable solutions with modern technologies.
            </p>
            <SocialLinks />
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map(l => (
                <li key={l}>
                  <button onClick={() => go(l)}
                    className="text-gray-400 hover:text-violet-400 text-sm transition-colors cursor-pointer">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Services</h4>
            <ul className="flex flex-col gap-2.5">
              {services.map(s => (
                <li key={s} className="text-gray-400 text-sm">{s}</li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Newsletter */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Subscribe to receive updates on my latest projects and tech articles.
            </p>
            {subStatus === 'done' ? (
              <p className="text-violet-400 text-sm font-medium">✓ Thanks for subscribing!</p>
            ) : subStatus === 'error' ? (
              <p className="text-red-400 text-sm">Failed to subscribe. Try again.</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm rounded-l-lg bg-white/8 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-violet-500 transition-colors"
                  required
                />
                <button type="submit"
                  disabled={subStatus === 'sending'}
                  className="px-4 py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white text-sm font-semibold rounded-r-lg transition-colors cursor-pointer whitespace-nowrap">
                  {subStatus === 'sending' ? '...' : 'Subscribe'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">© 2026 Abel Assefa. All rights reserved.</p>
          <div className="flex gap-5">
            <span className="text-gray-500 text-xs hover:text-gray-300 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="text-gray-500 text-xs hover:text-gray-300 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
