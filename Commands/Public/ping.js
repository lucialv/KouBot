const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Will respond with pong."),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction) {
    interaction.reply({
      content:
        "https://cdn.discordapp.com/attachments/1027586256588251177/1067156013523931278/Sin_titulo-1.png",
    });
  },
};
