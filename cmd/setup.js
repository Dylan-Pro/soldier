const Discord = require('discord.js')
const db = require('quick.db');
const serverstats = new db.table('ServerStats');

exports.run = async (client, message, args, tools) => {
  
if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`:x: You need **MANAGE_GUILD** permission to use this command.`)
if (!args[0]) return message.channel.send(":x: Argumentos Invalidos, Modo de uso correcto: `x!setup enable` | `x!setup disable`.");  
if(args[0] === 'enable') {
let totusers = await serverstats.fetch(`Stats_${message.guild.id}`, { target: '.totusers' })
let membcount = await serverstats.fetch(`Stats_${message.guild.id}`, { target: '.membcount' })
let botcount = await serverstats.fetch(`Stats_${message.guild.id}`, { target: '.botcount' })
if(totusers !== null || membcount !== null || botcount !== null) return message.channel.send(`:x: Ya tienes el server stats activado`)
if(!message.guild.me.hasPermission(`MANAGE_CHANNELS`)) return message.channel.send(`:x: I don't have **MANAGE_CHANNELS** permission.`);
	const totalsize = message.guild.memberCount;
	const botsize = message.guild.members.filter(m => m.user.bot).size;
	const humansize = totalsize - botsize;
message.guild.createChannel('📈Server Statistics📈', 'category', [{
  id: message.guild.id,
  deny: ['CONNECT']
}]).then(channel => {
channel.setPosition(0)
message.guild.createChannel("Total Usuarios : " + totalsize, 'voice', [{
  id: message.guild.id,
  deny: ['CONNECT']
}]).then(channel1 => {
channel1.setParent(channel.id)
let x = channel1.id
message.guild.createChannel("Usuarios  : " + humansize, 'voice', [{
  id: message.guild.id,
  deny: ['CONNECT']
}]).then(channel2 => {
channel2.setParent(channel.id)
let y = channel2.id
message.guild.createChannel("Bots: " + botsize, 'voice', [{
  id: message.guild.id,
  deny: ['CONNECT']
}]).then(async channel3 => {
channel3.setParent(channel.id)
let z = channel3.id
await serverstats.set(`Stats_${message.guild.id}`, { guildid: message.guild.id, totusers: x, membcount: y, botcount: z, categid: channel.id})
})
})
})
})
message.channel.send(`:white_check_mark: Server Stats ha sido activado.`)
} else if (args[0] === 'disable') {
  
let totusers = await serverstats.fetch(`Stats_${message.guild.id}`, { target: '.totusers' })
let membcount = await serverstats.fetch(`Stats_${message.guild.id}`, { target: '.membcount' })
let botcount = await serverstats.fetch(`Stats_${message.guild.id}`, { target: '.botcount' })
let categ = await serverstats.fetch(`Stats_${message.guild.id}`, { target: '.categid' })
if(totusers === null || membcount === null || botcount === null) return message.channel.send(`:x: El server stats no esta activado en este server.`)
  client.channels.get(totusers).delete()
  client.channels.get(membcount).delete()
  client.channels.get(botcount).delete()
  client.channels.get(categ).delete()
  
serverstats.delete(`Stats_${message.guild.id}`)
message.channel.send(`:white_check_mark: Server Stats ha sido desactivado.`) 
}
}