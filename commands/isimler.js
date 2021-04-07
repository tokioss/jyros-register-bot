const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const moment = require('moment')
const ayarlar = require('../Settings/ayarlar.json')
exports.run = async (client, message, args) => {

  let yetkili = ayarlar.yetkili
  let footer = ayarlar.footer
  let yes = ayarlar.yesemoji
  let no = ayarlar.noemoji
  
if(!message.member.roles.cache.get(yetkili) && !message.member.hasPermission('ADMINISTRATOR'))
return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`Bu komutu kullanmak için \`<@&${yetkili}>\` yetkisine sahip olmalısın.`)
.setColor(`RANDOM`))

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!member) return message.channel.send(new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setDescription(`Bir kullanıcı belirt.`).setColor(`RANDOM`))
var sayi = 1
let data = db.get(`isim.${member.id}`)

if(!data) return message.channel.send(new MessageEmbed() 
.setDescription(`
${member} adlı üyenin isim bilgileri:

${no} Kullanıcının veri tabanında kayıtlarına ulaşılamadı.`)
.setColor(`RANDOM`))
  
let isimler = data.filter(x => x.userID === member.id).map(x => `${sayi++}- \`${x.isimleri}\`  (<@&${x.role}>)`).join("\n")
if(isimler === null) isimler = "Kullanıcı hiç kayıt olmamış"
if(isimler === undefined) isimler = "Kullanıcı hiç kayıt olmamış"

const embed = new MessageEmbed()  
.setDescription(`
${member} adlı üyenin isim bilgileri:

${yes} Veri tabanında kullanıcının eski kayıtlı isimleri bulundu:  \n\n${isimler}`)
.setColor(`RANDOM`)
message.channel.send(embed)}
  
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['isimler', 'eski-isim'],
    permLevel: 0,
  }
  
  exports.help = {
        name: "isimler"
    
  }