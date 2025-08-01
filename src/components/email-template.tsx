import { Body, Button, Container, Head, Html, Img, Preview, Section, Text } from "@react-email/components"
import * as React from "react"

interface MembershipRenewalReminderEmailProps {
  Firstname?: string
  WebsiteLink?: string
}

export const MembershipRenewalReminderEmail = ({
  Firstname,
  WebsiteLink = "https://codersforcauses.org/join",
}: MembershipRenewalReminderEmailProps) => {
  let year = new Date().getFullYear()
  const month = new Date().getMonth()
  if (month < 6) {
    year -= 1
  }

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>Reminder of your membership renewal </Preview>
        <Container style={container}>
          <Img src="https://codersforcauses.org/logo/cfc_logo_white_circle.png" width="50" height="50" alt="CFC Logo" />
          <Section>
            <Text style={text}>Hi {Firstname},</Text>
            <Text style={text}>
              {`Your membership of Coders for Causes ends on 31st Dec ${year}. To keep your membership active, please renew it by clicking the button below.`}
            </Text>
            <Button style={button} href={WebsiteLink}>
              Login to my account
            </Button>

            <Text style={text}>Happy coding!</Text>
          </Section>
          <Img src="https://codersforcauses.org/logo/cfc_logo_black_full.png" width="200" height="200" alt="CFC Logo" />
        </Container>
      </Body>
    </Html>
  )
}

export default MembershipRenewalReminderEmail

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
}

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
}

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
}

const button = {
  backgroundColor: "#000",

  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
}
