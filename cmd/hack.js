const Discord = require("discord.js");
const chance = require("chance").Chance();

exports.run = async (client, message, args) => {
  let dominios = ["outlook.com", "gmail.com", "hotmail.com", "yahoo.com"];
  //Si quieren poner mas dominios no importa si sean verdaderos
  //Si quieren que sea solo un dominio mas abajo lo explicare

  let usuario = message.mentions.users.first();
  let autor = message.author;

  var correo = dominios[Math.floor(Math.random() * dominios.length)];

  if (!usuario) {
    message.delete(5000);
    message.channel.send(`No te puedes autohackear`).then(m => {
      m.delete(5000);
    });
    return;
  }
  //En mi caso hago que elimine el mensaje que pone el usuario y el mensaje en un timeout de 5 segundos.

  let ip = chance.ip();
  let numero = chance.phone({ country: "us", mobile: true });
  let correo2 = chance.email({ domain: correo });
  /*
        En caso en que quieran solo un dominio le cambiamos esto
        chance.email({domain: "(Dominio que quieran)Interrogacion.com" }
*/
  let contraseña = chance.word({ length: 8 });
  //Definimos las variables y las ponemos en un Embed
  //Pueden modificar el Embed a su gusto

  await message.channel
    .send("<:gatohack:725026164053377041> **Espera un momento....**")
    .then(m => m.delete(2000));
  await message.channel
    .send("<:gatohack:725026164053377041> **Obteniendo Ip....**")
    .then(m => m.delete(2000));
  await message.channel
    .send(
      "<:gatohack:725026164053377041> **Obteniendo Correo y contraseñas....**"
    )
    .then(m => m.delete(2000));
  await message.channel
    .send(
      "<:gatohack:725026164053377041> **Obteniendo numero de telefono....**"
    )
    .then(m => m.delete(2000));
  await message.channel.send("✅ **Hackeado Correctamente**");

  const hackeo = new Discord.RichEmbed()
    .setDescription(`${autor} Ha hackeado a ${usuario}`)
    .addField("📜 **Ip:**", ip)
    .addField("📱 **Numero:**", numero)
    .addField("📨 **Correo:**", correo)
    .addField("📊 **Contraseña:**", contraseña)
    .setThumbnail(usuario.displayAvatarURL)
    //.setImage("https://steamuserimages-a.akamaihd.net/ugc/778494376234286873/25FCAF9C5476895A9BF97B6163763D746F812C8A/")
    .setColor(`PURPLE`);
  message.channel.send(hackeo);
};
