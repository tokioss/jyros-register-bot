const dc = require('discord.js')
const db = require('quick.db')
const moment = require('moment')
const ayarlar = require("../Settings/ayarlar.json")

exports.run = async (client, message, args) => {

let footer = ayarlar.footer;
let uye = message.mentions.users.first() || message.author;
let bilgi = db.get(`toplamKayıt.${uye.id}`);
let yazı = "Toplam Teyit Listesi"

if(!message.member.roles.cache.get(ayarlar.yetkili) && !message.member.hasPermission('ADMINISTRATOR'))
return message.channel.send(new dc.MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setDescription(`Bu komutu kullanmak için <@&${ayarlar.yetkili}> yetkisine sahip olmalısın.`).setColor("RANDOM"))
  
let top = message.guild.members.cache.filter(uye => db.get(`toplamKayıt.${uye.id}`)).array().sort((uye1, uye2) => Number(db.get(`toplamKayıt.${uye2.id}`))-Number(db.get(`toplamKayıt.${uye1.id}`))).slice(0, 15).map((uye, index) => (index+1)+" • <@"+ uye +"> | \`" + db.get(`toplamKayıt.${uye.id}`) +"\` adet kayıta sahip.").join('\n');
message.channel.send(new dc.MessageEmbed().setAuthor(yazı, message.guild.iconURL({dynamic: true})).setTimestamp().setFooter(`${footer}`).setColor("#38ff3d").setDescription(top));
  
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["topteyit","top-teyit"],
    permLevel: 0
};
exports.help = {
    name: "topteyit"
};