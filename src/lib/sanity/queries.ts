export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  siteTitle,
  firstName,
  lastName,
  tagline,
  company,
  role,
  roleSecondary,
  yearsExperience,
  email,
  phone,
  officeAddress,
  metaDescription,
  socialLinks,
  availabilityNote,
  stackItems,
  studioName,
  studioNote,
  location,
  footerVideoUrl,
  "ogImageUrl": ogImage.asset->url
}`;

export const WORK_PROJECT_BY_SLUG_QUERY = `*[_type == "workProject" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  category,
  year,
  featured,
  liveUrl,
  challenge,
  services,
  role,
  order,
  "coverImageUrl": coverImage.asset->url,
  "gallery": gallery[]{
    _key,
    type,
    alt,
    span,
    "imageUrl": image.asset->url,
    videoUrl
  }
}`;

export const SERVICES_QUERY = `*[_type == "serviceBlock"] | order(order asc){
  _id,
  title,
  description,
  order,
  featuredOnHome,
  "mediaItems": mediaItems[]{
    _key,
    type,
    alt,
    span,
    "imageUrl": image.asset->url,
    videoUrl
  }
}`;

export const WORK_PROJECTS_QUERY = `*[_type == "workProject"] | order(order asc){
  _id,
  title,
  "slug": slug.current,
  category,
  year,
  featured,
  liveUrl,
  challenge,
  services,
  role,
  order,
  "coverImageUrl": coverImage.asset->url,
  "gallery": gallery[]{
    _key,
    type,
    alt,
    span,
    "imageUrl": image.asset->url,
    videoUrl
  }
}`;

export const ABOUT_QUERY = `*[_type == "aboutSection"][0]{
  location,
  "photoUrl": photo.asset->url,
  "whoIAm": whoIAm[],
  "approach": approach[],
  "philosophy": philosophy[]
}`;

export const RECOGNITIONS_QUERY = `*[_type == "recognitionItem"] | order(_createdAt asc){
  award,
  count
}`;

export const UPDATES_QUERY = `*[_type == "updateItem"] | order(number asc){
  _id,
  number,
  title,
  description,
  externalUrl,
  "imageUrls": images[].asset->url
}`;
