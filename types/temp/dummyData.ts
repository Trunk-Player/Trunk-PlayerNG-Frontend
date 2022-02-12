import { User } from "types/api/User";

// Users

export const userAJosland: User = {
  id: 1,
  first_name: "Adela",
  last_name: "Josland",
  email: "ajosland0@buzzfeed.com",
  enabled: true,
  userProfile: {
    UUID: "f8f286ef-51dc-4e36-aedd-5e03b19fdf27",
    siteAdmin: false,
  },
};

export const userWChevin: User = {
  id: 2,
  first_name: "Welbie",
  last_name: "Chevin",
  email: "wchevin1@is.gd",
  enabled: true,
  userProfile: {
    UUID: "9fd2bb8a-b17f-4af9-9fe3-1919f3056634",
    siteAdmin: false,
  },
};

export const userRWilliamson: User = {
  id: 3,
  first_name: "Ryan",
  last_name: "Williamson",
  email: "rwilliamson2@mail.com",
  enabled: true,
  userProfile: {
    UUID: "38645eed-ab80-47af-b840-28750618137d",
    siteAdmin: false,
  },
};

export const users = [userAJosland, userWChevin, userRWilliamson];
