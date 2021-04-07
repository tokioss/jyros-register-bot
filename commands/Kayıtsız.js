const Discord = require('discord.js');
const db = require("quick.db")
const ayarlar = require("../Settings/ayarlar.json")
exports.run = async (client, message, args) => {
  
   let jyros = message.mentions.users.first()
   let member = message.guild.member(jyros)
   let yetkili = ayarlar.moderator
   let footer = ayarlar.footer
   let yes = ayarlar.yesemoji
   let no = ayarlar.noemoji
   let kayıtsız = ayarlar.kayıtsız
   let jrsembed = new Discord.MessageEmbed().setFooter(`${footer}`).setColor("010000").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp();
   
if (!message.member.roles.cache.some(r => [(yetkili)].includes(r.id)) && !message.member.hasPermission("ADMINISTRATOR")) {
message.channel.send(`${no} ${message.author}, bu komutu kullanabilmek için yeterli yetkiye sahip değilsiniz.`)
return;    
};
  
    if(!jyros) {
message.channel.send(jrsembed.setDescription(`${no} Geçerli bir üye belirtmelisiniz.`))
return;    
};
    
  member.roles.set(kayıtsız)

  let embed = new Discord.MessageEmbed() 
  .setColor("RANDOM")
  .setTimestamp()
  .setTitle(`${yes} Kayıtsıza atma işlemi başarılı!`)
  .setDescription(`${member} **üyesi,** ${message.author} **tarafından kayıtsıza atıldı!**`) 
  .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
  .setFooter(`${footer}`)
  const embed1 = new Discord.MessageEmbed() 
  return message.channel.send(embed);
  
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kayıtsız","kytsz"],
  permLevel: 0
}
exports.help = {
  name: 'kayıtsız',

}
