"use client";

import { useState } from "react";
import { LucideUserPlus } from "lucide-react";

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

export default function CreateUserButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <LucideUserPlus /> Create User
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <UserForm onComplete={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
