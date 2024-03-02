"use client";

import { useAppSelector } from "@/state/store/hooks";
import { getAppNotifications } from "@/state/slices/appNotificationsSlice";

import AppNotificationBar from "./AppNotificationBar";

const AppNotificationsContainer = () => {
  const appNotifications = useAppSelector(getAppNotifications);

  return appNotifications.length > 0 ? (
    <div className="max-w-6xl mx-auto px-4 mt-5 sm:px-6 lg:px-8 flex flex-col gap-y-2">
      {appNotifications.map((notification) => (
        <AppNotificationBar
          key={notification.uniqueId}
          {...notification}
        />
      ))}
    </div>
  ) : (
    <></>
  );
};

export default AppNotificationsContainer;
