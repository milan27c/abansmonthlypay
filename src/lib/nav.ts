export interface NavLink {
  href: string;
  label: string;
}

/**
 * The three sections of the landing page. Shared by the header and the footer
 * so the two can never drift apart. Every destination is on the same page.
 */
export const navLinks: NavLink[] = [
  { href: "/#phones", label: "Phones" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#showrooms", label: "Showrooms" },
];
