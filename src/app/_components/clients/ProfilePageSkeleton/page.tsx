import TitleText from "~/app/_components/title-text"
import { Skeleton } from "~/components/ui/skeleton"

const ProfilePageSkeleton = () => {
  return (
    <main className="main">
      <TitleText typed>./profile</TitleText>
      <div className="container mx-auto p-4">
        <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0 md:py-12">
          {/* Profile Section */}
          <div className="space-y-2 p-2 md:w-1/4">
            <div className="space-y-1">
              {/* Role Badge Skeleton */}
              <Skeleton className="h-6 w-24 bg-primary/80" />
              {/* Name Placeholder */}
              <Skeleton className="mt-2 h-8" />
              {/* Username and Pronouns Placeholder */}
              <div className="flex flex-row space-x-1 italic">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-10" />
              </div>
            </div>
            {/* Social Badges Skeleton */}
            <div className="mt-2 flex flex-row space-x-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-20" />
            </div>
            {/* Student Number and University Skeleton */}
            <div className="mt-2 flex flex-col">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="mt-2 h-4 w-32" />
            </div>
            {/* Edit Profile Button Skeleton */}
            <div className="pt-12">
              <Skeleton className="h-10 bg-primary/80" />
            </div>
          </div>
          {/* Projects Section */}
          <div>
            {/* Projects Header */}
            <Skeleton className="h-8" />
            {/* Placeholder for upcoming projects */}
            <Skeleton className="mt-2 h-6 w-48" />
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProfilePageSkeleton
