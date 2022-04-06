
const { Client, Intents , MessageEmbed } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const fetch = require('node-fetch');

client.login('<REDACTED FOR PRIVACY AND SECURITY>');

require('dotenv').config();
const getplayercard = async (options,message) => {try{
       url = `<REDACTED FOR PRIVACY AND SECURITY>` + options
      const response = await fetch(url,
      );  


      const data = await response.json();
      console.log(data)
      var isd=1;
      var versus = ''
      var teamname = ''
      var teamrole = ''
      var level = ''
      var name = ''
      if(data['teamName']===null){'No Data'} else {teamname = data['teamName'] }if(data['role']===null){teamrole = 'No Data'}else{teamrole=data['role']}
  if(data['nationality']===null){nationality = 'No Data'}else{nationality =data['nationality']}
    if(data['country']===null){country = 'No Data'}else{country = data['country']}
      const upcominglength = data.length;
      while (isd < upcominglength);
        const exampleEmbed = {
          color: 0x0099ff,
          title: data['playerName'],
          url: 'https://discord.js.org',
          author: {
              name: 'Player Card',
           
              url: 'https://blakemccullough.com',
          },
          description: data['playerID'],
          thumbnail: {
              url:  '<REDACTED FOR PRIVACY AND SECURITY>'+data['userLogo'],
          },
          fields: [
              {
                  name: 'Teams:',
                  value: teamname +' -- '+teamrole,
              },
              {
                  name: '\u200b',
                  value: '\u200b',
                  inline: false,
              },
              {
                  name: 'Country',
                  value: country,
                  inline: true,
              },
              {
                  name: 'Nationality',
                  value: nationality,
                  inline: true,
              },

          ],

             timestamp: new Date(),
            footer: {
                text: 'Made possible by Spoiled_Kitten#4911',
                icon_url: 'https://cdn.discordapp.com/avatars/758241636676403221/741aa0b71310a6ad8cd47233d7528605.webp?size=80',
            url: 'https://blakemccullough.com',
            },
        };
      message.channel.send({ embeds: [exampleEmbed] });
 

        


      }catch (error) {
      message.channel.send('An error occured\n :awkward: \n Please try again')
      console.log(error);
    }};
const getteamcard = async (options,message) => {try{
       url = `https://api.vrmasterleague.com/Teams/` + options

      const response = await fetch(url,
      );  
        const data = await response.json();


      if(data['team']['upcomingMatches'].length > 5){upcominglength = 5;}
      else{upcominglength = data['team']['upcomingMatches'].length;}
      var isde = 0;
      var games = "";
      var gametime = '';
      if(upcominglength === 0){games = 'N/A'; gametime = 'N/A';}
      else{
      do {
        

        gametime = gametime +data['team']['upcomingMatches'][isde]["dateScheduledUTC"] +'\n'
        games  = games+ data['team']['upcomingMatches'][isde]["homeTeam"]["teamName"]+' VS ' + data['team']['upcomingMatches'][isde]["awayTeam"]["teamName"] + '\n'

        isde++;

      }
      while (isde <upcominglength);
      }
      console.log(data)

      if(data['team']['bio']['bioInfo']===null){bio = 'No Bio'}
      else{
      if (data['team']['bio']['bioInfo'].length > 1500){bio = 'Bio is to long'}         else{bio = data['team']['bio']['bioInfo']}}


      

        const exampleEmbed = {
          color: 0x0099ff,
          title: data['team']['teamName']+'\n'+data['team']['gameName'],
          url: 'https://discord.js.org',
          author: {
              name: 'Team Card',
           
              url: 'https://blakemccullough.com',
          },
          description: bio,
          thumbnail: {
              url:  '<REDACTED FOR PRIVACY AND SECURITY>'+data['team']['teamLogo'],
          },
          fields: [

              {
                  name: 'Wins:',
                  value: data['team']['w'].toString(),
                  inline: true,
              },
              {
                  name: 'Ties:',
                  value:  data['team']['t'].toString(),
                  inline: true,
              },
              {
                  name: 'Loses:',
                  value:  data['team']['l'].toString(),
                  inline: true,
              },{
                  name: 'Time UTC:',
                  value: gametime,
                  inline: true,
              },{
                  name: 'Upcoming Games:',
                  value:  games,
                  inline: true,
              },

          ],

             timestamp: new Date(),
            footer: {
                text: 'Made possible by Spoiled_Kitten#4911',
                icon_url: 'https://cdn.discordapp.com/avatars/758241636676403221/741aa0b71310a6ad8cd47233d7528605.webp?size=80',
            url: 'https://blakemccullough.com',
            },
        };
      message.channel.send({ embeds: [exampleEmbed] });
 

        


      }catch (error) {
       message.channel.send('An error occured\n :awkward: \n Please try again')
      console.log(error);
    }};

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const Discord = require("discord.js")

const prefix = '!';

client.on('message', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  msg =  message
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  if (msg.author.bot) {
    return;
  }

  if (msg.content.startsWith('!teamsearch')) {try{
    // Filters define what kinds of messages should be collected
    const namesearch = msg.content.split(' ');
    const filter = (m) => m.author.id === message.author.id&&!isNaN(m.content);

    // Options define how long the collector should remain open

    let collector = msg.channel.createMessageCollector(({
  filter,
  max: 1,
  time: 1000 * 20,
}));
  
    // The 'collect' event will fire whenever the collector receives input
    collector.on('collect', (m) => {
      
      test = m.content

      getteamcard(options[test],message);
      console.log(`Collected ${m.content}`);
      
    
    // The 'end' event will fire when the collector is finished.
    collector.on('end', (collected) => {
         console.log(`Collected ${collected} items`);

    })
    });
 message.channel.send('Fetching the teams results!');
      url = '<REDACTED FOR PRIVACY AND SECURITY>'+namesearch[1]+'/teams/Search?name=' +namesearch[2]
        console.log(url)
      const response = await fetch(url
        ,
      );  
      var userid = message.author.id
      console.log(userid)
      const data = await response.json();
      console.log(data)
      var isd=0;



      var hometeamed = ''
      var level = 0
      var leveled = 1;
      var options = [''];
      var name = ''
      if(data.length > 15){upcominglength = 15;}
      else{upcominglength = data.length;}
    
      
      if(upcominglength === 0){message.channel.send('No players match that search');}
      else{

      do {
        
        const newArrayLength = options.push(data[isd]['id'])

        name = name + data[isd]['name'] + '\n'
        level = level +leveled + '\n'
        leveled++
        isd++;

      }
      while (isd < upcominglength);
       const exampleEmbed = {
        	color: 0x0099ff,
        	title: 'Upcoming VRML Games',
        	url: 'https://discord.js.org',


        	description: 'The following are the upcoming for Final Assault in VRML :)',
        	thumbnail: {
        		url: '<REDACTED FOR PRIVACY AND SECURITY>',
        	},
        	fields: [
        		
            {
        			name: 'Toptions',
        			value: level,
        			inline: true,
        		},
        		{
        			name: 'Name',
        			value: name,
        			inline: true,
        		},
        	],

        	timestamp: new Date(),
        	footer: {
        		text: 'Made possible by Spoiled_Kitten#4911',
        		icon_url: 'https://cdn.discordapp.com/avatars/758241636676403221/741aa0b71310a6ad8cd47233d7528605.webp?size=80',
            url: 'https://blakemccullough.com',
        	},
        };
        

        msg.reply({ embeds: [exampleEmbed] })

        
        console.log(options)

    }} catch (error) {
       message.channel.send('An error occured\n :awkward: \n Please try again')
      console.log(error);
    }
        
   
  }
if (msg.content.startsWith('!playersearch')) {try{
    // Filters define what kinds of messages should be collected
    const namesearch = msg.content.split(' ');
    const filter = (m) => m.author.id === message.author.id&&!isNaN(m.content);
    console.log(namesearch[1])
    // Options define how long the collector should remain open

    let collector = msg.channel.createMessageCollector(({
  filter,
  max: 1,
  time: 1000 * 20,
}));
  
    // The 'collect' event will fire whenever the collector receives input
    collector.on('collect', (m) => {
      
      test = m.content

      getplayercard(options[test],message);
      console.log(`Collected ${m.content}`);
      
    
    // The 'end' event will fire when the collector is finished.
    collector.on('end', (collected) => {
         console.log(`Collected ${collected} items`);

    })
    });
 message.channel.send('Fetching the players results!');
      url = `<REDACTED FOR PRIVACY AND SECURITY>` +namesearch[1]
      const response = await fetch(url
        ,
      );  
      var userid = message.author.id
      console.log(userid)
      const data = await response.json();
      console.log(data)
      var isde=0;
      var versus = ''
      var hometeamed = ''
      
      var options = [''];
      var level = 0
      var leveled = 1;
      var name = ''
      const upcominglength = data.length;
      if(upcominglength === 0){message.channel.send('No players match that search');}
      else{

      do {
        
        const newArrayLength = options.push(data[isde]['id'])

        name = name + data[isde]['name'] + '\n'
        level = level +leveled + '\n'
        leveled++
        isde++;

      }
      while (isde < upcominglength);
       const exampleEmbed = {
        	color: 0x0099ff,
        	title: 'Upcoming VRML Games',
        	url: 'https://discord.js.org',


        	description: 'The following are the upcoming for Final Assault in VRML :)',
        	thumbnail: {
        		url: '<REDACTED FOR PRIVACY AND SECURITY>',
        	},
        	fields: [
        		
            {
        			name: 'Options',
        			value: level,
        			inline: true,
        		},
        		{
        			name: 'Name',
        			value: name,
        			inline: true,
        		},
        	],

        	timestamp: new Date(),
        	footer: {
        		text: 'Made possible by Spoiled_Kitten#4911',
        		icon_url: 'https://cdn.discordapp.com/avatars/758241636676403221/741aa0b71310a6ad8cd47233d7528605.webp?size=80',
            url: 'https://blakemccullough.com',
        	},
        };
        

        msg.reply({ embeds: [exampleEmbed] })

        
        console.log(options)

    }} catch (error) {
       message.channel.send('An error occured\n :awkward: \n Please try again')
      console.log(error);
    }
        
   
  }

  if (command === 'latestnews') {
    try {
      const response = await fetch(
        `<REDACTED FOR PRIVACY AND SECURITY>`,
      );
      const data = await response.json();
      console.log(data)
      var i=0;
      const newslength = data['News'].length;
      if(newslength>10){newslength = 9}
      do {
        info = data['News'][i]['Contents']
        if(info.length>2000){info = '\n Text is too long \n'}
        message.channel.send(data['News'][i]['Date']+'-'+data['News'][i]['Title']+'\n'+info+'\\n');
        i++;
      }
      while (i < newslength);
      
    } catch (error) {
      message.channel.send('Oops, there was an error fetching the Latest News');
      console.log(error);
    }
  }else if (command === 'upcominggames') {
    try {
      message.channel.send('Fetching the upcoming games!');
      const response = await fetch(
        `<REDACTED FOR PRIVACY AND SECURITY>`,
      );
      
      const data = await response.json();
      console.log(data)
      var is=0;
      var versus = ''
      var hometeam = ''
      var game = ''
      var awayteam = ''
      const upcominglength = 15;

      do {
        
        game = game + data['Values'][is]['game'] + ':\n'
        hometeam = hometeam  + data['Values'][is]['hometeam']['teamname'] +'\n'
        awayteam = awayteam + data['Values'][is]['awayteam']['teamname'] + '\n'

        is++;

      }
      while (is < upcominglength);
       const exampleEmbed = {
        	color: 0x0099ff,
        	title: 'Upcoming VRML Games',
        	url: 'https://discord.js.org',

       
        	description: 'The following are the upcoming for all games in VRML :)',
        	thumbnail: {
        		url: '<REDACTED FOR PRIVACY AND SECURITY>',
        	},
        	fields: [
        		
            {
        			name: 'Game',
        			value: game,
        			inline: true,
        		},
        		{
        			name: 'Home Team',
        			value: hometeam,
        			inline: true,
        		},

        		{
        			name: 'Away Team',
        			value: awayteam,
        			inline: true,
        		},
        	],

        	timestamp: new Date(),
        	footer: {
        		text: 'Made possible by Spoiled_Kitten#4911',
        		icon_url: 'https://cdn.discordapp.com/avatars/758241636676403221/741aa0b71310a6ad8cd47233d7528605.webp?size=80',
            url: 'https://blakemccullough.com',
        	},
        };
        

        message.channel.send({ embeds: [exampleEmbed] });


    } catch (error) {
       message.channel.send('An error occured\n :awkward: \n Please try again')
      console.log(error);
    }}
 else if (command === 'upcomingechoarena') {
    try {
      message.channel.send('Fetching the upcoming Echo Arena games!');
      const response = await fetch(
        `<REDACTED FOR PRIVACY AND SECURITY>`,
      );
      
      const data = await response.json();
      console.log(data)
      var is=0;
      var versus = ''
      var hometeam = ''
      var game = ''
      var awayteam = ''
      const upcominglength = 15;

      do {
        
        game = game + data['Values'][is]['game'] + ':\n'
        hometeam = hometeam  + data['Values'][is]['hometeam']['teamname'] +'\n'
        awayteam = awayteam + data['Values'][is]['awayteam']['teamname'] + '\n'

        is++;

      }
      while (is < upcominglength);
       const exampleEmbed = {
        	color: 0x0099ff,
        	title: 'Upcoming VRML Games',
        	url: 'https://discord.js.org', author: {
              name: 'Player Card',
           
              url: 'https://blakemccullough.com',
          },


        	description: 'The following are the upcoming for Echo Arena in VRML :)',
        	thumbnail: {
        		url: '<REDACTED FOR PRIVACY AND SECURITY>',
        	},
        	fields: [
        		
            {
        			name: 'Game',
        			value: game,
        			inline: true,
        		},
        		{
        			name: 'Home Team',
        			value: hometeam,
        			inline: true,
        		},

        		{
        			name: 'Away Team',
        			value: awayteam,
        			inline: true,
        		},
        	],

        	timestamp: new Date(),
        	footer: {
        		text: 'Made possible by Spoiled_Kitten#4911',
        		icon_url: 'https://cdn.discordapp.com/avatars/758241636676403221/741aa0b71310a6ad8cd47233d7528605.webp?size=80',
            url: 'https://blakemccullough.com',
        	},
        };
        

        message.channel.send({ embeds: [exampleEmbed] });


    } catch (error) {
       message.channel.send('An error occured\n :awkward: \n Please try again')
      console.log(error);
    }
  }else if (command === 'upcomingonward') {
    try {
      message.channel.send('Fetching the upcoming Onward games!');
      const response = await fetch(
        `<REDACTED FOR PRIVACY AND SECURITY>`,
      );
      
      const data = await response.json();
      console.log(data)
      var isd=0;
      var versus = ''
      var hometeamed = ''
      var time = ''
      var awayteamed = ''
      const upcominglength = data['UpcomingCount'];
      if(upcominglength === 0){message.channel.send('No upcoming games');}
      else{
      do {
        

        hometeamed = hometeamed  + data['Values'][isd]['hometeam']['teamname'] +'\n'
        awayteamed = awayteamed + data['Values'][isd]['awayteam']['teamname'] + '\n'
        time = time + data['Values'][isd]["TimeUTC"] + '\n'
        isd++;

      }
      while (isd < upcominglength);
       const exampleEmbed = {
        	color: 0x0099ff,
        	title: 'Upcoming VRML Games',
        	url: 'https://discord.js.org',


        	description: 'The following are the upcoming for Onward in VRML :)',
        	thumbnail: {
        		url: '<REDACTED FOR PRIVACY AND SECURITY>',
        	},
        	fields: [
        		
            {
        			name: 'Time',
        			value: time,
        			inline: true,
        		},
        		{
        			name: 'Home Team',
        			value: hometeamed,
        			inline: true,
        		},

        		{
        			name: 'Away Team',
        			value: awayteamed,
        			inline: true,
        		},
        	],

        	timestamp: new Date(),
        	footer: {
        		text: 'Made possible by Spoiled_Kitten#4911',
        		icon_url: 'https://cdn.discordapp.com/avatars/758241636676403221/741aa0b71310a6ad8cd47233d7528605.webp?size=80',
            url: 'https://blakemccullough.com',
        	},
        };
        

        message.channel.send({ embeds: [exampleEmbed] });


    }} catch (error) {
       message.channel.send('An error occured\n :awkward: \n Please try again')
      console.log(error);
    }
  }else if (command === 'upcomingsnapshot') {
    try {
      message.channel.send('Fetching the upcoming Snap-Shot games!');
      const response = await fetch(
        `<REDACTED FOR PRIVACY AND SECURITY>`,
      );
      
      const data = await response.json();
      console.log(data)
      var isd=0;
      var versus = ''
      var hometeamed = ''
      var time = ''
      var awayteamed = ''
      const upcominglength = data['UpcomingCount'];
      if(upcominglength === 0){message.channel.send('No upcoming games');}
      else{
      do {
        

        hometeamed = hometeamed  + data['Values'][isd]['hometeam']['teamname'] +'\n'
        awayteamed = awayteamed + data['Values'][isd]['awayteam']['teamname'] + '\n'
        time = time + data['Values'][isd]["TimeUTC"] + '\n'
        isd++;

      }
      while (isd < upcominglength);
       const exampleEmbed = {
        	color: 0x0099ff,
        	title: 'Upcoming VRML Games',
        	url: 'https://discord.js.org',


        	description: 'The following are the upcoming for Snap-Shot in VRML :)',
        	thumbnail: {
        		url: '<REDACTED FOR PRIVACY AND SECURITY>',
        	},
        	fields: [
        		
            {
        			name: 'Time',
        			value: time,
        			inline: true,
        		},
        		{
        			name: 'Home Team',
        			value: hometeamed,
        			inline: true,
        		},

        		{
        			name: 'Away Team',
        			value: awayteamed,
        			inline: true,
        		},
        	],

        	timestamp: new Date(),
        	footer: {
        		text: 'Made possible by Spoiled_Kitten#4911',
        		icon_url: 'https://cdn.discordapp.com/avatars/758241636676403221/741aa0b71310a6ad8cd47233d7528605.webp?size=80',
            url: 'https://blakemccullough.com',
        	},
        };
        

        message.channel.send({ embeds: [exampleEmbed] });


    }} catch (error) {
       message.channel.send('An error occured\n :awkward: \n Please try again')
      console.log(error);
    }
  }else if (command === 'upcomingcontractors') {
    try {
      message.channel.send('Fetching the upcoming Contractors games!');
      const response = await fetch(
        `<REDACTED FOR PRIVACY AND SECURITY>`,
      );
      
      const data = await response.json();
      console.log(data)
      var isd=0;
      var versus = ''
      var hometeamed = ''
      var time = ''
      var awayteamed = ''
      const upcominglength = data['UpcomingCount'];
      if(upcominglength === 0){message.channel.send('No upcoming games');}
      else{
      do {
        

        hometeamed = hometeamed  + data['Values'][isd]['hometeam']['teamname'] +'\n'
        awayteamed = awayteamed + data['Values'][isd]['awayteam']['teamname'] + '\n'
        time = time + data['Values'][isd]["TimeUTC"] + '\n'
        isd++;

      }
      while (isd < upcominglength);
       const exampleEmbed = {
        	color: 0x0099ff,
        	title: 'Upcoming VRML Games',
        	url: 'https://discord.js.org',


        	description: 'The following are the upcoming for Contractors in VRML :)',
        	thumbnail: {
        		url: '<REDACTED FOR PRIVACY AND SECURITY>',
        	},
        	fields: [
        		
            {
        			name: 'Time',
        			value: time,
        			inline: true,
        		},
        		{
        			name: 'Home Team',
        			value: hometeamed,
        			inline: true,
        		},

        		{
        			name: 'Away Team',
        			value: awayteamed,
        			inline: true,
        		},
        	],

        	timestamp: new Date(),
        	footer: {
        		text: 'Made possible by Spoiled_Kitten#4911',
        		icon_url: 'https://cdn.discordapp.com/avatars/758241636676403221/741aa0b71310a6ad8cd47233d7528605.webp?size=80',
            url: 'https://blakemccullough.com',
        	},
        };
        

        message.channel.send({ embeds: [exampleEmbed] });


    }} catch (error) {
       message.channel.send('An error occured\n :awkward: \n Please try again')
      console.log(error);
    }
  }else if (command === 'upcomingpavlov') {
    try {
      message.channel.send('Fetching the upcoming Pavlov games!');
      const response = await fetch(
        `<REDACTED FOR PRIVACY AND SECURITY>`,
      );
      
      const data = await response.json();
      console.log(data)
      var isd=0;
      var versus = ''
      var hometeamed = ''
      var time = ''
      var awayteamed = ''
      const upcominglength = data['UpcomingCount'];
      if(upcominglength === 0){message.channel.send('No upcoming games');}
      else{
      do {
        

        hometeamed = hometeamed  + data['Values'][isd]['hometeam']['teamname'] +'\n'
        awayteamed = awayteamed + data['Values'][isd]['awayteam']['teamname'] + '\n'
        time = time + data['Values'][isd]["TimeUTC"] + '\n'
        isd++;

      }
      while (isd < upcominglength);
       const exampleEmbed = {
        	color: 0x0099ff,
        	title: 'Upcoming VRML Games',
        	url: 'https://discord.js.org',


        	description: 'The following are the upcoming for Pavlov in VRML :)',
        	thumbnail: {
        		url: '<REDACTED FOR PRIVACY AND SECURITY>',
        	},
        	fields: [
        		
            {
        			name: 'Time',
        			value: time,
        			inline: true,
        		},
        		{
        			name: 'Home Team',
        			value: hometeamed,
        			inline: true,
        		},

        		{
        			name: 'Away Team',
        			value: awayteamed,
        			inline: true,
        		},
        	],

        	timestamp: new Date(),
        	footer: {
        		text: 'Made possible by Spoiled_Kitten#4911',
        		icon_url: 'https://cdn.discordapp.com/avatars/758241636676403221/741aa0b71310a6ad8cd47233d7528605.webp?size=80',
            url: 'https://blakemccullough.com',
        	},
        };
        

        message.channel.send({ embeds: [exampleEmbed] });


    }} catch (error) {
       message.channel.send('An error occured\n :awkward: \n Please try again')
      console.log(error);
    }
  }else if (command === 'upcomingfinalassault') {
    try {
      message.channel.send('Fetching the upcoming Final Assault games!');
      const response = await fetch(
        `<REDACTED FOR PRIVACY AND SECURITY>`,
      );
      
      const data = await response.json();
      console.log(data)
      var isd=0;
      var versus = ''
      var hometeamed = ''
      var time = ''
      var awayteamed = ''
      const upcominglength = data['UpcomingCount'];
      if(upcominglength === 0){message.channel.send('No upcoming games');}
      else{
      do {
        

        hometeamed = hometeamed  + data['Values'][isd]['hometeam']['teamname'] +'\n'
        awayteamed = awayteamed + data['Values'][isd]['awayteam']['teamname'] + '\n'
        time = time + data['Values'][isd]["TimeUTC"] + '\n'
        isd++;

      }
      while (isd < upcominglength);
       const exampleEmbed = {
        	color: 0x0099ff,
        	title: 'Upcoming VRML Games',
        	url: 'https://discord.js.org',


        	description: 'The following are the upcoming for Final Assault in VRML :)',
        	thumbnail: {
        		url: '<REDACTED FOR PRIVACY AND SECURITY>',
        	},
        	fields: [
        		
            {
        			name: 'Time',
        			value: time,
        			inline: true,
        		},
        		{
        			name: 'Home Team',
        			value: hometeamed,
        			inline: true,
        		},

        		{
        			name: 'Away Team',
        			value: awayteamed,
        			inline: true,
        		},
        	],

        	timestamp: new Date(),
        	footer: {
        		text: 'Made possible by Spoiled_Kitten#4911',
        		icon_url: 'https://cdn.discordapp.com/avatars/758241636676403221/741aa0b71310a6ad8cd47233d7528605.webp?size=80',
            url: 'https://blakemccullough.com',
        	},
        };
        

        message.channel.send({ embeds: [exampleEmbed] });


    }} catch (error) {
       message.channel.send('An error occured\n :awkward: \n Please try again')
      console.log(error);
    }
  }else if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Ping! This message had a latency of ${timeTaken}ms.`);
  }else if (command === 'help') {
        const exampleEmbed = {
        	color: 0x0099ff,
        	title: 'Help Page',
        	url: 'https://blakemccullough.com',


        	description: 'The following are the commands for the bot :)',
        	thumbnail: {
        		url: '<REDACTED FOR PRIVACY AND SECURITY>',
        	},
        	fields: [
        		{
        			name: "Get latency",
        			value: "Use the `!ping` command to get the time for connection to the server.",

        		},	{
        			name: "Get player info",
        			value: "Use the `!playersearch` command, followed by the players name you wish to find,to get a list of matching players, then enter the number of the player you wish to find and boom!",

        		},	{
        			name: "Get team info",
        			value: "Use the `!teamsearch` command, followed by the game, Options are:`snapshot,echoarena,contractors,finalassault,pavlov,onward` then follows the teams name you wish to find,to get a list of matching teams, then enter the number of the teams you wish to find and boom!",

        		},	
        		{
        			name: "Get upcoming games",
        			value: "Use the `!upcominggames` command to get the upcoming VRML games from all areas.",

        		},	
{
        			name: "Get Onmward Upcoming Games",
        			value: "Use the `!upcomingonward` command to get the upcoming VRML games for Onward.",

        		},
{
        			name: "Get Snap-Shot Upcoming Games",
        			value: "Use the `!upcomingsnapshot` command to get the upcoming VRML games for Snap-Shot.",

        		},
{
        			name: "Get Echo Arena Upcoming Games",
        			value: "Use the `!upcomingechoarena` command to get the upcoming VRML games for Echo Arena.",

        		},
{
        			name: "Get Contractors Upcoming Games",
        			value: "Use the `!upcomingcontractors` command to get the upcoming VRML games for Contractors.",

        		},{
        			name: "Get  Final Assault Upcoming Games",
        			value: "Use the `!upcomingcontractors` command to get the upcoming VRML games for Final Assault.",

        		},{
        			name: "Get  Pavlov Upcoming Games",
        			value: "Use the `!upcomingpavlov` command to get the upcoming VRML games for Pavlov.",

        		},



        	],
        	timestamp: new Date(),
        	footer: {
        		text: 'Made possible by Spoiled_Kitten#4911',
        		icon_url: 'https://cdn.discordapp.com/avatars/758241636676403221/741aa0b71310a6ad8cd47233d7528605.webp?size=80',
            url: 'https://blakemccullough.com',
        	},
        };
        

        message.channel.send({ embeds: [exampleEmbed] });


  }      

    });
