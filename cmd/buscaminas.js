let Discord = require("discord.js");

exports.run = async (client, message, args, msg) => {
  
  const choices = ["||:zero:||", "||:one:||", "||:two:||", "||:three:||", "||:four:||", "||:five:||", "||:six:||", "||:seven:||", "||:eight:||","||:bomb:||"];
  const number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; 
  const bomb = 9; 
  let bombas = 20; 
  
  let row = number[Math.floor(Math.random() * number.length)]; 
  let column = number[Math.floor(Math.random() * number.length)]; 
  
  var buscaminas=new Array(10); 

  for (let i = 0; i < 10; i++){
    buscaminas[i]=new Array(10); 
  }

  for (let i = 0; i<10; i++){
    for (let j = 0; j<10 ;j++){
      buscaminas[i][j] = 0;        
    }
  }
  while (bombas != 0) { 
    while(buscaminas[row][column]==9){ 
        row = number[Math.floor(Math.random() * number.length)]; 
        column = number[Math.floor(Math.random() * number.length)];
    }
    
      bombas = bombas-1;
      buscaminas[row][column] = 9;
      
    
    
     let iteri = 3; 
        for (let i = 0; i < iteri; i++) {
            let iterj = 3; 
            if (row == 0 && i == 0)
                i++; 
            if (row == 10 - 1 && i == 0)
                iteri--; 
            for (let j = 0; j < iterj; j++) {
                if (column == 0 && j == 0)
                    j++; 
                if (column == 10 - 1 && j == 0)
                    iterj--;
                if (i != 1 || j != 1)
                    if (buscaminas[row + i - 1][column - 1 + j] != bomb) 
                        buscaminas[row + i - 1][column - 1 + j]++; 
            }
        }
      
    }
  
 
  for (let i = 0; i<10; i++){
    for (let j = 0; j<10;j++){
        buscaminas[i][j] = choices[buscaminas[i][j]];
    }
  }
  
  return message.channel.send(buscaminas);
};