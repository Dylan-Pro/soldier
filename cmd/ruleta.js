const Discord = require("discord.js");
const dbs = require("quick.db");
const db = require("megadb");
const dinero = new db.crearDB("Dinero");
const ms = require("parse-ms");

exports.run = async (client, message, args) => {
  const prefix_db = new db.crearDB("prefixes");

  //bases//
  let prefix;
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`);
  } else {
    prefix = "x!";
  }

  let user = message.author;

  function isOdd(num) {
    if (num % 2 == 0) return false;
    else if (num % 2 == 1) return true;
  }

  let colour = args[0];
  let money = parseInt(args[1]);
  let moneydb = await dinero.obtener(`${message.guild.id}.${user.id}`);

  let random = Math.floor(Math.random() * 37);

  let moneyhelp = new Discord.RichEmbed()
    .setColor("RED")
    .setDescription(
      `❌ Especifica la cantidad a apostar | ${prefix}ruleta <color> <cantidad>`
    );

  let moneymore = new Discord.RichEmbed()
    .setColor("RED")
    .setDescription(`❌ Estas apostando mas de lo que tienes`);

  let colorbad = new Discord.RichEmbed()
    .setColor("RED")
    .setDescription(
      `❌ Especifica un color | rojo(r) [1.5x] negro(n) [2x] verde(v) [15x]`
    );

  if (!colour) return message.channel.send(colorbad);
  colour = colour.toLowerCase();
  if (!money) return message.channel.send(moneyhelp);
  if (money > moneydb) return message.channel.send(moneymore);

  if (colour == "n" || colour.includes("negro")) colour = 0;
  else if (colour == "r" || colour.includes("rojo")) colour = 1;
  else if (colour == "v" || colour.includes("verde")) colour = 2;
  else return message.channel.send(colorbad);

  if (random == 0 && colour == 2) {
    // Green
    money *= 15;
    dinero.sumar(`${message.guild.id}.${user.id}`, money);
    let moneyEmbed1 = new Discord.RichEmbed()
      .setColor("GREEN")
      .setDescription(`☑️ Has ganado ${money} de dinero\n\nMultiplica: 15x`);
    message.channel.send(moneyEmbed1);
    console.log(`${message.author.tag} Won ${money} on green`);
  } else if (isOdd(random) && colour == 1) {
    // Red
    money = parseInt(money * 1.5);
    dinero.sumar(`${message.guild.id}.${user.id}`, money);
    let moneyEmbed2 = new Discord.RichEmbed()
      .setColor("GREEN")
      .setDescription(`☑️ Has ganado ${money} de dinero\n\nMultiplica: 1.5x`);
    message.channel.send(moneyEmbed2);
  } else if (!isOdd(random) && colour == 0) {
    // Black
    money = parseInt(money * 2);
    dinero.sumar(`${message.guild.id}.${user.id}`, money);
    let moneyEmbed3 = new Discord.RichEmbed()
      .setColor("GREEN")
      .setDescription(`☑️ Has ganado ${money} de dinero\n\nMultiplica: 2x`);
    message.channel.send(moneyEmbed3);
  } else {
    // Wrong
    dinero.restar(`${message.guild.id}.${user.id}`, money);
    let moneyEmbed4 = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(`❌ Has perdido ${money} de dinero\n\nMultiplica: 0x`);
    message.channel.send(moneyEmbed4);
  }
};
