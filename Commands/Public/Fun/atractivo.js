const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
} = require("discord.js");
module.exports = {
  developer: false,
  data: new SlashCommandBuilder()
    .setName("atractivo")
    .setDescription("Evalua el atractivo de una persona")
    .addUserOption((options) =>
      options
        .setName("user")
        .setDescription("Usuario a evaluar.")
        .setRequired(false)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const Target = interaction.options.getUser("user");
    let random = Math.floor(Math.random() * 100);
    // esto hará que cuando el usuario con esa id use el comando sea el valor de dentro
    if (
      (interaction.member.id == 997571433280577656 && !Target) ||
      (Target && Target.id == 997571433280577656)
    ) {
      random = 100;
    }
    if (
      (interaction.member.id == 987663609414975519 && !Target) ||
      (Target && Target.id == 987663609414975519)
    ) {
      random = 0;
    }

    if (random >= 1 && random <= 25) {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setDescription(
          `${
            Target || interaction.member
          } es un: \n\n **${random}** % atractiv@, tus padres no tuvieron suerte <:emojicrying:1078356659732238466> `
        )
        .setColor("#4d4d4d")
        .setTimestamp(Date.now())
        .setThumbnail(
          "https://i.pinimg.com/originals/3e/1b/d8/3e1bd8319f6ac80538264f368ecdd6c6.png"
        )
        .setFooter({
          text: `Solicitado por: ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL(),
        });
      await interaction.reply({ embeds: [embed] });
    } else if (random <= 50 && random >= 26) {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setDescription(
          `${
            Target || interaction.member
          } es un: \n\n **${random}** % atractiv@, hay muchos peces en el mar  <:sharkblanketcry:1078731389760979054> `
        )
        .setColor("#800000")
        .setTimestamp(Date.now())
        .setThumbnail(
          "https://i.pinimg.com/originals/3e/1b/d8/3e1bd8319f6ac80538264f368ecdd6c6.png"
        )
        .setFooter({
          text: `Solicitado por: ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL(),
        });
      await interaction.reply({ embeds: [embed] });
    } else if (random <= 75 && random >= 51) {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setDescription(
          `${
            Target || interaction.member
          } es un: \n\n **${random}** % atractiv@, no estás nada mal <:woahsunglassesblush:1078356656250957875> `
        )
        .setColor("#ff0000")
        .setTimestamp(Date.now())
        .setThumbnail(
          "https://i.pinimg.com/originals/3e/1b/d8/3e1bd8319f6ac80538264f368ecdd6c6.png"
        )
        .setFooter({
          text: `Solicitado por: ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL(),
        });
      await interaction.reply({ embeds: [embed] });
    } else if (random <= 99 && random >= 76) {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setDescription(
          `${
            Target || interaction.member
          } es un: \n\n **${random}** % atractiv@, en tu casa o en la mia? <:huh:1078356658524278784> `
        )
        .setColor("#ff3333")
        .setTimestamp(Date.now())
        .setThumbnail(
          "https://i.pinimg.com/originals/3e/1b/d8/3e1bd8319f6ac80538264f368ecdd6c6.png"
        )
        .setFooter({
          text: `Solicitado por: ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL(),
        });
      await interaction.reply({ embeds: [embed] });
    } else if (random == 0) {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setDescription(
          `${
            Target || interaction.member
          } es un: \n\n **${random}** % atractiv@, mi madre diría lávate la boca con jabón, tú mejor lavate la cara <:sadness:1078733065679024170> `
        )
        .setColor("#000000")
        .setTimestamp(Date.now())
        .setThumbnail(
          "https://i.pinimg.com/originals/3e/1b/d8/3e1bd8319f6ac80538264f368ecdd6c6.png"
        )
        .setFooter({
          text: `Solicitado por: ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL(),
        });
      await interaction.reply({ embeds: [embed] });
    } else if (random == 100) {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setDescription(
          `${
            Target || interaction.member
          } es un: \n\n **${random}** % atractiv@, ojalá fueras un armario para empotrarte contra la pared  <:gigachad:1078733389869359276> `
        )
        .setColor("#ff0000")
        .setTimestamp(Date.now())
        .setThumbnail(
          "https://i.pinimg.com/originals/3e/1b/d8/3e1bd8319f6ac80538264f368ecdd6c6.png"
        )
        .setFooter({
          text: `Solicitado por: ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL(),
        });
      await interaction.reply({ embeds: [embed] });
    } else {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setDescription("Algo ha ido mal")
        .setColor("#a6ffbe")
        .setTimestamp(Date.now())
        .setFooter({
          text: `Solicitado por: ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL(),
        });
      await interaction.reply({ embeds: [embed] });
    }
  },
};
