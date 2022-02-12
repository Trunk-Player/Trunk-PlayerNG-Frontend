import { User } from "types/api/User";

export const getFullName = (user: User) =>
  `${user.first_name} ${user.last_name}`;
