import { SidebarInset } from "~/ui/sidebar"

export default function Layout({ children }: LayoutProps<"/dashboard/admin/general-meeting">) {
  return <SidebarInset className="bg-neutral-50 dark:bg-neutral-900">{children}</SidebarInset>
}
