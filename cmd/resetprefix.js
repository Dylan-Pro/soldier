exports.run = async (client, message, args) => {
  let Discord = require("discord.js")
const db = require("megadb")
const prefix_db = new db.crearDB("prefixes");
let perms = message.member.hasPermission("ADMINISTRATOR");

    if (!perms)
      return message.channel.send(
        "❌ No tienes permisos de `Administrador`."
      );
   if(!args[0]) await prefix_db.delete(`${message.guild.id}`, "x!")
   message.channel.send("☑️ El prefix se ha reseteado correctamente a `x!`")
}