const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
  AttachmentBuilder,
} = require("discord.js");
const Canvas = require("@napi-rs/canvas");
module.exports = {
  developer: false,
  data: new SlashCommandBuilder()
    .setName("amor")
    .setDescription("¿Cuanto amor hay entre tú y otra persona?")
    .addUserOption((options) =>
      options
        .setName("user")
        .setDescription("Usuario a evaluar.")
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const target = interaction.options.getUser("user");
    let random = `${Math.floor(Math.random() * 100)}%`;
    if (
      interaction.member.id == 997571433280577656 ||
      interaction.member.id == 746335792179314728
    ) {
      random = `100%`;
    }
    let corazon_porcentaje =
      "https://cdn.discordapp.com/attachments/1077731148060438741/1079011803952066630/amor.png";
    if (random >= 1 && random <= 25) {
      corazon_porcentaje =
        "https://cdn.discordapp.com/attachments/1077731148060438741/1079009244453548092/amor.png";
    } else if (random <= 50 && random >= 26) {
      corazon_porcentaje =
        "https://cdn.discordapp.com/attachments/1077731148060438741/1079011803952066630/amor.png";
    } else if (random <= 75 && random >= 51) {
      corazon_porcentaje =
        "https://cdn.discordapp.com/attachments/1077731148060438741/1079011803952066630/amor.png";
    } else if (random <= 99 && random >= 76) {
      corazon_porcentaje =
        "https://cdn.discordapp.com/attachments/1077731148060438741/1079011803952066630/amor.png";
    } else {
      corazon_porcentaje =
        "https://cdn.discordapp.com/attachments/1077731148060438741/1079011803952066630/amor.png";
    }
    const canvas = Canvas.createCanvas(610, 200);
    const ctx = canvas.getContext("2d");
    const background = await Canvas.loadImage(`${corazon_porcentaje}`);
    const heart = await Canvas.loadImage(
      "https://static.vecteezy.com/system/resources/thumbnails/008/470/226/small_2x/heart-anime-cute-character-cartoon-model-emotion-illustration-clipart-drawing-kawaii-manga-design-idea-art-free-png.png"
    );
    let myAvatar = interaction.member.displayAvatarURL({ extension: "jpg" });
    myAvatar = await Canvas.loadImage(myAvatar);
    let mentionAvatar = target.displayAvatarURL({ extension: "jpg" });
    mentionAvatar = await Canvas.loadImage(mentionAvatar);
    //dibujar el fondo
    ctx.save();
    ctx.filter = "blur(0px)";
    ctx.drawImage(background, 0, 0);
    ctx.restore();
    ctx.globalAlpha = 0.5;
    ctx.fillRect(16, 16, 1, 1);
    ctx.globalAlpha = 1;
    //Dibujar logo del autor
    ctx.save();
    ctx.beginPath();
    ctx.arc(124.5, 100, 77.5, 0, 2 * Math.PI);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#FFFFFF";
    ctx.stroke();
    ctx.clip();
    ctx.drawImage(myAvatar, 47, 22.5, 155, 155);
    ctx.restore();
    //Dibujar logo del usuario mencionado
    ctx.save();
    ctx.beginPath();
    ctx.arc(485.5, 100, 77.5, 0, 2 * Math.PI);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#FFFFFF";
    ctx.stroke();
    ctx.clip();
    ctx.drawImage(mentionAvatar, 408, 22.5, 155, 155);
    ctx.restore();
    //Dibujar corazón
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "40px Arial";
    ctx.fillText(random, 305, 100);

    const file = new AttachmentBuilder(canvas.toBuffer("image/jpeg"), {
      name: "amor.jpeg",
    });

    interaction.reply({ files: [file] });
  },
};
