import { formatDistanceToNowStrict } from "date-fns"
import DeviceDetector from "node-device-detector"

import { auth } from "~/lib/auth"
import { Badge } from "~/ui/badge"
import { buttonVariants } from "~/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/ui/dropdown-menu"
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "~/ui/item"

interface ListSessionsProps {
  current: string
  list: (typeof auth.$Infer.Session.session)[]
}

const detector = new DeviceDetector()

export default function ListSessions({ current, list }: ListSessionsProps) {
  return (
    <div className="grid max-w-xl gap-4">
      {list.map((item) => {
        const isCurrent = item.id === current
        const md = detector.detect(item.userAgent ?? "")
        // const device = md.device.type
        console.log(md, item.ipAddress)

        return (
          <Item key={item.id} variant="outline" size="xs">
            <ItemMedia>
              <span className="material-symbols-sharp leading-none!">devices</span>
            </ItemMedia>
            <ItemContent className="gap-1">
              <ItemTitle>
                {md.client.name} on {md.os.family} {md.os.version}
                {isCurrent && <Badge variant="secondary">current</Badge>}
              </ItemTitle>
              <ItemDescription>Expires in {formatDistanceToNowStrict(item.expiresAt)}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <DropdownMenu>
                <DropdownMenuTrigger
                  aria-labelledby="More options"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "icon-sm",
                    className: "data-popup-open:bg-muted",
                  })}
                >
                  <span aria-hidden className="material-symbols-sharp">
                    more_vert
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuItem variant="destructive" disabled={isCurrent}>
                      Revoke session
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem>Billing</DropdownMenuItem> */}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </ItemActions>
          </Item>
        )
      })}
    </div>
  )
}
