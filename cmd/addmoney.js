const Discord = require("discord.js");
const db = require("megadb");
const dinero = new db.crearDB("Dinero");

exports.run = async (client, message, args) => {
  
  let perms = message.member.hasPermission("MANAGE_GUILD")
  
  if(!perms) return message.channel.send("❌ No tienes permisos de `Gestionar Servidor`")
  let user = message.mentions.users.first() || message.author;

  let embed1 = new Discord.RichEmbed()
  .setColor("RED")
  .setDescription(`❌ Mencione a alguien para añadirle dinero`);
  
  if (message.mentions.users.size < 1) {
      return message.channel.send(embed1)
}

let embed2 = new Discord.RichEmbed()
  .setColor("RED")
  .setDescription(`❌ Debe especificar la cantidad a añadir`);
  
  if (!args[1]) {
      return message.channel.send(embed2)
}
  
  dinero.sumar(`${message.guild.id}.${user.id}`, args[1]);
  let bal = await dinero.obtener(`${message.guild.id}.${user.id}`);

  let moneyEmbed = new Discord.RichEmbed()
    .setColor("GREEN")
    .setDescription(
      `☑️ Se han agregado ${
        args[1]
      } de dinero a ${user} \nAhora tiene ${bal} de dinero`
    );
  message.channel.send(moneyEmbed);
};
