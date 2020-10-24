exports.run = async (client, message, args) => {
  let Discord = require("discord.js");
  const db = require("megadb");
  const prefix_db = new db.crearDB("prefixes");
  let al = new (require("megadb")).crearDB("AntiLoggers");
  let ai = new (require("megadb")).crearDB("AntiLinks");
  const welcome = new db.crearDB("setwelcome", "welcomeleave");
  let canal2 = await welcome.obtener(message.guild.id);
  const welcomeimg = new db.crearDB("setwelcomeimg", "welcomeleave");
  let img2 = await welcomeimg.obtener(message.guild.id);
  const logs = new db.crearDB("logs");
  let canal3 = await logs.obtener(message.guild.id);
  let levels_db = new db.crearDB("niveles");

  //bases//
  let prefix;
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`);
  } else {
    prefix = "x!";
  }

  let antiloggers;
  if (al.tiene(message.guild.id)) {
    antiloggers = "☑️ Activado";
  }
  if (!al.tiene(message.guild.id)) {
    antiloggers = "❌ Desactivado";
  }
  
  let leve
  if (levels_db.tiene(message.guild.id)) {
    leve = "☑️ Activado";
  }
  if (!levels_db.tiene(message.guild.id)) {
    leve = "❌ Desactivado";
  }

  let log;
  if (logs.tiene(message.guild.id)) {
    log = `☑️ <#${canal3}>`;
  }
  if (!logs.tiene(message.guild.id)) {
    log = "❌ Canal no esta definido";
  }

  let antilinks;
  if (ai.tiene(message.guild.id)) {
    antilinks = "☑️ Activado";
  }
  if (!ai.tiene(message.guild.id)) {
    antilinks = "❌ Desactivado";
  }

  let bienvenida;
  if (welcome.tiene(message.guild.id)) {
    bienvenida = `☑️ <#${canal2}>`;
  }

  if (!welcome.tiene(message.guild.id)) {
    bienvenida = "❌ Canal no esta definido";
  }

  let we;
  if (welcomeimg.tiene(message.guild.id)) {
    we = `☑️ **[[Click-Imagen]](${img2})**`;
  }

  if (!welcomeimg.tiene(message.guild.id)) {
    we = "❌ Imagen no esta definida";
  }

  if (!args[0])
    return message.channel.send(
      new Discord.RichEmbed()
        .setColor("RANDOM")
        .setThumbnail(message.author.displayAvatarURL)
        .setAuthor(`⚙️🔩 Configuraciones De ${message.guild.name} ⚙️🔩`)
        .setDescription("**Si necesitas mas informacion coloca `config info`**")
        .addField("**📚 Prefix:**", "☑️ `" + prefix + "`")
        .addField("**⚓ AntiLoggers:**", antiloggers)
        .addField("**🔗 AntiLinks:**", antilinks)
        .addField("**⚙️ Bienvenida:**", bienvenida)
        .addField("**🔋 Niveles:**", leve)
        .addField("**🖍️ Logs:**", log)
        .addField("**🖼️ Imagen Bienvenida**", we)
    );
  if (args[0] === "info") {
    const embed = new Discord.RichEmbed()
      .setAuthor(
        `Menu Informacion de ${message.guild.name}`,
        client.user.displayAvatarURL
      )
      .setColor("RANDOM")
      .setThumbnail(message.author.displayAvatarURL)
      .addField(
        "🥨 **Cambio Prefix:**",
        "`" + `${prefix}setprefix <nuevo-prefix>` + "`"
      )
      .addField(
        "⚓ **AntiLoggers:**",
        "`" + `${prefix}anti-loggers On/Off` + "`"
      )
      .addField("🔗 **AntiLinks:**", "`" + `${prefix}anti-links On/Off` + "`")
      .addField(
        "⚙️ **Bienvenidas:**",
        "`" + `${prefix}setwelcome <#canal>` + "`"
      )
      .addField(
        "🖼️ **Imagen Bienvenida:**",
        "`" + `${prefix}setwelcomeimg <url>` + "`"
      )
      .addField("🖍️ **Logs:**", "`" + `${prefix}setlogs <#canal>` + "`")
      .addField("🖍️ **Niveles:**", "`" + `${prefix}niveles On/Off` + "`");
    message.channel.send(embed);
  }
};
