// import AppNotificationsContainer from "./layoutComponents/notifications/AppNotificationsContainer";

export default function LoggedOutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full">
      <div className="w-screen h-screen justify-center align-middle flex flex-col flex-1">
        <main>
          {/* <AppNotificationsContainer /> */}
          {children}
        </main>
      </div>
    </div>
  );
}
