const Discord = require("discord.js");

exports.run = (client, message, args) => {
    let xd = args.slice(0).join(" ");

    let al = new (require("megadb")).crearDB("AntiLoggers");
    let perms = message.member.hasPermission("ADMINISTRATOR");

    if (!perms)
      return message.channel.send(
        "❌ No tienes permisos de `Administrador`."
      );

    if (!xd)
      return message.channel.send(
        "☑️ Activa usando `anti-loggers On` \n❌ Desactiva usando `anti-loggers Off`"
      );

    if (args[0] === "Off") {
      al.eliminar(`${message.guild.id}`);
      return message.channel.send(
        "☑️ AntiLoggers **Desactivada** Correctamente"
      );
    } else if (args[0] === "On") {
      if(al.tiene(message.guild.id)) return message.channel.send("☑️ Los Anti-Loggers Ya estan activados")
      al.establecer(`${message.guild.id}.at`, "activado");
      return message.channel.send(
        "☑️ AntiLoggers **Activada** Correctamente"
      );
    }
  }