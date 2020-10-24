const megadb = require("megadb");
const color = new megadb.crearDB("color");
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let user = message.author;
  let x = args.join(" ");
  if (!x)
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription("❌ Debes escribir un color")
        .addField("⚠️ Ejemplo :", "#5b00ff")
        .addField("🖌️ Colores HTML", "[Colores](https://htmlcolorcodes.com/es/)")
        .setColor("RED")
    );

  if (!message.content.includes("#"))
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription("❌ Debes escribir un color que empieze con #")
        .addField("⚠️ Ejemplo :", "#5b00ff")
        .addField("🖌️ Colores HTML", "[Colores](https://htmlcolorcodes.com/es/)")
        .setColor("RED")
    );

  color.establecer(`${message.guild.id}.${message.author.id}`, x);
  // }
  let colorxd = await color.obtener(`${message.guild.id}.${user.id}`);
  message.channel.send(
    new Discord.RichEmbed()
      .setDescription("☑️ Se ha cambiado el color de tu perfil y del rank a **"+x+"**")
      .setColor(colorxd)
  );
};
