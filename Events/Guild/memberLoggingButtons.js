const { ButtonInteraction, EmbedBuilder } = require("discord.js");
const embed = require("../../Commands/Public/Fun/embed");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {ButtonInteraction} interaction
   */
  async execute(interaction) {
    if (!interaction.isButton()) return;

    const splitArray = interaction.customId.split("-");
    if (splitArray[0] !== "MemberLogging") return;

    const member = (await interaction.guild.members.fetch()).get(splitArray[2]);
    const Embed = new EmbedBuilder();
    const errorArray = [];

    if (!interaction.member.permissions.has("KickMembers"))
      errorArray.push("No tienes los permisos requeridos para esta acción.");

    if (!member) errorArray.push("Este usuario ya no está en el servidor.");

    if (!member.moderatable)
      errorArray.push(
        "Este usuario no puede ser moderado por mi porque tiene un rol más alto."
      );

    if (errorArray.length)
      return interaction.reply({
        embeds: [Embed.setDescription(errorArray.join("\n"))],
        ephemeral: true,
      });

    switch (splitArray[1]) {
      case "Kick":
        {
          member
            .kick(
              `Kickeado por: ${interaction.user.tag} | Member Logging System`
            )
            .then(() => {
              interaction.reply({
                embeds: [Embed.setDescription(`${member} fue kickeado.`)],
              });
            })
            .catch(() => {
              interaction.reply({
                embeds: [Embed.setDescription(`${member} no fue kickeado.`)],
              });
            });
        }
        break;
      case "Ban":
        {
          member
            .ban(`Baneado por: ${interaction.user.tag} | Member Logging System`)
            .then(() => {
              interaction.reply({
                embeds: [Embed.setDescription(`${member} fue baneado.`)],
              });
            })
            .catch(() => {
              interaction.reply({
                embeds: [Embed.setDescription(`${member} no fue baneado.`)],
              });
            });
        }
        break;
    }
  },
};
