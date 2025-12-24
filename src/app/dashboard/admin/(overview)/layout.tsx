import { SidebarInset, SidebarTrigger } from "~/ui/sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "~/ui/breadcrumb"
import { Separator } from "~/ui/separator"
import { api, HydrateClient } from "~/trpc/server"

export default function Layout({ children }: LayoutProps<"/dashboard/admin">) {
  void api.admin.analytics.getGenderStatistics.prefetch()
  void api.admin.analytics.getUsersPerDay.prefetch(1)
  // void api.admin.analytics.getUsersPerDay.prefetch(0)
  // void api.admin.analytics.getUsersPerDay.prefetch(3)
  // void api.admin.analytics.getUsersPerDay.prefetch(6)
  // void api.admin.analytics.getUsersPerDay.prefetch(12)

  return (
    <SidebarInset className="bg-neutral-50 dark:bg-neutral-900">
      <header className="transition-[width, height] flex h-(--header-height) shrink-0 items-center gap-2 ease-linear">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Overview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <HydrateClient>{children}</HydrateClient>
    </SidebarInset>
  )
}
