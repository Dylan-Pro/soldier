exports.run = async (client, message, args) => {
  const db = require("megadb");
  const Discord = require("discord.js");
  const devs_db = new db.crearDB("devs", "devs")
  let staff = await devs_db.obtener("devs")
  if (!staff.includes(message.author.id)) return message.channel.send(new Discord.RichEmbed()
    .setDescription("❌ No tienes permisos para usar este comando.")
    .setColor("RED"))
  let forceadd = new db.crearDB("Ids");
  let forceadd2 = new db.crearDB("Razones");
  let reason = args.slice(1).join(" ")
  if (!forceadd.tiene("ids")) {
    forceadd.establecer("ids", []);
  }
  if (!args[0])
    return message.channel.send(
      "❌ Debe colocar una id"
    );
  if (isNaN(args[0]))
    return message.channel.send(
      "❌ Debe colocar una ID real"
    );

  const idsxd = await forceadd.obtener("ids");
  if (idsxd.includes(args[0]) == true)
    return message.channel.send(
      "❌ El usuario ya esta en la forceban"
    );

  if (!reason) return message.channel.send("❌ Especifica una razon")

  forceadd.push("ids", args[0]);
  forceadd2.establecer(args[0], reason)

  const embed = new Discord.RichEmbed()
    .setAuthor(`☑️ Usuario Agregado ☑️`)
    .setColor("RED")
    .addField("**Info Proceso**", "🆔 **ID Usuario:** " + args[0] + " \n📌 **Razon:** " + reason)
    .addField("**👤 Usuario:**", `<@${args[0]}>`)
  message.channel.send(embed)
}