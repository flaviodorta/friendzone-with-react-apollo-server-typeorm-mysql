import { useRef, useState } from 'react';
import { FaSearch, FaUser } from 'react-icons/fa';
import { useOnClickOutside } from 'usehooks-ts';

export const Searchbar = ({
  query,
  setQuery,
  showDropdown,
  setShowDropdown,
  users,
}: {
  query: string;
  setQuery: (string: string) => void;
  showDropdown: boolean;
  setShowDropdown: (value: boolean) => void;
  users: any;
}) => {
  const [showDropdownMobile, setShowDropdownMobile] = useState(false);

  const ref = useRef(null);

  // @ts-ignore
  useOnClickOutside(ref, () => setShowDropdownMobile(false));

  return (
    <div className='flex absolute left-4 gap-4 items-center max-w-[400px] w-full'>
      <div className='bg-primary rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0'>
        <span className='text-white font-extrabold text-3xl'>f</span>
      </div>

      {/* mobile */}
      <div
        className='rounded-full flex items-center justify-center w-10 h-10 bg-gray-300 lg:hidden cursor-pointer'
        onClick={() => setShowDropdownMobile(true)}
      >
        <span className=''>
          <FaSearch />
        </span>
      </div>

      {showDropdownMobile && (
        <div
          ref={ref}
          className='fixed z-50 left-0 w-full p-4 top-0 bg-white shadow-2xl lg:hidden'
        >
          <span className='absolute top-1/2 -translate-y-1/2 left-8'>
            <FaSearch />
          </span>

          <input
            className='w-full pl-10 h-[40px] rounded-3xl bg-gray-300/80 outline-0'
            type='text'
            placeholder='Pesquisar no FriendZone'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={() => setShowDropdownMobile(false)}
          />

          {showDropdown && users.length > 0 && (
            <div className='absolute top-[100%] left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-[200px] overflow-auto z-50'>
              {users.map((user: any) => (
                <div
                  key={user.id}
                  className='px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm'
                  onClick={() => {
                    setQuery('');
                    setShowDropdown(false);
                    console.log('Usuário selecionado:', user);
                  }}
                >
                  <div className='flex gap-2 items-center'>
                    <div className='flex items-center justify-center bg-gray-300 rounded-full w-8 h-8'>
                      {user.profilePhotoUrl ? (
                        user.profilePhotoUrl
                      ) : (
                        <FaUser className='text-gray-500' />
                      )}
                    </div>
                    <span>
                      {user.firstName} {user.lastName}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* desktop */}
      <div className='relative w-full hidden lg:block'>
        <span className='absolute top-1/2 -translate-y-1/2 left-4'>
          <FaSearch />
        </span>

        <input
          className='w-full pl-10 h-[40px] rounded-3xl bg-gray-300/80 outline-0'
          type='text'
          placeholder='Pesquisar no FriendZone'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {showDropdown && users.length > 0 && (
          <div className='absolute top-[110%] left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-[200px] overflow-auto z-50'>
            {users.map((user: any) => (
              <div
                key={user.id}
                className='px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm'
                onClick={() => {
                  setQuery('');
                  setShowDropdown(false);
                  console.log('Usuário selecionado:', user);
                }}
              >
                <div className='flex gap-2 items-center'>
                  <div className='flex items-center justify-center bg-gray-300 rounded-full w-8 h-8'>
                    {user.profilePhotoUrl ? (
                      user.profilePhotoUrl
                    ) : (
                      <FaUser className='text-gray-500' />
                    )}
                  </div>
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
