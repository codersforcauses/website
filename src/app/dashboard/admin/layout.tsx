import { SidebarProvider } from "~/ui/sidebar"
import { AdminSidebar } from "./sidebar"

export default function Layout({ children }: LayoutProps<"/dashboard/admin">) {
  return (
    <SidebarProvider
      theme="dark"
      style={
        {
          "--header-height": "calc(var(--spacing) * 14)",
        } as React.CSSProperties
      }
    >
      <AdminSidebar />
      {children}
    </SidebarProvider>
  )
}
