const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  ActivityType,
} = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages],
  partials: [User, Message, GuildMember, ThreadMember],
});

client.config = require("./config.json");
client.events = new Collection();
client.commands = new Collection();
client.subCommands = new Collection();
client.guildConfig = new Collection();
client.on("ready", () => {
  client.user.setPresence({
    activities: [{ name: `Blanes`, type: ActivityType.Watching }],
    status: "online",
  });
});
const mongoose = require("mongoose");
const databaseurl = process.env['DatabaseURL']
mongoose
  .connect(databaseurl, {})
  .then(() => console.log("The client is now connected to the database."));

const { loadEvents } = require("./Handlers/eventHandler");
loadEvents(client);

const { loadConfig } = require("./Functions/configLoader");
loadConfig(client);
const mySecret = process.env['token']
client.login(mySecret);
