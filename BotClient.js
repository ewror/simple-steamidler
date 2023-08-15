const steamUser = require("steam-user");
const accounts = require("./accounts.json");

module.exports = class BotClient {
  constructor(a) {
    this.client = new steamUser();

    this.account = accounts[a];

    this.client.on("disconnected", (result, msg) => {
      console.log("DISCONNECTED - " + msg);
    });

    this.client.on("error", (err) => {
      console.log("STEAM ERROR - " + err);
    });
  }

  async login() {
    return new Promise((resolve) => {
      this.client.logOn({
        accountName: this.account.username,
        password: this.account.password,
      });
      this.client.on("loggedOn", (details) => {
        return new Promise(() => {
          console.log("Successfully logged in /" + details.vanity_url);
          this.client.setPersona(1);
          this.client.gamesPlayed(this.account.games, { force: true });
          console.log(`Idling [${this.account.games.join(", ")}]`);
        }).then(resolve());
      });
    });
  }
};
