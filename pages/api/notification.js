import corsMiddleware from "../../lib/cors";
import { createNotification } from "./notification_utils/create_notification";
import { delNotification } from "./notification_utils/del_notification";
import { getNotification } from "./notification_utils/get_notification";
import { updateNotification } from "./notification_utils/update_notification";

export default async function handler(req, res) {
  await corsMiddleware(req, res);
  let notification;
  try {
    //================================================================
    if (req.method === "OPTIONS") {
      // Handle preflight request
      return res.status(200).end(); // Must respond to OPTIONS requests
    }

    if (req.method == "GET") {
      notification = await getNotification(req);
    }

    //================================================================

    if (req.method == "POST") {
      notification = await createNotification(req);
    }

    //================================================================

    if (req.method == "PUT") {
      notification = await updateNotification(req);
    }

    //================================================================

    if (req.method == "DELETE") {
      notification = await delNotification(req);
    }

    //================================================================

    if (notification) {
      res.status(200).json(notification);
    } else {
      res.status(404).json({ error: notification.error });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
