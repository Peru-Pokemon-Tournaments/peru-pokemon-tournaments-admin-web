export interface SidebarLink {
  name: string;
  path: string;
  icon: { prefix: string; name: string };
}

export interface NavigationState {
  sidebarLinks: SidebarLink[];
}
