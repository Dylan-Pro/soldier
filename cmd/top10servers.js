const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  let datos = await client.guilds.map(r => r.name);
  let member = await client.guilds.map(r => r.memberCount);
  let servidores = new Array();
  let botavatar = client.user.avatarURL;
  let bot = client.user.username;

  for (var key in datos)
    servidores.push({ key: key, nombre: datos[key], memberCount: member[key] });
  servidores.splice(10, false);
  servidores.sort((a, b) => b.memberCount - a.memberCount);
  const embed = new Discord.RichEmbed()
    .setColor("#5b00ff")
    .setTimestamp()
    .setFooter(
      "El bot tiene en total " +
        client.guilds.size.toLocaleString() +
        " servidores."
    )
    .setThumbnail(botavatar)
    .setAuthor(bot + " ┊ Top 10 Servers Más Grandes", botavatar)
    .setDescription(servidores.map((l, i) => `**${i + 1}**: Servidor: **${l.nombre}** | Usuarios: **${l.memberCount}**`).slice(false, 10).join("\n"));

  message.channel.send(embed);
};
