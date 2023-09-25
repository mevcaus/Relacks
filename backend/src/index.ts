const PORT = 3000;
Bun.serve({
  port: PORT,
  fetch(req, server) {
    if (server.upgrade(req)) {
      return
    }
    return new Response("Upgrade failed", { status: 500})
  },
  websocket: {
    message(ws, message) {
      ws.publish("general-chat", message);
     },
    open(ws) {
      ws.subscribe("general-chat")
     },
    close(ws, code, message) { },
    drain(ws) { },
  },
});
console.log(`listening on port: ${PORT}`);