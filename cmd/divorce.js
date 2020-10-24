exports.run = async (client, message, args) => {
  const db = require("megadb");
  let Discord = require("discord.js");
  const marry = new db.crearDB("Matrimonio");
  const user = message.mentions.users.first() || client.users.get(args[0]);

  if (!user)
    return message.channel.send(
      new Discord.RichEmbed()
        .setColor("RED")
        .setDescription(`❌ Debes mencionar a la persona con la que estas casada`)
    );

  var embot = new Discord.RichEmbed();
  embot.setDescription("❌ No puedes divorciarte con un bot");
  embot.setColor("RED");
  if (user.bot) return message.channel.send(embot);

  let married = await marry.obtener(
    `${message.guild.id}.${message.author.id}-${user.id}`
  );
  if (!married)
    return message.channel.send(
      new Discord.RichEmbed()
        .setColor("RED")
        .setDescription(`❌ ${message.author} No estas casado con el`)
    );
  let marrys = await marry.obtener(
    `${message.guild.id}.${user.id}-${message.author.id}`
  );
  if (!marrys)
    return message.channel.send(
      new Discord.RichEmbed()
        .setColor("RED")
        .setDescription(`❌ ${message.author} No estas casado con el`)
    );

  message.channel.send(
    new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(`${user} aceptas el divorcio de ${message.author}?`)
  );

  const collector = message.channel.createMessageCollector(
    m => m.author.id === user.id && m.channel.id === message.channel.id,
    { time: 5000 }
  );

  collector.on("collect", collected => {
    if (collected.content.toLowerCase() === "si") {
      message.channel.send(
        new Discord.RichEmbed()
          .setColor("RED")
          .setDescription(
            `💔 Que mal ${message.author} te has divorciado con ${user} 💔`
          )
      );
      marry.eliminar(`${message.guild.id}.${message.author.id}`);
      marry.eliminar(`${message.guild.id}.${message.author.id}-${user.id}`);
      marry.eliminar(`${message.guild.id}.${user.id}-${message.author.id}`);
      marry.eliminar(`${message.guild.id}.${user.id}`);
    } else if (collected.content.toLowerCase() === "no") {
      message.channel.send(
        new Discord.RichEmbed()
          .setColor("GREEN")
          .setDescription(`💖 Todavia te ama y no se quiere divorciar 💖`)
      );
    } else {
      message.channel.send(`${message.author} tu todavia estas con ${user.username}`);
    }
  });
};
