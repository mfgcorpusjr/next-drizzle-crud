import { Suspense } from "react";

import UsersTable from "@/features/user/components/UsersTable";
import CreateUserButton from "@/features/user/components/CreateUserButton";
import Loader from "@/components/Loader";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-24">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>

        <CreateUserButton />
      </div>

      <Suspense fallback={<Loader />}>
        <UsersTable />
      </Suspense>
    </div>
  );
}
