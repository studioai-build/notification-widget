import { NotificationBell } from "./components/NotificationBell";
import { useNotificationsState } from "./hooks/useNotifications";

export function NotificationWidget() {
  const notificationsState = useNotificationsState();

  return (
    <NotificationBell {...notificationsState} />
  );
}
