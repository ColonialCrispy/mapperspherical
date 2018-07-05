const discord = require ('discord.js');
const fs = require (`fs`);
const ms = require (`ms`);
var client = new discord.Client(); 
const token = process.env.token;
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

client.on ("ready", () => {
    console.log ("Colonial smells")
    client.user.setActivity ("m!help")
    client.user.setAvatar("https://cdn.discordapp.com/attachments/459817725095575558/464146169409437696/mappersphere_2.png")
    client.user.setUsername("Mappersphere")
    

    answered = true;
    cAnswer = "";
    userAnswer = "";
    answered2 = true;
    answered3 = true;
    userResponse = ""; 
    nameAnswer = "";
    userResponse2 = ""; 
    cAnswer = "";
});

client.on(`guildMemberAdd`, member => {
    let jChannel = member.guild.channels.find(`name`, `conversation`)
    let mAvatar = member.user.avatarURL
    if (!jChannel) return;
    const gembed = new discord.RichEmbed()
    gembed.setTitle(`${member.user.username} has joined the server!`)
    gembed.setColor(`RANDOM`)
    gembed.setThumbnail(mAvatar)
    gembed.addField(`Name`, `${member.user.username}`)
    gembed.addField(`Member count`, member.guild.memberCount)
    gembed.setFooter(`${member.guild.name}` + `${member.user.displayAvatarURL}`)
    jChannel.sendEmbed(gembed)
    let jRole = message.guild.roles.find(`name`, `Student`)
    member.addRole(jRole)



})

client.on(`guildMemberRemove`, member => {
    let jChannel = member.guild.channels.find(`name`, `conversation`)
    let mAvatar = member.user.avatarURL
    if (!jChannel) return;
    const gembed = new discord.RichEmbed()
    gembed.setTitle(`${member.user.username} has left the server!`)
    gembed.setColor(`RANDOM`)
    gembed.setThumbnail(mAvatar)
    gembed.addField(`Name`, `${member.user.username}`)
    gembed.addField(`Member count`, member.guild.memberCount)
    gembed.setFooter(`${member.guild.name}` + `${member.user.displayAvatarURL}`)
    jChannel.sendEmbed(gembed)



})

const prefix = "colonial pls ";

client.on('message', async (message) => {
    let msg = message.content.toUpperCase(); // This variable takes the message, and turns it all into uppercase so it isn't case sensitive.
    let sender = message.author; // This variable takes the message, and finds who the author is.
    let cont = message.content.slice(prefix.length).split(" "); // This variable slices off the prefix, then puts the rest in an array based off the spaces
    let args = cont.slice(1);

    if (message.author.bot) return;

    if (message.content.startsWith(`m!kick`)) {
        const args7 = cont.slice(1)
        const args8 = args7.join(" ")
        const kChannel = message.guild.channels.find(`name`, `conversation`)
        if (!message.member.hasPermission(`KICK_MEMBERS`)) return message.channelhannel.send(`You're not allowed to do that!`)
        var member = message.mentions.members.first();
        member.kick().then((member) => {
            message.channel.send(":wave: " + member.displayName + " has been successfully kicked :point_right: :door: ");
        }).catch(() => {
            kChannel.send("Access Denied");
        })
        kChannel.send(`${member}, has been kicked`)
        const bembed = new discord.RichEmbed()
        bembed.setTitle(`Kicked user ${member}`)
        bembed.setThumbnail(`${message.guild.iconURL}`)
        bembed.addField(`Kicked by`, `${message.author.tag}`)
        bembed.setFooter(`Mappersphere`, message.author.displayAvatarURL)
        bembed.addField(`Reason`, `${args8}`)
        bembed.setTimestamp()
        kChannel.send(bembed)
    }

    if (message.content.startsWith(`m!modlist`)) {
        message.channel.send(`Colonial \n West \n Korean \n Sundal`)
    }

    if (message.content.startsWith(`m!ban`)) {
        const kChannel = message.guild.channels.find(`name`, `senate`)
        const args5 = cont.slice(1)
        const args6 = args5.join(" ")
        if (!message.member.hasPermission(`BAN_MEMBERS`)) return message.channel.send(`You're not allowed to do that!`)
        var member = message.mentions.members.first();
        member.ban().then((member) => {
            message.channel.send(":wave: " + member.displayName + " has been successfully banned :point_right: :door: ");
        }).catch(() => {
            message.channel.send("Access Denied");
        })
        kChannel.send(`${member}, has been banned`)
        const kembed = new discord.RichEmbed()
        kembed.addField(`Reason`, `${args6}`)
        kembed.setTitle(`Banned user: ${member}`)
        kembed.addField(`Ban length`, `Forever`)
        kembed.setThumbnail(`${message.guild.iconURL}`)
        kembed.addField(`Banned by`, `${message.author.tag}`)
        kembed.setFooter(`Mappersphere`, message.author.displayAvatarURL)
        kembed.setTimestamp()
        message.channel.send(kembed)
    }

    if (message.content.startsWith(`m!help`)) {
        if(!message.member.hasPermission(`KICK_MEMBERS`)) return message.channel.send(`You can't do that!`)
        const hembed = new discord.RichEmbed()
        hembed.setThumbnail(message.guild.iconURL)
        hembed.setTimestamp()
        hembed.setColor(`BLUE`)
        hembed.addField(`m!kick`, `Kicks a user`)
        hembed.addField(`m!ban`, `Bans a user`)
        message.channel.send(hembed)
    }

    if (message.content.startsWith(`c!warn`)) {
        if (!message.member.hasPermission(`MANAGE_MESSAGES`)) return message.channel.send(`You do not have permission to do this!`)
        var wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!wUser) return message.channel.send("Please mention a user!");
        args13 = cont.slice(1)
        const reason = args13.join(" ") 
        if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.channel.send('**I do not have the correct permissions.**').catch(console.error)

        var warnEmbed = new discord.RichEmbed()
        warnEmbed.setTitle(`${message.author.username} has warned someone!`)
        warnEmbed.setColor("RED")
        warnEmbed.addField("Warned User", `${wUser} with ID: ${wUser.id}`)
        warnEmbed.addField("Warned By", `${message.author}`)
        warnEmbed.addField("Channel", message.channel)
        warnEmbed.addField("Time", message.createdAt)
        warnEmbed.addField("Reason", reason);
        warnEmbed.setThumbnail(message.guild.iconURL)

        var warnchannel = message.guild.channels.find(`name`, "senate");
        if (!warnchannel) return message.channel.send("**Can't find senate channel.**");


        warnchannel.send(warnEmbed);

    }

    if (message.content.startsWith(`c!report`)) {
        if (!message.member.hasPermission(`MANAGE_MESSAGES`)) return message.channel.send(`You do not have permission to do this!`)
        var rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!rUser) return message.channel.send("Please mention a user!");
        args13 = cont.slice(1)
        const reason = args13.join(" ")
        if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.channel.send('**I do not have the correct permissions.**').catch(console.error)

        var reportEmbed = new discord.RichEmbed()
        reportEmbed.setTitle(`${message.author.username} has reported someone!`)
        reportEmbed.setColor("RED")
        reportEmbed.addField("Reported User", `${rUser} with ID: ${rUser.id}`)
        reportEmbed.addField("Reported By", `${message.author}`)
        reportEmbed.addField("Channel", message.channel)
        reportEmbed.addField("Time", message.createdAt)
        reportEmbed.addField("Reason", reason);
        reportEmbed.setThumbnail(message.guild.iconURL)

        var reportschannel = message.guild.channels.find(`name`, "senate");
        if (!reportschannel) return message.channel.send("**Can't find senate channel.**");


        reportschannel.send(reportEmbed);
    }

    ex1 = "./memes/ex1.png"; ex2 = "./memes/ex2.png"; ex3 = "./memes/ex3.png"; ex4 = "./memes/ex4.png"; ex5 = "./memes/ex5.png"; ex6 = "./memes/ex6.png"; ex7 = "./memes/ex7.png"; ex8 = "./memes/ex8.png"; ex9 = "./memes/ex9.png"; ex10 = "./memes/ex10.png"; ex11 = "./memes/ex11.png"; ex12 = "./memes/ex12.png"; ex13 = "./memes/ex13.png"; ex14 = "./memes/ex14.png"; ex15 = "./memes/ex15.png"; ex16 =  "./memes/ex16.png"; ex17 = "./memes/ex17.png"; ex18 = "./memes/ex18.png"; ex19 = "./memes/ex19.png"; ex20 = "./memes/ex20.jpg"; ex21 = "./memes/ex21.png"; ex22 = "./memes/ex22.png"; ex23 = "./memes/ex23.png"; ex24 = "./memes/ex24.png"; ex25 = "./memes/ex25.png"; ex26 = "./memes/ex26.png"; ex27 = "./memes/ex27.png"; ex28 = "./memes/ex28.png"; ex29 = "./memes/ex29.png";
    if (message.content.startsWith ("c!expose")) {
        number = 29;
        var random = Math.floor (Math.random() * (number - 1 + 1)) + 1;  
        switch (random) {
            case 1: message.channel.send ({ files: [ex1] }); break;
            case 2: message.channel.send ({ files: [ex2] }); break;
            case 3: message.channel.send ({ files: [ex3] }); break;
            case 4: message.channel.send ({ files: [ex4] }); break;
            case 5: message.channel.send ({ files: [ex5] }); break;
            case 6: message.channel.send ({ files: [ex6] }); break;
            case 7: message.channel.send ({ files: [ex7] }); break;
            case 8: message.channel.send ({ files: [ex8] }); break;
            case 9: message.channel.send ({ files: [ex9] }); break;
            case 10: message.channel.send ({ files: [ex10] }); break;
            case 11: message.channel.send ({ files: [ex11] }); break;
            case 12: message.channel.send ({ files: [ex12] }); break;
            case 13: message.channel.send ({ files: [ex13] }); break;
            case 14: message.channel.send ({ files: [ex14] }); break;
            case 15: message.channel.send ({ files: [ex15] }); break;
            case 16: message.channel.send ({ files: [ex16] }); break;
            case 17: message.channel.send ({ files: [ex17] }); break;
            case 18: message.channel.send ({ files: [ex18] }); break;
            case 19: message.channel.send ({ files: [ex19] }); break;
            case 20: message.channel.send ({ files: [ex20] }); break;
            case 21: message.channel.send ({ files: [ex21] }); break;
            case 22: message.channel.send ({ files: [ex22] }); break;
            case 23: message.channel.send ({ files: [ex23] }); break;
            case 24: message.channel.send ({ files: [ex24] }); break;
            case 25: message.channel.send ({ files: [ex25] }); break;
            case 26: message.channel.send ({ files: [ex26] }); break;
            case 27: message.channel.send ({ files: [ex27] }); break;
            case 28: message.channel.send ({ files: [ex28] }); break;
            case 29: message.channel.send ({ files: [ex29] }); break;
        }
    }

    


});
client.login (token);
