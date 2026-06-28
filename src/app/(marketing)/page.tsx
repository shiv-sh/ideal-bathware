import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { FeaturedCollections } from "@/components/sections/FeaturedCollections";
import { TechnologyStrip } from "@/components/sections/TechnologyStrip";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { WhyIdeal } from "@/components/sections/WhyIdeal";
import { CatalogueCTA } from "@/components/sections/CatalogueCTA";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Ideal Bathware — Premium Sanitaryware",
  description:
    "Explore Ideal Bathware's premium sanitaryware collections — from one-piece closets to designer wash basins. Crafted for quality and elegance.",
};

export default async function HomePage() {
  // TODO: Replace with real data from services once database is connected
  // const [categories, collections, products] = await Promise.all([
  //   categoryService.getAll(),
  //   collectionService.getFeatured(),
  //   productService.getFeatured(),
  // ]);

  return (
    <>
      <HeroSection />
      <CategoryGrid />
      <FeaturedCollections />
      <TechnologyStrip />
      <FeaturedProducts />
      <WhyIdeal />
      <CatalogueCTA />
      <ContactCTA />
    </>
  );
}
