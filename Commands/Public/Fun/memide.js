const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
  GatewayIntentBits,
} = require("discord.js");
const client = new Client({ intents: GatewayIntentBits.Guilds });
module.exports = {
  developer: false,
  data: new SlashCommandBuilder()
    .setName("memide")
    .setDescription("Cuanto te mide?")
    .addUserOption((options) =>
      options
        .setName("miembro")
        .setDescription("Usuario a evaluar.")
        .setRequired(false)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const Target = interaction.options.getUser("miembro");
    const random = Math.floor(Math.random() * 30);
    if (
      (interaction.member.id == 997571433280577656 && !Target) ||
      (Target && Target.id == 997571433280577656)
    ) {
      random = 100;
    }
    if (random <= 9) {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setDescription(
          `A ${
            Target || interaction.member
          } le mide: \n\n **${random}** cm, tranqui, el tamaño no importa <:emojicrying:1078356659732238466> `
        )
        .setColor("#ff0000")
        .setTimestamp(Date.now())
        .setThumbnail(
          "https://images.vexels.com/media/users/3/230811/isolated/preview/752f6ac978c2ce839303371eaa383478-dibujos-animados-de-platano-a-medio-pelar.png"
        )
        .setFooter({
          text: `Solicitado por: ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL(),
        });
      await interaction.reply({ embeds: [embed] });
    } else if (random <= 19) {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setDescription(
          `A ${
            Target || interaction.member
          } le mide: \n\n **${random}** cm, no está mal <:woahsunglassesblush:1078356656250957875>`
        )
        .setColor("#ffffb3")
        .setTimestamp(Date.now())
        .setThumbnail(
          "https://images.vexels.com/media/users/3/230811/isolated/preview/752f6ac978c2ce839303371eaa383478-dibujos-animados-de-platano-a-medio-pelar.png"
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
        .setDescription(
          `A ${
            Target || interaction.member
          } le mide: \n\n **${random}** cm, vaya titán <:huh:1078356658524278784>`
        )
        .setColor("#a6ffbe")
        .setTimestamp(Date.now())
        .setThumbnail(
          "https://images.vexels.com/media/users/3/230811/isolated/preview/752f6ac978c2ce839303371eaa383478-dibujos-animados-de-platano-a-medio-pelar.png"
        )
        .setFooter({
          text: `Solicitado por: ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL(),
        });
      await interaction.reply({ embeds: [embed] });
    }
  },
};
