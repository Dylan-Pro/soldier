exports.run = async (client, message, args) => {
  let Discord = require("discord.js");
  const db = require("megadb");
  const dbs = require("quick.db");
  const ms = require("parse-ms"); //exacto
  const dinero = new db.crearDB("Dinero");
  const banco = new db.crearDB("Banco");

  let user = message.author;
  let author = await dbs.fetch(`crime_${message.guild.id}_${user.id}`);

  let timeout = 1800000;

  if (author !== null && timeout - (Date.now() - author) > 0) {
    let time = ms(timeout - (Date.now() - author));

    let timeEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        `❌ Ya has robado, tomate un descanso \n\nIntenta de nuevo en: ${time.minutes}m ${time.seconds}s `
      );
    message.channel.send(timeEmbed);
  } else {
    let jobs = [
      "Hacker",
      "Ladron",
      "Proxeneta",
      "Violador",
      "Drogadicto"
    ];
    let random = jobs[Math.floor(jobs.length * Math.random())]; //estás arreglando algo?

    Math.floor(Math.random() * (1001 - 100)) + 100;
    let rdm = Math.floor(Math.random() * (1001 - 100)) + 100;
      const dinero = new db.crearDB("Dinero");

    if (!dinero.tiene(`${message.guild.id}.${user.id}`)) {
      dinero.establecer(`${message.guild.id}.${user.id}`, 0);
    }

    if (!banco.tiene(`${message.guild.id}.${user.id}`)) {
      banco.establecer(`${message.guild.id}.${user.id}`, 0);
    }

    const embed = new Discord.RichEmbed()
      .setAuthor(user.username + " 👷‍has hecho un crimen!")
      .addField("⚒️ **Has hecho un crime! siendo:** ", random)
      .addField("💰 **Dinero robado:** ", rdm)
      .setColor("RANDOM")
      .setThumbnail(message.author.displayAvatarURL);
    message.channel.send(embed);
    dinero.sumar(`${message.guild.id}.${user.id}`, rdm); //vale r entonces lo colocamos
    dbs.set(`crime_${message.guild.id}_${user.id}`, Date.now());
  }
};
