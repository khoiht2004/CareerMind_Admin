import Pusher from "pusher-js";

const socketClient = new Pusher(import.meta.env.VITE_SOKETI_APP_KEY, {
  cluster: "mt1",
  wsHost: "127.0.0.1",
  wsPort: 6002,
  forceTLS: false,
  disableStats: true,
});

export default socketClient;
