let Discord = require("discord.js");
exports.run = async (client, message, args) => {
  const db = require('megadb')
  let Discord = require("discord.js")
  let user = message.author;
  const vips_db = new db.crearDB("vips", "vips")
  const vip = await vips_db.obtener("vips")
  if (vip.includes(user.id) == false) return message.channel.send(
    new Discord.RichEmbed()
      .setDescription("❌ No eres VIP y por lo tanto no puedes ejecutar este comando")
      .setColor("RED")
  )
  const imgl_db = new db.crearDB("imgl");


  if (!args.join(" "))
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription(
          "Debes Especificar El enlace de la imagen"
        )
        .setColor("RED")
    );

  if (!message.content.includes("http"))
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription(
          "Debe ser un enlace"
        )
        .setColor("RED")
    );

  imgl_db.establecer(`${message.guild.id}.${user.id}`, args.join(" "));

  message.channel.send(
    new Discord.RichEmbed()
      .setDescription(
        "Imagen para tu perfil/logo seleccionado"
      )
      .setColor("GREEN")
  );
}
