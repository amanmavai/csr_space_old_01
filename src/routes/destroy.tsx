import { ActionFunctionArgs, redirect } from "react-router-dom";
import { deleteContact } from "../contacts";
import { queryClient } from "@/App";

export async function action({ params }: ActionFunctionArgs) {
  await deleteContact(params.contactId);
  queryClient.invalidateQueries({ queryKey: ['contacts'] })
  return redirect("/cx/");
}