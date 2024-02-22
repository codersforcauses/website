import { type Metadata } from "next"

interface MetadataProps {
  name: string
  page?: string
  description: string
  image: string
}

const url =
  process.env.VERCEL_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL ?? process.env.NODE_ENV === "development"
    ? "localhost:3000"
    : "codersforcauses.org"

export const customMetadata = ({ name, page, description, image }: MetadataProps): Metadata => {
  const link = page ? `https://${url}/${page}` : `https://${url}`

  return {
    description: description,
    icons: [{ rel: "icon", url: "/favicon.png" }],
    keywords: [
      "Next.js",
      "React",
      "JavaScript",
      "TypeScript",
      "Tailwind CSS",
      "Nuxt.js",
      "Vue",
      "Docker",
      "HTML",
      "CSS",
      "Node.js",
      "Cloud",
      "Vercel",
      "Charity",
      "Not for Profit",
      "Club",
      "Software",
      "Engineering",
      "UWA",
      "Web",
      "Development",
      "University",
      "Western",
      "Australia",
      "Students",
      "Volunteers",
      "Coders",
      "Causes",
    ],
    authors: { name: "Coders for Causes" },
    openGraph: {
      title: name,
      description: description,
      url: link,
      siteName: "Coders for Causes",
      images: [
        {
          url: image, // Must be an absolute URL
          width: 512,
          height: 293,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      creator: "@codersforcauses",
      title: name,
      description: description,
      images: {
        url: image,
        alt: "Coders for Causes",
      },
      site: link,
    },
  }
}
