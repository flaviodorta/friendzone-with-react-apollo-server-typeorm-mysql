import { useParams } from 'react-router';
import { useQuery } from '@apollo/client/index.js';
import { GET_USER_BY_ID } from '~/graphql/get-user-by-id';
import { useEffect } from 'react';
import { Navbar } from '~/components/navbar';
import { FaCamera } from 'react-icons/fa';
import { useAuth } from '~/context/auth-provider';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';

export default function ProfilePage() {
  const { userId } = useParams();

  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: { id: userId },
  });

  // const { session } = useAuth();

  useEffect(() => {
    console.log(data);
    // console.log(session);
  }, [data]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className='flex justify-center h-full items-center'>
          Carregando...
        </div>
        ;
      </div>
    );
  }

  return (
    <div className='h-full bg-white'>
      <Navbar />

      <div>
        <div className='relative w-full'>
          <div className='w-full h-[250px] bg-gray-300 relative shadow'>
            {data.getUserById.backgroundPhotoUrl ? (
              <img
                src={data.getUserById.backgroundPhotoUrl}
                alt='Capa'
                className='w-full h-full object-cover'
              />
            ) : (
              <div className='w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-lg'>
                Sem foto de capa
              </div>
            )}
            {/* <button className='absolute bottom-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full'>
              <FaCamera />
            </button> */}
            <div className='absolute bottom-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full'>
              <Label htmlFor='picture'>{/* <FaCamera /> */}</Label>
              <Input id='picture' type='file' />
            </div>
          </div>

          <div className='absolute -bottom-16 left-8 flex items-center'>
            <div className='w-[150px] h-[150px] rounded-full border-4 border-white bg-gray-200 overflow-hidden'>
              {data.getUserById.profilePhotoUrl ? (
                <img
                  src={data.getUserById.profilePhotoUrl}
                  alt='Perfil'
                  className='w-full h-full object-cover'
                />
              ) : (
                <div className='w-full h-full flex items-center justify-center text-gray-500'>
                  <FaCamera className='text-3xl' />
                </div>
              )}
            </div>
            <h1 className='ml-6 text-3xl font-bold'>
              {data.getUserById.firstName} {data.getUserById.lastName}
            </h1>
          </div>

          <div className='h-[100px]' />
        </div>
      </div>
    </div>
  );
}
