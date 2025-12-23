"use client";

import { useState } from "react";
import { LucideTrash2 } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { deleteUser } from "@/features/user/actions";

type Props = {
  userId: string;
};

export default function DeleteUserButton({ userId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteUser = async () => {
    try {
      setIsLoading(true);

      await deleteUser(userId);

      toast.success("User deleted");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setIsLoading(false);

      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon-sm">
          <LucideTrash2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
            Are you absolutely sure? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end">
          <Button
            variant="destructive"
            disabled={isLoading}
            onClick={handleDeleteUser}
          >
            {isLoading && <Spinner />} Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
