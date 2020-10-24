exports.run = async (client, message, args) => {
 let perms = message.member.hasPermission("MANAGE_GUILD")
    
  if(!perms)
  return message.channel.send(
      "❌ No tienes permisos de `Gestionar Servidor`"
    );
  const db = require("megadb");
  const palabras = new db.crearDB("Palabras");
  palabras.eliminar(`${message.guild.id}`);
  message.channel.send("☑️ Las palabras bloqueadas han sido reseteadas");
};
