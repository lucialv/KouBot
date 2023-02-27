const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sugerir")
    .setDescription("Crear una sugerencia.")
    .setDMPermission(false)
    .addStringOption((options) =>
      options
        .setName("pregunta")
        .setDescription("Dime la pregunta de la encuesta.")
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const pollQuestion = interaction.options.getString("pregunta");

    const pollEmbed = new EmbedBuilder()
      .setDescription("**Sugerencia/Opinion**\n" + pollQuestion)
      .setImage("https://i.ibb.co/vxdBKFd/Untitled-1.gif")
      .addFields([
        { name: "Si", value: "0", inline: true },
        { name: "No", value: "0", inline: true },
      ])
      .setColor([104, 204, 156]);

    const replyObject = await interaction.reply({
      embeds: [pollEmbed],
      fetchReply: true,
    });

    const pollButtons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Si")
        .setCustomId(`Encuesta-Si-${replyObject.id}`)
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setLabel("No")
        .setCustomId(`Encuesta-No-${replyObject.id}`)
        .setStyle(ButtonStyle.Danger)
    );

    interaction.editReply({ components: [pollButtons] });
  },
};
