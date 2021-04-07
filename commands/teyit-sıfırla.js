const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
const ayarlar = require("../Settings/ayarlar.json")
exports.run = async(client, message, args) => {
    let footer = ayarlar.footer
    
    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setFooter(`${footer}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp();
    
    if( !message.member.hasPermission(8)) return;
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!uye) return message.channel.send(embed.setDescription(`${message.author}, Bir kullanıcı etiketlemelisin.`)).then(m => m.delete({ timeout: 5000 }))
    if (uye) {
        db.delete(`toplamKayıt.${uye.id}`)
        db.delete(`kadınKayıt.${uye.id}`)
        db.delete(`erkekKayıt.${uye.id}`)
        message.channel.send(embed.setDescription(`${uye} Üyesinin Kayıt Verileri Sıfırlandı`))
    }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["teyitsıfırla"],
};

exports.help = {
  name: 'teyit-sıfırla',
  description: '',
  usage: ''
};