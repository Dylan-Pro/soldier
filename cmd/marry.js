exports.run = async (client, message, args) => {
  const db = require("megadb");
  let Discord = require("discord.js");
  const marry = new db.crearDB("Matrimonio");
  const user = message.mentions.users.first() || client.users.get(args[0]);

  if (!user)
    return message.channel.send(
      new Discord.RichEmbed()
        .setColor("RED")
        .setDescription("❌ Debes mencionar una persona")
    );

  var embot = new Discord.RichEmbed();
  embot.setDescription("❌ No puedes casarte con un bot");
  embot.setColor("RED");
  if (user.bot) return message.channel.send(embot);

  if (marry.tiene(message.guild.id, user.id))
    return message.channel.send(
      new Discord.RichEmbed()
        .setColor("RED")
        .setDescription("❌ Este usuario ya esta casado")
    );

  if (marry.tiene(message.guild.id, message.author.id))
    return message.channel.send(
      new Discord.RichEmbed()
        .setColor("RED")
        .setDescription("❌ Ya estas casado con alguien, deja de ser infiel")
    );

  message.channel.send(
    new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(`${user} aceptas a ${message.author} con tu esposo(a) \nResponde **si** si quieres aceptar \nResponde **no** si quieres rechazar`)
  );

  const collector = message.channel.createMessageCollector(
    m => m.author.id === user.id && m.channel.id === message.channel.id,
    { time: 10000 }
  );

  collector.on("collect", collected => {
    if (collected.content.toLowerCase() === "si") {
      message.channel.send(
        new Discord.RichEmbed()
          .setColor("GREEN")
          .setDescription(
            `💍 Felicidades ${message.author} ${user} Se han casado!!! 💍`
          )
      );
      marry.establecer(`${message.guild.id}.${message.author.id}`, user.tag);
      marry.establecer(
        `${message.guild.id}.${message.author.id}-${user.id}`,
        true
      );
      marry.establecer(`${message.guild.id}.${user.id}`, message.author.tag);
      marry.establecer(
        `${message.guild.id}.${user.id}-${message.author.id}`,
        true
      );
    } else if (collected.content.toLowerCase() === "no") {
      message.channel.send(
        new Discord.RichEmbed()
          .setColor("RED")
          .setDescription(
            `😢 Que mal ${message.author}, ${user} te ha rechazado!!! 😢`
          )
      );
    }
  });
  collector.on("fin", collected => {
    if (collected.size === 0)
      return message.channel.send(
        new Discord.RichEmbed()
          .setColor("RED")
          .setDescription(
            `Uyyy lamentablemente ${user} no quiso llegar a la ceremonia, sera para la proxima`
          )
      );
  });
};
