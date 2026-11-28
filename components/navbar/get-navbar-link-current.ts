export function getNavbarLinkCurrent(pathname: string, href: string) {
  if (pathname === href) return "page";
  if (href !== "/" && pathname.startsWith(`${href}/`)) return "location";
}
