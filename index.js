const express = require('express');
const Discord = require('discord.js-selfbot-v13');

const app = express();
const port = process.env.PORT || 3000;

const client = new Discord.Client();

const Authorization_Token = process.env.Authorization_Token;
const Webhook_ID = process.env.Webhook_ID;
const Webhook_Token = process.env.Webhook_Token;

let Webhook_Support = true; // Variable to control webhook enable/disable

client.on('ready', async () => {
  console.clear();
  console.log(`ZenithRPC has connected to Discord Client: ${client.user.tag}`);

  const sendWebhookMessage = () => {
    if (Webhook_Support) {
      const embed = new Discord.MessageEmbed()
        .setColor('#545759')
        .setTitle('ZenithRPC | Webhook Logs')
        .setDescription('Our recent update has included "Render.com" hosting with our old functionalities.')
        .addField('Discord Client:', client.user.tag, true)
        .addField('Client Uptime:', calculateUptime(), true)
        .setThumbnail("https://media.discordapp.net/attachments/1206955445940658287/1223021688971591770/zenith-grey.png?ex=661856b5&is=6605e1b5&hm=0c0699c469634dda8ce20ceb6d31d5cfd8e62005aafe78acae73edae47a3b530&=&format=webp&quality=lossless&width=600&height=450")
        .setFooter('・Developer: zensware   ', client.user.displayAvatarURL())
        .setTimestamp();

      const webhookClient = new Discord.WebhookClient({ id: Webhook_ID, token: Webhook_Token });
      webhookClient.send({ embeds: [embed] })
        .then(() => {
          console.log('Embed sent successfully!');
        })
        .catch(console.error);
    }
  };

  const calculateUptime = () => {
    const currentTime = Date.now();
    const uptime = currentTime - client.readyAt;
    const formattedUptime = formatMilliseconds(uptime);
    return formattedUptime;
  };
  
  const formatMilliseconds = (milliseconds) => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  };

  const updatePresenceAndActivity = () => {
    sendWebhookMessage();
    const r = new Discord.RichPresence()
      .setApplicationId('1') // Please replace all values to your own. If it seems to say null then you could easily replace it with 'text/image-value' 
      .setType('STREAMING') // Playing, Streaming, Watching, Listening, Competing 
      .setURL('https://www.youtube.com/watch?v=4yFiBhNIWYo')
      .setState('✧˚ · . ᴀᴄᴛɪᴠᴇ 𝟸𝟺/𝟽')
      .setName(' ')
      .setDetails('`≡;- ꒰ ° ᴋᴇʀᴇᴍᴍ ꒱ 💙')
      .setStartTimestamp(Date.now())
      .setAssetsLargeImage('https://media.discordapp.net/attachments/1097132368441122879/1262994897095495690/c06cd2a398e8d28150d503bb004649e3.jpg?ex=66989f28&is=66974da8&hm=1ce16680d6c5845cb0f07c50535549d8a7019c3196bb1bd074d67c8e67a959d5&')
      .setAssetsLargeText(''･ﾟ✧*:･ﾟ  ᴅᴏ ɴᴏᴛ ᴅɪsᴛᴜʀʙ')
      .setAssetsSmallImage('')
      .setAssetsSmallText('')
    client.user.setActivity(r);
  };

  updatePresenceAndActivity();
  setInterval(updatePresenceAndActivity, 30000);
  client.user.setPresence({ status: "idle" });
});

client.login(Authorization_Token);

app.get('/', (req, res) => {
  res.send('ZenithRPC is running!');
});

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});
