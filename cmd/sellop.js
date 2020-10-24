const Discord = require("discord.js");
const db = require("megadb");
exports.run = async (client, message, args) => {
  const dinero = new db.crearDB("Dinero");
  const inventario2 = new db.crearDB("inventariosOP");
  const userbalance = await dinero.obtener(
    `${message.guild.id}.${message.author.id}`
  );
  const userinventario = await inventario2.obtener(
    `${message.guild.id}.${message.author.id}`
  );
  let bot = client.user.username;
  const prefix_db = new db.crearDB("prefixes");

  //bases//
  let prefix;
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`);
  } else {
    prefix = "x!";
  }

  const embed = new Discord.RichEmbed()

    .setAuthor(bot + " ┊ VentaOP", client.user.avatarURL)
    .setDescription("Ejemplo: `" + prefix + "sellop` [objeto]")
    .setColor("RANDOM")
    .setThumbnail(
      "https://lh3.googleusercontent.com/proxy/ZvTO67F4dYfiu5wh5CQQghUpxyWt9zoUF7to7qfiwltHEKIOyTJgOHjOgNT6UwmFK3pjYY16rYUyx_sLXm-Y7G2Rd8PISgr3KhBBlaVI5It5JME2tHnnvloyMlPp5mbu06GxXbSn7Zuhfo2GXJUw-DI1"
    )
    .setFooter(
      "Si no sabes el nombre de lo que has comprado usa " + prefix + "shop op"
    )
    .setTimestamp();
  if (!args[0]) {
    message.channel.send(embed);
  } else if (args[0].toLowerCase() == "verificado") {
    const userinventarioxd = await inventario2.obtener(
      `${message.guild.id}.${message.author.id}`
    );
    if (!userinventarioxd.includes("<a:verify:729689385037070338>"))
      return message.channel.send(
        new Discord.RichEmbed()
          .setDescription("❌ No tienes esta medalla")
          .setColor("RED")
      );
    message.channel.send(
      new Discord.RichEmbed()
        .setDescription(
          "☑️ Has vendido la medallaOP **Verificado** <a:verify:729689385037070338>"
        )
        .setColor("GREEN")
    );
    dinero.sumar(`${message.guild.id}.${message.author.id}`, 10000);
    inventario2.extract(
      `${message.guild.id}.${message.author.id}`,
      "<a:verify:729689385037070338>"
    );
  } else if (args[0].toLowerCase() == "minecraft") {
    const userinventarioxd = await inventario2.obtener(
      `${message.guild.id}.${message.author.id}`
    );
    if (!userinventarioxd.includes("<a:mine:729695611644805211>"))
      return message.channel.send(
        new Discord.RichEmbed()
          .setDescription("❌ No tienes esta medalla")
          .setColor("RED")
      );
    message.channel.send(
      new Discord.RichEmbed()
        .setDescription(
          "☑️ Has vendido la medallaOP **Minecraft** <a:mine:729695611644805211>"
        )
        .setColor("GREEN")
    );
    dinero.sumar(`${message.guild.id}.${message.author.id}`, 15000);
    inventario2.extract(
      `${message.guild.id}.${message.author.id}`,
      "<a:mine:729695611644805211>"
    );
  } else if (args[0].toLowerCase() == "booster") {
    const userinventarioxd = await inventario2.obtener(
      `${message.guild.id}.${message.author.id}`
    );
    if (!userinventarioxd.includes("<a:boost:729696841410543636>"))
      return message.channel.send(
        new Discord.RichEmbed()
          .setDescription("❌ No tienes esta medalla")
          .setColor("RED")
      );
    message.channel.send(
      new Discord.RichEmbed()
        .setDescription(
          "☑️ Has vendido la medallaOP **Booster** <a:boost:729696841410543636>"
        )
        .setColor("GREEN")
    );
    dinero.sumar(`${message.guild.id}.${message.author.id}`, 20000);
    inventario2.extract(
      `${message.guild.id}.${message.author.id}`,
      "<a:boost:729696841410543636>"
    );
      } else if (args[0].toLowerCase() == "wumpus") {
    const userinventarioxd = await inventario2.obtener(
      `${message.guild.id}.${message.author.id}`
    );
    if (!userinventarioxd.includes("<a:wumpus:731353206780592150>"))
      return message.channel.send(
        new Discord.RichEmbed()
          .setDescription("❌ No tienes esta medalla")
          .setColor("RED")
      );
    message.channel.send(
      new Discord.RichEmbed()
        .setDescription(
          "☑️ Has vendido la medallaOP **Wumpus** <a:wumpus:731353206780592150>"
        )
        .setColor("GREEN")
    );
    dinero.sumar(`${message.guild.id}.${message.author.id}`, 25000);
    inventario2.extract(
      `${message.guild.id}.${message.author.id}`,
      "<a:wumpus:731353206780592150>"
    );
  } else if (args[0]) {
    message.channel.send(
      new Discord.RichEmbed()
        .setDescription("❌ Esa medalla no existe")
        .setColor("RED")
    );
  }
};
