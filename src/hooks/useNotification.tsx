import { notifications } from '@mantine/notifications';

type NotificationType = 'error' | 'info' | 'success';

interface NotificationConfig {
  color: string;
  icon?: React.ReactNode;
  title: string;
}

const notificationConfigs: Record<NotificationType, NotificationConfig> = {
  error: { color: 'red', title: 'Error' },
  info: {
    color: 'blue',
    title: 'Information',
  },
  success: {
    color: 'green',
    title: 'Success',
  },
};

export const useNotification = () => {
  const showNotification = (type: NotificationType, message: string) => {
    const config = notificationConfigs[type];
    notifications.show({
      title: config.title,
      message: message,
      color: config.color,
      icon: config.icon,
    });
  };

  return { showNotification };
};
