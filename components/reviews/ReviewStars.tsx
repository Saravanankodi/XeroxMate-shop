import { Star } from "lucide-react";

export default function ReviewStars({
  rating,
  size = 15,
  className = "text-brand-strong",
}: {
  rating: number;
  size?: number;
  className?: string;
}) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={size}
          strokeWidth={1.5}
          className={
            index < rating
              ? `${className} fill-current`
              : "text-[#C5C5D3]"
          }
        />
      ))}
    </div>
  );
}
