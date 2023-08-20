import * as React from "react";
import { Outlet, Link, createBrowserRouter, RouterProvider, NavLink } from "react-router-dom";
import cn from "classnames";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Modal } from "antd";
import Contact, { loader as contactLoader, action as contactAction } from "./routes/contact";
import ErrorPage from "./error-page";
import EditContact, { action as editAction } from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
import Index from "./routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "cx",
        // Single route in lazy file
        lazy: () => import("./routes/contacts_root"),
        children: [
          { index: true, element: <Index /> },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
            errorElement: <ErrorPage />,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: "contacts/:contactId/destroy",
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
      {
        path: "todos",
        lazy: () => import("./routes/todos"),
      },
      {
        path: "ag-grid-eg",
        lazy: () => import("./routes/ag_grid_eg"),
      },
      {
        path: "components-playground",
        lazy: () => import("./routes/components_playground"),
      },
      {
        path: "traffic-light",
        lazy: () => import("./routes/traffic_light"),
      },
      {
        path: "hooks-flow",
        lazy: () => import("./routes/hooks_flow"),
      },
      {
        path: "*",
        element: <NoMatch />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

function NavItem({
  to,
  text,
  onClick,
}: {
  to: string;
  text: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <NavLink
      onClick={onClick}
      to={to}
      className={({ isActive }) =>
        cn(
          isActive ? "font-semibold text-gray-800" : "font-normal text-gray-600",
          "rounded-lg p-1 transition-all hover:bg-gray-200 sm:px-3 sm:py-2"
        )
      }
    >
      <span>{text}</span>
    </NavLink>
  );
}

const navItems = [
  { name: "Home", to: "/" },
  { name: "Blog", to: "/blog" },
  { name: "Play", to: "/play" },
  { name: "Dashboard", to: "/dashboard" },
  { name: "Todos", to: "/todos" },
  { name: "AgGrid Table", to: "/ag-grid-eg" },
  { name: "Components Playground", to: "/components-playground" },
  { name: "Traffic Light", to: "/traffic-light" },
  { name: "Hooks Flow", to: "/hooks-flow" },
];

type MenuItem = {
  name: string;
  to: string;
};

type MenuProps = {
  navItems: MenuItem[];
};

function MobileMenu({ navItems }: MenuProps) {
  const [open, setOpen] = React.useState(false);
  const buttonResetClasses = "cursor-pointer border-0 bg-transparent bg-none text-inherit";

  function closeModal() {
    setOpen(false);
  }

  return (
    <div className="mr-2 md:hidden">
      <div className="flex">
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            "ml-auto",
            buttonResetClasses,
            "inline-flex items-center justify-center rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
          )}
        >
          <Bars3Icon className="block h-6 w-6" />
        </button>
      </div>
      <div>
        <Modal
          title={null}
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          style={{ position: "fixed", top: 8, right: 8 }}
          className="rounded-md md:hidden"
          width={320}
          footer={null}
          closeIcon={<XMarkIcon className="block h-6 w-6" />}
        >
          <div className="space-y-4">
            {navItems.map((n) => {
              return (
                <div key={n.name} className="hover:text-sky-500">
                  <NavItem to={n.to} text={n.name} onClick={closeModal} />
                </div>
              );
            })}
          </div>
        </Modal>
      </div>
    </div>
  );
}

function DesktopMenu({ navItems }: MenuProps) {
  return (
    <div className="hidden md:block">
      {navItems.map((n) => {
        return <NavItem key={n.name} to={n.to} text={n.name} />;
      })}
    </div>
  );
}
function Header() {
  return (
    <nav>
      <MobileMenu navItems={navItems} />
      <DesktopMenu navItems={navItems} />
    </nav>
  );
}

function Footer() {
  return (
    <p className="flex items-center justify-center text-sm font-light tracking-widest">
      Copyright &copy; {new Date().getFullYear()} All Rights Reserved by Aman
    </p>
  );
}

function Layout() {
  const classes = "py-6 sm:px-6 lg:px-8";
  return (
    <div className="remix-app container mx-auto flex h-full flex-col">
      <header className={classes}>
        <Header />
      </header>
      <div className={cn(classes, "flex-1")}>
        <Outlet />
      </div>
      <footer className={cn(classes, "h-6")}>
        <Footer />
      </footer>
    </div>
  );
}

function NoMatch() {
  return (
    <div className="text-lg p-4 flex flex-col gap-4 items-center">
      <h2 className="text-orange-500">Nothing to see here!</h2>
      <p>
        <Link to="/" className="text-blue-400">
          Go to the home page
        </Link>
      </p>
    </div>
  );
}

function Home() {
  return (
    <div className="justify-center flex text-2xl text-green-500">
      <h2>Home</h2>
    </div>
  );
}
