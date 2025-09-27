import corsMiddleware from "../../lib/cors";
import cors, { runMiddleware } from "../../lib/cors";
import { createThesis } from "./thesis_utils/create_thesis";
import { delThesis } from "./thesis_utils/del_thesis";
import { getThesis } from "./thesis_utils/get_thesis";
import { updateThesis } from "./thesis_utils/update_thesis";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "100mb", // Set to an appropriate size, e.g., '10mb' or '50mb'
    },
  },
};

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
      thesis = await getThesis(req);
    }

    //================================================================

    if (req.method == "POST") {
      thesis = await createThesis(req);
    }

    //================================================================

    if (req.method == "PUT") {
      thesis = await updateThesis(req);
    }

    //================================================================

    if (req.method == "DELETE") {
      thesis = await delThesis(req);
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
