const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client,
} = require("discord.js");
module.exports = {
  developer: false,
  data: new SlashCommandBuilder()
    .setName("tequiero")
    .setDescription("Mandas amor al bot"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (interaction.member.id == 997571433280577656) {
      interaction.reply({
        content: `${interaction.user} yo te quiero mucho más mi creador <:corarosa:1077016121238102167>`,
      });
    } else {
      interaction.reply({
        content: `${interaction.user} yo también te quiero <:corarosa:1077016121238102167>`,
      });
    }
  },
};
