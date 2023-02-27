const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
} = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("ayuda")
    .setDescription("Testing embed message."),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setColor("#a6ffbe")
      .setTitle("Menú de ayuda")
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      })
      .setThumbnail(
        "https://cdn.discordapp.com/emojis/726893195052711948.gif?size=40"
      )
      .setImage(
        "https://cdn.discordapp.com/attachments/1057344339719753748/1077207254459228180/ab.png"
      )
      .setDescription("Esta es mi lista de comandos por ahora")
      .addFields({
        name: "Diversión",
        value: "`atractivo`, `memide`, `trans`, `pregunta`, `tequiero`, `amor`",
        inline: false,
      })
      .addFields({
        name: "Moderación",
        value: "`clear`, `timeout`",
        inline: false,
      })
      .setTimestamp()
      .setFooter({
        text: `Solicitado por: ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      });

    await interaction.reply({ embeds: [embed] });
  },
};
