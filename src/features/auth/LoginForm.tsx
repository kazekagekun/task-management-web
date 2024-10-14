import React, { useEffect } from 'react';
import { TextInput, PasswordInput, Button, Stack, Text } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { useLogin } from '../../lib/auth';
import { useNavigate } from 'react-router-dom';

const LoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(6, { message: 'Password should be at least 6 characters' }),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { mutate: login, isPending, isSuccess, isError } = useLogin();

  const form = useForm<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: zodResolver(LoginSchema),
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = form.values;
    login(values);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/app'); // Redirect to dashboard on successful login
    }
  }, [isSuccess, navigate]);

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput
          label="Email address"
          placeholder="hello@gmail.com"
          size="md"
          {...form.getInputProps('email')}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          size="md"
          {...form.getInputProps('password')}
        />
        {isError && (
          <Text color="red" size="sm">
            {'An error occurred during login'}
          </Text>
        )}
        <Button fullWidth mt="xl" size="md" type="submit" loading={isPending}>
          Login
        </Button>
      </Stack>
    </form>
  );
};
