import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function ProductNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="font-heading text-5xl text-[var(--color-charcoal)] mb-4">Product Not Found</h1>
      <p className="text-[var(--color-warm-gray)] max-w-md mb-8">
        The product you&apos;re looking for doesn&apos;t exist or may have been removed.
      </p>
      <Button asChild={false}>
        <Link href="/products">Browse All Products</Link>
      </Button>
    </div>
  );
}
