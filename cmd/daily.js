const Discord = require("discord.js");
const db = require("megadb");
const dinero = new db.crearDB("Dinero");
const cooldown2 = new db.crearDB("cooldown2");
var ms = require("parse-ms");

exports.run = async (client, message, args) => {
  let tiempo = 86400000;
  if (!cooldown2.tiene(`${message.guild.id}.${message.author.id}`)) {
    cooldown2.establecer(`${message.guild.id}.${message.author.id}`, Date.now() + tiempo);
    if (!dinero.tiene(`${message.guild.id}.${message.author.id}`))
      dinero.establecer(`${message.guild.id}.${message.author.id}`, 0);
    dinero.sumar(`${message.guild.id}.${message.author.id}`, 200);
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription("☑️ Has recogido tus 200 monedas")
        .setColor("GREEN")
    );
  } else {
    let time = await cooldown2.obtener(`${message.guild.id}.${message.author.id}`);
    let timeObj = ms(time - Date.now());
    if (Date.now() < time)
      return message.channel.send(
        new Discord.RichEmbed()
          .setDescription(
            "❌ Necesitas esperar" +
              ` ${timeObj.hours}h ${timeObj.minutes}m y ${timeObj.seconds}s` +
              " ⏰"
          )
          .setColor("RED")
      );
    else {
      cooldown2.establecer(`${message.guild.id}.${message.author.id}`, Date.now() + tiempo);
      dinero.sumar(`${message.guild.id}.${message.author.id}`, 200);
      return message.channel.send(
        new Discord.RichEmbed()
          .setDescription("☑️ Has recogido tus 200 monedas")
          .setColor("GREEN")
      );
    }
  }
};
