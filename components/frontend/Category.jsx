import Link from "next/link";

export default function Category({ title, link }) {
  return (
    <Link
      className="font-medium transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 max-w-fit flex gap-4 justify-between items-center bg-emerald-500 px-5 py-2 rounded-lg text-white focus:outline focus:outline-slate-900 focus:outline-3"
      href={link}
    >
      {title}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
        />
      </svg>
    </Link>
  );
}
