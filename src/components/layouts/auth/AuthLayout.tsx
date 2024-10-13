import { Paper, Title } from '@mantine/core';
import classes from './AuthLayout.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useUser } from '../../../lib/auth';

type LayoutProps = {
  children: React.ReactNode;
};

export function AuthLayout({ children }: LayoutProps) {
  const user = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (user.data) {
      navigate('/app', {
        replace: true,
      });
    }
  }, [user.data, navigate]);

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back!
        </Title>
        {children}
      </Paper>
    </div>
  );
}
