import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, MessageSquare } from "lucide-react";
import { COMPANY_INFO } from "@/data/company";
import { BusinessEnquiryForm } from "@/components/forms/BusinessEnquiryForm";
import { SITE_METADATA_MAP } from "@/data/seoMap";

export const metadata = {
  title: SITE_METADATA_MAP.contact.title,
  description: SITE_METADATA_MAP.contact.description,
  alternates: { canonical: SITE_METADATA_MAP.contact.canonical },
};

export default function ContactPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 lg:py-16">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        {/* Breadcrumb & Title */}
        <div className="mb-12 max-w-3xl">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 mb-3">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-900">Contact</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Contact AAROHA Technologies
          </h1>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Reach our engineering and training team directly by phone, email, WhatsApp, or through the project inquiry form below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-8 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">Get in Touch</h2>

            <div className="space-y-6 text-sm text-slate-700">
              {/* Phone Numbers */}
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Call Us</h3>
                  <div className="flex flex-col space-y-1 text-slate-600">
                    {COMPANY_INFO.phones.map((p, idx) => (
                      <a key={idx} href={`tel:${p.raw}`} className="hover:text-blue-600 font-medium">
                        {p.display}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Email Inquiry</h3>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-blue-600 hover:underline font-medium">
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Office Address</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{COMPANY_INFO.address.full}</p>
                  <a
                    href={COMPANY_INFO.address.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-xs font-semibold text-blue-600 hover:underline"
                  >
                    View on Google Maps &rarr;
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start space-x-3.5 pt-2 border-t border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">WhatsApp Chat</h3>
                  <a
                    href={COMPANY_INFO.whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-emerald-600 hover:underline"
                  >
                    Chat with us on WhatsApp &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <BusinessEnquiryForm />
          </div>
        </div>

        {/* Map Location Section */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm overflow-hidden">
          <div className="rounded-2xl overflow-hidden">
            <iframe
              src={COMPANY_INFO.address.embedUrl}
              width="100%"
              height="400"
              style={{ border: 0, display: "block" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="AAROHA Technologies Office Location"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
