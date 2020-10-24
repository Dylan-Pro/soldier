exports.run = async (client, message, args) => {
 const Discord = require("discord.js");
  const db = require("megadb");
  const forceban = new db.crearDB("Ids");
  let i = await forceban.obtener("ids");
  let forceadd2 = new db.crearDB("Razones");
  var encontrados = [];
  i.forEach(id => {
    if (message.guild.members.get(id)) {
      encontrados.push(id);
    }
  });
  if (encontrados < 1)
    return message.channel.send(
      "❌ No he detectado ningun raider en el servidor"
    );

let index = 0;
  let fin = []
  let reasons = []
  for(let i = 0; i < encontrados.length;i++){
    console.log(encontrados[i])
      let datos = await forceadd2.get(encontrados[i])
      reasons.push(datos)
     fin.push(`${++index}📌 <@${encontrados[i]}> | **Razon:** ${reasons[i]}`)
  }
  

  message.channel.send(new Discord.RichEmbed()
    .setColor("RED")
    .setThumbnail("https://image.freepik.com/vector-gratis/auditoria-o-investigacion-fiscal-o-lista-paginas-papel-traves-lupa-icono-vector-dibujos-animados-plana_101884-673.jpg")
    .setAuthor("⚠️ >> | Deteccion de usuarios maliciosos en " + message.guild.name)
    .setDescription( fin.join("\n") )
    .setFooter("Wolf Security", client.user.displayAvatarURL))
}