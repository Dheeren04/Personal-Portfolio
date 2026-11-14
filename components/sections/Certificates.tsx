'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Award, ExternalLink, FileText, ZoomIn } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { Modal } from '@/components/ui/Modal';
import rawCertificates from '@/content/certificates.generated.json';

interface CertificateItem {
  id: string;
  fileName: string;
  fileUrl: string;
  thumbUrl: string;
  isPdf: boolean;
  title: string;
  issuer: string;
  year: string;
  description: string;
  priority: number;
}

export function Certificates() {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const certificates: CertificateItem[] = rawCertificates as CertificateItem[];

  return (
    <section id="certificates" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              {siteConfig.certificates.eyebrow}
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-ink">
              {siteConfig.certificates.heading}
            </h2>
          </div>
          <p className="font-mono text-xs text-ink-muted">
            {certificates.length} Verified Credentials · Direct Inspection
          </p>
        </div>

        {/* Certificate Cards Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-bg-elev p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-ink/30 hover:shadow-md"
              data-cursor="Inspect"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedCert(cert);
                }
              }}
              aria-label={`View ${cert.title} certificate`}
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-line bg-bg">
                {cert.isPdf ? (
                  <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
                    <FileText className="h-10 w-10 text-accent mb-2" />
                    <span className="font-mono text-xs text-ink">PDF Document</span>
                  </div>
                ) : (
                  <Image
                    src={cert.fileUrl}
                    alt={cert.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 550px"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-104"
                  />
                )}

                {/* Inspect Overlay Prompt */}
                <div className="absolute inset-0 flex items-center justify-center bg-ink/30 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-bg px-4 py-2 font-mono text-xs uppercase tracking-wider text-ink shadow-sm">
                    <ZoomIn className="h-3.5 w-3.5 text-accent" />
                    <span>Inspect</span>
                  </span>
                </div>
              </div>

              {/* Certificate Metadata */}
              <div className="mt-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-accent">
                    <span>{cert.issuer}</span>
                    <span>{cert.year}</span>
                  </div>
                  <h3 className="mt-2 font-serif text-xl sm:text-2xl font-normal text-ink group-hover:text-accent transition-colors">
                    {cert.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-ink-muted leading-relaxed font-light line-clamp-2">
                    {cert.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-line pt-4 font-mono text-xs text-ink-muted">
                  <span className="flex items-center gap-1.5">
                    <Award className="h-3.5 w-3.5 text-accent" />
                    <span>Verified</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-ink group-hover:text-accent transition-colors">
                    <span>Details</span>
                    <ExternalLink className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Modal */}
      <Modal
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
        certificate={selectedCert}
      />
    </section>
  );
}

