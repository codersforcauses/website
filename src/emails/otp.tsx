import { Body, Container, Head, Heading, Html, Preview, Text, Tailwind, Section, Img } from "@react-email/components"

interface OTPEmailProps {
  code: string
}

export default function OTPEmail({ code }: OTPEmailProps) {
  return (
    <Html>
      <Head></Head>
      <Preview>OTP code for Coders for Causes</Preview>
      <Tailwind>
        <Body className="bg-black">
          <Container className="mx-auto my-0 bg-white">
            <Section className="bg-black px-3">
              <Img
                src="https://codersforcauses.org/logo/cfc_logo_white_full.png"
                alt="Coders for Causes logo"
                height={150}
              />
            </Section>
            <Section className="px-3">
              <Heading className="mt-5 p-0 font-sans text-lg font-bold">Enter the code below to sign in</Heading>
              <Text
                className="bg-neutral-200 p-2 text-center text-4xl font-bold"
                style={{
                  fontFamily: "monospace",
                  whiteSpace: "pre",
                }}
              >
                {code}
              </Text>
              <Text className="mb-2 font-sans text-xs text-neutral-500">
                This code will expire in 10 minutes from the time it was sent.
              </Text>
              <Text className="mb-4 font-sans text-sm text-neutral-500">
                If you didn&apos;t try to login, you can safely ignore this email.
              </Text>
            </Section>
            <Section className="bg-neutral-100 px-3">
              <Text className="mt-2 mb-0 font-sans text-sm text-neutral-600">Coders for Causes</Text>
              <Text className="mt-0 mb-4 font-sans text-xs text-neutral-500">
                The University of Western Australia <br />
                Perth WA 6009
              </Text>
              <Text className="mb-4 font-sans text-sm text-neutral-500">
                Copyright © {new Date().getFullYear()} Coders for Causes. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

OTPEmail.PreviewProps = {
  code: "144833",
} as OTPEmailProps

export function OTPEmailJS({ code }: { code: string }) {
  return {
    email: <OTPEmail code={code} />,
  }
}
