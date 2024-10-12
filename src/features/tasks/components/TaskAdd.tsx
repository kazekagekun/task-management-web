import { Group, Title, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

const AddTask: React.FC = () => {
  return (
    <Group justify="space-between" mb="md">
      <Title order={2}>Task Scheduler</Title>
      <Button
        leftSection={<IconPlus size="1rem" />}
        onClick={() => {
          console.log('hello');
        }}
      >
        Add New Task
      </Button>
    </Group>
  );
};

export default AddTask;
