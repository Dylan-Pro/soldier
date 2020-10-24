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

  if (!args[0]) return message.channel.send("❌ `"+prefix+"disable info` Para desactivar las funciones")

  if(args[0] === "info"){
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setThumbnail(message.author.displayAvatarURL)
    .setAuthor(`⚙️ Desactivar Funciones`)
    .addField("📌 **Desactivar Bienvenidas:**", "`" + prefix + "disable welcome`")
    .addField("🚀 **Desactivar Logs:**", "`" + prefix + "disable logs`")
    .addField("⚒️ **Desactivar Todo:**", "`" + prefix + "disable all`")
    message.channel.send(embed)
  }
  if(args[0] === "welcome"){
  const welcome = new db.crearDB("setwelcome", "welcomeleave");
  message.channel.send("☑️ Sistema de **Bienvenidas** desactivado").then(msg => {
    welcome.delete(message.guild.id)
    welcome.delete(message.guild.id)
  })
  }
  if(args[0] === "logs"){
    const logs = new db.crearDB("logs");
    message.channel.send("☑️ Sistema de **logs** desactivado").then(msg => {
    logs.delete(message.guild.id)
    logs.delete(message.guild.id)
    });
  }
  if(args[0] === "all"){
    const logs = new db.crearDB("logs");
    const welcome = new db.crearDB("setwelcome", "welcomeleave");
    const welcomeimg = new db.crearDB("setwelcomeimg", "welcomeleave");
     const embed = new Discord.RichEmbed()
     .setColor("RED")
     .setThumbnail(message.author.displayAvatarURL)
    .setAuthor(`⚠️ Proceso Desactivacion ⚠️`)
    .setDescription("**¿Estas seguro de que quieres desactivar todos los sistemas de configuracion?**")
    .addField("Si", "☑️", true)
    .addField("No", "❌", true)
  message.channel.send(embed).then(async msg => {
      await msg.react("☑️")
      await msg.react("❌")
      msg.awaitReactions((reaction, user) => {
      if (message.author.id !== user.id) return;
      if(reaction.emoji.name === "☑️") {
        msg.clearReactions()
    message.channel.send("☑️ **Todos** los sistemas han sido desactivados").then(m => m.delete(2000))
    msg
          .edit(embed)
          .then(m => msg.delete(100))
    logs.delete(message.guild.id)
    logs.delete(message.guild.id)
    welcome.delete(message.guild.id)
    welcome.delete(message.guild.id)
    welcomeimg.delete(message.guild.id)
    welcomeimg.delete(message.guild.id)
      }
      if(reaction.emoji.name === "❌"){
        if (message.author.id !== user.id) return;
        msg
          .edit(embed)
          .then(m => msg.delete(100))
        message.channel.send("☑️ Has **cancelado** el proceso de desactivacion")
        msg.clearReactions()
      }
      });
    });
  }
}