exports.run = (client, message, args) => {
  const Discord = require("discord.js");
const db = require("megadb");
const welcomeimg = new db.crearDB("setwelcomeimg", "welcomeleave");

let perms = message.member.hasPermission("MANAGE_GUILD");

    if (!perms)
      return message.channel.send(
        new Discord.RichEmbed()
          .setDescription(
            "❌ No tienes permisos de `Gestionar Servidor`"
          )
          .setColor("RED")
      );

    if (!args.join(" "))
      return message.channel.send(
        new Discord.RichEmbed()
          .setDescription(
            "❌ Debe colocar un enlace para el fondo"
          )
          .setColor("RED")
      );

    if (!message.content.includes("http"))
      return message.channel.send(
        new Discord.RichEmbed()
          .setDescription(
            "❌ Debe ser un enlace agregando `http`"
          )
          .setColor("RED")
      );

    welcomeimg.establecer(`${message.guild.id}`, args.join(" "));

    message.channel.send(
      new Discord.RichEmbed()
        .setDescription(
          "☑️ Fondo establecido correctamente"
        )
        .setFooter(
          "Si la imagen no funciona es porque el enlace está mal puesto o la imagen es privada"
        )
        .setImage(args.join(""))
        .setColor("GREEN")
    );
  }