import React from 'react';
import { Group, Title, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { z } from 'zod';
import { AddTaskSchema } from '../schema';
import { useAddTask } from '../api/AddTask';
import { useNotification } from '../../../hooks/useNotification';
import { AddTaskModal } from './TaskAddModal';

const TaskHeader: React.FC = () => {
  const [modalOpened, setModalOpened] = React.useState(false);
  const { showNotification } = useNotification();
  const addTaskMutation = useAddTask();

  const handleAddTask = (newTask: z.infer<typeof AddTaskSchema>) => {
    addTaskMutation.mutate(newTask, {
      onSuccess: () => {
        showNotification('success', 'Task added successfully');
        setModalOpened(false);
      },
      onError: (error) => {
        showNotification('error', `Error adding task: ${error}`);
      },
    });
  };

  return (
    <>
      <Group justify="space-between" mb="20">
        <Title order={2}>Task Scheduler</Title>
        <Button
          leftSection={<IconPlus size="1rem" />}
          onClick={() => setModalOpened(true)}
          loading={addTaskMutation.isPending}
        >
          Add New Task
        </Button>
      </Group>
      <AddTaskModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        onSubmit={handleAddTask}
      />
    </>
  );
};

export default TaskHeader;
