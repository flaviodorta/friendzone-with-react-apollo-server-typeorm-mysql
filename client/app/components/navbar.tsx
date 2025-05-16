import { useEffect, useRef, useState } from 'react';
import { FaSearch, FaUser } from 'react-icons/fa';
import { useSearchUsers } from '~/hooks/use-search-users';
import { Searchbar } from './searchbar';

export const Navbar = () => {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const [searchUsers, { data, loading }] = useSearchUsers();

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

  return (
    <div className='w-full px-8 flex justify-between items-center bg-gray-100 shadow h-[60px]'>
      <Searchbar
        setQuery={setQuery}
        query={query}
        setShowDropdown={setShowDropdown}
        showDropdown={showDropdown}
        users={users}
      />
    </div>
  );
};
