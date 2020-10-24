let Discord = require("discord.js");
let { nivelesFunc , getRank } = require("../niveles.js")
exports.run = async(client, message, args) =>{
let db = require("megadb")
let niveles = new db.crearDB("niveles")
if(!niveles.tiene(message.guild.id)) return message.channel.send("❌ No hay nadie con nivel en el servidor")
let usuarios = getRank(await niveles.obtener(message.guild.id), message)
usuarios.map((usuario, index) => usuarios[index] = "**Usuario**: "+usuario[0]+"\n**Nivel**: "+usuario[1]+"")
let paginas = []
let cantidad = 3
while(usuarios.length > 0) {
  paginas.push(usuarios.splice(0, cantidad))
}
let embed = new Discord.RichEmbed()
.setColor("36393e")
.setThumbnail(message.guild.iconURL)

if(!args[0]) {
embed.setDescription("Top niveles de "+message.guild.name+" (pagina 1/"+paginas.length+")\n\n"+paginas[0].join("\n")+"")
return message.channel.send(embed)
}
  if(isNaN(!args[0])) return message.channel.send("❌ Tienes que ingresar el numero de la pagina")
  let seleccion = parseInt(args[0])
  if(seleccion <= 0 || seleccion > paginas.length) return message.channel.send("❌ La pagina "+seleccion+" no existe")

embed.setDescription("Top niveles de "+message.guild.name+" (pagina "+seleccion+"/"+paginas.length+")\n\n"+paginas[seleccion-1].join("\n")+"")
  return message.channel.send(embed)
}