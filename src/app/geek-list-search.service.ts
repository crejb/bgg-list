import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import * as xml2js from 'xml2js';

import { GeekList } from './geek-list';
import { GeekListItemSummary } from './geek-list-item-summary';
import { ItemDetailsRetrievalService } from './item-details-retrieval.service';

@Injectable()
export class GeekListSearchService {

  private geekListUrl = 'http://www.boardgamegeek.com/xmlapi/geeklist/';

  constructor(private http: Http, private itemDetailsRetrievalService : ItemDetailsRetrievalService) {

  }

  public getList(id: string): Promise<GeekList> {
    const url = this.geekListUrl + id;
    //return this.http.get(url).map(res => res.text())
    return Observable.of(this.HARDCODED_RESPONSE)
      .catch(this.handleError)
      .toPromise()
      .then(this.extractData)
      .then((res) => this.mapResponseToGeekList(res));
  }

  private extractData(res) {
    return new Promise((resolve, reject) => {
      xml2js.parseString(res, (err, result) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(result);
        }
      });
    });
  }

  private mapResponseToGeekList(response): GeekList {
    var geeklist = response.geeklist;
    let items = this.extractItemsFromResponse(response);
    return new GeekList(geeklist.title, geeklist.id, geeklist.postdate, geeklist.thumbs, geeklist.description, items);
  }

  private extractItemsFromResponse(response) : GeekListItemSummary[]{
    return response.geeklist.item.map(item => {
      return new GeekListItemSummary(item.$.id, Number(item.$.objectid), item.$.objectname, new Date(item.$.postdate), Number(item.$.thumbs), Number(item.$.imageid), item.$.body);
    });
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  private HARDCODED_RESPONSE = `
  <geeklist id="196401" termsofuse="http://boardgamegeek.com/xmlapi/termsofuse">
<postdate>Mon, 07 Sep 2015 17:00:13 +0000</postdate>
<postdate_timestamp>1441645213</postdate_timestamp>
<editdate>Tue, 08 Sep 2015 19:30:40 +0000</editdate>
<editdate_timestamp>1441740640</editdate_timestamp>
<thumbs>160</thumbs>
<numitems>114</numitems>

<username>kingspud</username> 
<title>The definitive list of SOLO/CO-OP D&amp;D style DUNGEON hack/crawl games!!</title>
<description>This list has stemmed from the need to find a thread that has a definitive list of Dungeon crawl or D&amp;D type card and board game that are only Solitaire or Co-op in nature.

I understand there will be a lot of game that have solo variants or created solo rules for these types of games so this list should also include those games.

I will be doing the research and slowly adding games to this list to create a massive definitive list of Dungeon hack/crawl games.

If you want to add any games that you know if to this list PLEASE make sure it is defined under the following rules:

1.  Must only be a D&amp;D or Dungeon style game! 

2.  It must be at least a 1-player OR Co-op type game! &quot;Meaning everyone wins or no one wins!&quot;

3.  Can be a Card game, a board game, or a Minis style game, etc...  

4.  [b]Please stay within the  theme: no Sci-fi, fantasy &quot;unless dungeon&quot;, or zombie game!  JUST DUNGEON AND D&amp;D STYLE GAMES![/b]

5. As long as it&#039;s a game that is playable meaning its a finished PnP, published, Non-published, or funded Kickstarter game!

6. [b]The game must be based on a Dungeon theme!!!!  Exploring a dungeon, fighting in a dungeon, doing something in a dungeon!!![/b]

Let&#039;s make this the most thorough list that everyone can refer to and use for the betterment of everyone!

NOTE:  For others who haven&#039;t played the game PLEASE add a little note or comment for others to read, this is better than a huge blank space!!!
</description>


	<item id="4122752" 
			objecttype="family"
			subtype="boardgamefamily" 
			objectid="9547" 			
			objectname="Dungeons and Dragons Adventure System Board Games"
			username="Shinako" 
			postdate="Mon, 07 Sep 2015 17:05:15 +0000" 
			editdate="Mon, 07 Sep 2015 17:05:15 +0000"
			thumbs="19"
						imageid="1595321">
	<body></body>
	
		</item>
	<item id="4122768" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="113324" 			
			objectname="Dungeon Delver"
			username="davekuhns" 
			postdate="Mon, 07 Sep 2015 17:10:42 +0000" 
			editdate="Mon, 07 Sep 2015 17:10:42 +0000"
			thumbs="4"
						imageid="1172116">
	<body>A fun, quick, primarily luck based card game. </body>
	
		</item>
	<item id="4122745" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="96848" 			
			objectname="Mage Knight Board Game"
			username="kingspud" 
			postdate="Mon, 07 Sep 2015 16:59:53 +0000" 
			editdate="Mon, 26 Dec 2016 00:01:52 +0000"
			thumbs="18"
						imageid="1083380">
	<body>Being as this would not be a proper list without the one and only Mage Knight board game!  It&#039;s fitting that this game starts off the list!

The Mage Knight board game puts you in control of one of four powerful Mage Knights as you explore (and conquer) a corner of the Mage Knight universe under the control of the Atlantean Empire. Build your army, fill your deck with powerful spells and actions, explore caves and dungeons, and eventually conquer powerful cities controlled by this once-great faction! In competitive scenarios, opposing players may be powerful allies, but only one will be able to claim the land as their own. In cooperative scenarios, the players win or lose as a group. Solo rules are also included.</body>
	
		</item>
	<item id="4122800" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="2876" 			
			objectname="Mage Knight Dungeons"
			username="Woelf" 
			postdate="Mon, 07 Sep 2015 17:16:58 +0000" 
			editdate="Mon, 07 Sep 2015 17:21:43 +0000"
			thumbs="6"
						imageid="241478">
	<body>An extremely versatile miniatures-based dungeon-crawler game that can support almost any player format [i](1-on-1, team play, players-vs-DM, coop, multiplayer solo, etc.)[/i] and even has a set of [filepage=45960]Official Solo Rules[/filepage].

[imageid=2357192]</body>
	
		</item>
	<item id="4122763" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="124708" 			
			objectname="Mice and Mystics"
			username="davekuhns" 
			postdate="Mon, 07 Sep 2015 17:10:09 +0000" 
			editdate="Mon, 07 Sep 2015 17:10:09 +0000"
			thumbs="16"
						imageid="1312072">
	<body>This is one of my favorites. On the lighter side, but with great art and minis and a fun storyline to play through. There are plenty of expansions and DLC as well.</body>
	
		</item>
	<item id="4122831" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="45315" 			
			objectname="Dungeon Lords"
			username="kingspud" 
			postdate="Mon, 07 Sep 2015 17:26:22 +0000" 
			editdate="Mon, 07 Sep 2015 17:26:22 +0000"
			thumbs="2"
						imageid="569340">
	<body>In Dungeon Lords, you are an evil dungeonlord who is trying to build the best dungeon out there. You hire monsters, build rooms, buy traps and defeat the do-gooders who wish to bring you down.

Solo variants:

https://www.boardgamegeek.com/filepage/64982/soloplay-dungeonlords-v1pdf</body>
	
		</item>
	<item id="4122843" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="34639" 			
			objectname="The Dungeon of D"
			username="kingspud" 
			postdate="Mon, 07 Sep 2015 17:33:05 +0000" 
			editdate="Mon, 07 Sep 2015 17:33:05 +0000"
			thumbs="10"
						imageid="301315">
	<body>ISLAND OF D : THE DUNGEON OF D
 A FREE ONE player dungeon-crawling-fun card Game
 No bookkeeping, NO DICE, just you, the cards, a token and a dungeon to explore!

1. INTRODUCTION
 With the hero&#039;s success in destroying the Black Knight&#039;s plan in Dawn, it took longer for him to organise his minions. But the time has come at last, the Great War has begun! Backed up by a very strong Dark Magic, he commands a huge army of Greenskins including the fierce Goblorcs, unnatural Beasts, and now the Ice Monsters and even the Undeads have joined his army. The worst part is the Light Sword&#039;s new power -- the Black Knight now can heal his minions around him, including himself, in seconds!

Approaching from the west , in a very short time three castles have fallen to his hands, and his armies are swiftly heading to the capital of D. Once again everything seems hopeless and the King of D has called the 18 legendary heroes to gather in the Dungeon of D, deep in the Forest of D to the south, where legend says that centuries ago the Great Wizard of D hid the Amulet of D&#039;eugor. It is believed that only the legendary Amulet of D&#039;eugor can nullify the Light Sword’s power. Unfortunately, the Black Knight knew about this too, so he placed a very strong magical barrier on the entrance to keep anyone from entering.

Luckily, the King has also summoned Daryn and Derek. They can combine their magical abilities to open the barrier for a very short time, allowing just one person to enter the dungeon. But even with their combined power, they can only do this once every three hours. So, one by one the 18 heroes enter the dungeon, hoping to find the Amulet of D&#039;eugor and survive to exit the dungeon. So far no one has returned… and you are hero number 18, the last person to enter the dungeon. Daryn looks into your eyes before you enter the crack in the barrier. &quot;Please, you are our last hope…&quot; You nod a little, then jump in….

2. THE MISSION
 Get out of the dungeon alive as rich as you can. And if you are able to, bring the Amulet of D’eugor!!
</body>
	
		</item>
	<item id="4122846" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="136192" 			
			objectname="Dungeon Dice"
			username="kingspud" 
			postdate="Mon, 07 Sep 2015 17:35:05 +0000" 
			editdate="Mon, 07 Sep 2015 17:35:05 +0000"
			thumbs="5"
						imageid="1535444">
	<body>Dungeon Dice is a competitive, all-dice game with a classic adventuring feel in which players battle monsters and try to collect more dice than their friends. Players equip dice, drink dice potions, and kill dice monsters. If you&#039;ve killed enough monsters, grab a level-up die. You get the idea.

In the game, players take turns drawing monster dice from a bag. To defeat a monster, players roll their dice and compare them to the monster&#039;s dice. The totals change as players use abilities and attempt to aid or sabotage one another. With each victory, players earn more dice from bags full of potions, weapons, and magical artifacts. Players race to collect enough impressive dice to gain a claim on the throne, thereby winning the game.

Solo variants available!</body>
	
		</item>
	<item id="4122851" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="472" 			
			objectname="DungeonQuest"
			username="kingspud" 
			postdate="Mon, 07 Sep 2015 17:36:59 +0000" 
			editdate="Mon, 07 Sep 2015 17:36:59 +0000"
			thumbs="9"
						imageid="184398">
	<body>Players explore the ruins of Castle Dragonfire trying to reach the treasure chamber in the center of the dungeon and escape alive with as much treasure as possible. A limited number of turns before the game ends puts pressure on players to take risks and score rewards because anyone left in the dungeon when time runs out dies! A tile-laying system creates the maze-like dungeon and ensures that no two games are ever exactly the same.</body>
	
		</item>
	<item id="4122853" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="157958" 			
			objectname="DungeonQuest Revised Edition"
			username="kingspud" 
			postdate="Mon, 07 Sep 2015 17:38:02 +0000" 
			editdate="Mon, 07 Sep 2015 17:38:02 +0000"
			thumbs="10"
						imageid="2017396">
	<body>DungeonQuest Revised Edition is a fast-paced game of dungeon exploration and looting for one to four players. You take on the role of a hero who sets out to explore Dragonfire Dungeon and claim more treasure than your rivals. Along the way, you&#039;ll need to evade traps, battle monsters, and find your way through the labyrinthian dungeon, all while trying to avoid waking the dragon who sleeps atop the treasure heap at the dungeon&#039;s heart. The player who gathers the most loot – and makes it out of the dungeon alive — is victorious!

This new edition of DungeonQuest features a streamlined combat system that harkens back to the classic editions of the game, and a deadlier dungeon than ever before. The &quot;Torchlight&quot; variant offers you a new way to explore the dungeon&#039;s depths, while building an even more complex and sprawling dungeon throughout the game.
</body>
	
		</item>
	<item id="4122854" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="140519" 			
			objectname="Myth"
			username="garyrbrooks" 
			postdate="Mon, 07 Sep 2015 17:38:05 +0000" 
			editdate="Mon, 07 Sep 2015 17:39:21 +0000"
			thumbs="10"
						imageid="1721040">
	<body>It&#039;s a coop so you play with at least 2 characters.</body>
	
		</item>
	<item id="4122858" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="67878" 			
			objectname="Dungeon Crawler"
			username="garyrbrooks" 
			postdate="Mon, 07 Sep 2015 17:40:44 +0000" 
			editdate="Mon, 07 Sep 2015 17:40:44 +0000"
			thumbs="12"
						imageid="682886">
	<body>This card game is best solo.</body>
	
		</item>
	<item id="4122876" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="2301" 			
			objectname="The New Dungeon!"
			username="btrhoads" 
			postdate="Mon, 07 Sep 2015 17:53:17 +0000" 
			editdate="Mon, 07 Sep 2015 17:53:17 +0000"
			thumbs="4"
						imageid="183293">
	<body>Game listed as 1-6 players. Solo variant included.</body>
	
		</item>
	<item id="4122883" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="42361" 			
			objectname="Pocket Dungeon"
			username="Jude" 
			postdate="Mon, 07 Sep 2015 17:56:25 +0000" 
			editdate="Mon, 07 Sep 2015 17:56:25 +0000"
			thumbs="4"
						imageid="479763">
	<body>[thing=42361]Pocket Dungeon[/thing] is a free, solitaire, print-and-play dungeon crawler.

</body>
	
		</item>
	<item id="4122939" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="90730" 			
			objectname="Dungeon in a Tin"
			username="Perenetre" 
			postdate="Mon, 07 Sep 2015 18:25:06 +0000" 
			editdate="Tue, 08 Sep 2015 23:29:49 +0000"
			thumbs="6"
						imageid="898905">
	<body>Dungeon in a Tin is a solo or cooperative dungeon-hack. Players descend into a dungeon randomly laid-out from a stack of tiles, fighting through the orc and goblin hordes to rescue the kidnapped maiden and collect treasure and glory.

Each player takes turns to move through the dungeon one tile at a time, laying new tiles as unexplored areas are entered; every time a player enters a room, special monster dice are rolled to determine the enemies faced and the potential loot to be found. When a monster attacks, a die is rolled to determine the style of their attack; the player then chooses a card from his hand to counter with, each card being strong against some kinds of attack and weak against others.

The ultimate goal of the game is for the players to fight their way to the bottom of the dungeon to rescue the captured maiden - and then fight their way out with her. The dungeon will become harder to fight through as the player delves deeper, and then harder still on the way out with a helpless rescuee in tow.

This Print-and-Play game was an entry in the &#039;One Full-sheet Label&#039; design contest here on BGG, and as such the printed components fit entirely on a single label sheet. A small number of other tokens and blank dice will also be required. Additionally, as the name hints, once constructed on cardstock it is possible to fit the game inside an Altoids tin or similar.</body>
	
		</item>
	<item id="4122942" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="31412" 			
			objectname="Dungeon Plungin&#039;"
			username="Perenetre" 
			postdate="Mon, 07 Sep 2015 18:25:48 +0000" 
			editdate="Tue, 08 Sep 2015 23:28:51 +0000"
			thumbs="9"
						imageid="370834">
	<body>Dungeon Plungin&#039; is a fantasy board game of exploration and adventure.

It has a basic rule book which describes the system. On top of this you need one of the scenario books. Each scenario book contains specific rules, objectives, floor tiles and stand up figures for a single mission.

In play you build a party of adventurers, then build a dungeon as you go, following the scenario specific rules. There are treasures, traps, and monsters to be overcome. Your party members can get stronger during play. Every game is different as the number of variables is huge.</body>
	
		</item>
	<item id="4123013" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="179275" 			
			objectname="One Deck Dungeon"
			username="kingspud" 
			postdate="Mon, 07 Sep 2015 18:40:29 +0000" 
			editdate="Mon, 07 Sep 2015 18:40:29 +0000"
			thumbs="6"
						imageid="2587970">
	<body>One Deck Dungeon is a card game &quot;roguelike&quot; — a dungeon delve that is different every time, difficult to survive, with a character you build up from scratch. The deck consists of various monsters, traps, and other encounters from the dungeon. Each card, though, depicts both the obstacle to overcome and the potential rewards for doing so. When you defeat a card, you claim it as either treasure, an item, or a skill, tucking it under the appropriate side of your character card to show its benefits.

The longer you take exploring the dungeon, the deeper you&#039;ll delve, and the difficulty will scale up quickly! If you make it far enough, you&#039;ll have to fight the dungeon boss. Survive, and you&#039;ll be a legend!

One Deck Dungeon is designed for 1-2 players. With multiple sets, you can add more players.
</body>
	
		</item>
	<item id="4123021" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="140125" 			
			objectname="Fallen"
			username="kingspud" 
			postdate="Mon, 07 Sep 2015 18:44:24 +0000" 
			editdate="Mon, 07 Sep 2015 19:51:43 +0000"
			thumbs="3"
						imageid="1667550">
	<body>Fallen is a two-player card and dice game with fast and challenging game play, gorgeous art, and plenty of re-playability all wrapped up in an ever-changing story.

One player chooses a Hero to delve deep within a dungeon, seeking the ultimate evil that waits below. Play as Seroth the Pit Fighter and fight to win at any cost, Merace the Sorceress and cast devastating spells, or Ranek the Thief striking from the shadows.

Every Hero comes with a unique character card depicting the hero and the special abilities and proficiencies of that particular character. Each hero also comes with nine unique skills to choose from which are divided into three skill trees catering to a particular proficiency. Ten signature Power cards also come with each hero, giving them special abilities that are themed to their style of play.

The second player takes on the role of the Dungeon Lord, summoning vile creatures and ancient spells to defeat the Hero. Play as the Archivist of Souls weaving dark spells that plague the hero, the Forge Master, part wizard and part machine, filling the dungeon corridors with horribly augmented monstrosities, or as Krogarn the Ogre king sending your primal horde and spirit magic to hunt down the adventurer.

Similar to the Hero, the Dungeon Lord has a character card that depicts the chosen form as well as showing the special abilities used by that character. In addition, ten signature Power cards come with each Dungeon Lord that are specific to style of villainy.

Unique Story cards bring the dungeons of Fallen to life. These cards deliver an immersive dungeon experience for players new to gaming, yet have deeper mechanics to keep even die-hard players on their toes.

Has a solo variant!</body>
	
		</item>
	<item id="4123028" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="66424" 			
			objectname="Dungeon Run"
			username="kingspud" 
			postdate="Mon, 07 Sep 2015 18:46:53 +0000" 
			editdate="Mon, 07 Sep 2015 18:46:53 +0000"
			thumbs="5"
						imageid="954633">
	<body>A tale of teamwork and betrayal!

The mole ogre howled out as it collapsed into a bloody pile of rent flesh and broken bone. The aging knight bent over, panting heavily, and gave his dwarven peer an approving nod. It had taken great effort between them both to slay the beast, and they had each taken their share of wounds. But in the end their cooperation had paid off and they both knew it. And then their eyes found the treasure chest sitting in the corner of the room.

They looked at each other. They looked back at the treasure... and then the real fight began.

The game where YOU are the final boss!

Dungeon Run is an exciting dash through a dungeon packed with monsters and traps. Each player controls a unique hero capable of great feats, and whose powers and abilities are upgradable and customizable throughout the game. Players can work together to overcome the perils of the dungeon, or they can betray and sabotage each other as they see fit. Because in the final room of the dungeon lurks a powerful boss with the ultimate treasure - a treasure that turns its owner into the most powerful warrior they can become! Slay the boss, steal the treasure, and then run for your life as your friends try to cut you down. In Dungeon Run only one hero can escape with the fabled Summoning Stone. Don&#039;t crawl - run!

Dungeon Run features a randomly assembled dungeon that changes each time you play, as do the monsters you face and the treasures you find. Eight different heroes each with unique options for customization further add to a wealth of game play options. Choose the vicious Tundra Orc and bash your way through everything that stands in your path. Play as the cunning Grounder Wizard and use your magic to cheat the laws of nature. Select the Guild Dwarf adventurer and lay traps to ensnare your friends. There are many paths to victory in Dungeon Run. Win by working with your friends or against them - just win!
</body>
	
		</item>
	<item id="4123033" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="138788" 			
			objectname="Dungeon Roll"
			username="kingspud" 
			postdate="Mon, 07 Sep 2015 18:48:23 +0000" 
			editdate="Mon, 07 Sep 2015 18:48:23 +0000"
			thumbs="8"
						imageid="1585905">
	<body>The Dungeon lies before you; you’ve assembled your party of hearty adventurers and have a few tricks up your sleeve. How far will you go to seek glory and fame? Will you risk losing everything?

In Dungeon Roll the player&#039;s goal is to collect the most experience points by defeating monsters, battling the dragon, and amassing treasure. Each player selects a Hero avatar, such as a Mercenary, Half-Goblin, or Enchantress, which provides them with unique powers. Then players take turns being the Adventurer, who boldly enters the dungeon seeking glory.

The Adventurer assembles their party by rolling seven Party Dice, while another player serves as the Dungeon Lord and rolls a number of Dungeon Dice based on how far the Adventurer has progressed through the dungeon. The Adventurer uses Champion, Fighter, Cleric, Mage, Thief, and Scroll faces on the Party Dice to defeat monsters such as oozes and skeletons, to claim treasure inside chests, and to revive downed companions with potions. The Adventurer claims treasure by taking a token at random from inside the treasure chest-shaped game box.

All this fighting in the dungeon is certain to attract the attention of the boss: The Dragon!

When three or more Dragon faces appear on the Dungeon Dice, the Adventurer must battle the Dragon. Defeating the dragon is a team effort, requiring three different companion types. After three rounds, the players add up their experience points and retire to the inn to celebrate their exploits and to plan their next foray into the next deadly dungeon!
</body>
	
		</item>
	<item id="4123077" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="3248" 			
			objectname="Citadel of Blood"
			username="MichaelLavoie" 
			postdate="Mon, 07 Sep 2015 19:05:33 +0000" 
			editdate="Mon, 07 Sep 2015 19:05:33 +0000"
			thumbs="10"
						imageid="65299">
	<body>This golden oldie from wargame publisher SPI was set in the same world as their [thing=2464][/thing] game.  Players build the dungeon using small cardboard chits, working together to overcome the defenders of the Citadel and defeat the evil Wizard &quot;X the Unknown.&quot;  There are rules for determining an individual winner, but the thrust of the game is co-op.  It also solos very well.

There&#039;s a recent PnP version that upgrades the graphics very nicely.</body>
	
		</item>
	<item id="4123117" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="180387" 			
			objectname="Dungeon Solitaire: Tomb of the Four Kings"
			username="joestin" 
			postdate="Mon, 07 Sep 2015 19:24:13 +0000" 
			editdate="Mon, 07 Sep 2015 19:24:13 +0000"
			thumbs="6"
						imageid="2580837">
	<body>I&#039;m not sure how you&#039;d do a dungeon crawl simpler than this, but it&#039;s really fast and satisfying to try and top your best score, which is not something I&#039;m normally into.</body>
	
		</item>
	<item id="4123229" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="148705" 			
			objectname="Dungeon Construction Kit: Cursed!"
			username="mo7189" 
			postdate="Mon, 07 Sep 2015 19:46:04 +0000" 
			editdate="Mon, 07 Sep 2015 19:46:55 +0000"
			thumbs="8"
						imageid="1803372">
	<body>One of my favorite PnP games where you build the dungeon as you play.  You must defeat monsters and collect treasures using tableau style cardplay.  But you must also be sure to find your way out before you run out of cards.

Can be played solo with one hero or co-op with two.

Really fun game, IMO.

[ImageID=2409585medium]</body>
	
		</item>
	<item id="4123283" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="1634" 			
			objectname="Warhammer Quest"
			username="True_Dave" 
			postdate="Mon, 07 Sep 2015 19:57:48 +0000" 
			editdate="Mon, 07 Sep 2015 19:57:48 +0000"
			thumbs="8"
						imageid="355859">
	<body>Dungeon plundering in the Warhammer World, a bit like Advanced Heroquest wearing a muzzle; it might not have the same bite, but it will still throat punch you if given half a chance.

A wonderful a story generator in every respect.

</body>
	
		</item>
	<item id="4123311" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="1758" 			
			objectname="Advanced Heroquest"
			username="True_Dave" 
			postdate="Mon, 07 Sep 2015 20:05:13 +0000" 
			editdate="Mon, 07 Sep 2015 20:05:13 +0000"
			thumbs="9"
						imageid="806419">
	<body>Warhammer Quest&#039;s abusive father is as deadly as a knife fight in a phone box for any adventurer foolhardy enough to delve into it&#039;s dungeons.  On one hand it feels just like a minis game designed to sell the GW hobby to role players, on the other hand it&#039;s bloody terrifying when your party are desperately dragging their broken bodies to the exit before they get set upon by another band of deadly skaven.

But just be warned, it&#039;s random dungeons in co-op can infuriate as much as excite.</body>
	
		</item>
	<item id="4123469" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="147747" 			
			objectname="Super Fantasy: Ugly Snouts Assault"
			username="Oph1d1an" 
			postdate="Mon, 07 Sep 2015 21:06:16 +0000" 
			editdate="Mon, 07 Sep 2015 21:06:16 +0000"
			thumbs="4"
						imageid="1831699">
	<body>A cartoonish take on the stereotypical dungeon-crawl with some neat dice mechanisms. Complete with loot, leveling up, special powers and big bad bosses. The game is fully cooperative, but also has a competitive scenario thrown in for kicks. </body>
	
		</item>
	<item id="4123751" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="102548" 			
			objectname="Dungeon Fighter"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 00:07:34 +0000" 
			editdate="Tue, 08 Sep 2015 00:07:34 +0000"
			thumbs="2"
						imageid="2411495">
	<body>Explore spooky dungeons, find glorious treasure, buy powerful magic items, and challenge the most horrible creatures. Will your party be able to defeat the final boss?

In Dungeon Fighter, a fully cooperative board game, players take on the roles of heroes venturing deep into a three-tier dungeon. Along the way, they explore the dungeon, search its many rooms, and face endless hordes of vicious monsters. Best of all, your skill determines the ability of your character. Can you kill Medusa without looking into her eyes, defeat the Minotaur in the labyrinth, or resist the breath of the dragon? Will you be able to hit a target by throwing the dice under your leg with your eyes closed?

You will feel truly part of a centuries-old battle between good and evil...with a touch of foolish stupidity.
</body>
	
		</item>
	<item id="4123764" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="131835" 			
			objectname="Boss Monster: The Dungeon Building Card Game"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 00:11:37 +0000" 
			editdate="Tue, 08 Sep 2015 00:11:37 +0000"
			thumbs="2"
						imageid="1732644">
	<body>Inspired by a love of classic video games, Boss Monster: The Dungeon Building Card Game pits 2-4 players in a competition to build the ultimate side-scrolling dungeon. Players compete to lure and destroy hapless adventurers, racing to outbid one another to see who can build the most enticing, treasure-filled dungeon. The goal of Boss Monster is to be the first Boss to amass ten Souls, which are gained when a Hero is lured and defeated — but a player can lose if his Boss takes five Wounds from Heroes who survive his dungeon.

Playing Boss Monster requires you to juggle two competing priorities: the need to lure Heroes at a faster rate than your opponents, and the need to kill those Heroes before they reach your Boss. Players can build one room per turn, each with its own damage and treasure value. More attractive rooms tend to deal less damage, so a Boss who is too greedy can become inundated with deadly Heroes.

Players interact with each other by building rooms and playing Spells. Because different Heroes seek different treasure types, and rooms are built simultaneously (played face down, then revealed), this means that every &quot;build phase&quot; is a bidding war. Spells are instant-speed effects that can give players advantages or disrupt opponents.

The game has variant solo rule:
https://boardgamegeek.com/thread/976487/solitary-rules-heroes-abilities-can-be-played-mult</body>
	
		</item>
	<item id="4123776" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="140589" 			
			objectname="Solo Dungeon Crawl"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 00:16:58 +0000" 
			editdate="Tue, 08 Sep 2015 00:16:58 +0000"
			thumbs="2"
						imageid="1618101">
	<body>In this game, you have captured by the village and thrust into a pit, which is the home of a dragon. You must fight the dragon to be able to get out. You are fortunate to have been left with some items, but this dungeon crawl will be hard.

To start the game, you make your character, and then the dungeon.
 On your turn, you move, you fight, you see.
 Will you find vast treasure, and weapons of great strength? Or will you find monsters of hideous nature? Can you survive?

If you are playing 2 player:

You have been captured by the barbaric goblins, and thrust into a pit, known as the arena. In order to get out, you must kill the other player. No rules, no limits, just a brutal blood bath. Oh, and did I mention there are still other monsters in here? Have fun...

All mechanics are the same, except you must fight the other player. And if you leave an area, it gets reset next time you enter it, so there is all ways something new.
</body>
	
		</item>
	<item id="4123784" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="26829" 			
			objectname="Adventures in the Dungeon"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 00:18:44 +0000" 
			editdate="Tue, 08 Sep 2015 00:18:44 +0000"
			thumbs="3"
						imageid="165210">
	<body>Adventures in the Dungeon is a small Dungeon-Crawler originally published within &quot;The Official Advanced Dungeons &amp; Dragons Coloring Album.&quot; The game&#039;s rules are cleverly placed at the bottom of each page, and are complimented by a map of the Dungeon in the center of the book.

The game is designed for 1-4 players, who will assume the role of characters seeking The Holy Talisman of St. Cuthbert. The 4 characters (Paladin, Rangeress, Fighter, Wizard) each have different abilities.

To find the Talisman, players must wander the Dungeon and face the creatures therein. Combat is simulated with 2D6, and the players roll attacks for both themselves and their monstrous opponents. The various monsters have special abilities, and the characters will need to coordinate their efforts carefully to make it through.

Players win the Quest by finding the Talisman, and a scoring system is included based on how many monsters were slain, and how many characters survive.
</body>
	
		</item>
	<item id="4123789" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="131349" 			
			objectname="Mini Dungeon Adventures"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 00:20:16 +0000" 
			editdate="Tue, 08 Sep 2015 00:20:16 +0000"
			thumbs="1"
						imageid="1452670">
	<body>Print and Play dungeon crawl board game in a 17-page PDF. Complete with paper miniatures and terrain. You&#039;ll need to supply your own dice. In two-player games, one person controls the monsters, and the other person controls one or two heroes. Treasure can be spent on better equipment to fight bigger and badder monsters. can you take out the Boss monster?

From the creator of Flipit Paper Combat.
</body>
	
		</item>
	<item id="4123800" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="43594" 			
			objectname="Dungeon Express"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 00:22:32 +0000" 
			editdate="Tue, 08 Sep 2015 00:22:32 +0000"
			thumbs="2"
						imageid="497845">
	<body>Dungeon Express is a fast-playing dice game of adventure, exploration, combat and treasure hunting for 1-6 players.

Players roll adventurer dice, attempting to plunder dungeon rooms from a common pool (or steal them from the other players)!

Treasure dice are used to find gold chests (good), potions (useful), poison traps (neither useful nor good).
</body>
	
		</item>
	<item id="4123817" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="41434" 			
			objectname="Dungeon of Terror"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 00:25:36 +0000" 
			editdate="Tue, 08 Sep 2015 00:25:36 +0000"
			thumbs="1"
						imageid="453915">
	<body>DUNGEON OF TERROR is a solitary DungeonCrawler that uses Tables for the encounters and narrates the adventure of a thief that was tricked and now has to escape this damned place. He will fight monsters, avoid traps, find treasure and move through rotating dungeon tiles that are plagued by horrors. Will he survive ?

The game uses Fighting Fantasy amazing system for the encounters adapted to tables you have to Roll for random traps, monsters, events and treasure.
</body>
	
		</item>
	<item id="4123822" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="86429" 			
			objectname="Deadly Danger Dungeon"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 00:26:40 +0000" 
			editdate="Tue, 08 Sep 2015 00:26:40 +0000"
			thumbs="0"
						imageid="904861">
	<body>In Deadly Danger Dungeon, You play as a hapless treasure seeker who falls in a trap, landing in a ghastly dungeon full of unspeakable perils. The goal is to climb your way back out, but you will never make it without a long streak of lucky rolls. Anywhere you step, there is some kind of hazard that takes a health point away, or kills you instantly. It might be flying arrows, falling rocks, spikes, or a slide that sends you to a volcanic fire. You start with three health points but you can raise it if you find it too difficult. It doesn&#039;t matter anyways because so many spaces are instant death. It&#039;s not a linear game, you can&#039;t just go straight to the exit. First you have to get a talisman but before you get the talisman you need to get a key.</body>
	
		</item>
	<item id="4123828" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="26648" 			
			objectname="Dark Dungeon"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 00:28:58 +0000" 
			editdate="Tue, 08 Sep 2015 00:28:58 +0000"
			thumbs="1"
						imageid="164798">
	<body>This is a solo game set in a dungeon, including board tiles, counters and detailed rules for movement, combat and character actions. From the publisher:

Jord watched as the elf peered around the corner into the dark chamber before them. The dwarf warrior did not like the smell that was coming out of the dark room, it reminded him too much like his wife’s cooking. By the Gods the woman could burn toast he thought, hell that was why he was always seeking out these dark dungeons, any excuse to eat something other then her gruel.

The elf signaled the way was not guarded by a trap, and so the dwarf and the small human sorceress took up a position near the entrance while the burly human warrior and the elf entered. As soon as the two stepped into the chamber the whole place lit up with a bright light and the laughter of the necromancer that waited within. Damn Jord cursed as he watched the hoard of skeletons rush him and his companions. Maybe he should have stayed home today and eaten the roast his wife was burning.

This is dark dungeon, the newest Mini-game from Bad Baby Productions. Hire mercenaries and adventurers and then send them out to explore the many dungeons and adventurous locations about the great city of Mordenhelm. See if you can outlast, out fight and outsmart the many monsters, traps and dangers that wait for you in the Dark Dungeons of this city.

Dark Dungeon is a sole game, using a fast, fun system of encounters and adventurous situations. See if you can meet the challenge and return with the glory you deserve.
</body>
	
		</item>
	<item id="4123829" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="168353" 			
			objectname="2 Hour Dungeon Crawl"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 00:30:04 +0000" 
			editdate="Tue, 08 Sep 2015 00:30:04 +0000"
			thumbs="6"
						imageid="2289922">
	<body>No smoke, no mirrors, just a great game!

What: Dungeon Crawl

Scale: 1 figure or counter represents 1 man or creature

Your Role: Players lead a party of Adventurers into a dungeon in search of Treasure and Fame. Save the Princess, kill some Monsters or grab some Loot, the choice is yours!

Playability: Designed for solo, same side and head to head play.

2 Hour Dungeon Crawl can be played in a variety of ways and contains the following:

•Fifteen different Races including Dwarves, Elves, Orcs, Trolls, Wizards, Barbarians, and much more.
•Eight different Professions to breath life into your characters. 
•Rules for your characters to grow in skills and abilities as they succeed.
•30+ Attributes to further define your characters.
•Over 30 Magic Spells and Magical items for you to find and use.
•A system that generates your dungeons, including the Monsters, while you play.


And even better.

Have those cool Dungeon Tiles? You can use them.

Want to go Old School and use Graph Paper? You can do it.

Have metal figures? Plastics? How about paper? Even counters? Yep, you can use them all.
</body>
	
		</item>
	<item id="4124045" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="104162" 			
			objectname="Descent: Journeys in the Dark (Second Edition)"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 03:29:34 +0000" 
			editdate="Tue, 08 Sep 2015 03:29:34 +0000"
			thumbs="5"
						imageid="1180640">
	<body>Descent: Journeys in the Dark (Second Edition) is a board game in which one player takes on the role of the treacherous overlord, and up to four other players take on the roles of courageous heroes. During each game, the heroes embark on quests and venture into dangerous caves, ancient ruins, dark dungeons, and cursed forests to battle monsters, earn riches, and attempt to stop the overlord from carrying out his vile plot.

With danger lurking in every shadow, combat is a necessity. For such times, Descent: Journeys in the Dark (Second Edition) uses a unique dice-based system. Players build their dice pools according to their character&#039;s abilities and weapons, and each die in the pool contributes to an attack in different ways. Surges, special symbols that appear on most dice, also let you trigger special effects to make the most of your attacks. And with the horrors awaiting you beneath the surface, you&#039;ll need every advantage you can take...

Featuring double-sided modular board pieces, countless hero and skill combinations, and an immersive story-driven campaign, Descent: Journeys in the Dark (Second Edition) transports heroes to a vibrant fantasy realm where they must stand together against an ancient evil.
</body>
	
		</item>
	<item id="4124050" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="178153" 			
			objectname="100 Swords: The Red Dragon&#039;s Dungeon"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 03:33:36 +0000" 
			editdate="Tue, 08 Sep 2015 03:33:36 +0000"
			thumbs="1"
						imageid="2578711">
	<body>100 Swords is a sword based dungeon crawling micro deck builder! Load up with as much as you can carry and run head first into the dungeon, exploring rooms and revealing monsters, all while keeping track of hidden treasures and swords!

During play, you must efficiently play the 5 cards in your hand for any combination of movement, strength, or energy. Movement advances you deeper into the dungeon allowing you to peek at or reveal the cards along the way. Monsters you find can only be defeated with strength. New items (and swords!) are acquired by spending cards in your hand for energy. Many items have effects that will further expand your tactical options as your deck grows.

As you defeat monsters and pick up loot, do your best to remember where everything is hidden. Treasures and slain monsters are worth gold, so get collecting! Once the dungeon has been thoroughly ransacked, or the boss is defeated, whoever has the most gold wins!
</body>
	
		</item>
	<item id="4124052" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="148522" 			
			objectname="Dice Crawl"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 03:35:21 +0000" 
			editdate="Tue, 08 Sep 2015 03:35:21 +0000"
			thumbs="2"
						imageid="1817461">
	<body>Dice Crawl is a quick, fun dungeon-crawling tile game for 1 to 4 players. Players take on the roles of mercenary captains racing to get their team of adventurers to the center of the dungeon, while other captains try to do the same thing.

Dice Crawl comes with 48 interchangeable tiles, including 4 races, 4 classes, and 4 quick reference tiles. Players will need to provide their own 6-sided dice (roughly 20-25 are needed per player), otherwise you’d be buying a box of dice. And we know you have dice!

Each player works to gain control of the dungeon as they search for the center. The game ends when a player runs out of dice or someone finds the center of the dungeon.

Beware! Not all paths lead to the center and some teams may never find the glory they seek. Luck and strategy combine in this furious game of hack-and-slashery!
</body>
	
		</item>
	<item id="4124061" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="8207" 			
			objectname="Dungeoneer: Vault of the Fiends"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 03:43:57 +0000" 
			editdate="Tue, 08 Sep 2015 03:43:57 +0000"
			thumbs="1"
						imageid="273938">
	<body>Dungeoneer: Vault of the Fiends is a non-collectable dungeon-crawl card game for 2-4 players.

It is meant as an expansion to the Dungeoneer: Tomb of the Lich Lord also published by Atlas Games, but Tomb of the Lich Lord is not necessary to play this set, as Vault of the Fiends is also a stand-alone set.

Players play the part of one of six heroes. Each hero has variable melee, magic and speed scores, as well as a unique ability. Your second role in the game is as the malevolent “Dungeonlord”, trying to exterminate the other heroes.

You win the game when as a hero you complete 3 Quests such as destroying an evil laboratory or rescuing a princess. An alternate win goal is as the Dungeonlord if all the other heroes are defeated except yours.

Vault of the Fiends features a variety of new heroes. Elf Assassin, Human Beastmaster, Drakan Sentinal, Ork Shaman, Dwarf Runecaster, and Gnome Illusionist.

This dungeon card crawler has solo variants!</body>
	
		</item>
	<item id="4124063" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="5576" 			
			objectname="Dungeoneer: Tomb of the Lich Lord"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 03:44:57 +0000" 
			editdate="Tue, 08 Sep 2015 03:47:53 +0000"
			thumbs="6"
						imageid="242567">
	<body>In Dungeoneer&#039;, you take up the mantle of a great Hero set out to prove your valor in the Tomb of the Lich Lord. To triumph over your rivals, you will need to explore the labyrinth of corridors, defeat the heinous monsters, overcome nefarious traps and be the first to complete all your Quests. But beware, the gods are fickle and to test their Heroes even further, they often bestow upon them Banes as well as Boons.

Game Description:

This simple card game is very reminiscent of Wiz-War. Players are dealt one of 4 Heroes, each with varying movement, fighting and magic abilities. The Dwarf for example is very tough, but has no magic value at all. Each Hero also has a value for hit points, the amount of Treasure he can have (carry) at any time and also the number of &quot;Boons&quot; (special abilities) he may have. Players are dealt 3 quest cards initially in front of them (public knowledge) and have 5 Adventure cards in hand.

this game has solo variants!
</body>
	
		</item>
	<item id="4124067" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="162074" 			
			objectname="Darkfast Dungeons"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 03:49:13 +0000" 
			editdate="Tue, 08 Sep 2015 03:49:13 +0000"
			thumbs="0"
						imageid="2091617">
	<body>Darkfast Dungeons is a print and play tabletop game designed to provide a robust dungeon crawl experience in a couple of hours. A typical dungeon crawl will last 2-3 hours and provide a unique adventure with each game played.

There are many ways to play Darkfast Dungeons with rules and scenarios for co-operative games, competitive games and solo play.

The Darkfast Dungeons basic set includes 6 heroes, 12 monsters, a full set of game cards, rulebook and 26 customizable 2d tiles.
</body>
	
		</item>
	<item id="4124116" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="92316" 			
			objectname="DungeonWorld"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 04:27:55 +0000" 
			editdate="Tue, 08 Sep 2015 04:27:55 +0000"
			thumbs="0"
						imageid="929160">
	<body>Dungeon World is a rules system designed to allow players to use 10mm Pendraken Miniatures to conduct old school dungeon crawl adventures using heroes to battle terrible Monsters in the deep, dark places of the World.

These rules are for fantasy skirmish war gamers who like the idea of taking up table top gaming, but lack either the space to play a larger scale game, or who are reluctant to spend a kings ransom collecting 28mm heroes and monsters. Larger scale dungeon games tend to look rather flat and slightly abstract, unless the collector is prepared to put in a vast amount of time and energy to make the game stand out above the norm. Well, with 10mm miniatures you can not only play highly satisfactory skirmish games on the size of a small coffee table, but you can also buy your entire resin dungeon and a complete collection of miniatures for far less money than it might normally cost you to purchase even one fantasy army using the larger scale miniatures made by most mainstream game companies.
</body>
	
		</item>
	<item id="4124119" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="1202" 			
			objectname="The Sorcerer&#039;s Cave"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 04:30:15 +0000" 
			editdate="Tue, 08 Sep 2015 04:30:15 +0000"
			thumbs="2"
						imageid="339500">
	<body>A fantasy-based game, using cards to create an underground lair that players explore -– cooperatively or competitively -- using bands of characters, in an attempt to leave with the highest score (monsters defeated and treasure). Gaming decisions are relatively limited, but the fascination of the game lies in the changing setup and the &#039;story&#039; that is created on each occasion.</body>
	
		</item>
	<item id="4124120" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="1746" 			
			objectname="Dungeonquest: Catacombs"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 04:31:50 +0000" 
			editdate="Tue, 08 Sep 2015 04:31:50 +0000"
			thumbs="2"
						imageid="276631">
	<body>Dungeonquest Catacombs adds a new level of excitement to Games Workshop&#039;s award winning Dungeonquest game. This expansion set includes full rules and components for venturing into the dread Catacombs, as well as new traps, monsters, treasures and room tiles for you to encounter in the normal dungeon.</body>
	
		</item>
	<item id="4124122" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="1745" 			
			objectname="Heroes for Dungeonquest"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 04:32:52 +0000" 
			editdate="Tue, 08 Sep 2015 04:32:52 +0000"
			thumbs="2"
						imageid="479531">
	<body>Heroes for Dungeonquest is the first expansion set for the best-selling game of exploration, adventure and gruesome endings. Inside you will find 12 new foolhardy adventurers, ready to see if they can reap profit from a visit into the castle.</body>
	
		</item>
	<item id="4124199" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="84990" 			
			objectname="I-Magi-Nation"
			username="schattentanz" 
			postdate="Tue, 08 Sep 2015 05:43:35 +0000" 
			editdate="Tue, 08 Sep 2015 05:43:35 +0000"
			thumbs="3"
						imageid="840619">
	<body>One of my first designs.
It&#039;s a solitaire game created during a contest held by Todd Sanders. The contest was about using a certain kind of dice set (some trap dice, some dungeon dice, some monster dice and a colour die; as far as I know, none of them are available anymore..):

In tha nation of the I-Magi, you are thrown into one of their dungeons for their entertainment.
Can you find your way out or will you perish in the depths?
It borrows mechanics from [thing=42361][/thing] regarding the creation of the levels.</body>
	
		</item>
	<item id="4124205" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="63011" 			
			objectname="Patrol: Lost!"
			username="schattentanz" 
			postdate="Tue, 08 Sep 2015 05:48:59 +0000" 
			editdate="Tue, 08 Sep 2015 05:51:20 +0000"
			thumbs="6"
						imageid="621823">
	<body>Originally, in this PNP you are playing a squad of marines fighting their way through the jungle while another player plays the &quot;baddies&quot; trying to devour your squad.
Solitaire rules are provided, and to the left you can see a dungeon variant, too.

And always beware the Meepatrol:
[ImageID=652013 medium]</body>
	
		</item>
	<item id="4124212" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="43691" 			
			objectname="Delve: The Dice Game"
			username="Budapest" 
			postdate="Tue, 08 Sep 2015 05:56:44 +0000" 
			editdate="Tue, 08 Sep 2015 05:56:44 +0000"
			thumbs="7"
						imageid="498981">
	<body>This is a fun little PnP gem. Take your party through a mini-dungeon in the original or a desert quest in the second adventure. Roll dice to determine the outcome of battles verses the various monsters that occupy different &quot;rooms&quot;. The game has great artwork and fun gameplay.</body>
	
		</item>
	<item id="4124213" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="1927" 			
			objectname="Munchkin"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 05:56:47 +0000" 
			editdate="Tue, 08 Sep 2015 05:56:47 +0000"
			thumbs="5"
						imageid="1871016">
	<body>Go down in the dungeon. Kill everything you meet. Backstab your friends and steal their stuff. Grab the treasure and run.

Admit it. You love it.

This award-winning card game, designed by Steve Jackson, captures the essence of the dungeon experience... with none of that stupid roleplaying stuff. You and your friends compete to kill monsters and grab magic items. And what magic items! Don the Horny Helmet and the Boots of Butt-Kicking. Wield the Staff of Napalm... or maybe the Chainsaw of Bloody Dismemberment. Start by slaughtering the Potted Plant and the Drooling Slime, and work your way up to the Plutonium Dragon...

And it&#039;s illustrated by John Kovalic! Fast-playing and silly, Munchkin can reduce any roleplaying group to hysteria. And, while they&#039;re laughing, you can steal their stuff.

There are solo variant rules!</body>
	
		</item>
	<item id="4124214" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="24410" 			
			objectname="Treasures &amp; Traps"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 06:01:05 +0000" 
			editdate="Tue, 08 Sep 2015 06:01:26 +0000"
			thumbs="3"
						imageid="239163">
	<body>Treasures &amp; Traps is the adventure card game that puts you on a quest for riches. Each card can open the door to a tricky challenge, a magical assistance, or a valuable treasure.

The approximate playing time is 10-30 minutes for two players. Add 10 minutes for each additional player.

Be the first player to get a Gold, Silver, and Bronze TREASURE card into your realm. Your other cards give you the powers you will need to keep others from winning.

The game contains a full set of 100 unique Treasures and Traps Cards.

I created solo rules for this game:
http://boardgamegeek.com/article/18806863#18806863</body>
	
		</item>
	<item id="4124219" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="3625" 			
			objectname="DeathMaze"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 06:11:46 +0000" 
			editdate="Tue, 08 Sep 2015 06:11:46 +0000"
			thumbs="3"
						imageid="10438">
	<body>Deathmaze is a game for one to six players in which each player controls the actions of one or more adventurers exploring the depths of a horror filled catacomb in pursuit of glory and gold. Like fantasy role playing games, Deathmaze deals with personal heroic fantasy; unlike such games, Deathmaze requires no gamesmaster, but pits the players&#039; skills against an un-gamemastered game system.</body>
	
		</item>
	<item id="4124222" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="4746" 			
			objectname="Dungeons &amp; Dragons Computer Labyrinth Game"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 06:14:29 +0000" 
			editdate="Tue, 08 Sep 2015 06:14:29 +0000"
			thumbs="3"
						imageid="878157">
	<body>A GAME OF STRATEGY
 Play alone or against a rival warrior and the dragon computer. 2 skill levels.

A GAME OF SKILL
 Find your way through the labyrinth on a touch-sensitive electronic board. Electronic sounds help you locate labyrinth walls. Walls shift with each new game.

A GAME OF ADVENTURE
 Watch out! Electronic sounds tell you the dragon is after you. Find and steal the treasure before the dragon gets you, and you win!

Ok, I know it&#039;s a computer board game but it is a solo dungeon crawl game so it fits the list!</body>
	
		</item>
	<item id="4124228" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="1543" 			
			objectname="Dragon Quest"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 06:17:44 +0000" 
			editdate="Tue, 08 Sep 2015 06:17:44 +0000"
			thumbs="6"
						imageid="712862">
	<body>Fantasy miniature game. A typical Dragons &amp; Dungeon game. Requires a Game Master. The original game comes with 6 Ral Partha metal miniatures, 180 cards (featuring monsters, treasures, objects and traps), a dungeon board, D&amp;D dice, and three pre-made adventures (ISBN 1-56076-552-b)

Solo variant:
http://boardgamegeek.com/thread/534215/dragon-quest-without-dm-and-solo-play-variant</body>
	
		</item>
	<item id="4124234" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="2773" 			
			objectname="Knights of the Dinner Table: HACK!"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 06:21:30 +0000" 
			editdate="Tue, 08 Sep 2015 06:21:30 +0000"
			thumbs="2"
						imageid="178935">
	<body>This game consists of four unique character decks and 1 game master deck. It can be played with just two character decks or 1 to 4 character decks and a game master deck. The goal for the characters is to escape from the Tomb of Vectra. The game master&#039;s goal is to kill the characters. Each deck has a number of rooms, items, monsters, npcs, traps and rule changes. Characters generally try to foil each other&#039;s escape.

The game is somewhat similar to Abduction, another great game by Eden Studios, but definitely also very different.


Solo variant:
http://boardgamegeek.com/thread/367326/solitary-rules</body>
	
		</item>
	<item id="4124235" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="3794" 			
			objectname="Legend of Zagor"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 06:23:34 +0000" 
			editdate="Tue, 08 Sep 2015 06:23:34 +0000"
			thumbs="1"
						imageid="66417">
	<body>Odd game based on the RPG-like mechanics of the Fighting Fantasy books, with the exploration and dungeon crawling of TSR&#039;s Dungeon.

The game has superb plastic miniatures and board, and an electronic voice and game moderator similar to MB&#039;s The Omega Virus. This game, however, was only produced in Europe. The game was not much of a success, in large part because it came out a bit late to benefit from the hype of the Heroquest phenomenon.

Three-level Dungeon: The Chambers of Death, The Hall of Fear &amp; The Crypt of Zagor. 
</body>
	
		</item>
	<item id="4124241" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="1136" 			
			objectname="Domain: The Warlock&#039;s Challenge"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 06:26:06 +0000" 
			editdate="Tue, 08 Sep 2015 06:26:06 +0000"
			thumbs="1"
						imageid="240638">
	<body>Domain is very similar in nature to Dungeonquest from Games Workshop. Players start in opposite corners of the board and create a dungeon as they move along by placing randomly chosen tiles. The goal of the game is to reach the Treasure Chamber in the center of the board and escape back out again with some of the valuable artifacts contained therein. There are two ways the game can end. One way is that once someone escapes the dungeon with one of the Warlock&#039;s artifacts, they are declared the winner. The other way is that the players set a time limit. Once time is up, the game is over and players compare the value of the items they have accrued. The one with the highest ranked artifact is declared the winner. If no one has an artifact, then the player with the total highest value in items is the winner.

Players compete mainly against the board, though player-to-player conflict can happen in two rare instances. Players earn experience points for defeating denizens of the dungeon and laying tiles in their own quadrant, and this in turn improves their combat speed. The game components and rules are written in both English and German.
</body>
	
		</item>
	<item id="4124247" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="5199" 			
			objectname="The Lords of Underearth"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 06:29:53 +0000" 
			editdate="Tue, 08 Sep 2015 06:29:53 +0000"
			thumbs="2"
						imageid="175092">
	<body>Underearth is the ancient stronghold of the Dwarven Lords. This game covers the earthy realms&#039; full history: from the height of Dwarven power to its decline in the days of dragonfire and destruction. Here, you will lead bands of Humans, Dwarves, Orcs and monsters on raids, wars and treasure hunts.

&#039;The Lords of Undereath is a two player game of fantasy tactical combat in an underground labyrinth. The rules cover solitaire play, surprise attack, pursuit, morale, locked doors, sentries, flight, treasure, mercenaries and even uncontrolled movement. This game is a complete simulation of fantasy combat at the group (skirmish) level.

Lords of Underearth definitely pays off on its promises and then some. It&#039;s easy to learn. It plays fast. The board is geomorphic which helps replayability. Solitaire play actually works. Four clever scenarios are presented, all of them are fun, like the one that sure reminds us of Smaug and the Lonely Mountain or another that is suspiciously similar to the battle at the Bridge at Khazad-dûm. It&#039;s also compatible with Wizard &amp; Melee and The Fantasy Trip, although you&#039;d never want to play it that way.
</body>
	
		</item>
	<item id="4124249" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="1351" 			
			objectname="Legend of Heroes"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 06:31:21 +0000" 
			editdate="Tue, 08 Sep 2015 06:31:21 +0000"
			thumbs="1"
						imageid="49107">
	<body>In a far land there is a Legend, as old as time itself.
 The Legend tells of a green mountain...of an ancient dungeon labyrinth buried deep beneath it...and of the priceless treasures to be found there. It also tells of the fearsome monsters and deadly traps which await all who seek those riches, and how only the boldest and most resourceful of Heroes can ever hope to enter the dungeon...and return alive!

In the Starter Game, players take the parts of heroic warriors venturing alone into the labyrinth in search of fame and wealth. Great are the rewards, but great also are the dangers to be face along the way. In the Expanded Game, the warriors are joined by other heroic adventurers - magic-users, rogues, clerics and dwarves - as each player now pits a group of Heroes against the perils of the dungeon. Though each Hero brings his own special powers and there is strength to be gained in numbers, the dangers now are even more deadly!”
</body>
	
		</item>
	<item id="4124254" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="14077" 			
			objectname="Nin-Gonost"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 06:34:36 +0000" 
			editdate="Tue, 08 Sep 2015 06:34:36 +0000"
			thumbs="1"
						imageid="63526">
	<body>A dungeon-crawl adventure game that uses specialized colored dice for easy action resolution, and a magnetic modular board (like a magnetic Advanced Heroquest) to create the map, complete with doors that open. Adiken Miniatures are included, with stats on character cards. Basic rules allow for &quot;family&quot; play, while advanced rules allow for more &quot;gamer&quot; style play. Soloable.</body>
	
		</item>
	<item id="4124258" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="17720" 			
			objectname="Dungeon Bash"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 06:36:45 +0000" 
			editdate="Tue, 08 Sep 2015 06:36:45 +0000"
			thumbs="1"
						imageid="76888">
	<body>Dungeon Bash attempts to convert the well known D20 roleplaying system to a board game. It relies in part on the published rules from the D20 SRD (which are the free-to-use RPG rules from Wizards of the Coast).

In essence it&#039;s a dungeon crawl game like Warhammer Quest using tables to generate the dungeon and events. It can be played with or without a game master. For game master-less play it offers reaction charts to control how opponents handle themselves.

There are instructions on how to customize the game to use elements from other games, like the board tiles from Warhammer Quest.

Tagline:
 &quot;Your favorite Roleplaying game just became your favorite board game too!&quot;
</body>
	
		</item>
	<item id="4124265" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="25632" 			
			objectname="Legends of the Ancient World: The Sewers of Redpoint"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 06:40:41 +0000" 
			editdate="Tue, 08 Sep 2015 06:40:41 +0000"
			thumbs="2"
						imageid="148242">
	<body>The Sewers of Redpoint is a programmed adventure using Dark City Games Legends of the Ancient World rule set. These rules provide gameplay very similar to that of Melee and Wizard from Metagaming. This adventure is compatible with those games as well.

Battles are fought with counters on a hex map that is included with the game.

From the Publisher: &quot;When assassins stage a brutal raid at the Temple of the Sun Goddess, you answer the call for assistance. But as you track the raiders through the sewers beneath the city, an ancient horror wakens from its timeless sleep.&quot;
</body>
	
		</item>
	<item id="4124994" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="42415" 			
			objectname="Dungeon Crawl"
			username="Gr1mAce" 
			postdate="Tue, 08 Sep 2015 14:56:02 +0000" 
			editdate="Tue, 08 Sep 2015 15:09:12 +0000"
			thumbs="2"
						imageid="477138">
	<body>This is a PNP game. It&#039;s a light skirmish styled game. I read the rules and it has a few good things about it. Solo and Coop are acceptable as well as DM vs players. </body>
	
		</item>
	<item id="4125000" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="174430" 			
			objectname="Gloomhaven"
			username="Diederik" 
			postdate="Tue, 08 Sep 2015 14:58:26 +0000" 
			editdate="Tue, 08 Sep 2015 14:58:26 +0000"
			thumbs="12"
						imageid="2437871">
	<body>From the description on Boardgamegeek:
&quot;Gloomhaven is a game of Euro-inspired tactical combat in a persistent world of shifting motives. Players will take on the role of a wandering adventurer with their own special set of skills and their own reasons for travelling to this dark corner of the world. Players must work together out of necessity to clear out menacing dungeons and forgotten ruins. In the process they will enhance their abilities with experience and loot, discover new locations to explore and plunder, and expand an ever-branching story fueled by the decisions they make.

This is a game with a persistent and changing world that is ideally played over many game sessions. After a scenario, players will make decisions on what to do, which will determine how the story continues, kind of like a “Choose Your Own Adventure” book. Playing through a scenario is a cooperative affair where players will fight against automated monsters using an innovative card system to determine the order of play and what a player does on their turn.

Essentially, every turn a player will play two cards out of their hand. Each card has a number at the top, and the number on the first card played will determine their initiative order. Each card also has a top and bottom power, and when it is a player’s turn in the initiative order, they determine whether to use the top power of one card and the bottom power of the other, or vice-versa. Players must be careful, though, because over time they will permanently lose cards from their hands. If they take too long to clear a dungeon, they may end up exhausted and be forced to retreat.&quot;

You can find the PnP file for the first scenario on their Kickstarter page.
(Shortcut: https://www.kickstarter.com/projects/1350948450/gloomhaven )</body>
	
		</item>
	<item id="4125002" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="126340" 			
			objectname="Baldrick&#039;s Tomb"
			username="Gr1mAce" 
			postdate="Tue, 08 Sep 2015 14:58:48 +0000" 
			editdate="Tue, 08 Sep 2015 14:58:48 +0000"
			thumbs="4"
						imageid="1738206">
	<body>Light fantasy push your luck game. Family friendly. Solo rules within. </body>
	
		</item>
	<item id="4125047" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="53953" 			
			objectname="Thunderstone"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 15:25:08 +0000" 
			editdate="Tue, 08 Sep 2015 15:25:08 +0000"
			thumbs="6"
						imageid="544780">
	<body>For ages the vile Doom Knights have sought to gather the remaining Thunderstones to fulfill a prophecy of corruption over the lands. Now the first Thunderstone has been discovered in the Dungeons of Grimhold and the Doom Knights have sent their minions to claim the relic. The Villagers of Barrowsdale gather brave souls to face the dungeon and keep the Thunderstone out of the hands of the Doom Knights.

Thunderstone is a fantasy deck-building game much in the style of Dominion. Before the game starts a selection of Village and Hero cards will be randomnly chosen that players may add to their specific decks. Like Dominion, every player starts with a basic deck of weaker cards that they can use to purchase other more powerful cards. In Thunderstone these cards may be different Heroes such as mages, archers, thieves, or warriors or they may be supplies the heroes need like weapons, rations, or light to reach further into the dungeon.

A dungeon deck is also created by combining several different groups of monsters together. Certain groups of monsters may be more or less susceptible to different Hero types so players will have to take this into account when they choose what to buy.

Rather than buying puny Victory Points, player&#039;s will use their deck to defeat monsters in the dungeon. From the monster deck a row of cards is laid out. Players may on their turn choose to attack a monster in the deck rather than visit town and buy cards. If they do this they play cards from their hand and resolve their abilities in order to boost strength and have enough light to reach a specific monster. Some monsters also have special abilities which may hinder the player. If they have enough strength they defeat the monster and place that card in their deck. This card is worth victory points and often can be used as money to purchase other cards. In addition to this players are awarded experience points for defeating monsters which can be used to upgrade their heroes into more powerful versions. The game is played until the Thunderstone is revealed from the dungeon and a player is able to claim it. The player with the most victory points in their deck is the winner.
</body>
	
		</item>
	<item id="4125049" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="29581" 			
			objectname="Tomb"
			username="Gr1mAce" 
			postdate="Tue, 08 Sep 2015 15:25:25 +0000" 
			editdate="Tue, 08 Sep 2015 15:25:25 +0000"
			thumbs="4"
						imageid="295554">
	<body>This is a multiplayer tomb raiding, Ameri-roll, back-stabbing romp of a game. I came up with a decent but not &quot;perfect&quot; solo/coop for it that makes the grade. I imagine if you have the game, it couldn&#039;t hurt you to try this on your own. 

I&#039;ll post the variant: 

http://boardgamegeek.com/thread/1165121/solovariant-forgotten-tomb-ancient-kings</body>
	
		</item>
	<item id="4125057" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="17729" 			
			objectname="Death Test"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 15:26:44 +0000" 
			editdate="Tue, 08 Sep 2015 15:26:44 +0000"
			thumbs="0"
						imageid="77984">
	<body>Death Test was MicroQuest #1 in the Metagaming MicroQuests series, programmed adventures for Melee and Wizard.

The Death Tests are basic slash-n-grab adventures. There&#039;s no plot and no objective other than to get out alive with all the booty you can carry. This is a good way to get accustomed to the game and to build up characters&#039; statistics. These games introduced the Thorsz, who re-appears in Orb Quest (MQ #8).
</body>
	
		</item>
	<item id="4125068" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="43161" 			
			objectname="Epic Adventure Dungeon Crawl"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 15:29:52 +0000" 
			editdate="Tue, 08 Sep 2015 15:29:52 +0000"
			thumbs="1"
						imageid="824020">
	<body>Introduction
 If it’s adventure and excitement you are looking for, you have come to the right place brave adventurer. The time has come to prove your worth. Are you willing to show us your prowess with the blade, your stealth and cunning or your mastery of the magic arts? Whatever path you choose, adventure awaits.

Dungeon Crawl™ is primarily designed as a single player game set in a dungeon environment within a generic fantasy setting. The player chooses a character class to play (thief, fighter or sorcerer), rolls up the character’s attributes and places its starting equipment on the adventure sheet. The player then moves the character through the dungeon overcoming monsters, obstacles and traps in an attempt to find the dungeon’s random finale card and win the game. This game uses the game system that we created for the EA game books. Each game should take 20 – 30 minutes to play and because of the random manor of the game, each game should be very different to the previous one.

Variations
 Several card variations, each with their own unique set of monsters, traps and treasure cards will be available for download soon. These include The Forest adventure add-on pack, Evil swamp add-on pack and The City of Evil add-on pack.
 You, the player, create a character and lower yourself into the random dungeon. This game has been designed so that it plays different every time: different maps, monster encounters, traps and finale card.</body>
	
		</item>
	<item id="4125077" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="148694" 			
			objectname="Dungeon of Deadliest Evil"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 15:32:15 +0000" 
			editdate="Tue, 08 Sep 2015 15:32:15 +0000"
			thumbs="3"
						imageid="1805060">
	<body>The mad sorcerer Grislyk has stolen the Book of Lore from the elves and hidden it in his dungeon lair. As the elven warrior maiden Kora, you must brave three increasingly dangerous levels to recover the Book, destroy Grislyk’s magical Black Crucible, and slay the wizard himself. Magical artifacts will help you evade Grislyk’s traps and slay his army of goblins and skeletons, but you will also need your wits and a bit of luck, for knowing when to search, when to fight, and when to run is the only way to survive the DUNGEON OF DEADLIEST EVIL.

Dungeon of Deadliest Evil is a solitaire adventure game that takes all the essential elements of a classic dungeon crawl, like slaying monsters, finding powerful artifacts, and exploring a multi-level dungeon, and packs them into an easy-to-learn game that sets up and plays in 20 minutes.

Gameplay is based on a simple dice allocation mechanic. You have three abilities, Speed, Combat, and Defense, and at the start of each turn you must assign one of three dice (a d4, a d6, and a d8) to each of them. While the game involves a good deal of luck and dice-rolling, judicious dice allocation is the key to success. Victory is achieved by destroying the Black Crucible, retrieving the Book of Lore, slaying the evil wizard Grislyk, and finally leaving the dungeon alive.
</body>
	
		</item>
	<item id="4125087" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="133038" 			
			objectname="Pathfinder Adventure Card Game: Rise of the Runelords – Base Set"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 15:34:08 +0000" 
			editdate="Tue, 08 Sep 2015 15:34:08 +0000"
			thumbs="8"
						imageid="1775517">
	<body>A forgotten evil stirs in the ancient land of Varisia. Dark magic once more thrums amid crumbling ruins, giants gather in titanic armies, cultists murder in the name of foul deities, and maniacal goblins plot a fiery end for the peaceful town of Sandpoint.

Launch a campaign to strike back against the evils plaguing Varisia with the Pathfinder Adventure Card Game: Rise of the Runelords - Base Set. This complete cooperative strategy card game pits 1 to 4 heroes against the traps, monsters, deadly magic, and despicable foes of the Pathfinder Roleplaying Game&#039;s award-winning Rise of the Runelords Adventure Path. In this game players take the part of a fantasy character such as a rogue or wizard, each with varying skills and proficiencies that are represented by the cards in their deck. The classic ability scores (Strength, Dexterity, etc.) are assigned with different sized dice. Players can acquire allies, spells, weapons, and other items. The goal is to find and defeat a villain before a certain number of turns pass, with the villain being represented by its own deck of cards complete with challenges and foes that must be overcome. Characters grow stronger after each game, adding unique gear and awesome magic to their decks, and gaining incredible powers, all of which they&#039;ll need to challenge greater threats in a complete Pathfinder Adventure Card Game Adventure Path.

The Pathfinder Adventure Card Game is an expandable game, with the first set containing nearly 500 cards. The Rise of the Runelords - Base Set supports 1 to 4 players; a 110-card Character Add-On Deck expands the possible number of players to 5 or 6 and adds more character options for any number of players. The game will be expanded with bimonthly 110-card adventure decks.
</body>
	
		</item>
	<item id="4125090" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="27627" 			
			objectname="Talisman (Revised 4th Edition)"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 15:36:34 +0000" 
			editdate="Tue, 08 Sep 2015 15:36:34 +0000"
			thumbs="9"
						imageid="332870">
	<body>Talisman is an adventure board game set in a high fantasy medieval world. Players have 14 characters to choose from all based on role playing archetypes, such as heroes, wizards, villains, thieves, monsters, etc. The game makes players feel they are traveling the world to find equipment, weapons, ancient relics, and companions that will help them on their quest to acquire the Crown of Command. Along the way they visit various locales in the worlds, battle each other and fantastic creatures to make their way to the top.

Goal:

Each player is trying to move from the outer world and ultimately to the inner world. Players wander the outer, middle, and inner worlds trying to acquire equipment, weapons, and companions. They will also improve statistics with equipment, companions, and encounters and battles with fantasy creatures and each other. Once they complete a Talisman quest, players will enter the inner world and face its challenges to finally reach the Portal of Power to claim the Crown of Command. Then the other players must race to stop this player before he eventually kills them all with the Command spell.

Gameplay:

To begin, players select a character card from among the 14 provided. Characters have basic statistics to start. These are Life [hit points], Strength [physical prowess], and Craft [Magic and Intelligence]. Some characters are naturally more gifted in combat and others in magic, while others are mix of the two. Additionally characters are often differentiated with unique abilities, starting equipment, and starting spells. This all makes the players actually feel different during play. In addition items and companions players acquire during play also add to statistics, increasing Strength, Craft, Life or adding new abilities, etc.

Actual game play is relatively simple, making the game easy to pick up with novices. On a player&#039;s turn they throw a die for movement. Player then chooses which direction, left or right, or if meeting qualifications may be able to move from outer to middle world, or middle to inner world. Once on space, player follows instructions on space, or encounters face up cards already in space, or other player if in space. Most spaces have a player draw a number of cards to encounter. These can be creatures, companions, weapons, equipment, treasure, or relics. Players must fight creatures and win before acquiring any other items or companions. If another player is in the space, players may attack with either Craft or Strength but are not required to do so. The defender defends with same statistic attacked with. If the defender loses, he loses a life and an item or companion of attackers choice. If the attacker loses, he loses a life.

Players start in the outer world, and build up their character&#039;s statistics and items to try and move to the middle world. There are two ways to move up to the middle world, one requiring a test of strength and the other a boat man&#039;s ride for a price. Once in the middle world, play proceeds in the same manner, but the challenge generally is increased with more threats such as the desert and temple. However, there is more potential for encounters and items as most spaces now draw more than one card.

In the middle world, players may also acquire a Talisman quest, that once completed, will grant them a Talisman. The Talisman is required to unlock the Crown of Command and pass through the Portal of Power in the Inner World.

Once players have a Talisman and have enough Strength or Craft to enter the Portal of Power, they will try to enter the Inner World. There they must face and survive the guardians there, like the Vampire&#039;s Tower and Werewolf before claiming the Crown of Command. Once a player claims the Crown of Command, they can cast the Command Spell, automatically forcing a player to lose a life. It then becomes a race for the Crown as the other players try to take the player with the Crown down before he finishes them all off.

This game has solo variants available!</body>
	
		</item>
	<item id="4125099" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="172220" 			
			objectname="Dungeons &amp; Dragons: Temple of Elemental Evil Board Game"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 15:38:38 +0000" 
			editdate="Tue, 08 Sep 2015 15:38:38 +0000"
			thumbs="5"
						imageid="2496558">
	<body>In the Dungeons &amp; Dragons: Temple of Elemental Evil Board Game, you play as a heroic adventurer. With amazing abilities, spells and magic weapons, you must explore the dungeons beneath the Sword Coast where you will fight monsters, overcome hazards and find treasure. Are you ready for adventure?

Temple of Elemental Evil includes multiple scenarios, challenging quests, and co-operative game play designed for 1-5 players. The contents can also be combined with other D&amp;D Adventure System Cooperative play board games, including The Legend of Drizzt and Castle Ravenloft.

Each player selects a hero, such as a fighter, cleric, or wizard. On their turn, each player can explore further into the dungeon (turn over new tiles), move through the already explored parts of the dungeon, and fight monsters. When a new dungeon tile is revealed, there is typically an encounter of some sort, and new monsters to fight are added. Slain monsters reward the players with treasure, and experience points, allowing them to level up and increase their skills during play. Players must cooperate to stay alive, slay the monsters, and achieve the goal of their quest. Each scenario has a different goal, from retrieving a relic to slaying a large boss monster.
</body>
	
		</item>
	<item id="4125211" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="160081" 			
			objectname="Dungeon Saga: Dwarf King&#039;s Quest"
			username="kingspud" 
			postdate="Tue, 08 Sep 2015 16:23:35 +0000" 
			editdate="Tue, 08 Sep 2015 16:23:35 +0000"
			thumbs="3"
						imageid="2619701">
	<body>Over a thousand years ago, Valandor, the greatest known hero fell in battle, fighting to protect the lives of those around him. From shore to shore, all owe thanks to his wondrous legacy. Now, sacred sites across the land have been defiled and plundered by the disgraced wizard Mortibris, who along with his vile undead minions will stop at nothing to obtain the secrets of Valandor’s power. Only the bravest heroes dare oppose him. Thrown together from the far corners of the realm, they step boldly into the depths, ready to face whatever foul evil awaits them…

Hero, your quest begins here!

Embark on a fantasy adventure for up to five players with Dungeon Saga: Dwarf King&#039;s Quest. With highly detailed game-pieces and learn-as-you-play rules, this set contains everything you need to transform your tabletop into a deep and immersive world of heroes and monsters. Play a single game in just 30 minutes, or combine the carefully composed adventures for countless hours of classic quest gameplay. When the fate of the world hangs in the balance, which part will you play in the epic Dungeon Saga?
  
 -Epic, story-driven campaign
 -Classic quest atmosphere
 -Easy rules you can learn as you play
 -Characters that develop as the adventure unfolds
 -Beautifully illustrated 3D dungeons with doors, barrels, bookcases and more!
 -26 detailed and fully assembled miniatures in coloured plastic
 -Evocative ‘ancient tome’ packaging in a protective sleeve

One player takes the part of the evil dungeon overlord with the forces of evil at his command, and the others divide the mighty heroes between them. Each hero has strengths and weaknesses and teamwork is the key: The mighty barbarian can slaughter many foes at a time, yet he is lightly armoured and vulnerable to strong enemies. The Dwarf, on the other hand, is steadier as his thick armour can resist most attacks. The Elf is not as skilled a fighter as either of these, instead preferring to stay at a distance where her finely-honed archery skills can best be used. Finally, there is the wizard -the others may laugh at his lack of fighting skill, yet it is often his magic that carries the day. If the others can keep him alive, that is.

This core set will be supported with a raft of expansion products as time goes on, adding new challenges and game modes to your Dungeon Saga. The first of these will be Adventurer&#039;s Companion which will add an AI system for solo and fully co-operative play, the ability to create unique characters from scratch using any model in your collection, the tools you need to design your own dungeons and much more!
</body>
	
		</item>
	<item id="4125427" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="1560" 			
			objectname="Hero"
			username="wandererdog" 
			postdate="Tue, 08 Sep 2015 17:55:11 +0000" 
			editdate="Tue, 08 Sep 2015 17:56:06 +0000"
			thumbs="2"
						imageid="133374">
	<body>The publisher&#039;s description:
Hero is a wild, no holds barred man-to-man (or beast) game on two levels. Players control their own Hero in their portion of the maze as well as monsters in their opponents portion. Each Hero is composed of several categories: Intelligence, Physical Appearance, Class, Strength, Luck, Hits, and Weapons Proficiency. Each of these must be determined by the player from a fixed number of points. To make a Hero super-strong will mean that some other category must suffer (super-strong and a lackwit?). 

Monsters include such loathesome creatures as trolls, ogres, zombies, goblins, lycanthropes, men, and the horribly alluring succubus. Each has an offensive potential as well as a defensive capability based on the type of creature vs. the Hero&#039;s weapon and how mightily he wields it. 

Your Hero must avoid traps, slaughter monsters, gather gold, and make it to the end of the labyrinth to win the hand of the stunning, voluptuous daughter of the most powerful wizard in the land. If the Hero does not there are always other challenges, unless he has become a Dead Hero.

</body>
	
		</item>
	<item id="4125665" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="43693" 			
			objectname="Delve the Card Game"
			username="Jude" 
			postdate="Tue, 08 Sep 2015 19:33:44 +0000" 
			editdate="Tue, 08 Sep 2015 19:33:44 +0000"
			thumbs="2"
						imageid="498963">
	<body>A free print-and-play solitaire card game.  Also the Super Delve variant is available in the files section.</body>
	
		</item>
	<item id="4126722" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="699" 			
			objectname="HeroQuest"
			username="Sjeng" 
			postdate="Wed, 09 Sep 2015 06:41:22 +0000" 
			editdate="Wed, 09 Sep 2015 06:41:22 +0000"
			thumbs="8"
						imageid="338410">
	<body>Amazingly fun and simple dungeon crawler. Coop with a DM, but also playable solo or fully coop with variants!

http://boardgamegeek.com/thread/236008/solo-or-cooperative-play-without-dungeon-master

And there are quite a few variants on the HQ forums of Ye Olde Inn: www.yeoldeinn.com</body>
	
		</item>
	<item id="4126726" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="36932" 			
			objectname="Claustrophobia"
			username="Sjeng" 
			postdate="Wed, 09 Sep 2015 06:42:34 +0000" 
			editdate="Wed, 09 Sep 2015 06:42:34 +0000"
			thumbs="7"
						imageid="570518">
	<body>1 versus 1 dungeon crawler, but with a solo variant!

http://boardgamegeek.com/thread/1219187/solophobia

Great game!</body>
	
		</item>
	<item id="4126730" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="1339" 			
			objectname="Dungeon!"
			username="Sjeng" 
			postdate="Wed, 09 Sep 2015 06:43:38 +0000" 
			editdate="Wed, 09 Sep 2015 06:44:56 +0000"
			thumbs="6"
						imageid="1998857">
	<body>At the 5th edition right now I believe, a fun dungeon crawl from way back in &#039;75!
Coop, but in the end there is a winner, so there is also some competetiveness.</body>
	
		</item>
	<item id="4127443" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="6366" 			
			objectname="Dungeons &amp; Dragons: The Fantasy Adventure Board Game"
			username="kingspud" 
			postdate="Wed, 09 Sep 2015 13:08:55 +0000" 
			editdate="Wed, 09 Sep 2015 13:08:55 +0000"
			thumbs="2"
						imageid="681985">
	<body>operative dungeon crawl game in which a party of four heroes strives to complete adventures that the Dungeon Master puts before them. Quite similar to HeroQuest.</body>
	
		</item>
	<item id="4127467" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="1149" 			
			objectname="Dragon Strike"
			username="Sjeng" 
			postdate="Wed, 09 Sep 2015 13:14:22 +0000" 
			editdate="Wed, 09 Sep 2015 13:14:22 +0000"
			thumbs="5"
						imageid="897658">
	<body>Originally a coop game with 1 DM player, but there are some houserules to give the monsters a set A.I.
The game also has 1 solo scenario to play called the Dragon&#039;s Egg.

https://boardgamegeek.com/thread/573426/silver-scepter-solo-co-op
https://www.boardgamegeek.com/article/5649321#5649321

The game has 2 double sided boards, and one of them is definately a cavern, which I think fits in the dungeon crawl category. It also has a castle, town and an outdoors/forest map.</body>
	
		</item>
	<item id="4127471" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="160902" 			
			objectname="Dungeons &amp; Dragons Dice Masters: Battle for Faerûn"
			username="kingspud" 
			postdate="Wed, 09 Sep 2015 13:14:56 +0000" 
			editdate="Wed, 09 Sep 2015 13:14:56 +0000"
			thumbs="1"
						imageid="2391607">
	<body>Dungeons &amp; Dragons Dice Masters: Battle for Faerûn is a game that utilizes WizKids Games&#039; proprietary Dice Building Game platform in which two players take the role of warlords, collect and assemble their &quot;party&quot; of adventurer dice and battle in head-to-head gameplay. Each turn, players roll the dice to see what resources they have available, buy dice, send their party members into the field, and then strike at the enemy warlord. There are multiple cards available for each type of die so players get to choose which one to use. This lets players specialize dice to suit play style.

Additional cards and dice to expand your collection can be found in expansion packs. Each Foil Pack contains two cards and two dice that players can add to their Dice Masters Battle for Faerûn collections. Players can create teams of their favorite fantasy characters from the Forgotten Realms universe. You can expect to see some of the most recognizable monsters and characters, such as Kobolds, Beholders, Mindflayers, Dragons, Drow, and many more!

The Dungeons &amp; Dragons Dice Masters line will consist of starter sets, booster packs, play mats, and a storage box.



Solo variant:
https://www.boardgamegeek.com/thread/1348119/solo-variant-pdf</body>
	
		</item>
	<item id="4127483" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="156548" 			
			objectname="Super Dungeon Explore: Forgotten King"
			username="Sjeng" 
			postdate="Wed, 09 Sep 2015 13:22:08 +0000" 
			editdate="Wed, 09 Sep 2015 13:22:08 +0000"
			thumbs="6"
						imageid="2308707">
	<body>Super Dungeon Explore didn&#039;t have a coop mode, but with Forgotten King, there is a variant for coop play, and the game is compatible with the original game! So now you can play all SDE coop :)

[q]Forgotten King contains two play modes: Classic Mode, in which someone controls the dungeon and its monsters while everyone else takes the roles of the plucky heroes, or Arcade Mode, which allows for a fully co-operative game for up to five players.

Forgotten King, while itself a standalone game, is compatible with all previously published Super Dungeon Explore expansions and supplements.[/q]</body>
	
		</item>
	<item id="4127533" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="144383" 			
			objectname="Dungeon Dwellers"
			username="kingspud" 
			postdate="Wed, 09 Sep 2015 13:39:19 +0000" 
			editdate="Wed, 09 Sep 2015 13:39:19 +0000"
			thumbs="0"
						imageid="2042613">
	<body>Dungeon Dwellers is a fantasy adventure card game that requires strategy, cooperation, and cunning. This game is recommended for 2-4 players. Each player will take on the role of an adventurer seeking gold. Along the way, adventurers will gain treasure, magic items, abilities, and level increases by defeating monsters within the dungeon. The winner will be the player who collects the most gold at the end of the game.

To play, each player selects a Character (Rogue, Priest, Mage, and Fighter). All Characters have their own special ability, weapons, armor and item cards. Players will build a 30-card deck, also called the Energy Deck, with these cards. The deck will be used to power abilities, do damage to monster and will also be used to gain additional treasure, in the form of gold cards, or items and abilities to put into active play.

Players then take turns using their abilities and weapons to cause damage and collect experience points from monsters. Players will use their energy deck throughout the game, but if they spend too much energy, they might not have enough to survive the final boss. Can your party work together and survive the dungeon or feel the agony of defeat. In the end there can be only one winner and that is the player with the most gold.


Co-op rules:
https://www.boardgamegeek.com/thread/1285019/co-op-rules</body>
	
		</item>
	<item id="4127557" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="140951" 			
			objectname="Thunderstone: Starter Set"
			username="kingspud" 
			postdate="Wed, 09 Sep 2015 13:44:14 +0000" 
			editdate="Wed, 09 Sep 2015 13:44:14 +0000"
			thumbs="2"
						imageid="1647385">
	<body>In the Thunderstone line of deck-building games, you build a party of heroes to defeat the dreaded Thunderstone Bearers in their dungeons or in the wilderness. As the game progresses, you gain powerful weaponry and level into new and mighty hero classes. Your goal is to claim the best cards and survive to take the Thunderstone.

Thunderstone: Starter Set includes just enough for new players to get started in the world of Thunderstone Advance, while also providing new hero, monster and village cards that experienced players can bring to their game. This introductory set includes an easy set-up designed to get people started on the game in minutes.

Solo rules on the website</body>
	
		</item>
	<item id="4128054" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="11177" 			
			objectname="Cardmaster: Adventure Design Deck"
			username="Tahndur" 
			postdate="Wed, 09 Sep 2015 17:24:02 +0000" 
			editdate="Wed, 09 Sep 2015 17:24:02 +0000"
			thumbs="4"
						imageid="202577">
	<body>Decent 1 to 4 player roguelike Dungeon romp, which I personally think works best with solo play, It used a neat tri color system to randomize the 3 levels of the dungeon, had variable quest goals. and a fair share of monsters, traps, and treasures to find. In addition to the game itself, a slightly imaginative DM could use the dungeon decks varied card artwork to generate some decent o the fly maps for PCs to explore. At one time I owned 2 copies of this but alas, I lost them to a heartbreak. Ces&#039;t la Vie.</body>
	
		</item>
	<item id="4128066" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="127398" 			
			objectname="Legends of Andor"
			username="davekuhns" 
			postdate="Wed, 09 Sep 2015 17:29:26 +0000" 
			editdate="Wed, 09 Sep 2015 17:29:26 +0000"
			thumbs="5"
						imageid="2606106">
	<body>A cooperative and very solo-able fantasy adventure game with a distinctly different feel. The planning and calculations needed to win are quite fun and puzzly each time. 
Legend 4 is in a mine, but all else is overland currently.</body>
	
		</item>
	<item id="4128123" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="98527" 			
			objectname="Gloom of Kilforth: A Fantasy Quest Game"
			username="ninjadorg" 
			postdate="Wed, 09 Sep 2015 17:51:28 +0000" 
			editdate="Wed, 09 Sep 2015 17:51:28 +0000"
			thumbs="15"
						imageid="2645259">
	<body>Gloom of Kilforth is a card game of high fantasy with a Gothic edge, playable in 1-3 hours, where 1-4 heroes (ages 12 and up), working individually or together, must take their humble adventurers on a journey through a dark world of magic and peril. They will visit strange places and stranger people and overcome powerful enemies in their mission to discover mysterious artefacts and mystical spells. Players follow their hero’s tale from modest beginnings through an epic story to an exciting climactic battle for the fate of the world. 

Gloom of Kilforth takes about 50 minutes per player to play and can be played competitively, cooperatively, or fully solo (solo players may use from 1-4 heroes). The game has been in development for over 8 years and has been play-tested by hundreds of players around the world to reach its current form.</body>
	
		</item>
	<item id="4129641" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="7389" 			
			objectname="The Castle"
			username="MichaelLavoie" 
			postdate="Thu, 10 Sep 2015 10:03:17 +0000" 
			editdate="Thu, 10 Sep 2015 10:03:17 +0000"
			thumbs="2"
						imageid="30144">
	<body>Simple &quot;rescue the princess from the dungeon&quot; game that uses a fixed map.  The Princess is always found in the Cell; one monster chit and one treasure chit are always found in every other room, with random setup of those chits being the source of variability and, theoretically, allowing repeated play.  In practice, there&#039;s not much going on here but there are worse ways to pass some time.  For 1-6 players.

</body>
	
		</item>
	<item id="4129903" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="167190" 			
			objectname="Of Dungeons Deep! (Second Edition)"
			username="kingspud" 
			postdate="Thu, 10 Sep 2015 13:16:14 +0000" 
			editdate="Thu, 10 Sep 2015 13:16:14 +0000"
			thumbs="1"
						imageid="2296514">
	<body>Bluffing and Blind Bidding. Players are attempting to destroy the nasty creatures below in the dungeon to gain fame by playing cards face down and revealing simultaneously. Each enemy has a set number of hit points based on the number of players. There are three enemies to deal with in each level of the dungeon, so strategy, tactics, and bluffing are a must. There is also two rounds of bidding so players gain insight into what other players are up to.

Deck Building. When a player defeats an enemy, that card is rotated 180 degrees and then added to the player&#039;s discard pile. The bottom of each monster card indicates what item the enemy is carrying. These items add power to your character in future rounds, and act as an organic and thematic way to show that your characters are advancing.

Draft Your Unique Party. Before play begins, players complete a draft in order to create their starting hand of twelve cards. Each player gets one Hero and one Henchman. All characters are very unique and play quite differently from one another. This sets the bar high for replay value!

No Down Time! Since all play is done simultaneously, no players are ever waiting on others for very long. This makes Of Dungeons Deep! one of the fastest dungeon delvers out there.

Solo play stated in the rules!
</body>
	
		</item>
	<item id="4129909" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="87113" 			
			objectname="RAID: Random Adventures In Dungeons"
			username="kingspud" 
			postdate="Thu, 10 Sep 2015 13:21:41 +0000" 
			editdate="Thu, 10 Sep 2015 13:21:41 +0000"
			thumbs="1"
						imageid="1779566">
	<body>RAID - Random Adventures in Dungeons is a fast-paced, card/board game new from Double Aye Games. Enter an ever-changing world where no two games will ever be the same. Battle monsters while seeking untold riches and the way out of the dungeon. Work with your friends, or leave them to be eaten by the monsters while you take off with the loot!

Choose from 7 customizable character types: Wizard, Warrior, Archer, Monk, Paladin, Thief, or Cleric.
 Enhance your character with weapons and armor you get from your battles. Watch out for traps!
 There is a new surprise around every corner and no 2 dungeons are ever the same.

Useful as a tool for teaching math skills to kids and adults. Uses addition, subtraction, greater than, less than, and multiplication.
</body>
	
		</item>
	<item id="4129971" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="145793" 			
			objectname="Dungeon Attack!"
			username="kingspud" 
			postdate="Thu, 10 Sep 2015 13:45:46 +0000" 
			editdate="Thu, 10 Sep 2015 13:45:46 +0000"
			thumbs="0"
						imageid="1734960">
	<body>Dungeon Attack! is a fast-paced, action packed dice game where you and your friends venture into an ancient dungeon, defeat angry monsters, and search for treasure.

Each die represents a monster. A single die is a strong monster while rolling a handful of dice represents weak minions fighting at their master&#039;s will.

The game pack easily accommodates four players and more can join in on the fun with additional dice packs.
</body>
	
		</item>
	<item id="4129986" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="9142" 			
			objectname="HeroQuest: Dungeons of Peril"
			username="kingspud" 
			postdate="Thu, 10 Sep 2015 13:52:27 +0000" 
			editdate="Thu, 10 Sep 2015 13:52:27 +0000"
			thumbs="1"
						imageid="40316">
	<body>Dungeons of Peril is the collective name for my first four expansions for Hero Quest, a fantasy board game published by Games Workshop in conjunction with Milton Bradley.

The 4 expansions are:

1) Heroes of the Empire - Play one of 16 new Heroes - Cleric, Warrior-Monk, Mystic, Shapeshifter, Paladin, Halfling Thief, Alchemist, Wood Elf Mage, Vampire Hunter, Rogue, Elf Archer, Weaponmaster, Imperial Ogre, Troll Wizard, Dwarf Ranger, and Shadow Walker. This set includes 16 full-color Hero cards; 24 cards with new spells, equipment, etc. for these Heroes; a reference sheet with new Potions and Items; and a 4-page rulebook.

2) Endless Dungeons - Create a virtually endless number of dungeons with this set. It includes 32 different full-color dungeon tiles, a 10-page rulebook detailing the Special Tiles (with new traps, monsters, etc.), and a double-sided reference sheet. There are 16 standard tiles (4 of each of the following types: Corridor, Small Room, Medium Room, and Large Room), 2 Stairs tiles, and 14 Special Tiles. Use the tiles to create pre-generated dungeons, or create random ones in just a few minutes.

3) Servants of Darkness - This is a set of full-color 3-D stand-ups to use instead of miniatures. The set includes 128 stand-ups - 19 different Heroes, 8 Mercenaries, and 64 different monsters (there are multiple stand-ups for the mercenaries and some monsters). The stand- ups are (roughly) to scale and vary in size, from the standard human size to the very large Dragon and Rock Giant. Also included is a 14-page rulebook for using ALL of the monsters in Heroquest.

4) Perilous Quests – This expansion provides instructions on how to create and populate an entire dungeon. The rules walk you through how to create the dungeon and how to fill it with monsters, traps, dungeon features (like a Magic Mirror or strange Mould), and special rooms. This is done using two new types of cards (Encounter and Search). You can create an entire dungeon in just a few minutes. The rules are designed to allow as much flexibility as desired when creating a dungeon. The rules can be used for pre-generated quests, but they also allow you to play without a game master and are ideally suited for SOLO play! Finally, the Dungeon Bash rules allow parties of Heroes to go head-to-head!

Perilous Quests includes the following: 20 new Artifact cards, 16 Search cards, 8 Encounter cards, 4 Lich spells, 8 new Chaos spells, 8 Chaos monster cards (4 Sorcerers and 4 Chaos Spawn), 8 Elemental monster cards, and a sheet of dungeon counters (representing various special features).
</body>
	
		</item>
	<item id="4130022" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="126029" 			
			objectname="Dungeon Crawler: Mines of Khurgan"
			username="kingspud" 
			postdate="Thu, 10 Sep 2015 14:07:34 +0000" 
			editdate="Thu, 10 Sep 2015 14:07:34 +0000"
			thumbs="2"
						imageid="1536998">
	<body>In Dungeon Crawler ECG your party of adventurers face off against terrain, traps, events and characters using equipment, magic, skills and tactics to try and complete 2 out of 3 quests or just to survive the dungeon!

Each round cards are drawn from the dungeon to face off against, and the player must strategize the best way through each encounter. This game starts off in Story Mode, but can expand for Multi-player.

The Mines of Khurgan really adds some brutal combinations to the mix! This expansion focuses around a tribe of Kobolds and their deadly traps. The heroes plunge down in to the mines to face the Kobold Shaman Squee or to face the ghost of Khurgan himself!

Mines of Khurgan introduces a new Adventurer (Ice Dwarf Explorer), a new Quest (Divine Plan) and 16 new crawler and dungeon cards.

The expansion totals 82 all new cards with 34 new pieces of art and a punch cardstock card for eight additional tokens and a new Challenger token.

This is not a game in itself, but an expansion pack.
</body>
	
		</item>
	<item id="4130025" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="147635" 			
			objectname="Dungeon Crusade"
			username="kingspud" 
			postdate="Thu, 10 Sep 2015 14:09:21 +0000" 
			editdate="Sat, 16 Jul 2016 04:17:51 +0000"
			thumbs="2"
						imageid="3038088">
	<body>Hello all, I hope your doing great! :) Dungeon Crusade will involve strategy, tactics and planning with gameplay taking place in a land called Avalon. When I unveil what Dungeon Crusade has become on kickstarter with it&#039;s world debut trailer, I think any one into Dungeons/Fantasy/RPG games are going to really like what it has to offer. I truly believe you haven&#039;t seen anything quite like this in a board game. It&#039;s fresh, innovative &amp; unique. But above all very FUN and quite challenging! As I have also said from the start of this, I plan on giving fans of Dungeon Crusade the 2 big Q&#039;s...Quality &amp; Quantity. When funded, I have a few top notch artists that&#039;s truly going to bring Dungeon Crusade to life with the most striking art for a tabletop game. If people are good enough to believe in me, then they deserve the best I can get. No exceptions. Dungeon Crusade has been a dream of mine since I was a kid. I have been creating and developing it now for 7 1/2 years to share with fellow gamers, and give them something that&#039;s not mundane or typical of games of this genre. We all love new and fresh things to enjoy, especially us gamers. Hopefully I have accomplished what I set out to do, as of this writing in july 2015, Dungeon Crusade has evolved into a juggernaut of a game, that has addictive gameplay, and it&#039;s quite immersive for a game. I&#039;m being tight lipped about it right now, but when it is revealed, I truly think you&#039;ve never seen anything like this. Feel free to join us at www.facebook.com/dungeoncrusade to keep up to date on the kickstarter launch and other news. I wish everyone the best, and happy gaming! :) Rodger (Groovus)Deering

I&#039;m so looking forward to this kickstarter!!!</body>
	
		</item>
	<item id="4130035" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="99167" 			
			objectname="Dungeon Star"
			username="kingspud" 
			postdate="Thu, 10 Sep 2015 14:17:42 +0000" 
			editdate="Thu, 10 Sep 2015 14:17:42 +0000"
			thumbs="0"
						imageid="1008038">
	<body>The dungeon goes through the ground.
 It&#039;s also very famous in the world as the treasure&quot;God bless&quot;. Anybody said the &quot;God bless&quot; was placed on the most deep floor, and any monsters lived in the dungeon. It&#039;s many and many.

However, in this world, the monsters live anywhere without cities and towns. The people sometimes has a battle with them. But the monsters in the dungeon are different with other monsters. Because anyone can&#039;t see the &quot;God bless&quot;.

So the people was interested in &quot;God bless&quot; and the dungeon. At first, it&#039;s mercenaries and ventures. But a few years ago, the nobles are interested in them.
 The nobles hire the mercenaries and ventures and so on, and they pay the cost to the mercenaries and ventures, they take any treasure in the dungeon. Of course, their target is &quot;God bless&quot;.

The player is one of the nobles. They hire the mercenaries and ventures and so on, and take the any treasure and a honor as stars. The stars means the noble can go to more deep floor. It&#039;s a honor to other nobles.

The player with most stars is a winner.

Posted solo rules!

</body>
	
		</item>
	<item id="4130036" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="59938" 			
			objectname="Dungeon Escape"
			username="kingspud" 
			postdate="Thu, 10 Sep 2015 14:19:13 +0000" 
			editdate="Thu, 10 Sep 2015 14:19:13 +0000"
			thumbs="0"
						imageid="587910">
	<body>The one with the most treasure wins! … Just watch out for the dragons! Dungeon Escape uses a regular deck of cards and an ingenious set of rules to create a Euro-style game board. Choose one of the classic fantasy characters and gather treasure while attempting to escape alive. This ultimate dungeon crawl is for 1 to 8 players, ages 8 and up; game time is 30 minutes.

Goal: Escape the dungeon alive while collecting the most treasure.

Equipment required: 1 deck of cards, 2 six sided dice and a scorepad to keep track of health points
</body>
	
		</item>
	<item id="4130057" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="181521" 			
			objectname="Warhammer Quest: The Adventure Card Game"
			username="kingspud" 
			postdate="Thu, 10 Sep 2015 14:28:14 +0000" 
			editdate="Thu, 10 Sep 2015 14:28:14 +0000"
			thumbs="10"
						imageid="2625794">
	<body>Join forces with legendary heroes to brave the many dangers of a cavernous dungeon. Wield potent weapons and magic. Conquer hordes of vile monsters. Discover fabulous treasures.

Warhammer Quest: The Adventure Card Game is a cooperative game of heroic dungeon adventures for one to four players. Players assume the roles of some of the Old World&#039;s most iconic heroes, then venture into the shadows to battle ghouls, Goblins, Skaven, giant bats, swarms of rats, and other monsters.

Can you survive their relentless onslaught? Can you press deeper into their lair to find the evil villain that drives them forward? There are only two ways for your quest to end – in death or in glory!
</body>
	
		</item>
	<item id="4130110" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="14545" 			
			objectname="Caverns of Doom"
			username="kingspud" 
			postdate="Thu, 10 Sep 2015 14:59:17 +0000" 
			editdate="Thu, 10 Sep 2015 14:59:17 +0000"
			thumbs="4"
						imageid="187867">
	<body>According to Sid Sacksoms &quot;A Gamut of Games&quot;: Enter a series of caverns in search of treasures of all kind. A die calls up monsters (which, like the adventurers, are metal figures to be colored with the paints supplied) and governs their attacks. Crypt of the Sorcerer was a follow up in the series.</body>
	
		</item>
	<item id="4131420" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="23953" 			
			objectname="Outside the Scope of BGG"
			username="Hob Bramble" 
			postdate="Fri, 11 Sep 2015 03:27:01 +0000" 
			editdate="Fri, 11 Sep 2015 03:27:01 +0000"
			thumbs="2"
						imageid="193671">
	<body>[size=14][thing=182852][/thing][/size]

[i]From the introduction:[/i]
Welcome to Exiles Of The Wicked Maze, a complete traditional tabletop game for 1 player! This game is a sword and sorcery style quest in which you play a prisoner exiled to a massive labyrinth located below the vast, wicked city that you once called home. The basic rules are simple enough. Start at the entrance of the maze and work your way through to the ending point, collecting enough treasure to pay a fine of 5,000 coins as you go.

Along the way you will encounter a variety of different symbols, most of these will require you to make a random roll on a chart or two. Some of these symbols will allow you to gain treasure, while others may require you to avoid a deadly trap or fight a monster. Your gained treasures and suffered wounds are recorded on a simple character sheet, which in some ways is similar to the character sheets that you would expect to find with a typical table top role playing game.

Unlike a typical table top role playing game, no “game master” is required. The encountered symbols and random roll charts dictate the challenges and treasures that you stumble upon. Unlike a typical table top board game, you draw your way through freshly printed copy of the maze rather than rolling dice and moving an equal number of spaces.</body>
	
		</item>
	<item id="4131447" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="32678" 			
			objectname="Hero: Immortal King – The Lair of the Lich"
			username="Hex_Enduction_Hour" 
			postdate="Fri, 11 Sep 2015 03:43:16 +0000" 
			editdate="Fri, 11 Sep 2015 03:43:16 +0000"
			thumbs="4"
						imageid="266724">
	<body>There are three titles in this Hero: Immortal series.
Dungeon crawl-type of dice n&#039; card game that is somewhat similar to Pathfinder or The Isle of Doctor Necreaux as the solitaire player works through a deck or several decks at a time.

Each set comes with different hero types and dice (D8, D10, D12) and types of villains and monster (undead, demons, beholders)
Artwork is reminiscent  of European style comics.
Decent game system and a nice addition to a solo collection.
[IMG]https://cf.geekdo-images.com/images/pic266724_md.jpg[/IMG]
[IMG]https://cf.geekdo-images.com/images/pic266725_md.jpg[/IMG]
[IMG]https://cf.geekdo-images.com/images/pic266726_md.jpg[/IMG]</body>
	
		</item>
	<item id="4131522" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="166710" 			
			objectname="Dragon&#039;s Ransom"
			username="livevyne" 
			postdate="Fri, 11 Sep 2015 04:53:24 +0000" 
			editdate="Fri, 11 Sep 2015 04:53:24 +0000"
			thumbs="4"
						imageid="2264084">
	<body>A reverse dungeon crawl. In this solo experience, you are the monsters trying to keep the heroes from escaping with all your loot.</body>
	
		</item>
	<item id="4131550" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="32072" 			
			objectname="Song of Gold and Darkness"
			username="usiandrew" 
			postdate="Fri, 11 Sep 2015 05:36:13 +0000" 
			editdate="Fri, 11 Sep 2015 05:36:13 +0000"
			thumbs="5"
						imageid="252952">
	<body>This is an Expansion for [thing=30804][/thing] designed for solo or co-operative Dungeon crawls. Fantastic Set of rules and a great deal of fun. 
Easily works with any Tile set and figures or flats you own.</body>
	
		</item>
	<item id="4132578" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="149241" 			
			objectname="Assault on Doomrock"
			username="bbblasterfire" 
			postdate="Fri, 11 Sep 2015 20:31:23 +0000" 
			editdate="Fri, 11 Sep 2015 20:31:23 +0000"
			thumbs="2"
						imageid="1808352">
	<body>I believe this game hits all the criteria and should be included in this list.

[thing=172365][/thing] as well.</body>
	
		</item>
	<item id="4133723" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="134615" 			
			objectname="Zogar&#039;s Gaze"
			username="kingspud" 
			postdate="Sat, 12 Sep 2015 15:15:50 +0000" 
			editdate="Sat, 12 Sep 2015 15:15:50 +0000"
			thumbs="1"
						imageid="1494051">
	<body>Draw a random race and class card and keep your identity a secret. Then you adventure into Zogar’s Dungeon and attempt to collect the objects you need to meet your two separate win conditions. You must enter the dungeon on your turn but you can leave whenever you want. Press your luck and try to collect as much loot as you can, but be aware, Zogar’s minions are wandering about and you might lose all you have gained if you perish. In addition Zogar’s all seeing eyes are protecting his lair and if too many are revealed, than every player loses and Zogar wins the game. Muhahahaha!

Do not fear; there is also a market where you can secretly turn in loot you do not need for items that can save your life from the dangers below.

This is a 1-4 player game where players attempt to meet certain win conditions based on their race and class. The first player to meet these conditions wins. Try and figure out who the other players are and attempt to slow them down. The game plays quickly with a 4 player game lasting between 30-45 minutes.
</body>
	
		</item>
	<item id="4136006" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="146221" 			
			objectname="Forge War"
			username="kingspud" 
			postdate="Sun, 13 Sep 2015 16:11:58 +0000" 
			editdate="Sun, 13 Sep 2015 16:11:58 +0000"
			thumbs="2"
						imageid="2296858">
	<body>In Forge War, players will take on the role of blacksmiths in a kingdom rife with marauding harpies, cursed dungeons and fire-breathing dragons. They are charged with gathering ore from the mines, purchasing weapon designs from the market and then using these resources to forge weapons for adventurers who will go on quests to fight back the ever-deepening darkness. If the adventurers are successful, they will return with more ore, money and other rewards with which players can invest back into their burgeoning weaponsmithing empire.

At its core, Forge War is a rewarding game of aggressive investment, which occurs through the acquisition of quests. Quest management becomes challenging for the player, however, because quests undertaken aren&#039;t completed immediately, but instead progress each turn and become more difficult. At specific time intervals, players will need to add more resources to their quests or face failure.

Gameplay cycles through three different phases in each round. The first phase consists of moving pieces around a hex grid to maximize resource production. The second phase is a market phase that features an action blocking mechanic to gain access to new weapon plans and other advantages. The final phase is the acquisition and management of quests, which are selected from a pool of available cards.
</body>
	
		</item>
	<item id="4136011" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="28167" 			
			objectname="Maze of the Red Mage: A Solitaire Dungeon Adventure!"
			username="kingspud" 
			postdate="Sun, 13 Sep 2015 16:15:14 +0000" 
			editdate="Sun, 13 Sep 2015 16:15:14 +0000"
			thumbs="0"
						imageid="187771">
	<body>You awaken in a small shadowy chamber lit only by a fiery brazier…a deep voice from a shimmering red figure intones “You will plague me no longer! You have interfered in my plans for far too long. You claim to be a hero? Well then… let’s put you to the test! I have entombed you inside my maze…can you escape and prove yourself worthy of the title hero? If you can escape my maze before sunrise I shall leave your lands forever…

Maze of the Red Mage is a solitaire dungeon adventure game. Your goal is to defeat the Red Mage by escaping before the sunrises! If the Sun rises or you die in the maze, the Red Mage will rule your lands forever!

The dungeon is set up randomly face down using tiles. A blend of the classic PC games Minesweeper and Rogue Maze of the Red Mage includes: variable creatures, treasures, dungeon design and characters making every game different! It includes rules to level up your character as well, all in a quick re-playable lunchtime escape!
</body>
	
		</item>
	<item id="4136012" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="139588" 			
			objectname="Ultima 1: The Boardgame"
			username="kingspud" 
			postdate="Sun, 13 Sep 2015 16:16:21 +0000" 
			editdate="Sun, 13 Sep 2015 16:16:21 +0000"
			thumbs="2"
						imageid="2490943">
	<body>A remake of the original Ulimta 1 computer game by Richard Garriott but in Print &amp; Play boardgame format. For [1] player/solitaire gaming.

The game will consist of all [4] map board continents with each map containing four quadrants printed on 11x17 sheets, which allows you to play on one board at a time or put them all together for one big gameboard.

You can play as one of four character types: THIEF, MAGE, FIGHTER, CLERIC who adventures across the lands of Sosaria, ie gameboards, to accomplish goals, gather gold, gather gems, weapons, armor, spells and scrolls, traveling aids, and equipment. Adventure into Dark Dungeons, Castles, and Towns for Supplies, Equipment and information. Speak with Kings to gather information about the location of all four gems, Fight wandering monsters and evil individuals, open chest to find riches, plus level up and increase your characters abilities and win the game by discovering secret information, finding lost treasures, and defeating the evil overlord &quot;Big Boss&quot; Mondain.

All the fun of the original Ultima 1 but with more challenges, more monsters, more riches, and more fame... plus in a Print &amp; Play board game format.

I&#039;ve taken some liberty with the game since a board game can&#039;t do everything a computer can do but should keep the original play as close to the PC game as possible.

For those of you who have played through the original PC game, you will find that this board game will be similar experience with you traveling, searching, and fighting your way across Sosaria. Just remember that you are now the computer and will be tracking all your stats and information.

I will also try to add as many random elements to the game so each time you play it will be the same Ultima 1 but with a little different experience.
</body>
	
		</item>
	<item id="4136314" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="22" 			
			objectname="Magic Realm"
			username="kingspud" 
			postdate="Sun, 13 Sep 2015 17:47:16 +0000" 
			editdate="Sun, 13 Sep 2015 17:47:16 +0000"
			thumbs="5"
						imageid="148345">
	<body>MAGIC REALM is a game of fantasy adventuring, set in a land filled with monsters, fabulous treasures, great warriors, and magicians. The scene is set in the ruins of a mighty kingdom, now inhabited by sparse groups of natives and swarms of monsters. Beneath it all are the rich remnants of a magical civilization, scattered and lost across the map.
 To this scene come the adventurers, seekers of riches and fame, to make a name for themselves in this promising field. Swordsman and Dwarf, Magician and Sorceror, the humans and the half-humans come seeking to loot the legendary riches of a lost civilization. Now you can play the part of one of these adventurers, stepping into an unknown Realm of magic and monsters, battles and treasures.

As a player, you will take on the role of one of the sixteen major characters who are represented in detail in the game. You will control where he goes, what he tries to do, how he handles himself in combat, and much more. In the course of the game, you will run into deadly monsters, tribes of humans ranging from old friends to sworn enemies, and treasures that will enhance your abilities in many ways.

MAGIC REALM is a complex game designed to recapture the suspense and desperate struggles of fantasy literature. The game creates a small but complete fantasy world, where each game is a new adventure with a new map where everything lies hidden at new locations. The game includes many more playing pieces than are actually used in a single playing. The additional pieces are set up and can appear, depending on the directions in which the characters explore, but many of the treasure troves, treasures, and spells will still be set up, unfound, when the game ends, and many of the monsters and natives might never be met. The result is an extremely unpredictable game full of surprises, a game that plays very differently each time it is played.
 The complete game system includes hiking, hiding and searching, fatigue, wounds, rest, trade, hiring natives, and combat between characters, monsters, and natives using a variety of weapons on horseback and afoot, as well as many magical effects.

Between exploring a new land where the mountains, caves, valleys, and woods change every game, and not knowing what you will find in each place, you will find each game a new and unpredictable adventure, filled with surprises. You will find this like no other board game you have ever played.

Avalon Hill Complexity rating - 9 
solo play
</body>
	
		</item>
	<item id="4141086" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="80771" 			
			objectname="Dungeon Raiders"
			username="kingspud" 
			postdate="Tue, 15 Sep 2015 13:18:08 +0000" 
			editdate="Tue, 15 Sep 2015 13:18:08 +0000"
			thumbs="0"
						imageid="1733595">
	<body>Join a brave party of adventurers! Explore a dungeon filled with monsters, traps and treasure!

In Dungeon Raiders, each player takes the role of a different adventurer. You&#039;ll need to work together to survive the dungeon, but only one of you will make it out with the most treasure and win the game! The dungeon is different each time you play, offering new surprises as you collect treasure, trigger traps, and fight off horrible monsters!

Dungeon Raiders can also be played as a solitaire game&quot; take on the dungeon alone and see how much treasure you can make it out with!
</body>
	
		</item>
	<item id="4143899" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="149787" 			
			objectname="Perdition&#039;s Mouth: Abyssal Rift"
			username="Purgatoriant" 
			postdate="Wed, 16 Sep 2015 20:58:04 +0000" 
			editdate="Wed, 16 Sep 2015 20:58:04 +0000"
			thumbs="5"
						imageid="2469033">
	<body>Perdition&#039;s Mouth: Abyssal Rift is a diceless cooperative fantasy-horror game for 1-6 players that plays in 1-2 hours. Using a unique action wheel, the players must rely on each other as they battle against a horde of terrifying AI-driven monsters. The monsters&#039; actions are based on:

[c]   [/c]-Response cards: Amount of actions
[c]   [/c]-A rondel: Type of actions
[c]   [/c]-Monster type: Type of movement



Guided by mystic visions, heroes descend into Perdition&#039;s Mouth, an ancient cavern system. There, they must stop a corrupt cult whose goal is to summon up a terrible demon that has lain in wait in the depths of the earth for millennia. However, reaching the bottom of Perdition&#039;s Mouth may take several game sessions. Players may choose to face one dungeon level at a time, saving their game between sessions, or play through several dungeon levels in a single sitting. Each dungeon level is completed when all of the heroes have either exited the level or been killed. In the end, the heroes win the game if the demon is dead and at least one hero exits the dungeon alive.</body>
	
		</item>
	<item id="4308113" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="4284" 			
			objectname="Dice Quest"
			username="MvRichthofen" 
			postdate="Fri, 04 Dec 2015 07:58:12 +0000" 
			editdate="Fri, 04 Dec 2015 07:58:12 +0000"
			thumbs="1"
						imageid="13544">
	<body>Dice Quest, as the title implies, is a dice chucking questing game set in a dungeon environment. The rolls of the dice layout the dungeon, determine monster encounters and generate the loot you receive for killing one of the six monsters in the dungeon. There are even simple leveling mechanics.  It is light, compact and easy to tote. Additionally, with a couple of random tables there is plenty of room for beefing up the game with replayability enhancements that could bring it up to speed of some of the better known table top games. This game predates a few of the already existing PnP games that have surfaced over the past couple of years.</body>
	
		</item>
	<item id="4308275" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="170771" 			
			objectname="Sword &amp; Sorcery"
			username="kilrah" 
			postdate="Fri, 04 Dec 2015 09:44:54 +0000" 
			editdate="Fri, 04 Dec 2015 09:44:54 +0000"
			thumbs="4"
						imageid="2673763">
	<body>Just finished funding on kickstarter and is &#039;basically&#039;(lots seem to have changed in details, but its the same basic idea) a fantasy reskin of [thing=138431][/thing]</body>
	
		</item>
	<item id="4477866" 
			objecttype="thing"
			subtype="boardgame" 
			objectid="156118" 			
			objectname="The Red Dragon&#039;s Lair"
			username="Gr1mAce" 
			postdate="Sun, 21 Feb 2016 15:10:53 +0000" 
			editdate="Sun, 21 Feb 2016 15:10:53 +0000"
			thumbs="1"
						imageid="1958377">
	<body>Just ran across this today. It looks fun. Apparently there will be a kickstarter set up in Mar and this will be available in it too. A Co-op deck using game that is light and easy. Looks fun!</body>
	
		</item>
</geeklist>
`;

}
