import { User } from "types/api/User";
import { getFullName } from "utils/userUtils";

describe("userUtils Utility Functions", () => {
  it("returns the full user's name", () => {
    const user: User = {
      id: 1,
      enabled: true,
      email: "user@user.com",
      userProfile: { UUID: "", siteAdmin: false },
      first_name: "Test",
      last_name: "User",
    };
    expect(getFullName(user)).toBe("Test User");
  });

  it("returns the full user's first name", () => {
    const user: User = {
      id: 1,
      enabled: true,
      email: "user@user.com",
      userProfile: { UUID: "", siteAdmin: false },
      first_name: "Test",
    };
    expect(getFullName(user)).toBe("Test");
  });

  it("returns the full user's last name", () => {
    const user: User = {
      id: 1,
      enabled: true,
      email: "user@user.com",
      userProfile: { UUID: "", siteAdmin: false },
      last_name: "User",
    };
    expect(getFullName(user)).toBe("User");
  });

  it("returns nothing for the full user's name", () => {
    const user: User = {
      id: 1,
      enabled: true,
      email: "user@user.com",
      userProfile: { UUID: "", siteAdmin: false },
    };
    expect(getFullName(user)).toBe("");
  });
});
