const Discord = require("discord.js");
require("events").EventEmitter.defaultMaxListeners = 30000;
require("events").defaultMaxListeners = 30000;
const client = new Discord.Client();
const ayarlar = require("./Settings/ayarlar.json");
const config = require("./Settings/config.json");
const fs = require("fs");
require("./util/eventLoader")(client);

const log = message => {
console.log(`{ ${message} } `);
};
client.commands = new Discord.Collection();
 client.aliases = new Discord.Collection();
  fs.readdir("./commands/", (err, files) => {
   if (err) console.error(err);
    log(`[JYROS] - ${files.length} komut yükleniyor.`);
     files.forEach(f => {
     let props = require(`./commands/${f}`);
    console.log(`[JYROS] - ${props.help.name}`);
   client.commands.set(props.help.name, props);
  props.conf.aliases.forEach(alias => {
 client.aliases.set(alias, props.help.name);
 });
  });
 });
client.reload = command => {
  return new Promise((resolve, reject) => {
   try {
    delete require.cache[require.resolve(`./commands/${command}`)];
     let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
       client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
   });
        client.commands.set(command, cmd);
       cmd.conf.aliases.forEach(alias => {
      client.aliases.set(alias, cmd.help.name);
     });
    resolve();
   } catch (e) {
  reject(e);
 }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./commands/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
    delete require.cache[require.resolve(`./commands/${command}`)];
    let cmd = require(`./commands/${command}`); 
    client.commands.delete(command);
  client.aliases.forEach((cmd, alias) => {
     if (cmd === command) client.aliases.delete(alias);
   });
     resolve();
      } catch (e) {
       reject(e);
      }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
      if (message.author.id === config.owners) permlvl = 4;
  return permlvl;
};


client.login(config.token);



client.on("guildMemberAdd", yenijyros => {
let tag = ayarlar.tag;
let tagsızSembolü = ayarlar.tagsızsembol;
yenijyros.setNickname(`${tag} İsim | Yaş`)
yenijyros.roles.add(ayarlar.kayıtsız);
})



client.on('guildMemberAdd', async jyros => {

  let jrschannel = client.channels.cache.get(ayarlar.kayıtkanal)

  jrschannel.send(`
:tada: Sunucumuza hoş geldin ${jyros}! Seninle beraber **${jyros.guild.memberCount}** kişiye ulaştık!

Hesabınız **${moment(jyros.user.createdAt).format('DD/MM/YYYY HH:mm:ss')}** tarihinde oluşturulmuş.

Sunucu kurallarımız <#KURALLARKANALID> kanalında belirtilmiştir. Unutma sunucu içerisinde ki ceza işlemlerin kuralları okuduğunu varsayarak gerçekleştirilecek.

<#827168730118750318> kanalına göz atmayı unutmayınız. <@&REGISTERROLID> sizinle ilgilenecektir.

Tagımızı (\`TAG\`) alarak bizlere destek olabilirsin! Kayıt olmak için teyit odalarına girip ses teyit vermen gerekiyor yetkililerimiz seninle ilgilenecektir! İyi eğlenceler.
  `)
});


 
client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
  const tag = ayarlar.tag
  const sunucu = ayarlar.sunucu
  const kanal = ayarlar.taglog
  const rol = ayarlar.tagrol

  try {
  if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`${newUser} adlı kullanıcı "${tag}" sembolünü kullanıcı adına ekleyerek ailemize katıldı.`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);
  }
  if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("RED").setDescription(`${newUser} adlı kullanıcı "${tag}" sembolünü kullanıcı adından kaldırarak ailemizden ayrıldı.`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);
  }
} catch (e) {
console.log(`Bir hata oluştu! ${e}`)
 }   
}
});
client.on("guildMemberAdd", member => {
  let sunucuid = ayarlar.sunucu;
  let tag = ayarlar.tag;
  let rol = ayarlar.tagrol
if(member.user.username.includes(tag)){
  member.roles.add(rol)
const tagalma = new Discord.MessageEmbed().setColor("GREEN").setDescription(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı!`).setTimestamp()
client.channels.cache.get(ayarlar.taglog).send(tagalma)
}
})



client.on('message', msg => {
  let tag = ayarlar.tag
  if (msg.content.toLowerCase() === 'tag') { 
    msg.channel.send(tag); 
  }
}); 
client.on('message', msg => {
  let tag = ayarlar.tag
  if (msg.content.toLowerCase() === '!tag') { 
    msg.channel.send(tag); 
  }
}); 
client.on('message', msg => {
  let tag = ayarlar.tag
  if (msg.content.toLowerCase() === '.tag') { 
    msg.channel.send(tag); 
  }
}); 
client.on('message', msg => {
  let tag = ayarlar.tag
  if (msg.content.toLowerCase() === '-tag') { 
    msg.channel.send(tag); 
  }
}); 
