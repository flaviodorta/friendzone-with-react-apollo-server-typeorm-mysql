import {
  type RouteConfig,
  index,
  route,
  layout,
} from '@react-router/dev/routes';

export default [
  index('routes/auth.tsx'),

  layout('components/protected-route.tsx', [
    route('feed', 'routes/feed.tsx'),
    route('friends', 'routes/friends.tsx'),
    route('groups', 'routes/groups.tsx'),
    route('profile/:userId', 'routes/profile.tsx'),
  ]),
] satisfies RouteConfig;
