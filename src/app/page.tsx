import UsersTable from "@/features/user/components/UsersTable";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-24">
      <h1 className="text-2xl font-bold tracking-tight mb-4">Users</h1>

      <UsersTable />
    </div>
  );
}
