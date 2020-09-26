const { muteRole, vote_mute_timeout , vote_mute_threshold } = require('../../server.json');
const { authorIsHelper, logEvent, isVoteEligible, isAdmin } = require('../../helpers');

const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'votemute',
    category: 'moderation',
    description: 'Mute the tagged member indefinitely after getting votes from regular members.',
    usage: `**Requires Minimal Privilege**\`\`\`votemute @user\`\`\``,
    run: async (client, message, args) => {
        if (authorIsHelper(message)){
            let target = message.mentions.members.first() || message.guild.members.get(args[0]);
            if (!target){
                return message.reply("Person not found, please use a proper mention.").then(m => m.delete(10000));
            }
            if (isAdmin(target)||target.user.bot){
                const senate = new MessageEmbed()
                                .setColor("#FFFF00")
                                .setTitle('**Error:** Member Can Not Be Silenced')
                                .setDescription("\`\`\`Please reconsider your life choices.\`\`\`")
                                .setTimestamp();
                return message.channel.send(senate);
            }
            

            let title = `Mute User ${target.displayName}`;
            let author = message.member.displayName;
            let votes = 0;
            let vote = '✅';
            let timeout = vote_mute_timeout;
            let text = `To vote, react with the following emoji within next ${timeout} seconds.\n`;
            
            const embed =new MessageEmbed()
                .setTitle(`${title}`)
                .setFooter(`Vote called by ${author}`)
                .setDescription(text);

            const poll = await message.channel.send(embed);
            await poll.react(vote);
            //(vote === reaction._emoji.name) && !user.bot  && isVoteEligible(message, user) && 
            const reactionCollector = poll.createReactionCollector(
                (reaction, user) => (reaction._emoji.name==vote) && !user.bot && isVoteEligible(message, user),
                timeout === 0 ? {} : { time: timeout*1000 });
        
            reactionCollector.on('end', collected => {
                votes = collected.get(vote).count;
                if (votes>0)
                    votes-=1;
                console.log(votes);
                poll.delete();
                if (votes>=vote_mute_threshold){
                    let reason='N/A';
                    if (args[1]){
                        reason = args[1];
                    }
                    let role;
                    message.guild.roles.cache.forEach(element => {
                        if (element.name===muteRole) {
                            role = element.id;
                        }
                    });
                    target.roles.add(role).catch(console.error);
                    logEvent(message, target, reason, "mute");
                    const embed = new MessageEmbed()
                                    .setTitle(`Votemute: ${target.displayName}`)
                                    .setFooter(`Poll created by ${author}`)
                                    .setDescription(`Muted User: ${target}`);
                    return message.channel.send(embed);
                }
                else {
                    const embed = new MessageEmbed()
                                    .setTitle(`Couldn't ${title}`)
                                    .setFooter(`Poll created by ${author}`)
                                    .setDescription(`Not enough votes`);
                    return message.channel.send(embed);
                }
            });
        }
        else {
            const warn = new MessageEmbed()
                        .setColor('#FF0000')
                        .setTitle(`:lock: **Warning!**`)
                        .setDescription('\`\`\`You Are Not Authorized For This Action.\`\`\`')
                        .setFooter(`Don't think that you can pull a sneaky on me, ${message.member.displayName}`)
                        .setTimestamp();
            return message.channel.send(warn);
        }
    }
}