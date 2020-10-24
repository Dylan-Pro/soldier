const Discord = require("discord.js");
const dbs = require("quick.db");
const ms = require("parse-ms");
const db = require("megadb");
const dinero = new db.crearDB("Dinero");

exports.run = async (client, message, args) => {
  let user = message.author;

  let timeout = 180000;
  let amount = 5;

  let beg = await dbs.fetch(`beg_${message.guild.id}_${user.id}`);

  if (beg !== null && timeout - (Date.now() - beg) > 0) {
    let time = ms(timeout - (Date.now() - beg));

    let timeEmbed = new Discord.RichEmbed()
      .setColor("GREEN")
      .setDescription(
        `❌ Has robado recientemente \n\nIntenta robar en: ${time.minutes}m ${time.seconds}s `
      );
    message.channel.send(timeEmbed);
  } else {
    let moneyEmbed = new Discord.RichEmbed()
      .setColor("GREEN")
      .setDescription(`Ha robado mucho y recibio ${amount} de dinero`);
    message.channel.send(moneyEmbed);
    dinero.sumar(`${message.guild.id}.${user.id}`, amount);
    dbs.set(`beg_${message.guild.id}_${user.id}`, Date.now());
  }
};
