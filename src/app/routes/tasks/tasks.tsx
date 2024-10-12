import { Paper } from '@mantine/core';
import AddTask from '../../../features/tasks/components/TaskAdd';
import TasksList from '../../../features/tasks/components/TasksList';

export const TasksRoute = () => {
  //   const queryClient = useQueryClient();
  return (
    <Paper p="md" style={{ width: '100%', height: '100vh' }}>
      <AddTask />
      <TasksList />
    </Paper>
  );
};
