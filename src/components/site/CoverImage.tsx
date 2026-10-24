import Image from "next/image";

/**
 * Shows the whole picture whatever its shape (wide posters are not cut off).
 * The gaps are filled with a blurred copy of the same picture.
 * Place it inside a `relative` box that has a fixed aspect ratio.
 */
export default function CoverImage({
  src,
  sizes,
  priority = false,
  className = "",
}: {
  src: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <>
      <Image
        src={src}
        alt=""
        fill
        sizes="64px"
        aria-hidden
        className="scale-125 object-cover opacity-70 blur-2xl"
      />
      <Image
        src={src}
        alt=""
        fill
        priority={priority}
        sizes={sizes}
        className={`object-contain ${className}`}
      />
    </>
  );
}
