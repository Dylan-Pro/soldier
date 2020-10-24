exports.run = async (client, message, args) => {

  let Discord = require("discord.js");
  const db = require("megadb");
  const dinero = new db.crearDB("Dinero");
  const banco = new db.crearDB("Banco");
  let levels_db = new db.crearDB("niveles");
  const vips_db = new db.crearDB("vips", "vips");
  const devs_db = new db.crearDB("devs", "devs");
  const desc = new db.crearDB("notas");
  //const ranks = new db.crearDB("Rangos")
  const marry = new db.crearDB("Matrimonio");
  const inventario = new db.crearDB("inventarios");
  const color = new db.crearDB("color")
  const img_db = new db.crearDB("img");
  const rep = new db.crearDB("rep")
  const imgl_db = new db.crearDB("imgl");
  const inventario2 = new db.crearDB("inventariosOP");
  let user = message.mentions.users.first() || message.author;

  var embot = new Discord.RichEmbed();
  embot.setDescription("Bots no Tienen Perfil");
  embot.setColor("RED")
  if (user.bot) return message.channel.send(embot);
  
 if(!inventario.tiene(`${message.guild.id}`)) return message.channel.send("Su perfil ha sido creado coloque `x!perfil`")

  if (!levels_db.tiene(message.guild.id))
    levels_db.establecer(message.guild.id, {});
  if (!levels_db.tiene(`${message.guild.id}.${user.id}`))
    levels_db.establecer(`${message.guild.id}.${user.id}`, {
      xp: 0,
      nivel: 1
    });
  let { xp, nivel } = await levels_db.obtener(`${message.guild.id}.${user.id}`);

  let randomxp = Math.floor(Math.random() * 4) + 2;
  let levelup = 5 * nivel ** 2 + 50 * nivel + 100;

  if (!dinero.tiene(`${message.guild.id}.${user.id}`)) {
    dinero.establecer(`${message.guild.id}.${user.id}`, 0);
  }

  if (!banco.tiene(`${message.guild.id}.${user.id}`)) {
    banco.establecer(`${message.guild.id}.${user.id}`, 0);
  }
  let cdinero = await dinero.obtener(`${message.guild.id}.${user.id}`);
  let cbanco = await banco.obtener(`${message.guild.id}.${user.id}`);
  var total = Math.floor(cdinero + cbanco);
  //Listo
  const vip = await vips_db.obtener("vips");
  let skere;
  skere = "`☑️`";
  if (vip.includes(user.id) == false) {
    skere = "`❌`";
  }

  let staff = await devs_db.obtener("devs");
  let skere2;
  skere2 = "`☑️`";
  if (staff.includes(user.id) == false) {
    skere2 = "`❌`";
  }
  //const rank = await ranks.obtener(`${message.guild.id}.${user.id}`)
  const note = await desc.obtener(`${message.guild.id}.${user.id}`);
  const marr = await marry.obtener(`${message.guild.id}.${user.id}`);

  let medallas;
  medallas = await inventario.obtener(`${message.guild.id}.${user.id}`);

  if (!inventario.tiene(`${message.guild.id}.${user.id}`)) {
    await inventario.set(`${message.guild.id}.${user.id}`, []); //Esto se ocupa
    return (medallas = "No tiene medallas");
  }
  let med = await inventario.get(`${message.guild.id}.${user.id}`);

  let medails;
  if (!inventario.tiene(`${message.guild.id}.${user.id}`)) {
    medails = "No tiene medallas";
  }
  if (medallas == "No tiene medallas") {
    medails = "No tiene medallas";
  }
  if (med.length == 0) {
    medails = "No tiene medallas";
  } else {
    medails = med.join(" | ");
  }
  
  ///////
  
  let medallasop;
  medallasop = await inventario2.obtener(`${message.guild.id}.${user.id}`);

  if (!inventario2.tiene(`${message.guild.id}.${user.id}`)) {
    await inventario2.set(`${message.guild.id}.${user.id}`, []); //Esto se ocupa
    return (medallasop = "No tiene medallasOP");
  }
  let med2 = await inventario2.get(`${message.guild.id}.${user.id}`);

  let medails2;
  if (!inventario2.tiene(`${message.guild.id}.${user.id}`)) {
    medails2 = "No tiene medallasOP";
  }
  if (medallasop == "No tiene medallasOP") {
    medails2 = "No tiene medallasOP";
  }
  if (med2.length == 0) {
    medails2 = "No tiene medallasOP";
  } else {
    medails2 = med2.join(" | ");
  }

  let reps;
  reps = await rep.obtener(`${message.guild.id}.${user.id}`)
  if (!rep.tiene(`${message.guild.id}.${user.id}`)) {
    reps = "0";
  }

  let colorxd = await color.obtener(`${message.guild.id}.${user.id}`);
  const i = await img_db.obtener(`${message.guild.id}.${user.id}`, args.join(" "))

  const il = await imgl_db.obtener(`${message.guild.id}.${user.id}`, args.join(" "))
  const embed = new Discord.RichEmbed()
    .setAuthor(
      `🍺 Perfil de ${user.username} [${user.id}]`,
      client.user.displayAvatarURL
    )
    .setColor(colorxd)
    .setThumbnail(il)
    .setDescription(`🚀 ${note ? `**${note}**` : "**No Tiene Descripcion**"}`)
    .addField(
      "🤑 **Dinero/Banco:**",
      "**Dinero:** " +
      cdinero +
      " \n**Banco:** " +
      cbanco +
      " \n**Total:** " +
      total,
      true
    )
    .addField(
      "🔋 **Nivel/XP:**",
      `**Nivel:** ${nivel} \n**XP:** ${xp}/${levelup} \n**Siguiente Nivel:** ${nivel +1}`,
      true
    )
    .addField("♥ **Casad@ con:**", `${marr ? `${marr}` : "No esta casad@"}`, true)
    .addField("👝 **Medallas:**", medails, false)
    .addField("🌟 **Medallas OP:**", medails2, false)
    .addField("🧼 **Rangos:**", "`Proximamente`", true)
    .addField("🍺 **Reputaciones:**", reps, false)
    .addField("🌟 **Usuario VIP:**", skere, true)
    .addField("👮 **Usuario STAFF:**", skere2, true)
    .setImage(i)
  message.channel.send(embed);
};
