const { Discord, MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../Settings/ayarlar.json");

exports.run = async (client, message, args) => {


  let jyros = message.mentions.users.first();
  let kız = ayarlar.kız;
  let kayıtsız = ayarlar.kayıtsız;
  let log = ayarlar.log;
  let isim = args[1];
  let yaş = args[2];
  let footer = ayarlar.footer
  let yes = ayarlar.yesemoji
  let no = ayarlar.noemoji
  let tag = ayarlar.tag;
  
  let embed = new MessageEmbed().setFooter(`${footer}`).setColor("010000").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp();

  
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
  
    const Tagisim = `${tag} ${isim} | ${yaş}`;
  
 message.guild.members.cache
 .get(jyros.id)
 .setNickname(Tagisim);
  message.guild.members.cache.get(jyros.id).roles.remove(kayıtsız);
  message.guild.members.cache.get(jyros.id).roles.add(kız);//pinglenmemesi için ctrl+c ctrl+v yapabilirsiniz
  
  db.add(`toplamKayıt.${message.author.id}`, 1)
  db.add(`kadınKayıt.${message.author.id}`, 1)
  db.push(`isim.${jyros.id}`,{userID: jyros.id, isimleri: Tagisim, role: ayarlar.kız, teyitciid: message.author.id, teyitcisim: message.author.username, Sex: 'Kadın'})

  
message.guild.members.cache
    .get(jyros.id)
    .send(
      embed.setDescription(
        `Kaydınız ${message.author} adlı yetkili tarafından **Kız** olarak yapıldı.
         Aramıza hoşgeldin!`
      )
    );

  let embed2 = new MessageEmbed()
  .setColor(`RANDOM`)
  .setTitle(`Bir Kullanıcı Kayıt Edildi!`)
  .setFooter(`${footer}`).setDescription(`
**${tag} ${isim} | ${yaş}** adıyla kaydedildi.
Kayıt Edilen Kullanıcı : ${jyros}
Kayıt Eden Yetkili : ${message.author}
`);

  client.channels.cache.get(ayarlar.log).send(embed2);
  let embed3 = new MessageEmbed().setFooter(`${footer}`).setColor(`RANDOM`).setDescription(` ${yes} ${jyros} isimli kullanıcı başarıyla **Kadın** olarak kaydedildi.`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}));
  message.channel.send(embed3);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["k","kadın","bayan"],
  permLevel: 0
};

exports.help = {
  name: "kız"
}; 
