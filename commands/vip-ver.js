const Discord = require("discord.js"),
client = new Discord.Client();
const db = require("quick.db");
const ayarlar = require("../Settings/ayarlar.json")

module.exports.run = async (client, message, args) => {

   let footer = ayarlar.footer
   let yes = ayarlar.yesemoji
   let no = ayarlar.noemoji

let embed = new Discord.MessageEmbed().setFooter(`${footer}`).setColor("010000").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp();
let jyros = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
let vipRolu = ayarlar.vip;
if (!message.member.roles.cache.has(ayarlar.moderator) && !message.member.hasPermission("ADMINISTRATOR")) return;

if(!jyros) {
message.react(no);
message.channel.send(embed.setDescription(`${no} Geçerli bir üye belirtmelisiniz.`))
return;    
};
    
jyros.roles.cache.has(vipRolu) ? jyros.roles.remove(vipRolu) : jyros.roles.add(vipRolu) 
return message.react(yes);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["special"],
};

exports.help = {
  name: 'vip',
  description: '',
  usage: ''
};