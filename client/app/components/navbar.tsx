import { useEffect, useRef, useState } from 'react';
import { FaSearch, FaUser } from 'react-icons/fa';
import { FaBell } from 'react-icons/fa';
import { MdGroups2, MdLogout } from 'react-icons/md';
import { useSearchUsers } from '~/hooks/use-search-users';
import { Searchbar } from './searchbar';
import { GoHomeFill } from 'react-icons/go';
import { FaUserFriends } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router';
import { cn } from '~/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { useAuth } from '~/context/auth-provider';
import { useOnClickOutside } from 'usehooks-ts';
import { useApolloClient, useMutation } from '@apollo/client/index.js';
import { REVOKE_SESSION } from '~/graphql/revoke-session';

export const Navbar = () => {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const [searchUsers, { data, loading }] = useSearchUsers();

  const location = useLocation();
  const navigate = useNavigate();

  const isFeedRoute = location.pathname === '/feed';
  const isFriendsRoute = location.pathname === '/friends';
  const isGroupsRoute = location.pathname === '/groups';

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim().length > 0) {
        searchUsers({ variables: { name: query } });
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
      }
    }, 300); // debounce 300ms

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const users = data?.getUsersByName ?? [];

  const [showDropdownUser, setShowdropdownUser] = useState(false);

  const { session } = useAuth();

  const ref = useRef<HTMLDivElement>(null!);

  useOnClickOutside(ref, () => setShowdropdownUser(false));

  const refDropdown = useRef<HTMLDivElement>(null);
  const refButton = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        refDropdown.current &&
        refButton.current &&
        !refDropdown.current.contains(event.target as Node) &&
        !refButton.current.contains(event.target as Node)
      ) {
        setShowdropdownUser(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [
    revokeSession,
    { loading: loadingRevokeSession, error, data: dataRevokeSession },
  ] = useMutation(REVOKE_SESSION);

  const client = useApolloClient();

  const handleLogout = async () => {
    try {
      const response = await revokeSession({
        variables: { sessionId: session?.id },
      });

      if (response?.data?.revokeSession) {
        console.log(
          'Sessão revogada com sucesso!',
          response?.data?.revokeSession
        );
        navigate('/', { replace: true });
        await client.clearStore();
      }
    } catch (err) {
      console.log('Error ao revogar sessão', err);
    }
  };

  useEffect(() => {
    console.log('session', session);
  }, [session]);

  return (
    <TooltipProvider>
      <div className='w-full relative px-2 flex justify-center items-center bg-gray-100 shadow h-[60px]'>
        <Searchbar
          setQuery={setQuery}
          query={query}
          setShowDropdown={setShowDropdown}
          showDropdown={showDropdown}
          users={users}
        />

        <div className='flex gap-4'>
          <Tooltip>
            <TooltipTrigger>
              <div
                onClick={() => navigate('/feed')}
                className={cn(
                  'relative group hover w-16 h-12 hover:bg-gray-300/30 rounded-2xl cursor-pointer flex items-center justify-center',
                  !isFeedRoute && 'text-gray-400'
                )}
              >
                <GoHomeFill className='text-2xl' />

                <span
                  className={cn(
                    'absolute -bottom-1.5 bg-primary h-1 w-0 group-hover:w-full origin-left rounded-2xl transition-[width] duration-150',
                    isFeedRoute && 'w-full'
                  )}
                ></span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Feed</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <div
                onClick={() => navigate('/friends')}
                className={cn(
                  'relative group hover w-16 h-12 hover:bg-gray-300/30 rounded-2xl cursor-pointer flex items-center justify-center',
                  !isFriendsRoute && 'text-gray-400'
                )}
              >
                <FaUserFriends className='text-2xl' />

                <span
                  className={cn(
                    'absolute -bottom-1.5 bg-primary h-1 w-0 group-hover:w-full origin-left rounded-2xl transition-[width] duration-150',
                    isFriendsRoute && 'w-full'
                  )}
                ></span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Friends</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <div
                onClick={() => navigate('/groups')}
                className={cn(
                  'relative group hover w-16 h-12 hover:bg-gray-300/30 rounded-2xl cursor-pointer flex items-center justify-center',
                  !isGroupsRoute && 'text-gray-400'
                )}
              >
                <MdGroups2 className='text-2xl' />

                <span
                  className={cn(
                    'absolute -bottom-1.5 bg-primary h-1 w-0 group-hover:w-full origin-left rounded-2xl transition-[width] duration-150',
                    isGroupsRoute && 'w-full'
                  )}
                ></span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Groups</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* <div className='bg-red-600 w-[200px] h-[50px]'></div> */}

        {/* right side */}
        <div className='fixed right-4 flex gap-4'>
          <Tooltip>
            <TooltipTrigger>
              <div className='w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer'>
                <FaBell />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Notifications</p>
            </TooltipContent>
          </Tooltip>
          <div
            ref={refButton}
            onClick={() => setShowdropdownUser((prev) => !prev)}
            className='w-10 h-10 relative rounded-full bg-gray-300 flex items-center justify-center cursor-pointer'
          >
            <FaUser />

            {showDropdownUser && (
              <div
                ref={refDropdown}
                className='absolute p-4 flex flex-col gap-4 top-[130%] rounded-xs right-0 bg-white shadow w-[200px] h-[100px]'
              >
                <div
                  onClick={() => navigate(`/profile/${session?.user.id}`)}
                  className='flex gap-2 items-center'
                >
                  <span>
                    {session?.user.profilePhotoUrl ? (
                      session?.user.profilePhotoUrl
                    ) : (
                      <FaUser />
                    )}
                  </span>
                  <span>{session?.user.firstName}</span>
                </div>
                <div onClick={handleLogout} className='flex items-center gap-2'>
                  <span>
                    <MdLogout />
                  </span>
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};
