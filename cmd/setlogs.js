let Discord = require("discord.js");
const db = require("megadb");
const logs = new db.crearDB("logs");

exports.run = (client, message, args) => {
    let perms = message.member.hasPermission("MANAGE_GUILD");

    if (!perms)
      return message.channel.send(
        new Discord.RichEmbed()
          .setDescription(
            "❌ No tienes permisos de `Gestionar Servidor`"
          )
          .setColor("RED")
      );
    let canal =
      message.mentions.channels.first() || client.channels.get(args[0]);
    if (!canal)
      return message.reply(
        "❌ Debes mencionar un canal"
      );
     if(logs.tiene(message.guild.id)) return message.channel.send("❌ Los logs ya han sido establecidos anteriormente")
    message.channel.send(
      "☑️ El canal de logs ha sido establecido a " +
        canal
    );
    logs.establecer(message.guild.id, canal.id);
  }