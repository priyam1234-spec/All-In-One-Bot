const Discord = require('discord.js');
const { AME_API } = require('../../config.json');
const AmeClient = require('amethyste-api');
const AmeAPI = new AmeClient(AME_API)

module.exports = {
    config: {
        name: "gay",
        aliases: ['gayimg'],
        category: "images",
        description: "Shows A Gay Image",
        usage: "[username | nickname | mention | ID] (optional)",
    },
    run: async (bot, message, args) => {

        let user = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
        let m = await message.channel.send("**Please Wait...**");
        let buffer = await AmeAPI.generate("gay", { url: user.user.displayAvatarURL({ format: "png", size: 512 }) });
        let attachment = new Discord.MessageAttachment(buffer, "gay.png");
        m.delete({ timeout: 5000 });
        message.channel.send(attachment);
    }
};