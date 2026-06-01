import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "@/lib/sanity/client";

const builder = imageUrlBuilder(sanityClient);

type ImageSource = Parameters<typeof builder.image>[0];

export function urlFor(source: ImageSource) {
  return builder.image(source);
}

export function urlForImage(
  source: ImageSource,
  width: number,
  height?: number,
) {
  let img = urlFor(source).width(width).auto("format").quality(85);
  if (height) img = img.height(height);
  return img.url();
}
