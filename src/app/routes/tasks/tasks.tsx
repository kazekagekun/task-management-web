import { Divider, Paper } from '@mantine/core';
import TasksList from '../../../features/tasks/components/TasksList';
import TaskHeader from '../../../features/tasks/components/TaskHeader';
import TaskSearch from '../../../features/tasks/components/TaskSearch';

export const TasksRoute = () => {
  //   const queryClient = useQueryClient();
  return (
    <Paper p="md" style={{ width: '100%', height: '100vh' }}>
      <div style={{ marginBottom: 30 }}>
        <TaskHeader />
        <TaskSearch />
      </div>
      <Divider />
      <TasksList />
    </Paper>
  );
};
