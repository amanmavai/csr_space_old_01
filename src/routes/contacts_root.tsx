import React from "react";
import { Outlet, useLoaderData, Form, redirect, NavLink, useNavigation, useSubmit, LoaderFunctionArgs } from "react-router-dom";
import { getContacts, createContact } from "../contacts";
import { queryClient } from "@/App";
import { useQuery } from "@tanstack/react-query";

const contactListQuery = (q: string) => ({
  queryKey: ["contacts", "list", q ?? "all"],
  queryFn: () => getContacts(q),
});

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q")??"";
  if (!queryClient.getQueryData(contactListQuery(q).queryKey)) {
    await queryClient.fetchQuery(contactListQuery(q));
  }
  return { q };
}

export async function action() {
  const contact = await createContact();
  queryClient.invalidateQueries({ queryKey: ['contacts', 'list'] })
  return redirect(`/cx/contacts/${contact.id}/edit`);
}

export function Component() {
  const { q } = useLoaderData()
  const { data: contacts } = useQuery(contactListQuery(q));

  const navigation = useNavigation();
  const submit = useSubmit();

  const searching = navigation.location && new URLSearchParams(navigation.location.search).has("q");

  React.useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  return (
    <div className="contacts_root">
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? "loading" : ""}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) => (isActive ? "active" : isPending ? "pending" : "")}
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail" className={navigation.state === "loading" ? "loading" : ""}>
        <Outlet />
      </div>
    </div>
  );
}
