const { CronJob } = require("cron");
const client = global.bot;
const conf = require("../configs/settings.json")
const ayar = require("../configs/sunucuayar.json")

module.exports = () => {

const daily = new CronJob("0 0 * * *", () => {
  client.guilds.cache.get(conf.guildID).channels.cache.get(ayar.chatChannel).send({ content: `Saat 00:00 Güzel Dilek Tutmayı Unutmayın... @here`})
  }, null, true, "Europe/Istanbul");
  daily.start();
};

module.exports.conf = {
  name: "ready"
};
