import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Ideal Bathware — 30+ years of premium sanitaryware manufacturing, driven by quality, technology, and elegance.",
};

const stats = [
  { value: "30+", label: "Years of Excellence" },
  { value: "500+", label: "Cities Served" },
  { value: "200+", label: "Products in Range" },
  { value: "50K+", label: "Happy Customers" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-[var(--color-charcoal)] py-24">
        <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10">
          <p className="text-[var(--color-gold)] text-sm uppercase tracking-[0.2em] mb-3">
            Our Story
          </p>
          <h1 className="font-heading text-5xl md:text-6xl text-white max-w-2xl">
            Crafting Premium Bathrooms Since 1990
          </h1>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[var(--color-off-white)] py-12">
        <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-4xl text-[var(--color-gold)] mb-1">{stat.value}</p>
                <p className="text-sm text-[var(--color-warm-gray)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Company Story */}
      <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <p className="text-[var(--color-gold)] font-body text-sm uppercase tracking-[0.2em] mb-3">
              Our Journey
            </p>
            <h2 className="font-heading text-4xl text-[var(--color-charcoal)] mb-6">
              A Legacy of Quality
            </h2>
            <p className="text-[var(--color-charcoal-light)] leading-relaxed mb-4">
              Founded in 1990, Ideal Bathware began with a simple belief: every home deserves
              beautiful, reliable sanitaryware. From a single manufacturing unit, we have grown into
              one of India&apos;s most trusted sanitaryware brands.
            </p>
            <p className="text-[var(--color-charcoal-light)] leading-relaxed">
              Today, our products are found in millions of homes, luxury hotels, and commercial
              spaces across the country. Each piece carries the promise of quality, craftsmanship,
              and lasting elegance that has defined our brand for over three decades.
            </p>
          </div>
          <div className="aspect-[4/3] rounded-[var(--radius-card)] bg-[var(--color-cream)] overflow-hidden">
            <div className="h-full w-full bg-gradient-to-br from-[var(--color-warm-gray-light)] to-[var(--color-cream)]" />
          </div>
        </div>

        {/* Manufacturing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="order-2 lg:order-1 aspect-[4/3] rounded-[var(--radius-card)] bg-[var(--color-cream)] overflow-hidden">
            <div className="h-full w-full bg-gradient-to-br from-[var(--color-charcoal-light)] to-[var(--color-charcoal)]" />
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-[var(--color-gold)] font-body text-sm uppercase tracking-[0.2em] mb-3">
              Manufacturing
            </p>
            <h2 className="font-heading text-4xl text-[var(--color-charcoal)] mb-6">
              Made in India, Built for the World
            </h2>
            <p className="text-[var(--color-charcoal-light)] leading-relaxed mb-4">
              Our state-of-the-art manufacturing facility spans over 50,000 sq. ft. and is equipped
              with the latest machinery and quality control systems. Every product is manufactured
              to the highest standards, tested rigorously before it leaves our facility.
            </p>
            <p className="text-[var(--color-charcoal-light)] leading-relaxed">
              We are ISI and ISO certified, reflecting our commitment to quality, safety, and
              environmental responsibility in everything we produce.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {[
            {
              label: "Our Mission",
              text: "To make premium, technology-driven sanitaryware accessible to every Indian home — without compromising on quality, aesthetics, or durability.",
            },
            {
              label: "Our Vision",
              text: "To be the most trusted sanitaryware brand in India, known for innovation, reliability, and the transformative power of beautifully designed bathrooms.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-[var(--radius-card)] bg-[var(--color-off-white)] p-10"
            >
              <p className="text-[var(--color-gold)] font-body text-sm uppercase tracking-[0.2em] mb-3">
                {item.label}
              </p>
              <p className="font-heading text-xl text-[var(--color-charcoal)] leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
