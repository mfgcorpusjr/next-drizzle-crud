import UsersTable from "@/features/user/components/UsersTable";
import AddUserButton from "@/features/user/components/AddUserButton";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-24">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>

        <AddUserButton />
      </div>

      <UsersTable />
    </div>
  );
}
