import {
  type RouteConfig,
  index,
  route,
  layout,
} from '@react-router/dev/routes';

export default [
  index('routes/auth.tsx'),

  layout('components/protected-route.tsx', [route('feed', 'routes/feed.tsx')]),
] satisfies RouteConfig;
