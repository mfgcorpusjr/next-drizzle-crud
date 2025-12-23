"use server";

import { desc } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";

export const getUsers = async () => {
  try {
    const data = await db.select().from(users).orderBy(desc(users.createdAt));
    return data;
  } catch (e) {
    console.log(e);
  }
};
