import type { Metadata } from "next";
import { ContactForm } from "@/features/leads/ContactForm";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Ideal Bathware. Visit our factory, call us, or fill in the enquiry form and our team will respond within 24 hours.",
};

const contactInfo = [
  {
    icon: MapPin,
    title: "Factory Address",
    details: ["123 Industrial Area, Sector 5", "New Delhi — 110001, India"],
  },
  {
    icon: Phone,
    title: "Phone",
    details: ["+91 98765 43210", "+91 11 2345 6789"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@idealbathware.com", "sales@idealbathware.com"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon – Sat: 9:00 AM – 6:00 PM", "Sunday: Closed"],
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[var(--color-charcoal)] py-24">
        <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10">
          <p className="text-[var(--color-gold)] text-sm uppercase tracking-[0.2em] mb-3">
            Get In Touch
          </p>
          <h1 className="font-heading text-5xl md:text-6xl text-white">Contact Us</h1>
        </div>
      </div>

      <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            <h2 className="font-heading text-3xl text-[var(--color-charcoal)] mb-8">
              Send Us a Message
            </h2>
            <ContactForm />

            <div className="mt-6">
              <a
                href="https://wa.me/911234567890"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-[var(--radius-sm)] border border-[var(--color-warm-gray-light)] text-[var(--color-charcoal)] hover:border-green-500 hover:text-green-600 transition-colors"
              >
                <MessageCircle size={20} />
                <span className="font-medium">Or chat with us on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Contact details */}
          <div>
            <h2 className="font-heading text-3xl text-[var(--color-charcoal)] mb-8">
              Find Us
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {contactInfo.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-cream)] flex items-center justify-center mt-0.5">
                    <item.icon size={18} className="text-[var(--color-gold)]" />
                  </div>
                  <div>
                    <p className="font-medium text-[var(--color-charcoal)] mb-1">{item.title}</p>
                    {item.details.map((line, i) => (
                      <p key={i} className="text-sm text-[var(--color-warm-gray)]">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="rounded-[var(--radius-card)] overflow-hidden h-64 bg-[var(--color-off-white)] flex items-center justify-center border border-[var(--color-warm-gray-light)]">
              <p className="text-[var(--color-warm-gray)] text-sm">
                Google Map — embed your API key to display the map
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
