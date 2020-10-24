  exports.run = (client, message, args) => {
    let ai = new (require("megadb")).crearDB("AntiLinks");
    let perms = message.member.hasPermission("ADMINISTRATOR");
let xd = args.slice(0).join(" ");
    if (!perms)
      return message.channel.send(
        "❌ No tienes permisos de `Administrador`."
      );

    if (!xd)
      return message.channel.send(
        "☑️ Activa usando `anti-links On` \n❌ Desactiva usando `anti-links Off`"
      );

    if (args[0] === "Off") {
      ai.eliminar(`${message.guild.id}`);
      return message.channel.send(
        "☑️ AntiLinks **Desactivada** Correctamente"
      );
    } else if (args[0] === "On") {
      if(ai.tiene(message.guild.id)) return message.channel.send("☑️ Los Anti-Links Ya estan activados")
      ai.establecer(`${message.guild.id}.at`, "activado");
      return message.channel.send(
        "☑️ AntiLinks **Activada** Correctamente"
      );
    }
  }