const { Modal, TextInputComponent, showModal } = require('discord-modals')
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const settings = require("../../configs/sunucuayar.json");
const ayar = require("../../configs/settings.json");
const client = global.bot;

module.exports = {
  conf: {
    aliases: [],
    name: "giriş",
    help: "giriş",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args) => {


    const row = new MessageActionRow()
    .addComponents(
    new MessageButton()
    .setCustomId("kabul")
    .setLabel("Winx Kapılarının Açılması için Tıklat")
    .setStyle("SUCCESS")
    );

    await message.channel.send({ content: `
Merhaba! **${message.guild.name}**'ımıza hoş geldiniz! ;

Sunucumuz Sövüş/İfşa ve bir çok discord'un insanlara bıraktığı kötü alışkanlıklardan uzak bir privdir.
Güzel Arkadaşlıklar edinip eğlenceli etkinlikler, müzik, sohbet ve real fotolar paylaşıp rahat bir şekilde Discord'un hoş ortamının tadına varmak tek amacımızdır.

Tek kuralımız kötü alışkanlıklardan uzak durmanızdır. (Yoksa Uyarısız Banlanırsınız)
**Not:** Kötü alışkanlık sahibi insanlar sunucumuzdan belirlenip anında uzaklaştırılacaktır.
`, components: [row] })

  },
};

client.on('interactionCreate', async interaction => {

    if (interaction.customId === "kabul") {
    const modal = new Modal()
    .setCustomId('grs')
    .setTitle(`${client.guilds.cache.get(ayar.guildID).name} WELCOME`)
    .addComponents(
      new TextInputComponent()
      .setCustomId('isim')
      .setLabel('İsim yada Nickname ?')
      .setStyle('SHORT')
      .setMinLength(3)
      .setMaxLength(15)
      .setPlaceholder('Lütfen buraya yazın. / Örn: Oğuzhan yada Jaylen')
      .setRequired(true)
    );
    showModal(modal, { client, interaction });
}

});

client.on('modalSubmit', async (modal) => {
var LogChannel = client.guilds.cache.get(ayar.guildID).channels.cache.find((channel) => channel.id === settings.chatChannel);
if(modal.customId === 'grs') {
const reg = modal.getTextInputValue('isim'); 
if (reg) {
    modal.member.setNickname(`${reg}`);
    await modal.member.roles.add(settings.userRoles)
    await LogChannel.send({ content: `${modal.user} üyesi ${client.guilds.cache.get(ayar.guildID).name}'ımıza katıldı.`})      
    await modal.reply({ content: `Başarıyla ${client.guilds.cache.get(ayar.guildID).name}'a giriş yaptınız.`, ephemeral: true });
    }
}  
});