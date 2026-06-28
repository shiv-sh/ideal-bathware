"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-body font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-charcoal)] text-white hover:bg-[var(--color-gold)] rounded-[var(--radius-sm)]",
        secondary:
          "bg-[var(--color-gold)] text-white hover:bg-[var(--color-gold-dark)] rounded-[var(--radius-sm)]",
        outline:
          "border border-[var(--color-charcoal)] text-[var(--color-charcoal)] bg-transparent hover:bg-[var(--color-charcoal)] hover:text-white rounded-[var(--radius-sm)]",
        ghost:
          "text-[var(--color-charcoal)] bg-transparent hover:text-[var(--color-gold)] rounded-[var(--radius-sm)]",
        link: "text-[var(--color-charcoal)] underline-offset-4 hover:underline hover:text-[var(--color-gold)] p-0 h-auto",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-14 px-8 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
