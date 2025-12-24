// import { customMetadata } from "~/lib/metadata";
import Header from "~/components/header"
import { TypingText } from "~/ui/typing-text"

// export const metadata: Metadata = {
//   title: "Sign Up",
//   ...customMetadata({
//     name: "Sign Up",
//     page: "create-account",
//     description: "Create an account to access the Coders for Causes platform.",
//     image:
//       "https://og-social-cards.vercel.app/**.%2Fcreate-account**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2Fcodersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg",
//   }),
// };

export default function Layout({ children }: LayoutProps<"/dashboard">) {
  return (
    <>
      <Header />
      <main id="main" className="bg-white dark:bg-neutral-950">
        <div className="bg-black pt-18 pb-9 text-neutral-50 md:pt-24 md:pb-12">
          <div className="container mx-auto px-4">
            <h1 className="h-6 font-mono text-2xl md:h-8 md:text-3xl">
              <TypingText text="./dashboard" />
            </h1>
          </div>
        </div>
        {children}
      </main>
    </>
  )
}
