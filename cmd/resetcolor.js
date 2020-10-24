const megadb = require("megadb");
const color = new megadb.crearDB("color");
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let user = message.author;
  let x = args.join(" ");
  color.delete(`${message.guild.id}.${message.author.id}`, x);
  // }
  let colorxd = await color.obtener(`${message.guild.id}.${user.id}`);
  message.channel.send(
    new Discord.RichEmbed()
      .setDescription("☑️ Se ha reseteado tus colores")
      .setColor(colorxd)
  );
};
