import { User } from "types/api/User";

export const getFullName = (user: User): string => {
  if (user.first_name && user.last_name) {
    return `${user.first_name} ${user.last_name}`;
  }

  if (user.first_name && !user.last_name) {
    return `${user.first_name}`;
  }

  if (!user.first_name && user.last_name) {
    return `${user.last_name}`;
  }

  return "";
};
