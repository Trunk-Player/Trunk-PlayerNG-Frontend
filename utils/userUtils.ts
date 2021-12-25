import { User } from "types/User";

export const getFullName = (user: User) => `${user.firstName} ${user.lastName}`;
