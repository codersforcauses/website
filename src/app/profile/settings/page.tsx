import { redirect } from "next/navigation"

import { getSession } from "~/lib/auth-server"
import { joinRedirectLink } from "~/lib/typed-links"
import { Separator } from "~/ui/separator"
import { SidebarTrigger } from "~/ui/sidebar"

export default async function SettingsPage() {
  const data = await getSession()
  if (!data?.user) {
    redirect(joinRedirectLink({ redirect: `/profile/settings` }))
  }

  const roles = data.user.role?.split(",") ?? []

  return (
    <div className="space-y-4">
      <div className="flex gap-0.5">
        <SidebarTrigger className="-ml-2 md:hidden" />
        <div>
          <h2 className="font-mono text-lg font-medium">Membership</h2>
          <p className="text-sm text-muted-foreground">
            View your current membership details or renew your membership.
          </p>
        </div>
      </div>
      <Separator className="md:max-w-2xl" />
      <div className="max-w-xl">
        {roles.includes("admin") && (
          <div className="text-sm text-muted-foreground">
            <p>
              You have been made an <span className="text-primary">administrator</span> by the committee or another
              admin. You have full access to the club&apos;s resources and can do the following:
            </p>
            <ul className="list-inside list-[square]">
              <li>manage users and their roles</li>
              <li>manage club events</li>
              <li>manage projects</li>
            </ul>
          </div>
        )}
        {roles.includes("committee") && (
          <div className="text-sm text-muted-foreground">
            <p>
              You have been made a member of <span className="text-primary">committee</span> for the year
              {` ${new Date().getFullYear()}`}. For your tenure, you have full access to the club&apos;s resources and
              can do the following:
            </p>
            <ul className="list-inside list-[square]">
              <li>manage users and their roles</li>
              <li>manage club events</li>
              <li>manage projects</li>
            </ul>
          </div>
        )}
        {roles.includes("past") && (
          <div className="text-sm text-muted-foreground">
            <p>
              You were a member of the <span className="text-primary">committee in the past</span>.
              {/* For your tenure, you
              have full access to the club&apos;s resources and can do the following: */}
            </p>
            {/* <ul className="list-inside list-[square]">
              <li>manage users and their roles</li>
              <li>manage club events</li>
              <li>manage projects</li>
            </ul> */}
          </div>
        )}
        {roles.includes("honorary") && (
          <div className="text-sm text-muted-foreground">
            <p>
              You have been granted an <span className="text-primary">Honorary Life Membership (HLM)</span> to Coders
              for Causes. This means that your CFC membership will only end until it has been either revoked or the club
              disbands. Member benefits include:
            </p>
            <ul className="list-inside list-[square]">
              <li>discounts to paid events such as industry nights</li>
              <li>the ability to vote and run for committee positions</li>
              <li>the ability to join our projects run during the winter and summer breaks.</li>
            </ul>
          </div>
        )}
        {roles.includes("member") && (
          <div className="text-sm text-muted-foreground">
            <p>
              You are currently a <span className="text-primary">CFC member</span>. Your CFC membership ends on 31st
              December {new Date().getFullYear()} at 11:59pm. Member benefits include:
            </p>
            <ul className="list-inside list-[square]">
              <li>discounts to paid events such as industry nights</li>
              <li>the ability to vote and run for committee positions</li>
              <li>the ability to join our projects run during the winter and summer breaks.</li>
            </ul>
          </div>
        )}
        {roles === null && (
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              <p>
                You are currently <span className="text-primary">not a CFC member</span>. You can become a member of
                Coders for Causes for just $5 a year (ends on 31st Dec {new Date().getFullYear()}). There are many
                benefits to becoming a member which include:
              </p>
              <ul className="list-inside list-[square]">
                <li>discounts to paid events such as industry nights</li>
                <li>the ability to vote and run for committee positions</li>
                <li>the ability to join our projects run during the winter and summer breaks.</li>
              </ul>
            </div>
            <div className="max-w-lg">
              {/* {getIsMembershipOpen() ? (
                <PaymentFormWrapper />
              ) : (
                <p className="text-warning text-sm">
                  Memberships are temporarily closed for the new year. Please check back later.
                </p>
              )} */}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
