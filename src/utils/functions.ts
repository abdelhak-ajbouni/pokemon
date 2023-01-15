import { v4 as uuid } from "uuid";

export const generateDoc = <T>(data: T, userId?: string) => {
  return {
    _id: uuid(),
    ...data,
    createdBy: userId || "system",
    createdAt: new Date().toISOString(),
  };
};
