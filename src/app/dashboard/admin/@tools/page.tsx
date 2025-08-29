import UpdateEmail from "./update-email"

export default async function AdminUserTable() {
  return (
    <>
      <div className="flex h-[50px] items-center p-1">
        <h2 className="text-2xl font-semibold">Tools</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <UpdateEmail />
      </div>
    </>
  )
}
