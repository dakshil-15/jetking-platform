import type { Route } from 'next';

/** Centralised route builders so path strings never leak into components. */
export const ROUTES = {
  home: () => '/chatbot' as Route,
  conversation: (conversationId: string) => `/chatbot/c/${conversationId}` as Route,
  projects: () => '/chatbot/projects' as Route,
  artifacts: () => '/chatbot/artifacts' as Route,
} as const;
