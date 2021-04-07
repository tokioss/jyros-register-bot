const { Discord, MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../Settings/ayarlar.json");

exports.run = async (client, message, args) => {

  let tag = ayarlar.tag;
  let erkek = ayarlar.erkek
  let kayıtsız = ayarlar.kayıtsız
  let log = ayarlar.log
  let yes = ayarlar.yesemoji
  let no = ayarlar.noemoji
  let footer = ayarlar.footer


    let jyros = message.mentions.users.first();
    const embed = new MessageEmbed().setFooter(`${footer}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp().setColor(`#fffff0`);

  let isim = args[1];
  let yaş = args[2];
  
  const Tagisim = `${tag} ${isim} | ${yaş}`;
  
if (!message.member.roles.cache.some(r => [(ayarlar.yetkili)].includes(r.id)) && !message.member.hasPermission("ADMINISTRATOR")) {
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
  
  message.guild.members.cache
    .get(jyros.id)
    .setNickname(Tagisim);
  message.guild.members.cache.get(jyros.id).roles.remove(kayıtsız);
  message.guild.members.cache.get(jyros.id).roles.add(erkek);//pinglenmemesi için ctrl+c ctrl+v yapabilirsiniz

  
  db.add(`toplamKayıt.${message.author.id}`, 1)
  db.add(`erkekKayıt.${message.author.id}`, 1)
  db.push(`isim.${jyros.id}`,{userID: jyros.id, isimleri: Tagisim, role: ayarlar.erkek, teyitciid: message.author.id, teyitcisim: message.author.username})

  message.guild.members.cache
    .get(jyros.id)
    .send(
      embed.setDescription(
        `Kaydınız ${message.author} tarafından **Erkek** olarak yapıldı.
         Aramıza hoşgeldin!`)
       );

  let embed2 = new MessageEmbed()
  .setColor(`#fdfdf9`)
  .setTitle(`Bir Kullanıcı Kayıt Edildi!`)
  .setFooter(`${footer}`)
  .setDescription(`
**${tag} ${isim} | ${yaş}** adıyla kaydedildi.
Kayıt Edilen Kullanıcı : ${jyros}
Kayıt Eden Yetkili : ${message.author}
`);
  client.channels.cache.get(ayarlar.log).send(embed2);
  
  let embed3 = new MessageEmbed().setColor(`#fdfdf9`).setDescription(`${yes} ${jyros} isimli kullanıcı başarıyla **Erkek** olarak kaydedildi.`).setFooter(`${footer}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}));
  message.channel.send(embed3);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["e"],
  permLevel: 0
};

exports.help = {
  name: "erkek"
}; 
