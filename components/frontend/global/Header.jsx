import Link from "next/link";

export default function Header() {
  return (
    <div className="">
      <header className="px-4 container mx-auto flex justify-between  py-4">
        <div>GeniusPrep</div>
        <nav className="gap-2 flex">
          <Link href="#">Home</Link>
          <Link href="#">Tests</Link>
          <Link href="#">About</Link>
          <Link href="#">Contact</Link>
        </nav>
      </header>
    </div>
  );
}
