import clsx from "clsx";
import NavLink from "./nav-link";

interface IAsideProps {
  className?: string;
}

const navList = [
  { link: "/order", title: "Order" },
  { link: "/product", title: "Products" },
];

const Aside = ({ className }: IAsideProps) => {
  return (
    <aside
      className={clsx("bg-white h-full shadow-md w-full max-w-40", className)}
    >
      <nav className="py-5">
        <ul className="space-y-2 flex flex-col items-center">
          {navList.map((link) => (
            <li key={link.link}>
              <NavLink href={link.link}>{link.title}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Aside;
