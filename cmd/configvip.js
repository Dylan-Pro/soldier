exports.run = async (client, message, args) => {
  let Discord = require("discord.js");
  const db = require("megadb");
  const vips_db = new db.crearDB("vips", "vips")
  const vip = await vips_db.obtener("vips")
  let user = message.author;
  if (vip.includes(user.id) == false) return message.channel.send(
    new Discord.RichEmbed()
      .setDescription("❌ No eres VIP y por lo tanto no puedes ejecutar este comando")
      .setColor("RED")
  )
  const img_db = new db.crearDB("img");
  let img2 = await img_db.obtener(`${message.guild.id}.${user.id}`);
  const imgl_db = new db.crearDB("imgl");
  let img3 = await imgl_db.obtener(`${message.guild.id}.${user.id}`);
  const prefix_db = new db.crearDB("prefixes");

  let we;
  if (img_db.tiene(`${message.guild.id}.${user.id}`)) {
    we = `☑️ **[[Click-Imagen]](${img2})**`;
  }

  if (!img_db.tiene(`${message.guild.id}.${user.id}`)) {
    we = "❌ **Imagen del perfil no definida**";
  }

  let l;
  if (imgl_db.tiene(`${message.guild.id}.${user.id}`)) {
    l = `☑️ **[[Click-Imagen]](${img3})**`;
  }

  if (!imgl_db.tiene(`${message.guild.id}.${user.id}`)) {
    l = "❌ **Logo del perfil no definida**";
  }


  let prefix;
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`);
  } else {
    prefix = "x!";
  }


  if (!args[0])
    return message.channel.send(
      new Discord.RichEmbed()
        .setColor("RANDOM")
        .setThumbnail(message.author.displayAvatarURL)
        .setAuthor(`⚙️🔩 Configuraciones De ${message.guild.name} ⚙️🔩`)
        .addField("**📚 Prefix:**", "☑️ `" + prefix + "`")
        .setDescription("**Si necesitas mas informacion coloca `configvip info`**")
        .addField("**🖼️ Imagen Perfil**", we)
        .addField("**🖼️ Logo Perfil**", l)
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
        "🖼️ **Imagen Perfil:**",
        "`" + `${prefix}setimg <url>` + "`"
      )
      .addField(
        "🖼️ **Logo Perfil:**",
        "`" + `${prefix}setlogo <url>` + "`"
      )
    message.channel.send(embed);
  }
};