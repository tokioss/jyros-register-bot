const { Discord, MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../Settings/ayarlar.json");

exports.run = async (client, message, args) => {

  let log = ayarlar.log;
  let jyros = message.mentions.users.first();
  let isim = args[1];
  let yaş = args[2];
  let footer = ayarlar.footer
  let yes = ayarlar.yesemoji
  let no = ayarlar.noemoji
  let tag = ayarlar.tag;
  
   const embed = new MessageEmbed().setFooter(`${footer}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp().setColor(`#fffff0`);
  
if (!message.member.roles.cache.some(r => [(ayarlar.moderator)].includes(r.id)) && !message.member.hasPermission("ADMINISTRATOR")) {
message.channel.send(`${no} ${message.author}, bu komutu kullanabilmek için yeterli yetkiye sahip değilsiniz.`)
return;    
};

  if(!jyros) {
message.channel.send(embed.setDescription(`${no} Geçerli bir üye belirtmelisiniz.`))
return;    
};
  
  if(!isim || !yaş) {
message.channel.send(embed.setDescription(`${no} Geçerli bir isim ve yaş belirtmelisiniz.`))
return;    
};
  
  const embed4 = new MessageEmbed()
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
    .setTimestamp()
    .setColor(`#fffff0`);
  message.guild.members.cache
    .get(jyros.id)
    .setNickname(`${tag} ${isim} | ${yaş}`);
  message.guild.members.cache
    .get(jyros.id)
    .send(
      embed4.setDescription(
        `Selam, isminiz ${message.author} adlı yetkili tarafından \`${tag} ${isim} | ${yaş}\` olarak güncellendi!`
      )
    );

  let embed2 = new MessageEmbed().setTitle(`Bir Kullanıcının İsmi Güncellendi!`).setColor(`RANDOM`).setDescription(`
\`${tag} ${isim} | ${yaş}\` olarak güncellendi.
İsmi Değiştirilen Kullanıcı: ${jyros}
İsmi Değiştiren Yetkili: ${message.author}
`);

  client.channels.cache.get(ayarlar.log).send(embed2);
  let embed3 = new MessageEmbed().setColor(`RANDOM`).setDescription(`
 ${jyros} adlı kişinin ismi, ${message.author} tarafından değiştirildi.
 Yeni İsim: **${tag} ${isim} | ${yaş}**
`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}));
  message.channel.send(embed3);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["i", "isim-değiştir","isimdeğiş","isimdeğiştir"],
  permLevel: 0
};

exports.help = {
  name: "isim"
}; 
