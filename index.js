import DiscordJS, { Client, Intents } from 'discord.js'
import dotenv from 'dotenv'
import axios from 'axios'
dotenv.config();

const myIntents = new Intents();
myIntents.add('GUILDS', 'GUILD_MESSAGES');
const client = new Client({ intents: myIntents });
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log('Your Bot is now Online.');
  client.user.setActivity('Kanye Bot | k?help');
});

client.on('messageCreate', (message) => {
  if (message.content === 'k?help') {
    message.reply({
      content: 'Thank you for using the Kanye Quote Bot! :sunglasses: \n-----------------------------------------------\nk?quote | Will generate a random Kanye quote\nk?wiki | Will give you a link to Kanye\'s wiki page\nk?spotify | Gives you a link to Kanye\'s spotify\nHave fun! :flushed: \n-----------------------------------------------',
    });
  } else if (message.content === 'k?quote') {
    axios
    .get('https://api.kanye.rest/')
    .then(res => {
      message.reply({
        content: 'Kanye quote: ' + res['data']['quote'],
      });
    })
    .catch(error => {
        console.error(error);
    });
  } else if (message.content === 'k?wiki') {
    let wiki = 'https://en.wikipedia.org/wiki/Kanye_West';
    message.reply({
      content: wiki,
    })
  } else if (message.content === 'k?spotify') {
    let spot = 'https://open.spotify.com/artist/5K4W6rqBFWDnAN6FQUkS6x';
    message.reply({
      content: spot,
    })
  }
});

client.login(process.env.TOKEN); 

