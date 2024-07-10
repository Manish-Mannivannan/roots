import Link from "next/link";

const MenuButton = () => {
  return (
    <div className="collapse bg-base-100 rounded-box">
      <input type="checkbox" className="peer" />
      <div className="collapse-title">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
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
        <Link href="/">Home</Link>
        <div className="divider divider-horizontal divider-neutral h-20 gap-1">
          OR
        </div>
        <Link href="/about">About</Link>
      </div>
    </div>
  );
};

export default MenuButton;
