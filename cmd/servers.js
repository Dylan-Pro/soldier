exports.run = async (client, message, args) => {
  const Discord = require("discord.js");
 const embed = new Discord.RichEmbed()
 .setAuthor(`Estoy en ${client.guilds.size} servidores`)
 .setDescription(client.guilds.map(r => r.name + ` | Cantidad: **${r.memberCount}** `).join("\n"))
 .setColor("GREEN")
.setThumbnail(client.user.displayAvatarURL)
 message.channel.send(embed)
}