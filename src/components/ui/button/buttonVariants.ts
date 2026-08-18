import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary-dark",
        secondary:
          "border border-control-border-l bg-bgSecondary-l text-foreground hover:bg-Bghover-l dark:border-control-border-d dark:bg-bgSecondary-d dark:hover:bg-Bghover-d",
        ghost: "text-foreground hover:bg-Bghover-l dark:hover:bg-Bghover-d",
        onMedia:
          "border border-white/70 text-white hover:bg-white/12 focus-visible:ring-white",
      },
      size: {
        sm: "px-4 py-2",
        md: "px-6 py-3",
        lg: "px-7 py-3.5 text-[15px]",
        icon: "h-11 w-11 shrink-0 p-0",
      },
      shape: {
        default: "rounded-md",
        pill: "rounded-full",
        rounded: "rounded",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      shape: "default",
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
