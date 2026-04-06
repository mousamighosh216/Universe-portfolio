import { useState } from 'react'
import SectionHeader from '@components/SectionHeader'
import emailjs from "emailjs-com"

const SOCIALS = [
  { name: 'LinkedIn',  dot: 'bg-coral',        href: '#' },
  { name: 'Twitter',  dot: 'bg-violet-light',  href: '#' },
  { name: 'Instagram',   dot: 'bg-coral-light',   href: '#' },
]

const INFO = [
  { icon: '@',  label: 'Email',       val: 'hello@kuniverse.space' },
  { icon: '→',  label: 'Location',    val: 'Somewhere in the cosmos' },
  { icon: '◎',  label: 'Available for', val: 'Freelance · Collabs · Commissions' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', type: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const handleSubmit = e => {
    e.preventDefault()
    setSent(true)
    // todo: add data
    emailjs.send(
      "YOUR_SERVICE_ID",
      "YOUR_TEMPLATE_ID",
      form,
      "YOUR_PUBLIC_KEY"
    ) .then(() => {
      alert("Message sent 🚀")
      setForm({ name: "", email: "", message: "" })
      setLoading(false)
    }) .catch(() => {
      alert("Something went wrong ❌")
      setLoading(false)
    })
  }

  return (
    <div id="contact" className="pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-24">
      <div className="max-w-[1000px] mx-auto px-5 sm:px-8 lg:px-12">

        <SectionHeader
          eyebrow="Contact"
          title="Send a<br/><em class='text-coral not-italic'>transmission</em>"
        />

        {/* Stacked on mobile, side-by-side on lg+ */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-20 mt-12 lg:mt-16">

          {/* Info + socials */}
          <div className=" reveal reveal-delay-2">
            {INFO.map(({ icon, label, val }) => (
              <div key={label} className="flex items-start gap-4 mb-6 sm:mb-8">
                <div className="w-8 h-8 sm:w-9 sm:h-9 border border-navy-pale/12 flex items-center justify-center flex-shrink-0 text-violet-light font-display text-[.52rem]">
                  {icon}
                </div>
                <div className='backdrop-blur-sm'>
                  <div className="font-display text-[.5rem] tracking-[.16em] uppercase text-navy-pale/60 mb-1">{label}</div>
                  <div className="font-body text-[.78rem] sm:text-[.82rem] tracking-[.03em] text-white">{val}</div>
                </div>
              </div>
            ))}

            <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-6 sm:mt-8">
              {SOCIALS.map(({ name, dot, href }) => (
                <a key={name} href={href}
                  className="flex hover:text-white  backdrop-blur-sm items-center gap-2 sm:gap-3 border border-navy-pale/12 px-3 sm:px-4 py-2.5 sm:py-3 hover:border-violet/40 hover:bg-violet/[.06] transition-all no-underline">
                  <span className={`w-[6px] h-[6px] rounded-full flex-shrink-0 ${dot}`}/>
                  <span className="font-display hover:text-white  text-[.5rem] sm:text-[.55rem] tracking-[.12em] text-whitw transition-colors">{name}</span>
                </a>
              ))}
            </div>

            <div className="hidden sm:block mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-navy-pale/10">
              <div className="font-display text-[.5rem] tracking-[.2em] uppercase text-navy-pale/30 mb-2">Galactic coordinates</div>
              <div className="font-display text-[.55rem] tracking-[.12em] text-navy-pale/20 leading-loose">
                <div>RA 17h 45m 40.04s</div>
                <div>Dec −29° 00′ 28.1″</div>
                <div>Sagittarius A*</div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="reveal reveal-delay-3">
            <div className="grid  grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
              <div>
                <label className="font-display text-[.5rem] tracking-[.18em] uppercase text-white block mb-2">Name</label>
                <input name="name" value={form.name} onChange={handleChange} className="ku-input" placeholder="Your name" type="text" required/>
              </div>
              <div>
                <label className="font-display text-[.5rem] tracking-[.18em] uppercase text-white block mb-2">Email</label>
                <input name="email" value={form.email} onChange={handleChange} className="ku-input" placeholder="your@email.com" type="email" required/>
              </div>
            </div>
            <div className="mb-4 sm:mb-5">
              <label className="font-display text-[.5rem] tracking-[.18em] uppercase text-white block mb-2">Subject</label>
              <input name="subject" value={form.subject} onChange={handleChange} className="ku-input" placeholder="What's this about?" type="text"/>
            </div>
            <div className="mb-4 sm:mb-5">
              <label className="font-display text-[.5rem] tracking-[.18em] uppercase text-white block mb-2">Project type</label>
              <input name="type" value={form.type} onChange={handleChange} className="ku-input" placeholder="Music · 3D · Design · All three" type="text"/>
            </div>
            <div className="mb-4 sm:mb-5">
              <label className="font-display text-[.5rem] tracking-[.18em] uppercase text-white block mb-2">Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} className="ku-textarea" placeholder="Tell me about your universe…"/>
            </div>
            <button type="submit"
              className="w-full backdrop-blur-sm flex items-center justify-center gap-3 font-display text-[.56rem] sm:text-[.6rem] tracking-[.18em] uppercase text-white border border-coral/45 py-3 hover:bg-coral hover:border-coral transition-all duration-250">
              {sent
                ? <><span>Transmission sent</span><span className="text-base">✓</span></>
                : <><span>Send Transmission</span><span className="text-base">→</span></>}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
