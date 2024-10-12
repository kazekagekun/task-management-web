import React from 'react';
import {
  Modal,
  Button,
  TextInput,
  Textarea,
  Group,
  Stack,
  useMantineTheme,
  useMantineColorScheme,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { AddTaskFormValues, AddTaskSchema } from '../schema';

interface AddTaskModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (values: AddTaskFormValues) => void;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({
  opened,
  onClose,
  onSubmit,
}) => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  const form = useForm<AddTaskFormValues>({
    initialValues: {
      name: '',
      description: '',
      dueDate: new Date(),
    },
    validate: zodResolver(AddTaskSchema),
  });

  const handleSubmit = (values: AddTaskFormValues) => {
    onSubmit(values);
    form.reset();
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Add New Task"
      size="md"
      overlayProps={{
        color:
          colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label="Task Name"
            placeholder="Enter task name"
            {...form.getInputProps('name')}
          />
          <Textarea
            label="Description"
            placeholder="Enter task description"
            {...form.getInputProps('description')}
          />
          <DateTimePicker
            label="Due Date"
            placeholder="Select due date"
            minDate={new Date()}
            {...form.getInputProps('dueDate')}
          />
          <Group justify="flex-end" mt="md">
            <Button type="submit">Add Task</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
