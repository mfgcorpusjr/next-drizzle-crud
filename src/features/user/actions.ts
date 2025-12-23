"use server";

import { revalidatePath } from "next/cache";
import { desc, eq } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { users, InsertUser } from "@/db/schema";

export const getUsers = async () => {
  try {
    const data = await db.select().from(users).orderBy(desc(users.createdAt));
    return data;
  } catch (e) {
    throw new Error("Failed to get users");
  }
};

export const createUser = async (user: InsertUser) => {
  try {
    await db.insert(users).values(user);
    revalidatePath("/");
  } catch (e) {
    throw new Error("Failed to create user");
  }
};

export const deleteUser = async (id: string) => {
  try {
    await db.delete(users).where(eq(users.id, id));
    revalidatePath("/");
  } catch (e) {
    throw new Error("Failed to delete user");
  }
};
