import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-[var(--radius-pill)] px-3 py-1 text-xs font-medium tracking-wide transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-charcoal)] text-white",
        gold: "bg-[var(--color-gold)] text-white",
        outline:
          "border border-[var(--color-warm-gray)] text-[var(--color-charcoal)] bg-transparent",
        subtle: "bg-[var(--color-off-white)] text-[var(--color-charcoal)]",
        new: "bg-[var(--color-gold-light)] text-[var(--color-charcoal)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
