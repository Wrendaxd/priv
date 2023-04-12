const { Database } = require("ark.db");
const db = new Database("/src/configs/emojis.json");
const { MessageActionRow, MessageButton } = require("discord.js");
const allah = require("../../configs/settings.json");

module.exports = {
  conf: {
    aliases: [],
    name: "kurulum",
    help: "kurulum",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args) => {

    if (message.guild === null) {
      return message.reply({ content: `Bu komutu sadece Sunucuda kullanabilirsin!`, ephemeral: true })
    } else if (!allah.owners.includes(message.author.id)) {
      return message.reply({ content: ":x: Bot developerı olmadığın için kurulumu yapamazsın.", ephemeral: true })
    } else {

          const emojis = [
            { name: "kotu", url: "https://cdn.discordapp.com/emojis/1059764368990031912.webp?size=96&quality=lossless" },
            { name: "guzel", url: "https://cdn.discordapp.com/emojis/1059764383854628964.webp?size=96&quality=lossless" },
            { name: "red", url: "https://cdn.discordapp.com/emojis/926234303984201769.webp?size=96&quality=lossless" },
            { name: "green", url: "https://cdn.discordapp.com/emojis/926234314151170100.webp?size=96&quality=lossless" },
            { name: "kirmiziok", url: "https://cdn.discordapp.com/emojis/901441275381817426.gif?size=44" },
            { name: "altin", url: "https://cdn.discordapp.com/emojis/836694825243508756.gif?v=1" },
            { name: "altin2", url: "https://cdn.discordapp.com/emojis/836694821128372224.gif?v=1" },
            { name: "slotgif", url: "https://cdn.discordapp.com/emojis/931686726567612426.gif?v=1" },
            { name: "slotpatlican", url: "https://cdn.discordapp.com/emojis/931686717902192660.png?size=44" },
            { name: "slotkiraz", url: "https://cdn.discordapp.com/emojis/931686708037185546.png?size=44" },
            { name: "slotkalp", url: "https://cdn.discordapp.com/emojis/931686698138603610.png?size=44" },
        ]

          emojis.forEach(async (x) => {
              if (message.guild.emojis.cache.find((e) => x.name === e.name)) return db.set(x.name, message.guild.emojis.cache.find((e) => x.name === e.name).toString());
              const emoji = await message.guild.emojis.create(x.url, x.name);
              await db.set(x.name, emoji.toString()); 
              message.channel.send({ content: `\`${x.name}\` isimli emoji oluşturuldu! (${emoji.toString()})`, ephemeral: true })

            })

    }
  },
};