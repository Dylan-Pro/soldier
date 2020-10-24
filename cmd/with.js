const Discord = require("discord.js");
const db = require("megadb");
const ms = require("parse-ms");
const dinero = new db.crearDB("Dinero")
const banco = new db.crearDB("Banco")

exports.run = async (client, message, args) => {  

  let user = message.author;

  let member = await dinero.obtener(`${message.guild.id}.${user.id}`)
  let member2 = await banco.obtener(`${message.guild.id}.${user.id}`)


 let embed4 = new Discord.RichEmbed()
  .setColor("RED")
  .setDescription(`❌ No tienes mucho dinero`);

  if (member2 <= args[0]) {
      return message.channel.send(embed4)
  }
  if (args[0] == 'all') {
    let money = await banco.obtener(`${message.guild.id}.${user.id}`)

    banco.restar(`${message.guild.id}.${user.id}`, money)
    dinero.sumar(`${message.guild.id}.${user.id}`, money)
    let embed5 = new Discord.RichEmbed()
  .setColor("GREEN")
  .setDescription(`☑️ Has retirado todo tu dinero del banco`);
  message.channel.send(embed5)
  
  } else {

  let embed2 = new Discord.RichEmbed()
  .setColor("RED")
  .setDescription(`❌ Especifica una cantidad para retirar`);
  
  if (!args[0]) {
      return message.channel.send(embed2)
  }
  let embed3 = new Discord.RichEmbed()
  .setColor("RED")
  .setDescription(`❌ No puedes retirar dinero negativo`);

  if (message.content.includes('-')) { 
      return message.channel.send(embed3)
  }
  let embed4 = new Discord.RichEmbed()
  .setColor("RED")
  .setDescription(`❌ No tienes mucho dinero en el banco`);

  if (banco == 0) {
      return message.channel.send(embed4)
  }

  let embed5 = new Discord.RichEmbed()
  .setColor("GREEN")
  .setDescription(`☑️ Has retirado ${args[0]} de dinero de tu banco`);

  message.channel.send(embed5)
  banco.restar(`${message.guild.id}.${user.id}`, args[0])
  dinero.sumar(`${message.guild.id}.${user.id}`, args[0])
  }
}

