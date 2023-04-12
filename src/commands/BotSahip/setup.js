const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js");
const allah = require("../../configs/settings.json");
const { Database } = require("ark.db");
const ozisetupxd = new Database("/src/configs/sunucuayar.json");
const ayar = require("../../configs/sunucuayar.json");

module.exports = {
  conf: {
    aliases: ["kur","setup"],
    name: "setup",
    help: "setup",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args) => {

    let choose = args[0]

const row = new MessageActionRow()
.addComponents(
new MessageSelectMenu()
.setCustomId('select')
.setPlaceholder('Bot Kurulum bilgilendirme için tıklayınız')
.addOptions([
  { label: 'Bot Kurulum Bilgilendirme', description: 'Bot kurulum komutları hakkında bilgi almanızı sağlar.', value: 'help' },
  { label: 'Bot Kurulum Liste', description: 'Bot kurulum listesindeki kayıtlı verileri gösterir.', value: 'help2' },
]),
);
    
const row2 = new MessageActionRow()
.addComponents(
new MessageSelectMenu()
.setCustomId('select2')
.setPlaceholder('Bot Kurulum komutları için tıklayınız')
.addOptions([
  { label: 'Kurulum Bilgilendirme', description: 'Sunucu kurulum komutları hakkında bilgi almanızı sağlar.', value: 'Server' },
  { label: 'Veri Yenileme', description: 'Sunucu kurulumunuz bittikten sonra verileri dataya günceller.', value: 'Restart' },
]),
);

const row3 = new MessageActionRow()
.addComponents(
new MessageSelectMenu()
.setCustomId('select3')
.setPlaceholder('Bot Kurulum Verileri için tıklayınız')
.addOptions([
  { label: 'Veri Bilgilendirme', description: 'Sunucu kurulum verilerinden kurulanları görüntülersiniz.', value: 'Server2' },
  { label: 'Veri Yenileme', description: 'Sunucu verilerinizi en son kurduğunuz haline günceller.', value: 'Restart2' },
]),
);

if(!choose) {
await message.reply({ content: `Botun kurulumu hakkında bilgi almak için aşağıdaki menüyü kullanınız.`, components: [row] });
}

const embed = new MessageEmbed().setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
.setDescription(`${message.author.toString()}, **${message.guild.name}** sunucususu içerisinde <t:${Math.floor(Date.now() / 1000)}:R>'den itibaren sunucu kurulum komutları hakkında bilgilendirme almak için aşağıdaki menüyü kullanabilirsiniz.`)
.setFooter({
text: `Veri Yenileme ile kurulum verilerinizi datadan güncellemeyi unutmayınız.`,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})

const embed2 = new MessageEmbed().setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
.setDescription(`${message.author.toString()}, **${message.guild.name}** sunucususu içerisinde <t:${Math.floor(Date.now() / 1000)}:R>'den itibaren sunucuda kurulumu gerçekleşmiş olan veriler hakkında bilgilendirme almak için aşağıdaki menüyü kullanabilirsiniz.`)
.setFooter({
text: `Veri Yenileme ile kurulum verilerinizi datadan güncellemeyi unutmayınız.`,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})

const filter = i => i.user.id == message.author.id    
    let collector = await message.channel.createMessageComponentCollector({ filter, componentType: 'SELECT_MENU', max: 5, time: 120000 })
    collector.on("collect", async (interaction) => {

if (interaction.values[0] === "Server") {
const sunucu = new MessageEmbed()
.setDescription(`${message.author.toString()}, ${message.guild.name} sunucusu içerisinde Aşağıdaki listeden kurulum komutlarının kullanımını görüntülüyebilirsiniz.

\`\`\`diff\n- KURULUM AYARLARI -\`\`\`
!kur sahipRole \`<Örnek: @Owner >\`
!kur userRole \`<Örnek: @People >\`
!kur banHammer \`<Örnek: @Administrator >\`
!kur boosterRole \`<Örnek: @Booster >\`
!kur chatChannel \`<Örnek: #chat >\`
!kur welcomeChannel \`<Örnek: #rules, #welcome >\`
!kur inviteChannel \`<Örnek: #invite-log >\`
!kur banLogChannel \`<Örnek: #ban-log >\`
!kur cezapuanlog \`<Örnek: #ceza-puan-log >\`
!kur medyaKanalları \`<Örnek: (#edit, #afiş) ID >\`
`)
.setFooter({
text: message.author.tag,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})
      await interaction.reply({ embeds: [sunucu], components: [], ephemeral: true }).catch({});
}

if (interaction.values[0] === "Restart") {
    await interaction.reply({ content: `Sunucu Kurulum Verileri Güncelleniyor ve __**Bot**__ yeniden başlatılıyor!`, components: [], ephemeral: true }).catch({});
    process.exit(0)
    }
})

    let collector2 = await message.channel.createMessageComponentCollector({ filter, componentType: 'SELECT_MENU', max: 5, time: 120000 })
    collector2.on("collect", async (interaction) => {

if (interaction.values[0] === "Server2") {
const embed = new MessageEmbed()
.setDescription(`${message.author.toString()}, ${message.guild.name} sunucusu içerisinde Aşağıdaki listeden bota kurulmuş veya kurulmamış Sunucu ayarları verilerini görüntülüyebilirsiniz.

\`\`\`diff\n- KURULUM VERİLERİ -\`\`\`
Bot-Owner: (${allah.owners.length > 0 ? `${allah.owners.map(x => `<@${x}>`).join(",")}` : "\`YOK\`"})
Sahip Roles: (${ayar.sahipRolu.length > 0 ? `${ayar.sahipRolu.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
User Role: (${ayar.userRoles.length > 0 ? `${ayar.userRoles.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Ban Hammer Role: (${ayar.banHammer.length > 0 ? `${ayar.banHammer.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Booster Role: (${ayar.boosterRolu ? `<@&${ayar.boosterRolu}>` : "\`YOK\`"})
Chat Channel: (${ayar.chatChannel.length ? `<#${ayar.chatChannel}>` : "\`YOK\`"})
Welcome Channel: (${ayar.teyitKanali.length ? `<#${ayar.teyitKanali}>` : "\`YOK\`"})
Invite Channel: (${ayar.invLogChannel.length ? `<#${ayar.invLogChannel}>` : "\`YOK\`"})
Ban Log Channel: (${ayar.banLogChannel.length ? `<#${ayar.banLogChannel}>` : "\`YOK\`"})
Ceza-Puan Log Channel: (${ayar.cezapuanlog.length ? `<#${ayar.cezapuanlog}>` : "\`YOK\`"})
Media Channels: (** ${ayar.medyaKanalları.length > 0 ? `${ayar.medyaKanalları.map(x => `<#${x}>`).join(",")}` : "\`YOK\`"} **)
`)
.setFooter({
text: message.author.tag,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})
      await interaction.reply({ embeds: [embed], components: [], ephemeral: true }).catch({});
}

if (interaction.values[0] === "Restart2") {
      await interaction.reply({ content: `Sunucu Kurulum Verileri Güncelleniyor ve __**Bot**__ yeniden başlatılıyor!`, components: [], ephemeral: true }).catch({});
      process.exit(0)
    }
})

    const collector3 = message.channel.createMessageComponentCollector({ filter, componentType: 'SELECT_MENU', max: 2, time: 120000 });
    collector3.on("collect", async (interaction) => {
   
        if (interaction.values[0] === "help") {
            await interaction.reply({ embeds: [embed], components: [row2], ephemeral: true }).catch({});
          }
          if (interaction.values[0] === "help2") {
            await interaction.reply({ embeds: [embed2], components: [row3], ephemeral: true }).catch({});
          }
    
        });



/////

const setup1 = [
  { name: ["üyerol","userrole","userRole","userRoles"], conf: "userRoles", cmdName: "Kayıtsız Rol(leri)" },
  { name: ["sahiprol","sahiprole","sahipRole","sahipRoles"], conf: "sahipRolu", cmdName: "Sahip Rol(leri)" },
  { name: ["banHammer","banhammer","banh"], conf: "banHammer", cmdName: "Ban Hammer" },
]

const setup2 = [
  { name: ["boosterrol","boosterrole","boosterRole","boosterRoles"], conf: "boosterRolu", cmdName: "Booster Rol" },
]

const setup3 = [
  { name: ["chat","genelchat","chatChannel","chatchannel"], conf: "chatChannel", cmdName: "Chat Kanal" },
  { name: ["welcome","register","welcomechannel","welcomeChannel"], conf: "teyitKanali", cmdName: "Hoşgeldin Kanal" },
  { name: ["invite","invitekanal","inviteChannel","invitechannel"], conf: "invLogChannel", cmdName: "İnvite Kanal" },
  { name: ["bankanal","banlog","banLogChannel","banlogchannel"], conf: "banLogChannel", cmdName: "Ban Log Kanal" },
  { name: ["cezapuankanal","cezapuanlog","cezapuanLogChannel","cezapuanlogchannel"], conf: "cezapuanlog", cmdName: "Ceza Puan Log Kanal" },
]
 
const setup4 = [
  { name: ["mediaChannels","mediachannel","medyakanalları","medyaKanalları"], conf: "medyaKanalları", cmdName: "Medya Kanalları" },
]

setup1.forEach(async (x) => {
  if(x.name.some(x => x === choose)) {
  let rol;
  if (message.mentions.roles.size >= 1) {
    rol = message.mentions.roles.map(r => r.id);
  }
  let db = ozisetupxd.get(`${x.conf}`)
  if(rol) {
  if(db.some(ozi => ozi.includes(rol.id))) {
  ozisetupxd.pull(`${x.conf}`, `${rol.map(x => x)}`)
  message.reply({ content: `${rol.map(x => `<@&${x}>`)} ${x.cmdName} listesinden başarıyla kaldırıldı.`, ephemeral: true })
  } else {
  let xd = []
  rol.map(x => 
  xd.push(`${x}`)
  )
  ozisetupxd.set(`${x.conf}`, xd)
  message.reply({ content: `${rol.map(x => `<@&${x}>`)} ${x.cmdName} listesine başarıyla eklendi.`, ephemeral: true })
  }
  } else if (!rol) {
  message.reply({ content: `Sunucu ${x.cmdName} belirtmelisin`, ephemeral: true });
  return }
  };
});
   
setup2.forEach(async (x) => {
  if(x.name.some(x => x === choose)) {
  let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]) || message.guild.roles.cache.find(ozi => ozi.name === args.join(" "))
  if (rol) {
  ozisetupxd.set(`${x.conf}`, `${rol.id}`)
  message.reply({ content: `${rol} ${x.cmdName} listesine başarıyla eklendi.`, ephemeral: true })
  } else if (!rol) {
  message.reply({ content: `Sunucu ${x.cmdName} belirtmelisin`, ephemeral: true });
  return }
};
});

setup3.forEach(async (x) => {
  if(x.name.some(x => x === choose)) {
  let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2]) || message.guild.channels.cache.find(ozi => ozi.name === args.join(" "))
  if (channel) {
  ozisetupxd.set(`${x.conf}`, `${channel.id}`)
  message.reply({ content: `<#${channel.id}> ${x.cmdName} listesine başarıyla eklendi.`, ephemeral: true })
  } else if (!channel) {
  message.reply({ content: `Sunucu ${x.cmdName} belirtmelisin`, ephemeral: true });
  return }
  };
});

setup4.forEach(async (x) => {
  if(x.name.some(x => x === choose)) {
  let kanal;
  if (args.length >= 1) {
    kanal = args
    .filter((id) => message.guild.channels.cache.has(id))
    .map((id) => message.guild.channels.cache.get(id));
  }
  let db = ozisetupxd.get(`${x.conf}`)
  if(kanal) {
  if(db.some(ozi => ozi.includes(kanal.id))) {
  ozisetupxd.pull(`${x.conf}`, `${kanal.map(x => x)}`)
  message.reply({ content: `**${kanal.map(x => `${x}`)}** ${x.cmdName} listesinden başarıyla kaldırıldı.`, ephemeral: true })
  } else {
  let xd = []
  kanal.map(x => 
  xd.push(`${x.id}`)
  )
  ozisetupxd.set(`${x.conf}`, xd)
  message.reply({ content: `**${kanal.map(x => `${x}`)}** ${x.cmdName} listesine başarıyla eklendi.`, ephemeral: true })
  }
  } else if (!kanal) {
  message.reply({ content: `Sunucu **${x.cmdName}** belirtmelisin`, ephemeral: true });
  return }
  };
});
  }
};