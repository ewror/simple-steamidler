require("dotenv").config();
const steamUser = require("steam-user");
const client = new steamUser();

const games = [730];

process.on("unhandledRejection", (err) =>
  console.error(`Unhandled error: ${err.message}`, err.stack)
);
process.on("uncaughtException", (err) =>
  console.error(`Uncatched error: ${err.message}`, err.stack)
);

(async () => {
  console.log("Logging in...");
  client.logOn({
    accountName: process.env.ACCOUNTNAME,
    password: process.env.PASSWORD,
  });

  client.on("loggedOn", () => {
    console.log("Successfully logged in and idling now");
    client.setPersona(1);
    client.gamesPlayed(games, { force: true });
  });

  client.on("disconnected", (result, msg) => {
    console.log("DISCONNECTED - " + msg);
  });

  client.on("error", (err) => {
    console.log("STEAM ERROR - " + err);
  });
})();
