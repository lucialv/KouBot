const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
  Client,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pregunta")
    .setDescription("Te responde a tu pregunta")
    .setDMPermission(true)
    .addStringOption((options) =>
      options
        .setName("pregunta")
        .setDescription("Dime la pregunta que quieres que te responda")
        .setRequired(true)
    ),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const pregunta = interaction.options.getString("pregunta");
    let replies = [
      `Puede que si.`,
      `Puede que no.`,
      `Si.`,
      `Si.`,
      `Si.`,
      `No.`,
      `No.`,
      `No.`,
      `Tal vez.`,
      `Tal vez no.`,
      `Tal vez si.`,
      `Quizás...`,
      `Quizás no...`,
      `Nunca se sabe.`,
      `Definitivame si.`,
      `UwU`,
    ];
    let respuesta = Math.floor(Math.random() * replies.length);
    const embed = new EmbedBuilder()
      .setColor("#a6ffbe")
      .setDescription(
        `${interaction.member} me hace una pregunta: \n\n<:flecha:1077014562085294090> Pregunta: **${pregunta}**\n\n<:flecha:1077014562085294090> Respuesta: **${replies[respuesta]}**`
      )
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      })
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/1077731148060438741/1078796163127451748/asd.png"
      )
      .setTimestamp(Date.now())
      .setFooter({
        text: `Solicitado por: ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      });

    await interaction.reply({ embeds: [embed] });
  },
};
