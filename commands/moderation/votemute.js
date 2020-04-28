const { muteRole, vote_mute_timeout , vote_mute_threshold } = require('../../server.json');
const { isHelper, logEvent } = require('../../helpers');

const { RichEmbed } = require('discord.js');
module.exports = {
    name: 'votemute',
    category: 'moderation',
    description: 'Mute the tagged member indefinitely XD',
    usage: '-votemute @mention',
    run: async (client, message, args) => {
        if (isHelper(message)){
            let target = message.mentions.members.first() || message.guild.members.get(args[0]);

            if (!target){
                return message.reply("Person not found, please use a proper mention.").then(m => m.delete(10000));
            }
            //if (target.permissions.has("BAN_MEMBERS")||target.user.bot){
            //    return message.reply("User can not be reported, please contact server staff or owner.")
            //}
            if (message.author=='369666374488031232'){
                message.channel.send("Bro why you gotta do dis? Ping ayham").then(m => m.delete(10000));
            }

            let title = `Mute User ${target.user.displayName}`;
            let author = message.member.displayName;
            let options = ['yes','no'];
            let emojiList = [`✅`];
            let timeout = vote_mute_timeout;
            let text = `To vote, react using the corresponding emoji.\nThe voting will end in ${timeout} seconds.\n`;

            const emojiInfo = {};
	        for (const option of options) {
		        const emoji = emojiList.splice(0, 1);
		        emojiInfo[emoji] = { option: option, votes: 0 };
		        text += `${emoji} : \`${option}\`\n\n`;
	        }
            const usedEmojis = Object.keys(emojiInfo);
            
            const embed =new RichEmbed()
                .setTitle(`${title}`)
                .setFooter(`Poll created by ${author}`)
                .setDescription(text);

            const poll = await message.channel.send(embed);
            for (const emoji of usedEmojis) await poll.react(emoji);

            const reactionCollector = poll.createReactionCollector(
                (reaction, user) => usedEmojis.includes(reaction.emoji.name) && !user.bot,
                timeout === 0 ? {} : { time: timeout * 1000 }
            );
            const voterInfo = new Map();
            reactionCollector.on('collect', (reaction, user) => {
                if (usedEmojis.includes(reaction.emoji.name)) {
                    if (!voterInfo.has(user.id)) voterInfo.set(user.id, { emoji: reaction.emoji.name });
                    const votedEmoji = voterInfo.get(user.id).emoji;
                    if (votedEmoji !== reaction.emoji.name) {
                        const lastVote = poll.reactions.get(votedEmoji);
                        lastVote.count -= 1;
                        lastVote.users.remove(user.id);
                        emojiInfo[votedEmoji].votes -= 1;
                        voterInfo.set(user.id, { emoji: reaction.emoji.name });
                    }
                    emojiInfo[reaction.emoji.name].votes += 1;
                }
            });
            reactionCollector.on('dispose', (reaction, user) => {
                if (usedEmojis.includes(reaction.emoji.name)) {
                    voterInfo.delete(user.id);
                    emojiInfo[reaction.emoji.name].votes -= 1;
                }
            });
        
            reactionCollector.on('end', () => {
                text = 'Time\'s up!\n The council has decided your fate,*\n\n';
                for (const emoji in emojiInfo) text += `\`${emojiInfo[emoji].option}\` - \`${emojiInfo[emoji].votes}\`\n\n`;
                poll.delete();
                const embed = new RichEmbed()
                                .setTitle(`Poll - ${title}`)
                                .setFooter(`Poll created by ${author}`)
                                .setDescription(text);
                message.channel.send(embed);
            });

            let reason='N/A';
            if (args[1]){
                reason = args[1];
            }
            console.log(emojiInfo);
            const tick = '%E2%9C%85';
            if (emojiInfo[Object.keys(emojiInfo)[0]].votes>vote_mute_threshold){
                let role = message.guild.roles.find(r => r.name === muteRole);
                target.addRole(role).catch(console.error);
                logEvent(message, target, reason, "mute");
                const embed = new RichEmbed()
                                .setTitle(`Poll - ${title}`)
                                .setFooter(`Poll created by ${author}`)
                                .setDescription(`Muted User: ${target}`);
                message.channel.send(embed);
            }
            else {
                const embed = new RichEmbed()
                .setTitle(`Couldn't ${title}`)
                .setFooter(`Poll created by ${author}`)
                .setDescription(`Not enough votes`);
                return message.channel.send(embed);
            }
        }
        else {
            message.reply("You are not authorized to perform this action. Incident logged.");
        }
    }
}