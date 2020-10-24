exports.run = async (client, message, args) => {
  const Discord = require("discord.js");
  const db = require("megadb");
  const dinero = new db.crearDB("Dinero");
  const inventario2 = new db.crearDB("inventariosOP");
  const userbalance = await dinero.obtener(`${message.guild.id}.${message.author.id}`);
  const userinventario = await inventario2.obtener(`${message.guild.id}.${message.author.id}`)
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

    .setAuthor(bot + " ┊ BuyOP", client.user.avatarURL)
    .setDescription("Ejemplo: `" + prefix + "buyop` [objeto]")
    .setColor("RANDOM")
    .setThumbnail(
      "https://lh3.googleusercontent.com/proxy/ZvTO67F4dYfiu5wh5CQQghUpxyWt9zoUF7to7qfiwltHEKIOyTJgOHjOgNT6UwmFK3pjYY16rYUyx_sLXm-Y7G2Rd8PISgr3KhBBlaVI5It5JME2tHnnvloyMlPp5mbu06GxXbSn7Zuhfo2GXJUw-DI1"
    )
    .setFooter("Si no sabes lo que se puede comprar usa " + prefix + "shop op")
    .setTimestamp();
  if (!args[0]) {
     message.channel.send(embed);
 } else if (args[0].toLowerCase() == "verificado") {
   if (userbalance <= 10000)
      return message.channel.send(
        new Discord.RichEmbed()
          .setDescription("❌ No tienes suficientes monedas")
          .setColor("RED")
      );
    if (!inventario2.tiene(`${message.guild.id}.${message.author.id}`)) {
      inventario2.establecer(`${message.guild.id}.${message.author.id}`, []);
    }
    const userinventarioxd = await inventario2.obtener(`${message.guild.id}.${message.author.id}`);
    if (userinventarioxd.includes("<a:verify:729689385037070338>"))
      return message.channel.send(
        new Discord.RichEmbed()
          .setDescription("❌ Ya tienes esta medalla")
          .setColor("RED")
      );
    message.channel.send(
      new Discord.RichEmbed()
        .setDescription("☑️ Has comprado la medallaOP **Verificado** <a:verify:729689385037070338>")
        .setColor("GREEN")
    );
    dinero.restar(`${message.guild.id}.${message.author.id}`, 10000);
    inventario2.push(`${message.guild.id}.${message.author.id}`, "<a:verify:729689385037070338>");
    } else if (args[0].toLowerCase() == "minecraft") {
   if (userbalance <= 15000)
      return message.channel.send(
        new Discord.RichEmbed()
          .setDescription("❌ No tienes suficientes monedas")
          .setColor("RED")
      );
    if (!inventario2.tiene(`${message.guild.id}.${message.author.id}`)) {
      inventario2.establecer(`${message.guild.id}.${message.author.id}`, []);
    }
    const userinventarioxd = await inventario2.obtener(`${message.guild.id}.${message.author.id}`);
    if (userinventarioxd.includes("<a:mine:729695611644805211>"))
      return message.channel.send(
        new Discord.RichEmbed()
          .setDescription("❌ Ya tienes esta medalla")
          .setColor("RED")
      );
    message.channel.send(
      new Discord.RichEmbed()
        .setDescription("☑️ Has comprado la medallaOP **Minecraft** <a:mine:729695611644805211>")
        .setColor("GREEN")
    );
    dinero.restar(`${message.guild.id}.${message.author.id}`, 15000);
    inventario2.push(`${message.guild.id}.${message.author.id}`, "<a:mine:729695611644805211>");
          } else if (args[0].toLowerCase() == "booster") {
   if (userbalance <= 20000)
      return message.channel.send(
        new Discord.RichEmbed()
          .setDescription("❌ No tienes suficientes monedas")
          .setColor("RED")
      );
    if (!inventario2.tiene(`${message.guild.id}.${message.author.id}`)) {
      inventario2.establecer(`${message.guild.id}.${message.author.id}`, []);
    }
    const userinventarioxd = await inventario2.obtener(`${message.guild.id}.${message.author.id}`);
    if (userinventarioxd.includes("<a:boost:729696841410543636>"))
      return message.channel.send(
        new Discord.RichEmbed()
          .setDescription("❌ Ya tienes esta medalla")
          .setColor("RED")
      );
    message.channel.send(
      new Discord.RichEmbed()
        .setDescription("☑️ Has comprado la medallaOP **Booster** <a:boost:729696841410543636>")
        .setColor("GREEN")
    );
    dinero.restar(`${message.guild.id}.${message.author.id}`, 20000);
    inventario2.push(`${message.guild.id}.${message.author.id}`, "<a:boost:729696841410543636>");
                      } else if (args[0].toLowerCase() == "wumpus") {
   if (userbalance <= 25000)
      return message.channel.send(
        new Discord.RichEmbed()
          .setDescription("❌ No tienes suficientes monedas")
          .setColor("RED")
      );
    if (!inventario2.tiene(`${message.guild.id}.${message.author.id}`)) {
      inventario2.establecer(`${message.guild.id}.${message.author.id}`, []);
    }
    const userinventarioxd = await inventario2.obtener(`${message.guild.id}.${message.author.id}`);
    if (userinventarioxd.includes("<a:wumpus:731353206780592150>"))
      return message.channel.send(
        new Discord.RichEmbed()
          .setDescription("❌ Ya tienes esta medalla")
          .setColor("RED")
      );
    message.channel.send(
      new Discord.RichEmbed()
        .setDescription("☑️ Has comprado la medallaOP **Wumpus** <a:wumpus:731353206780592150>")
        .setColor("GREEN")
    );
    dinero.restar(`${message.guild.id}.${message.author.id}`, 25000);
    inventario2.push(`${message.guild.id}.${message.author.id}`, "<a:wumpus:731353206780592150>");
  } else if (args[0]) {
    message.channel.send(
      new Discord.RichEmbed()
        .setDescription("❌ Esa medalla no existe")
        .setColor("RED")
    );
  }
}