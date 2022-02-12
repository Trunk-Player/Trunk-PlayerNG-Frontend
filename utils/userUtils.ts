import { APIUser } from "types/api/APIUser";
import { APIUserProfile } from "types/api/APIUserProfile";
import { User } from "types/User";
import { UserProfile } from "types/UserProfile";

export const getFullName = (user: User) => `${user.firstName} ${user.lastName}`;

export const convertAPIUserProfileToUserProfile = (
  profile: APIUserProfile
): UserProfile => ({
  uuid: profile.UUID,
  siteAdmin: profile.siteAdmin,
  description: profile.description,
  siteTheme: profile.siteTheme,
});

export const convertAPIUserToUser = (user: APIUser): User => ({
  id: user.id,
  email: user.email,
  firstName: user.first_name,
  lastName: user.last_name,
  enabled: user.enabled,
  userProfile: convertAPIUserProfileToUserProfile(user.userProfile),
});
