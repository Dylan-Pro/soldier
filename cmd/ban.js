exports.run = (client, message, args) => {
  let Discord = require("discord.js");

  let perms = message.member.hasPermission("BAN_MEMBERS");

  if (!perms)
    return message.channel.send("❌ No tienes permisos de `Banear Miembros`.");

  let user = message.mentions.users.first() || client.users.get[0];

  let embed1 = new Discord.RichEmbed()
    .setColor("RED")
    .setDescription(`❌ Mencione a alguien para añadirle dinero`);

  if (!user) {
    return message.channel.send(embed1);
  }

  let razon = args.slice(1).join(" ");

  let embed2 = new Discord.RichEmbed()
    .setColor("RED")
    .setDescription(`❌ Debes especificar una razon`);

  if (!razon) {
    return message.channel.send(embed2);
  }

  if (!message.guild.member(user).bannable)
    return message.reply(
      "❌ No puedo banear al usuario mencionado (mayor rango) o (mi rango esta en posicion pequeño)"
    );

  message.guild.member(user).ban(razon);
  const embed = new Discord.RichEmbed()
    .setAuthor(`📌 Usuario Baneado`, client.user.displayAvatarURL)
    .addField("👤 **Usuario Baneado:**", user.username)
    .setThumbnail(user.displayAvatarURL)
    .addField("🆔 **ID Baneado:**", user.id)
    .addField("👮‍♂️ **Staff:**", message.author)
    .addField("⚒️ **Razon:**", razon);
  message.channel.send(embed);

  const md = new Discord.RichEmbed()
    .setAuthor("📌 Fuiste baneado en " + message.guild.name)
    .addField("👤 **Staff:**", message.author)
    .setThumbnail(message.guild.iconURL)
    .addField("⚒️ **Razon:**", razon);
  message.guild.member(user.id).send(md);
};
