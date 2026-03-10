# Notification Widget Integration Guide

This document explains how to integrate the `NotificationWidget` module in a React + TypeScript app.

## Purpose
Provide a reusable notification bell + dropdown UI with tabs and actions. It manages its own state via a context provider.

## Main Entry File
`src/notification-widget/NotificationWidget.tsx`

## Recommended Use (Minimal Integration)

```tsx
import { NotificationWidget } from "./notification-widget/NotificationWidget";

function AppHeader() {
  return (
    <header>
      <NotificationWidget />
    </header>
  );
}
```

## Where To Inject
Place the widget in your app shell, typically the top-right area of the header or navbar. Avoid wrapping the entire app unless multiple distant components need access to notifications.
