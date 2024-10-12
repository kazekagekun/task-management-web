import { notifications } from '@mantine/notifications';
import { IconCheck, IconX, IconInfoCircle } from '@tabler/icons-react';

type NotificationType = 'error' | 'info' | 'success';

interface NotificationConfig {
  color: string;
  icon: React.ReactNode;
  title: string;
}

const notificationConfigs: Record<NotificationType, NotificationConfig> = {
  error: { color: 'red', icon: <IconX size="1.1rem" />, title: 'Error' },
  info: {
    color: 'blue',
    icon: <IconInfoCircle size="1.1rem" />,
    title: 'Information',
  },
  success: {
    color: 'green',
    icon: <IconCheck size="1.1rem" />,
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
