import Link from "next/link"

import { Button } from "~/components/ui/button"

export default function NotFound() {
	return (
		<main className="main container flex flex-col items-center justify-center gap-y-4">
			<div className="select-none text-6xl md:text-8xl">¯\_(ツ)_/¯</div>
			<h2 className="text-3xl font-bold">404: Not Found</h2>
			<Button asChild>
				<Link href="/">Return Home</Link>
			</Button>
		</main>
	)
}
