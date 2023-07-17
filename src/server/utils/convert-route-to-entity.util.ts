const mapping: Record<string, string> = {
  'flash-cards': 'flash_card',
  organizations: 'organization',
  progresses: 'progress',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
