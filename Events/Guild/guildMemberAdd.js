const {
  GuildMember,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "guildMemberAdd",
  /**
   *
   * @param {GuildMember} member
   */
  async execute(member, client) {
    const guildConfig = client.guildConfig.get(member.guild.id);
    if (!guildConfig) return;

    const guildRoles = member.guild.roles.cache;
    let assignedRole = member.user.bot
      ? guildRoles.get(guildConfig.botRole)
      : guildRoles.get(guildConfig.memberRole);

    if (!assignedRole) assignedRole = "No configurado.";
    else
      await member.roles.add(assignedRole).catch(() => {
        assignedRole = "Fallo por la jerarquía de roles.";
      });

    const logChannel = (await member.guild.channels.fetch()).get(
      guildConfig.logChannel
    );
    if (!logChannel) return;

    let color = "#74e21e";
    let risk = "Parece seguro";

    const accountCreation = parseInt(member.user.createdTimestamp / 1000);
    const joiningTime = parseInt(member.joinedAt / 1000);

    const monthsAgo = moment().subtract(2, "months").unix();
    const weeksAgo = moment().subtract(2, "weeks").unix();
    const daysAgo = moment().subtract(2, "days").unix();

    if (accountCreation >= monthsAgo) {
      color = "#e2bb1e";
      risk = "Medium";
    }
    if (accountCreation >= weeksAgo) {
      color = "#e24d1e";
      risk = "High";
    }
    if (accountCreation >= daysAgo) {
      color = "#e21e1e";
      risk = "Extreme";
    }

    const Embed = new EmbedBuilder()
      .setAuthor({
        name: `${member.user.tag} | ${member.id}`,
        iconURL: member.displayAvatarURL({ dymanic: true }),
      })
      .setColor(color)
      .setThumbnail(member.user.displayAvatarURL({ dymanic: true, size: 256 }))
      .setDescription(
        [
          `• Usuario: ${member.user}`,
          `• Tipo de cuenta: ${member.user.bot ? "Bot" : "Usuario"}`,
          `• Rol añadido: ${assignedRole}`,
          `• Nivel de Riesgo: ${risk}\n`,
          `• Cuenta creada el: <t:${accountCreation}:D> | <t:${accountCreation}:R>`,
          `• Cuenta unida el: <t:${joiningTime}:D> | <t:${joiningTime}:R>`,
        ].join("\n")
      )
      .setFooter({ text: "Se ha unido el" })
      .setTimestamp();

    if (risk == "Extreme" || risk == "High") {
      const Buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(`MemberLogging-Kick-${member.id}`)
          .setLabel("Kick")
          .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
          .setCustomId(`MemberLogging-Ban-${member.id}`)
          .setLabel("Ban")
          .setStyle(ButtonStyle.Danger)
      );

      return logChannel.send({ embeds: [Embed], components: [Buttons] });
    } else return logChannel.send({ embeds: [Embed] });
  },
};
