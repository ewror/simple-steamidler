const BotClient = require("./BotClient");
const accounts = require("./accounts.json");

process.on("unhandledRejection", (err) =>
  console.error(`Unhandled error: ${err.message}`, err.stack)
);
process.on("uncaughtException", (err) =>
  console.error(`Uncatched error: ${err.message}`, err.stack)
);

(async () => {
  for (let i = 0; i < accounts.length; i++) {
    const client = new BotClient(i);
    await client.login();
  }
})();
