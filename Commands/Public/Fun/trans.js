const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
} = require("discord.js");
module.exports = {
  developer: false,
  data: new SlashCommandBuilder()
    .setName("trans")
    .setDescription("Dice que tan transexual es una persona")
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
    if (
      (interaction.member.id == 997571433280577656 && !Target) ||
      (Target && Target.id == 997571433280577656)
    ) {
      random = 100;
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
          } es: \n\n **${random}**% trans, creo que no es trans.`
        )
        .setColor("#33a6ff")
        .setTimestamp(Date.now())
        .setThumbnail(
          "https://images.reporteindigo.com/wp-content/uploads/2021/11/Bandera-del-orgullo-trans-%C2%BFcual-es-el-significado-de-sus-colores.jpg"
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
          } es: \n\n **${random}**% trans, quizás es un poco trans.`
        )
        .setColor("#6fbfff")
        .setTimestamp(Date.now())
        .setThumbnail(
          "https://images.reporteindigo.com/wp-content/uploads/2021/11/Bandera-del-orgullo-trans-%C2%BFcual-es-el-significado-de-sus-colores.jpg"
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
          } es: \n\n **${random}**% trans, creo que debería replantearselo.`
        )
        .setColor("#ff5bd6")
        .setTimestamp(Date.now())
        .setThumbnail(
          "https://images.reporteindigo.com/wp-content/uploads/2021/11/Bandera-del-orgullo-trans-%C2%BFcual-es-el-significado-de-sus-colores.jpg"
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
          } es: \n\n **${random}**% trans, debería de ir a cambiarse el nombre al sexo contrario. `
        )
        .setColor("#ff7fdf")
        .setTimestamp(Date.now())
        .setThumbnail(
          "https://images.reporteindigo.com/wp-content/uploads/2021/11/Bandera-del-orgullo-trans-%C2%BFcual-es-el-significado-de-sus-colores.jpg"
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
          } es: \n\n **${random}**% trans, no se por qué pero creo que no eres trans.`
        )
        .setColor("#0a92ff")
        .setTimestamp(Date.now())
        .setThumbnail(
          "https://images.reporteindigo.com/wp-content/uploads/2021/11/Bandera-del-orgullo-trans-%C2%BFcual-es-el-significado-de-sus-colores.jpg"
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
          } es: \n\n **${random}**% trans, dicen que viene con sorpresa. `
        )
        .setColor("#ff9be6")
        .setTimestamp(Date.now())
        .setThumbnail(
          "https://images.reporteindigo.com/wp-content/uploads/2021/11/Bandera-del-orgullo-trans-%C2%BFcual-es-el-significado-de-sus-colores.jpg"
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
        .setDescription(`Algo ha ido mal`)
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
