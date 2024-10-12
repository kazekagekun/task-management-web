import React from 'react';
import { AppShell, Box } from '@mantine/core';
import { SideNav } from './sideNavbar/SideNav';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <AppShell
      navbar={{ width: 300, breakpoint: 'sm' }}
      padding="md"
      styles={{
        main: {
          backgroundColor: 'var(--mantine-color-gray-0)',
        },
      }}
    >
      <AppShell.Navbar>
        <SideNav />
      </AppShell.Navbar>

      <AppShell.Main>
        <Box style={{ height: '100%', overflow: 'auto' }}>
          {children}
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}