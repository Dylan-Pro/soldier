exports.run = async (client, message, args) => {
  let Discord = require("discord.js");
  let dbs = require("quick.db");
  let db = require("megadb");
  const ms = require("parse-ms"); //exacto
  const dinero = new db.crearDB("Dinero");

  let user = message.mentions.users.first();
  
  if (!dinero.tiene(`${message.guild.id}.${user}`)) {
    dinero.establecer(`${message.guild.id}.${user}`, 0);
  }

  const mencion = await dinero.obtener(`${message.guild.id}.${user}`);
  const authorcmd = await dinero.obtener(
    `${message.guild.id}.${message.author}`
  );

  if (!user)
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription("❌ Debes mencionar un usuario")
        .setColor("RED")
    );

  if (authorcmd <= 250) {
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription("❌ Necesitas 250$ de dinero en el bolsillo para robar")
        .setColor("RED")
    );
  }
  
  if(mencion <= 0) {
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription("❌ No tiene nada que puedas robarle")
        .setColor("RED")
    );
  }

  let random = Math.floor(Math.random() * 200) + 1;
  
  const embed = new Discord.RichEmbed()
  .setDescription(`☑️ Le has robado a ${user} una cantidad de {random} de dinero`)
  .setColor("GREEN")
  message.channel.send(embed)
  dinero.restar(`${message.guild.id}.${user.id}`, random)
  dinero.sumar(`${message.guild.id}.${message.author.id}`, random)
};
