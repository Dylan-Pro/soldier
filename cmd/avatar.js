exports.run = (client, message, args) => {
  let Discord = require("discord.js")

  let user = message.mentions.users.first() || message.author;
  const ava = new Discord.RichEmbed()
  .setAuthor(`🍺 Perfil de ${user.username} [${user.id}]`)
  .addField("🔗 Link", `[**Click Aquí**](${user.avatarURL})`)
  .setImage(user.displayAvatarURL)
  .setColor("RANDOM")
  message.channel.send(ava)
}