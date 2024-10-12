import React, { useEffect } from 'react';
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
import { IconEdit, IconTrash, IconDots } from '@tabler/icons-react';
import { useSearchParams } from 'react-router-dom';
import Loader from '../../../components/ui/Loader';
import { useTasks } from '../api/GetTasks';

type Status = 'Not urgent' | 'Due soon' | 'Overdue';

const getStatus = (dueDate: string): Status => {
  const date = dayjs(dueDate);
  const now = dayjs();
  const diffDays = date.diff(now, 'day');

  if (diffDays < 0) return 'Overdue';
  if (diffDays <= 7) return 'Due soon';
  return 'Not urgent';
};

const statusColors: Record<Status, string> = {
  'Not urgent': 'teal',
  'Due soon': 'yellow',
  Overdue: 'red',
};

const TasksList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = +(searchParams.get('page') || 1);

  const { data, isLoading, isError, error, refetch } = useTasks({ page });

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
            <Menu.Item leftSection={<IconEdit size="1rem" />}>Edit</Menu.Item>
            <Menu.Item leftSection={<IconTrash size="1rem" />} color="red">
              Delete
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
            <Table.Th>Name</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Created Date</Table.Th>
            <Table.Th>Due Date</Table.Th>
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
    </>
  );
};

export default TasksList;
