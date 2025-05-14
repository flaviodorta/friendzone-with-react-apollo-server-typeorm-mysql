// 'use client';

import type { Route } from '../+types/root';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import { Input } from '../components/ui/input';
import IconsBackground from '~/components/icons-background';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import { useLogin } from '~/hooks/use-login';
import { FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { useCreateUser } from '~/hooks/use-create-user';

const formSchemaSignIn = z.object({
  email: z
    .string()
    .min(2, { message: 'Enter a valid email address to continue.' })
    .max(50),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters.' })
    .max(64),
});

const formSchemaSignUp = z.object({
  email: z.string().email().min(2, { message: 'Enter a valid email address.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters.' }),
  firstName: z.string().min(1, { message: 'First name is required.' }),
  lastName: z.string().min(1, { message: 'Last name is required.' }),
  birthday: z.string().min(1, { message: 'Birthdate is required.' }), // pode validar melhor depois
  gender: z.enum(['male', 'female', 'other']),
});

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'FriendZone' },
    { name: 'description', content: 'Welcome to new social media!' },
  ];
}

export default function Login() {
  const [login, { loading, error }] = useLogin();
  const [createUser] = useCreateUser();
  const navigate = useNavigate();
  const formSignIn = useForm<z.infer<typeof formSchemaSignIn>>({
    resolver: zodResolver(formSchemaSignIn),
    defaultValues: {
      email: 'jimmy@gmail.com',
      password: '12345678',
    },
  });

  const formSignUp = useForm<z.infer<typeof formSchemaSignUp>>({
    resolver: zodResolver(formSchemaSignUp),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      birthday: '',
      gender: 'other',
    },
  });

  async function onSubmitSignIn(values: z.infer<typeof formSchemaSignIn>) {
    try {
      const { data } = await login({
        variables: {
          email: values.email,
          password: values.password,
        },
      });
      console.log(data);
      navigate('/feed');
    } catch (err) {
      console.error('erro login', err);
    }
  }

  async function onSubmitSignUp(values: z.infer<typeof formSchemaSignUp>) {
    try {
      // console.log(values);
      const { data } = await createUser({
        variables: {
          email: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
          birthday: values.birthday,
          gender: values.gender,
        },
      });
      console.log(data);
    } catch (err) {
      console.log('error sign up', err);
    }
  }

  return (
    <div className='h-full flex  justify-center'>
      <IconsBackground />

      <Tabs defaultValue='Sign In' className='z-10 w-[600px] mt-[12%]'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='Sign In'>Sign In</TabsTrigger>
          <TabsTrigger value='Sign Up'>Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value='Sign In'>
          <div className='h-fit w-[600px]  p-4 z-10 bg-gray-50 rounded-lg shadow'>
            <h1 className='text-center text-5xl text-primary font-extrabold mb-8 mt-4'>
              FriendZone
            </h1>

            <Form {...formSignIn}>
              <form
                onSubmit={formSignIn.handleSubmit(onSubmitSignIn)}
                className='space-y-8'
              >
                <FormField
                  control={formSignIn.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type='email' placeholder='Email' {...field} />
                      </FormControl>
                      <FormDescription>This is your email.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formSignIn.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='Password'
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Input your password.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type='submit' className='w-full cursor-pointer'>
                  {loading && <FaSpinner />} Log in to your account
                </Button>
              </form>
            </Form>
          </div>
        </TabsContent>

        <TabsContent value='Sign Up'>
          <div className='h-fit w-[600px]  p-4 z-10 bg-gray-50 rounded-lg shadow'>
            <h1 className='text-center text-5xl font-extrabold mb-8 mt-4'>
              FriendZone
            </h1>

            <Form {...formSignUp}>
              <form
                onSubmit={formSignUp.handleSubmit(onSubmitSignUp)}
                className='space-y-6'
              >
                <div className='flex items-start gap-4'>
                  <FormField
                    control={formSignUp.control}
                    name='firstName'
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder='John' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formSignUp.control}
                    name='lastName'
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder='Doe' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='flex items-start gap-4'>
                  <FormField
                    control={formSignUp.control}
                    name='birthday'
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel>Birthdate</FormLabel>
                        <FormControl>
                          <Input type='date' className='block' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={formSignUp.control}
                    name='gender'
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className='w-full flex-1 rounded-md border px-3 py-2 text-sm'
                          >
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                            <option value='other'>Other</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={formSignUp.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type='email' placeholder='Email' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formSignUp.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='Password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type='submit' className='w-full cursor-pointer'>
                  Create your account
                </Button>
              </form>
            </Form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
