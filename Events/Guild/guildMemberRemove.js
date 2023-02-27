const { GuildMember, EmbedBuilder, Guild } = require("discord.js");

module.exports = {
  name: "guildMemberRemove",
  /**
   *
   * @param {GuildMember} member
   */
  async execute(member, client) {
    const guildConfig = client.guildConfig.get(member.guild.id);
    if (!guildConfig) return;

    const logChannel = (await member.guild.channels.fetch()).get(
      guildConfig.logChannel
    );
    if (!logChannel) return;

    const accountCreation = parseInt(member.user.createdTimestamp / 1000);

    const Embed = new EmbedBuilder()
      .setAuthor({
        name: `${member.user.tag} | ${member.id}`,
        iconURL: member.displayAvatarURL({ dymanic: true }),
      })
      .setThumbnail(member.user.displayAvatarURL({ dymanic: true, size: 256 }))
      .setDescription(
        [
          `• Usuario: ${member.user}`,
          `• Tipo de cuenta: ${member.user.bot ? "Bot" : "Usuario"}`,
          `• Cuenta creada el: <t:${accountCreation}:D> | <t:${accountCreation}:R>`,
        ].join("\n")
      )
      .setFooter({ text: "Salió el" })
      .setTimestamp()
      .setColor("Red");

    logChannel.send({ embeds: [Embed] });
  },
};
