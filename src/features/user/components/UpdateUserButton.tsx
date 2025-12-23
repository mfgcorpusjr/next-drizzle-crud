"use client";

import { useState } from "react";
import { LucidePencil } from "lucide-react";

import UserForm from "@/features/user/components/UserForm";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { SelectUser } from "@/db/schema";

type Props = {
  user: SelectUser;
};

export default function UpdateUserButton({ user }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon-sm">
          <LucidePencil />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update User</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <UserForm user={user} onComplete={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
