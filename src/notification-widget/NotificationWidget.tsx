import { NotificationBell } from "./components/NotificationBell";
import { NotificationsProvider } from "./hooks/useNotifications";

export function NotificationWidget() {
  return (
    <NotificationsProvider>
      <NotificationBell />
    </NotificationsProvider>
  );
}
