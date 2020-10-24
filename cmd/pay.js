exports.run = async (client, message, args) => {

const Discord = require("discord.js")
const db = require("megadb")
const dinero = new db.crearDB("Dinero");

let user = message.mentions.users.first()

let cdinero = await dinero.obtener(`${message.guild.id}.${user.id}`);

let embed1 = new Discord.RichEmbed()
  .setColor("RED")
  .setDescription(`❌ Mencione a alguien para pagar`);
  
  if (message.mentions.users.size < 1) {
      return message.channel.send(embed1)
}

let embed = new Discord.RichEmbed()
  .setColor("RED")
  .setDescription(`❌ No puedes pagarle a un bot`);

  if (user.bot) {
      return message.channel.send(embed)
}

let embed23 = new Discord.RichEmbed()
.setColor("RED")
.setDescription("❌ No puedes pagarte a ti mismo")

if(user.id === message.author.id) {
  return message.channel.send(embed23)
}

let embed2 = new Discord.RichEmbed()
  .setColor("RED")
  .setDescription(`❌ Debe especificar la cantidad a pagar`);
  
  if (!args[1]) {
      return message.channel.send(embed2)
}

let embed3 = new Discord.RichEmbed()
  .setColor("RED")
  .setDescription(`❌ No puedes pagar con dinero negativo`);

  if (message.content.includes('-')) { 
      return message.channel.send(embed3)
}

let embed4 = new Discord.RichEmbed()
  .setColor("RED")
  .setDescription(`❌ No tienes ese dinero para pagar`);

  if (cdinero < args[1]) {
      return message.channel.send(embed4)
}

let embed5 = new Discord.RichEmbed()
  .setColor("GREEN")
  .setDescription(`☑️ Has pagado a ${user} **${args[1]}** de dinero`);

  message.channel.send(embed5);

  dinero.sumar(`${message.guild.id}.${user.id}`, args[1]);
  dinero.restar(`${message.guild.id}.${message.author.id}`, args[1]);

}