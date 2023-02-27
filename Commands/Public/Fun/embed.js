const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  Embed,
} = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Testing embed message."),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor("Aqua")
      .setTitle("Verifiy")
      .setURL("https://google.com")
      .setAuthor({ name: `Author name` })
      .setDescription("Hola esta es la descripción.")
      .addFields({ name: "A field", value: "Hola", inline: false })
      .addFields({ name: "A 2", value: "Hola", inline: false })
      .setTimestamp()
      .setFooter({ text: "Descripción." });

    await interaction.reply({ embeds: [embed] });
  },
};
