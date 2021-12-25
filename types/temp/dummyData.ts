import { User } from "types/User";

// Users

export const userAJosland: User = {
  id: 1,
  firstName: "Adela",
  lastName: "Josland",
  email: "ajosland0@buzzfeed.com",
  enabled: true,
  userProfile: {
    uuid: "f8f286ef-51dc-4e36-aedd-5e03b19fdf27",
    feedAllowed: true,
    siteAdmin: false,
  },
};

export const userWChevin: User = {
  id: 2,
  firstName: "Welbie",
  lastName: "Chevin",
  email: "wchevin1@is.gd",
  enabled: true,
  userProfile: {
    uuid: "9fd2bb8a-b17f-4af9-9fe3-1919f3056634",
    feedAllowed: true,
    siteAdmin: false,
  },
};

export const userRWilliamson: User = {
  id: 3,
  firstName: "Ryan",
  lastName: "Williamson",
  email: "rwilliamson2@mail.com",
  enabled: true,
  userProfile: {
    uuid: "38645eed-ab80-47af-b840-28750618137d",
    feedAllowed: true,
    siteAdmin: false,
  },
};

export const users = [userAJosland, userWChevin, userRWilliamson];
