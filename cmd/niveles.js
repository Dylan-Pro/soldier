  exports.run = (client, message, args) => {
    const db = require("megadb")
   let levels_db = new db.crearDB("niveles");
    let perms = message.member.hasPermission("ADMINISTRATOR");
let xd = args.slice(0).join(" ");
    if (!perms)
      return message.channel.send(
        "❌ No tienes permisos de `Administrador`."
      );

    if (!xd)
      return message.channel.send(
        "☑️ Activa usando `niveles On` \n❌ Desactiva usando `niveles Off`"
      );

    if (args[0] === "Off") {
      levels_db.eliminar(`${message.guild.id}`);
      return message.channel.send(
        "☑️ Los niveles **Desactivados** Correctamente"
      );
    } else if (args[0] === "On") {
      if(levels_db.tiene(message.guild.id)) return message.channel.send("☑️ Los Niveles Ya estan activados")
      levels_db.establecer(`${message.guild.id}.at`, "activado");
      return message.channel.send(
        "☑️ Los niveles **Activados** Correctamente"
      );
    }
  }