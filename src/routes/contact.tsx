import { Form, useFetcher, useParams } from "react-router-dom";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router-dom";
import { getContact, updateContact } from "../contacts";
import { queryClient } from "@/App";
import { useQuery } from "@tanstack/react-query";

const contactDetailQuery = (id: string) => ({
  queryKey: ["contacts", "detail", id],
  queryFn: async () => {
    const contact = await getContact(id);
    if (!contact) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
    return contact;
  },
});

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const query = contactDetailQuery(params.contactId as string);
  return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  let formData = await request.formData();
  const contact = await updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
  await queryClient.invalidateQueries({ queryKey: ["contacts"] });
  return contact;
};

export default function Contact() {
  const params = useParams();
  const { data: contact } = useQuery(contactDetailQuery(params.contactId as string));

  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={contact.avatar || null} />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a target="_blank" rel="noreferrer" href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }) {
  const fetcher = useFetcher();
  let favorite = contact.favorite;
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
