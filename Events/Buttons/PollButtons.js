const { ButtonInteraction } = require("discord.js");

const votedMembers = new Set();
module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {ButtonInteraction} interaction
   */
  async execute(interaction) {
    if (!interaction.isButton()) return;

    const splittedArray = interaction.customId.split("-");
    if (splittedArray[0] !== "Encuesta") return;

    if (votedMembers.has(`${interaction.user.id}-${interaction.message.id}`))
      return interaction.reply({ content: "Ya has votado!", ephemeral: true });

    votedMembers.add(`${interaction.user.id}-${interaction.message.id}`);

    const pollEmbed = interaction.message.embeds[0];
    if (!pollEmbed)
      return interaction.reply({
        content:
          "Contacta con el desarrollador porque no puedo encontrar la encuesta.",
        ephemeral: true,
      });

    const yesField = pollEmbed.fields[0];
    const noField = pollEmbed.fields[1];

    const VoteCountedReply = "¡Gracias por tu voto!";

    switch (splittedArray[1]) {
      case "Si":
        {
          const newYesCount = parseInt(yesField.value) + 1;
          yesField.value = newYesCount;

          interaction.reply({ content: VoteCountedReply, ephemeral: true });
          interaction.message.edit({ embeds: [pollEmbed] });
        }
        break;
      case "No":
        {
          const newNoCount = parseInt(noField.value) + 1;
          noField.value = newNoCount;

          interaction.reply({ content: VoteCountedReply, ephemeral: true });
          interaction.message.edit({ embeds: [pollEmbed] });
        }
        break;
    }
  },
};
