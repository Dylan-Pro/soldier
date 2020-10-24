exports.run = async (client, message, args) => {

let Discord = require("discord.js");
let math = require("math-expression-evaluator");


const embed = new Discord.RichEmbed()
  .setColor(`RANDOM`);
  
  if (!args[0]) {
    embed.setDescription("❌ Por favor ingrese una Expresion. \n\n**Ejemplos:** \n**Sumas:** `5 + 5` \n**Restas:** `5 - 5` \n**Divisiones:** `5 / 5` \n**Multiplicaciones:** `5 * 5`");
    return await message.channel.send(embed); // Devuelve un mensaje si es que ejecuta el comando sin nada
  }
  let resultado;
  try {
    resultado = math.eval(args.join(" ")); 
  } catch (e) {
    resultado = "error: Entrada Invalida"; 
  }
  embed.addField("Expresion:", `\`\`\`js\n${args.join(" ")}\`\`\``, false) 
  .setTitle("📊 Calculadora")
  .addField("Resultado:", `\`\`\`js\n${resultado}\`\`\``, false);
  await message.channel.send(embed);
};