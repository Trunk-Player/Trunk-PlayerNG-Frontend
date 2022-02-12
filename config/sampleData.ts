import { DateTime } from "luxon";
import { System } from "types/api/System";
import { SystemACL } from "types/api/SystemACL";

const now = DateTime.now();

export const systemACL: SystemACL = {
  UUID: "5c0a00b7-910d-4367-89df-257121538384",
  name: "Sample ACL",
  users: [],
  public: true,
};

export const system: System = {
  UUID: "5130f178-f61c-4dda-938b-0e8c6f42fba5",
  name: "Omaha Regional Interoperability Network (ORION)",
  systemACL,
  enableTalkGroupACLs: false,
  pruneTransmissions: false,
  pruneTransmissionsAfterDays: 90,
};
