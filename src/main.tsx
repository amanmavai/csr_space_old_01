import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ContactsRoot, { loader as contactsRootLoader, action as contactsRootAction } from "./routes/contacts_root";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Contact, { loader as contactLoader, action as contactAction } from "./routes/contact";
import EditContact, { action as editAction } from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
import Index from "./routes/index";
import "./styles/tailwind.css";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "cx",
        element: <ContactsRoot />,
        errorElement: <ErrorPage />,
        loader: contactsRootLoader,
        action: contactsRootAction,
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
