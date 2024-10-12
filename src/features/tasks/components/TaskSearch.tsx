import React, { useState, useEffect } from 'react';
import { Group, TextInput, Button, ActionIcon } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';
import { useSearchParams } from 'react-router-dom';
import { useTasks } from '../api/GetTasks';

const TaskSearch: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchName, setSearchName] = useState(searchParams.get('name') || '');
  const [searchDescription, setSearchDescription] = useState(
    searchParams.get('description') || '',
  );

  const page = +(searchParams.get('page') || 1);
  const sort = searchParams.get('sort') || 'createdAt';
  const order = searchParams.get('order') || 'desc';

  const { refetch } = useTasks({
    page,
    sort,
    order,
    name: searchParams.get('name') || undefined,
    description: searchParams.get('description') || undefined,
  });

  useEffect(() => {
    // This effect will run whenever searchParams changes
    refetch();
  }, [searchParams, refetch]);

  const updateSearchParams = (name: string | null, description: string | null) => {
    setSearchParams((prev) => {
      if (name) prev.set('name', name);
      else prev.delete('name');
      if (description) prev.set('description', description);
      else prev.delete('description');
      prev.set('page', '1'); // Reset to first page when search changes
      return prev;
    });
  };

  const handleSearch = () => {
    updateSearchParams(searchName || null, searchDescription || null);
  };

  const handleClear = () => {
    setSearchName('');
    setSearchDescription('');
    updateSearchParams(null, null);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Group mb="md" align="flex-end">
      <TextInput
        placeholder="Search by name"
        value={searchName}
        onChange={(event) => setSearchName(event.currentTarget.value)}
        onKeyPress={handleKeyPress}
        style={{ flex: 1 }}
        rightSection={
          searchName && (
            <ActionIcon onClick={() => setSearchName('')} variant="transparent">
              <IconX size="1rem" />
            </ActionIcon>
          )
        }
      />
      <TextInput
        placeholder="Search by description"
        value={searchDescription}
        onChange={(event) => setSearchDescription(event.currentTarget.value)}
        onKeyPress={handleKeyPress}
        style={{ flex: 1 }}
        rightSection={
          searchDescription && (
            <ActionIcon onClick={() => setSearchDescription('')} variant="transparent">
              <IconX size="1rem" />
            </ActionIcon>
          )
        }
      />
      <Button
        leftSection={<IconSearch size="1rem" />}
        onClick={handleSearch}
        variant="filled"
      >
        Search
      </Button>
      <Button
        onClick={handleClear}
        variant="outline"
        color="gray"
      >
        Clear
      </Button>
    </Group>
  );
};

export default TaskSearch;