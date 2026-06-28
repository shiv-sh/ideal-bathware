import Image from "next/image";
import { cn } from "@/utils/cn";

interface AspectImageProps {
  src: string;
  alt: string;
  ratio?: "1/1" | "4/3" | "3/2" | "16/9" | "2/3";
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
}

const ratioMap = {
  "1/1": "aspect-square",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "16/9": "aspect-video",
  "2/3": "aspect-[2/3]",
};

export function AspectImage({
  src,
  alt,
  ratio = "4/3",
  className,
  imgClassName,
  priority = false,
  sizes = "100vw",
}: AspectImageProps) {
  return (
    <div className={cn("relative overflow-hidden", ratioMap[ratio], className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover", imgClassName)}
      />
    </div>
  );
}
