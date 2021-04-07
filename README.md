# JyroS Register Bot

## Komutlar

- **Erkek** ve **Kadın** kayıt
- `Eski isimleri` görüntüleme
- **En fazla kayıt eden** yetkilileri listelemek
- **Kayıt ettiğin kişileri** görüntülemek
- **İsim değiştirme** 
- Kayıt olduktan sonra **Log kanalına bilgilendirme mesajı** gönderir
- Kayıt olan kullanıcıya **özel mesaj** gönderir



## Kurulum

1. Sisteminde `node.js` kurulu olmak zorundadır.
2. Botun dosyasını CMD veya Powershell ile aç.
3. Bütün modülleri yükle. (`npm i`)
4. `./Settings/ayarlar.json` dosyasını düzenle.
5. Kurulum tamamlandı!


## Ayarlar.json Information

{

  "sunucu" : "", // Sunucunuzun İd'si
  "footer":"Developed by JyroS", // Alt Bilgi
  "voicechannel":"", // Botun bağlanacağı ses kanalının İd'si
  
  "kayıtkanal": "", // Kayıt kanalının İd'si Örn: register-chat
  "log": "", // Kayıt günlüğü kanalının İd'si
  "taglog":"", // Tag günlüğü kanalının İd'si

  "tag" : "", // Tagınız (Sunucunuzun sembolü)

  "tagrol":[""], // Tag alan kullanıcılara verilen rolün İd'si
  "vip":[""], // Özel üye rolünün İd'si
  "kız": [""], // Kız rolünün İd'si
  "erkek": [""], // Erkek rolünün İd'si
  "kayıtsız": [""], // Kayıtsız rolünün İd'si

  "yetkili": [""], // Yetkili rolünün İd'si Örn: Register, Kayıt Sorumlusu
  "moderator":[""], // Üst yetkili rolünün İd'si (İsim değiştirme ve teyit sıfırlama komutları için kullanılır. İsterseniz tekrar kayıt sorumlusunun rolünü etiketleyebilirsiniz.)
  
  "yesemoji":"", // Onay Emojisi
  "noemoji":"" // Ret Emojisi
  
}



Proje ile ilgili herhangi bir sorun ile karşılaştığınızda bana Discord veya Instagram'dan Ulaşabilirsiniz.

<p align="center">
 <a href="https://discord.com/users/325134650630471680" target"blank_"><img src="https://img.shields.io/badge/Discord%20-7289DA.svg?&style=for-the-badge&logo=discord&logoColor=white"></a>
 <a href="https://www.instagram.com/jyros1/" target"blank_"><img src="https://img.shields.io/badge/INSTAGRAM%20-DC3175.svg?&style=for-the-badge&logo=instagram&logoColor=white"></a>
