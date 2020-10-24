exports.run = async (client, message, args) => {
  const Discord = require("discord.js");
  const db = require("megadb");
  const vips_db = new db.crearDB("vips", "vips");
  const vipstag = new db.crearDB("viptags", "vips");
  const devs_db = new db.crearDB("devs", "devs");
  let staff = await devs_db.obtener("devs");
  if (!staff.includes(message.author.id))
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription("❌ No tienes permisos para usar este comando.")
        .setColor("RED")
    );

  let user = message.mentions.users.first() || client.users.get[0] || args[0];

  if (!user)
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription("❌ No has mencionado a nadie.")
        .setColor("RED")
    );
  if (!vips_db.tiene("vips")) {
    vips_db.establecer("vips", []);
  }

  if (!vipstag.tiene("vips")) {
    vipstag.establecer("vips", []);
  }

  const vip = await vips_db.obtener("vips");
  if (vip.includes(user.id) == true)
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription("❌ Este usuario ya tiene VIP")
        .setColor("RED")
    );

  // if(devs_db.tiene("devs".user.id))

  await vipstag.push("vips", "**" + user.tag + "**");
  await vips_db.push("vips", user.id);
  message.channel.send(
    new Discord.RichEmbed()
      .setDescription("☑️ Usuario establecido correctamente como VIP del bot.")
      .setColor("GREEN")
  );
};
