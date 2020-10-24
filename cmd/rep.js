const Discord = require("discord.js");
const db = require("megadb");
const rep = new db.crearDB("rep")
const cooldown = new db.crearDB("cooldown")
var ms = require("parse-ms");

exports.run = async (client, message, args) => {
let tiempo = 3600000
let user = message.mentions.users.first() || client.users.get(args[0])
if (!user)
  return message.channel.send(
    new Discord.RichEmbed()
      .setDescription("Debes mencionar a alguien o poner su ID")
      .setColor("RED")
  );

  var embot = new Discord.RichEmbed();
  embot.setDescription("No Puedes darle rep a un bot");
  embot.setColor("RED")
  if(user.bot) return message.channel.send(embot);

if (user.id == message.author.id)
  return message.channel.send(
    new Discord.RichEmbed()
      .setDescription("No puedes darte rep a ti mismo")
      .setColor("RED")
  );

if (!cooldown.tiene(`${message.guild.id}.${user.id}`)) {
  cooldown.establecer(`${message.guild.id}.${user.id}`, Date.now() + tiempo);
  if (!rep.tiene(`${message.guild.id}.${user.id}`)) rep.establecer(`${message.guild.id}.${user.id}`, 0);
  rep.sumar(`${message.guild.id}.${user.id}`, 1);
  return message.channel.send(
    new Discord.RichEmbed()
      .setDescription(user + " has obtenido 1 punto de reputación ☑️")
      .setColor("GREEN")
  );
} else {
  let time = await cooldown.obtener(`${message.guild.id}.${user.id}`);
  let timeObj = ms(time - Date.now());
  if (Date.now() < time)
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription(
          "Necesitas esperar" +
            ` ${timeObj.hours}h ${timeObj.minutes}m y ${timeObj.seconds}s ` +
            " ⏰"
        )
        .setColor("RED")
    );
  else {
    cooldown.establecer(`${message.guild.id}.${user.id}`, Date.now() + tiempo);
    rep.sumar(`${message.guild.id}.${user.id}`, 1);
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription(user + " has obtenido 1 punto de reputación ☑️")
        .setColor("GREEN")
    );
  }
}
}