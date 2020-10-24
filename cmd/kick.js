exports.run = (client, message, args) => {
  let Discord = require("discord.js")

   let perms = message.member.hasPermission("KICK_MEMBERS");

    if (!perms)
      return message.channel.send(
        "❌ No tienes permisos de `Expulsar Miembros`."
      );

  let user = message.mentions.users.first() || client.users.get[0]

  if(!user) return message.channel.send("❌ Debes mencionar a alguien")

  let razon = args.slice(1).join(" ")

  if(!razon) return message.channel.send("❌ Debes colocar una razon")

  if (!message.guild.member(user).bannable)
      return message.reply(
        "❌ No puedo banear al usuario mencionado (mayor rango) o (mi rango esta en posicion pequeño)"
      );


 message.guild.member(user).kick(razon);
  const embed = new Discord.RichEmbed()
  .setAuthor(`📌 Usuario Kickeado`, client.user.displayAvatarURL)
  .addField("👤 **Usuario Kickeado:**", user.username)
  .addField("🆔 **ID Kickeado:**", user.id)
  .setThumbnail(user.displayAvatarURL)
  .addField("👮‍♂️ **Staff:**", message.author)
  .addField("⚒️ **Razon:**", razon)
  message.channel.send(embed)

  const md = new Discord.RichEmbed()
  .setAuthor("📌 Fuiste kickeado en "+message.guild.name)
  .addField("👤 **Staff:**", message.author)
  .setThumbnail(message.guild.iconURL)
  .addField("⚒️ **Razon:**", razon)
  message.guild.member(user.id).send(md);
}