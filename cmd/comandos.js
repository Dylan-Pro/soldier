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

if(!args[0]) 
return message.channel.send(
  new Discord.RichEmbed()
  .setAuthor(`📚 Lista Comandos 📚`)
  .addField("🎟️ **Panel Ayuda:**", "`" + `${prefix}ayuda` + "`", true)
  .addField("🛠️ **Developer:**", "`" + `${prefix}comandos dev` + "`", true)
  .addField("💰 **Economia:**", "`" + `${prefix}comandos eco` + "`", true)
  .addField("🔧 **Moderacion:**", "`" + `${prefix}comandos mod` + "`", true)
  .addField("📌 **Configuracion/Seguridad:**", "`" + `${prefix}comandos config` + "`", true)
  .addField("🎉 **Interaccion:**", "`" + `${prefix}comandos int` + "`", true)
  .addField("🔊 **Informacion:**", "`" + `${prefix}comandos inf` + "`", true)
  .addField("🥳 **Juegos:**", "`" + `${prefix}comandos juegos` + "`", true)
  .setColor("RANDOM")
  .setThumbnail(message.author.displayAvatarURL)
)

if(args[0] === "eco"){
  const embed = new Discord.RichEmbed()
  .setAuthor(`📚 Lista Comandos`, client.user.displayAvatarURL)
  .addField("💸 **Economia**", "`perfil` **|** `crime` **|** `work` **|** `weekly` **|** `monthly` **|** `dep` **|** `with` **|** `setinfo` **|** `delinfo` **|** `setcolor` **|** `resetcolor` **|** `daily` **|** `beg` **|** `shop` **|** `buy` **|** `sell` **|** `rep` **|** `addmoney` **|** `ruleta` \n\n👑 **Comandos VIP:** \n`setimg(VIP)` **|** `delimg(VIP)` **|** `configvip(VIP)` **|** `setlogo(VIP)` **|** `dellogo(VIP)`")
  .setColor("RANDOM")
  .setThumbnail(message.author.displayAvatarURL)
  message.channel.send(embed)
}
if(args[0] === "mod"){
  const embed = new Discord.RichEmbed()
  .setAuthor("📚 Lista Comandos", client.user.displayAvatarURL)
  .addField("**Moderacion:**", "`unmute` **|** `mute` **|** `ban` **|** `kick` **|** `detectar` **|** `rban` **|** `raiderinfo`")
  .setColor("RANDOM")
  .setThumbnail(message.author.displayAvatarURL)
  message.channel.send(embed)
}
if(args[0] === "dev"){
  const embed = new Discord.RichEmbed()
  .setAuthor("📚 Lista Comandos", client.user.displayAvatarURL)
  .addField("**Developer:**", "`addstaff` **|** `addvip` **|** `removervip` **|** `removerstaff` **|** `radd` **|** `rremove` **|** `eval`")
  .setColor("RANDOM")
  .setThumbnail(message.author.displayAvatarURL)
  message.channel.send(embed)
}
if(args[0] === "config"){
  const embed = new Discord.RichEmbed()
  .setAuthor("📚 Lista Comandos", client.user.displayAvatarURL)
  .addField("**Config/Seguridad:**", "`config` **|** `anti-loggers` **|** `anti-links` **|** `setprefix` **|** `resetprefix` **|** `setwelcome` **|** `setwelcomeimg` **|** `setlogs` **|** `niveles` \n\n**Desactivar:** \n`disable logs` **|** `disable welcome` **|** `disable all`")
  .setColor("RANDOM")
  .setThumbnail(message.author.displayAvatarURL)
  message.channel.send(embed)
}
if(args[0] === "int"){
    const embed = new Discord.RichEmbed()
  .setAuthor("📚 Lista Comandos", client.user.displayAvatarURL)
  .addField("**Interaccion:**", "`f` **|** `marry` **|** `divorce` **|** `hack`")
  .setColor("RANDOM")
  .setThumbnail(message.author.displayAvatarURL)
  message.channel.send(embed)
}
if(args[0] === "inf"){
      const embed = new Discord.RichEmbed()
  .setAuthor("📚 Lista Comandos", client.user.displayAvatarURL)
  .addField("**Informacion:**", "`infoemoji(VIP)` **|** `bot(VIP)` **|** `botinfo` **|** `avatar` **|** `rank` **|** `topn` **|** `top10servers` **|** `servers` **|** `ping` **|** `calc`")
  .setColor("RANDOM")
  .setThumbnail(message.author.displayAvatarURL)
  message.channel.send(embed)
}
if(args[0] === "juegos"){
  const embed = new Discord.RichEmbed()
  .setAuthor("📚 Lista Comandos", client.user.displayAvatarURL)
  .addField("**Juegos:**", "`tictoe` **|** `buscaminas`")
  .setColor("RANDOM")
  .setThumbnail(message.author.displayAvatarURL)
  message.channel.send(embed)
}
}