
const { Client } = require("discord.js");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const client = new Client();

const prefix = "" //prefix
const token = "" //bot token

client.on('ready', async () => {
 client.user.setActivity(`Yosemite YouTube Together`, { type:'PLAYING' })
});

const log = message => {
  console.log(` ${message}`);
};

client.on("message", async message => {
    if (message.author.bot || !message.guild) return;
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(" ");
    const cmd = args.shift().toLowerCase();

    if (cmd ==="play") {
    const channel = message.guild.channels.cache.get(args[0]);
     if (!channel || channel.type !== "voice") return message.channel.send(new Discord.MessageEmbed().setFooter("Yosemite").setAuthor(message.author.tag, message.author.avatarURL({dynamic: true, size: 1024})).setDescription(`Bir kanal id girmelisin. Örnek kullanım: \`${prefix}play <kanalid>\``).setColor("RANDOM"));

if (!channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")) return message.reply("davet oluştuma iznine ihtiyacım var");

        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "755600276941176913", //bu idye dokunursan bozulur Youtube Together idsi
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${client.token}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(invite => {
                message.channel.send(new Discord.MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true, size: 1024})).setColor("RANDOM").setDescription(`**${channel.name}** kanalında **YouTube** uygulamasını başlatmak için [buraya](<https://discord.gg/${invite.code}>) tıklamalısın.`).setFooter("Yosemite"));
            }).catch(e => { message.channel.send(`**YouTube Together** Başlatılamadı! | Hata Kodu: ${e}`); })
    }
});

client.login(token).then(c => console.log(`${client.user.tag} olarak giriş yapıldı!`)).catch(err => console.error("Bota giriş yapılırken başarısız olundu!"));

