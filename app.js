const { Client, Intents } = require('discord.js');
const fs = require('fs');

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    // Add more intents as needed for your bot
  ],
});

const linkExpirationTime = 0 * 1 * 60 * 1000; // 24 hours in milliseconds

client.on('message', async (message) => {
  if (message.channel.id === '1179704600857686077') {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = message.content.match(urlRegex);

    if (urls) {
      console.log(`[${message.author.tag}] ${message.content}`);
      
      const htmlLinks = urls.map((url) => `<a href="${url}">Click me For New Con</a>`).join('<br>');
      
      fs.appendFile('index.html', `<p>[${message.author.tag}] ${htmlLinks}</p>\n`, (err) => {
        if (err) {
          console.error(err);
        }
      });
      
      // Delete the message after a certain period of time
      setTimeout(async () => {
        try {
          await message.delete();
          console.log(`Deleted message with links from ${message.author.tag}`);
        } catch (error) {
          console.error(`Failed to delete message: ${error}`);
        }
      }, linkExpirationTime);
    }
  }
});

client.login('OTEzMzU3NzQ1NDIyNDk1NzU0.GW_V0E._8nq4aCeu9TJNkT37ySj_noNp5OMbW7JYczPrU');
