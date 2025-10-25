import { Navbar } from '~/components/navbar';
import { useAuth } from '~/context/auth-provider';

export default function Feed() {
  const { session } = useAuth();
  console.log(session);
  return (
    <div>
      <Navbar />
      <div>feed {session!.user.firstName}</div>
    </div>
  );
}
