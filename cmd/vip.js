exports.run = async (client, message, args) => {
  let Discord = require("discord.js")

  const db = require("megadb");
  const prefix_db = new db.crearDB("prefixes");

  //bases//
  let prefix;
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`);
  } else {
    prefix = "x!";
  }
  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setThumbnail(message.author.displayAvatarURL)
    .setAuthor(`👑 Conseguir VIP 👑`)
    .setDescription("🐦 Para conseguir **VIP**, puedes conseguirlo de distintas maneras \n**SI DESEAS LOS BENEFICIOS HABLALE A** `Xeantrix#2409`")
    .addField("🔰 **Donacion:**", "**0.50$/1$** `via paypal`")
    .addField("🎉 **Boosteo Server (WOLF SECURITY)**", "`Al server de discord`")
    .addField("🛠️ **Comandos:**", "`Dar comandos que el bot no tenga anteriormente`")
    .addField("👑 **Comandos VIP:**", "`" + `${prefix}comandos` + "` Para ver todos los beneficios que tiene el rango VIP")
  message.channel.send(embed)
}