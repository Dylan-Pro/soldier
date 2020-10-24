const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://NameProject.glitch.me/`);
}, 280000);

const { Client, RichEmbed } = require("discord.js");
var Discord = require("discord.js");
const client = new Client({ disableEveryone: true });
const { nivelesFunc } = require("./niveles.js");
const db = require("megadb");

//bases de datos//
const logs = new db.crearDB("logs");
let prefix_db = new db.crearDB("prefixes");
//bases de datos//

client.on("ready", () => {
  console.log("Estoy listo");

  setInterval(function() {
    let statuses = [`x!ayuda ${client.guilds.size} servidores`];
    let status = Math.floor(Math.random() * statuses.length);
    let dstatus = statuses[status];
    client.user.setPresence({
      status: "online",
      game: {
        name: `${dstatus}`,
        type: "WATCHING"
      }
    });
  }, 5000);
});

client.on("message", async message => {
  let forceban = new db.crearDB("Ids");
  let usersban = await forceban.obtener("ids");
  let prefix;
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`);
  } else {
    prefix = "x!";
  }
  if (message.author.bot) return;
  if (message.content.indexOf(prefix) !== 0) {
    nivelesFunc(message);
    return;
  }

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  if (usersban.includes(message.author.id))
    return message.channel.send(
      new Discord.RichEmbed()
        .setColor("RED")
        .setAuthor(`⛔ >> | Estas en la FORCEBAN | << ⛔`)
        .setDescription("No puedes utilizar ningun comando")
    );

  try {
    let comandos = require(`./cmd/${command}.js`);
    comandos.run(client, message, args);
  } catch (e) {
    console.log(e.stacks);
    message.channel.send(
      new Discord.RichEmbed()
        .setColor("RED")
        .setThumbnail(
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Nuvola_apps_error.svg/1200px-Nuvola_apps_error.svg.png"
        )
        .setDescription("`Comando que uso no existe en mi base de datos`")
        .addField(
          "`Trata usando el siguiente comando`",
          "☑️ **" + prefix + "comandos**"
        )
    );
  } finally {
  }
});

client.on("message", message => {
  let array2 = [
    "grabify.",
    "iplogger.org",
    "blasze.com",
    "webresolver.nl/tools/iplogger",
    "leancoding.",
    "stopify.",
    "freegiftcards.",
    "joinmy.",
    "curiouscat.",
    "catsnthings.",
    "2no.co",
    "iplogger.com",
    "iplogger.ru",
    "yip.su",
    "iplogger.co",
    "iplogger.info",
    "ipgrabber.ru",
    "ipgraber.ru",
    "shorturl.at/",
    "bl.link/",
    "tiny.cc/",
    "iplis.ru",
    "02ip.ru",
    "ezstat.ru",
    "https://www.miiplogger.com/index.php?q="
  ];

  const al = new (require("megadb")).crearDB("AntiLoggers");
  if (al.tiene(`${message.guild.id}.at`)) {
    if (array2.some(word => message.content.toLowerCase().includes(word))) {
      message.delete(100);
      message
        .reply("❌ Las IPLoggers estas bloqueadas en mi configuracion.")
        .then(response => {
          return response.delete(6000);
        });
    }
  }
});

client.on("message", message => {
  let array3 = [
    "discord.gg",
    "discord.me",
    "discord.io/",
    "discordapp.com/invite",
    "https://",
    "https://google.com/",
    "https:",
    "https:/",
    "https://discord.gg/",
    ".net",
    ".com",
    ".rip",
    "https://discord.gg/"
  ];

  const ai = new (require("megadb")).crearDB("AntiLinks");
  if (ai.tiene(`${message.guild.id}.at`)) {
    if (array3.some(word => message.content.toLowerCase().includes(word))) {
      if (message.member.hasPermission("ADMINISTRATOR")) return;
      message.delete(100);
      message
        .reply("❌ Los Links estas bloqueadas en mi configuracion.")
        .then(response => {
          return response.delete(6000);
        });
    }
  }
});

client.on("guildMemberAdd", async member => {
  const db = require("megadb");
  let welcome_db = new db.crearDB("setwelcome", "welcomeleave");
  let imagen_db = new db.crearDB("setwelcomeimg", "welcomeleave");
  if (!welcome_db.tiene(`${member.guild.id}`)) return;
  if (!imagen_db.tiene(member.guild.id)) return;
  let imagen = await imagen_db.obtener(`${member.guild.id}`);
  let welcome = await welcome_db.obtener(`${member.guild.id}`);
  const canalrendered = client.channels.get(welcome);
  if (!welcome_db.tiene(`${member.guild.id}`)) return;

  const Weez = require("weez");
  const weez = new Weez.WeezAPI("6Eq3mKGuWGeAv9qAJJmAmrjpw6g3Hx6Bfcwm");

  let bienvenida = new Weez.Bienvenida()
    .avatar(member.user.displayAvatarURL)
    .fondo(imagen)
    .textoTitulo(`Bienvenido ${member.user.username}`)
    .textoDesc("Disfruta de tu tiempo aqui!")
    .textoColor("ffffff");

  let img = await weez.getBienvenida(bienvenida);

  canalrendered.send({ files: [img] });
});

//logs//
client.on("messageDelete", async message => {
  if (!logs.tiene(`${message.guild.id}`)) return;
  let log = await logs.obtener(`${message.guild.id}`);
  const canalrendered = client.channels.get(log);

  const embed = new Discord.RichEmbed()
    .setAuthor(`Mensaje Eliminado`)
    .setColor("RED")
    .setThumbnail(message.author.displayAvatarURL)
    .setDescription(
      `**Mensaje Eliminado Por:** <@${message.author.id}> \n**Mensaje Eliminado:** ${message.content} \n**Canal:** ${message.channel}`
    );
  canalrendered.send(embed);
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
  if (!logs.tiene(`${oldMessage.guild.id}`)) return;
  let log = await logs.obtener(`${newMessage.guild.id}`);
  const canalrendered = client.channels.get(log);
  if (oldMessage.content === newMessage.content) {
    return;
  }
  const embed = new Discord.RichEmbed()
    .setAuthor(`Mensaje Editado`)
    .setColor("ORANGE")
    .setThumbnail(newMessage.author.displayAvatarURL)
    .setDescription(
      `**Mensaje Editado Por:** <@${newMessage.author.id}> \n**Mensaje Viejo:** ${oldMessage.content} \n**Mensaje Nuevo:** ${newMessage.content} \n**Canal:** ${oldMessage.channel}`
    );
  canalrendered.send(embed);
});

client.on("channelCreate", async channel => {
  if (!logs.tiene(`${channel.guild.id}`)) return;
  let log = await logs.obtener(`${channel.guild.id}`);
  const canalrendered = client.channels.get(log);

  const embed = new Discord.RichEmbed()
    .setAuthor(`Canal Creado`)
    .setColor("GREEN")
    .setDescription(
      `**Canal Creado:** ${channel} \n**Tipo de Canal:** ${channel.type}`
    );
  canalrendered.send(embed);
});

//Eventos sacar bot y meter bot//

client.on("guildCreate", guild => {
  let SendChannel = guild.channels.filter(x => x.type === "text").random();
  const agre = new Discord.RichEmbed()
    .setAuthor(
      `🎉 >> | Gracias por agregarme a tu servidor`,
      client.user.avatarURL
    )
    .setDescription(
      `Espero me mantengas en tu server mucho tiempo y te sea de utilidad`
    )
    .addField("🔧 >> | Para Usarme Usa:", "`x!ayuda`")
    .addField("🔨 >> | Para Ver lista Comandos:", "`x!comandos`")
    .setColor("RANDOM");
  SendChannel.send(agre);
});

client.on("guildCreate", guild => {
  let canal = client.channels.get("728801642702700625");
  let invitechannels = guild.channels.filter(c =>
    c.permissionsFor(guild.me).has("MANAGE_CHANNELS")
  );
  return canal.send(
    new Discord.RichEmbed()
      .setAuthor("🎉 >> | Fui Añadido A Un Nuevo Server")
      .addField("💬 | Miembros:", guild.memberCount, true)
      .addField("💎 | Nombre:", guild.name, true)
      .addField("💬 | Canales", guild.channels.size, true)
      .addField("🆔 | ID:", guild.id, true)
      .setThumbnail(guild.iconURL)
      .addField("👑 | Owner:", guild.owner.user.tag, true)
      .addField("🔱Invite:", "No tenemos invitación", true)
      .addField(
        "Ahora tenemos:",
        client.guilds.size.toLocaleString() + " servidores!",
        true
      )
      .setColor("#5b00ff")
      .setFooter(guild.name, guild.iconURL)
  );

  invitechannels
    .random()
    .createInvite()
    .then(invite =>
      canal.send(
        new Discord.RichEmbed()
          .setAuthor("🎉 >> | Fui Añadido A Un Nuevo Server")
          .addField("💬 | Miembros:", guild.memberCount, true)
          .addField("💎 | Nombre:", guild.name, true)
          .addField("💬 | Canales", guild.channels.size, true)
          .addField("🆔 | ID:", guild.id, true)
          .setThumbnail(guild.iconURL)
          .addField("👑 | Owner:", guild.owner.user.tag, true)
          .addField(
            "🔱Invite:",
            "[Invitación](https://discord.gg/" + invite + ")",
            true
          )
          .addField(
            "Ahora tenemos:",
            client.guilds.size.toLocaleString() + " servidores!",
            true
          )
          .setColor("#5b00ff")
          .setFooter(guild.name, guild.iconURL)
      )
    );
});

client.on("guildDelete", guild => {
  let Discord = require("discord.js");
  let channel = client.channels.get("728801659496562739");
  const embed = new Discord.RichEmbed()
    .setAuthor(`😢 >> | Fui Removido De Un Server`, client.user.avatarURL)
    .setDescription(`:cry: ___¡Me removieron de un **Servidor**!___`)
    .addField("💡 >> | Nombre Server: ", guild.name, true)
    .addField("🆔 >> | ID Server: ", guild.id, true)
    .addField("👤 >> | Usuarios: ", guild.memberCount, true)
    .addField("💬 | Canales", guild.channels.size, true)
    .setColor("RANDOM");
  channel.send(embed);
});

client.on("message", async message => {
  const palabras = new db.crearDB("Palabras");
  let p = await palabras.obtener(message.guild.id);
  if (palabras.tiene(`${message.guild.id}`)) {
    if (p.some(word => message.content.toLowerCase().includes(word))) {
      if (message.member.hasPermission("ADMINISTRATOR")) return;
      message.delete(100);
      message
        .reply("❌ La palabra ha sido bloqueada en mi configuracion.")
        .then(response => {
          return response.delete(6000);
        });
    }
  }
});

app.get("/api/v1/ping", function(req,res) {
  res.send(client.ping);
});
client.login(process.env.TOKEN);
