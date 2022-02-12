import { APIUser } from "types/api/APIUser";
import { APIUserProfile } from "types/api/APIUserProfile";
import { User } from "types/User";
import { UserProfile } from "types/UserProfile";

export const getFullName = (user: User) => `${user.firstName} ${user.lastName}`;
