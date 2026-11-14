'use client';

import React, { useState } from 'react';
import { Mail, Phone, Download, ArrowUpRight, Check, Send, AlertCircle, FileText } from 'lucide-react';
import { Linkedin } from '@/components/ui/Icons';
import { siteConfig } from '@/content/site';
import { Toast } from '@/components/ui/Toast';
import { useResume } from '@/components/ui/ResumeContext';

export function Contact() {
  const { openResume, hasViewedResume } = useResume();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    _hp_company: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const copyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(siteConfig.email);
      setToastMessage(siteConfig.contact.toastCopySuccess);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '', _hp_company: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to send message.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. You can email dheeren438@gmail.com directly.');
    }
  };

  const directChannels = [
    {
      id: 'email',
      label: 'Email',
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      actionLabel: 'Click to copy',
      onClick: copyEmail,
      icon: Mail,
    },
    {
      id: 'phone',
      label: 'Phone',
      value: siteConfig.phone,
      href: `tel:${siteConfig.phone.replace(/\s+/g, '')}`,
      actionLabel: 'Direct line',
      icon: Phone,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      value: 'Connect on LinkedIn',
      href: siteConfig.urls.linkedin,
      actionLabel: 'Professional network',
      target: '_blank',
      icon: Linkedin,
    },
    {
      id: 'view-resume',
      label: 'Résumé',
      value: 'View Résumé (PDF)',
      href: '#view-resume',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        openResume();
      },
      actionLabel: 'Interactive viewer',
      icon: FileText,
    },
    ...(hasViewedResume
      ? [
          {
            id: 'download-resume',
            label: 'Download',
            value: 'Download Résumé (PDF)',
            href: siteConfig.urls.resume,
            actionLabel: 'Offline PDF copy',
            download: 'Dheeren_Resume.pdf',
            icon: Download,
          },
        ]
      : []),
  ];

  return (
    <section id="contact" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              {siteConfig.contact.eyebrow}
            </span>
            <h2 className="mt-2 font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-ink">
              {siteConfig.contact.heading}
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs text-ink-muted">
            {siteConfig.contact.subheading}
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Direct Communication Channels */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div className="flex flex-col divide-y divide-line border-y border-line">
              {directChannels.map((channel) => {
                const IconComponent = channel.icon;
                return (
                  <a
                    key={channel.id}
                    href={channel.href}
                    onClick={channel.onClick}
                    target={channel.target}
                    rel={channel.target ? 'noopener noreferrer' : undefined}
                    download={channel.download}
                    className="group relative overflow-hidden py-6 transition-colors"
                    data-cursor="Open"
                  >
                    {/* Background accent fill sliding in from left on hover */}
                    <div className="absolute inset-0 -translate-x-full bg-accent/10 transition-transform duration-300 ease-out group-hover:translate-x-0" />

                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-bg-elev text-accent transition-transform group-hover:scale-110">
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="block font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                            {channel.label}
                          </span>
                          <span className="font-serif text-lg text-ink transition-colors group-hover:text-accent">
                            {channel.value}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="hidden font-mono text-[10px] text-ink-muted sm:inline-block">
                          {channel.actionLabel}
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="mt-8 rounded-xl border border-line bg-bg-elev/40 p-4">
              <span className="font-mono text-xs text-ink-muted">
                Based in Bangalore, India (UTC+05:30). Open to on-site, hybrid, and remote internship opportunities.
              </span>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-line bg-bg-elev p-8 sm:p-10 md:p-12 shadow-xs">
              <h3 className="font-serif text-2xl font-normal text-ink">
                Send a direct note
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
                Feel free to inquire about my projects, availability, or analytical background.
              </p>

              {status === 'success' ? (
                <div className="mt-8 flex flex-col items-center justify-center rounded-xl border border-success/30 bg-success/10 p-8 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success text-white mb-3">
                    <Check className="h-6 w-6 stroke-[3]" />
                  </div>
                  <h4 className="font-serif text-xl text-ink">Message Received</h4>
                  <p className="mt-2 max-w-sm text-xs text-ink-muted">
                    Thank you for reaching out. I will review your note and respond as soon as possible.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 font-mono text-xs uppercase tracking-wider text-accent underline hover:opacity-80"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  {/* Honeypot field (hidden from humans) */}
                  <input
                    type="text"
                    name="_hp_company"
                    value={formData._hp_company}
                    onChange={(e) => setFormData({ ...formData, _hp_company: e.target.value })}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Name field */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block font-mono text-xs uppercase tracking-wider text-ink-muted"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-2 w-full rounded-lg border border-line bg-bg px-4 py-3 text-sm text-ink placeholder:text-ink-muted/50 focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block font-mono text-xs uppercase tracking-wider text-ink-muted"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-2 w-full rounded-lg border border-line bg-bg px-4 py-3 text-sm text-ink placeholder:text-ink-muted/50 focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Message field */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block font-mono text-xs uppercase tracking-wider text-ink-muted"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      placeholder="Tell me about your role, internship opportunity, or project..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mt-2 w-full rounded-lg border border-line bg-bg px-4 py-3 text-sm text-ink placeholder:text-ink-muted/50 focus:border-accent focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-700 dark:text-red-300">
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      <div>
                        <span>{errorMessage}</span>
                        <div className="mt-1">
                          <a
                            href={`mailto:${siteConfig.email}?subject=Inquiry from ${encodeURIComponent(formData.name || 'Portfolio')}&body=${encodeURIComponent(formData.message)}`}
                            className="font-medium underline hover:text-red-900"
                          >
                            Click here to send via mail client
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent py-3.5 font-mono text-xs uppercase tracking-wider text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                  >
                    {status === 'loading' ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <Toast message={toastMessage} />
    </section>
  );
}
