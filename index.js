const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');
const dotenv = require('dotenv');

// const img = require('./a.png');
dotenv.config();
client.on('ready', () => {
	console.log('I am ready!');
});

let stat = false;
const ff = async ({ message }) => {};
axios
	.get('https://blockchain.info/tobtc?currency=INR&value=1')
	.then((c) => console.log(c.data));
client.on('message', async (message) => {
	if (message.channel.name === 'd-o-g-e')
		if (message.content.startsWith('*doge')) {
			if (!stat) {
				// stat = true;

				setInterval(async function () {
					try {
						const p = await axios.get(
							'https://sochain.com/api/v2/get_price/DOGE/BTC'
						);
						const ap = p.data.data.prices[0].price;
						const b = await axios.get(
							'https://blockchain.info/tobtc?currency=INR&value=1'
						);
						const bb = b.data;
						const inr = ap / bb;
						console.log(ap, bb, inr);
						const exampleEmbed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle(`Doge is at ${inr + 3}₹`)

							.setImage(
								'https://www.telegraph.co.uk/content/dam/technology/2021/01/28/Screenshot-2021-01-28-at-13-20-35_trans_NvBQzQNjv4BqEGKV9LrAqQtLUTT1Z0gJNRFI0o2dlzyIcL3Nvd0Rwgc.png'
							);

						message.channel.send(exampleEmbed);
					} catch (err) {
						stat = false;
						console.error(err);
					}
				}, 5000);
			}
		}
});
console.log(process.env.doge);
client.login(process.env.doge);
