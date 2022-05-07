import { TalkGroup } from "types/api/TalkGroup";

const mockTalkgroup1: TalkGroup = {
  UUID: "a88fde61-dcb2-4b19-b0c2-66956ad5fe13",
  system: {
    UUID: "d800cbef-a1c5-4d0d-bb59-964b7930c121",
    name: "Test System",
    systemACL: {
      UUID: "d7cb8175-a41f-4986-8d20-7ac9dc4ee1e8",
      name: "Test ACL",
      public: false,
    },
    enable_talkgroup_acls: false,
    prune_transmissions: false,
    prune_transmissions_after_days: 365,
  },
  decimal_id: 9999,
  alpha_tag: "Test Tag",
  description: "Test Description",
  encrypted: false,
  mode: "digital",
  agency: [
    {
      UUID: "1ef1aa55-0df2-4ce0-a5f6-43663f4ee3d1",
      name: "Test Agency",
      description: "Test Description",
      city: [
        {
          UUID: "63b6183b-4bf0-4916-b821-506d19fd5e9f",
          name: "Lorem enim",
          description: "non ea minim ex",
        },
      ],
    },
  ],
};

export const generateTalkgroup = () => mockTalkgroup1;
