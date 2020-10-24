let Discord = require("discord.js")
exports.run = async(client, message, args) => {
let db = require("megadb")
const color = new db.crearDB("color")
let niveles = new db.crearDB("niveles")
if(!niveles.tiene(`${message.guild.id}`)) return message.channel.send("<a:no:703054715138605067> No hay nadie con nivel en el servidor")
let usuario = message.mentions.users.first() || message.author;
if(!niveles.tiene(`${message.guild.id}.${usuario.id}`)) return message.channel.send("<a:no:703054715138605067> No tiene XP este usuario")
let { xp , nivel } = await niveles.obtener(`${message.guild.id}.${usuario.id}`)
let levelup = 5 * (nivel ** 2) + 50 * nivel + 100
let colorxd = await color.obtener(`${message.guild.id}.${usuario.id}`);
let embed = new Discord.RichEmbed()
.setColor(colorxd)
.setThumbnail(usuario.displayAvatarURL)
.setDescription(`👑 **Estadisticas de:** ${usuario}`, true)
.addField("🔋 **Nivel:**", nivel)
.setThumbnail(usuario.displayAvatarURL)
.addField("📡 **Experiencia:**", `${xp}/${levelup}`)
message.channel.send(embed)
}