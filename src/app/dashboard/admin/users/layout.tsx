import { SidebarInset, SidebarTrigger } from "~/ui/sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "~/ui/breadcrumb"
import { Separator } from "~/ui/separator"

export default function Layout({ children }: LayoutProps<"/dashboard/admin/users">) {
  return (
    <SidebarInset className="bg-neutral-50 dark:bg-neutral-900">
      <header className="transition-[width, height] flex h-(--header-height) shrink-0 items-center gap-2 ease-linear">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Users</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      {children}
    </SidebarInset>
  )
}
