import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {
  Table,
  Badge,
  ActionIcon,
  Menu,
  Pagination,
  Group,
  Text,
} from '@mantine/core';
import { IconEdit, IconDots } from '@tabler/icons-react';
import { useSearchParams } from 'react-router-dom';
import Loader from '../../../components/ui/Loader';
import { useTasks } from '../api/GetTasks';
import { UpdateTaskModal } from './TaskUpdateModal';
import { z } from 'zod';
import { useNotification } from '../../../hooks/useNotification';
import { UpdateTaskSchema } from '../schema';
import { useUpdateTask } from '../api/UpdateTask';
import TableHeader from '../../../components/ui/Table/TableHeader';
import { Task } from '../interface';

type Status = 'Not urgent' | 'Due soon' | 'Overdue';

const getStatus = (dueDate: Date): Status => {
  const date = dayjs(dueDate);
  const now = dayjs();

  if (date.isBefore(now)) return 'Overdue';
  if (date.diff(now, 'day') <= 7) return 'Due soon';
  return 'Not urgent';
};

const statusColors: Record<Status, string> = {
  'Not urgent': 'teal',
  'Due soon': 'yellow',
  Overdue: 'red',
};

const TasksList: React.FC = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const { showNotification } = useNotification();
  const updateTaskMutation = useUpdateTask();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = +(searchParams.get('page') || 1);
  const sort = searchParams.get('sort') || 'createdAt';
  const order = searchParams.get('order') || 'desc';

  const { data, isLoading, isError, error, refetch } = useTasks({
    page,
    sort,
    order,
  });
  const [sortBy, setSortBy] = useState<keyof Task | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof Task) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSearchParams({ sort: field, order: reversed ? 'desc' : 'asc' });
    refetch();
  };

  const [editingTask, setEditingTask] = useState<Task>({
    id: '',
    name: '',
    description: '',
    dueDate: new Date(),
    createdAt: new Date(),
  });

  const handleUpdateTask = (updatedTask: z.infer<typeof UpdateTaskSchema>) => {
    updateTaskMutation.mutate(updatedTask, {
      onSuccess: () => {
        showNotification('success', 'Task updated successfully');
        setModalOpened(false);
      },
      onError: (error) => {
        showNotification('error', `Error adding task: ${error}`);
      },
    });
  };

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  if (isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Loader size="sm" />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading tasks: {(error as Error).message}</div>;
  }

  const tasks = data?.data?.data?.data || [];
  const totalPages = data?.data?.data?.pageTotal || 1;

  const rows = tasks.map((task) => (
    <Table.Tr key={task.id}>
      <Table.Td>{task.id}</Table.Td>
      <Table.Td>{task.name}</Table.Td>
      <Table.Td>{task.description}</Table.Td>
      <Table.Td>{dayjs(task.createdAt).format('DD-MM-YYYY HH:mm:ss')}</Table.Td>
      <Table.Td>{dayjs(task.dueDate).format('DD-MM-YYYY HH:mm:ss')}</Table.Td>
      <Table.Td>
        <Badge color={statusColors[getStatus(task.dueDate)]}>
          {getStatus(task.dueDate)}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <ActionIcon variant="subtle">
              <IconDots size="1rem" />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              leftSection={<IconEdit size="1rem" />}
              onClick={() => {
                setEditingTask(task);
                setModalOpened(true);
              }}
            >
              Edit
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Table.Td>
    </Table.Tr>
  ));

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  return (
    <>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <TableHeader
              sorted={sortBy === 'id'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('id')}
            >
              Id
            </TableHeader>
            <TableHeader
              sorted={sortBy === 'name'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('name')}
            >
              Name
            </TableHeader>
            <TableHeader
              sorted={sortBy === 'description'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('description')}
            >
              Description
            </TableHeader>
            <TableHeader
              sorted={sortBy === 'createdAt'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('createdAt')}
            >
              Created Date
            </TableHeader>
            <TableHeader
              sorted={sortBy === 'dueDate'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('dueDate')}
            >
              Due Date
            </TableHeader>
            <Table.Th>Status</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <Group justify="space-between" mt="md">
        <Text size="sm">
          Page {page} of {totalPages}
        </Text>
        <Pagination
          total={totalPages}
          value={page}
          onChange={handlePageChange}
        />
      </Group>
      <UpdateTaskModal
        data={editingTask}
        opened={modalOpened}
        onClose={() => {
          setModalOpened(false);
          setEditingTask({
            id: '',
            name: '',
            description: '',
            dueDate: new Date(),
            createdAt: new Date(),
          });
        }}
        onSubmit={handleUpdateTask}
      />
    </>
  );
};

export default TasksList;
