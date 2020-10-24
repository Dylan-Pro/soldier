exports.run = async (client, message, args) => {
  const db = require("megadb");
  const Discord = require("discord.js");
  const devs_db = new db.crearDB("devs", "devs")
  let staff = await devs_db.obtener("devs")
  if (!staff.includes(message.author.id)) return message.channel.send(new Discord.RichEmbed()
    .setDescription("❌ No tienes permisos para usar este comando.")
    .setColor("RED"))
  let forceadd = new db.crearDB("Ids");
  if (!forceadd.tiene("ids")) {
    forceadd.establecer("ids", []);
  } //Guardamos los argumentos 0 (id) en el array creado anteriormente El codigo este va en el comando el de arriba en otro para crearlo

  if (!args[0])
    return message.channel.send(
      "❌ Debe colocar una ID"
    );
  const idsxd = await forceadd.obtener("ids");
  if (idsxd.includes(args[0]) == false)
    return message.channel.send(
      "❌ El usuario no esta en la forceban"
    );

  if (isNaN(args[0]))
    return message.channel.send("❌ Debe colocar una ID real");

  forceadd.extract("ids", args[0]);

  const embed = new Discord.RichEmbed()
    .setAuthor(`☑️ Usuario Removido ☑️`)
    .setColor("RED")
    .addField("**Info Proceso**", "🆔 **ID Usuario:** " + args[0])
    .addField("**👤 Usuario:**", `<@${args[0]}>`)
  message.channel.send(embed)
}