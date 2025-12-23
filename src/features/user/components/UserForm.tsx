"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { createUser, updateUser } from "@/features/user/actions";
import { TSelectUser } from "@/db/schema";

const formSchema = z.object({
  email: z
    .email({ error: "Email is invalid" })
    .trim()
    .max(255, { error: "Email cannot exceed 255 characters" }),
  username: z
    .string({ error: "Username is required" })
    .trim()
    .min(5, { error: "Username must be at least 5 characters" })
    .max(255, { error: "Username cannot exceed 255 characters" }),
});

type FormData = z.infer<typeof formSchema>;

type UserFormProps = {
  user?: TSelectUser;
  onComplete: () => void;
};

export default function UserForm({ user, onComplete }: UserFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user?.email ?? "",
      username: user?.username ?? "",
    },
  });

  const handleUpsertUser = async (formData: FormData) => {
    try {
      setIsLoading(true);

      if (user) {
        await updateUser(user.id, formData);
      } else {
        await createUser(formData);
      }

      toast.success(`User ${user ? "updated" : "created"}`);
      reset();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setIsLoading(false);

      onComplete();
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleUpsertUser)}>
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              {...field}
              id="email"
              aria-invalid={fieldState.invalid}
              placeholder="johndoe@gmail.com"
              autoComplete="off"
            />
            {fieldState.invalid && (
              <FieldError
                className="text-xs -mt-1"
                errors={[fieldState.error]}
              />
            )}
          </Field>
        )}
      />

      <Controller
        name="username"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              {...field}
              id="username"
              aria-invalid={fieldState.invalid}
              placeholder="johndoe"
              autoComplete="off"
            />
            {fieldState.invalid && (
              <FieldError
                className="text-xs -mt-1"
                errors={[fieldState.error]}
              />
            )}
          </Field>
        )}
      />

      <Button disabled={isLoading}>
        {isLoading && <Spinner />} {user ? "Update" : "Create"}
      </Button>
    </form>
  );
}
