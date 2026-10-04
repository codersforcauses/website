export default function Layout({ children }: LayoutProps<"/projects/[id]">) {
  return (
    <main id="main" className="h-full bg-background">
      {children}
    </main>
  )
}
