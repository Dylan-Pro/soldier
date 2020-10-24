exports.run = async (client, message, args) => {
  let Discord = require("discord.js");
  const db = require("megadb");
  const palabras = new db.crearDB("Palabras");

  const prefix_db = new db.crearDB("prefixes");

  //bases//
  let prefix;
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`);
  } else {
    prefix = "x!";
  }

  if (!palabras.tiene("palabras")) {
    palabras.establecer(message.guild.id, []);
  }

  let perms = message.member.hasPermission("MANAGE_GUILD");

  if (!perms)
    return message.channel.send(
      "❌ No tienes permisos de `Gestionar Servidor`"
    );

  const holaa = await palabras.obtener(message.guild.id);
  if (holaa.includes(args[0]) == true) {
    return message.channel.send("❌ Ya tienes bloqueada esa palabra");
  }
  if (!args[0])
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription(
          "❌ Debe especificar una palabra \n**Ejemplo:** `" +
            prefix +
            "blacklist puta` \n**LA PALABRA NO PUEDE TENER ESPACIOS**"
        )
        .setColor("RED")
    );

  palabras.push(message.guild.id, args[0]);

  message.channel.send("☑️ La palabra ha sido bloqueada en el servidor");
};
