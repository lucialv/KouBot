const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
  EmbedBuilder,
  ChannelType,
} = require("discord.js");
const { options } = require("mongoose/lib/utils");
const database = require("../../../Schemas/MemberLog");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup_memberlog")
    .setDescription("Configurar el sistema de unirse al servidor")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDMPermission(false)
    .addChannelOption((options) =>
      options
        .setName("log_channel")
        .setDescription("Selecciona el canal del sistema de log.")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    )
    .addRoleOption((options) =>
      options
        .setName("member_role")
        .setDescription(
          "Pon el rol que debería de ser añadido automaticamente a los nuevos usuarios."
        )
    )
    .addRoleOption((options) =>
      options
        .setName("bot_role")
        .setDescription(
          "Pon el rol que debería de ser añadido automaticamente a los nuevos bots."
        )
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const { guild, options } = interaction;

    const logChannel = options.getChannel("log_channel").id;

    let memberRole = options.getRole("member_role")
      ? options.getRole("member_role").id
      : null;

    let botRole = options.getRole("bot_role")
      ? options.getRole("bot_role").id
      : null;

    await database.findOneAndUpdate(
      { Guild: guild.id },
      {
        logChannel: logChannel,
        memberRole: memberRole,
        botRole: botRole,
      },
      { new: true, upsert: true }
    );

    client.guildConfig.set(guild.id, {
      logChannel: logChannel,
      memberRole: memberRole,
      botRole: botRole,
    });

    const Embed = new EmbedBuilder()
      .setColor("Green")
      .setDescription(
        [
          `- Loggin Channel Actualizado: <#${logChannel}>`,
          `- Member Auto-Role Actualizado: ${
            memberRole ? `<@&${memberRole}>` : "No especeficado."
          }`,
          `- Bot Auto-Role Actualizado: ${
            botRole ? `<@&${botRole}>` : "No especeficado."
          }`,
        ].join("\n")
      );

    return interaction.reply({ embeds: [Embed] });
  },
};
