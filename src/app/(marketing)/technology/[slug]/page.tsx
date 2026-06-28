import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getTechnologyBySlug, getAllTechnologySlugs } from "@/services/technologyService";
import { ChevronRight } from "lucide-react";

export const dynamic = "force-static";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllTechnologySlugs().catch(() => []);
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tech = await getTechnologyBySlug(slug);
  if (!tech) return { title: "Technology Not Found" };
  return {
    title: tech.name,
    description: tech.shortDescription,
  };
}

export default async function TechnologyDetailPage({ params }: Props) {
  const { slug } = await params;
  const tech = await getTechnologyBySlug(slug);
  if (!tech) notFound();

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-[var(--color-warm-gray-light)]">
        <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10 py-4">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-[var(--color-warm-gray)]">
              <li><Link href="/" className="hover:text-[var(--color-gold)] transition-colors">Home</Link></li>
              <li aria-hidden><ChevronRight size={14} /></li>
              <li><Link href="/technology" className="hover:text-[var(--color-gold)] transition-colors">Technology</Link></li>
              <li aria-hidden><ChevronRight size={14} /></li>
              <li className="text-[var(--color-charcoal)] font-medium" aria-current="page">{tech.name}</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="bg-[var(--color-charcoal)] py-20">
        <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10">
          <p className="text-[var(--color-gold)] text-sm uppercase tracking-[0.2em] mb-3">Technology</p>
          <h1 className="font-heading text-4xl md:text-5xl text-white">{tech.name}</h1>
          <p className="text-white/70 mt-4 max-w-xl text-lg">{tech.shortDescription}</p>
        </div>
      </div>

      <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10 py-16">
        <div className="max-w-3xl">
          <div className="prose prose-lg text-[var(--color-charcoal-light)]">
            {tech.fullDescription.split("\n").map((para, i) => (
              <p key={i} className="mb-4 leading-relaxed">{para}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
