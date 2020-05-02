const { muteRole, vote_mute_timeout , vote_mute_threshold } = require('../../server.json');
const { isHelper, logEvent, isVoteEligible } = require('../../helpers');

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
            if (target.permissions.has("BAN_MEMBERS")||target.user.bot){
                return message.reply("User can not be reported, please contact server staff or owner.")
            }
            /*if (message.author=='369666374488031232'){
                message.channel.send("Bro why you gotta do dis? Ping ayham").then(m => m.delete(10000));
            }*/

            let title = `Mute User ${target.displayName}`;
            let author = message.member.displayName;

            let vote = {'yes' : '✅'};

            let timeout = vote_mute_timeout;
            let text = `To vote, react with the following emoji within next ${timeout} seconds.\n`;
            
            const embed =new RichEmbed()
                .setTitle(`${title}`)
                .setFooter(`Vote called by ${author}`)
                .setDescription(text);

            const poll = await message.channel.send(embed);
            await poll.react(vote.yes);

            const reactionCollector = poll.createReactionCollector(
                (reaction, user) => (vote.yes === reaction.emoji.name) && !user.bot && isVoteEligible(message, user.id),
                timeout === 0 ? {} : { time: timeout * 1000 }
            );
            const voterInfo = new Map();
            reactionCollector.on('collect', (reaction, user) => {
                if (reaction.emoji.name === vote.yes) {
                    if (!voterInfo.has(user.id)) voterInfo.set(user.id, { emoji: reaction.emoji.name });

                    const votedEmoji = voterInfo.get(user.id).emoji;
                    if (votedEmoji !== reaction.emoji.name) {
                        //const lastVote = poll.reactions.get(votedEmoji);
                        //lastVote.count -= 1;
                        //lastVote.users.remove(user.id);

                        voterInfo.set(user.id, { emoji: reaction.emoji.name });
                    }
                    console.log(reaction.emoji.name === vote.yes);
                }
            });
            reactionCollector.on('remove', (reaction, user) => {
                if (reaction.emoji.name === vote.yes) {
                    voterInfo.delete(user.id);
                }
            });
        
            reactionCollector.on('end', () => {
                let votes = voterInfo.size;

                poll.delete();
                if (votes>=vote_mute_threshold){
                    let reason='N/A';
                    if (args[1]){
                        reason = args[1];
                    }
                    let role = message.guild.roles.find(r => r.name === muteRole);
                    target.addRole(role).catch(console.error);
                    logEvent(message, target, reason, "mute");
                    const embed = new RichEmbed()
                                    .setTitle(`Votemute: ${target.displayName}`)
                                    .setFooter(`Poll created by ${author}`)
                                    .setDescription(`Muted User: ${target}`);
                    return message.channel.send(embed);
                }
                else {
                    const embed = new RichEmbed()
                                    .setTitle(`Couldn't ${title}`)
                                    .setFooter(`Poll created by ${author}`)
                                    .setDescription(`Not enough votes`);
                    return message.channel.send(embed);
                }
            });
        }
        else {
            message.reply("You are not authorized to perform this action. Incident logged.");
        }
    }
}