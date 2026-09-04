import { groq } from 'next-sanity'

export const allPhotosQuery = groq`
  *[_type == "photo"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    image,
    description,
    featured,
    tags,
    "category": category->{
      _id,
      title,
      slug
    }
  }
`

export const featuredPhotosQuery = groq`
  *[_type == "photo" && featured == true] | order(_createdAt desc) {
    _id,
    title,
    slug,
    image,
    description,
    "category": category->{
      title,
      slug
    }
  }
`

export const allCategoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    coverImage
  }
`
export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    category,
    publishedAt
  }
`

export const singlePostQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    body,
    category,
    publishedAt
  }

  `
 export const heroSettingsQuery = groq`
  *[_type == "homeSettings"][0] {
    eyebrow,
    titleLine1,
    titleLine2,
    titleAccent,
    subtitle,
    primaryButtonText,
    primaryButtonLink,
    secondaryButtonText,
    secondaryButtonLink,
    "desktopImage": desktopImage.asset->url,
    "mobileImage": mobileImage.asset->url
  }
`