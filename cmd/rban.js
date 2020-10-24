const db = require("megadb");
let Discord = require("discord.js");
let cooldown = new Set();
exports.run = async (client, message, args) => {
    let perms = message.member.hasPermission("ADMINISTRATOR");

    if (!perms)
      return message.channel.send(
        "❌ No tienes permisos de `Administrador`"
      );

    const forceban = new db.crearDB("Ids");
    let i = await forceban.obtener("ids");

    const embed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "`" + i.length + "` **Raiders Han sido baneados del servidor**"
      )
      .setFooter("Esto puede tardar un poco, ten paciencia");

    if (cooldown.has(message.author.id)) {
      message.channel.send(
        message.author +
          " ❌ Utilice comando despues de `5` segundos"
      );
      return;
    }
    i.forEach(id => {
      console.log(id);
      message.guild.ban(id.toString());
    });
    message.channel.send(embed);

    cooldown.add(message.author.id);

    //Quita al usuario del enfriamiento después de pasar los 10 segundos.
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000); //tiempo que quieres poner
  }