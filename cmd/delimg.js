let Discord = require("discord.js");
exports.run = async (client, message, args) => {
     const db = require('megadb')
  let Discord = require("discord.js")
  let user = message.author;
const vips_db = new db.crearDB("vips", "vips")
   const vip = await vips_db.obtener("vips")
  if(vip.includes(user.id) == false) return message.channel.send(
    new Discord.RichEmbed()
.setDescription("❌ No eres VIP y por lo tanto no puedes ejecutar este comando")
.setColor("RED")
)
    const img_db = new db.crearDB("img");

    img_db.delete(`${message.guild.id}.${user.id}`, args.join(" "));

    message.channel.send(
      new Discord.RichEmbed()
        .setDescription(
          "La imagen de su perfil ha sido eliminada")
        .setColor("GREEN")
    );
  }
