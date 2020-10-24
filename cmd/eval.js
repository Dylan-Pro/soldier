exports.run = async (client, message, args) => {
const db = require("megadb")
let Discord = require("discord.js")
const devs_db = new db.crearDB("devs", "devs")
let staff = await devs_db.obtener("devs")
if(!staff.includes(message.author.id)) return message.channel.send(new Discord.RichEmbed()
                                              .setDescription("❌ No tienes permisos para usar este comando.")
                                              .setColor("RED"))

let limit = 1950;
    try {
      let codein = args.join(" ");
      if (codein == "client.TOKEN")
        return message.channel.send("❌ **Contenido Privado**");
      if (codein == "client.token")
        return message.channel.send("❌ **Contenido Privado**"); //lo meti en un archivo seguro no lo pueden hackear ademas ya esta párcahdo es el de abajo config ya no tiene el token le puse otra cosa miralo
      if (codein == "process.env.TOKEN")
        return message.channel.send("❌ **Contenido Privado**");
      let code = args.join(' ');
      let evalued = eval(code);
      if (typeof evalued !== "string")
        evalued = require("util").inspect(evalued);
      let txt = "" + evalued;
      if (txt.length > limit) {
        const embed = new Discord.RichEmbed()
        .setAuthor("✅ Evaluacion hecha! ✅", client.user.displayAvatarURL)
        .addField("☑️ Entrada", `\`\`\`js\n${args}\n\`\`\``)
        .addField("☑️ Salida", `\`\`\`js\n ${txt.slice(0, limit)}\n\`\`\``)
        .setColor("RANDOM")
        .setFooter("Pedido por: "+message.author.tag)
        message.channel.send(embed);
      } else
        var embed = new Discord.RichEmbed()
        .setAuthor("✅ Evaluacion hecha! ✅", client.user.displayAvatarURL)
        .addField("☑️ Entrada", `\`\`\`js\n${args}\n\`\`\``)
        .addField("☑️ Salida", `\`\`\`js\n ${txt}\n\`\`\``)
        .setColor("RANDOM")
        .setFooter("Pedido por: "+message.author.tag)
        message.channel.send(embed);
    } catch (err) {
      const embed = new Discord.RichEmbed()
      .setAuthor("⛔ Falla en la evaluacion ⛔", client.user.displayAvatarURL)
      .addField("⚠️ Entrada", `\`\`\`js\n${args}\n\`\`\``)
      .addField("⚠️ Salida", `\`\`\`js\n${err}\n\`\`\``)
      .setColor("RANDOM")
      .setFooter("Pedido por: "+message.author.tag)
      message.channel.send(embed);
  }
}