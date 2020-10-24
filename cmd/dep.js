const Discord = require("discord.js");
const db = require("megadb");
const ms = require("parse-ms");

exports.run = async (client, message, args) => {
  let user = message.author;

const dinero = new db.crearDB("Dinero")
const banco = new db.crearDB("Banco")

  let member = await dinero.obtener(`${message.guild.id}.${user.id}`)
  let member2 = await banco.obtener(`${message.guild.id}.${user.id}`)


  let embed4 = new Discord.RichEmbed()
  .setColor("RED")
  .setDescription(`❌ No tienes mucho dinero en el banco`);

  if (member <= args[0]) {
      return message.channel.send(embed4)
  }

  if (args[0] == 'all') {
    let money = await dinero.obtener(`${message.guild.id}.${user.id}`)
    let bank = await banco.obtener(`${message.guild.id}.${user.id}`)

    let embedbank = new Discord.RichEmbed()
    .setColor('RED')
    .setDescription("❌ No tienes suficiente dinero para depositar")

    if (money == 0) return message.channel.send(embedbank);

    banco.sumar(`${message.guild.id}.${user.id}`, money)
    dinero.restar(`${message.guild.id}.${user.id}`, money)
    let embed5 = new Discord.RichEmbed()
  .setColor("GREEN")
  .setDescription(`☑️ Has depositado todo en el banco`);
  message.channel.send(embed5)
  
  } else {
  
  let embed2 = new Discord.RichEmbed()
  .setColor("RED")
  .setDescription(`❌ Especifica una cantidad para depositar`);
  
  if (!args[0]) {
      return message.channel.send(embed2)
      .catch(err => console.log(err))
  }
  let embed3 = new Discord.RichEmbed()
  .setColor("RED")
  .setDescription(`❌ No puedes depositar dinero negativo`);

  if (message.content.includes('-')) { 
      return message.channel.send(embed3)
  }


  let embed5 = new Discord.RichEmbed()
  .setColor("GREEN")
  .setDescription(`☑️ Has depositado ${args[0]} de dinero al banco`);

  message.channel.send(embed5)
  banco.sumar(`${message.guild.id}.${user.id}`, args[0])
  dinero.restar(`${message.guild.id}.${user.id}`, args[0])
  }
}