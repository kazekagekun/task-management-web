import React, { useEffect } from 'react';
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
import { UpdateTaskFormValues, UpdateTaskSchema } from '../schema';
import dayjs from 'dayjs';

interface UpdateTaskModalProps {
  opened: boolean;
  data: UpdateTaskFormValues;
  onClose: () => void;
  onSubmit: (values: UpdateTaskFormValues) => void;
}

export const UpdateTaskModal: React.FC<UpdateTaskModalProps> = ({
  opened,
  data,
  onClose,
  onSubmit,
}) => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  const form = useForm<UpdateTaskFormValues>({
    initialValues: data,
    validate: zodResolver(UpdateTaskSchema),
  });

  console.log(data);

  useEffect(() => {
    form.setValues({
      ...data,
      dueDate: dayjs(data.dueDate).toDate(),
    });
  }, [data]);

  const handleSubmit = (values: UpdateTaskFormValues) => {
    onSubmit(values);
    form.reset();
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Update New Task"
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
            <Button type="submit">Update Task</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
