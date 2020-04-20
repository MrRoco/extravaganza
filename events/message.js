require("dotenv").config()
const Discord = require("discord.js")
const alphaSort = require('alpha-sort');
 kick = require("../commands/kick")
module.exports = (client, message) => {
    if (message.content.startsWith("ping")) {
        return message.reply('pong')
    }

    if (message.content.startsWith("pong")) {
        return message.reply('ping')
    }

    if (message.content === '!commands') {
        return message.reply('\n' + process.env.COMMANDS)
    }

    if (message.content === '!tournament' || message.content === '!rules' || message.content === '!1v1'){
        return message.reply('\n' +process.env.RULES).then(() => message.reply('\n' +process.env.RULES2))
    }

    if (message.content === '!promo') {
        return message.reply('\n' +process.env.PROMO)
    }

    if (message.content === '!casters' || message.content === '!twitch' || message.content === '!stream') {
        return message.reply('\n' +process.env.CASTERS)
    }

    if (message.content === '!leaderboard') {
        return message.reply('\n https://challonge.com/1v1EVII')
    }

    if (message.content) {
        const roleID = "701881535757942814";
        const membersWithRole = message.guild.roles.cache.get(roleID).members
        const memberSize = membersWithRole.size;
        const players = membersWithRole.map(member => {
            return member.user.username;
        }).sort((a, b) => a.localeCompare(b, undefined, {sensitivity: 'base'}));

        // inside a command, event listener, etc.
        const embed = new Discord.MessageEmbed()
            .setColor('#0xFFFF')
            .setTitle('Players total: ' + memberSize)
            .setDescription(players.join("\n"))
            .setTimestamp();

        return message.channel.send({embed});
    }

    if (message.content.startsWith("!ruffle")) {
        const types = process.env.CLASSES.split(',')
        const maps  = process.env.MAPS.split(',')
        const type  = types[Math.floor(Math.random() * types.length)];
        const map   = maps[Math.floor(Math.random() * maps.length)];

        return message.reply(
            '\n' + `The next round will be played with ${type} on the next map: ${map}`
        )
    }
}