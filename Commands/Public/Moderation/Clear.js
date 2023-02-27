const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
  Embed,
} = require("discord.js");

const Transcripts = require("discord-html-transcripts");
const { options } = require("mongoose/lib/utils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Borrar los mensajes que quieras")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setDMPermission(false)
    .addNumberOption((options) =>
      options
        .setName("cantidad")
        .setDescription("Di el numero de mensajes que quieres borrar.")
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(true)
    )
    .addStringOption((options) =>
      options
        .setName("razón")
        .setDescription(
          "Di una razón para decir porque quieres eliminar estos mensajes."
        )
        .setRequired(true)
    )
    .addUserOption((options) =>
      options
        .setName("objetivo")
        .setDescription("Dime el usuario del que quieres eliminar mensajes.")
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const Amount = interaction.options.getNumber("cantidad");
    const Reason = interaction.options.getString("razón");
    const Target = interaction.options.getUser("objetivo");

    const channelMessages = await interaction.channel.messages.fetch();
    const logChannel = interaction.guild.channels.cache.get(
      "1077018208365723698"
    );

    const responseEmbed = new EmbedBuilder().setColor("Aqua");
    const logEmbed = new EmbedBuilder()
      .setColor("Aqua")
      .setAuthor({ name: "Comando clear usado 🧹" });

    let logEmbedDescription = [
      `• Moderador: ${interaction.member}`,
      `• Objetivo: ${Target || "Ninguno"}`,
      `• Canal: ${interaction.channel}`,
      `• Razón: ${Reason}`,
    ];

    if (Target) {
      let i = 0;
      let messagesToDelete = [];
      channelMessages.filter((messages) => {
        if (messages.author.id === Target.id && Amount > i) {
          messagesToDelete.push(messages);
          i++;
        }
      });

      const Transcript = await Transcripts.generateFromMessages(
        messagesToDelete,
        interaction.channel
      );

      interaction.channel
        .bulkDelete(messagesToDelete, true)
        .then((messages) => {
          interaction.reply({
            embeds: [
              responseEmbed.setDescription(
                `🧹 Limpiados \`${messages.size}\` mensajes de ${Target}`
              ),
            ],
            ephemeral: true,
          });

          logEmbedDescription.push(`• Mensajes totales: ${messages.size}`);
          logChannel.send({
            embeds: [logEmbed.setDescription(logEmbedDescription.join("\n"))],
            files: [Transcript],
          });
        });
    } else {
      const Transcript = await Transcripts.createTranscript(
        interaction.channel,
        { limit: Amount }
      );

      interaction.channel.bulkDelete(Amount, true).then((messages) => {
        interaction.reply({
          embeds: [
            responseEmbed.setDescription(
              `🧹 Limpiados \`${messages.size}\` mensajes`
            ),
          ],
          ephemeral: true,
        });
        logEmbedDescription.push(`• Mensajes totales: ${messages.size}`);
        logChannel.send({
          embeds: [logEmbed.setDescription(logEmbedDescription.join("\n"))],
          files: [Transcript],
        });
      });
    }
  },
};
