const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
  EmbedBuilder,
} = require("discord.js");

const Database = require("../../../Schemas/Infractions");
const ms = require("ms");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Timeout a un miembro para que no se pueda comunicar.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .setDMPermission(false)
    .addUserOption((options) =>
      options
        .setName("objetivo")
        .setDescription("Escoge a un usuario.")
        .setRequired(true)
    )
    .addStringOption((options) =>
      options
        .setName("duracion")
        .setDescription("Pon una duracion para el timeout (1m,1h,1d)")
        .setRequired(true)
    )
    .addStringOption((options) =>
      options
        .setName("razon")
        .setDescription("Di una razon para este timeout.")
        .setMaxLength(512)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const { options, guild, member } = interaction;

    const target = options.getMember("objetivo");
    const duration = options.getString("duracion");
    const reason = options.getString("razon") || "No especificado";

    const errorsArray = [];

    const errorsEmbed = new EmbedBuilder()
      .setAuthor({ name: "No pude encontrar a ese usuario." })
      .setColor("Red");

    if (!target)
      return interaction.reply({
        embeds: [
          errorsEmbed.setDescription("Puede que se haya salido del servidor."),
        ],
        ephemeral: true,
      });

    if (!ms(duration) || ms(duration) > ms("28d"))
      errorsArray.push(
        "El tiempo que has dicho es invalido o sobrepasa el limite de 28 días."
      );

    if (!target.manageable || !target.moderatable)
      errorsArray.push("El usuario no puede ser moderado por este bot.");

    if (member.roles.highest.position < target.roles.highest.position)
      errorsArray.push("El usuario tiene un rol más alto que tú.");

    if (errorsArray.length)
      return interaction.reply({
        embeds: [errorsEmbed.setDescription(errorsArray.join("\n"))],
        ephemeral: true,
      });

    target.timeout(ms(duration), reason).catch((err) => {
      interaction.reply({
        embeds: [
          errorsEmbed.setDescription(
            "No pude hacer timeout al usuario debido a un error."
          ),
        ],
      });
      return console.log("Error ocurrido in Timeout.js"), err;
    });

    const newInfractionsObject = {
      IssuerID: member.id,
      IssuerTag: member.user.tag,
      Reason: reason,
      Date: Date.now(),
    };

    let userData = await Database.findOne({ Guild: guild.id, User: target.id });
    if (!userData)
      userData = await Database.create({
        Guild: guild.id,
        User: target.id,
        Infractions: [newInfractionsObject],
      });
    else
      userData.Infractions.push(newInfractionsObject) &&
        (await userData.save());

    const succesEmbed = new EmbedBuilder()
      .setAuthor({ name: "Timeout", iconURL: guild.iconURL() })
      .setColor("Red")
      .setDescription(
        [
          `${target} fue timeado por **${ms(ms(duration), {
            long: true,
          })}** por ${member}`,
          `Sus infracciones totales son **${userData.Infractions.length} puntos**.`,
          `\nRazón: ${reason}`,
        ].join("\n")
      );

    return interaction.reply({ embeds: [succesEmbed] });
  },
};
