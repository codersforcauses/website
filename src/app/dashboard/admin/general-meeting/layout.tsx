import { SidebarInset } from "~/ui/sidebar"

export default function Layout({ children }: LayoutProps<"/dashboard/admin/general-meeting">) {
  return <SidebarInset className="bg-primary-foreground">{children}</SidebarInset>
}
