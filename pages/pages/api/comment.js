import corsMiddleware from "../../lib/cors";
import { createCommant } from "./comment_utils/create_comment";
import { getCommant } from "./comment_utils/get_comment";

export default async function handler(req, res) {
  await corsMiddleware(req, res);

  let thesis;
  try {
    //================================================================
    if (req.method === "OPTIONS") {
      // Handle preflight request
      return res.status(200).end(); // Must respond to OPTIONS requests
    }

    if (req.method == "GET") {
      thesis = await getCommant(req);
    }

    //================================================================

    if (req.method == "POST") {
      thesis = await createCommant(req);
    }

    //================================================================

    if (req.method == "PUT") {
      thesis = await updateCommant();
    }

    //================================================================

    if (req.method == "DELETE") {
      thesis = await delCommant();
    }

    //================================================================
    if (thesis) {
      res.status(200).json(thesis);
    } else {
      res.status(404).json({ error: thesis.error });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
