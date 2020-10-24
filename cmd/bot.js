exports.run = async (client, message, args) => {
  const db = require('megadb')
  let Discord = require("discord.js")
  let user = message.author;
  const vips_db = new db.crearDB("vips", "vips")
  const vip = await vips_db.obtener("vips")
  if (vip.includes(user.id) == false) return message.channel.send(
    new Discord.RichEmbed()
      .setDescription("❌ No eres VIP y por lo tanto no puedes ejecutar este comando")
      .setColor("RED"))

  let id = args.join(" ");

  if (!id)
    return message.channel.send(
      "❌ Ingresa ID de un bot!"
    );
  if (isNaN(args[0]))
    return message.channel.send(
      "❌ Debe colocar una ID real"
    );
  const embed = new Discord.RichEmbed()
    .setAuthor("🔌 | Invitación")
    .setColor("RANDOM")
    .setThumbnail(message.author.displayAvatarURL)
    .addField(
      "🎫 | Invitación Bot",
      "[Click Aqui!](https://discordapp.com/api/oauth2/authorize?client_id=" +
      id +
      "&permissions=8&scope=bot)"
    )
    .addField("🤖 | Bot", "<@!" + id + ">")
  message.channel.send(embed);
}
