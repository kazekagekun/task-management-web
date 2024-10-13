import { useState } from 'react';
import { Group } from '@mantine/core';
import { IconLogout, IconChecklist } from '@tabler/icons-react';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './SideNav.module.css';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../../lib/auth';

const data = [{ link: '/app/tasks', label: 'Tasks', icon: IconChecklist }];

export function SideNav() {
  const { mutate: logout, isPending } = useLogout();
  const [active, setActive] = useState('Tasks');
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        navigate('/auth/login');
      },
      onError: (error) => {
        console.error('Logout failed:', error);
      },
    });
  };

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        navigate(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <MantineLogo size={28} />
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => {
            event.preventDefault();
            handleLogout();
          }}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>{isPending ? 'Logging out...' : 'Logout'}</span>
        </a>
      </div>
    </nav>
  );
}
