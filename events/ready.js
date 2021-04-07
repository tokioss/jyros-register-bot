const ayarlar = require("../Settings/ayarlar.json");

module.exports = async client => {
  let voicechannel = ayarlar.voicechannel
 client.user.setPresence({ activity: { type: "WATCHING", name: `Developed by JyroS`}, status: 'online' })
  client.channels.cache.get(voicechannel).join();
  console.log(`[JYROS] - ${client.user.username} adı ile giriş yapıldı!`)
};

/*
status
kısmı için;

idle: Boşta,
dnd: Rahatsız Etmeyin,
online: Çevrimiçi
*/

/*
type
kısmı için;

PLAYING: Oynuyor,
WATCHING: İzliyor,
LISTENING: Dinliyor
*/
