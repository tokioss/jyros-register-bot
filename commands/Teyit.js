const Discord = require("discord.js")
const db = require('quick.db');
const ayarlar = require("../Settings/ayarlar.json")
exports.run = async(client, message, args) => {    

   let yetkili = ayarlar.yetkili
   let footer = ayarlar.footer
   let yes = ayarlar.yesemoji
   let no = ayarlar.noemoji
  
 let jrsembed = new Discord.MessageEmbed().setFooter(`${footer}`).setColor("010000").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp();
let jyros = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;

let kızTeyit = db.fetch(`kadınKayıt.${jyros.id}`) || "0"
let erkekTeyit = db.fetch(`erkekKayıt.${jyros.id}`) || "0";
let topTeyit = db.fetch(`toplamKayıt.${jyros.id}`) || "0";
  

  if (!message.member.roles.cache.some(r => [(yetkili)].includes(r.id)) && !message.member.hasPermission("ADMINISTRATOR")) {
message.channel.send(`${no} ${message.author}, bu komutu kullanabilmek için yeterli yetkiye sahip değilsiniz.`)
return;    
};

if (!args[1]) {
message.channel.send(jrsembed.setDescription(`
${yes} ${jyros} ( \`${jyros.id}\` ) isimli kullanıcının teyit bilgileri:
    
Erkek teyit: **${erkekTeyit}**
Kız teyit: **${kızTeyit}**
Toplam teyit: **${topTeyit}**
`))
return;
}

if (args[1] === "kız") {
message.channel.send(jrsembed.setDescription(`
${yes} ${jyros} ( \`${jyros.id}\` ) isimli kullanıcının teyit bilgileri:
    
Kız teyit: **${kızTeyit}**
`))
return;
} 
if (args[1] === "erkek") {
message.channel.send(jrsembed.setDescription(`
${yes} ${jyros} ( \`${jyros.id}\` ) isimli kullanıcının teyit bilgileri:
        
Erkek teyit: **${erkekTeyit}**
`))
return;
} 
if (args[1] === "toplam") {
message.channel.send(jrsembed.setDescription(`
${yes} ${jyros} ( \`${jyros.id}\` ) isimli kullanıcının teyit bilgileri:
            
Erkek teyit: **${topTeyit}**
`))
return;
  
}}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["teyitbilgi", "teyitler","teyitlerim","kayıtlarım","kayıtlar"],
  permLevel: 0,
  kategori: ``
};

exports.help = {
  name: 'teyit',
  description: '',
  usage: ''
};
