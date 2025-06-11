import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

const MenuButton = () => {
  const pathname = usePathname();
  
  const pages = [
    { href: "/",        label: "Home" },
    { href: "/familytree", label: "FamilyTree" },
    { href: "/about",   label: "About" },
  ];

  const visiblePages = pages.filter((p) => p.href !== pathname);

  return (
    <div className="collapse bg-base-100 rounded-box">
      <input type="checkbox" className="peer" />
      <div className="collapse-title">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          {/* hamburger icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </div>
      </div>

      <div className="collapse-content flex items-center">
        {visiblePages.map((page, idx) => (
          <Fragment key={page.href}>
            <Link href={page.href} className="px-2">
              {page.label}
            </Link>
            {/* only show OR between items, not after the last */}
            {idx < visiblePages.length - 1 && (
              <div className="divider divider-horizontal divider-neutral h-20 gap-1">
                OR
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default MenuButton;
