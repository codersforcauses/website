export default function Layout({ children }: LayoutProps<"/projects/[id]">) {
  return (
    <main id="main" className="h-full bg-white dark:bg-neutral-950">
      {children}
    </main>
  )
}
