import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import * as xml2js from 'xml2js';
import { GeekList } from './geek-list';
import { GeekListItemSummary } from './geek-list-item-summary';
import { GeekListItemDetail } from './geek-list-item-detail';


@Injectable()
export class ItemDetailsRetrievalService {

  private itemLookupUrl = 'http://www.boardgamegeek.com/xmlapi2/thing?stats=1&id=';

  constructor(private http: Http) {

  }

  public retrieveItemsDetail(geekList: GeekList): Promise<Array<GeekListItemDetail>> {
    const url = this.itemLookupUrl + this.GetCsvItemIds(geekList);
    //return this.http.get(url).map(res => res.text())
    return Observable.of(this.HARDCODED_RESPONSE)
      .catch(this.handleError)
      .toPromise()
      .then(this.extractData)
      .then(response => this.getItemDetailsFromResponse(response, geekList));
  }

  private GetCsvItemIds(geekList: GeekList): string {
    return geekList.items.reduce((s, item) => `${s}${s ? ',' : ''}${item.objectId}`, '');
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

  private getItemDetailsFromResponse(response, geekList : GeekList): Array<GeekListItemDetail> {
    if (!response.items || !response.items.item || !response.items.item.length) {
      return null;
    }
    return response.items.item.map(item => {
      let summaryItem = geekList.items.find(summary => summary.objectId == item.$.id);
      if(!summaryItem){
        console.log("item not found!!");
      }
      return new GeekListItemDetail(
      summaryItem,
      item.$.id, Number(item.statistics[0].ratings[0].average[0].$.value), Number(item.statistics[0].ratings[0].ranks[0].rank[0].$.value), Number(item.statistics[0].ratings[0].averageweight[0].$.value),
      item.yearpublished[0].$.value, Number(item.minplayers[0].$.value), Number(item.maxplayers[0].$.value),
      Number(item.playingtime[0].$.value), null, null)
    });
  }

  private getItemFromResponse(response) {
    if (response.items && response.items.item && response.items.item.length) {
      return response.items.item[0];
    }
    return null;
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

  private HARDCODED_RESPONSE = `<?xml version="1.0" encoding="utf-8"?>
<items termsofuse="http://boardgamegeek.com/xmlapi/termsofuse">
    <item type="boardgame" id="9547">
        <thumbnail>https://cf.geekdo-images.com/images/pic40270_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic40270.jpg</image>
        <name type="primary" sortindex="1" value="Are You Afraid of the Dark?" />
        <description>Are you ready to be initiated into the Midnight Society?  You and your friends will be sent on a journey through the scariest places ever imagined.  If you overcome all of the obstacles, gain points in categories such as knowledge, strength, courage, and be the first one back to the campfire you too will be a member of the Midnight Society.  Players must accumulate a total of six points in each of the six categories and return to the campfire to win.&amp;#10;&amp;#10;</description>
        <yearpublished value="1995" />
        <minplayers value="2" />
        <maxplayers value="4" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="1">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
        </poll>
        <playingtime value="30" />
        <minplaytime value="30" />
        <maxplaytime value="30" />
        <minage value="8" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="0">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="0" />
                <result value="10" numvotes="0" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="0">
	</poll>
        <link type="boardgamecategory" id="1041" value="Children's Game" />
        <link type="boardgamecategory" id="1024" value="Horror" />
        <link type="boardgamecategory" id="1064" value="Movies / TV / Radio theme" />
        <link type="boardgamemechanic" id="2046" value="Area Movement" />
        <link type="boardgamemechanic" id="2035" value="Roll / Spin and Move" />
        <link type="boardgamedesigner" id="3" value="(Uncredited)" />
        <link type="boardgamepublisher" id="225" value="Cardinal" />
        <statistics page="1">
            <ratings >
                <usersrated value="29" />
                <average value="4.43103" />
                <bayesaverage value="0" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="Not Ranked" bayesaverage="Not Ranked" />
                    <rank type="family" id="4665" name="childrensgames" friendlyname="Children&#039;s Game Rank" value="Not Ranked" bayesaverage="Not Ranked" />
                </ranks>
                <stddev value="1.964" />
                <median value="0" />
                <owned value="91" />
                <trading value="10" />
                <wanting value="1" />
                <wishing value="5" />
                <numcomments value="15" />
                <numweights value="7" />
                <averageweight value="1.7143" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="113324">
        <thumbnail>https://cf.geekdo-images.com/images/pic1172116_t.png</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic1172116.png</image>
        <name type="primary" sortindex="1" value="Dungeon Delver" />
        <description>Dungeon Delver is a single player, print and play card and dice game for kids. The goal of the game is to make it through the entire dungeon deck, battling monsters and surviving any traps you may encounter. There are many dangers, but don&amp;rsquo;t lose heart, because there are also useful treasures to be found along the way as well. You play as one of six heroes, each with unique abilities and each with high hopes that they will be the adventurer to complete the quest.&amp;#10; The rules and 54 Dungeon Delver cards can be downloaded for free. Print the cards, cut them out, grab six &amp;quot;hit counters&amp;quot; (pennies, wooden cubes, etc.) and a set of rpg dice (d4, d6, d8, d10, d12 and d20) to start playing.&amp;#10;&amp;#10;</description>
        <yearpublished value="2011" />
        <minplayers value="1" />
        <maxplayers value="1" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="1">
            <results numplayers="1">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="1+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
        </poll>
        <playingtime value="20" />
        <minplaytime value="20" />
        <maxplaytime value="20" />
        <minage value="5" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="1">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="1" />
                <result value="10" numvotes="0" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="1">
            <results>
                <result level="1" value="No necessary in-game text" numvotes="0" />
                <result level="2" value="Some necessary text - easily memorized or small crib sheet" numvotes="1" />
                <result level="3" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="4" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="5" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1120" value="Print &amp; Play" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamefamily" id="5666" value="Solitaire Games" />
        <link type="boardgamedesigner" id="13262" value="Drew Chamberlain" />
        <link type="boardgameartist" id="34992" value="Mark Campo" />
        <link type="boardgamepublisher" id="1001" value="(Web published)" />
        <statistics page="1">
            <ratings >
                <usersrated value="37" />
                <average value="6.08108" />
                <bayesaverage value="5.51813" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="10068" bayesaverage="5.51813" />
                </ranks>
                <stddev value="1.61293" />
                <median value="0" />
                <owned value="66" />
                <trading value="2" />
                <wanting value="2" />
                <wishing value="23" />
                <numcomments value="21" />
                <numweights value="3" />
                <averageweight value="1" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="96848">
        <thumbnail>https://cf.geekdo-images.com/images/pic1083380_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic1083380.jpg</image>
        <name type="primary" sortindex="1" value="Mage Knight Board Game" />
        <name type="alternate" sortindex="1" value="Mage Knight: Das Brettspiel" />
        <name type="alternate" sortindex="1" value="Mage Knight: Desková hra" />
        <name type="alternate" sortindex="1" value="Mage Knight: Gra Planszowa" />
        <name type="alternate" sortindex="1" value="Mage Knight: Il Gioco Da Tavolo" />
        <name type="alternate" sortindex="1" value="Mage Knight: Jeu de Plateau" />
        <name type="alternate" sortindex="1" value="魔法騎士" />
        <description>The Mage Knight board game puts you in control of one of four powerful Mage Knights as you explore (and conquer) a corner of the Mage Knight universe under the control of the Atlantean Empire. Build your army, fill your deck with powerful spells and actions, explore caves and dungeons, and eventually conquer powerful cities controlled by this once-great faction!  In competitive scenarios, opposing players may be powerful allies, but only one will be able to claim the land as their own.  In cooperative scenarios, the players win or lose as a group.  Solo rules are also included.&amp;#10;&amp;#10;Combining elements of RPGs, deckbuilding, and traditional board games the Mage Knight board game captures the rich history of the Mage Knight universe in a self-contained gaming experience..&amp;#10;&amp;#10;</description>
        <yearpublished value="2011" />
        <minplayers value="1" />
        <maxplayers value="4" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="792">
            <results numplayers="1">
                <result value="Best" numvotes="425" />
                <result value="Recommended" numvotes="252" />
                <result value="Not Recommended" numvotes="19" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="403" />
                <result value="Recommended" numvotes="283" />
                <result value="Not Recommended" numvotes="7" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="135" />
                <result value="Recommended" numvotes="365" />
                <result value="Not Recommended" numvotes="121" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="27" />
                <result value="Recommended" numvotes="140" />
                <result value="Not Recommended" numvotes="393" />
            </results>
            <results numplayers="4+">
                <result value="Best" numvotes="4" />
                <result value="Recommended" numvotes="12" />
                <result value="Not Recommended" numvotes="439" />
            </results>
        </poll>
        <playingtime value="150" />
        <minplaytime value="150" />
        <maxplaytime value="150" />
        <minage value="14" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="191">
            <results>
                <result value="2" numvotes="1" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="0" />
                <result value="10" numvotes="13" />
                <result value="12" numvotes="39" />
                <result value="14" numvotes="89" />
                <result value="16" numvotes="42" />
                <result value="18" numvotes="4" />
                <result value="21 and up" numvotes="3" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="190">
            <results>
                <result level="16" value="No necessary in-game text" numvotes="0" />
                <result level="17" value="Some necessary text - easily memorized or small crib sheet" numvotes="3" />
                <result level="18" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="26" />
                <result level="19" value="Extensive use of text - massive conversion needed to be playable" numvotes="154" />
                <result level="20" value="Unplayable in another language" numvotes="7" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamemechanic" id="2041" value="Card Drafting" />
        <link type="boardgamemechanic" id="2023" value="Co-operative Play" />
        <link type="boardgamemechanic" id="2664" value="Deck / Pool Building" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2676" value="Grid Movement" />
        <link type="boardgamemechanic" id="2040" value="Hand Management" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamemechanic" id="2002" value="Tile Placement" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="18459" value="Clix" />
        <link type="boardgamefamily" id="25158" value="Components: Miniatures" />
        <link type="boardgamefamily" id="33758" value="Mage Knight Universe" />
        <link type="boardgamefamily" id="5666" value="Solitaire Games" />
        <link type="boardgameexpansion" id="144763" value="Mage Knight Board Game: Krang Character Expansion" />
        <link type="boardgameexpansion" id="176130" value="Mage Knight Board Game: Shades of Tezla Expansion" />
        <link type="boardgameexpansion" id="130704" value="Mage Knight Board Game: The Lost Legion" />
        <link type="boardgameimplementation" id="182340" value="Star Trek: Frontiers" />
        <link type="boardgamedesigner" id="789" value="Vlaada Chvátil" />
        <link type="boardgameartist" id="49771" value="J. Lonnee" />
        <link type="boardgameartist" id="50792" value="Chris Raimo" />
        <link type="boardgameartist" id="11961" value="Milan Vavroň" />
        <link type="boardgamepublisher" id="221" value="WizKids" />
        <link type="boardgamepublisher" id="157" value="Asmodee" />
        <link type="boardgamepublisher" id="5530" value="Giochi Uniti" />
        <link type="boardgamepublisher" id="5380" value="Intrafin Games" />
        <link type="boardgamepublisher" id="5812" value="Lacerta" />
        <link type="boardgamepublisher" id="3023" value="NECA" />
        <link type="boardgamepublisher" id="39" value="Pegasus Spiele" />
        <link type="boardgamepublisher" id="21053" value="REXhry" />
        <statistics page="1">
            <ratings >
                <usersrated value="18803" />
                <average value="8.13668" />
                <bayesaverage value="7.93854" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="15" bayesaverage="7.93854" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="10" bayesaverage="7.90729" />
                    <rank type="family" id="5497" name="strategygames" friendlyname="Strategy Game Rank" value="16" bayesaverage="7.92617" />
                </ranks>
                <stddev value="1.60576" />
                <median value="0" />
                <owned value="28175" />
                <trading value="618" />
                <wanting value="1238" />
                <wishing value="7426" />
                <numcomments value="4039" />
                <numweights value="1811" />
                <averageweight value="4.2137" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="2876">
        <thumbnail>https://cf.geekdo-images.com/images/pic241478_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic241478.jpg</image>
        <name type="primary" sortindex="1" value="Mage Knight Dungeons" />
        <name type="alternate" sortindex="1" value="Heroic Quests 3D-Dungeons" />
        <description>Mage Knight Dungeons is a fast paced, fun game of Heroic combat. Your heroes slog through deep, dark dungeons and battle terrifying mage spawn monsters in a race against other heroes to find hidden treasures filled with magic items and gold.&amp;#10;These prizes are what a hero needs to carve himself a legend: the more gold, the greater the legend. If you are ready to turn your warrior into a hero, read on.&amp;#10;&amp;#10;In Mage Knight Dungeons, you take turns moving your Hero through the dungeon to win treasure, defeat monsters and other Heroes, and fight to make it out alive. On your opponent&amp;rsquo;s turn, you play the monsters who are trying to eliminate his Hero. Along the way your Hero must face the traps that protect the treasure chests, battle monsters and search for the fastest and safest way out of the dungeon.&amp;#10;&amp;#10;</description>
        <yearpublished value="2002" />
        <minplayers value="2" />
        <maxplayers value="4" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="12">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="4" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="6" />
                <result value="Recommended" numvotes="4" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="5" />
                <result value="Recommended" numvotes="2" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="5" />
                <result value="Recommended" numvotes="4" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4+">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="2" />
                <result value="Not Recommended" numvotes="3" />
            </results>
        </poll>
        <playingtime value="60" />
        <minplaytime value="60" />
        <maxplaytime value="60" />
        <minage value="10" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="6">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="0" />
                <result value="10" numvotes="3" />
                <result value="12" numvotes="2" />
                <result value="14" numvotes="1" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="5">
            <results>
                <result level="6" value="No necessary in-game text" numvotes="1" />
                <result level="7" value="Some necessary text - easily memorized or small crib sheet" numvotes="3" />
                <result level="8" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="9" value="Extensive use of text - massive conversion needed to be playable" numvotes="1" />
                <result level="10" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1044" value="Collectible Components" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamecategory" id="1059" value="Maze" />
        <link type="boardgamecategory" id="1047" value="Miniatures" />
        <link type="boardgamemechanic" id="2001" value="Action Point Allowance System" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamemechanic" id="2002" value="Tile Placement" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="5607" value="3D Games" />
        <link type="boardgamefamily" id="18459" value="Clix" />
        <link type="boardgamefamily" id="5914" value="CMGs (Collectible Miniatures Games)" />
        <link type="boardgamefamily" id="33758" value="Mage Knight Universe" />
        <link type="boardgamedesigner" id="410" value="Kevin Barrett" />
        <link type="boardgamedesigner" id="1175" value="Michael Mulvihill" />
        <link type="boardgamedesigner" id="411" value="Jordan Weisman" />
        <link type="boardgamepublisher" id="1397" value="Fanpro" />
        <link type="boardgamepublisher" id="221" value="WizKids" />
        <statistics page="1">
            <ratings >
                <usersrated value="647" />
                <average value="6.6375" />
                <bayesaverage value="5.91373" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="2351" bayesaverage="5.91373" />
                    <rank type="family" id="4667" name="cgs" friendlyname="Customizable Rank" value="73" bayesaverage="6.29264" />
                </ranks>
                <stddev value="1.53702" />
                <median value="0" />
                <owned value="1102" />
                <trading value="67" />
                <wanting value="41" />
                <wishing value="95" />
                <numcomments value="246" />
                <numweights value="63" />
                <averageweight value="2.4762" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="124708">
        <thumbnail>https://cf.geekdo-images.com/images/pic1312072_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic1312072.jpg</image>
        <name type="primary" sortindex="1" value="Mice and Mystics" />
        <name type="alternate" sortindex="1" value="Magia i Myszy" />
        <name type="alternate" sortindex="1" value="Maus und Mystik" />
        <name type="alternate" sortindex="1" value="Mice and Mystics, de Ratones y Magia" />
        <name type="alternate" sortindex="1" value="Mice and Mystics: Sorrow and Remembrance" />
        <name type="alternate" sortindex="1" value="О мышах и тайнах" />
        <name type="alternate" sortindex="1" value="俠鼠魔途" />
        <description>Game description from the publisher:&amp;#10;&amp;#10;In Mice and Mystics players take on the roles of those still loyal to the king &amp;ndash; but to escape the clutches of Vanestra, they have been turned into mice! Play as cunning field mice who must race through a castle now twenty times larger than before. The castle would be a dangerous place with Vanestra's minions in control, but now countless other terrors also await heroes who are but the size of figs. Play as nimble Prince Collin and fence your way past your foes, or try Nez Bellows, the burly smith. Confound your foes as the wizened old mouse Maginos, or protect your companions as Tilda, the castle's former healer. Every player will have a vital role in the quest to warn the king, and it will take careful planning to find Vanestra's weakness and defeat her.&amp;#10;&amp;#10;Mice and Mystics is a cooperative adventure game in which the players work together to save an imperiled kingdom. They will face countless adversaries such as rats, cockroaches, and spiders, and of course the greatest of all horrors: the castle's housecat, Brodie. Mice and Mystics is a boldly innovative game that thrusts players into an ever-changing, interactive environment, and features a rich storyline that the players help create as they play the game. The Cheese System allows players to hoard the crumbs of precious cheese they find on their journey, and use it to bolster their mice with grandiose new abilities and overcome seemingly insurmountable odds.&amp;#10;&amp;#10;Mice and Mystics will provide any group of friends with an unforgettable adventure they will be talking about for years to come &amp;ndash; assuming they can all squeak by...&amp;#10;&amp;#10;&amp;#10;&amp;#10;Expansion advice:&amp;#10;&amp;#10;For those who have expansions for this game the recommended order by the game designer for playing them is as follows (see original post HERE):&amp;#10;&amp;#10;        Sorrow and Remembrance (Base game)&amp;#10;        Cat's Cradle (Lost Chapter 1)&amp;#10;        Heart of Glorm&amp;#10;        The Ghost of Castle Andon (Lost Chapter 2)&amp;#10;        Downwood Tales&amp;#10;        Portents of Importance (Lost Chapter 3), connected to the story in Tail Feathers&amp;#10;    &amp;#10;&amp;#10;&amp;#10;&amp;#10;&amp;#10;</description>
        <yearpublished value="2012" />
        <minplayers value="1" />
        <maxplayers value="4" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="181">
            <results numplayers="1">
                <result value="Best" numvotes="16" />
                <result value="Recommended" numvotes="98" />
                <result value="Not Recommended" numvotes="27" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="45" />
                <result value="Recommended" numvotes="95" />
                <result value="Not Recommended" numvotes="8" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="21" />
                <result value="Recommended" numvotes="103" />
                <result value="Not Recommended" numvotes="13" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="114" />
                <result value="Recommended" numvotes="42" />
                <result value="Not Recommended" numvotes="4" />
            </results>
            <results numplayers="4+">
                <result value="Best" numvotes="4" />
                <result value="Recommended" numvotes="10" />
                <result value="Not Recommended" numvotes="83" />
            </results>
        </poll>
        <playingtime value="120" />
        <minplaytime value="120" />
        <maxplaytime value="120" />
        <minage value="7" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="98">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="4" />
                <result value="6" numvotes="20" />
                <result value="8" numvotes="39" />
                <result value="10" numvotes="29" />
                <result value="12" numvotes="6" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="75">
            <results>
                <result level="21" value="No necessary in-game text" numvotes="0" />
                <result level="22" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="23" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="1" />
                <result level="24" value="Extensive use of text - massive conversion needed to be playable" numvotes="67" />
                <result level="25" value="Unplayable in another language" numvotes="7" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1017" value="Dice" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamecategory" id="1047" value="Miniatures" />
        <link type="boardgamemechanic" id="2046" value="Area Movement" />
        <link type="boardgamemechanic" id="2023" value="Co-operative Play" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamemechanic" id="2027" value="Storytelling" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="7269" value="Animals: Mice" />
        <link type="boardgamefamily" id="24281" value="Campaign Games" />
        <link type="boardgamefamily" id="23851" value="Mice and Mystics" />
        <link type="boardgamefamily" id="5666" value="Solitaire Games" />
        <link type="boardgameexpansion" id="159458" value="Mice and Mystics: Downwood Tales" />
        <link type="boardgameexpansion" id="144777" value="Mice and Mystics: Heart of Glorm" />
        <link type="boardgameexpansion" id="132975" value="Mice and Mystics: Lost Chapter – Cat's Cradle" />
        <link type="boardgameexpansion" id="190088" value="Mice and Mystics: Lost Chapter – Portents of Importance" />
        <link type="boardgameexpansion" id="148524" value="Mice and Mystics: Lost Chapter – The Ghost of Castle Andon" />
        <link type="boardgameexpansion" id="134060" value="Mice and Mystics: Needle Rapier" />
        <link type="boardgameexpansion" id="165775" value="Mice and Mystics: Off Toppers" />
        <link type="boardgameexpansion" id="134059" value="Mice and Mystics: Tattered Threads of Reason" />
        <link type="boardgameexpansion" id="165774" value="Mice and Mystics: Turtle Shell" />
        <link type="boardgameintegration" id="179820" value="Tail Feathers" />
        <link type="boardgamedesigner" id="23005" value="Jerry Hawthorne" />
        <link type="boardgameartist" id="29142" value="John Ariosa" />
        <link type="boardgameartist" id="77485" value="David Richards" />
        <link type="boardgamepublisher" id="10754" value="Plaid Hat Games" />
        <link type="boardgamepublisher" id="24042" value="Cube Factory of Ideas" />
        <link type="boardgamepublisher" id="24883" value="Ediciones MasQueOca" />
        <link type="boardgamepublisher" id="5657" value="Filosofia Éditions" />
        <link type="boardgamepublisher" id="15605" value="Galápagos Jogos" />
        <link type="boardgamepublisher" id="264" value="Heidelberger Spieleverlag" />
        <link type="boardgamepublisher" id="23756" value="MYBG Co., Ltd." />
        <link type="boardgamepublisher" id="3242" value="Raven Distribution" />
        <statistics page="1">
            <ratings >
                <usersrated value="11220" />
                <average value="7.46715" />
                <bayesaverage value="7.24807" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="166" bayesaverage="7.24807" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="49" bayesaverage="7.28251" />
                </ranks>
                <stddev value="1.38338" />
                <median value="0" />
                <owned value="21577" />
                <trading value="407" />
                <wanting value="1129" />
                <wishing value="5682" />
                <numcomments value="2382" />
                <numweights value="579" />
                <averageweight value="2.6321" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="45315">
        <thumbnail>https://cf.geekdo-images.com/images/pic569340_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic569340.jpg</image>
        <name type="primary" sortindex="1" value="Dungeon Lords" />
        <name type="alternate" sortindex="1" value="Vládci podzemí" />
        <name type="alternate" sortindex="1" value="Władcy Podziemi" />
        <name type="alternate" sortindex="1" value="ダンジョン・ロード" />
        <name type="alternate" sortindex="1" value="地城領主" />
        <description>In Dungeon Lords, you are an evil dungeonlord who is trying to build the best dungeon out there. You hire monsters, build rooms, buy traps and defeat the do-gooders who wish to bring you down.&amp;#10;&amp;#10;From the publisher's webpage:&amp;#10;&amp;#10;Have you ever ventured with party of heroes to conquer dungeons, gain pride, experiences and of course rich treasure? And has it ever occurred to you how hard it actually is to build and manage such underground complex filled with corridors and creatures? No? Well now you can try. Put yourself in role of the master of underground, summon your servants, dig complex of tunnels and rooms, set traps, hire creatures and try to stop filthy heroes from conquering and plundering your precious creation. We can guarantee you will look on dark corners, lairs and their inhabitant from completely different perspective!&amp;#10;&amp;#10;Each turn, players use a hand of cards to choose where to place their worker.  Actions vary from mining gold, hiring monsters, buying traps etc.  Each action has three spots available - with each spot having different effects (e.g. mining gold lets you mine more gold in each spot).&amp;#10;When using the cards, two cards will become locked and will not be able to be used next turn.&amp;#10;&amp;#10;There are 4 turns to place actions for each game &amp;quot;year&amp;quot; and two game years in a whole game.&amp;#10;Each turn is identified as a &amp;quot;season&amp;quot;.  Each season, players will get to see the heroes and events to come in the following season.  Thus allowing them to prepare.&amp;#10;&amp;#10;At the end of each season (after the first), heroes will be allocated to each player according to their level of evil.  Heroes range from mighty heroes to sneaky thieves.  Each hero has their own power for which the player needs to prepare for.&amp;#10;Finally, at the end of each year, the heroes will travel down into the dungeon to fight.&amp;#10;&amp;#10;Scoring in the game is based upon what you have built, the monsters you have hired and the heroes you have captured.&amp;#10;&amp;#10;</description>
        <yearpublished value="2009" />
        <minplayers value="2" />
        <maxplayers value="4" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="269">
            <results numplayers="1">
                <result value="Best" numvotes="3" />
                <result value="Recommended" numvotes="5" />
                <result value="Not Recommended" numvotes="138" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="17" />
                <result value="Recommended" numvotes="112" />
                <result value="Not Recommended" numvotes="83" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="16" />
                <result value="Recommended" numvotes="152" />
                <result value="Not Recommended" numvotes="46" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="232" />
                <result value="Recommended" numvotes="21" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4+">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="103" />
            </results>
        </poll>
        <playingtime value="90" />
        <minplaytime value="90" />
        <maxplaytime value="90" />
        <minage value="12" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="60">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="1" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="1" />
                <result value="10" numvotes="11" />
                <result value="12" numvotes="23" />
                <result value="14" numvotes="22" />
                <result value="16" numvotes="1" />
                <result value="18" numvotes="1" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="77">
            <results>
                <result level="1" value="No necessary in-game text" numvotes="2" />
                <result level="2" value="Some necessary text - easily memorized or small crib sheet" numvotes="19" />
                <result level="3" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="51" />
                <result level="4" value="Extensive use of text - massive conversion needed to be playable" numvotes="5" />
                <result level="5" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1021" value="Economic" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamecategory" id="1079" value="Humor" />
        <link type="boardgamemechanic" id="2689" value="Action / Movement Programming" />
        <link type="boardgamemechanic" id="2040" value="Hand Management" />
        <link type="boardgamemechanic" id="2020" value="Simultaneous Action Selection" />
        <link type="boardgamemechanic" id="2002" value="Tile Placement" />
        <link type="boardgamemechanic" id="2082" value="Worker Placement" />
        <link type="boardgamefamily" id="13498" value="Dungeon Lords" />
        <link type="boardgameexpansion" id="161730" value="Dungeon Lords: Dungeon-Setup Tiles" />
        <link type="boardgameexpansion" id="126839" value="Dungeon Lords: Festival Season" />
        <link type="boardgameexpansion" id="162529" value="Dungeon Lords: Kickstarter Expansion Pack" />
        <link type="boardgameexpansion" id="130084" value="Dungeon Lords: Minions Bearing Gifts" />
        <link type="boardgameexpansion" id="120963" value="Dungeon Lords: The New Paladins" />
        <link type="boardgamecompilation" id="161617" value="Dungeon Lords: Happy Anniversary" />
        <link type="boardgamedesigner" id="789" value="Vlaada Chvátil" />
        <link type="boardgameartist" id="12692" value="David Cochard" />
        <link type="boardgamepublisher" id="7345" value="Czech Games Edition" />
        <link type="boardgamepublisher" id="5530" value="Giochi Uniti" />
        <link type="boardgamepublisher" id="264" value="Heidelberger Spieleverlag" />
        <link type="boardgamepublisher" id="1391" value="Hobby Japan" />
        <link type="boardgamepublisher" id="6275" value="HomoLudicus" />
        <link type="boardgamepublisher" id="8923" value="IELLO" />
        <link type="boardgamepublisher" id="7992" value="MINDOK" />
        <link type="boardgamepublisher" id="30552" value="One Moment Games" />
        <link type="boardgamepublisher" id="7466" value="REBEL.pl" />
        <link type="boardgamepublisher" id="3888" value="Stratelibri" />
        <link type="boardgamepublisher" id="538" value="Z-Man Games" />
        <statistics page="1">
            <ratings >
                <usersrated value="10888" />
                <average value="7.45574" />
                <bayesaverage value="7.27498" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="155" bayesaverage="7.27498" />
                    <rank type="family" id="5497" name="strategygames" friendlyname="Strategy Game Rank" value="110" bayesaverage="7.30672" />
                </ranks>
                <stddev value="1.40666" />
                <median value="0" />
                <owned value="11866" />
                <trading value="389" />
                <wanting value="538" />
                <wishing value="2884" />
                <numcomments value="2392" />
                <numweights value="853" />
                <averageweight value="3.5299" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="34639">
        <thumbnail>https://cf.geekdo-images.com/images/pic301315_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic301315.jpg</image>
        <name type="primary" sortindex="5" value="The Dungeon of D" />
        <description>ISLAND OF D : THE DUNGEON OF D&amp;#10;A FREE ONE player dungeon-crawling-fun card Game&amp;#10;No bookkeeping, NO DICE, just you, the cards, a token and a dungeon to explore!&amp;#10;&amp;#10;1. INTRODUCTION&amp;#10;With the hero's success in destroying the Black Knight's plan in Dawn, it took longer for him to organise his minions. But the time has come at last, the Great War has begun! Backed up by a very strong Dark Magic, he commands a huge army of Greenskins including the fierce  Goblorcs, unnatural Beasts, and now the Ice Monsters and even the Undeads have joined his army. The worst part is the Light Sword's new power -- the Black Knight now can heal his minions around him, including himself, in seconds!&amp;#10;&amp;#10;Approaching from the west , in a very short time three castles have fallen to his hands, and his armies are swiftly heading to the capital of D. Once again everything seems hopeless and the King of D has called the 18 legendary heroes to gather in the Dungeon of D, deep in the Forest of D to the south, where legend says that centuries ago the Great Wizard of D hid the Amulet of D'eugor. It is believed that only the legendary Amulet of D'eugor can nullify the Light Sword&amp;rsquo;s power. Unfortunately, the Black Knight knew about this too, so he placed a very strong magical barrier on the entrance to keep anyone from entering.&amp;#10;&amp;#10;Luckily, the King has also summoned Daryn and Derek. They can combine their magical abilities to open the barrier for a very short time, allowing just one person to enter the dungeon. But even with their combined power, they can only do this once every three hours. So, one by one the 18 heroes enter the dungeon, hoping to find the Amulet of D'eugor and survive to exit the dungeon. So far no one has returned&amp;hellip; and you are hero number 18, the last person to enter the dungeon. Daryn looks into your eyes before you enter the crack in the barrier. &amp;quot;Please, you are our last hope&amp;hellip;&amp;quot; You nod a little, then jump in&amp;hellip;.&amp;#10;&amp;#10;2. THE MISSION&amp;#10;Get out of the dungeon alive as rich as you can. And if you are able to, bring the Amulet of D&amp;rsquo;eugor!!&amp;#10;&amp;#10;</description>
        <yearpublished value="2008" />
        <minplayers value="1" />
        <maxplayers value="1" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="9">
            <results numplayers="1">
                <result value="Best" numvotes="9" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="1+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="3" />
            </results>
        </poll>
        <playingtime value="60" />
        <minplaytime value="60" />
        <maxplaytime value="60" />
        <minage value="0" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="5">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="1" />
                <result value="8" numvotes="1" />
                <result value="10" numvotes="3" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="5">
            <results>
                <result level="1" value="No necessary in-game text" numvotes="0" />
                <result level="2" value="Some necessary text - easily memorized or small crib sheet" numvotes="3" />
                <result level="3" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="1" />
                <result level="4" value="Extensive use of text - massive conversion needed to be playable" numvotes="1" />
                <result level="5" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1002" value="Card Game" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1120" value="Print &amp; Play" />
        <link type="boardgamemechanic" id="2040" value="Hand Management" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="4451" value="D Series" />
        <link type="boardgamefamily" id="5666" value="Solitaire Games" />
        <link type="boardgamedesigner" id="5445" value="Jack Darwid" />
        <link type="boardgamepublisher" id="10413" value="Jack Darwid Games" />
        <statistics page="1">
            <ratings >
                <usersrated value="206" />
                <average value="7.22748" />
                <bayesaverage value="5.76148" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="3254" bayesaverage="5.76148" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="479" bayesaverage="5.91642" />
                </ranks>
                <stddev value="1.38809" />
                <median value="0" />
                <owned value="378" />
                <trading value="5" />
                <wanting value="18" />
                <wishing value="204" />
                <numcomments value="131" />
                <numweights value="37" />
                <averageweight value="2.3243" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="136192">
        <thumbnail>https://cf.geekdo-images.com/images/pic3489805_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic3489805.jpg</image>
        <name type="primary" sortindex="1" value="Dungeon Dice" />
        <description>Dungeon Dice is a competitive, all-dice game with a classic adventuring feel in which players battle monsters and try to collect more dice than their friends. Players equip dice, drink dice potions, and kill dice monsters. If you've killed enough monsters, grab a level-up die. You get the idea.&amp;#10;&amp;#10;In the game, players take turns drawing monster dice from a bag. To defeat a monster, players roll their dice and compare them to the monster's dice. The totals change as players use abilities and attempt to aid or sabotage one another. With each victory, players earn more dice from bags full of potions, weapons, and magical artifacts. Players race to collect enough impressive dice to gain a claim on the throne, thereby winning the game.&amp;#10;&amp;#10;</description>
        <yearpublished value="2014" />
        <minplayers value="2" />
        <maxplayers value="5" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="22">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="3" />
                <result value="Not Recommended" numvotes="8" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="8" />
                <result value="Not Recommended" numvotes="5" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="12" />
                <result value="Recommended" numvotes="6" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="15" />
                <result value="Recommended" numvotes="4" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="6" />
                <result value="Recommended" numvotes="5" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="5+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
        </poll>
        <playingtime value="20" />
        <minplaytime value="20" />
        <maxplaytime value="20" />
        <minage value="8" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="15">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="6" />
                <result value="8" numvotes="6" />
                <result value="10" numvotes="1" />
                <result value="12" numvotes="2" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="18">
            <results>
                <result level="1" value="No necessary in-game text" numvotes="13" />
                <result level="2" value="Some necessary text - easily memorized or small crib sheet" numvotes="4" />
                <result level="3" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="4" value="Extensive use of text - massive conversion needed to be playable" numvotes="1" />
                <result level="5" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1017" value="Dice" />
        <link type="boardgamecategory" id="1035" value="Medieval" />
        <link type="boardgamecategory" id="1026" value="Negotiation" />
        <link type="boardgamemechanic" id="2664" value="Deck / Pool Building" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamefamily" id="8374" value="Crowdfunding: Kickstarter" />
        <link type="boardgameexpansion" id="227304" value="Dungeon Dice: Boss Monsters" />
        <link type="boardgameexpansion" id="176787" value="Dungeon Dice: Colosseum" />
        <link type="boardgameexpansion" id="225994" value="Dungeon Dice: Dual Artifact Pack" />
        <link type="boardgameexpansion" id="159624" value="Dungeon Dice: Familiar Pack" />
        <link type="boardgameexpansion" id="159626" value="Dungeon Dice: Five-Player Booster Pack" />
        <link type="boardgameexpansion" id="158227" value="Dungeon Dice: Guilds" />
        <link type="boardgameexpansion" id="143265" value="Dungeon Dice: KickStarter Exclusive Expansion" />
        <link type="boardgameexpansion" id="159622" value="Dungeon Dice: Monster Pack" />
        <link type="boardgameexpansion" id="159625" value="Dungeon Dice: Potion Pack" />
        <link type="boardgameexpansion" id="225138" value="Dungeon Dice: The Lost King" />
        <link type="boardgameexpansion" id="163975" value="Dungeon Dice: Thief Die" />
        <link type="boardgamedesigner" id="73815" value="Sam Coates" />
        <link type="boardgameartist" id="71139" value="Cam Kendell" />
        <link type="boardgamepublisher" id="35902" value="Golden Games" />
        <link type="boardgamepublisher" id="24295" value="Potluck Games" />
        <statistics page="1">
            <ratings >
                <usersrated value="489" />
                <average value="7.08472" />
                <bayesaverage value="5.89264" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="2444" bayesaverage="5.89264" />
                    <rank type="family" id="5499" name="familygames" friendlyname="Family Game Rank" value="695" bayesaverage="5.96295" />
                </ranks>
                <stddev value="1.79684" />
                <median value="0" />
                <owned value="1132" />
                <trading value="42" />
                <wanting value="54" />
                <wishing value="250" />
                <numcomments value="211" />
                <numweights value="43" />
                <averageweight value="2.1163" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="472">
        <thumbnail>https://cf.geekdo-images.com/images/pic184398_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic184398.jpg</image>
        <name type="primary" sortindex="1" value="DungeonQuest" />
        <name type="alternate" sortindex="1" value="Drachenhort" />
        <name type="alternate" sortindex="1" value="Drageborgen" />
        <name type="alternate" sortindex="1" value="Drakborgen" />
        <name type="alternate" sortindex="1" value="Skatten i borgen" />
        <description>Players explore the ruins of Castle Dragonfire trying to reach the treasure chamber in the center of the dungeon and escape alive with as much treasure as possible. A limited number of turns before the game ends puts pressure on players to take risks and score rewards because anyone left in the dungeon when time runs out dies! A tile-laying system creates the maze-like dungeon and ensures that no two games are ever exactly the same.&amp;#10;&amp;#10;Originally published as Drakborgen (Dragon's Keep) in 1985 by Brio AB. Sold in Norway (Skatten i borgen) and Denmark (Drageborgen). Licenced to Germany (Schmidt Spiele) as Drachenhort, to Great Britain (Games Workshop) as DungeonQuest. A 2nd edition named Drakborgen Legenden was released in 2002 (never released outside Sweden). The game was re-licensed to FFG in 2010, who released the 3rd edition the same year. See the family entry for more information.&amp;#10;&amp;#10;Expanded by:&amp;#10;&amp;#10;    Drakborgen II (the Swedish expansion that upon Games Workshop's British release was split into the two below:)&amp;#10;    Heroes for Dungeonquest&amp;#10;    Dungeonquest: Catacombs&amp;#10;&amp;#10;&amp;#10;&amp;#10;&amp;#10;Re-implemented by:&amp;#10;&amp;#10;    Drakborgen Legenden&amp;#10;    DungeonQuest (third edition)&amp;#10;    DungeonQuest Revised Edition&amp;#10;&amp;#10;&amp;#10;&amp;#10;&amp;#10;!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!&amp;#10;&amp;#10;&amp;#10;R&amp;egrave;gles en fran&amp;ccedil;ais de la Version Games Workshop 1987 de DungeonQuest&amp;#10;&amp;#10;+  Traduction fran&amp;ccedil;aise de la Feuille de R&amp;eacute;f&amp;eacute;rence&amp;#10;&amp;#10;https://sites.google.com/site/cyrunicorndungeonquest/home&amp;#10;&amp;#10;</description>
        <yearpublished value="1985" />
        <minplayers value="1" />
        <maxplayers value="4" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="43">
            <results numplayers="1">
                <result value="Best" numvotes="2" />
                <result value="Recommended" numvotes="21" />
                <result value="Not Recommended" numvotes="10" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="8" />
                <result value="Recommended" numvotes="23" />
                <result value="Not Recommended" numvotes="4" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="8" />
                <result value="Recommended" numvotes="25" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="29" />
                <result value="Recommended" numvotes="5" />
                <result value="Not Recommended" numvotes="3" />
            </results>
            <results numplayers="4+">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="21" />
            </results>
        </poll>
        <playingtime value="60" />
        <minplaytime value="20" />
        <maxplaytime value="60" />
        <minage value="10" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="11">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="1" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="5" />
                <result value="8" numvotes="3" />
                <result value="10" numvotes="2" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="13">
            <results>
                <result level="21" value="No necessary in-game text" numvotes="0" />
                <result level="22" value="Some necessary text - easily memorized or small crib sheet" numvotes="11" />
                <result level="23" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="2" />
                <result level="24" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="25" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2661" value="Press Your Luck" />
        <link type="boardgamemechanic" id="2003" value="Rock-Paper-Scissors" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamemechanic" id="2002" value="Tile Placement" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="7005" value="Animals: Dragons" />
        <link type="boardgamefamily" id="8132" value="Drakborgen" />
        <link type="boardgamefamily" id="5666" value="Solitaire Games" />
        <link type="boardgameexpansion" id="73510" value="Drakborgen II" />
        <link type="boardgameexpansion" id="1746" value="Dungeonquest: Catacombs" />
        <link type="boardgameexpansion" id="1745" value="Heroes for Dungeonquest" />
        <link type="boardgameimplementation" id="5177" value="Drakborgen Legenden" />
        <link type="boardgameimplementation" id="71061" value="DungeonQuest (third edition)" />
        <link type="boardgameimplementation" id="157958" value="DungeonQuest Revised Edition" />
        <link type="boardgamedesigner" id="228" value="Jakob Bonds" />
        <link type="boardgamedesigner" id="183" value="Dan Glimne" />
        <link type="boardgameartist" id="9163" value="Dave Andrews" />
        <link type="boardgameartist" id="979" value="Gary Chalk" />
        <link type="boardgameartist" id="12428" value="Colin Dixon" />
        <link type="boardgameartist" id="12430" value="Jes Goodwin" />
        <link type="boardgameartist" id="779" value="Anders Jeppsson" />
        <link type="boardgameartist" id="12488" value="Peter Andrew Jones" />
        <link type="boardgameartist" id="4802" value="Peter Jones (I)" />
        <link type="boardgameartist" id="12429" value="Pete Knifton" />
        <link type="boardgameartist" id="12431" value="Alastair Morrison" />
        <link type="boardgameartist" id="12427" value="Bill Sedgwick" />
        <link type="boardgamepublisher" id="404" value="Alga" />
        <link type="boardgamepublisher" id="26" value="Games Workshop Ltd." />
        <link type="boardgamepublisher" id="38" value="Schmidt Spiele" />
        <statistics page="1">
            <ratings >
                <usersrated value="2319" />
                <average value="6.69675" />
                <bayesaverage value="6.30777" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="1177" bayesaverage="6.30777" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="261" bayesaverage="6.4345" />
                </ranks>
                <stddev value="1.5447" />
                <median value="0" />
                <owned value="3260" />
                <trading value="129" />
                <wanting value="96" />
                <wishing value="312" />
                <numcomments value="820" />
                <numweights value="239" />
                <averageweight value="1.9331" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="157958">
        <thumbnail>https://cf.geekdo-images.com/images/pic2017396_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic2017396.jpg</image>
        <name type="primary" sortindex="1" value="DungeonQuest Revised Edition" />
        <name type="alternate" sortindex="1" value="DungeonQuest Edición revisada" />
        <name type="alternate" sortindex="1" value="Dungeonquest Neuauflage" />
        <name type="alternate" sortindex="1" value="ダンジョンクエスト・クラシック" />
        <name type="alternate" sortindex="1" value="地城任務" />
        <description>DungeonQuest Revised Edition is a fast-paced game of dungeon exploration and looting for one to four players. You take on the role of a hero who sets out to explore Dragonfire Dungeon and claim more treasure than your rivals. Along the way, you'll need to evade traps, battle monsters, and find your way through the labyrinthian dungeon, all while trying to avoid waking the dragon who sleeps atop the treasure heap at the dungeon's heart. The player who gathers the most loot &amp;ndash; and makes it out of the dungeon alive &amp;mdash; is victorious!&amp;#10;&amp;#10;This new edition of DungeonQuest features a streamlined combat system that harkens back to the classic editions of the game, and a deadlier dungeon than ever before. The &amp;quot;Torchlight&amp;quot; variant offers you a new way to explore the dungeon's depths, while building an even more complex and sprawling dungeon throughout the game.&amp;#10;&amp;#10;</description>
        <yearpublished value="2014" />
        <minplayers value="1" />
        <maxplayers value="4" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="21">
            <results numplayers="1">
                <result value="Best" numvotes="3" />
                <result value="Recommended" numvotes="5" />
                <result value="Not Recommended" numvotes="3" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="4" />
                <result value="Recommended" numvotes="9" />
                <result value="Not Recommended" numvotes="2" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="8" />
                <result value="Recommended" numvotes="7" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="14" />
                <result value="Recommended" numvotes="3" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4+">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="7" />
            </results>
        </poll>
        <playingtime value="60" />
        <minplaytime value="60" />
        <maxplaytime value="60" />
        <minage value="14" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="9">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="1" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="2" />
                <result value="8" numvotes="4" />
                <result value="10" numvotes="1" />
                <result value="12" numvotes="1" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="7">
            <results>
                <result level="1" value="No necessary in-game text" numvotes="0" />
                <result level="2" value="Some necessary text - easily memorized or small crib sheet" numvotes="5" />
                <result level="3" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="2" />
                <result level="4" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="5" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1035" value="Medieval" />
        <link type="boardgamemechanic" id="2046" value="Area Movement" />
        <link type="boardgamemechanic" id="2041" value="Card Drafting" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2685" value="Player Elimination" />
        <link type="boardgamemechanic" id="2661" value="Press Your Luck" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamemechanic" id="2081" value="Route/Network Building" />
        <link type="boardgamefamily" id="8132" value="Drakborgen" />
        <link type="boardgameimplementation" id="472" value="DungeonQuest" inbound="true"/>
        <link type="boardgameimplementation" id="71061" value="DungeonQuest (third edition)" inbound="true"/>
        <link type="boardgamedesigner" id="228" value="Jakob Bonds" />
        <link type="boardgamepublisher" id="3475" value="Arclight" />
        <link type="boardgamepublisher" id="2973" value="Edge Entertainment" />
        <link type="boardgamepublisher" id="17" value="Fantasy Flight Games" />
        <link type="boardgamepublisher" id="264" value="Heidelberger Spieleverlag" />
        <link type="boardgamepublisher" id="8759" value="Wargames Club Publishing" />
        <statistics page="1">
            <ratings >
                <usersrated value="864" />
                <average value="7.17883" />
                <bayesaverage value="6.22881" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="1343" bayesaverage="6.22881" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="248" bayesaverage="6.44948" />
                </ranks>
                <stddev value="1.49141" />
                <median value="0" />
                <owned value="1638" />
                <trading value="40" />
                <wanting value="122" />
                <wishing value="518" />
                <numcomments value="203" />
                <numweights value="55" />
                <averageweight value="1.9273" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="140519">
        <thumbnail>https://cf.geekdo-images.com/images/pic1721040_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic1721040.jpg</image>
        <name type="primary" sortindex="1" value="Myth" />
        <name type="alternate" sortindex="1" value="Myth" />
        <description>Myth is a fully co-operative fantasy game. Players take on the role of one of 5 different heroes working together to defeat the Darkness. Each hero has a different skill set which represented by a unique deck of cards. Players spend Action Points by using cards. Once a certain amount of Action Points have been spent the Darkness fights back by activating monster lairs, spawning monster captains and eventually the Boss.&amp;#10;&amp;#10;A complete game in Myth is called a Story. Each Story is played over three Acts. Acts can be played sequentially, or can be split up over three different game sessions.&amp;#10;&amp;#10;Players' avatars within a Story are called Heroes. Myth Heroes are clothed in immense power, able to reave all but the mightiest foes. However, this power must be balanced lest the Darkness take too much notice. Players must weigh their actions against the Threat each will bring, with the consequences of awakening more evil and bringing doom on the party's endeavors. And be careful they must, as the Darkness is formidable and eager to snatch glory from the valiant.&amp;#10;&amp;#10;Heroes are controlled through an intuitive Hero Deck (videos for each Hero can be found in the Game Play Videos section below). Each deck plays uniquely and allows players more freedom of action and the ability to truly impact the Story each and every Act. Yet, cooperation is the key to victory and bloody fortune. Players must communicate, interact, and assist each other or surely the Darkness will cover all.&amp;#10;&amp;#10;Myth is a fully cooperative game. There is no player controlling the Darkness. The Darkness is governed by a set of rules unique to each Boss Deck and is activated through Hero actions. If the Heroes get overzealous, then the Darkness pushes back by activating Lairs, spawning Captains, and punishing the Heroes with devious Events. If the Heroes take a more subtle approach, then the Darkness reacts by reducing the potential for treasure and rewards. Without the treasures and equipment to upgrade, the Heroes will find each Act more difficult and eventually fail. The dynamic nature of the Darkness really lends a more fluid feel to the Story. Players aren't being driven by properties out of their control, nor are they being shepherded by a person whose skill has a direct impact on the enjoyment of the game.&amp;#10;&amp;#10;Myth is a fun fantasy romp where players feel truly heroic. In the playing of the game, the players are creating their own mythos. These stories are the ones carried away from the table, becoming myths themselves. And these are the myths, with friends and family, that we carry with us; telling and retelling our endeavors at the mead benches, earning treasured smiles and laughter.&amp;#10;&amp;#10;</description>
        <yearpublished value="2014" />
        <minplayers value="2" />
        <maxplayers value="5" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="67">
            <results numplayers="1">
                <result value="Best" numvotes="5" />
                <result value="Recommended" numvotes="26" />
                <result value="Not Recommended" numvotes="17" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="5" />
                <result value="Recommended" numvotes="40" />
                <result value="Not Recommended" numvotes="2" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="17" />
                <result value="Recommended" numvotes="35" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="33" />
                <result value="Recommended" numvotes="22" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="9" />
                <result value="Recommended" numvotes="32" />
                <result value="Not Recommended" numvotes="6" />
            </results>
            <results numplayers="5+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="21" />
            </results>
        </poll>
        <playingtime value="120" />
        <minplaytime value="120" />
        <maxplaytime value="120" />
        <minage value="12" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="30">
            <results>
                <result value="2" numvotes="1" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="1" />
                <result value="10" numvotes="10" />
                <result value="12" numvotes="12" />
                <result value="14" numvotes="6" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="32">
            <results>
                <result level="1" value="No necessary in-game text" numvotes="0" />
                <result level="2" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="3" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="5" />
                <result level="4" value="Extensive use of text - massive conversion needed to be playable" numvotes="24" />
                <result level="5" value="Unplayable in another language" numvotes="3" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1047" value="Miniatures" />
        <link type="boardgamemechanic" id="2023" value="Co-operative Play" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2676" value="Grid Movement" />
        <link type="boardgamemechanic" id="2040" value="Hand Management" />
        <link type="boardgamemechanic" id="2079" value="Variable Phase Order" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="24281" value="Campaign Games" />
        <link type="boardgamefamily" id="8374" value="Crowdfunding: Kickstarter" />
        <link type="boardgamefamily" id="24709" value="Myth" />
        <link type="boardgameexpansion" id="158167" value="MERCS: Recon – Blood Contagion" />
        <link type="boardgameexpansion" id="165014" value="Myth: 'Who Brought Jokerman?' Promo" />
        <link type="boardgameexpansion" id="173095" value="Myth: Agents of Darkness" />
        <link type="boardgameexpansion" id="174721" value="Myth: Blackwall Warrens" />
        <link type="boardgameexpansion" id="166067" value="Myth: Bones Expansion Boss" />
        <link type="boardgameexpansion" id="154557" value="Myth: Crawlers Minion Pack" />
        <link type="boardgameexpansion" id="167038" value="Myth: Etrus the Last Mini Boss" />
        <link type="boardgameexpansion" id="165015" value="Myth: Gotta Get Those Ducats Promo" />
        <link type="boardgameexpansion" id="154558" value="Myth: Grubbers Minion Pack" />
        <link type="boardgameexpansion" id="167046" value="Myth: IA, The Foundation Boss" />
        <link type="boardgameexpansion" id="197334" value="Myth: Iao Captain Pack" />
        <link type="boardgameexpansion" id="194684" value="Myth: Iathi Minion Pack" />
        <link type="boardgameexpansion" id="166940" value="Myth: Items Expansion I" />
        <link type="boardgameexpansion" id="166933" value="Myth: Kickstarter Exclusive Rewards" />
        <link type="boardgameexpansion" id="204402" value="Myth: MERCS Recon Kickstarter Rewards" />
        <link type="boardgameexpansion" id="154622" value="Myth: Muckers Captain Pack" />
        <link type="boardgameexpansion" id="154250" value="Myth: Orcneas, Master of Masters Expansion Boss" />
        <link type="boardgameexpansion" id="166936" value="Myth: Quest Expansion 1" />
        <link type="boardgameexpansion" id="166937" value="Myth: Quest Expansion 2" />
        <link type="boardgameexpansion" id="173080" value="Myth: Rath Captain Pack" />
        <link type="boardgameexpansion" id="166065" value="Myth: Shamblers Minion Pack" />
        <link type="boardgameexpansion" id="174722" value="Myth: Shores of Kanis" />
        <link type="boardgameexpansion" id="149093" value="Myth: Skald Heroes" />
        <link type="boardgameexpansion" id="149781" value="Myth: Slaughterfield Supplement Pack" />
        <link type="boardgameexpansion" id="166066" value="Myth: Soulless Captain Pack" />
        <link type="boardgameexpansion" id="149092" value="Myth: Spriggan Hero" />
        <link type="boardgameexpansion" id="154624" value="Myth: Stalkers Captain Pack" />
        <link type="boardgameexpansion" id="197582" value="Myth: Sycleech Captain Pack" />
        <link type="boardgameexpansion" id="197542" value="Myth: Sycline Minion Pack" />
        <link type="boardgameexpansion" id="167045" value="Myth: Syclopt Boss" />
        <link type="boardgameexpansion" id="173079" value="Myth: Tailless Minion Pack" />
        <link type="boardgameexpansion" id="167044" value="Myth: The Rat King Expansion Boss" />
        <link type="boardgameexpansion" id="207053" value="Myth: Think About the Future" />
        <link type="boardgameexpansion" id="166932" value="Myth: Twilight Knight Mini Boss" />
        <link type="boardgameexpansion" id="167043" value="Myth: Urulok the Young Boss" />
        <link type="boardgamedesigner" id="35219" value="Brian Shotton" />
        <link type="boardgamedesigner" id="67840" value="Kenny Sims" />
        <link type="boardgameartist" id="27735" value="Keith Lowe" />
        <link type="boardgamepublisher" id="11600" value="MegaCon Games" />
        <link type="boardgamepublisher" id="264" value="Heidelberger Spieleverlag" />
        <link type="boardgamepublisher" id="6174" value="Ulisses Spiele" />
        <statistics page="1">
            <ratings >
                <usersrated value="1363" />
                <average value="6.77918" />
                <bayesaverage value="6.12174" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="1610" bayesaverage="6.12174" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="331" bayesaverage="6.23131" />
                </ranks>
                <stddev value="2.33535" />
                <median value="0" />
                <owned value="3249" />
                <trading value="184" />
                <wanting value="172" />
                <wishing value="1050" />
                <numcomments value="634" />
                <numweights value="129" />
                <averageweight value="3.8295" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="67878">
        <thumbnail>https://cf.geekdo-images.com/images/pic682886_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic682886.jpg</image>
        <name type="primary" sortindex="1" value="Dungeon Crawler" />
        <description>Dungeon Crawler is an adventure card game that is playable alone or with friends. You get to choose Adventurers, equip them, design your own Quests to conquer, seek out the evils that terrorize the lands, and save the Damsel. This intelligently designed game pulls together extraordinary art and fantasy flavor that can keep you spellbound in epic adventure.&amp;#10;&amp;#10;The creators of Dungeon Crawler pit your Adventurers against a series of perilous encounters deep within the domain of vile adversaries and insidious plot combinations, which they must strategically overcome.  This collectible starter includes 2 decks that support single player gaming. You can also use the starter in competitive and co-operative formats (provided that you or your friends have enough cards to support the format you have chosen to play). One is a 65 card grey-tone deck, known as the Dungeon deck. The other deck bears a similar logo with a blue backing. This deck is known as the Crawler deck which serves as a &amp;ldquo;bag of tricks&amp;rdquo; for your Adventurers.&amp;#10;&amp;#10;Source: Gifted Vision (Publisher)&amp;#10;&amp;#10;</description>
        <yearpublished value="2010" />
        <minplayers value="1" />
        <maxplayers value="6" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="13">
            <results numplayers="1">
                <result value="Best" numvotes="12" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="6" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="5" />
                <result value="Not Recommended" numvotes="2" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="4" />
                <result value="Not Recommended" numvotes="2" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="4" />
                <result value="Not Recommended" numvotes="2" />
            </results>
            <results numplayers="6">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="4" />
                <result value="Not Recommended" numvotes="2" />
            </results>
            <results numplayers="6+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="4" />
            </results>
        </poll>
        <playingtime value="60" />
        <minplaytime value="60" />
        <maxplaytime value="60" />
        <minage value="13" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="4">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="0" />
                <result value="10" numvotes="0" />
                <result value="12" numvotes="3" />
                <result value="14" numvotes="1" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="5">
            <results>
                <result level="1" value="No necessary in-game text" numvotes="0" />
                <result level="2" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="3" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="5" />
                <result level="4" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="5" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1002" value="Card Game" />
        <link type="boardgamecategory" id="1044" value="Collectible Components" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamemechanic" id="2023" value="Co-operative Play" />
        <link type="boardgamemechanic" id="2040" value="Hand Management" />
        <link type="boardgamemechanic" id="2008" value="Trading" />
        <link type="boardgamemechanic" id="2079" value="Variable Phase Order" />
        <link type="boardgamefamily" id="5666" value="Solitaire Games" />
        <link type="boardgameexpansion" id="126029" value="Dungeon Crawler: Mines of Khurgan" />
        <link type="boardgameexpansion" id="200295" value="Dungeon Crawler: The Thorn" />
        <link type="boardgamedesigner" id="36251" value="Jey Legarie" />
        <link type="boardgameartist" id="36260" value="Daniel Alexander" />
        <link type="boardgameartist" id="16495" value="David Bezzina" />
        <link type="boardgameartist" id="36268" value="Ricardo Boronat" />
        <link type="boardgameartist" id="36266" value="Steve Brigantino" />
        <link type="boardgameartist" id="36267" value="Simon Buckroyd" />
        <link type="boardgameartist" id="36254" value="Lauren K. Cannon" />
        <link type="boardgameartist" id="36263" value="Amy Cater" />
        <link type="boardgameartist" id="36262" value="Brian Curtis" />
        <link type="boardgameartist" id="36256" value="Jennifer Duczmal" />
        <link type="boardgameartist" id="36252" value="Mikael Dupuy" />
        <link type="boardgameartist" id="36269" value="Priscila Fernandes" />
        <link type="boardgameartist" id="36258" value="Falk Hansel" />
        <link type="boardgameartist" id="36271" value="Neil LaPointe" />
        <link type="boardgameartist" id="36251" value="Jey Legarie" />
        <link type="boardgameartist" id="36264" value="Alex Li" />
        <link type="boardgameartist" id="15291" value="Claudio Pozas" />
        <link type="boardgameartist" id="36255" value="Kira Santa" />
        <link type="boardgameartist" id="36270" value="Nicolas Tribehou" />
        <link type="boardgameartist" id="20646" value="Manny Vega" />
        <link type="boardgameartist" id="36257" value="Jared von Hindman" />
        <link type="boardgameartist" id="36265" value="Vanessa Walsh" />
        <link type="boardgamepublisher" id="4" value="(Self-Published)" />
        <link type="boardgamepublisher" id="11823" value="Gifted Vision" />
        <statistics page="1">
            <ratings >
                <usersrated value="134" />
                <average value="6.83149" />
                <bayesaverage value="5.61976" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="5172" bayesaverage="5.61976" />
                    <rank type="family" id="4667" name="cgs" friendlyname="Customizable Rank" value="135" bayesaverage="5.81528" />
                </ranks>
                <stddev value="2.19857" />
                <median value="0" />
                <owned value="353" />
                <trading value="28" />
                <wanting value="56" />
                <wishing value="207" />
                <numcomments value="83" />
                <numweights value="13" />
                <averageweight value="2.5385" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="2301">
        <thumbnail>https://cf.geekdo-images.com/images/pic183293_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic183293.jpg</image>
        <name type="primary" sortindex="5" value="The New Dungeon!" />
        <description>A revised version of the TSR classic board game Dungeon. This version has a larger playing board and updated rules. Most notably, new character classes were added and the combat system was revised to be a bit more forgiving to the player. Also, the ability to heal and cooperate or trade with other players was added.&amp;#10;&amp;#10;Re-Implements:&amp;#10;&amp;#10;    Dungeon&amp;#10;&amp;#10;&amp;#10;&amp;#10;&amp;#10;Expanded by:&amp;#10;&amp;#10;    The New Dungeon Miniatures and Game Supplement&amp;#10;&amp;#10;&amp;#10;&amp;#10;&amp;#10;</description>
        <yearpublished value="1989" />
        <minplayers value="1" />
        <maxplayers value="6" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="8">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="5" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="4" />
                <result value="Not Recommended" numvotes="2" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="6" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="7" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="4" />
                <result value="Recommended" numvotes="3" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="6">
                <result value="Best" numvotes="3" />
                <result value="Recommended" numvotes="2" />
                <result value="Not Recommended" numvotes="2" />
            </results>
            <results numplayers="6+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="3" />
            </results>
        </poll>
        <playingtime value="45" />
        <minplaytime value="45" />
        <maxplaytime value="45" />
        <minage value="8" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="2">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="1" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="1" />
                <result value="10" numvotes="0" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="3">
            <results>
                <result level="1" value="No necessary in-game text" numvotes="0" />
                <result level="2" value="Some necessary text - easily memorized or small crib sheet" numvotes="3" />
                <result level="3" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="4" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="5" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1017" value="Dice" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamecategory" id="1035" value="Medieval" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamemechanic" id="2035" value="Roll / Spin and Move" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgameexpansion" id="2053" value="The New Dungeon: Miniatures and Game Supplement" />
        <link type="boardgameimplementation" id="1339" value="Dungeon!" inbound="true"/>
        <link type="boardgamedesigner" id="573" value="Jeff Grubb" />
        <link type="boardgamedesigner" id="574" value="David R. Megarry" />
        <link type="boardgamedesigner" id="562" value="Steve Winter" />
        <link type="boardgamepublisher" id="4680" value="Borras Plana S.A." />
        <link type="boardgamepublisher" id="10292" value="Fafner Spil" />
        <link type="boardgamepublisher" id="28" value="Parker Brothers" />
        <link type="boardgamepublisher" id="16" value="TSR" />
        <statistics page="1">
            <ratings >
                <usersrated value="433" />
                <average value="6.10236" />
                <bayesaverage value="5.658" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="4434" bayesaverage="5.658" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="644" bayesaverage="5.69393" />
                </ranks>
                <stddev value="1.44479" />
                <median value="0" />
                <owned value="775" />
                <trading value="51" />
                <wanting value="23" />
                <wishing value="71" />
                <numcomments value="161" />
                <numweights value="50" />
                <averageweight value="1.68" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="42361">
        <thumbnail>https://cf.geekdo-images.com/images/pic479763_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic479763.jpg</image>
        <name type="primary" sortindex="1" value="Pocket Dungeon" />
        <description>A solo Print and Play dungeon crawler. &amp;#10;Several of Pocket Dungeons interesting features are :&amp;#10;- Stealth dice. Pocket Dungeon is the first game to introduce stealth dice. If you follow the instructions presented, you can use your stealth dice that are created to play any number of different games besides Pocket Dungeon.&amp;#10;- The DunGen system to quickly generate a random and dynamic dungeon as your explore. &amp;#10;- Highly customizable. Pocket Dungeon leaves plenty of room for you to input your own content, without having to remove existing parts of the game.&amp;#10;- Quick and easy game play. Pocket Dungeon is designed to be played either in a single setting, or in chunks of just a few minutes as you avoid doing something more productive, like work.&amp;#10;- Pocket Dungeon is released under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License. So feel free to remix and share away! Find out more here: http://creativecommons.org/licenses/by-nc-sa/3.0/&amp;#10;&amp;#10;You can download the files for the core game at &amp;#10;http://www.boardgamegeek.com/filepage/42518&amp;#10;&amp;#10;The first expansion, Pocket Tome of Equipment can be downloaded here:&amp;#10;http://www.boardgamegeek.com/filepage/47654&amp;#10;&amp;#10;There are two stand alone adventures for Pocket Dungeon.They are:&amp;#10;&amp;#10;Stonehands Dungeon.&amp;#10;http://www.boardgamegeek.com/filepage/42519&amp;#10;&amp;#10;Cult of Mozozar&amp;#10;http://www.boardgamegeek.com/filepage/42520&amp;#10;&amp;#10;</description>
        <yearpublished value="2009" />
        <minplayers value="1" />
        <maxplayers value="1" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="5">
            <results numplayers="1">
                <result value="Best" numvotes="4" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="1+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="1" />
            </results>
        </poll>
        <playingtime value="45" />
        <minplaytime value="45" />
        <maxplaytime value="45" />
        <minage value="8" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="4">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="1" />
                <result value="8" numvotes="2" />
                <result value="10" numvotes="0" />
                <result value="12" numvotes="1" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="2">
            <results>
                <result level="16" value="No necessary in-game text" numvotes="0" />
                <result level="17" value="Some necessary text - easily memorized or small crib sheet" numvotes="2" />
                <result level="18" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="19" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="20" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1017" value="Dice" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamecategory" id="1059" value="Maze" />
        <link type="boardgamecategory" id="1120" value="Print &amp; Play" />
        <link type="boardgamecategory" id="1028" value="Puzzle" />
        <link type="boardgamemechanic" id="2001" value="Action Point Allowance System" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2039" value="Line Drawing" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamemechanic" id="2055" value="Paper-and-Pencil" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="5666" value="Solitaire Games" />
        <link type="boardgamedesigner" id="12679" value="Jonathan Gilmour" />
        <link type="boardgamepublisher" id="4" value="(Self-Published)" />
        <link type="boardgamepublisher" id="1001" value="(Web published)" />
        <link type="boardgamepublisher" id="14966" value="Print &amp; Play Productions" />
        <statistics page="1">
            <ratings >
                <usersrated value="65" />
                <average value="7.04385" />
                <bayesaverage value="5.5454" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="8144" bayesaverage="5.5454" />
                </ranks>
                <stddev value="1.87734" />
                <median value="0" />
                <owned value="192" />
                <trading value="1" />
                <wanting value="5" />
                <wishing value="103" />
                <numcomments value="41" />
                <numweights value="19" />
                <averageweight value="1.5789" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="90730">
        <thumbnail>https://cf.geekdo-images.com/images/pic898905_t.png</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic898905.png</image>
        <name type="primary" sortindex="1" value="Dungeon in a Tin" />
        <description>Dungeon in a Tin is a solo or cooperative dungeon-hack. Players descend into a dungeon randomly laid-out from a stack of tiles, fighting through the orc and goblin hordes to rescue the kidnapped maiden and collect treasure and glory.&amp;#10;&amp;#10;Each player takes turns to move through the dungeon one tile at a time, laying new tiles as unexplored areas are entered; every time a player enters a room, special monster dice are rolled to determine the enemies faced and the potential loot to be found. When a monster attacks, a die is rolled to determine the style of their attack; the player then chooses a card from his hand to counter with, each card being strong against some kinds of attack and weak against others.&amp;#10;&amp;#10;The ultimate goal of the game is for the players to fight their way to the bottom of the dungeon to rescue the captured maiden - and then fight their way out with her. The dungeon will become harder to fight through as the player delves deeper, and then harder still on the way out with a helpless rescuee in tow.&amp;#10;&amp;#10;This Print-and-Play game was an entry in the 'One Full-sheet Label' design contest here on BGG, and as such the printed components fit entirely on a single label sheet. A small number of other tokens and blank dice will also be required. Additionally, as the name hints, once constructed on cardstock it is possible to fit the game inside an Altoids tin or similar.&amp;#10;&amp;#10;</description>
        <yearpublished value="2011" />
        <minplayers value="1" />
        <maxplayers value="4" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="4">
            <results numplayers="1">
                <result value="Best" numvotes="4" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="4+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="2" />
            </results>
        </poll>
        <playingtime value="20" />
        <minplaytime value="20" />
        <maxplaytime value="20" />
        <minage value="8" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="4">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="3" />
                <result value="10" numvotes="0" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="1" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="5">
            <results>
                <result level="11" value="No necessary in-game text" numvotes="5" />
                <result level="12" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="13" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="14" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="15" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamecategory" id="1120" value="Print &amp; Play" />
        <link type="boardgamemechanic" id="2023" value="Co-operative Play" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamemechanic" id="2007" value="Pick-up and Deliver" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamefamily" id="5666" value="Solitaire Games" />
        <link type="boardgamedesigner" id="23504" value="Jake Staines" />
        <link type="boardgameartist" id="23504" value="Jake Staines" />
        <link type="boardgamepublisher" id="1001" value="(Web published)" />
        <statistics page="1">
            <ratings >
                <usersrated value="70" />
                <average value="6.54286" />
                <bayesaverage value="5.56141" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="7242" bayesaverage="5.56141" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="732" bayesaverage="5.60467" />
                </ranks>
                <stddev value="1.22107" />
                <median value="0" />
                <owned value="163" />
                <trading value="2" />
                <wanting value="7" />
                <wishing value="133" />
                <numcomments value="38" />
                <numweights value="8" />
                <averageweight value="1.625" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="31412">
        <thumbnail>https://cf.geekdo-images.com/images/pic370834_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic370834.jpg</image>
        <name type="primary" sortindex="1" value="Dungeon Plungin&#039;" />
        <description>Dungeon Plungin' is a fantasy board game of exploration and adventure.&amp;#10;&amp;#10;It has a basic rule book which describes the system. On top of this you need one of the scenario books.  Each scenario book contains specific rules, objectives, floor tiles and stand up figures for a single mission.&amp;#10;&amp;#10;In play you build a party of adventurers, then build a dungeon as you go, following the scenario specific rules.  There are treasures, traps, and monsters to be overcome.  Your party members can get stronger during play.  Every game is different as the number of variables is huge.&amp;#10;&amp;#10;</description>
        <yearpublished value="2007" />
        <minplayers value="1" />
        <maxplayers value="4" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="5">
            <results numplayers="1">
                <result value="Best" numvotes="2" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="3" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="2" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="2" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="1" />
            </results>
        </poll>
        <playingtime value="60" />
        <minplaytime value="60" />
        <maxplaytime value="60" />
        <minage value="0" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="4">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="0" />
                <result value="10" numvotes="1" />
                <result value="12" numvotes="2" />
                <result value="14" numvotes="1" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="2">
            <results>
                <result level="11" value="No necessary in-game text" numvotes="0" />
                <result level="12" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="13" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="1" />
                <result level="14" value="Extensive use of text - massive conversion needed to be playable" numvotes="1" />
                <result level="15" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1017" value="Dice" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamecategory" id="1120" value="Print &amp; Play" />
        <link type="boardgamemechanic" id="2023" value="Co-operative Play" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamedesigner" id="5953" value="Shaun Austin" />
        <link type="boardgamedesigner" id="9232" value="P. J. Pieterek" />
        <link type="boardgamedesigner" id="7566" value="Bobby R. Wallen Jr." />
        <link type="boardgamepublisher" id="5858" value="Oversoul Games" />
        <link type="boardgamepublisher" id="14966" value="Print &amp; Play Productions" />
        <statistics page="1">
            <ratings >
                <usersrated value="42" />
                <average value="6.90476" />
                <bayesaverage value="5.54187" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="8377" bayesaverage="5.54187" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="764" bayesaverage="5.57212" />
                </ranks>
                <stddev value="1.53622" />
                <median value="0" />
                <owned value="126" />
                <trading value="1" />
                <wanting value="11" />
                <wishing value="151" />
                <numcomments value="44" />
                <numweights value="7" />
                <averageweight value="2.1429" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="179275">
        <thumbnail>https://cf.geekdo-images.com/images/pic3019101_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic3019101.jpg</image>
        <name type="primary" sortindex="1" value="One Deck Dungeon" />
        <name type="alternate" sortindex="1" value="Karciane Podziemia" />
        <name type="alternate" sortindex="1" value="One Deck Dungeon 1.5" />
        <description>One Deck Dungeon is a card game &amp;quot;roguelike&amp;quot; &amp;mdash; a dungeon delve that is different every time, difficult to survive, with a character you build up from scratch. The deck consists of various foes to combat and other perils from the dungeon. Each card, though, depicts both the obstacle to overcome and the potential rewards for doing so. When you defeat a card, you claim it as either experience, an item, or a skill, tucking it under the appropriate side of your character card to show its benefits.&amp;#10;&amp;#10;The longer you take exploring the dungeon, the deeper you'll delve, and the difficulty will scale up quickly! If you make it far enough, you'll have to fight the dungeon boss. Survive, and you'll be a legend!&amp;#10;&amp;#10;One Deck Dungeon is designed for 1-2 players. With multiple sets, you can add more players.&amp;#10;&amp;#10;</description>
        <yearpublished value="2016" />
        <minplayers value="1" />
        <maxplayers value="2" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="38">
            <results numplayers="1">
                <result value="Best" numvotes="25" />
                <result value="Recommended" numvotes="9" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="8" />
                <result value="Recommended" numvotes="19" />
                <result value="Not Recommended" numvotes="6" />
            </results>
            <results numplayers="2+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="7" />
                <result value="Not Recommended" numvotes="13" />
            </results>
        </poll>
        <playingtime value="45" />
        <minplaytime value="30" />
        <maxplaytime value="45" />
        <minage value="14" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="8">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="1" />
                <result value="8" numvotes="4" />
                <result value="10" numvotes="1" />
                <result value="12" numvotes="2" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="3">
            <results>
                <result level="6" value="No necessary in-game text" numvotes="0" />
                <result level="7" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="8" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="3" />
                <result level="9" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="10" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1002" value="Card Game" />
        <link type="boardgamecategory" id="1017" value="Dice" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1035" value="Medieval" />
        <link type="boardgamecategory" id="1101" value="Video Game Theme" />
        <link type="boardgamemechanic" id="2023" value="Co-operative Play" />
        <link type="boardgamemechanic" id="2664" value="Deck / Pool Building" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamefamily" id="5666" value="Solitaire Games" />
        <link type="boardgameintegration" id="224821" value="One Deck Dungeon: Forest of Shadows" />
        <link type="boardgamedesigner" id="7011" value="Chris Cieslik" />
        <link type="boardgameartist" id="73851" value="Alanna Cervenak" />
        <link type="boardgameartist" id="83354" value="Will Pitzer" />
        <link type="boardgamepublisher" id="5407" value="Asmadi Games" />
        <link type="boardgamepublisher" id="31815" value="Czacha Games" />
        <statistics page="1">
            <ratings >
                <usersrated value="1412" />
                <average value="7.51913" />
                <bayesaverage value="6.6206" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="685" bayesaverage="6.6206" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="141" bayesaverage="6.82994" />
                </ranks>
                <stddev value="1.29915" />
                <median value="0" />
                <owned value="3723" />
                <trading value="64" />
                <wanting value="256" />
                <wishing value="1074" />
                <numcomments value="504" />
                <numweights value="37" />
                <averageweight value="2.0541" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="140125">
        <thumbnail>https://cf.geekdo-images.com/images/pic1667550_t.png</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic1667550.png</image>
        <name type="primary" sortindex="1" value="Fallen" />
        <description>Fallen is a two-player card and dice game with fast and challenging game play, gorgeous art, and plenty of re-playability all wrapped up in an ever-changing story.&amp;#10;&amp;#10;One player chooses a Hero to delve deep within a dungeon, seeking the ultimate evil that waits below. Play as Seroth the Pit Fighter and fight to win at any cost, Merace the Sorceress and cast devastating spells, or Ranek the Thief striking from the shadows.&amp;#10;&amp;#10;Every Hero comes with a unique character card depicting the hero and the special abilities and proficiencies of that particular character. Each hero also comes with nine unique skills to choose from which are divided into three skill trees catering to a particular proficiency. Ten signature Power cards also come with each hero, giving them special abilities that are themed to their style of play.&amp;#10;&amp;#10;The second player takes on the role of the Dungeon Lord, summoning vile creatures and ancient spells to defeat the Hero. Play as the Archivist of Souls weaving dark spells that plague the hero, the Forge Master, part wizard and part machine, filling the dungeon corridors with horribly augmented monstrosities, or as Krogarn the Ogre king sending your primal horde and spirit magic to hunt down the adventurer.&amp;#10;&amp;#10;Similar to the Hero, the Dungeon Lord has a character card that depicts the chosen form as well as showing the special abilities used by that character. In addition, ten signature Power cards come with each Dungeon Lord that are specific to style of villainy.&amp;#10;&amp;#10;Unique Story cards bring the dungeons of Fallen to life. These cards deliver an immersive dungeon experience for players new to gaming, yet have deeper mechanics to keep even die-hard players on their toes.&amp;#10;&amp;#10;After adventuring through the dungeon, the Hero and Dungeon Lord clash in an epic battle between good and evil. The challenges are fast and furious as cards are played and custom dice are rolled.&amp;#10;&amp;#10;This is the game of Fallen.&amp;#10;&amp;#10;Featuring&amp;#10;&amp;#10;- Play as one of three legendary Heroes OR play as one of three sinister Dungeon Lords&amp;#10;- Custom dice&amp;#10;- Story cards that drive the action&amp;#10;- Customizable Heroes&amp;#10;- A full dungeon experience in 90 minutes&amp;#10;&amp;#10;</description>
        <yearpublished value="2014" />
        <minplayers value="2" />
        <maxplayers value="2" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="15">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="7" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="10" />
                <result value="Recommended" numvotes="5" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="7" />
            </results>
        </poll>
        <playingtime value="90" />
        <minplaytime value="90" />
        <maxplaytime value="90" />
        <minage value="14" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="9">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="1" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="0" />
                <result value="10" numvotes="1" />
                <result value="12" numvotes="5" />
                <result value="14" numvotes="2" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="14">
            <results>
                <result level="1" value="No necessary in-game text" numvotes="0" />
                <result level="2" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="3" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="4" value="Extensive use of text - massive conversion needed to be playable" numvotes="14" />
                <result level="5" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1002" value="Card Game" />
        <link type="boardgamecategory" id="1017" value="Dice" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2040" value="Hand Management" />
        <link type="boardgamemechanic" id="2027" value="Storytelling" />
        <link type="boardgamefamily" id="8374" value="Crowdfunding: Kickstarter" />
        <link type="boardgameexpansion" id="173256" value="Fallen: Cataclysm Adventure Pack" />
        <link type="boardgameexpansion" id="174393" value="Fallen: Cursed Sands" />
        <link type="boardgameexpansion" id="173258" value="Fallen: Dark Tower Adventure Pack" />
        <link type="boardgameexpansion" id="174392" value="Fallen: Depths of the Glarr" />
        <link type="boardgameexpansion" id="174391" value="Fallen: Outlands Bonus Pack" />
        <link type="boardgameexpansion" id="173255" value="Fallen: Ruined Stronghold Adventure Pack" />
        <link type="boardgameexpansion" id="173257" value="Fallen: Underworld Adventure Pack" />
        <link type="boardgamecompilation" id="173259" value="Fallen: Kickstarter Edition" />
        <link type="boardgamedesigner" id="67688" value="Tom W. Green, III" />
        <link type="boardgamedesigner" id="67687" value="Stephen C. Smith" />
        <link type="boardgameartist" id="67722" value="Edward Boberg" />
        <link type="boardgameartist" id="67723" value="Jeff Brown (II)" />
        <link type="boardgameartist" id="36267" value="Simon Buckroyd" />
        <link type="boardgameartist" id="67924" value="Joshua Calloway" />
        <link type="boardgameartist" id="67925" value="CubeArt" />
        <link type="boardgameartist" id="50670" value="Giorgio De Michele" />
        <link type="boardgameartist" id="67726" value="Tugsbayar Jamts" />
        <link type="boardgameartist" id="67724" value="Michael Mowat" />
        <link type="boardgameartist" id="67725" value="Zagladko Sergei Petrovich" />
        <link type="boardgamepublisher" id="24784" value="Watchtower Games" />
        <statistics page="1">
            <ratings >
                <usersrated value="420" />
                <average value="8.15021" />
                <bayesaverage value="6.1445" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="1561" bayesaverage="6.1445" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="231" bayesaverage="6.49247" />
                </ranks>
                <stddev value="1.47327" />
                <median value="0" />
                <owned value="786" />
                <trading value="34" />
                <wanting value="96" />
                <wishing value="335" />
                <numcomments value="167" />
                <numweights value="57" />
                <averageweight value="3.0526" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="66424">
        <thumbnail>https://cf.geekdo-images.com/images/pic954633_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic954633.jpg</image>
        <name type="primary" sortindex="1" value="Dungeon Run" />
        <description>A tale of teamwork and betrayal!&amp;#10;&amp;#10;The mole ogre howled out as it collapsed into a bloody pile of rent flesh and broken bone. The aging knight bent over, panting heavily, and gave his dwarven peer an approving nod. It had taken great effort between them both to slay the beast, and they had each taken their share of wounds. But in the end their cooperation had paid off and they both knew it. And then their eyes found the treasure chest sitting in the corner of the room.&amp;#10;&amp;#10;They looked at each other. They looked back at the treasure... and then the real fight began.&amp;#10;&amp;#10;The game where YOU are the final boss!&amp;#10;&amp;#10;Dungeon Run is an exciting dash through a dungeon packed with monsters and traps. Each player controls a unique hero capable of great feats, and whose powers and abilities are upgradable and customizable throughout the game. Players can work together to overcome the perils of the dungeon, or they can betray and sabotage each other as they see fit. Because in the final room of the dungeon lurks a powerful boss with the ultimate treasure - a treasure that turns its owner into the most powerful warrior they can become! Slay the boss, steal the treasure, and then run for your life as your friends try to cut you down.  In Dungeon Run only one hero can escape with the fabled Summoning Stone. Don't crawl - run!&amp;#10;&amp;#10;Dungeon Run features a randomly assembled dungeon that changes each time you play, as do the monsters you face and the treasures you find. Eight different heroes each with unique options for customization further add to a wealth of game play options. Choose the vicious Tundra Orc and bash your way through everything that stands in your path. Play as the cunning Grounder Wizard and use your magic to cheat the laws of nature. Select the Guild Dwarf adventurer and lay traps to ensnare your friends. There are many paths to victory in Dungeon Run. Win by working with your friends or against them - just win!&amp;#10;&amp;#10;</description>
        <yearpublished value="2011" />
        <minplayers value="1" />
        <maxplayers value="6" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="35">
            <results numplayers="1">
                <result value="Best" numvotes="5" />
                <result value="Recommended" numvotes="6" />
                <result value="Not Recommended" numvotes="10" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="5" />
                <result value="Recommended" numvotes="11" />
                <result value="Not Recommended" numvotes="11" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="5" />
                <result value="Recommended" numvotes="16" />
                <result value="Not Recommended" numvotes="2" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="20" />
                <result value="Recommended" numvotes="7" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="5" />
                <result value="Recommended" numvotes="8" />
                <result value="Not Recommended" numvotes="6" />
            </results>
            <results numplayers="6">
                <result value="Best" numvotes="4" />
                <result value="Recommended" numvotes="5" />
                <result value="Not Recommended" numvotes="12" />
            </results>
            <results numplayers="6+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="9" />
            </results>
        </poll>
        <playingtime value="60" />
        <minplaytime value="60" />
        <maxplaytime value="60" />
        <minage value="9" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="4">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="2" />
                <result value="10" numvotes="2" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="10">
            <results>
                <result level="16" value="No necessary in-game text" numvotes="0" />
                <result level="17" value="Some necessary text - easily memorized or small crib sheet" numvotes="4" />
                <result level="18" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="5" />
                <result level="19" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="20" value="Unplayable in another language" numvotes="1" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1047" value="Miniatures" />
        <link type="boardgamemechanic" id="2046" value="Area Movement" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="5666" value="Solitaire Games" />
        <link type="boardgamedesigner" id="30291" value="Mr. Bistro" />
        <link type="boardgameartist" id="29142" value="John Ariosa" />
        <link type="boardgameartist" id="49367" value="Michael S. Kelly" />
        <link type="boardgameartist" id="11868" value="Sergi Marcet" />
        <link type="boardgamepublisher" id="1001" value="(Web published)" />
        <link type="boardgamepublisher" id="10754" value="Plaid Hat Games" />
        <statistics page="1">
            <ratings >
                <usersrated value="1408" />
                <average value="6.31644" />
                <bayesaverage value="5.93404" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="2244" bayesaverage="5.93404" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="416" bayesaverage="6.03747" />
                </ranks>
                <stddev value="1.55984" />
                <median value="0" />
                <owned value="1929" />
                <trading value="148" />
                <wanting value="175" />
                <wishing value="891" />
                <numcomments value="455" />
                <numweights value="82" />
                <averageweight value="2.2073" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="138788">
        <thumbnail>https://cf.geekdo-images.com/images/pic1585905_t.png</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic1585905.png</image>
        <name type="primary" sortindex="1" value="Dungeon Roll" />
        <name type="alternate" sortindex="1" value="Сундук приключений" />
        <description>The Dungeon lies before you; you&amp;rsquo;ve assembled your party of hearty adventurers and have a few tricks up your sleeve. How far will you go to seek glory and fame? Will you risk losing everything?&amp;#10;&amp;#10;In Dungeon Roll the player's goal is to collect the most experience points by defeating monsters, battling the dragon, and amassing treasure. Each player selects a Hero avatar, such as a Mercenary, Half-Goblin, or Enchantress, which provides them with unique powers. Then players take turns being the Adventurer, who boldly enters the dungeon seeking glory.&amp;#10;&amp;#10;The Adventurer assembles their party by rolling seven Party Dice, while another player serves as the Dungeon Lord and rolls a number of Dungeon Dice based on how far the Adventurer has progressed through the dungeon. The Adventurer uses Champion, Fighter, Cleric, Mage, Thief, and Scroll faces on the Party Dice to defeat monsters such as oozes and skeletons, to claim treasure inside chests, and to revive downed companions with potions. The Adventurer claims treasure by taking a token at random from inside the treasure chest-shaped game box.&amp;#10;&amp;#10;All this fighting in the dungeon is certain to attract the attention of the boss: The Dragon!&amp;#10;&amp;#10;When three or more Dragon faces appear on the Dungeon Dice, the Adventurer must battle the Dragon. Defeating the dragon is a team effort, requiring three different companion types. After three rounds, the players add up their experience points and retire to the inn to celebrate their exploits and to plan their next foray into the next deadly dungeon!&amp;#10;&amp;#10;</description>
        <yearpublished value="2013" />
        <minplayers value="1" />
        <maxplayers value="4" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="154">
            <results numplayers="1">
                <result value="Best" numvotes="57" />
                <result value="Recommended" numvotes="61" />
                <result value="Not Recommended" numvotes="10" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="95" />
                <result value="Recommended" numvotes="39" />
                <result value="Not Recommended" numvotes="5" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="15" />
                <result value="Recommended" numvotes="60" />
                <result value="Not Recommended" numvotes="43" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="7" />
                <result value="Recommended" numvotes="21" />
                <result value="Not Recommended" numvotes="86" />
            </results>
            <results numplayers="4+">
                <result value="Best" numvotes="2" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="90" />
            </results>
        </poll>
        <playingtime value="15" />
        <minplaytime value="15" />
        <maxplaytime value="15" />
        <minage value="8" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="34">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="1" />
                <result value="5" numvotes="3" />
                <result value="6" numvotes="13" />
                <result value="8" numvotes="15" />
                <result value="10" numvotes="2" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="33">
            <results>
                <result level="21" value="No necessary in-game text" numvotes="0" />
                <result level="22" value="Some necessary text - easily memorized or small crib sheet" numvotes="25" />
                <result level="23" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="7" />
                <result level="24" value="Extensive use of text - massive conversion needed to be playable" numvotes="1" />
                <result level="25" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1017" value="Dice" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2040" value="Hand Management" />
        <link type="boardgamemechanic" id="2661" value="Press Your Luck" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="7005" value="Animals: Dragons" />
        <link type="boardgamefamily" id="8374" value="Crowdfunding: Kickstarter" />
        <link type="boardgamefamily" id="23871" value="Dungeon Roll" />
        <link type="boardgamefamily" id="5666" value="Solitaire Games" />
        <link type="boardgamefamily" id="17927" value="TMG Originals" />
        <link type="boardgameexpansion" id="139582" value="Dungeon Roll Hero: Guild Leader" />
        <link type="boardgameexpansion" id="168092" value="Dungeon Roll Hero: Time Traveler" />
        <link type="boardgameexpansion" id="167665" value="Dungeon Roll Legends: Hero Booster Pack #2" />
        <link type="boardgameexpansion" id="226527" value="Dungeon Roll: Henchmen" />
        <link type="boardgameexpansion" id="139583" value="Dungeon Roll: Hero Booster Pack #1" />
        <link type="boardgameexpansion" id="150233" value="Dungeon Roll: Winter Heroes Pack" />
        <link type="boardgamedesigner" id="67287" value="Chris Darden" />
        <link type="boardgameartist" id="40032" value="Eric J. Carter" />
        <link type="boardgameartist" id="12993" value="Ryan Johnson" />
        <link type="boardgameartist" id="67288" value="Rob Lundy" />
        <link type="boardgamepublisher" id="2973" value="Edge Entertainment" />
        <link type="boardgamepublisher" id="15605" value="Galápagos Jogos" />
        <link type="boardgamepublisher" id="18852" value="Hobby World" />
        <link type="boardgamepublisher" id="39" value="Pegasus Spiele" />
        <link type="boardgamepublisher" id="3242" value="Raven Distribution" />
        <link type="boardgamepublisher" id="9499" value="Tasty Minstrel Games" />
        <statistics page="1">
            <ratings >
                <usersrated value="5845" />
                <average value="6.18137" />
                <bayesaverage value="6.04863" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="1825" bayesaverage="6.04863" />
                    <rank type="family" id="5499" name="familygames" friendlyname="Family Game Rank" value="630" bayesaverage="6.02287" />
                </ranks>
                <stddev value="1.42054" />
                <median value="0" />
                <owned value="11523" />
                <trading value="620" />
                <wanting value="54" />
                <wishing value="490" />
                <numcomments value="1587" />
                <numweights value="426" />
                <averageweight value="1.338" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="3248">
        <thumbnail>https://cf.geekdo-images.com/images/pic65299_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic65299.jpg</image>
        <name type="primary" sortindex="1" value="Citadel of Blood" />
        <name type="alternate" sortindex="1" value="Black Gates" />
        <name type="alternate" sortindex="1" value="Labirynt Śmierci" />
        <description>Players form a party of Heroic Fantasy adventurers to journey into the Citadel of the evil mage &amp;quot;X the Unknown&amp;quot;, gaining experience and power by fighting his monsters, and ultimately facing and defeating X himself.&amp;#10;&amp;#10;The Citadel map is randomly generated during the game by drawing and placing rooms and corridors printed on 1/4&amp;quot; die-cut counters.&amp;#10;&amp;#10;</description>
        <yearpublished value="1980" />
        <minplayers value="1" />
        <maxplayers value="6" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="8">
            <results numplayers="1">
                <result value="Best" numvotes="6" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="2" />
                <result value="Recommended" numvotes="3" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="2" />
                <result value="Not Recommended" numvotes="2" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="2" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="2" />
            </results>
            <results numplayers="6">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="3" />
            </results>
            <results numplayers="6+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="4" />
            </results>
        </poll>
        <playingtime value="30" />
        <minplaytime value="30" />
        <maxplaytime value="30" />
        <minage value="10" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="2">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="0" />
                <result value="10" numvotes="1" />
                <result value="12" numvotes="1" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="2">
            <results>
                <result level="11" value="No necessary in-game text" numvotes="2" />
                <result level="12" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="13" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="14" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="15" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamecategory" id="1059" value="Maze" />
        <link type="boardgamecategory" id="1019" value="Wargame" />
        <link type="boardgamemechanic" id="2023" value="Co-operative Play" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamemechanic" id="2002" value="Tile Placement" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="6210" value="Magazine: Ares" />
        <link type="boardgameimplementation" id="3625" value="DeathMaze" inbound="true"/>
        <link type="boardgamedesigner" id="681" value="Eric Lee Smith" />
        <link type="boardgameartist" id="21795" value="Barclay Shaw" />
        <link type="boardgameartist" id="1030" value="Redmond A. Simonsen" />
        <link type="boardgamepublisher" id="1001" value="(Web published)" />
        <link type="boardgamepublisher" id="5018" value="Encore (for boardgames)" />
        <link type="boardgamepublisher" id="1391" value="Hobby Japan" />
        <link type="boardgamepublisher" id="15123" value="SharpSharkGames" />
        <link type="boardgamepublisher" id="120" value="SPI (Simulations Publications, Inc.)" />
        <statistics page="1">
            <ratings >
                <usersrated value="187" />
                <average value="6.31765" />
                <bayesaverage value="5.61185" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="5338" bayesaverage="5.61185" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="671" bayesaverage="5.67253" />
                </ranks>
                <stddev value="1.49038" />
                <median value="0" />
                <owned value="534" />
                <trading value="17" />
                <wanting value="34" />
                <wishing value="120" />
                <numcomments value="103" />
                <numweights value="18" />
                <averageweight value="2.0556" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="180387">
        <thumbnail>https://cf.geekdo-images.com/images/pic2580837_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic2580837.jpg</image>
        <name type="primary" sortindex="1" value="Dungeon Solitaire: Tomb of the Four Kings" />
        <description>Tomb of Four Kings is a fantasy adventure card game for a single player using a standard 52 deck of playing cards and one joker. With each turn, you defeat monsters, disarm traps, and open doors as you explore a dark dungeon. Along the way you collect treasure, gain skills, even use magic. But death awaits those who linger too long, and if all your torches burn out you will be lost in the dungeon forever. The objective is to find the tomb hoards of four ancient kings, collect as much additional treasure as possible, and make it out alive.&amp;#10;&amp;#10;The spread is the standard layout for the game. At the top of the spread is an area where you play torches (A), as they appear. In the middle of the spread is the dungeon area itself. Turns descending into the dungeon are played in a row from left to right. This row is called the delve. The turns ascending from the depths of the dungeon are played underneath the delve from right to left, with one turn for each turn of the delve except the turn-around point. This is called the retreat. Below the dungeon area, from left to right are a discard area, a hit point counter, and a hand where you collect your treasure, tomb hoards, skill cards, and magic scroll.&amp;#10;&amp;#10;The game is divided into turns. Each turn, you play a series of cards in the dungeon area. The turn represents an encounter as you explore the vast and sprawling dungeon. Layer the cards in a column while the turn is active. When the turn is over, stack those cards face down before moving on to the next turn. Each turn starts by playing cards from the deck until an encounter card appears.&amp;#10;&amp;#10;If you make it out of the dungeon alive, add up all the treasure in your hand.  If you found all four kings and survived, you have won the game, regardless of points. Multiply total points by 100 to calculate the value of your treasure in gold pieces.&amp;#10;&amp;#10;</description>
        <yearpublished value="2015" />
        <minplayers value="1" />
        <maxplayers value="1" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="4">
            <results numplayers="1">
                <result value="Best" numvotes="4" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="1+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
        </poll>
        <playingtime value="10" />
        <minplaytime value="2" />
        <maxplaytime value="10" />
        <minage value="0" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="0">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="0" />
                <result value="10" numvotes="0" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="2">
            <results>
                <result level="16" value="No necessary in-game text" numvotes="1" />
                <result level="17" value="Some necessary text - easily memorized or small crib sheet" numvotes="1" />
                <result level="18" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="19" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="20" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1002" value="Card Game" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1120" value="Print &amp; Play" />
        <link type="boardgamemechanic" id="2048" value="Pattern Building" />
        <link type="boardgamefamily" id="5666" value="Solitaire Games" />
        <link type="boardgamefamily" id="98" value="Traditional Card Games" />
        <link type="boardgameimplementation" id="189663" value="Dungeon Solitaire: Labyrinth of Souls" />
        <link type="boardgamedesigner" id="83780" value="Matthew Lowes" />
        <link type="boardgameartist" id="83780" value="Matthew Lowes" />
        <link type="boardgamepublisher" id="1001" value="(Web published)" />
        <statistics page="1">
            <ratings >
                <usersrated value="56" />
                <average value="7.13554" />
                <bayesaverage value="5.5806" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="6318" bayesaverage="5.5806" />
                </ranks>
                <stddev value="1.2407" />
                <median value="0" />
                <owned value="114" />
                <trading value="1" />
                <wanting value="3" />
                <wishing value="44" />
                <numcomments value="38" />
                <numweights value="7" />
                <averageweight value="1.2857" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="148705">
        <thumbnail>https://cf.geekdo-images.com/images/pic1803372_t.png</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic1803372.png</image>
        <name type="primary" sortindex="1" value="Dungeon Construction Kit: Cursed!" />
        <description>You were extremely excited when the Dungeon Construction Kit you had ordered finally landed on your doormat. That excitement lasted until the moment you opened the box. Unfortunately it seems that some evil blackguard had put a curse on it and you immediately found yourself inside your own kit. Now there's only one thing for it: construct your way out. And while you're at it, kill as many monsters and take as much treasure back to the real world as possible...&amp;#10;&amp;#10;A print &amp;amp; play card game where each card can either be a room on the map or an action. The best rooms are generally also the best actions, so you have to choose which is the best way to use each card. The card pool allows you to see up to 12 cards at a time, of which up to 4 will be immediately available for play, so there is a limited opportunity to plan ahead.&amp;#10;&amp;#10;Dungeon Construction Kit - Cursed! was designed for the 2013 Solitaire Print and Play Contest.&amp;#10;&amp;#10;</description>
        <yearpublished value="2013" />
        <minplayers value="1" />
        <maxplayers value="1" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="1">
            <results numplayers="1">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="1+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
        </poll>
        <playingtime value="15" />
        <minplaytime value="15" />
        <maxplaytime value="15" />
        <minage value="10" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="0">
	</poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="0">
	</poll>
        <link type="boardgamecategory" id="1002" value="Card Game" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1120" value="Print &amp; Play" />
        <link type="boardgamemechanic" id="2664" value="Deck / Pool Building" />
        <link type="boardgamemechanic" id="2002" value="Tile Placement" />
        <link type="boardgamefamily" id="5666" value="Solitaire Games" />
        <link type="boardgamefamily" id="19564" value="Solitaire Print and Play Contest" />
        <link type="boardgamedesigner" id="62255" value="Julian Anstey" />
        <link type="boardgameartist" id="62256" value="E. Anstey" />
        <link type="boardgamepublisher" id="4" value="(Self-Published)" />
        <link type="boardgamepublisher" id="1001" value="(Web published)" />
        <statistics page="1">
            <ratings >
                <usersrated value="7" />
                <average value="7.35714" />
                <bayesaverage value="0" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="Not Ranked" bayesaverage="Not Ranked" />
                </ranks>
                <stddev value="0.874818" />
                <median value="0" />
                <owned value="23" />
                <trading value="0" />
                <wanting value="1" />
                <wishing value="20" />
                <numcomments value="8" />
                <numweights value="0" />
                <averageweight value="0" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="1634">
        <thumbnail>https://cf.geekdo-images.com/images/pic355859_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic355859.jpg</image>
        <name type="primary" sortindex="1" value="Warhammer Quest" />
        <description>Warhammer Quest is the original game in the Warhammer Quest Series.&amp;#10;&amp;#10;From the Main Rulebook:&amp;#10;&amp;#10;In Warhammer Quest each player takes the role of a warrior, one of four brave adventurers willing to test their courage in the search for wealth and glory. Each hero comes from a different people. The Barbarian has traveled far from the savage north, a land of bitter cold and ferocious warriors. The Wizard hails from the cities of the Empire, the largest and most important of the realms of men. The Dwarf is drawn by the goldlust for which his race is famous. Dwarfs are grim and rather abrupt, but they are good fighters and loyal friends who remember debts of gratitude as readily as debts of coin. The Elf comes from the green woods of Loren where his kin spend their days hunting and making merry, protected from evil by the strange magic of their land. Elves are incredibly quick and agile, and they are also the best archers in the world.&amp;#10;&amp;#10;In the Warhammer Quest game the players enter a dark and forbidding dungeon. Together they must face the horrific dangers that wait for them. They will be attacked by monsters such as Orcs, Goblins, Skaven and Minotaurs. Other perils lurk in the darkness: scurrying venomous things like spiders, deadly pit traps, and decayed tunnels that cave in at the slightest touch. If they complete their quest the players will be rewarded with gold, treasure and artefacts of magical power. The more gold and treasure you can discover the better.., and the player whose warrior amasses the greatest fortune has done best of all!&amp;#10;&amp;#10;Warhammer Quest is probably unlike other games you have played. Rather than each player competing against the others, all the players must co-operate if they are to win. Also, there is no single board. Instead, the different rooms and corridor sections are clipped together to make a dungeon that is different every time you play. The game rules may seem a little complex at first - but don't worry a lot of the rules are designed to extend the game and are not vital to begin with. The actual game rules you need to play are in this book or printed on the various cards. The hugely thick Role-play Book is all extra and alternative material that introduces you to a whole new hobby of role-playing Warhammer Quest.&amp;#10;&amp;#10;- Warhammer Quest Contents -&amp;#10;&amp;#10;    4 Warrior models: Barbarian, Dwarf, Elf and Wizard&amp;#10;    6 Orc Warrior models&amp;#10;    6 Orc Archer models&amp;#10;    6 Goblin Spearmen models&amp;#10;    6 Night Goblin Archer models&amp;#10;    12 Skaven models&amp;#10;    3 Minotaur models&amp;#10;    12 Giant Spider models&amp;#10;    12 Giant Bat models&amp;#10;    12 Giant Rat models&amp;#10;    12 Snotling models&amp;#10;    10 Dungeon Doorways&amp;#10;    32 Page Rule Book&amp;#10;    16 Page Adventure Book&amp;#10;    192 Page Role-play Book&amp;#10;    1 How to Play sheet&amp;#10;    50 Page Adventure Record Pad&amp;#10;    19 Event Cards&amp;#10;    23 Dungeon Cards&amp;#10;    30 Treasure Cards&amp;#10;    17 Blank Event Cards&amp;#10;    15 Spell Cards&amp;#10;    4 Warrior Cards&amp;#10;    4 Battle-level Cards&amp;#10;    4 Equipment Cards&amp;#10;    4 Warrior Counters&amp;#10;    6 Dungeon Rooms&amp;#10;    5 Objective Rooms&amp;#10;    7 Corridors&amp;#10;    1 Steps&amp;#10;    3 T-junctions&amp;#10;    1 Corner&amp;#10;    1 Portcullis Marker&amp;#10;    1 Cave-in Marker&amp;#10;    3 Pit of Despair Markers&amp;#10;    6 Webbed Counters&amp;#10;    15 Power Tokens&amp;#10;    10 Luck Counters&amp;#10;    18 Scenery Markers&amp;#10;    6 Large Dice &amp;amp; 12 Small Dice&amp;#10;&amp;#10;&amp;#10;&amp;#10;&amp;#10;</description>
        <yearpublished value="1995" />
        <minplayers value="1" />
        <maxplayers value="4" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="31">
            <results numplayers="1">
                <result value="Best" numvotes="3" />
                <result value="Recommended" numvotes="8" />
                <result value="Not Recommended" numvotes="11" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="6" />
                <result value="Recommended" numvotes="9" />
                <result value="Not Recommended" numvotes="6" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="3" />
                <result value="Recommended" numvotes="15" />
                <result value="Not Recommended" numvotes="4" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="23" />
                <result value="Recommended" numvotes="6" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4+">
                <result value="Best" numvotes="4" />
                <result value="Recommended" numvotes="10" />
                <result value="Not Recommended" numvotes="3" />
            </results>
        </poll>
        <playingtime value="120" />
        <minplaytime value="120" />
        <maxplaytime value="120" />
        <minage value="12" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="17">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="2" />
                <result value="10" numvotes="4" />
                <result value="12" numvotes="6" />
                <result value="14" numvotes="4" />
                <result value="16" numvotes="1" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="15">
            <results>
                <result level="1" value="No necessary in-game text" numvotes="0" />
                <result level="2" value="Some necessary text - easily memorized or small crib sheet" numvotes="1" />
                <result level="3" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="1" />
                <result level="4" value="Extensive use of text - massive conversion needed to be playable" numvotes="13" />
                <result level="5" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamemechanic" id="2023" value="Co-operative Play" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamefamily" id="5666" value="Solitaire Games" />
        <link type="boardgamefamily" id="4328" value="Warhammer Fantasy Board Games" />
        <link type="boardgameexpansion" id="55095" value="Chaos Dwarfs of Deep Forge (fan expansion to Warhammer Quest)" />
        <link type="boardgameexpansion" id="43976" value="Warhammer Quest: Bretonnian Knight" />
        <link type="boardgameexpansion" id="3858" value="Warhammer Quest: Catacombs of Terror" />
        <link type="boardgameexpansion" id="43977" value="Warhammer Quest: Chaos Warrior" />
        <link type="boardgameexpansion" id="43978" value="Warhammer Quest: Dwarf Trollslayer" />
        <link type="boardgameexpansion" id="43979" value="Warhammer Quest: Elf Ranger" />
        <link type="boardgameexpansion" id="102224" value="Warhammer Quest: Halfling Thief" />
        <link type="boardgameexpansion" id="43981" value="Warhammer Quest: Imperial Noble" />
        <link type="boardgameexpansion" id="102223" value="Warhammer Quest: Kislevite Shaman" />
        <link type="boardgameexpansion" id="3853" value="Warhammer Quest: Lair of the Orc Lord" />
        <link type="boardgameexpansion" id="43982" value="Warhammer Quest: Pit Fighter" />
        <link type="boardgameexpansion" id="102222" value="Warhammer Quest: Pits &amp; Traps" />
        <link type="boardgameexpansion" id="41838" value="Warhammer Quest: Treasure Cards Pack #1" />
        <link type="boardgameexpansion" id="42219" value="Warhammer Quest: Treasure Cards Pack #2" />
        <link type="boardgameexpansion" id="42220" value="Warhammer Quest: Treasure Cards Pack #3" />
        <link type="boardgameexpansion" id="43980" value="Warhammer Quest: Wardancer" />
        <link type="boardgameexpansion" id="43983" value="Warhammer Quest: Warrior Priest" />
        <link type="boardgameexpansion" id="43984" value="Warhammer Quest: Witch Hunter" />
        <link type="boardgameimplementation" id="218933" value="Warhammer Quest: Shadows Over Hammerhal" />
        <link type="boardgameimplementation" id="197572" value="Warhammer Quest: Silver Tower" />
        <link type="boardgamedesigner" id="695" value="Andy Jones" />
        <link type="boardgamedesigner" id="901" value="Gavin Thorpe" />
        <link type="boardgameartist" id="12369" value="John Blanche" />
        <link type="boardgameartist" id="14937" value="Wayne England" />
        <link type="boardgameartist" id="12370" value="David Gallagher" />
        <link type="boardgameartist" id="13426" value="Mark Gibbons" />
        <link type="boardgameartist" id="14794" value="Geoff Taylor" />
        <link type="boardgameartist" id="2582" value="Richard Wright" />
        <link type="boardgamepublisher" id="26" value="Games Workshop Ltd." />
        <statistics page="1">
            <ratings >
                <usersrated value="2016" />
                <average value="7.41049" />
                <bayesaverage value="6.69348" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="599" bayesaverage="6.69348" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="121" bayesaverage="6.90995" />
                </ranks>
                <stddev value="1.67792" />
                <median value="0" />
                <owned value="2605" />
                <trading value="46" />
                <wanting value="328" />
                <wishing value="790" />
                <numcomments value="594" />
                <numweights value="162" />
                <averageweight value="2.6914" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="1758">
        <thumbnail>https://cf.geekdo-images.com/images/pic806419_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic806419.jpg</image>
        <name type="primary" sortindex="1" value="Advanced Heroquest" />
        <name type="alternate" sortindex="1" value="Herr des Schwertes" />
        <description>Advanced HeroQuest is a revised and expanded version of the Milton Bradley HeroQuest game.  The basic concept is the same: four heroes venture into a dungeon to fight monsters and gain treasure, but Advanced HeroQuest's rules are more detailed and complex.&amp;#10;&amp;#10;The major additions and changes include:&amp;#10;&amp;#10;    random dungeon generation system&amp;#10;    modular game board&amp;#10;    ranged combat&amp;#10;    multiple colleges of magic and spell books&amp;#10;    henchmen&amp;#10;    critical hits and fumbles&amp;#10;    fate points (the &amp;quot;undo&amp;quot; feature)&amp;#10;&amp;#10;&amp;#10;&amp;#10;&amp;#10;Games Workshop set Advanced HeroQuest in the Warhammer universe, presumably to foster sales of their miniatures.  The campaign world is easy to ignore, however, should players rather keep things generic.  Advanced HeroQuest also includes rules for using the characters and monsters from HeroQuest, should players want to do so.&amp;#10;&amp;#10;The game is supplied with Skaven figures that make up the quest within the rulebook. The exact same Skaven, henchmen and hero miniatures were also included in Mighty Warriors, also by Games-Workshop.&amp;#10;&amp;#10;The following White Dwarf issues contain adventure scenarios, spell lists, or other information for Advanced Heroquest:&amp;#10;&amp;#10;Issue #121     The Quest for Sonneklinge (scenario and Jade spell list)&amp;#10;Issue #122     The Priests of Pleasure&amp;#10;Issue #125     The Dark Beneath the World (scenario and Amethyst spell list)&amp;#10;Issue #134     The Trollslayer's Oath&amp;#10;Issue #138     Henchmen (new followers for AHQ: the Dwarf Trollslayer, the Elf Wardancer, the Human Captain, and the Wizard's Apprentice -- this material is duplicated in Terror in the Dark)&amp;#10;Issue #139     Treasure (This material is also duplicated in Terror in the Dark)&amp;#10;Issue #145     The Eyes of Chaos (has rules for both AHQ and HQ)&amp;#10;Issue #150     The Changing Faces of Tzeench&amp;#10;Issue #159     Rivers of Blood&amp;#10;&amp;#10;Advanced HeroQuest: Paint Set has replacement heroes and additional minis.&amp;#10;&amp;#10;</description>
        <yearpublished value="1989" />
        <minplayers value="1" />
        <maxplayers value="5" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="18">
            <results numplayers="1">
                <result value="Best" numvotes="2" />
                <result value="Recommended" numvotes="7" />
                <result value="Not Recommended" numvotes="5" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="13" />
                <result value="Not Recommended" numvotes="2" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="8" />
                <result value="Recommended" numvotes="4" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="6" />
                <result value="Recommended" numvotes="6" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="11" />
                <result value="Recommended" numvotes="5" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="5+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="3" />
                <result value="Not Recommended" numvotes="8" />
            </results>
        </poll>
        <playingtime value="120" />
        <minplaytime value="120" />
        <maxplaytime value="120" />
        <minage value="10" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="5">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="1" />
                <result value="10" numvotes="2" />
                <result value="12" numvotes="1" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="1" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="5">
            <results>
                <result level="6" value="No necessary in-game text" numvotes="0" />
                <result level="7" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="8" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="4" />
                <result level="9" value="Extensive use of text - massive conversion needed to be playable" numvotes="1" />
                <result level="10" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamecategory" id="1047" value="Miniatures" />
        <link type="boardgamemechanic" id="2023" value="Co-operative Play" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="69" value="HeroQuest" />
        <link type="boardgamefamily" id="5666" value="Solitaire Games" />
        <link type="boardgamefamily" id="4328" value="Warhammer Fantasy Board Games" />
        <link type="boardgameexpansion" id="1759" value="Advanced Heroquest: Terror In The Dark" />
        <link type="boardgameimplementation" id="699" value="HeroQuest" inbound="true"/>
        <link type="boardgamedesigner" id="712" value="Jervis Johnson" />
        <link type="boardgameartist" id="979" value="Gary Chalk" />
        <link type="boardgameartist" id="16316" value="Mark Craven" />
        <link type="boardgameartist" id="14937" value="Wayne England" />
        <link type="boardgameartist" id="14028" value="John Sibbick" />
        <link type="boardgamepublisher" id="1869" value="Diseños Orbitales" />
        <link type="boardgamepublisher" id="26" value="Games Workshop Ltd." />
        <link type="boardgamepublisher" id="127" value="Klee" />
        <statistics page="1">
            <ratings >
                <usersrated value="1011" />
                <average value="6.68506" />
                <bayesaverage value="6.03849" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="1855" bayesaverage="6.03849" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="342" bayesaverage="6.19251" />
                </ranks>
                <stddev value="1.64063" />
                <median value="0" />
                <owned value="1933" />
                <trading value="55" />
                <wanting value="168" />
                <wishing value="301" />
                <numcomments value="374" />
                <numweights value="82" />
                <averageweight value="2.8659" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="147747">
        <thumbnail>https://cf.geekdo-images.com/images/pic1831699_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic1831699.jpg</image>
        <name type="primary" sortindex="1" value="Super Fantasy: Ugly Snouts Assault" />
        <name type="alternate" sortindex="1" value="Super Fantasy: Angriff der hässlichen Schnauzen" />
        <name type="alternate" sortindex="1" value="Super Fantasy: Assalto dei Brutti Musi" />
        <name type="alternate" sortindex="1" value="Super Fantasy: El Ataque de los Morrofeos" />
        <description>Super Fantasy is the first hack'n'slash board game in which up to six players take on the roles of brave and unique heroes. During each game, players embark on tricky and mighty quests into ever-changing dangerous caves and dungeons swarmed with monsters and terrible creatures that try to slaughter them, while heroes try to gain treasures as well as better equipment in order to complete the missions.&amp;#10;&amp;#10;Since hordes of monsters repeatedly cross the path of our heroes, bloody clashes are inevitable in order to achieve victory! That is why Super Fantasy uses a simple yet unique dice-based system. Players have a pool of six dice to roll that they manage according to the action they want to perform (such as movement, attack, etc.) and its effectiveness. Each face of the dice shows either a 1, 2 or the Special Power symbol and the sum of the results shown represents the effectiveness of the action performed by the heroes. Every time the Special Power symbol occurs, the hero can choose to charge one of his abilities; once fully charged, the hero can unleash its power against the enemies!&amp;#10;&amp;#10;Super Fantasy features double-sided modular board pieces for creating countless scenarios combinations, six mighty heroes and three unique and powerful abilities for each hero, throwing players into a fast-paced world in which anything can happen!&amp;#10;&amp;#10;</description>
        <yearpublished value="2013" />
        <minplayers value="1" />
        <maxplayers value="6" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="8">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="2" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="2" />
                <result value="Not Recommended" numvotes="2" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="2" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="4" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="2" />
                <result value="Recommended" numvotes="2" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="6">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="3" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="6+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="2" />
            </results>
        </poll>
        <playingtime value="90" />
        <minplaytime value="90" />
        <maxplaytime value="90" />
        <minage value="8" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="8">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="2" />
                <result value="8" numvotes="3" />
                <result value="10" numvotes="3" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="9">
            <results>
                <result level="11" value="No necessary in-game text" numvotes="0" />
                <result level="12" value="Some necessary text - easily memorized or small crib sheet" numvotes="3" />
                <result level="13" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="4" />
                <result level="14" value="Extensive use of text - massive conversion needed to be playable" numvotes="2" />
                <result level="15" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamecategory" id="1079" value="Humor" />
        <link type="boardgamemechanic" id="2023" value="Co-operative Play" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2676" value="Grid Movement" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamemechanic" id="2019" value="Partnerships" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgameimplementation" id="165719" value="Super Fantasy: Night of the Badly Dead" />
        <link type="boardgamedesigner" id="10026" value="Marco Valtriani" />
        <link type="boardgameartist" id="34069" value="Guido Favaro" />
        <link type="boardgamepublisher" id="17184" value="Asylum Games (Board Games)" />
        <link type="boardgamepublisher" id="22763" value="Golden Egg Games" />
        <link type="boardgamepublisher" id="28468" value="Nordlandsippe" />
        <link type="boardgamepublisher" id="6123" value="Red Glove" />
        <statistics page="1">
            <ratings >
                <usersrated value="436" />
                <average value="6.89642" />
                <bayesaverage value="5.91274" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="2355" bayesaverage="5.91274" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="379" bayesaverage="6.10706" />
                </ranks>
                <stddev value="1.41674" />
                <median value="0" />
                <owned value="876" />
                <trading value="76" />
                <wanting value="56" />
                <wishing value="294" />
                <numcomments value="129" />
                <numweights value="32" />
                <averageweight value="2.4375" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="102548">
        <thumbnail>https://cf.geekdo-images.com/images/pic2411495_t.png</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic2411495.png</image>
        <name type="primary" sortindex="1" value="Dungeon Fighter" />
        <name type="alternate" sortindex="1" value="Wojownicy Podziemi" />
        <name type="alternate" sortindex="1" value="地城勇士" />
        <name type="alternate" sortindex="1" value="地城勇士" />
        <description>Explore spooky dungeons, find glorious treasure, buy powerful magic items, and challenge the most horrible creatures. Will your party be able to defeat the final boss?&amp;#10;&amp;#10;In Dungeon Fighter, a fully cooperative board game, players take on the roles of heroes venturing deep into a three-tier dungeon. Along the way, they explore the dungeon, search its many rooms, and face endless hordes of vicious monsters. Best of all, your skill determines the ability of your character. Can you kill Medusa without looking into her eyes, defeat the Minotaur in the labyrinth, or resist the breath of the dragon? Will you be able to hit a target by throwing the dice under your leg with your eyes closed?&amp;#10;&amp;#10;You will feel truly part of a centuries-old battle between good and evil...with a touch of foolish stupidity.&amp;#10;&amp;#10;</description>
        <yearpublished value="2011" />
        <minplayers value="1" />
        <maxplayers value="6" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="59">
            <results numplayers="1">
                <result value="Best" numvotes="2" />
                <result value="Recommended" numvotes="12" />
                <result value="Not Recommended" numvotes="23" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="5" />
                <result value="Recommended" numvotes="29" />
                <result value="Not Recommended" numvotes="7" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="26" />
                <result value="Recommended" numvotes="24" />
                <result value="Not Recommended" numvotes="2" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="23" />
                <result value="Recommended" numvotes="20" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="9" />
                <result value="Recommended" numvotes="28" />
                <result value="Not Recommended" numvotes="8" />
            </results>
            <results numplayers="6">
                <result value="Best" numvotes="10" />
                <result value="Recommended" numvotes="23" />
                <result value="Not Recommended" numvotes="13" />
            </results>
            <results numplayers="6+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="23" />
            </results>
        </poll>
        <playingtime value="45" />
        <minplaytime value="45" />
        <maxplaytime value="45" />
        <minage value="14" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="25">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="3" />
                <result value="6" numvotes="3" />
                <result value="8" numvotes="11" />
                <result value="10" numvotes="8" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="31">
            <results>
                <result level="1" value="No necessary in-game text" numvotes="26" />
                <result level="2" value="Some necessary text - easily memorized or small crib sheet" numvotes="5" />
                <result level="3" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="4" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="5" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1032" value="Action / Dexterity" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamecategory" id="1079" value="Humor" />
        <link type="boardgamemechanic" id="2041" value="Card Drafting" />
        <link type="boardgamemechanic" id="2023" value="Co-operative Play" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamemechanic" id="2078" value="Point to Point Movement" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="5666" value="Solitaire Games" />
        <link type="boardgameexpansion" id="140165" value="Dungeon Fighter: Black Sheep" />
        <link type="boardgameexpansion" id="113724" value="Dungeon Fighter: Bonus Cards" />
        <link type="boardgameexpansion" id="144386" value="Dungeon Fighter: Fire at Will" />
        <link type="boardgameexpansion" id="211540" value="Dungeon Fighter: King Cobra Bonus Card" />
        <link type="boardgameexpansion" id="150130" value="Dungeon Fighter: Marielle, the Mermaid" />
        <link type="boardgameexpansion" id="176636" value="Dungeon Fighter: Rock and Roll" />
        <link type="boardgameexpansion" id="132420" value="Dungeon Fighter: Ser Geek Bonus Card" />
        <link type="boardgameexpansion" id="186148" value="Dungeon Fighter: Sir Dummy / The Hooded Hero" />
        <link type="boardgameexpansion" id="186550" value="Dungeon Fighter: Stinkerjell" />
        <link type="boardgameexpansion" id="163169" value="Dungeon Fighter: Stormy Winds" />
        <link type="boardgameexpansion" id="149744" value="Dungeon Fighter: The Big Wave" />
        <link type="boardgamedesigner" id="50042" value="Aureliano Buonfino" />
        <link type="boardgamedesigner" id="28238" value="Lorenzo Silva" />
        <link type="boardgamedesigner" id="28239" value="Lorenzo Tucci Sorrentino" />
        <link type="boardgameartist" id="28355" value="Giulia Ghigini" />
        <link type="boardgamepublisher" id="10768" value="Cranio Creations" />
        <link type="boardgamepublisher" id="2973" value="Edge Entertainment" />
        <link type="boardgamepublisher" id="17" value="Fantasy Flight Games" />
        <link type="boardgamepublisher" id="15605" value="Galápagos Jogos" />
        <link type="boardgamepublisher" id="264" value="Heidelberger Spieleverlag" />
        <link type="boardgamepublisher" id="26623" value="Horrible Games" />
        <link type="boardgamepublisher" id="8923" value="IELLO" />
        <link type="boardgamepublisher" id="6214" value="Kaissa Chess &amp; Games" />
        <link type="boardgamepublisher" id="27470" value="Lucrum Games" />
        <link type="boardgamepublisher" id="22973" value="More Fun Co., Ltd." />
        <link type="boardgamepublisher" id="30552" value="One Moment Games" />
        <statistics page="1">
            <ratings >
                <usersrated value="4076" />
                <average value="6.90428" />
                <bayesaverage value="6.60485" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="705" bayesaverage="6.60485" />
                    <rank type="family" id="5498" name="partygames" friendlyname="Party Game Rank" value="49" bayesaverage="6.68289" />
                </ranks>
                <stddev value="1.44159" />
                <median value="0" />
                <owned value="5655" />
                <trading value="197" />
                <wanting value="216" />
                <wishing value="1073" />
                <numcomments value="774" />
                <numweights value="223" />
                <averageweight value="1.7534" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="131835">
        <thumbnail>https://cf.geekdo-images.com/images/pic1732644_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic1732644.jpg</image>
        <name type="primary" sortindex="1" value="Boss Monster: The Dungeon Building Card Game" />
        <name type="alternate" sortindex="1" value="Boss Monster: Baue deinen Dungeon!" />
        <name type="alternate" sortindex="1" value="Boss Monster: Costruisci il tuo dungeon" />
        <name type="alternate" sortindex="1" value="Boss Monster: gra karciana o budowaniu podziemi" />
        <name type="alternate" sortindex="1" value="Boss Monster: Le jeu de cartes de création de donjon" />
        <name type="alternate" sortindex="1" value="Boss Monster: Master of the Dungeon" />
        <name type="alternate" sortindex="1" value="Monstruo Final" />
        <description>Inspired by a love of classic video games, Boss Monster: The Dungeon Building Card Game pits 2-4 players in a competition to build the ultimate side-scrolling dungeon. Players compete to lure and destroy hapless adventurers, racing to outbid one another to see who can build the most enticing, treasure-filled dungeon. The goal of Boss Monster is to be the first Boss to amass ten Souls, which are gained when a Hero is lured and defeated &amp;mdash; but a player can lose if his Boss takes five Wounds from Heroes who survive his dungeon.&amp;#10;&amp;#10;Playing Boss Monster requires you to juggle two competing priorities: the need to lure Heroes at a faster rate than your opponents, and the need to kill those Heroes before they reach your Boss. Players can build one room per turn, each with its own damage and treasure value. More attractive rooms tend to deal less damage, so a Boss who is too greedy can become inundated with deadly Heroes.&amp;#10;&amp;#10;Players interact with each other by building rooms and playing Spells. Because different Heroes seek different treasure types, and rooms are built simultaneously (played face down, then revealed), this means that every &amp;quot;build phase&amp;quot; is a bidding war. Spells are instant-speed effects that can give players advantages or disrupt opponents.&amp;#10;&amp;#10;As a standalone card game with 155 cards, Boss Monster contains everything that 2-4 players need to play.&amp;#10;&amp;#10;</description>
        <yearpublished value="2013" />
        <minplayers value="2" />
        <maxplayers value="4" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="77">
            <results numplayers="1">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="3" />
                <result value="Not Recommended" numvotes="42" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="18" />
                <result value="Recommended" numvotes="42" />
                <result value="Not Recommended" numvotes="8" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="21" />
                <result value="Recommended" numvotes="35" />
                <result value="Not Recommended" numvotes="6" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="44" />
                <result value="Recommended" numvotes="16" />
                <result value="Not Recommended" numvotes="7" />
            </results>
            <results numplayers="4+">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="2" />
                <result value="Not Recommended" numvotes="33" />
            </results>
        </poll>
        <playingtime value="20" />
        <minplaytime value="20" />
        <maxplaytime value="20" />
        <minage value="13" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="26">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="1" />
                <result value="8" numvotes="17" />
                <result value="10" numvotes="6" />
                <result value="12" numvotes="2" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="23">
            <results>
                <result level="21" value="No necessary in-game text" numvotes="0" />
                <result level="22" value="Some necessary text - easily memorized or small crib sheet" numvotes="4" />
                <result level="23" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="15" />
                <result level="24" value="Extensive use of text - massive conversion needed to be playable" numvotes="4" />
                <result level="25" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1002" value="Card Game" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1101" value="Video Game Theme" />
        <link type="boardgamemechanic" id="2012" value="Auction/Bidding" />
        <link type="boardgamemechanic" id="2040" value="Hand Management" />
        <link type="boardgamemechanic" id="2685" value="Player Elimination" />
        <link type="boardgamemechanic" id="2686" value="Take That" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="21203" value="Boss Monster" />
        <link type="boardgamefamily" id="8374" value="Crowdfunding: Kickstarter" />
        <link type="boardgameexpansion" id="206997" value="Boss Monster:  Final Form! Promo Card" />
        <link type="boardgameexpansion" id="158845" value="Boss Monster: Bast Promo Card" />
        <link type="boardgameexpansion" id="158933" value="Boss Monster: Bastas Promo Card" />
        <link type="boardgameexpansion" id="164723" value="Boss Monster: Bom-Boy Factory Promo Card" />
        <link type="boardgameexpansion" id="194669" value="Boss Monster: Collector Box" />
        <link type="boardgameexpansion" id="202831" value="Boss Monster: Crash Landing" />
        <link type="boardgameexpansion" id="133778" value="Boss Monster: Creator Pack" />
        <link type="boardgameexpansion" id="133780" value="Boss Monster: Epic Multi Heroes" />
        <link type="boardgameexpansion" id="228178" value="Boss Monster: Get Over Here! Promo Card" />
        <link type="boardgameexpansion" id="187141" value="Boss Monster: Hidden Secrets" />
        <link type="boardgameexpansion" id="225319" value="Boss Monster: Implements of Destruction" />
        <link type="boardgameexpansion" id="164746" value="Boss Monster: Killa, Man Eating Gorilla Promo" />
        <link type="boardgameexpansion" id="206829" value="Boss Monster: Klonos Promo Card" />
        <link type="boardgameexpansion" id="213989" value="Boss Monster: König Croak Promo Card" />
        <link type="boardgameexpansion" id="181768" value="Boss Monster: Mirrax Promo Card" />
        <link type="boardgameexpansion" id="164095" value="Boss Monster: Paper &amp; Pixels" />
        <link type="boardgameexpansion" id="176420" value="Boss Monster: Portable Pack" />
        <link type="boardgameexpansion" id="133777" value="Boss Monster: Power-Up Pack" />
        <link type="boardgameexpansion" id="164719" value="Boss Monster: Quothe Promo Card" />
        <link type="boardgameexpansion" id="212379" value="Boss Monster: Reactor Core" />
        <link type="boardgameexpansion" id="133775" value="Boss Monster: The Golden Dragon" />
        <link type="boardgameexpansion" id="223370" value="Boss Monster: The Lost Levels" />
        <link type="boardgameexpansion" id="133772" value="Boss Monster: Tools of Hero-Kind" />
        <link type="boardgameintegration" id="174973" value="Boss Monster 2: The Next Level" />
        <link type="boardgamedesigner" id="27052" value="Johnny O'Neal" />
        <link type="boardgamedesigner" id="71054" value="Chris O'Neal" />
        <link type="boardgameartist" id="75426" value="Beau Buckley" />
        <link type="boardgameartist" id="75425" value="Francisco Coda" />
        <link type="boardgameartist" id="75424" value="Katrina Guillermo" />
        <link type="boardgameartist" id="67746" value="Kyle Merritt" />
        <link type="boardgameartist" id="75427" value="David Nyari" />
        <link type="boardgameartist" id="75428" value="Alexander Olsen" />
        <link type="boardgameartist" id="75429" value="Andres Sanabria" />
        <link type="boardgamepublisher" id="23664" value="Brotherwise Games" />
        <link type="boardgamepublisher" id="2973" value="Edge Entertainment" />
        <link type="boardgamepublisher" id="27480" value="Fever Games" />
        <link type="boardgamepublisher" id="39" value="Pegasus Spiele" />
        <link type="boardgamepublisher" id="17952" value="Redbox" />
        <link type="boardgamepublisher" id="27316" value="Trefl Joker Line" />
        <statistics page="1">
            <ratings >
                <usersrated value="7992" />
                <average value="6.36285" />
                <bayesaverage value="6.18988" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="1434" bayesaverage="6.18988" />
                    <rank type="family" id="5499" name="familygames" friendlyname="Family Game Rank" value="521" bayesaverage="6.13208" />
                </ranks>
                <stddev value="1.45274" />
                <median value="0" />
                <owned value="15152" />
                <trading value="555" />
                <wanting value="90" />
                <wishing value="835" />
                <numcomments value="1561" />
                <numweights value="352" />
                <averageweight value="1.8097" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="140589">
        <thumbnail>https://cf.geekdo-images.com/images/pic1618101_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic1618101.jpg</image>
        <name type="primary" sortindex="1" value="Solo Dungeon Crawl" />
        <description>In this game, you have captured by the village and thrust into a pit, which is the home of a dragon. You must fight the dragon to be able to get out. You are fortunate to have been left with some items, but this dungeon crawl will be hard.&amp;#10;&amp;#10;To start the game, you make your character, and then the dungeon.&amp;#10;On your turn, you move, you fight, you see.&amp;#10;Will you find vast treasure, and weapons of great strength? Or will you find monsters of hideous nature? Can you survive?&amp;#10;&amp;#10;If you are playing 2 player:&amp;#10;&amp;#10;You have been captured by the barbaric goblins, and thrust into a pit, known as the arena. In order to get out, you must kill the other player. No rules, no limits, just a brutal blood bath. Oh, and did I mention there are still other monsters in here? Have fun...&amp;#10;&amp;#10;All mechanics are the same, except you must fight the other player. And if you leave an area, it gets reset next time you enter it, so there is all ways something new.&amp;#10;&amp;#10;</description>
        <yearpublished value="2013" />
        <minplayers value="1" />
        <maxplayers value="2" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="1">
            <results numplayers="1">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="1" />
            </results>
        </poll>
        <playingtime value="10" />
        <minplaytime value="10" />
        <maxplaytime value="10" />
        <minage value="10" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="1">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="0" />
                <result value="10" numvotes="1" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="0">
	</poll>
        <link type="boardgamecategory" id="1017" value="Dice" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1120" value="Print &amp; Play" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2676" value="Grid Movement" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamedesigner" id="67615" value="Eli Silver" />
        <link type="boardgamepublisher" id="4" value="(Self-Published)" />
        <link type="boardgamepublisher" id="1001" value="(Web published)" />
        <statistics page="1">
            <ratings >
                <usersrated value="7" />
                <average value="6.27143" />
                <bayesaverage value="0" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="Not Ranked" bayesaverage="Not Ranked" />
                </ranks>
                <stddev value="0.86967" />
                <median value="0" />
                <owned value="27" />
                <trading value="0" />
                <wanting value="0" />
                <wishing value="19" />
                <numcomments value="10" />
                <numweights value="2" />
                <averageweight value="1.5" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="26829">
        <thumbnail>https://cf.geekdo-images.com/images/pic165210_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic165210.jpg</image>
        <name type="primary" sortindex="1" value="Adventures in the Dungeon" />
        <name type="alternate" sortindex="5" value="The Official Advanced Dungeons &amp; Dragons Coloring Album" />
        <description>Adventures in the Dungeon is a small Dungeon-Crawler originally published within &amp;quot;The Official Advanced Dungeons &amp;amp; Dragons Coloring Album.&amp;quot;  The game's rules are cleverly placed at the bottom of each page, and are complimented by a map of the Dungeon in the center of the book.&amp;#10;&amp;#10;The game is designed for 1-4 players, who will assume the role of characters seeking The Holy Talisman of St. Cuthbert.  The 4 characters (Paladin, Rangeress, Fighter, Wizard) each have different abilities.&amp;#10;&amp;#10;To find the Talisman, players must wander the Dungeon and face the creatures therein.  Combat is simulated with 2D6, and the players roll attacks for both themselves and their monstrous opponents.  The various monsters have special abilities, and the characters will need to coordinate their efforts carefully to make it through.&amp;#10;&amp;#10;Players win the Quest by finding the Talisman, and a scoring system is included based on how many monsters were slain, and how many characters survive.&amp;#10;&amp;#10;</description>
        <yearpublished value="1979" />
        <minplayers value="1" />
        <maxplayers value="4" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="1">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="1" />
            </results>
        </poll>
        <playingtime value="30" />
        <minplaytime value="30" />
        <maxplaytime value="30" />
        <minage value="0" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="1">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="1" />
                <result value="10" numvotes="0" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="1">
            <results>
                <result level="21" value="No necessary in-game text" numvotes="0" />
                <result level="22" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="23" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="1" />
                <result level="24" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="25" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1117" value="Book" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1035" value="Medieval" />
        <link type="boardgamemechanic" id="2023" value="Co-operative Play" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2055" value="Paper-and-Pencil" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamefamily" id="7307" value="Dungeons &amp; Dragons" />
        <link type="boardgamedesigner" id="561" value="Gary Gygax" />
        <link type="boardgameartist" id="18820" value="Greg Irons" />
        <link type="boardgamepublisher" id="2576" value="Troubador Press" />
        <statistics page="1">
            <ratings >
                <usersrated value="12" />
                <average value="7.33417" />
                <bayesaverage value="0" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="Not Ranked" bayesaverage="Not Ranked" />
                </ranks>
                <stddev value="1.88503" />
                <median value="0" />
                <owned value="25" />
                <trading value="0" />
                <wanting value="3" />
                <wishing value="9" />
                <numcomments value="11" />
                <numweights value="2" />
                <averageweight value="1" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="131349">
        <thumbnail>https://cf.geekdo-images.com/images/pic1452670_t.png</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic1452670.png</image>
        <name type="primary" sortindex="1" value="Mini Dungeon Adventures" />
        <description>Print and Play dungeon crawl board game in a 17-page PDF.  Complete with paper miniatures and terrain.  You'll need to supply your own dice.  In two-player games, one person controls the monsters, and the other person controls one or two heroes.  Treasure can be spent on better equipment to fight bigger and badder monsters.  can you take out the Boss monster?&amp;#10;&amp;#10;From the creator of Flipit Paper Combat.&amp;#10;&amp;#10;</description>
        <yearpublished value="2012" />
        <minplayers value="1" />
        <maxplayers value="7" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="1">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="6">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="7">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="7+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
        </poll>
        <playingtime value="0" />
        <minplaytime value="0" />
        <maxplaytime value="0" />
        <minage value="0" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="1">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="0" />
                <result value="10" numvotes="0" />
                <result value="12" numvotes="1" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="1">
            <results>
                <result level="26" value="No necessary in-game text" numvotes="0" />
                <result level="27" value="Some necessary text - easily memorized or small crib sheet" numvotes="1" />
                <result level="28" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="29" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="30" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1059" value="Maze" />
        <link type="boardgamecategory" id="1120" value="Print &amp; Play" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2676" value="Grid Movement" />
        <link type="boardgameexpansion" id="136627" value="Mini Dungeon Adventures: Beast Master" />
        <link type="boardgamedesigner" id="64107" value="Jim Bowen" />
        <link type="boardgameartist" id="64107" value="Jim Bowen" />
        <link type="boardgamepublisher" id="1001" value="(Web published)" />
        <statistics page="1">
            <ratings >
                <usersrated value="4" />
                <average value="7" />
                <bayesaverage value="0" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="Not Ranked" bayesaverage="Not Ranked" />
                </ranks>
                <stddev value="3.67423" />
                <median value="0" />
                <owned value="17" />
                <trading value="0" />
                <wanting value="0" />
                <wishing value="13" />
                <numcomments value="3" />
                <numweights value="1" />
                <averageweight value="3" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="43594">
        <thumbnail>https://cf.geekdo-images.com/images/pic497845_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic497845.jpg</image>
        <name type="primary" sortindex="1" value="Dungeon Express" />
        <description>Dungeon Express is a fast-playing dice game of adventure, exploration, combat and treasure hunting for 1-6 players.&amp;#10;&amp;#10;Players roll adventurer dice, attempting to plunder dungeon rooms from a common pool (or steal them from the other players)!&amp;#10;&amp;#10;Treasure dice are used to find gold chests (good), potions (useful), poison traps (neither useful nor good).&amp;#10;&amp;#10;</description>
        <yearpublished value="2009" />
        <minplayers value="1" />
        <maxplayers value="6" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="0">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="6">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="6+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
        </poll>
        <playingtime value="30" />
        <minplaytime value="30" />
        <maxplaytime value="30" />
        <minage value="8" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="0">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="0" />
                <result value="10" numvotes="0" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="1">
            <results>
                <result level="31" value="No necessary in-game text" numvotes="1" />
                <result level="32" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="33" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="34" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="35" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1017" value="Dice" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1120" value="Print &amp; Play" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2048" value="Pattern Building" />
        <link type="boardgamedesigner" id="5446" value="Chris Taylor" />
        <link type="boardgamepublisher" id="1001" value="(Web published)" />
        <link type="boardgamepublisher" id="4999" value="Zero Radius Games" />
        <statistics page="1">
            <ratings >
                <usersrated value="5" />
                <average value="6.3" />
                <bayesaverage value="0" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="Not Ranked" bayesaverage="Not Ranked" />
                </ranks>
                <stddev value="0.979796" />
                <median value="0" />
                <owned value="20" />
                <trading value="0" />
                <wanting value="2" />
                <wishing value="23" />
                <numcomments value="10" />
                <numweights value="1" />
                <averageweight value="1" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="41434">
        <thumbnail>https://cf.geekdo-images.com/images/pic453915_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic453915.jpg</image>
        <name type="primary" sortindex="1" value="Dungeon of Terror" />
        <description>DUNGEON OF TERROR is a solitary DungeonCrawler that uses Tables for the encounters and narrates the adventure of a thief that was tricked and now has to escape this damned place. He will fight monsters, avoid traps, find treasure and move through rotating dungeon tiles that are plagued by horrors. Will he survive ?&amp;#10;&amp;#10;The game uses Fighting Fantasy amazing system for the encounters adapted to tables you have to Roll for random traps, monsters, events and treasure.&amp;#10;&amp;#10;&amp;#10;UPDATED RULES 3/24/2009: http://www.cultistas.com.ar/will/Rules_v1.2.pdf&amp;#10;&amp;#10;REGLAS EN ESPANOL 3/24/2009 http://www.cultistas.com.ar/will/Rules_v1.2_sp.pdf&amp;#10;&amp;#10;&amp;#10;TABLES: http://boardgamegeek.com/image/455694&amp;#10;&amp;#10;TABLAS EN ESPANOL: http://www.boardgamegeek.com/image/455692&amp;#10;&amp;#10;&amp;#10;COMPONENTS: http://www.boardgamegeek.com/image/452238&amp;#10;&amp;#10;COMPONENTES EN ESPANOL http://www.boardgamegeek.com/image/455461&amp;#10;&amp;#10;&amp;#10;PLUS you will need 2d6, 1d8 and a pawn.&amp;#10;&amp;#10;This is a visual guide that might aid if the rules are not completely understood:&amp;#10; http://www.boardgamegeek.com/article/3237169#3237169&amp;#10;&amp;#10;</description>
        <yearpublished value="2009" />
        <minplayers value="1" />
        <maxplayers value="1" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="1">
            <results numplayers="1">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="1+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
        </poll>
        <playingtime value="45" />
        <minplaytime value="45" />
        <maxplaytime value="45" />
        <minage value="12" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="1">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="0" />
                <result value="10" numvotes="0" />
                <result value="12" numvotes="1" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="1">
            <results>
                <result level="36" value="No necessary in-game text" numvotes="0" />
                <result level="37" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="38" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="39" value="Extensive use of text - massive conversion needed to be playable" numvotes="1" />
                <result level="40" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamecategory" id="1120" value="Print &amp; Play" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamemechanic" id="2035" value="Roll / Spin and Move" />
        <link type="boardgamemechanic" id="2027" value="Storytelling" />
        <link type="boardgamefamily" id="5666" value="Solitaire Games" />
        <link type="boardgamedesigner" id="12172" value="Guillermo H. Nuñez" />
        <link type="boardgameartist" id="12172" value="Guillermo H. Nuñez" />
        <link type="boardgamepublisher" id="1001" value="(Web published)" />
        <statistics page="1">
            <ratings >
                <usersrated value="4" />
                <average value="6.375" />
                <bayesaverage value="0" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="Not Ranked" bayesaverage="Not Ranked" />
                </ranks>
                <stddev value="1.78098" />
                <median value="0" />
                <owned value="8" />
                <trading value="0" />
                <wanting value="1" />
                <wishing value="12" />
                <numcomments value="7" />
                <numweights value="1" />
                <averageweight value="1" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="86429">
        <thumbnail>https://cf.geekdo-images.com/images/pic904861_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic904861.jpg</image>
        <name type="primary" sortindex="1" value="Deadly Danger Dungeon" />
        <description>In Deadly Danger Dungeon, You play as a hapless treasure seeker who falls in a trap, landing in a ghastly dungeon full of unspeakable perils. The goal is to climb your way back out, but you will never make it without a long streak of lucky rolls. Anywhere you step, there is some kind of hazard that takes a health point away, or kills you instantly. It might be flying arrows, falling rocks, spikes, or a slide that sends you to a volcanic fire. You start with three health points but you can raise it if you find it too difficult. It doesn't matter anyways because so many spaces are instant death. It's not a linear game, you can't just go straight to the exit. First you have to get a talisman but before you get the talisman you need to get a key.&amp;#10;&amp;#10;{Source: Deadly Danger Dungeon Video Review by James Rofle/Board James}&amp;#10;&amp;#10;</description>
        <yearpublished value="2010" />
        <minplayers value="1" />
        <maxplayers value="1" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="2">
            <results numplayers="1">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="1+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="2" />
            </results>
        </poll>
        <playingtime value="0" />
        <minplaytime value="0" />
        <maxplaytime value="0" />
        <minage value="0" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="3">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="2" />
                <result value="8" numvotes="0" />
                <result value="10" numvotes="1" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="2">
            <results>
                <result level="41" value="No necessary in-game text" numvotes="0" />
                <result level="42" value="Some necessary text - easily memorized or small crib sheet" numvotes="1" />
                <result level="43" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="44" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="45" value="Unplayable in another language" numvotes="1" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1017" value="Dice" />
        <link type="boardgamecategory" id="1120" value="Print &amp; Play" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2035" value="Roll / Spin and Move" />
        <link type="boardgamefamily" id="5666" value="Solitaire Games" />
        <link type="boardgamedesigner" id="44376" value="James Rolfe" />
        <link type="boardgameartist" id="44376" value="James Rolfe" />
        <link type="boardgamepublisher" id="4" value="(Self-Published)" />
        <statistics page="1">
            <ratings >
                <usersrated value="6" />
                <average value="8" />
                <bayesaverage value="0" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="Not Ranked" bayesaverage="Not Ranked" />
                </ranks>
                <stddev value="3.31662" />
                <median value="0" />
                <owned value="5" />
                <trading value="0" />
                <wanting value="0" />
                <wishing value="2" />
                <numcomments value="3" />
                <numweights value="2" />
                <averageweight value="1" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="26648">
        <thumbnail>https://cf.geekdo-images.com/images/pic164798_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic164798.jpg</image>
        <name type="primary" sortindex="1" value="Dark Dungeon" />
        <description>This is a solo game set in a dungeon, including board tiles, counters and detailed rules for movement, combat and character actions.  From the publisher:&amp;#10;&amp;#10;Jord watched as the elf peered around the corner into the dark chamber before them. The dwarf warrior did not like the smell that was coming out of the dark room, it reminded him too much like his wife&amp;rsquo;s cooking. By the Gods the woman could burn toast he thought, hell that was why he was always seeking out these dark dungeons, any excuse to eat something other then her gruel.&amp;#10;&amp;#10;The elf signaled the way was not guarded by a trap, and so the dwarf and the small human sorceress took up a position near the entrance while the burly human warrior and the elf entered. As soon as the two stepped into the chamber the whole place lit up with a bright light and the laughter of the necromancer that waited within. Damn Jord cursed as he watched the hoard of skeletons rush him and his companions. Maybe he should have stayed home today and eaten the roast his wife was burning.&amp;#10;&amp;#10;This is dark dungeon, the newest Mini-game from Bad Baby Productions. Hire mercenaries and adventurers and then send them out to explore the many dungeons and adventurous locations about the great city of Mordenhelm. See if you can outlast, out fight and outsmart the many monsters, traps and dangers that wait for you in the Dark Dungeons of this city.&amp;#10;&amp;#10;Dark Dungeon is a sole game, using a fast, fun system of encounters and adventurous situations. See if you can meet the challenge and return with the glory you deserve.&amp;#10;&amp;#10;</description>
        <yearpublished value="2006" />
        <minplayers value="1" />
        <maxplayers value="0" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="1">
            <results numplayers="0+">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
        </poll>
        <playingtime value="0" />
        <minplaytime value="0" />
        <maxplaytime value="0" />
        <minage value="12" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="0">
	</poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="1">
            <results>
                <result level="46" value="No necessary in-game text" numvotes="0" />
                <result level="47" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="48" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="49" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="50" value="Unplayable in another language" numvotes="1" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1035" value="Medieval" />
        <link type="boardgamecategory" id="1120" value="Print &amp; Play" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamefamily" id="154" value="Bad Baby Productions Minigames" />
        <link type="boardgamefamily" id="10690" value="Dark Dungeon Series" />
        <link type="boardgameexpansion" id="26647" value="Dark Dungeon 2: Lair of the Spider Cult" />
        <link type="boardgameexpansion" id="26649" value="Dark Dungeon 3: Crypt of the Damned" />
        <link type="boardgameexpansion" id="28066" value="Dark Dungeon 4: Tower of Magic" />
        <link type="boardgameexpansion" id="99676" value="Dark Dungeon 5: Character Builder" />
        <link type="boardgameexpansion" id="99677" value="Dark Dungeon 6: Lair Builder" />
        <link type="boardgamedesigner" id="5349" value="Robert Hemminger" />
        <link type="boardgameartist" id="5349" value="Robert Hemminger" />
        <link type="boardgamepublisher" id="4034" value="Avalon Games" />
        <statistics page="1">
            <ratings >
                <usersrated value="6" />
                <average value="4.16667" />
                <bayesaverage value="0" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="Not Ranked" bayesaverage="Not Ranked" />
                </ranks>
                <stddev value="2.26691" />
                <median value="0" />
                <owned value="20" />
                <trading value="0" />
                <wanting value="0" />
                <wishing value="5" />
                <numcomments value="6" />
                <numweights value="0" />
                <averageweight value="0" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="168353">
        <thumbnail>https://cf.geekdo-images.com/images/pic2289922_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic2289922.jpg</image>
        <name type="primary" sortindex="1" value="2 Hour Dungeon Crawl" />
        <description>From the publisher's website:&amp;#10;&amp;#10;No smoke, no mirrors, just a great game!&amp;#10;&amp;#10;What: Dungeon Crawl&amp;#10;&amp;#10;Scale: 1 figure or counter represents 1 man or creature&amp;#10;&amp;#10;Your Role: Players lead a party of Adventurers into a dungeon in search of Treasure and Fame. Save the Princess, kill some Monsters or grab some Loot, the choice is yours!&amp;#10;&amp;#10;Playability: Designed for solo, same side and head to head play.&amp;#10;&amp;#10;2 Hour Dungeon Crawl can be played in a variety of ways and contains the following:&amp;#10;&amp;#10;    Fifteen different Races including Dwarves, Elves, Orcs, Trolls, Wizards, Barbarians, and much more.&amp;#10;    Eight different Professions to breath life into your characters. &amp;#10;    Rules for your characters to grow in skills and abilities as they succeed.&amp;#10;    30+ Attributes to further define your characters.&amp;#10;    Over 30 Magic Spells and Magical items for you to find and use.&amp;#10;    A system that generates your dungeons, including the Monsters, while you play.&amp;#10;&amp;#10;&amp;#10;&amp;#10;&amp;#10;And even better.&amp;#10;&amp;#10;Have those cool Dungeon Tiles? You can use them.&amp;#10;&amp;#10;Want to go Old School and use Graph Paper? You can do it.&amp;#10;&amp;#10;Have metal figures? Plastics? How about paper? Even counters? Yep, you can use them all.&amp;#10;&amp;#10;Why?&amp;#10;&amp;#10;Because it shouldn't cost an arm and leg for a great Dungeon Crawl...unless you run into a Troll!&amp;#10;&amp;#10;2 Hour Dungeon Crawl&amp;#10;No smoke, no mirrors, just a great game.&amp;#10;&amp;#10;</description>
        <yearpublished value="2014" />
        <minplayers value="1" />
        <maxplayers value="4" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="0">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
        </poll>
        <playingtime value="120" />
        <minplaytime value="120" />
        <maxplaytime value="120" />
        <minage value="0" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="1">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="1" />
                <result value="10" numvotes="0" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="0">
            <results>
                <result level="1" value="No necessary in-game text" numvotes="0" />
                <result level="2" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="3" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="4" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="5" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamedesigner" id="3471" value="Ed Teixeira" />
        <link type="boardgameartist" id="12207" value="Paul Kime" />
        <link type="boardgamepublisher" id="2360" value="Two Hour Wargames (THW Game Design)" />
        <statistics page="1">
            <ratings >
                <usersrated value="12" />
                <average value="6.58333" />
                <bayesaverage value="0" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="Not Ranked" bayesaverage="Not Ranked" />
                </ranks>
                <stddev value="1.78924" />
                <median value="0" />
                <owned value="66" />
                <trading value="0" />
                <wanting value="12" />
                <wishing value="41" />
                <numcomments value="10" />
                <numweights value="2" />
                <averageweight value="2" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="104162">
        <thumbnail>https://cf.geekdo-images.com/images/pic1180640_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic1180640.jpg</image>
        <name type="primary" sortindex="1" value="Descent: Journeys in the Dark (Second Edition)" />
        <name type="alternate" sortindex="1" value="Descent: Die Reise ins Dunkel (Zweite Edition)" />
        <name type="alternate" sortindex="1" value="Descent: Viaggi nelle Tenebre (Seconda Edizione)" />
        <name type="alternate" sortindex="1" value="Descent: Viaje a las Tinieblas (Segunda Edición)" />
        <name type="alternate" sortindex="1" value="Descent: Voyages dans les Ténèbres (Seconde edition)" />
        <name type="alternate" sortindex="1" value="Descent: Výpravy do temnot (druhá edice)" />
        <name type="alternate" sortindex="1" value="Descent: Wędrówki w mroku (Druga edycja)" />
        <name type="alternate" sortindex="1" value="Descent: Странствия во Тьме (Вторая редакция)" />
        <name type="alternate" sortindex="1" value="ディセント第２版 〜闇世界への旅立ち〜" />
        <name type="alternate" sortindex="1" value="深入絕地：暗黑世界之旅第二版 (繁體版)" />
        <description>Game description from the publisher:&amp;#10;&amp;#10;Descent: Journeys in the Dark (Second Edition) is a board game in which one player takes on the role of the treacherous overlord, and up to four other players take on the roles of courageous heroes. During each game, the heroes embark on quests and venture into dangerous caves, ancient ruins, dark dungeons, and cursed forests to battle monsters, earn riches, and attempt to stop the overlord from carrying out his vile plot.&amp;#10;&amp;#10;With danger lurking in every shadow, combat is a necessity. For such times, Descent: Journeys in the Dark (Second Edition) uses a unique dice-based system. Players build their dice pools according to their character's abilities and weapons, and each die in the pool contributes to an attack in different ways. Surges, special symbols that appear on most dice, also let you trigger special effects to make the most of your attacks. And with the horrors awaiting you beneath the surface, you'll need every advantage you can take...&amp;#10;&amp;#10;Featuring double-sided modular board pieces, countless hero and skill combinations, and an immersive story-driven campaign, Descent: Journeys in the Dark (Second Edition) transports heroes to a vibrant fantasy realm where they must stand together against an ancient evil.&amp;#10;&amp;#10;Compared to the first edition of Descent: Journeys in the Dark, this game features:&amp;#10;&amp;#10;&amp;#10;     Simpler rules for determining line of sight &amp;#10;     Faster setup of each encounter&amp;#10;     Defense dice to mitigate the tendency to &amp;quot;math out&amp;quot; attacks&amp;#10;     Shorter quests with plenty of natural stopping points&amp;#10;     Cards that list necessary statistics, conditions, and effects&amp;#10;     A new mechanism for controlling the overlord powers&amp;#10;     Enhanced hero selection and creation process&amp;#10;     Experience system to allow for hero growth and development&amp;#10;     Out-of-the-box campaign system&amp;#10;&amp;#10;&amp;#10; Descent 1st edition Conversion Kit &amp;#10;&amp;#10;&amp;#10;     Descent: Journeys in the Dark (second edition) &amp;#226;&amp;#128;&amp;#147; Conversion Kit&amp;#10;&amp;#10;&amp;#10;</description>
        <yearpublished value="2012" />
        <minplayers value="2" />
        <maxplayers value="5" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="310">
            <results numplayers="1">
                <result value="Best" numvotes="7" />
                <result value="Recommended" numvotes="21" />
                <result value="Not Recommended" numvotes="178" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="29" />
                <result value="Recommended" numvotes="133" />
                <result value="Not Recommended" numvotes="72" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="40" />
                <result value="Recommended" numvotes="179" />
                <result value="Not Recommended" numvotes="20" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="104" />
                <result value="Recommended" numvotes="135" />
                <result value="Not Recommended" numvotes="11" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="190" />
                <result value="Recommended" numvotes="61" />
                <result value="Not Recommended" numvotes="3" />
            </results>
            <results numplayers="5+">
                <result value="Best" numvotes="4" />
                <result value="Recommended" numvotes="3" />
                <result value="Not Recommended" numvotes="127" />
            </results>
        </poll>
        <playingtime value="120" />
        <minplaytime value="120" />
        <maxplaytime value="120" />
        <minage value="14" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="107">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="1" />
                <result value="8" numvotes="12" />
                <result value="10" numvotes="40" />
                <result value="12" numvotes="37" />
                <result value="14" numvotes="14" />
                <result value="16" numvotes="1" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="2" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="90">
            <results>
                <result level="11" value="No necessary in-game text" numvotes="0" />
                <result level="12" value="Some necessary text - easily memorized or small crib sheet" numvotes="1" />
                <result level="13" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="9" />
                <result level="14" value="Extensive use of text - massive conversion needed to be playable" numvotes="79" />
                <result level="15" value="Unplayable in another language" numvotes="1" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamecategory" id="1047" value="Miniatures" />
        <link type="boardgamemechanic" id="2001" value="Action Point Allowance System" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2676" value="Grid Movement" />
        <link type="boardgamemechanic" id="2040" value="Hand Management" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamemechanic" id="2019" value="Partnerships" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="24281" value="Campaign Games" />
        <link type="boardgamefamily" id="25158" value="Components: Miniatures" />
        <link type="boardgamefamily" id="4671" value="Descent" />
        <link type="boardgamefamily" id="5615" value="Monsters" />
        <link type="boardgamefamily" id="5137" value="The Realms of Terrinoth" />
        <link type="boardgameexpansion" id="146570" value="Descent: Journeys in the Dark (Second Edition) – Alric Farrow Lieutenant Pack" />
        <link type="boardgameexpansion" id="181827" value="Descent: Journeys in the Dark (Second Edition) – Ardus Ix'Erebus Lieutenant Pack" />
        <link type="boardgameexpansion" id="148979" value="Descent: Journeys in the Dark (Second Edition) – Ariad Lieutenant Pack" />
        <link type="boardgameexpansion" id="146566" value="Descent: Journeys in the Dark (Second Edition) – Belthir Lieutenant Pack" />
        <link type="boardgameexpansion" id="148977" value="Descent: Journeys in the Dark (Second Edition) – Bol'Goreth Lieutenant Pack" />
        <link type="boardgameexpansion" id="175455" value="Descent: Journeys in the Dark (Second Edition) – Bonds of the Wild" />
        <link type="boardgameexpansion" id="155680" value="Descent: Journeys in the Dark (Second Edition) – Crown of Destiny" />
        <link type="boardgameexpansion" id="158496" value="Descent: Journeys in the Dark (Second Edition) – Crusade of the Forgotten" />
        <link type="boardgameexpansion" id="176443" value="Descent: Journeys in the Dark (Second Edition) – Dark Elements" />
        <link type="boardgameexpansion" id="146571" value="Descent: Journeys in the Dark (Second Edition) – Eliza Farrow Lieutenant Pack" />
        <link type="boardgameexpansion" id="163978" value="Descent: Journeys in the Dark (Second Edition) – Fall 2014 Game Night Kit" />
        <link type="boardgameexpansion" id="153235" value="Descent: Journeys in the Dark (Second Edition) – Forgotten Souls" />
        <link type="boardgameexpansion" id="151430" value="Descent: Journeys in the Dark (Second Edition) – Gargan Mirklace Lieutenant Pack" />
        <link type="boardgameexpansion" id="162290" value="Descent: Journeys in the Dark (Second Edition) – Guardians of Deephall" />
        <link type="boardgameexpansion" id="169468" value="Descent: Journeys in the Dark (Second Edition) – Heirs of Blood" />
        <link type="boardgameexpansion" id="181824" value="Descent: Journeys in the Dark (Second Edition) – Kyndrithul Lieutenant Pack" />
        <link type="boardgameexpansion" id="137842" value="Descent: Journeys in the Dark (Second Edition) – Labyrinth of Ruin" />
        <link type="boardgameexpansion" id="129423" value="Descent: Journeys in the Dark (Second Edition) – Lair of the Wyrm" />
        <link type="boardgameexpansion" id="156879" value="Descent: Journeys in the Dark (Second Edition) – Manor of Ravens" />
        <link type="boardgameexpansion" id="146569" value="Descent: Journeys in the Dark (Second Edition) – Merick Farrow Lieutenant Pack" />
        <link type="boardgameexpansion" id="181613" value="Descent: Journeys in the Dark (Second Edition) – Mists of Bilehall" />
        <link type="boardgameexpansion" id="170959" value="Descent: Journeys in the Dark (Second Edition) – Nature's Ire" />
        <link type="boardgameexpansion" id="153233" value="Descent: Journeys in the Dark (Second Edition) – Oath of the Outcast" />
        <link type="boardgameexpansion" id="148980" value="Descent: Journeys in the Dark (Second Edition) – Queen Ariad Lieutenant Pack" />
        <link type="boardgameexpansion" id="148978" value="Descent: Journeys in the Dark (Second Edition) – Raythen Lieutenant Pack" />
        <link type="boardgameexpansion" id="200784" value="Descent: Journeys in the Dark (Second Edition) – Road to Legend" />
        <link type="boardgameexpansion" id="151407" value="Descent: Journeys in the Dark (Second Edition) – Rylan Olliven Lieutenant Pack" />
        <link type="boardgameexpansion" id="148981" value="Descent: Journeys in the Dark (Second Edition) – Serena Lieutenant Pack" />
        <link type="boardgameexpansion" id="149915" value="Descent: Journeys in the Dark (Second Edition) – Shadow of Nerekhall" />
        <link type="boardgameexpansion" id="193219" value="Descent: Journeys in the Dark (Second Edition) – Shards of Everdark" />
        <link type="boardgameexpansion" id="156936" value="Descent: Journeys in the Dark (Second Edition) – Skarn Lieutenant Pack" />
        <link type="boardgameexpansion" id="146567" value="Descent: Journeys in the Dark (Second Edition) – Splig Lieutenant Pack" />
        <link type="boardgameexpansion" id="186341" value="Descent: Journeys in the Dark (Second Edition) – Stewards of the Secret" />
        <link type="boardgameexpansion" id="199884" value="Descent: Journeys in the Dark (Second Edition) – The Chains That Rust" />
        <link type="boardgameexpansion" id="143827" value="Descent: Journeys in the Dark (Second Edition) – The Trollfens" />
        <link type="boardgameexpansion" id="182235" value="Descent: Journeys in the Dark (Second Edition) – Treaty of Champions" />
        <link type="boardgameexpansion" id="151429" value="Descent: Journeys in the Dark (Second Edition) – Tristayne Olliven Lieutenant Pack" />
        <link type="boardgameexpansion" id="147622" value="Descent: Journeys in the Dark (Second Edition) – Valyndra Lieutenant Pack" />
        <link type="boardgameexpansion" id="151408" value="Descent: Journeys in the Dark (Second Edition) – Verminous Lieutenant Pack" />
        <link type="boardgameexpansion" id="171315" value="Descent: Journeys in the Dark (Second Edition) – Visions of Dawn" />
        <link type="boardgameexpansion" id="146568" value="Descent: Journeys in the Dark (Second Edition) – Zachareth Lieutenant Pack" />
        <link type="boardgameexpansion" id="181826" value="Descent: Journeys in the Dark (Second Edition) – Zarihell Lieutenant Pack" />
        <link type="boardgameimplementation" id="164153" value="Star Wars: Imperial Assault" />
        <link type="boardgameimplementation" id="17226" value="Descent: Journeys in the Dark" inbound="true"/>
        <link type="boardgamedesigner" id="11413" value="Daniel Clark (I)" />
        <link type="boardgamedesigner" id="6651" value="Corey Konieczka" />
        <link type="boardgamedesigner" id="50880" value="Adam Sadler" />
        <link type="boardgamedesigner" id="2336" value="Kevin Wilson" />
        <link type="boardgameartist" id="30957" value="Alex Aparin" />
        <link type="boardgameartist" id="19573" value="Devon Caddy-Lee" />
        <link type="boardgameartist" id="50680" value="Sylvain Decaux" />
        <link type="boardgameartist" id="17068" value="Tod Gelle" />
        <link type="boardgameartist" id="64812" value="Charlène le Scanff" />
        <link type="boardgameartist" id="24858" value="Henning Ludvigsen" />
        <link type="boardgameartist" id="46413" value="Dallas Mehlhoff" />
        <link type="boardgameartist" id="41191" value="Allison Theus" />
        <link type="boardgameartist" id="36620" value="Sandara Tang Sin Yun" />
        <link type="boardgamepublisher" id="17" value="Fantasy Flight Games" />
        <link type="boardgamepublisher" id="23043" value="ADC Blackfire Entertainment" />
        <link type="boardgamepublisher" id="3475" value="Arclight" />
        <link type="boardgamepublisher" id="2973" value="Edge Entertainment" />
        <link type="boardgamepublisher" id="4617" value="Galakta" />
        <link type="boardgamepublisher" id="5530" value="Giochi Uniti" />
        <link type="boardgamepublisher" id="264" value="Heidelberger Spieleverlag" />
        <link type="boardgamepublisher" id="18852" value="Hobby World" />
        <link type="boardgamepublisher" id="8759" value="Wargames Club Publishing" />
        <statistics page="1">
            <ratings >
                <usersrated value="14951" />
                <average value="7.79424" />
                <bayesaverage value="7.57028" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="65" bayesaverage="7.57028" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="22" bayesaverage="7.57529" />
                </ranks>
                <stddev value="1.45097" />
                <median value="0" />
                <owned value="23901" />
                <trading value="526" />
                <wanting value="765" />
                <wishing value="4784" />
                <numcomments value="2669" />
                <numweights value="896" />
                <averageweight value="3.1987" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="178153">
        <thumbnail>https://cf.geekdo-images.com/images/pic2802377_t.png</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic2802377.png</image>
        <name type="primary" sortindex="1" value="100 Swords: The Red Dragon&#039;s Dungeon" />
        <description>100 Swords: The Red Dragon's Dungeon is a sword based dungeon crawling micro deck builder! Load up with as much as you can carry and run head first into the dungeon, exploring rooms and revealing monsters, all while keeping track of hidden treasures and swords!&amp;#10;&amp;#10;During play, you must efficiently play the 5 cards in your hand for any combination of movement, strength, or energy. Movement advances you deeper into the dungeon allowing you to peek at or reveal the cards along the way. Monsters you find can only be defeated with strength. New items (and swords!) are acquired by spending cards in your hand for energy. Many items have effects that will further expand your tactical options as your deck grows.&amp;#10;&amp;#10;As you defeat monsters and pick up loot, do your best to remember where everything is hidden. Treasures and slain monsters are worth gold, so get collecting! Once the dungeon has been thoroughly ransacked, or the boss is defeated, whoever has the most gold wins!&amp;#10;&amp;#10;</description>
        <yearpublished value="2016" />
        <minplayers value="1" />
        <maxplayers value="2" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="3">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="2" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
        </poll>
        <playingtime value="25" />
        <minplaytime value="25" />
        <maxplaytime value="25" />
        <minage value="13" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="1">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="1" />
                <result value="10" numvotes="0" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="1">
            <results>
                <result level="21" value="No necessary in-game text" numvotes="0" />
                <result level="22" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="23" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="1" />
                <result level="24" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="25" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1002" value="Card Game" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamemechanic" id="2664" value="Deck / Pool Building" />
        <link type="boardgamemechanic" id="2040" value="Hand Management" />
        <link type="boardgamefamily" id="31094" value="100 Swords" />
        <link type="boardgamefamily" id="8374" value="Crowdfunding: Kickstarter" />
        <link type="boardgameexpansion" id="192506" value="100 Swords: Kick Sword" />
        <link type="boardgameexpansion" id="192507" value="100 Swords: Starter Sword" />
        <link type="boardgameexpansion" id="190024" value="100 Swords: The Chroma Dragon's Dungeon Builder Set" />
        <link type="boardgameexpansion" id="190026" value="100 Swords: The Darkness Dungeon Builder Set" />
        <link type="boardgameexpansion" id="216576" value="100 Swords: The Gardenin' Elm's Dungeon Builder Set" />
        <link type="boardgameexpansion" id="190020" value="100 Swords: The Glowing Plasmapede's Dungeon Builder Set" />
        <link type="boardgameexpansion" id="213270" value="100 Swords: The Great Garuda's Dungeon Builder Set" />
        <link type="boardgameexpansion" id="216577" value="100 Swords: The Heads of the Hydra Dungeon Builder Set" />
        <link type="boardgameexpansion" id="213271" value="100 Swords: The Hive Empress's Dungeon Builder Set" />
        <link type="boardgameexpansion" id="190022" value="100 Swords: The Magic Computer's Dungeon Builder Set" />
        <link type="boardgameexpansion" id="209775" value="100 Swords: The Multi-User Dungeon Expansion" />
        <link type="boardgamedesigner" id="68715" value="Clayton Grey" />
        <link type="boardgamedesigner" id="67262" value="Samuel Strick" />
        <link type="boardgameartist" id="67262" value="Samuel Strick" />
        <link type="boardgamepublisher" id="24617" value="Laboratory Games" />
        <statistics page="1">
            <ratings >
                <usersrated value="173" />
                <average value="6.77357" />
                <bayesaverage value="5.66951" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="4243" bayesaverage="5.66951" />
                </ranks>
                <stddev value="1.58934" />
                <median value="0" />
                <owned value="539" />
                <trading value="14" />
                <wanting value="13" />
                <wishing value="79" />
                <numcomments value="55" />
                <numweights value="4" />
                <averageweight value="1" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="148522">
        <thumbnail>https://cf.geekdo-images.com/images/pic2798873_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic2798873.jpg</image>
        <name type="primary" sortindex="1" value="Dice Crawl" />
        <description>Dice Crawl is a quick, fun dungeon-crawling tile game for 1 to 4 players. Players take on the roles of mercenary captains racing to get their team of adventurers to the center of the dungeon, while other captains try to do the same thing.&amp;#10;&amp;#10;Dice Crawl comes with 48 interchangeable tiles, including 4 races, 4 classes, and 4 quick reference tiles. Players will need to provide their own 6-sided dice (roughly 20-25 are needed per player), otherwise you&amp;rsquo;d be buying a box of dice. And we know you have dice!&amp;#10;&amp;#10;Each player works to gain control of the dungeon as they search for the center. The game ends when a player runs out of dice or someone finds the center of the dungeon.&amp;#10;&amp;#10;Beware! Not all paths lead to the center and some teams may never find the glory they seek. Luck and strategy combine in this furious game of hack-and-slashery!&amp;#10;&amp;#10;</description>
        <yearpublished value="2014" />
        <minplayers value="1" />
        <maxplayers value="4" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="1">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="1" />
            </results>
        </poll>
        <playingtime value="30" />
        <minplaytime value="30" />
        <maxplaytime value="30" />
        <minage value="10" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="1">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="1" />
                <result value="8" numvotes="0" />
                <result value="10" numvotes="0" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="1">
            <results>
                <result level="51" value="No necessary in-game text" numvotes="0" />
                <result level="52" value="Some necessary text - easily memorized or small crib sheet" numvotes="1" />
                <result level="53" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="54" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="55" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1017" value="Dice" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2002" value="Tile Placement" />
        <link type="boardgamefamily" id="8374" value="Crowdfunding: Kickstarter" />
        <link type="boardgameexpansion" id="178058" value="Dice Crawl: Forbidden Vaults" />
        <link type="boardgamedesigner" id="8842" value="jim pinto" />
        <link type="boardgameartist" id="65527" value="Alyssa Faden" />
        <link type="boardgameartist" id="8842" value="jim pinto" />
        <link type="boardgamepublisher" id="25945" value="SoulJar games" />
        <statistics page="1">
            <ratings >
                <usersrated value="44" />
                <average value="5.78182" />
                <bayesaverage value="5.52466" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="9566" bayesaverage="5.52466" />
                </ranks>
                <stddev value="1.65355" />
                <median value="0" />
                <owned value="124" />
                <trading value="10" />
                <wanting value="6" />
                <wishing value="32" />
                <numcomments value="12" />
                <numweights value="5" />
                <averageweight value="2" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="8207">
        <thumbnail>https://cf.geekdo-images.com/images/pic273938_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic273938.jpg</image>
        <name type="primary" sortindex="1" value="Dungeoneer: Vault of the Fiends" />
        <name type="alternate" sortindex="5" value="Die Brutstätte der Ungeheuer" />
        <name type="alternate" sortindex="1" value="Dungeoneer: Krypta Przeklętych" />
        <name type="alternate" sortindex="1" value="Dungeoneer: la fossa dei demoni" />
        <name type="alternate" sortindex="1" value="Dungeoneer: La Fossa dei Demoni" />
        <name type="alternate" sortindex="1" value="Dungeoneer: la guarida de los demonios" />
        <name type="alternate" sortindex="1" value="Dungeoneer: Le Repaire des Abominations" />
        <name type="alternate" sortindex="1" value="Dungeoneer²: Die Brutstätte der Ungeheuer" />
        <description>Dungeoneer: Vault of the Fiends is a non-collectable dungeon-crawl card game for 2-4 players.&amp;#10;&amp;#10;It is meant as an expansion to the Dungeoneer: Tomb of the Lich Lord also published by Atlas Games, but Tomb of the Lich Lord is not necessary to play this set, as Vault of the Fiends is also a stand-alone set.&amp;#10;&amp;#10;Players play the part of one of six heroes.  Each hero has variable melee, magic and speed scores, as well as a unique ability. Your second role in the game is as the malevolent &amp;ldquo;Dungeonlord&amp;rdquo;, trying to exterminate the other heroes.&amp;#10;&amp;#10;You win the game when as a hero you complete 3 Quests such as destroying an evil laboratory or rescuing a princess. An alternate win goal is as the Dungeonlord if all the other heroes are defeated except yours.&amp;#10;&amp;#10;Vault of the Fiends features a variety of new heroes.  Elf Assassin, Human Beastmaster, Drakan Sentinal, Ork Shaman, Dwarf Runecaster, and Gnome Illusionist.&amp;#10;&amp;#10;Each turn you may:&amp;#10;&amp;#10;     Play monsters, traps and other bad events on opponents&amp;#10;     Build a dungeon&amp;#10;     Move around the dungeon with your hero (collect Glory and Peril resources)&amp;#10;     Play abilities and treasures for yourself&amp;#10;     Complete a Quest&amp;#10;     Discard an unwanted card&amp;#10;     Fill your hand to 5 cards&amp;#10;&amp;#10;&amp;#10;&amp;#10;&amp;#10;This game is similar to Wiz-War where you race in a dungeon to complete your objectives.  This dungeon is created by the laying down of Map cards. You collect Glory and Peril as you move through the dungeon.  Glory buys cards that help your hero such as abilities and treasures, but your opponent spends your Peril against you to play monsters, traps and other unpleasant stuff.&amp;#10;&amp;#10;Combat is similar to Talisman. Roll a six-sided die and add the score you are combating with, either Melee or Magic, to beat your opponent&amp;rsquo;s roll.&amp;#10;&amp;#10;The way the cards interact will be familiar to CCG players, in that you have &amp;ldquo;Permanents&amp;rdquo; and &amp;ldquo;Instants&amp;rdquo; that you can use strategically, or in combinations, but this game is not really a strategy game.  Most of the fun comes from the theme, and surprising combination of events that occur.  Dungeoneer is likely to appeal to those who enjoy a classic dungeon crawl and RPG like action.&amp;#10;&amp;#10;Vault of the Fiends features a few new mechanics that should serve to enhance the game play which players of Tomb of the Lich Lord will be familiar with.  Some monsters, and attack cards are &amp;ldquo;pumpable&amp;rdquo; that means you may spend extra Glory or Peril to boost the effectiveness of the card.  Also conditions on the map change such as effects being deactivated when a certain Quest is completed or throwing a switch in a room to extend a bridge across the Fiery Chasm.  One of the more unexpected new mechanics are &amp;ldquo;artifact&amp;rdquo; Quests, such as the Armor Golem&amp;rsquo;s Glove which makes your hero more powerful or the Sunken Treasure which makes your hero faster.  These do not confer a level, but are rotated 180 degrees so you can read the bonus they provide.&amp;#10;&amp;#10;Part of the Dungeoneer Series.&amp;#10;&amp;#10;</description>
        <yearpublished value="2003" />
        <minplayers value="2" />
        <maxplayers value="4" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="14">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="5" />
                <result value="Not Recommended" numvotes="6" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="7" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="4" />
                <result value="Recommended" numvotes="6" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="8" />
                <result value="Recommended" numvotes="2" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="4+">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="8" />
            </results>
        </poll>
        <playingtime value="30" />
        <minplaytime value="30" />
        <maxplaytime value="30" />
        <minage value="12" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="3">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="1" />
                <result value="10" numvotes="2" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="6">
            <results>
                <result level="6" value="No necessary in-game text" numvotes="0" />
                <result level="7" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="8" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="1" />
                <result level="9" value="Extensive use of text - massive conversion needed to be playable" numvotes="5" />
                <result level="10" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1002" value="Card Game" />
        <link type="boardgamecategory" id="1017" value="Dice" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamemechanic" id="2001" value="Action Point Allowance System" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2040" value="Hand Management" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamemechanic" id="2002" value="Tile Placement" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="31" value="Dungeoneer" />
        <link type="boardgamedesigner" id="2092" value="Thomas Denmark" />
        <link type="boardgameartist" id="2092" value="Thomas Denmark" />
        <link type="boardgameartist" id="28137" value="Ben Van Dyken" />
        <link type="boardgamepublisher" id="78" value="Atlas Games" />
        <link type="boardgamepublisher" id="2973" value="Edge Entertainment" />
        <link type="boardgamepublisher" id="4617" value="Galakta" />
        <link type="boardgamepublisher" id="3242" value="Raven Distribution" />
        <link type="boardgamepublisher" id="89" value="Truant Spiele" />
        <link type="boardgamepublisher" id="3446" value="Ubik" />
        <statistics page="1">
            <ratings >
                <usersrated value="1144" />
                <average value="6.3069" />
                <bayesaverage value="5.91906" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="2323" bayesaverage="5.91906" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="417" bayesaverage="6.03364" />
                </ranks>
                <stddev value="1.32911" />
                <median value="0" />
                <owned value="2382" />
                <trading value="144" />
                <wanting value="35" />
                <wishing value="113" />
                <numcomments value="334" />
                <numweights value="98" />
                <averageweight value="2.2245" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="5576">
        <thumbnail>https://cf.geekdo-images.com/images/pic242567_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic242567.jpg</image>
        <name type="primary" sortindex="1" value="Dungeoneer: Tomb of the Lich Lord" />
        <name type="alternate" sortindex="1" value="Dungeoneer: Die Katakomben des Hexenmeisters" />
        <name type="alternate" sortindex="1" value="Dungeoneer: Grobowiec Króla Nieumarłych" />
        <name type="alternate" sortindex="1" value="Dungeoneer: La Tomba del Signore dei Lich" />
        <name type="alternate" sortindex="1" value="Dungeoneer: La Tumba del Lord Liche" />
        <name type="alternate" sortindex="1" value="Dungeoneer: Le Tombeau du Seigneur des Liches" />
        <name type="alternate" sortindex="1" value="Подземелье. Гробница повелителя мёртвых" />
        <description>'Dungeoneer - Perilous Adventures in an Ever-Changing Labyrinth.&amp;#10;&amp;#10;In Dungeoneer', you take up the mantle of a great Hero set out to prove your valor in the Tomb of the Lich Lord. To triumph over your rivals, you will need to explore the labyrinth of corridors, defeat the heinous monsters, overcome nefarious traps and be the first to complete all your Quests. But beware, the gods are fickle and to test their Heroes even further, they often bestow upon them Banes as well as Boons.&amp;#10;&amp;#10;Game Description:&amp;#10;&amp;#10;This simple card game is very reminiscent of Wiz-War. Players are dealt one of 4 Heroes, each with varying movement, fighting and magic abilities. The Dwarf for example is very tough, but has no magic value at all. Each Hero also has a value for hit points, the amount of Treasure he can have (carry) at any time and also the number of &amp;quot;Boons&amp;quot; (special abilities) he may have. Players are dealt 3 quest cards initially in front of them (public knowledge) and have 5 Adventure cards in hand.&amp;#10;&amp;#10;Each turn a player may:&amp;#10;&amp;#10;     Discard unwanted cards and draw back to 5 cards.&amp;#10;     Play Encounters and/or Bane cards (always on opponents never on yourself).&amp;#10;     Build the Dungeon.&amp;#10;     Move (collect Peril and Glory tokens).&amp;#10;&amp;#10;&amp;#10;&amp;#10;&amp;#10;Players will collect Peril tokens as they move which then makes them targets for others to play Encounter/Bane cards against them (Encounter/Bane cards have a fee to play - which is paid for by the person who the card is played ON with Peril tokens). This  simple mechanic balances the game by spreading the attacks around as you can't attack someone that can't pay the Peril price.&amp;#10;&amp;#10;Players attempt various quests (some are simple die rolls in a certain room, some are tough combat and some a series of things to do), with each completed quest having your Hero &amp;quot;go up a level&amp;quot; which increases his abilities.&amp;#10;&amp;#10;Treasures &amp;amp; Boons help you, Banes, Traps &amp;amp; Encounters hurt you (which are played on you by other players).&amp;#10;&amp;#10;The dungeon map is different each time as it is made up of cards played one at time onto the table by each player.&amp;#10;&amp;#10;This game was introduced at DunDraCon 2003, in San Ramon, Ca. There are several planned expansions, and two special cards available by mail if you purchased at the convention.&amp;#10;&amp;#10;First game in the Dungeoneer Series.&amp;#10;&amp;#10;</description>
        <yearpublished value="2003" />
        <minplayers value="2" />
        <maxplayers value="4" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="25">
            <results numplayers="1">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="5" />
                <result value="Not Recommended" numvotes="9" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="6" />
                <result value="Recommended" numvotes="8" />
                <result value="Not Recommended" numvotes="5" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="6" />
                <result value="Recommended" numvotes="7" />
                <result value="Not Recommended" numvotes="2" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="11" />
                <result value="Recommended" numvotes="4" />
                <result value="Not Recommended" numvotes="4" />
            </results>
            <results numplayers="4+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="2" />
                <result value="Not Recommended" numvotes="8" />
            </results>
        </poll>
        <playingtime value="60" />
        <minplaytime value="60" />
        <maxplaytime value="60" />
        <minage value="12" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="8">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="2" />
                <result value="10" numvotes="4" />
                <result value="12" numvotes="2" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="14">
            <results>
                <result level="6" value="No necessary in-game text" numvotes="0" />
                <result level="7" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="8" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="3" />
                <result level="9" value="Extensive use of text - massive conversion needed to be playable" numvotes="10" />
                <result level="10" value="Unplayable in another language" numvotes="1" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1002" value="Card Game" />
        <link type="boardgamecategory" id="1017" value="Dice" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamemechanic" id="2001" value="Action Point Allowance System" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2040" value="Hand Management" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamemechanic" id="2002" value="Tile Placement" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="31" value="Dungeoneer" />
        <link type="boardgameexpansion" id="22544" value="Epic Dungeoneer: Call of the Lich Lord" />
        <link type="boardgamedesigner" id="2092" value="Thomas Denmark" />
        <link type="boardgameartist" id="2092" value="Thomas Denmark" />
        <link type="boardgameartist" id="28136" value="Molly Mendoza Denmark" />
        <link type="boardgameartist" id="62239" value="Morgan Gray" />
        <link type="boardgameartist" id="28138" value="James Kei" />
        <link type="boardgameartist" id="28139" value="Chris Mangum" />
        <link type="boardgameartist" id="28137" value="Ben Van Dyken" />
        <link type="boardgamepublisher" id="78" value="Atlas Games" />
        <link type="boardgamepublisher" id="1308" value="Citizen Games" />
        <link type="boardgamepublisher" id="2973" value="Edge Entertainment" />
        <link type="boardgamepublisher" id="4617" value="Galakta" />
        <link type="boardgamepublisher" id="18852" value="Hobby World" />
        <link type="boardgamepublisher" id="3242" value="Raven Distribution" />
        <link type="boardgamepublisher" id="89" value="Truant Spiele" />
        <link type="boardgamepublisher" id="3446" value="Ubik" />
        <statistics page="1">
            <ratings >
                <usersrated value="2297" />
                <average value="6.11434" />
                <bayesaverage value="5.899" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="2423" bayesaverage="5.899" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="461" bayesaverage="5.95147" />
                </ranks>
                <stddev value="1.41856" />
                <median value="0" />
                <owned value="3989" />
                <trading value="253" />
                <wanting value="71" />
                <wishing value="320" />
                <numcomments value="798" />
                <numweights value="233" />
                <averageweight value="2.1845" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="162074">
        <thumbnail>https://cf.geekdo-images.com/images/pic2091617_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic2091617.jpg</image>
        <name type="primary" sortindex="1" value="Darkfast Dungeons" />
        <description>Darkfast Dungeons is a print and play tabletop game designed to provide a robust dungeon crawl experience in a couple of hours. A typical dungeon crawl will last 2-3 hours and provide a unique adventure with each game played.&amp;#10;&amp;#10;There are many ways to play Darkfast Dungeons with rules and scenarios for co-operative games, competitive games and solo play.&amp;#10;&amp;#10;The Darkfast Dungeons basic set includes 6 heroes, 12 monsters, a full set of game cards, rulebook and 26 customizable 2d tiles.&amp;#10;&amp;#10;</description>
        <yearpublished value="2015" />
        <minplayers value="1" />
        <maxplayers value="6" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="0">
            <results numplayers="6+">		
				</results>
        </poll>
        <playingtime value="120" />
        <minplaytime value="120" />
        <maxplaytime value="120" />
        <minage value="0" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="0">
	</poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="0">
	</poll>
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1047" value="Miniatures" />
        <link type="boardgamecategory" id="1120" value="Print &amp; Play" />
        <link type="boardgamemechanic" id="2023" value="Co-operative Play" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamefamily" id="22783" value="Admin: Better Description Needed!" />
        <link type="boardgamefamily" id="22184" value="Admin: Unreleased Games" />
        <link type="boardgamefamily" id="8374" value="Crowdfunding: Kickstarter" />
        <link type="boardgamefamily" id="5666" value="Solitaire Games" />
        <link type="boardgamedesigner" id="14845" value="David Okum" />
        <link type="boardgameartist" id="14845" value="David Okum" />
        <link type="boardgamepublisher" id="1001" value="(Web published)" />
        <link type="boardgamepublisher" id="26399" value="Okumarts Games" />
        <statistics page="1">
            <ratings >
                <usersrated value="4" />
                <average value="6.875" />
                <bayesaverage value="0" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="Not Ranked" bayesaverage="Not Ranked" />
                </ranks>
                <stddev value="0.544862" />
                <median value="0" />
                <owned value="8" />
                <trading value="0" />
                <wanting value="3" />
                <wishing value="8" />
                <numcomments value="2" />
                <numweights value="0" />
                <averageweight value="0" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="92316">
        <thumbnail>https://cf.geekdo-images.com/images/pic929160_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic929160.jpg</image>
        <name type="primary" sortindex="1" value="DungeonWorld" />
        <description>Dungeon World is a rules system designed to allow players to use 10mm Pendraken Miniatures to conduct old school dungeon crawl adventures using heroes to battle terrible Monsters in the deep, dark places of the World.&amp;#10;&amp;#10;These rules are for fantasy skirmish war gamers who like the idea of taking up table top gaming, but lack either the space to play a larger scale game, or who are reluctant to spend a king's ransom collecting 28mm heroes and monsters. Larger scale dungeon games tend to look rather flat and slightly abstract, unless the collector is prepared to put in a vast amount of time and energy to make the game stand out above the norm. Well, with 10mm miniatures you can not only play highly satisfactory skirmish games on the size of a small coffee table, but you can also buy your entire resin dungeon and a complete collection of miniatures for far less money than it might normally cost you to purchase even one fantasy army using the larger scale miniatures made by most mainstream game companies.&amp;#10;&amp;#10;A game by Stephen A Gilbert.&amp;#10;&amp;#10;</description>
        <yearpublished value="2010" />
        <minplayers value="1" />
        <maxplayers value="5" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="0">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="5+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
        </poll>
        <playingtime value="60" />
        <minplaytime value="60" />
        <maxplaytime value="60" />
        <minage value="8" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="0">
	</poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="0">
	</poll>
        <link type="boardgamecategory" id="1017" value="Dice" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1047" value="Miniatures" />
        <link type="boardgamemechanic" id="2001" value="Action Point Allowance System" />
        <link type="boardgamepublisher" id="1001" value="(Web published)" />
        <link type="boardgamepublisher" id="6198" value="Pendraken Miniatures" />
        <statistics page="1">
            <ratings >
                <usersrated value="3" />
                <average value="6.33333" />
                <bayesaverage value="0" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="Not Ranked" bayesaverage="Not Ranked" />
                </ranks>
                <stddev value="3.77124" />
                <median value="0" />
                <owned value="13" />
                <trading value="0" />
                <wanting value="0" />
                <wishing value="8" />
                <numcomments value="1" />
                <numweights value="1" />
                <averageweight value="2" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="1202">
        <thumbnail>https://cf.geekdo-images.com/images/pic339500_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic339500.jpg</image>
        <name type="primary" sortindex="5" value="The Sorcerer&#039;s Cave" />
        <description>A fantasy-based game, using cards to create an underground lair that players explore -&amp;ndash; cooperatively or competitively -- using bands of characters, in an attempt to leave with the highest score (monsters defeated and treasure). Gaming decisions are relatively limited, but the fascination of the game lies in the changing setup and the 'story' that is created on each occasion.&amp;#10;&amp;#10;The game shares its basic mechanics with The Mystic Wood by the same author.&amp;#10;&amp;#10;</description>
        <yearpublished value="1978" />
        <minplayers value="1" />
        <maxplayers value="4" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="10">
            <results numplayers="1">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="6" />
                <result value="Not Recommended" numvotes="2" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="3" />
                <result value="Recommended" numvotes="6" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="6" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="6" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="4+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="2" />
                <result value="Not Recommended" numvotes="4" />
            </results>
        </poll>
        <playingtime value="60" />
        <minplaytime value="60" />
        <maxplaytime value="60" />
        <minage value="10" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="5">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="2" />
                <result value="6" numvotes="1" />
                <result value="8" numvotes="2" />
                <result value="10" numvotes="0" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="3">
            <results>
                <result level="6" value="No necessary in-game text" numvotes="0" />
                <result level="7" value="Some necessary text - easily memorized or small crib sheet" numvotes="1" />
                <result level="8" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="2" />
                <result level="9" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="10" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1002" value="Card Game" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgameexpansion" id="3930" value="The Sorcerer's Cave Extension" />
        <link type="boardgamedesigner" id="476" value="Terence Peter Donnelly" />
        <link type="boardgamepublisher" id="362" value="Ariel" />
        <link type="boardgamepublisher" id="103" value="Gibsons Games" />
        <link type="boardgamepublisher" id="272" value="Philmar" />
        <statistics page="1">
            <ratings >
                <usersrated value="329" />
                <average value="6.36565" />
                <bayesaverage value="5.69608" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="3872" bayesaverage="5.69608" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="562" bayesaverage="5.80142" />
                    <rank type="family" id="5499" name="familygames" friendlyname="Family Game Rank" value="1020" bayesaverage="5.73078" />
                </ranks>
                <stddev value="1.45571" />
                <median value="0" />
                <owned value="641" />
                <trading value="37" />
                <wanting value="72" />
                <wishing value="134" />
                <numcomments value="163" />
                <numweights value="38" />
                <averageweight value="1.7895" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgameexpansion" id="1746">
        <thumbnail>https://cf.geekdo-images.com/images/pic276631_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic276631.jpg</image>
        <name type="primary" sortindex="1" value="Dungeonquest: Catacombs" />
        <description>Dungeonquest Catacombs adds a new level of excitement to Games Workshop's award winning Dungeonquest game. This expansion set includes full rules and components for venturing into the dread Catacombs, as well as new traps, monsters, treasures and room tiles for you to encounter in the normal dungeon.&amp;#10;&amp;#10;Originally published as part of Drakborgen II by Brio AB along with some additional elements that were adapted into Heroes for Dungeonquest.&amp;#10;&amp;#10;</description>
        <yearpublished value="1988" />
        <minplayers value="1" />
        <maxplayers value="4" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="0">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
        </poll>
        <playingtime value="90" />
        <minplaytime value="90" />
        <maxplaytime value="90" />
        <minage value="10" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="0">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="0" />
                <result value="10" numvotes="0" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="0">
            <results>
                <result level="116" value="No necessary in-game text" numvotes="0" />
                <result level="117" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="118" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="119" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="120" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1042" value="Expansion for Base-game" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamecategory" id="1059" value="Maze" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamemechanic" id="2003" value="Rock-Paper-Scissors" />
        <link type="boardgamemechanic" id="2002" value="Tile Placement" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="8132" value="Drakborgen" />
        <link type="boardgameexpansion" id="472" value="DungeonQuest" inbound="true"/>
        <link type="boardgamedesigner" id="228" value="Jakob Bonds" />
        <link type="boardgamedesigner" id="183" value="Dan Glimne" />
        <link type="boardgamepublisher" id="26" value="Games Workshop Ltd." />
        <statistics page="1">
            <ratings >
                <usersrated value="433" />
                <average value="6.57783" />
                <bayesaverage value="5.82859" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="Not Ranked" bayesaverage="5.82859" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="Not Ranked" bayesaverage="6.02949" />
                </ranks>
                <stddev value="1.40844" />
                <median value="0" />
                <owned value="793" />
                <trading value="15" />
                <wanting value="51" />
                <wishing value="65" />
                <numcomments value="148" />
                <numweights value="39" />
                <averageweight value="2.3333" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgameexpansion" id="1745">
        <thumbnail>https://cf.geekdo-images.com/images/pic479531_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic479531.jpg</image>
        <name type="primary" sortindex="1" value="Heroes for Dungeonquest" />
        <name type="alternate" sortindex="1" value="Dungeonquest: Heroes" />
        <description>Heroes for Dungeonquest is the first expansion set for the best-selling game of exploration, adventure and gruesome endings.  Inside you will find 12 new foolhardy adventurers, ready to see if they can reap profit from a visit into the castle.&amp;#10;&amp;#10;Set contains:&amp;#10;&amp;#10;     12 metal miniatures, bases and character sheets&amp;#10;     6 new combat cards&amp;#10;     6 spell cards&amp;#10;     8 new magic ring cards&amp;#10;     2 special equipment cards&amp;#10;     3 plastic tokens&amp;#10;     10-sided die&amp;#10;&amp;#10;&amp;#10;&amp;#10;&amp;#10;Originally published as part of Drakborgen II by Brio AB along with some additional elements that were adapted into Dungeonquest: Catacombs.&amp;#10;&amp;#10;Expands:&amp;#10;&amp;#10;    Dungeonquest&amp;#10;&amp;#10;&amp;#10;&amp;#10;&amp;#10;</description>
        <yearpublished value="1987" />
        <minplayers value="1" />
        <maxplayers value="4" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="0">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
        </poll>
        <playingtime value="90" />
        <minplaytime value="90" />
        <maxplaytime value="90" />
        <minage value="10" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="0">
	</poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="1">
            <results>
                <result level="56" value="No necessary in-game text" numvotes="0" />
                <result level="57" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="58" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="59" value="Extensive use of text - massive conversion needed to be playable" numvotes="1" />
                <result level="60" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1042" value="Expansion for Base-game" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamecategory" id="1059" value="Maze" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamemechanic" id="2003" value="Rock-Paper-Scissors" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamemechanic" id="2002" value="Tile Placement" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="8132" value="Drakborgen" />
        <link type="boardgameexpansion" id="472" value="DungeonQuest" inbound="true"/>
        <link type="boardgamedesigner" id="228" value="Jakob Bonds" />
        <link type="boardgamedesigner" id="183" value="Dan Glimne" />
        <link type="boardgamepublisher" id="26" value="Games Workshop Ltd." />
        <statistics page="1">
            <ratings >
                <usersrated value="369" />
                <average value="7.05515" />
                <bayesaverage value="5.92902" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="Not Ranked" bayesaverage="5.92902" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="Not Ranked" bayesaverage="6.20871" />
                </ranks>
                <stddev value="1.44962" />
                <median value="0" />
                <owned value="755" />
                <trading value="19" />
                <wanting value="46" />
                <wishing value="59" />
                <numcomments value="145" />
                <numweights value="34" />
                <averageweight value="2.2941" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="84990">
        <thumbnail>https://cf.geekdo-images.com/images/pic840619_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic840619.jpg</image>
        <name type="primary" sortindex="1" value="I-Magi-Nation" />
        <description>I-Magi-Nation is a dungeon crawler that got created during the &amp;quot;my many monster dice game competition&amp;quot; held by Todd Sanders in August 2010.&amp;#10;The task was, to create a game that uses mainly a couple of dice, that were permitted by Todd. Some of those dice are common, some are special dice, available from Flying Buffalo Inc&amp;#10;The required common dice are:&amp;#10;1d4, 1d6, 1d8, 1d12, 1d20&amp;#10;The special dice are:&amp;#10;1 complete set of monster dice&amp;#10;3 trap dice in different colors (e.g. blue, green, red)&amp;#10;1 corridor die&amp;#10;1 treasure die&amp;#10;Additionally to this, you will need some sheets of grid paper and a pencil to keep track of your stats and to draw the dungeon you are going to explore.&amp;#10;&amp;#10;While the rules are written in English, the game itself depends on symbols and numbers only, so it can be easily transfered into any other language.&amp;#10;&amp;#10;You start the game by creating your character and equipping him with a weapon and armor of your choice. &amp;#10;With your character you start on the first level of a dungeon and you have to reach the exit, which is 10 levels below.&amp;#10;Between the start and the end points, there are going to be hordes of monsters to defeat, but hoards of treasure to loot, too.&amp;#10;The dice will determine everything: What kind of dungeonsection you have found (a room, a corridor, ..), whether you have run into a trap and the kind of the trap, what monsters you will encounter (from a lowly rat up to a fierce dragon) and the kind of treasure you are going to loot (upgrades for your equipment, gold, jewelry or even scrolls with powerful spells on them).&amp;#10;Combat is fast, deadly and - driven by dice, of course.&amp;#10;&amp;#10;</description>
        <yearpublished value="2010" />
        <minplayers value="1" />
        <maxplayers value="1" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="0">
            <results numplayers="1+">		
				</results>
        </poll>
        <playingtime value="0" />
        <minplaytime value="0" />
        <maxplaytime value="0" />
        <minage value="10" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="0">
	</poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="0">
	</poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1017" value="Dice" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1120" value="Print &amp; Play" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2055" value="Paper-and-Pencil" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="5666" value="Solitaire Games" />
        <link type="boardgamedesigner" id="12247" value="Kai Bettzieche" />
        <link type="boardgamepublisher" id="1001" value="(Web published)" />
        <statistics page="1">
            <ratings >
                <usersrated value="1" />
                <average value="6" />
                <bayesaverage value="0" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="Not Ranked" bayesaverage="Not Ranked" />
                </ranks>
                <stddev value="0" />
                <median value="0" />
                <owned value="5" />
                <trading value="0" />
                <wanting value="0" />
                <wishing value="9" />
                <numcomments value="0" />
                <numweights value="1" />
                <averageweight value="1" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="63011">
        <thumbnail>https://cf.geekdo-images.com/images/pic621823_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic621823.jpg</image>
        <name type="primary" sortindex="1" value="Patrol: Lost!" />
        <description>Patrol: Lost! is a Public Domain game system.  It describes a board game, its rules and components but does not contain any theme of its own.&amp;#10;&amp;#10;The game builds the board as it progresses by placing and removing hexagon tiles.  It's for two players, one takes control of the &amp;quot;Good Guys&amp;quot; and the other player controls the &amp;quot;Bad Guys&amp;quot;.&amp;#10;&amp;#10;Players move their pawns around the board, one player trying to reach the End tile and the other trying to eliminate the opponents pawns before they reach the End tile.&amp;#10;&amp;#10;Combat is resolved by rolling D6's with modifiers being applied.&amp;#10;&amp;#10;It can be played solo if the player wishes.&amp;#10;&amp;#10;</description>
        <yearpublished value="2009" />
        <minplayers value="2" />
        <maxplayers value="2" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="1">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
        </poll>
        <playingtime value="30" />
        <minplaytime value="30" />
        <maxplaytime value="30" />
        <minage value="12" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="0">
	</poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="0">
            <results>
                <result level="1" value="No necessary in-game text" numvotes="0" />
                <result level="2" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="3" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="4" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="5" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1017" value="Dice" />
        <link type="boardgamecategory" id="1120" value="Print &amp; Play" />
        <link type="boardgamemechanic" id="2046" value="Area Movement" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamedesigner" id="8877" value="Felbrigg Herriot" />
        <link type="boardgamepublisher" id="171" value="(Public Domain)" />
        <statistics page="1">
            <ratings >
                <usersrated value="64" />
                <average value="6.97656" />
                <bayesaverage value="5.58836" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="6033" bayesaverage="5.58836" />
                </ranks>
                <stddev value="1.506" />
                <median value="0" />
                <owned value="128" />
                <trading value="1" />
                <wanting value="9" />
                <wishing value="87" />
                <numcomments value="51" />
                <numweights value="8" />
                <averageweight value="1.75" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="43691">
        <thumbnail>https://cf.geekdo-images.com/images/pic498981_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic498981.jpg</image>
        <name type="primary" sortindex="1" value="Delve: The Dice Game" />
        <description>You have a party of four adventurers, each with unique abilities - a Fighter, a Rogue, a Wizard and a Cleric. They will face 6 groups of monsters in order.  You fight battles one round at a time, rolling for your adventurers first. For your adventurer's attack, roll 6 dice up to 3 times, setting aside any you want to keep. After the rolls, determine which attacks you will make, based on your surviving characters abilities.  For the monsters attack, roll a six sided die for every point of health they have left.  The goal of the game is to destroy all of the monsters, and to finally slay the Dragon, with at least one surviving adventurer.&amp;#10;&amp;#10;</description>
        <yearpublished value="2009" />
        <minplayers value="1" />
        <maxplayers value="1" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="16">
            <results numplayers="1">
                <result value="Best" numvotes="15" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="1+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="9" />
            </results>
        </poll>
        <playingtime value="20" />
        <minplaytime value="20" />
        <maxplaytime value="20" />
        <minage value="0" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="5">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="1" />
                <result value="8" numvotes="3" />
                <result value="10" numvotes="1" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="8">
            <results>
                <result level="1" value="No necessary in-game text" numvotes="0" />
                <result level="2" value="Some necessary text - easily memorized or small crib sheet" numvotes="6" />
                <result level="3" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="2" />
                <result level="4" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="5" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamecategory" id="1120" value="Print &amp; Play" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2055" value="Paper-and-Pencil" />
        <link type="boardgamefamily" id="5666" value="Solitaire Games" />
        <link type="boardgamedesigner" id="13262" value="Drew Chamberlain" />
        <link type="boardgameartist" id="13265" value="A. Tran" />
        <link type="boardgamepublisher" id="1001" value="(Web published)" />
        <statistics page="1">
            <ratings >
                <usersrated value="392" />
                <average value="6.47495" />
                <bayesaverage value="5.76312" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="3239" bayesaverage="5.76312" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="503" bayesaverage="5.885" />
                </ranks>
                <stddev value="1.19959" />
                <median value="0" />
                <owned value="554" />
                <trading value="5" />
                <wanting value="8" />
                <wishing value="149" />
                <numcomments value="200" />
                <numweights value="58" />
                <averageweight value="1.2759" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="1927">
        <thumbnail>https://cf.geekdo-images.com/images/pic2790787_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic2790787.jpg</image>
        <name type="primary" sortindex="1" value="Munchkin" />
        <name type="alternate" sortindex="1" value="Munchkin 1+2" />
        <name type="alternate" sortindex="1" value="Munchkin Das Kartenspiel" />
        <name type="alternate" sortindex="1" value="Munchkin Deluxe" />
        <name type="alternate" sortindex="1" value="Munchkin Edycja 2012" />
        <name type="alternate" sortindex="1" value="Munchkin Foil Edition (alternate)" />
        <name type="alternate" sortindex="1" value="Munchkin Holiday Edition" />
        <name type="alternate" sortindex="1" value="Munchkin Special Holiday Edition" />
        <name type="alternate" sortindex="1" value="Munchkin Target Edition" />
        <name type="alternate" sortindex="1" value="Munchkin: Guest Artist Edition" />
        <name type="alternate" sortindex="1" value="Манчкін" />
        <name type="alternate" sortindex="1" value="Манчкин" />
        <name type="alternate" sortindex="1" value="Манчкин Делюкс" />
        <name type="alternate" sortindex="1" value="マンチキン" />
        <name type="alternate" sortindex="1" value="小白世紀" />
        <description>&amp;#9;&amp;#9;&amp;#9;&amp;#9;&amp;#10;&amp;#9;&amp;#9;&amp;#9;&amp;#9;&amp;#9;Publisher's Description&amp;#10;&amp;#10;Go down in the dungeon. Kill everything you meet. Backstab your friends and steal their stuff. Grab the treasure and run.&amp;#10;&amp;#10;Admit it. You love it.&amp;#10;&amp;#10;This award-winning card game, designed by Steve Jackson, captures the essence of the dungeon experience... with none of that stupid roleplaying stuff. You and your friends compete to kill monsters and grab magic items. And what magic items! Don the Horny Helmet and the Boots of Butt-Kicking. Wield the Staff of Napalm... or maybe the Chainsaw of Bloody Dismemberment. Start by slaughtering the Potted Plant and the Drooling Slime, and work your way up to the Plutonium Dragon...&amp;#10;&amp;#10;And it's illustrated by John Kovalic! Fast-playing and silly, Munchkin can reduce any roleplaying group to hysteria. And, while they're laughing, you can steal their stuff.&amp;#10;&amp;#10;&amp;#9;&amp;#9;&amp;#9;&amp;#9;&amp;#10;&amp;#9;&amp;#9;&amp;#9;&amp;#9;&amp;#9;Other&amp;#10;&amp;#10;Part of the Munchkin series.&amp;#10;&amp;#10;Munchkin is a satirical card game based on the clich&amp;eacute;s and oddities of Dungeons and Dragons and other role-playing games. Each player starts at level 1 and the winner is the first player to reach level 10. Players can acquire familiar D&amp;amp;D style character classes during the game which determine to some extent the cards they can play.&amp;#10;&amp;#10;There are two types of cards - treasure and encounters. Each turn the current players 'kicks down the door' - drawing an encounter card from the deck. Usually this will involve battling a monster. Monsters have their own levels and players must try and overcome it using the levels, weapons and powers they have acquired during the game or run away. Other players can chose to help the player or hinder by adding extra monsters to the encounter. Defeating a monster will usually result in drawing treasure cards and acquiring levels.  Being defeated by a monster results in &amp;quot;bad stuff&amp;quot; which usually involves losing levels and treasure.&amp;#10;&amp;#10;In May 2010, Steve Jackson Games made the &amp;quot;big announcement.&amp;quot; Many rules and cards were changed. See The Great 2010 Munchkin Changeover for details. Of note to Munchkin fans, the Kneepads of Allure card, which had been removed in the 14th printing, was added back to the game but modified to be less powerful.&amp;#10;&amp;#10;&amp;#9;&amp;#9;&amp;#9;&amp;#9;&amp;#10;&amp;#9;&amp;#9;&amp;#9;&amp;#9;&amp;#9;Sequels:&amp;#10;&amp;#10;&amp;#10;    The Good, the Bad, and the Munchkin&amp;#10;    Munchkin Apocalypse&amp;#10;    Munchkin Axe Cop&amp;#10;    Munchkin Bites!&amp;#10;    Munchkin Booty&amp;#10;    Munchkin Conan&amp;#10;    Munchkin Cthulhu&amp;#10;    Munchkin Fu&amp;#10;    Munchkin Impossible&amp;#10;    Munchkin Legends&amp;#10;    Munchkin Pathfinder&amp;#10;    Munchkin Zombies&amp;#10;    Star Munchkin&amp;#10;    Super Munchkin&amp;#10;&amp;#10;&amp;#10;&amp;#9;&amp;#9;&amp;#9;&amp;#9;&amp;#10;&amp;#9;&amp;#9;&amp;#9;&amp;#9;&amp;#9;Related Board Games&amp;#10;&amp;#10;&amp;#10;    Munchkin Quest&amp;#10;&amp;#10;&amp;#10;&amp;#9;&amp;#9;&amp;#9;&amp;#9;&amp;#10;&amp;#9;&amp;#9;&amp;#9;&amp;#9;&amp;#9;Online play&amp;#10;&amp;#10;&amp;#10;     Vassal does not support Munchkin anymore. Former link: Vassal Module&amp;#10;&amp;#10;&amp;#10;&amp;#9;&amp;#9;&amp;#9;&amp;#9;&amp;#10;&amp;#9;&amp;#9;&amp;#9;&amp;#9;&amp;#9;Pegasus Expansions&amp;#10;&amp;#10;&amp;#10;    Munchkin Sammlerbox&amp;#10;    Munchkin Sammlerkoffer&amp;#10;    Munchkin Promotional Bookmarks&amp;#10;    Munchkin Weihnachtsedition - The same as Munchkin, but with a promotional button that grants the wearer extra treasure (when worn in December). &amp;#10;&amp;#10;&amp;#10;&amp;#9;&amp;#9;&amp;#9;&amp;#9;&amp;#10;&amp;#9;&amp;#9;&amp;#9;&amp;#9;&amp;#9;Online Playthrough&amp;#10;&amp;#10;There's a great YouTube playthrough with Will Wheaton and Steve Jackson (yes, the Steve Jackson) found here LINK&amp;#10;&amp;#10;</description>
        <yearpublished value="2001" />
        <minplayers value="3" />
        <maxplayers value="6" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="280">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="202" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="2" />
                <result value="Recommended" numvotes="34" />
                <result value="Not Recommended" numvotes="190" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="33" />
                <result value="Recommended" numvotes="153" />
                <result value="Not Recommended" numvotes="49" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="174" />
                <result value="Recommended" numvotes="74" />
                <result value="Not Recommended" numvotes="12" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="99" />
                <result value="Recommended" numvotes="110" />
                <result value="Not Recommended" numvotes="27" />
            </results>
            <results numplayers="6">
                <result value="Best" numvotes="36" />
                <result value="Recommended" numvotes="115" />
                <result value="Not Recommended" numvotes="72" />
            </results>
            <results numplayers="6+">
                <result value="Best" numvotes="16" />
                <result value="Recommended" numvotes="19" />
                <result value="Not Recommended" numvotes="143" />
            </results>
        </poll>
        <playingtime value="120" />
        <minplaytime value="60" />
        <maxplaytime value="120" />
        <minage value="10" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="107">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="17" />
                <result value="10" numvotes="32" />
                <result value="12" numvotes="41" />
                <result value="14" numvotes="14" />
                <result value="16" numvotes="3" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="120">
            <results>
                <result level="26" value="No necessary in-game text" numvotes="0" />
                <result level="27" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="28" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="6" />
                <result level="29" value="Extensive use of text - massive conversion needed to be playable" numvotes="93" />
                <result level="30" value="Unplayable in another language" numvotes="21" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1002" value="Card Game" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamecategory" id="1079" value="Humor" />
        <link type="boardgamemechanic" id="2041" value="Card Drafting" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2040" value="Hand Management" />
        <link type="boardgamemechanic" id="2686" value="Take That" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="24" value="Munchkin" />
        <link type="boardgameexpansion" id="106498" value="+10 Bag o' Munchkin d6" />
        <link type="boardgameexpansion" id="54435" value="+6 Bag O' Munchkin Babes " />
        <link type="boardgameexpansion" id="162543" value="+6 Bag O' Munchkin Legends" />
        <link type="boardgameexpansion" id="98956" value="+6 Bag o' Munchkin Level Counters" />
        <link type="boardgameexpansion" id="151989" value="+6 Bag O' Munchkin Zombies" />
        <link type="boardgameexpansion" id="38891" value="+6 Bag O' Munchkins" />
        <link type="boardgameexpansion" id="136857" value="+8 Bag O' Munchkin Babes &amp; Pawns" />
        <link type="boardgameexpansion" id="206821" value="12 Days of Munchkin Christmas Coloring Book" />
        <link type="boardgameexpansion" id="44805" value="Epic Munchkin" />
        <link type="boardgameexpansion" id="27767" value="Episches Munchkin" />
        <link type="boardgameexpansion" id="88665" value="Exclusive Warehouse 23 Munchkin Booster" />
        <link type="boardgameexpansion" id="39391" value="Mask of the Munchkin" />
        <link type="boardgameexpansion" id="40479" value="Munchkin 1.5: Kości zostały rzucone" />
        <link type="boardgameexpansion" id="100422" value="Munchkin 10th Anniversary Shot Glass" />
        <link type="boardgameexpansion" id="14337" value="Munchkin 2/3: L'Ascia o Raddoppia" />
        <link type="boardgameexpansion" id="3943" value="Munchkin 2: Unnatural Axe" />
        <link type="boardgameexpansion" id="193282" value="Munchkin 3+4" />
        <link type="boardgameexpansion" id="18225" value="Munchkin 3.5: Clerical Errata" />
        <link type="boardgameexpansion" id="134356" value="Munchkin 3.5: Piętno Śmierci" />
        <link type="boardgameexpansion" id="6606" value="Munchkin 3: Clerical Errors" />
        <link type="boardgameexpansion" id="100377" value="Munchkin 4.5" />
        <link type="boardgameexpansion" id="20660" value="Munchkin 4: The Need for Steed" />
        <link type="boardgameexpansion" id="139051" value="Munchkin 5, 6 e 7: Tutti i Mostri Fatti a Fette" />
        <link type="boardgameexpansion" id="28327" value="Munchkin 5: De-Ranged" />
        <link type="boardgameexpansion" id="193528" value="Munchkin 6.5: Terrible Tombs" />
        <link type="boardgameexpansion" id="33493" value="Munchkin 6: Demented Dungeons" />
        <link type="boardgameexpansion" id="90567" value="Munchkin 7: Cheat With Both Hands" />
        <link type="boardgameexpansion" id="37501" value="Munchkin 7: More Good Cards" />
        <link type="boardgameexpansion" id="104232" value="Munchkin 8: Half Horse, Will Travel" />
        <link type="boardgameexpansion" id="164685" value="Munchkin Adventure Time 2: It's a Dungeon Crawl!" />
        <link type="boardgameexpansion" id="201918" value="The Munchkin Alphabet Coloring Book" />
        <link type="boardgameexpansion" id="164682" value="Munchkin Apocalypse: Judge Dredd" />
        <link type="boardgameexpansion" id="11058" value="Munchkin Blender" />
        <link type="boardgameexpansion" id="39264" value="Munchkin Bobblehead" />
        <link type="boardgameexpansion" id="136914" value="Munchkin Bookmark Collection" />
        <link type="boardgameexpansion" id="78674" value="Munchkin Boxes of Holding" />
        <link type="boardgameexpansion" id="126425" value="Munchkin Bracelet of Slapping" />
        <link type="boardgameexpansion" id="204819" value="Munchkin Christmas Monster Box" />
        <link type="boardgameexpansion" id="42521" value="Munchkin Christmas Ornament" />
        <link type="boardgameexpansion" id="39392" value="Munchkin Coins" />
        <link type="boardgameexpansion" id="216306" value="Munchkin Curses" />
        <link type="boardgameexpansion" id="14580" value="Munchkin Dice" />
        <link type="boardgameexpansion" id="103289" value="Munchkin Dice Bag" />
        <link type="boardgameexpansion" id="78580" value="Munchkin Dice Of Protection" />
        <link type="boardgameexpansion" id="161796" value="Munchkin Draghetto o Scherzetto" />
        <link type="boardgameexpansion" id="141823" value="Munchkin Dragons" />
        <link type="boardgameexpansion" id="126531" value="Munchkin Duck of Doom" />
        <link type="boardgameexpansion" id="126532" value="Munchkin Duck of Gloom" />
        <link type="boardgameexpansion" id="136239" value="Munchkin Easter Eggs" />
        <link type="boardgameexpansion" id="42436" value="Munchkin Fairy Dust" />
        <link type="boardgameexpansion" id="105060" value="Munchkin Fairy Dust Dice" />
        <link type="boardgameexpansion" id="161805" value="Munchkin Fatine e Folletti" />
        <link type="boardgameexpansion" id="138960" value="Munchkin Game Changers" />
        <link type="boardgameexpansion" id="134690" value="Munchkin Gazebo Shot Glass" />
        <link type="boardgameexpansion" id="130194" value="Munchkin Get More Loot! Promotional Postcard" />
        <link type="boardgameexpansion" id="147475" value="Munchkin Gets Promoted" />
        <link type="boardgameexpansion" id="225442" value="Munchkin Gets Promoted 2" />
        <link type="boardgameexpansion" id="42428" value="Munchkin Greeting Cards" />
        <link type="boardgameexpansion" id="224034" value="Munchkin Halloween Monster Box" />
        <link type="boardgameexpansion" id="159514" value="Munchkin Halloween Pack" />
        <link type="boardgameexpansion" id="187049" value="Munchkin Hidden Treasures" />
        <link type="boardgameexpansion" id="181196" value="Munchkin Hipsters" />
        <link type="boardgameexpansion" id="133572" value="Munchkin Holiday Surprise" />
        <link type="boardgameexpansion" id="162078" value="Munchkin Holidazed" />
        <link type="boardgameexpansion" id="179253" value="Munchkin Imaginary Frenemies" />
        <link type="boardgameexpansion" id="105061" value="Munchkin Jolly Jumbo D6" />
        <link type="boardgameexpansion" id="155170" value="Munchkin Journal Pack 1" />
        <link type="boardgameexpansion" id="155171" value="Munchkin Journal Pack 2" />
        <link type="boardgameexpansion" id="162539" value="Munchkin Journal Pack 3" />
        <link type="boardgameexpansion" id="98969" value="Munchkin Jumbo D6" />
        <link type="boardgameexpansion" id="54434" value="Munchkin Kill-O-Meter" />
        <link type="boardgameexpansion" id="181273" value="Munchkin Kittens" />
        <link type="boardgameexpansion" id="194488" value="Munchkin Knights" />
        <link type="boardgameexpansion" id="211294" value="Munchkin Knights: Four More" />
        <link type="boardgameexpansion" id="141830" value="Munchkin Kobolds Ate My Baby!" />
        <link type="boardgameexpansion" id="161802" value="Munchkin La Rivincita del Babbo" />
        <link type="boardgameexpansion" id="141460" value="Munchkin Level Playing Field" />
        <link type="boardgameexpansion" id="164689" value="Munchkin Love Shark Baby" />
        <link type="boardgameexpansion" id="68942" value="Munchkin Marked For Death" />
        <link type="boardgameexpansion" id="194489" value="Munchkin Meeples" />
        <link type="boardgameexpansion" id="162547" value="Munchkin Messenger Bag" />
        <link type="boardgameexpansion" id="226171" value="Munchkin Metal Pin" />
        <link type="boardgameexpansion" id="198277" value="Munchkin Monster Box" />
        <link type="boardgameexpansion" id="90566" value="Munchkin Monster Enhancers" />
        <link type="boardgameexpansion" id="128034" value="Munchkin Naughty &amp; Nice" />
        <link type="boardgameexpansion" id="39393" value="Munchkin Official Shirts" />
        <link type="boardgameexpansion" id="134725" value="Munchkin Patch" />
        <link type="boardgameexpansion" id="145497" value="Munchkin Pathfinder: Gobsmacked!" />
        <link type="boardgameexpansion" id="207756" value="Munchkin Pathfinder: Truly Gobnoxious" />
        <link type="boardgameexpansion" id="125386" value="Munchkin Penny Arcade" />
        <link type="boardgameexpansion" id="130826" value="Munchkin Pins" />
        <link type="boardgameexpansion" id="194958" value="Munchkin Playmat: Flower Cashes In" />
        <link type="boardgameexpansion" id="216183" value="Munchkin Playmat: Presents Unaccounted For" />
        <link type="boardgameexpansion" id="204816" value="Munchkin Playmat: Spyke's Christmas Wish" />
        <link type="boardgameexpansion" id="217888" value="Munchkin Playmat: The Flower of Love" />
        <link type="boardgameexpansion" id="134691" value="Munchkin Plutonium Dragon Shot Glass" />
        <link type="boardgameexpansion" id="158233" value="Munchkin Princesses" />
        <link type="boardgameexpansion" id="41034" value="Munchkin Promo Cards" />
        <link type="boardgameexpansion" id="24733" value="Munchkin Promotional Bookmarks" />
        <link type="boardgameexpansion" id="194831" value="Munchkin Puppies" />
        <link type="boardgameexpansion" id="103291" value="Munchkin Reindeer Games" />
        <link type="boardgameexpansion" id="80571" value="Munchkin Reloaded!" />
        <link type="boardgameexpansion" id="29288" value="Munchkin Rigged Demo" />
        <link type="boardgameexpansion" id="161794" value="Munchkin Rompi le Uova" />
        <link type="boardgameexpansion" id="22263" value="Munchkin Sammlerbox" />
        <link type="boardgameexpansion" id="84870" value="Munchkin Sammlerkoffer" />
        <link type="boardgameexpansion" id="76466" value="Munchkin Santa's Revenge" />
        <link type="boardgameexpansion" id="62387" value="Munchkin Sherpa" />
        <link type="boardgameexpansion" id="110583" value="Munchkin Skullkickers" />
        <link type="boardgameexpansion" id="153943" value="Munchkin Sparkly Good Fairy Shot Glass" />
        <link type="boardgameexpansion" id="170513" value="Munchkin Stocking Stuffers" />
        <link type="boardgameexpansion" id="146658" value="Munchkin Tavern Pint Glass" />
        <link type="boardgameexpansion" id="146657" value="Munchkin Tavern Reusable Tote" />
        <link type="boardgameexpansion" id="146659" value="Munchkin Tavern Shot Glass" />
        <link type="boardgameexpansion" id="39394" value="Munchkin Temporary Tattoos" />
        <link type="boardgameexpansion" id="106618" value="Munchkin The Guild" />
        <link type="boardgameexpansion" id="69436" value="Munchkin Thumb Drive" />
        <link type="boardgameexpansion" id="144088" value="Munchkin Tricky Treats" />
        <link type="boardgameexpansion" id="153283" value="Munchkin Triple Play: Set 1" />
        <link type="boardgameexpansion" id="153284" value="Munchkin Triple Play: Set 2" />
        <link type="boardgameexpansion" id="165684" value="Munchkin Turbobooster 1" />
        <link type="boardgameexpansion" id="165685" value="Munchkin Turbobooster 2" />
        <link type="boardgameexpansion" id="179252" value="Munchkin Undead" />
        <link type="boardgameexpansion" id="211830" value="Munchkin Valentines" />
        <link type="boardgameexpansion" id="183650" value="Munchkin Vinyl Figure: Dopple Spyke" />
        <link type="boardgameexpansion" id="40857" value="Munchkin Water" />
        <link type="boardgameexpansion" id="39261" value="Munchkin Wicked Dice &amp; Bag" />
        <link type="boardgameexpansion" id="176441" value="Munchkin Zipper Pull" />
        <link type="boardgameexpansion" id="151982" value="Munchkin Zombies 4: Spare Parts" />
        <link type="boardgameexpansion" id="99609" value="Munchkin: Conan the Barbarian" />
        <link type="boardgameexpansion" id="178048" value="Munchkin: Dragon's Trike" />
        <link type="boardgameexpansion" id="86356" value="Munchkin: Go Up a Level" />
        <link type="boardgameexpansion" id="194957" value="Munchkin: Playmat – Spyke Gets Suckered" />
        <link type="boardgameexpansion" id="43894" value="Munchkin: Waiting For Santa" />
        <link type="boardgameexpansion" id="190223" value="Munchkin: Yule Log" />
        <link type="boardgameexpansion" id="87658" value="Munchkinomicon" />
        <link type="boardgameexpansion" id="136836" value="Schwarze Gürtel des Munchkintums" />
        <link type="boardgameexpansion" id="181274" value="Star Munchkin Cosmic Demo" />
        <link type="boardgameexpansion" id="134692" value="Zombie Shot Glass" />
        <link type="boardgameintegration" id="197414" value="Moop's Monster Mashup" />
        <link type="boardgameintegration" id="181268" value="Munchkin Christmas Lite" />
        <link type="boardgameintegration" id="112991" value="Munchkin Conan" />
        <link type="boardgameintegration" id="208256" value="Munchkin Grimm Tidings" />
        <link type="boardgameintegration" id="193286" value="Munchkin Legenden 1+2" />
        <link type="boardgameintegration" id="144325" value="Munchkin Legends" />
        <link type="boardgameintegration" id="171199" value="Munchkin Legends Deluxe" />
        <link type="boardgameintegration" id="181192" value="Munchkin Oz" />
        <link type="boardgameintegration" id="129359" value="Munchkin Pathfinder" />
        <link type="boardgameintegration" id="220141" value="Munchkin Shakespeare" />
        <link type="boardgamecompilation" id="190553" value="Munchkin 1+2" />
        <link type="boardgamecompilation" id="145534" value="Munchkin Bobblehead Edition" />
        <link type="boardgamecompilation" id="184513" value="Munchkin Edycja Rozszerzona" />
        <link type="boardgamecompilation" id="145535" value="Munchkin Special Holiday Edition" />
        <link type="boardgameimplementation" id="44805" value="Epic Munchkin" />
        <link type="boardgameimplementation" id="30166" value="The Good, the Bad, and the Munchkin" />
        <link type="boardgameimplementation" id="197414" value="Moop's Monster Mashup" />
        <link type="boardgameimplementation" id="146735" value="Munchkin Adventure Time" />
        <link type="boardgameimplementation" id="112869" value="Munchkin Apocalypse" />
        <link type="boardgameimplementation" id="94915" value="Munchkin Axe Cop" />
        <link type="boardgameimplementation" id="12194" value="Munchkin Bites!" />
        <link type="boardgameimplementation" id="31920" value="Munchkin Booty" />
        <link type="boardgameimplementation" id="181268" value="Munchkin Christmas Lite" />
        <link type="boardgameimplementation" id="112991" value="Munchkin Conan" />
        <link type="boardgameimplementation" id="25071" value="Munchkin Cthulhu" />
        <link type="boardgameimplementation" id="6607" value="Munchkin Fu" />
        <link type="boardgameimplementation" id="208256" value="Munchkin Grimm Tidings" />
        <link type="boardgameimplementation" id="22948" value="Munchkin Impossible" />
        <link type="boardgameimplementation" id="193286" value="Munchkin Legenden 1+2" />
        <link type="boardgameimplementation" id="165683" value="Munchkin Legenden 2: Fauntastische Spiele" />
        <link type="boardgameimplementation" id="144325" value="Munchkin Legends" />
        <link type="boardgameimplementation" id="171199" value="Munchkin Legends Deluxe" />
        <link type="boardgameimplementation" id="189848" value="Munchkin Marvel" />
        <link type="boardgameimplementation" id="181192" value="Munchkin Oz" />
        <link type="boardgameimplementation" id="156786" value="Munchkin Panic" />
        <link type="boardgameimplementation" id="129359" value="Munchkin Pathfinder" />
        <link type="boardgameimplementation" id="29678" value="Munchkin Quest" />
        <link type="boardgameimplementation" id="29288" value="Munchkin Rigged Demo" />
        <link type="boardgameimplementation" id="220141" value="Munchkin Shakespeare" />
        <link type="boardgameimplementation" id="164031" value="Munchkin Steampunk" />
        <link type="boardgameimplementation" id="166026" value="Munchkin Treasure Hunt" />
        <link type="boardgameimplementation" id="213670" value="Munchkin X-Men" />
        <link type="boardgameimplementation" id="86955" value="Munchkin Zombies" />
        <link type="boardgameimplementation" id="198776" value="Munchkin: Sketch Edition" />
        <link type="boardgameimplementation" id="180816" value="Munchkin: The Nightmare Before Christmas" />
        <link type="boardgameimplementation" id="162559" value="Smash Up: Munchkin" />
        <link type="boardgameimplementation" id="4095" value="Star Munchkin" />
        <link type="boardgameimplementation" id="16933" value="Super Munchkin" />
        <link type="boardgamedesigner" id="22" value="Steve Jackson (I)" />
        <link type="boardgameartist" id="12158" value="Alex Fernandez (I)" />
        <link type="boardgameartist" id="51927" value="Edwin Huang" />
        <link type="boardgameartist" id="6815" value="John Kovalic" />
        <link type="boardgameartist" id="82671" value="Ian McGinty" />
        <link type="boardgameartist" id="12742" value="Heather Oliver" />
        <link type="boardgameartist" id="844" value="Philip Reed" />
        <link type="boardgameartist" id="93259" value="Gabby Ruenes" />
        <link type="boardgamepublisher" id="3320" value="(Unknown)" />
        <link type="boardgamepublisher" id="23043" value="ADC Blackfire Entertainment" />
        <link type="boardgamepublisher" id="3475" value="Arclight" />
        <link type="boardgamepublisher" id="157" value="Asmodee" />
        <link type="boardgamepublisher" id="6194" value="Delta Vision Publishing" />
        <link type="boardgamepublisher" id="2366" value="Devir" />
        <link type="boardgamepublisher" id="2973" value="Edge Entertainment" />
        <link type="boardgamepublisher" id="18788" value="Fantasiapelit" />
        <link type="boardgamepublisher" id="15605" value="Galápagos Jogos" />
        <link type="boardgamepublisher" id="18852" value="Hobby World" />
        <link type="boardgamepublisher" id="6214" value="Kaissa Chess &amp; Games" />
        <link type="boardgamepublisher" id="4466" value="Kuźnia Gier" />
        <link type="boardgamepublisher" id="32395" value="NeoTroy Games" />
        <link type="boardgamepublisher" id="39" value="Pegasus Spiele" />
        <link type="boardgamepublisher" id="2962" value="PS-Games" />
        <link type="boardgamepublisher" id="8911" value="Q-Workshop" />
        <link type="boardgamepublisher" id="3242" value="Raven Distribution" />
        <link type="boardgamepublisher" id="8266" value="Silver Stars Publishing" />
        <link type="boardgamepublisher" id="8313" value="Smart Ltd" />
        <link type="boardgamepublisher" id="19" value="Steve Jackson Games" />
        <link type="boardgamepublisher" id="3446" value="Ubik" />
        <link type="boardgamepublisher" id="8759" value="Wargames Club Publishing" />
        <link type="boardgamepublisher" id="26784" value="ТРЕТЯ ПЛАНЕТА" />
        <statistics page="1">
            <ratings >
                <usersrated value="29605" />
                <average value="5.95046" />
                <bayesaverage value="5.79125" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="3047" bayesaverage="5.79125" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="750" bayesaverage="5.58362" />
                </ranks>
                <stddev value="1.81992" />
                <median value="0" />
                <owned value="49528" />
                <trading value="1912" />
                <wanting value="92" />
                <wishing value="1226" />
                <numcomments value="6177" />
                <numweights value="2069" />
                <averageweight value="1.7888" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="24410">
        <thumbnail>https://cf.geekdo-images.com/images/pic239163_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic239163.jpg</image>
        <name type="primary" sortindex="1" value="Treasures &amp; Traps" />
        <name type="alternate" sortindex="1" value="Krallen und Fallen" />
        <description>From the publisher. Treasures &amp;amp; Traps is the adventure card game that puts you on a quest for riches. Each card can open the door to a tricky challenge, a magical assistance, or a valuable treasure.&amp;#10;&amp;#10;The approximate playing time is 10-30 minutes for two players. Add 10 minutes for each additional player.&amp;#10;&amp;#10;Be the first player to get a Gold, Silver, and Bronze TREASURE card into your realm. Your other cards give you the powers you will need to keep others from winning.&amp;#10;&amp;#10;The game contains a full set of 100 unique Treasures and Traps Cards.&amp;#10;&amp;#10;Nominated as an ORIGINS AWARDS finalist (2006) for Non-Collectible Card Game of the Year.&amp;#10;&amp;#10;Box Size : 118mm x 90mm x 18mm&amp;#10;&amp;#10;</description>
        <yearpublished value="2006" />
        <minplayers value="2" />
        <maxplayers value="6" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="10">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="5" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="2" />
                <result value="Recommended" numvotes="7" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="6" />
                <result value="Recommended" numvotes="2" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="5" />
                <result value="Recommended" numvotes="2" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="3" />
                <result value="Not Recommended" numvotes="4" />
            </results>
            <results numplayers="6">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="2" />
                <result value="Not Recommended" numvotes="5" />
            </results>
            <results numplayers="6+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="4" />
            </results>
        </poll>
        <playingtime value="10" />
        <minplaytime value="10" />
        <maxplaytime value="10" />
        <minage value="10" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="2">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="2" />
                <result value="10" numvotes="0" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="1">
            <results>
                <result level="1" value="No necessary in-game text" numvotes="0" />
                <result level="2" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="3" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="4" value="Extensive use of text - massive conversion needed to be playable" numvotes="1" />
                <result level="5" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1002" value="Card Game" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamemechanic" id="2004" value="Set Collection" />
        <link type="boardgameexpansion" id="32446" value="Treasures and Traps: Expanded Realms 1" />
        <link type="boardgameexpansion" id="157475" value="Treasures and Traps: Expanded Realms 2" />
        <link type="boardgameexpansion" id="157473" value="Treasures and Traps: Random Encounters" />
        <link type="boardgamedesigner" id="7368" value="C. Aaron Kreader" />
        <link type="boardgameartist" id="7368" value="C. Aaron Kreader" />
        <link type="boardgamepublisher" id="39" value="Pegasus Spiele" />
        <link type="boardgamepublisher" id="5684" value="Studio 9 Incorporated" />
        <statistics page="1">
            <ratings >
                <usersrated value="445" />
                <average value="6.18371" />
                <bayesaverage value="5.68287" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="4062" bayesaverage="5.68287" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="631" bayesaverage="5.70864" />
                    <rank type="family" id="5499" name="familygames" friendlyname="Family Game Rank" value="1046" bayesaverage="5.71721" />
                </ranks>
                <stddev value="1.62824" />
                <median value="0" />
                <owned value="916" />
                <trading value="51" />
                <wanting value="20" />
                <wishing value="87" />
                <numcomments value="191" />
                <numweights value="60" />
                <averageweight value="1.4167" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="3625">
        <thumbnail>https://cf.geekdo-images.com/images/pic10438_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic10438.jpg</image>
        <name type="primary" sortindex="1" value="DeathMaze" />
        <name type="alternate" sortindex="1" value="Death Maze" />
        <name type="alternate" sortindex="1" value="Death Maze: 死の迷宮" />
        <description>(from the instruction manual)&amp;#10;&amp;#10;Deathmaze is a game for one to six players in which each player controls the actions of one or more adventurers exploring the depths of a horror filled catacomb in pursuit of glory and gold.  Like fantasy role playing games, Deathmaze deals with personal heroic fantasy; unlike such games, Deathmaze requires no gamesmaster, but pits the players' skills against an un-gamemastered game system.&amp;#10;&amp;#10;There is an expanded set of rules contained in MOVES magazine #51 &amp;quot; Roll up for the mystery tour!&amp;quot;&amp;#10;&amp;#10;The system was later used in Citadel of Blood.&amp;#10;&amp;#10;</description>
        <yearpublished value="1979" />
        <minplayers value="1" />
        <maxplayers value="6" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="7">
            <results numplayers="1">
                <result value="Best" numvotes="5" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="4" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="3" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="3" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="3" />
            </results>
            <results numplayers="6">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="3" />
            </results>
            <results numplayers="6+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="4" />
            </results>
        </poll>
        <playingtime value="90" />
        <minplaytime value="90" />
        <maxplaytime value="90" />
        <minage value="10" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="1">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="0" />
                <result value="10" numvotes="1" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="3">
            <results>
                <result level="1" value="No necessary in-game text" numvotes="0" />
                <result level="2" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="3" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="2" />
                <result level="4" value="Extensive use of text - massive conversion needed to be playable" numvotes="1" />
                <result level="5" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamecategory" id="1059" value="Maze" />
        <link type="boardgamemechanic" id="2023" value="Co-operative Play" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamemechanic" id="2002" value="Tile Placement" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="21629" value="SPI Capsule Series" />
        <link type="boardgameimplementation" id="3248" value="Citadel of Blood" />
        <link type="boardgamedesigner" id="498" value="Greg Costikyan" />
        <link type="boardgameartist" id="15973" value="Howard Chaykin" />
        <link type="boardgameartist" id="1030" value="Redmond A. Simonsen" />
        <link type="boardgamepublisher" id="5018" value="Encore (for boardgames)" />
        <link type="boardgamepublisher" id="1391" value="Hobby Japan" />
        <link type="boardgamepublisher" id="3133" value="Kokusai-Tsushin Co., Ltd. (国際通信社)" />
        <link type="boardgamepublisher" id="120" value="SPI (Simulations Publications, Inc.)" />
        <statistics page="1">
            <ratings >
                <usersrated value="208" />
                <average value="5.77308" />
                <bayesaverage value="5.53273" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="8950" bayesaverage="5.53273" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="785" bayesaverage="5.5436" />
                    <rank type="family" id="5497" name="strategygames" friendlyname="Strategy Game Rank" value="1603" bayesaverage="5.5265" />
                </ranks>
                <stddev value="1.41086" />
                <median value="0" />
                <owned value="503" />
                <trading value="14" />
                <wanting value="24" />
                <wishing value="78" />
                <numcomments value="98" />
                <numweights value="25" />
                <averageweight value="1.68" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="4746">
        <thumbnail>https://cf.geekdo-images.com/images/pic878157_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic878157.jpg</image>
        <name type="primary" sortindex="1" value="Dungeons &amp; Dragons Computer Labyrinth Game" />
        <name type="alternate" sortindex="1" value="Dungeons &amp; Dragons: Le labyrinthe électronique" />
        <description>MATTEL ELECTRONICS DUNGEONS &amp;amp; DRAGONS COMPUTER LABYRINTH GAME&amp;#10;&amp;#10;A GAME OF STRATEGY&amp;#10;Play alone or against a rival warrior and the dragon computer.  2 skill levels.&amp;#10;&amp;#10;A GAME OF SKILL&amp;#10;Find your way through the labyrinth on a touch-sensitive electronic board.  Electronic sounds help you locate labyrinth walls.  Walls shift with each new game.&amp;#10;&amp;#10;A GAME OF ADVENTURE&amp;#10;Watch out!  Electronic sounds tell you the dragon is after you.  Find and steal the treasure before the dragon gets you, and you win!&amp;#10;&amp;#10;GAME INCLUDES:&amp;#10;&amp;#10;    4 diecast metal playing pieces --&amp;#10;        2 warrior figures approx 1.5&amp;quot; (3.7 cm) tall,&amp;#10;        1 dragon figure 2.3&amp;quot; (5.8 cm) tall, and&amp;#10;        1 treasure piece 1.2&amp;quot; (3.1 cm) by .68&amp;quot; (1.7 cm) by .7&amp;quot; (1.8 cm).&amp;#10;    &amp;#10;    3 plastic markers -- 2 for secret rooms, 1 for treasure room.&amp;#10;    50 plastic wall pieces to mark walls.&amp;#10;    Storage dungeon for game pieces and instructions.&amp;#10;    Playing instructions.&amp;#10;&amp;#10;&amp;#10;&amp;#10;&amp;#10;</description>
        <yearpublished value="1980" />
        <minplayers value="1" />
        <maxplayers value="2" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="3">
            <results numplayers="1">
                <result value="Best" numvotes="3" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="2" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="2" />
            </results>
        </poll>
        <playingtime value="20" />
        <minplaytime value="20" />
        <maxplaytime value="20" />
        <minage value="8" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="1">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="1" />
                <result value="10" numvotes="0" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="1">
            <results>
                <result level="11" value="No necessary in-game text" numvotes="0" />
                <result level="12" value="Some necessary text - easily memorized or small crib sheet" numvotes="1" />
                <result level="13" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="14" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="15" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1072" value="Electronic" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1045" value="Memory" />
        <link type="boardgamemechanic" id="2047" value="Memory" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamefamily" id="7307" value="Dungeons &amp; Dragons" />
        <link type="boardgamedesigner" id="99681" value="Joe Sengir" />
        <link type="boardgamepublisher" id="14227" value="Mattel Electronics" />
        <statistics page="1">
            <ratings >
                <usersrated value="290" />
                <average value="5.91121" />
                <bayesaverage value="5.56766" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="6925" bayesaverage="5.56766" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="780" bayesaverage="5.55229" />
                    <rank type="family" id="5497" name="strategygames" friendlyname="Strategy Game Rank" value="1590" bayesaverage="5.5404" />
                </ranks>
                <stddev value="1.70299" />
                <median value="0" />
                <owned value="565" />
                <trading value="51" />
                <wanting value="22" />
                <wishing value="77" />
                <numcomments value="143" />
                <numweights value="35" />
                <averageweight value="1.7429" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="1543">
        <thumbnail>https://cf.geekdo-images.com/images/pic712862_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic712862.jpg</image>
        <name type="primary" sortindex="1" value="Dragon Quest" />
        <description>Fantasy miniature game. A typical Dragons &amp;amp; Dungeon game. Requires a Game Master. The original game comes with 6 Ral Partha metal miniatures, 180 cards (featuring monsters, treasures, objects and traps), a dungeon board, D&amp;amp;D dice, and three pre-made adventures (ISBN 1-56076-552-b)&amp;#10;&amp;#10;</description>
        <yearpublished value="1992" />
        <minplayers value="2" />
        <maxplayers value="6" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="3">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="2" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="6">
                <result value="Best" numvotes="2" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="6+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="1" />
            </results>
        </poll>
        <playingtime value="60" />
        <minplaytime value="60" />
        <maxplaytime value="60" />
        <minage value="10" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="2">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="2" />
                <result value="10" numvotes="0" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="1">
            <results>
                <result level="61" value="No necessary in-game text" numvotes="0" />
                <result level="62" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="63" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="64" value="Extensive use of text - massive conversion needed to be playable" numvotes="1" />
                <result level="65" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1047" value="Miniatures" />
        <link type="boardgamemechanic" id="2018" value="Campaign / Battle Card Driven" />
        <link type="boardgamemechanic" id="2676" value="Grid Movement" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="7005" value="Animals: Dragons" />
        <link type="boardgamefamily" id="7307" value="Dungeons &amp; Dragons" />
        <link type="boardgamedesigner" id="649" value="William W. Connors" />
        <link type="boardgamedesigner" id="568" value="Walter E. Johnston, IV" />
        <link type="boardgamedesigner" id="648" value="David Wise" />
        <link type="boardgameartist" id="15492" value="Gerald Brom" />
        <link type="boardgameartist" id="13737" value="Clyde Caldwell" />
        <link type="boardgameartist" id="13312" value="Jeff Easley" />
        <link type="boardgameartist" id="1038" value="Larry Elmore" />
        <link type="boardgameartist" id="14291" value="Fred Fields" />
        <link type="boardgameartist" id="12233" value="Carol Heyer" />
        <link type="boardgameartist" id="13689" value="Roger Loveless" />
        <link type="boardgameartist" id="885" value="Keith Parkinson" />
        <link type="boardgameartist" id="13691" value="Robin Raab" />
        <link type="boardgamepublisher" id="858" value="Grow Jogos e Brinquedos" />
        <link type="boardgamepublisher" id="16" value="TSR" />
        <statistics page="1">
            <ratings >
                <usersrated value="194" />
                <average value="6.17371" />
                <bayesaverage value="5.58672" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="6086" bayesaverage="5.58672" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="715" bayesaverage="5.62688" />
                </ranks>
                <stddev value="1.64773" />
                <median value="0" />
                <owned value="637" />
                <trading value="57" />
                <wanting value="16" />
                <wishing value="57" />
                <numcomments value="89" />
                <numweights value="14" />
                <averageweight value="2.6429" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="2773">
        <thumbnail>https://cf.geekdo-images.com/images/pic178935_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic178935.jpg</image>
        <name type="primary" sortindex="1" value="Knights of the Dinner Table: HACK!" />
        <description>This game consists of four unique character decks and 1 game master deck.  It can be played with just two character decks or 1 to 4 character decks and a game master deck.  The goal for the characters is to escape from the Tomb of Vectra.  The game master's goal is to kill the characters.  Each deck has a number of rooms, items, monsters, npcs, traps and rule changes.  Characters generally try to foil each other's escape.&amp;#10;&amp;#10;The game is somewhat similar to Abduction, another great game by Eden Studios, but definitely also very different.&amp;#10;&amp;#10;</description>
        <yearpublished value="2001" />
        <minplayers value="2" />
        <maxplayers value="5" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="3">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="2" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="2" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="2" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="3" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="5+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="2" />
            </results>
        </poll>
        <playingtime value="30" />
        <minplaytime value="30" />
        <maxplaytime value="30" />
        <minage value="10" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="2">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="1" />
                <result value="10" numvotes="1" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="2">
            <results>
                <result level="6" value="No necessary in-game text" numvotes="0" />
                <result level="7" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="8" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="2" />
                <result level="9" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="10" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1002" value="Card Game" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamecategory" id="1035" value="Medieval" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamemechanic" id="2002" value="Tile Placement" />
        <link type="boardgamedesigner" id="6038" value="Matthew Colville" />
        <link type="boardgameartist" id="403" value="Dan Smith" />
        <link type="boardgameartist" id="619" value="George Vasilakos" />
        <link type="boardgameartist" id="20646" value="Manny Vega" />
        <link type="boardgamepublisher" id="323" value="Eden Studios" />
        <link type="boardgamepublisher" id="169" value="Kenzer and Company" />
        <statistics page="1">
            <ratings >
                <usersrated value="254" />
                <average value="5.95528" />
                <bayesaverage value="5.586" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="6115" bayesaverage="5.586" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="691" bayesaverage="5.64392" />
                </ranks>
                <stddev value="1.45553" />
                <median value="0" />
                <owned value="645" />
                <trading value="56" />
                <wanting value="17" />
                <wishing value="27" />
                <numcomments value="124" />
                <numweights value="19" />
                <averageweight value="1.7895" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="3794">
        <thumbnail>https://cf.geekdo-images.com/images/pic66417_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic66417.jpg</image>
        <name type="primary" sortindex="1" value="Legend of Zagor" />
        <name type="alternate" sortindex="4" value="La Légende de Zagor" />
        <name type="alternate" sortindex="5" value="Die Legende des Sagor" />
        <name type="alternate" sortindex="4" value="De Legende van Zagore" />
        <name type="alternate" sortindex="4" value="La leyenda de Zagore" />
        <name type="alternate" sortindex="1" value="Ο Θρύλος του Ζαγκόρ" />
        <description>Odd game based on the RPG-like mechanics of the Fighting Fantasy books, with the exploration and dungeon crawling of TSR's Dungeon.&amp;#10;&amp;#10;The game has superb plastic miniatures and board, and an electronic voice and game moderator similar to MB's The Omega Virus. This game, however, was only produced in Europe. The game was not much of a success, in large part because it came out a bit late to benefit from the hype of the Heroquest phenomenon.&amp;#10;&amp;#10;Three-level Dungeon: The Chambers of Death, The Hall of Fear &amp;amp; The Crypt of Zagor. &amp;#10;Plus:&amp;#10;1 Undead Warlock Zagor figure&amp;#10;1 Merchant Shop Keeper with cat figure&amp;#10;1 Third level monster - Flame Dragon&amp;#10;4 Hero figures: Anvar the Barbarian, Stubble the Dwarf, Braxus the Warrior, Sallazar the Wizard&amp;#10;4 Character sheets, Barbarian; Wizard; Warrior; Dwarf&amp;#10;9 First level monsters: 2 Goblins 2 Orcs, 2 Zombies 3 Skeletons&amp;#10;6 Second level monsters: 1 Troll, 2 Ogres, 2 Chaos Champions, 1 Hellhorn&amp;#10;2 Bridges&amp;#10;The Portal of Doom&amp;#10;Skull Hall&amp;#10;34 Gold coins&amp;#10;46 Corridor tiles&amp;#10;16 Room tiles&amp;#10;55 Spell cards&amp;#10;24 Treasure chest cards&amp;#10;10-sided die&amp;#10;85 Equipment tiles&amp;#10;4 Stamina tokens&amp;#10;4 Strength tokens&amp;#10;4 Monster Strength tokens&amp;#10;4 Monster Stamina tokens&amp;#10;4 Hireling tokens&amp;#10;4 Sword tokens&amp;#10;4 Chainmail tokens&amp;#10;4 Shield tokens&amp;#10;4 Helmet tokens&amp;#10;4 Axe tokens&amp;#10;4 Magic ring tokens&amp;#10;4 Elven boots tokens&amp;#10;12 Healing potions tokens&amp;#10;10 Torch tokens&amp;#10;11 Magic arrow tokens&amp;#10;4 Mule Tokens&amp;#10;&amp;#10;</description>
        <yearpublished value="1993" />
        <minplayers value="1" />
        <maxplayers value="4" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="4">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="2" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="3" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="3" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="2" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="1" />
            </results>
        </poll>
        <playingtime value="60" />
        <minplaytime value="60" />
        <maxplaytime value="60" />
        <minage value="0" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="1">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="1" />
                <result value="10" numvotes="0" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="2">
            <results>
                <result level="1" value="No necessary in-game text" numvotes="0" />
                <result level="2" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="3" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="1" />
                <result level="4" value="Extensive use of text - massive conversion needed to be playable" numvotes="1" />
                <result level="5" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1072" value="Electronic" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1047" value="Miniatures" />
        <link type="boardgamefamily" id="5607" value="3D Games" />
        <link type="boardgamedesigner" id="33" value="Ian Livingstone" />
        <link type="boardgameartist" id="33" value="Ian Livingstone" />
        <link type="boardgameartist" id="1657" value="Martin McKenna" />
        <link type="boardgamepublisher" id="28" value="Parker Brothers" />
        <statistics page="1">
            <ratings >
                <usersrated value="152" />
                <average value="5.9898" />
                <bayesaverage value="5.55149" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="7767" bayesaverage="5.55149" />
                </ranks>
                <stddev value="1.72973" />
                <median value="0" />
                <owned value="285" />
                <trading value="6" />
                <wanting value="36" />
                <wishing value="78" />
                <numcomments value="58" />
                <numweights value="10" />
                <averageweight value="1.7" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="1136">
        <thumbnail>https://cf.geekdo-images.com/images/pic240638_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic240638.jpg</image>
        <name type="primary" sortindex="1" value="Domain: The Warlock&#039;s Challenge" />
        <name type="alternate" sortindex="1" value="Domain: Die Herausforderung" />
        <description>Domain is very similar in nature to Dungeonquest from Games Workshop.  Players start in opposite corners of the board and create a dungeon as they move along by placing randomly chosen tiles.  The goal of the game is to reach the Treasure Chamber in the center of the board and escape back out again with some of the valuable artifacts contained therein.  There are two ways the game can end.  One way is that once someone escapes the dungeon with one of the Warlock's artifacts, they are declared the winner.  The other way is that the players set a time limit.  Once time is up, the game is over and players compare the value of the items they have accrued.  The one with the highest ranked artifact is declared the winner.  If no one has an artifact, then the player with the total highest value in items is the winner.&amp;#10;&amp;#10;Players compete mainly against the board, though player-to-player conflict can happen in two rare instances.  Players earn experience points for defeating denizens of the dungeon and laying tiles in their own quadrant, and this in turn improves their combat speed.  The game components and rules are written in both English and German.&amp;#10;&amp;#10;</description>
        <yearpublished value="1991" />
        <minplayers value="1" />
        <maxplayers value="4" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="1">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="1" />
            </results>
        </poll>
        <playingtime value="120" />
        <minplaytime value="120" />
        <maxplaytime value="120" />
        <minage value="12" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="0">
	</poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="1">
            <results>
                <result level="6" value="No necessary in-game text" numvotes="1" />
                <result level="7" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="8" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="9" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="10" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamemechanic" id="2002" value="Tile Placement" />
        <link type="boardgamedesigner" id="465" value="Edward Beck" />
        <link type="boardgameartist" id="13109" value="Angus McBride" />
        <link type="boardgamepublisher" id="257" value="Hobby Products GmbH" />
        <statistics page="1">
            <ratings >
                <usersrated value="74" />
                <average value="5.40676" />
                <bayesaverage value="5.49006" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="11866" bayesaverage="5.49006" />
                </ranks>
                <stddev value="1.45782" />
                <median value="0" />
                <owned value="217" />
                <trading value="18" />
                <wanting value="12" />
                <wishing value="20" />
                <numcomments value="31" />
                <numweights value="10" />
                <averageweight value="2.2" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="5199">
        <thumbnail>https://cf.geekdo-images.com/images/pic175092_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic175092.jpg</image>
        <name type="primary" sortindex="5" value="The Lords of Underearth" />
        <description>Microgame #18 in the Metagaming Microgames series.&amp;#10;&amp;#10;From the box:&amp;#10;&amp;#10;Underearth is the ancient stronghold of the Dwarven Lords.  This game covers the earthy realms' full history: from the height of Dwarven power to its decline in the days of dragonfire and destruction.  Here, you will lead bands of Humans, Dwarves, Orcs and monsters on raids, wars and treasure hunts.&amp;#10;&amp;#10;'The Lords of Undereath is a two player game of fantasy tactical combat in an underground labyrinth.  The rules cover solitaire play, surprise attack, pursuit, morale, locked doors, sentries, flight, treasure, mercenaries and even uncontrolled movement.  This game is a complete simulation of fantasy combat at the group (skirmish) level.&amp;#10;&amp;#10;Lords of Underearth definitely pays off on its promises and then some.  It's easy to learn.  It plays fast.  The board is geomorphic which helps replayability.  Solitaire play actually works.  Four clever scenarios are presented, all of them are fun, like the one that sure reminds us of Smaug and the Lonely Mountain or another that is suspiciously similar to the battle at the Bridge at Khazad-d&amp;ucirc;m. It's also compatible with Wizard &amp;amp; Melee and The Fantasy Trip, although you'd never want to play it that way.&amp;#10;&amp;#10;This game republished in supplement of Japanese TACTICS magazine #54.&amp;#10;&amp;#10;</description>
        <yearpublished value="1981" />
        <minplayers value="1" />
        <maxplayers value="3" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="0">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
        </poll>
        <playingtime value="60" />
        <minplaytime value="60" />
        <maxplaytime value="60" />
        <minage value="12" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="0">
	</poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="0">
	</poll>
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1019" value="Wargame" />
        <link type="boardgamemechanic" id="2026" value="Hex-and-Counter" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamefamily" id="5204" value="The Fantasy Trip" />
        <link type="boardgamefamily" id="6256" value="Metagaming Microgames series" />
        <link type="boardgamedesigner" id="1312" value="Keith Gross" />
        <link type="boardgameartist" id="19885" value="Trace Hallowell" />
        <link type="boardgameartist" id="19809" value="Pat Hidy" />
        <link type="boardgameartist" id="13114" value="Denis Loubet" />
        <link type="boardgameartist" id="19796" value="Norman Royal" />
        <link type="boardgamepublisher" id="1391" value="Hobby Japan" />
        <link type="boardgamepublisher" id="356" value="Metagaming" />
        <statistics page="1">
            <ratings >
                <usersrated value="57" />
                <average value="6.05789" />
                <bayesaverage value="5.52266" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="9727" bayesaverage="5.52266" />
                    <rank type="family" id="4664" name="wargames" friendlyname="War Game Rank" value="2145" bayesaverage="5.58657" />
                </ranks>
                <stddev value="1.5912" />
                <median value="0" />
                <owned value="234" />
                <trading value="5" />
                <wanting value="23" />
                <wishing value="39" />
                <numcomments value="38" />
                <numweights value="8" />
                <averageweight value="2.25" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="1351">
        <thumbnail>https://cf.geekdo-images.com/images/pic49107_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic49107.jpg</image>
        <name type="primary" sortindex="1" value="Legend of Heroes" />
        <description>From the back of the box -&amp;#10;&amp;#10;In a far land there is a Legend, as old as time itself.&amp;#10;The Legend tells of a green mountain...of an ancient dungeon labyrinth buried deep beneath it...and of the priceless treasures to be found there. It also tells of the fearsome monsters and deadly traps which await all who seek those riches, and how only the boldest and most resourceful of Heroes can ever hope to enter the dungeon...and return alive!&amp;#10;&amp;#10;In the Starter Game, players take the parts of heroic warriors venturing alone into the labyrinth in search of fame and wealth. Great are the rewards, but great also are the dangers to be face along the way. In the Expanded Game, the warriors are joined by other heroic adventurers - magic-users, rogues, clerics and dwarves - as each player now pits a group of Heroes against the perils of the dungeon. Though each Hero brings his own special powers and there is strength to be gained in numbers, the dangers now are even more deadly!&amp;rdquo;&amp;#10;&amp;#10;</description>
        <yearpublished value="1987" />
        <minplayers value="1" />
        <maxplayers value="5" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="0">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="5+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
        </poll>
        <playingtime value="0" />
        <minplaytime value="0" />
        <maxplaytime value="0" />
        <minage value="8" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="0">
	</poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="0">
            <results>
                <result level="66" value="No necessary in-game text" numvotes="0" />
                <result level="67" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="68" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="69" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="70" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamefamily" id="22783" value="Admin: Better Description Needed!" />
        <link type="boardgamedesigner" id="13093" value="Graeme Morris" />
        <link type="boardgameartist" id="41481" value="Brian Gough" />
        <link type="boardgameartist" id="41482" value="Pete Young" />
        <link type="boardgamepublisher" id="16" value="TSR" />
        <statistics page="1">
            <ratings >
                <usersrated value="41" />
                <average value="5.64634" />
                <bayesaverage value="5.5031" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="11094" bayesaverage="5.5031" />
                </ranks>
                <stddev value="1.44088" />
                <median value="0" />
                <owned value="131" />
                <trading value="13" />
                <wanting value="12" />
                <wishing value="22" />
                <numcomments value="12" />
                <numweights value="5" />
                <averageweight value="1.4" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="14077">
        <thumbnail>https://cf.geekdo-images.com/images/pic63526_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic63526.jpg</image>
        <name type="primary" sortindex="1" value="Nin-Gonost" />
        <description>A dungeon-crawl adventure game that uses specialized colored dice for easy action resolution, and a magnetic modular board (like a magnetic Advanced Heroquest) to create the map, complete with doors that open.  Adiken Miniatures are included, with stats on character cards.  Basic rules allow for &amp;quot;family&amp;quot; play, while advanced rules allow for more &amp;quot;gamer&amp;quot; style play.  Soloable.&amp;#10;&amp;#10;Expanded by:&amp;#10;&amp;#10;    Nin-Gonost Campaign Book&amp;#10;&amp;#10;&amp;#10;&amp;#10;&amp;#10;</description>
        <yearpublished value="2004" />
        <minplayers value="1" />
        <maxplayers value="2" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="1">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
        </poll>
        <playingtime value="45" />
        <minplaytime value="45" />
        <maxplaytime value="45" />
        <minage value="12" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="1">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="1" />
                <result value="10" numvotes="0" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="1">
            <results>
                <result level="71" value="No necessary in-game text" numvotes="0" />
                <result level="72" value="Some necessary text - easily memorized or small crib sheet" numvotes="1" />
                <result level="73" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="74" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="75" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamecategory" id="1047" value="Miniatures" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="5607" value="3D Games" />
        <link type="boardgameexpansion" id="18382" value="Nin-Gonost Campaign Book" />
        <link type="boardgamedesigner" id="5504" value="Arnaud Borne" />
        <link type="boardgamedesigner" id="5503" value="Paul A. DeStefano" />
        <link type="boardgamedesigner" id="5502" value="Alain Henner" />
        <link type="boardgamepublisher" id="14310" value="Fantastic Forges, Inc" />
        <statistics page="1">
            <ratings >
                <usersrated value="31" />
                <average value="6.62903" />
                <bayesaverage value="5.52765" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="9315" bayesaverage="5.52765" />
                </ranks>
                <stddev value="1.89638" />
                <median value="0" />
                <owned value="67" />
                <trading value="10" />
                <wanting value="52" />
                <wishing value="107" />
                <numcomments value="41" />
                <numweights value="7" />
                <averageweight value="3.1429" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="17720">
        <thumbnail>https://cf.geekdo-images.com/images/pic76888_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic76888.jpg</image>
        <name type="primary" sortindex="1" value="Dungeon Bash" />
        <description>Dungeon Bash attempts to convert the well known D20 roleplaying system to a board game. It relies in part on the published rules from the D20 SRD (which are the free-to-use RPG rules from Wizards of the Coast).&amp;#10;&amp;#10;In essence it's a dungeon crawl game like Warhammer Quest using tables to generate the dungeon and events. It can be played with or without a game master. For game master-less play it offers reaction charts to control how opponents handle themselves.&amp;#10;&amp;#10;There are instructions on how to customize the game to use elements from other games, like the board tiles from Warhammer Quest.&amp;#10;&amp;#10;Tagline:&amp;#10;&amp;quot;Your favorite Roleplaying game just became your favorite board game too!&amp;quot;&amp;#10;&amp;#10;Home Page:&amp;#10;&amp;#10;</description>
        <yearpublished value="2005" />
        <minplayers value="1" />
        <maxplayers value="6" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="5">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="4" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="3" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="3" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="3" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="3" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="6">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="2" />
            </results>
            <results numplayers="6+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="2" />
            </results>
        </poll>
        <playingtime value="120" />
        <minplaytime value="120" />
        <maxplaytime value="120" />
        <minage value="12" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="2">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="0" />
                <result value="10" numvotes="0" />
                <result value="12" numvotes="2" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="2">
            <results>
                <result level="76" value="No necessary in-game text" numvotes="0" />
                <result level="77" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="78" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="79" value="Extensive use of text - massive conversion needed to be playable" numvotes="2" />
                <result level="80" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamecategory" id="1120" value="Print &amp; Play" />
        <link type="boardgamemechanic" id="2023" value="Co-operative Play" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamedesigner" id="5278" value="Rene Ganser" />
        <link type="boardgamedesigner" id="5277" value="Stefan Pietraszak" />
        <link type="boardgamedesigner" id="5279" value="Alex Schönbohm" />
        <link type="boardgamepublisher" id="1001" value="(Web published)" />
        <link type="boardgamepublisher" id="3977" value="TheOtherGameCompany" />
        <statistics page="1">
            <ratings >
                <usersrated value="20" />
                <average value="6.825" />
                <bayesaverage value="0" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="Not Ranked" bayesaverage="Not Ranked" />
                </ranks>
                <stddev value="1.59119" />
                <median value="0" />
                <owned value="57" />
                <trading value="3" />
                <wanting value="12" />
                <wishing value="67" />
                <numcomments value="17" />
                <numweights value="4" />
                <averageweight value="3.5" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="25632">
        <thumbnail>https://cf.geekdo-images.com/images/pic148242_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic148242.jpg</image>
        <name type="primary" sortindex="1" value="Legends of the Ancient World: The Sewers of Redpoint" />
        <description>The Sewers of Redpoint is a programmed adventure using Dark City Games Legends of the Ancient World rule set. These rules provide gameplay very similar to that of Melee and Wizard from Metagaming. This adventure is compatible with those games as well.&amp;#10;&amp;#10;Battles are fought with counters on a hex map that is included with the game.&amp;#10;&amp;#10;From the Publisher: &amp;quot;When assassins stage a brutal raid at the Temple of the Sun Goddess, you answer the call for assistance.  But as you track the raiders through the sewers beneath the city, an ancient horror wakens from its timeless sleep.&amp;quot;&amp;#10;&amp;#10;</description>
        <yearpublished value="2006" />
        <minplayers value="1" />
        <maxplayers value="4" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="0">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
        </poll>
        <playingtime value="0" />
        <minplaytime value="0" />
        <maxplaytime value="0" />
        <minage value="12" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="0">
	</poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="0">
	</poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamecategory" id="1019" value="Wargame" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2026" value="Hex-and-Counter" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamefamily" id="6462" value="Legends of the Ancient World" />
        <link type="boardgamedesigner" id="7698" value="Bret Winters" />
        <link type="boardgameartist" id="15316" value="Nicole Cardiff" />
        <link type="boardgameartist" id="18322" value="Dario Corallo" />
        <link type="boardgameartist" id="7696" value="George Dew" />
        <link type="boardgameartist" id="37672" value="Robert Reese" />
        <link type="boardgamepublisher" id="5841" value="Dark City Games, Inc." />
        <statistics page="1">
            <ratings >
                <usersrated value="8" />
                <average value="6.6875" />
                <bayesaverage value="0" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="Not Ranked" bayesaverage="Not Ranked" />
                </ranks>
                <stddev value="1.24844" />
                <median value="0" />
                <owned value="30" />
                <trading value="1" />
                <wanting value="6" />
                <wishing value="9" />
                <numcomments value="3" />
                <numweights value="1" />
                <averageweight value="2" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="42415">
        <thumbnail>https://cf.geekdo-images.com/images/pic477138_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic477138.jpg</image>
        <name type="primary" sortindex="1" value="Dungeon Crawl" />
        <name type="alternate" sortindex="1" value="Dungeon Crawl Game System" />
        <description>In Dungeon Crawl, players take the role of a brave Hero or evil Dungeon Lord in this dungeon crawler adventure game.&amp;#10;&amp;#10;In Dungeon Crawl's included campaign, the Heroes find a link to a huge, trans-dimensional infernal dungeon that is spreading throughout the underworld of Old Earth.  It is upon the Heroes to explore the dungeons, fight back waves of Monsters and assault Monster encampments.&amp;#10;&amp;#10;Dungeon Crawl features a vast, flexible game system with many different play modes.  Play through the 35 Adventure Campaign with the Dungeon Lord, who fields and plays as the Monsters during the Campaign.  Pit your Heroes against your friends' own characters in the Deathblow Arena.  Play solo or with friends in randomly generated dungeons that don't require a game master, and fight mighty and cruel bosses that will test the Heroes like no other Monster has.&amp;#10;&amp;#10;Combat, the bread and butter of any dungeon crawler, is quick and simple, requiring only two rolls (attack and defense) to figure out if the player has hit, and how much damage he caused.  Gameplay is streamlined for quick play, so you don't have to sit around for hours on end on a single scenario.  Each player can take their turn in just seconds, so you don't have to constantly wait for minutes for someone to make up their minds.&amp;#10;&amp;#10;Players advance in levels to learn Skills, chosen from a list based on the Hero's Race and Class.  Try different Race and Class combinations for interesting skill sets!  Heroes can join Guilds to earn benefits, and must face trials to advance in Guild rank.&amp;#10;&amp;#10;Dungeons are built from 20 available dungeon tiles, each complete with rooms and corridors.  In the dungeons the players will search for treasures in all sorts of different furniture, and fight over 50 different monsters.  Roll on charts or use the included cards to search for treasure or lay out the dungeons.&amp;#10;&amp;#10;Customize your games with a slew of optional rules.  Don't like the Heroes walking around with 50,000 gold in their pockets?  Bring in the Load rules.  Decided that traveling five weeks to another city shouldn't be a cakewalk?  Invoke the Travel rules to add some peril to their journey.&amp;#10;&amp;#10;Think your gaming group might not be up to more advanced modes of play?  Dungeon Crawl comes with Dungeon Crawl Basic, an even lighter-rules version of Dungeon Crawl, designed to get new players acquainted with the game.&amp;#10;&amp;#10;Dungeon Crawl is a Print-and-Play game, and it comes with several print options, to make your game as pretty or as economical as you'd like.&amp;#10;&amp;#10;</description>
        <yearpublished value="0" />
        <minplayers value="1" />
        <maxplayers value="5" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="0">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="5+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
        </poll>
        <playingtime value="120" />
        <minplaytime value="120" />
        <maxplaytime value="120" />
        <minage value="10" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="0">
	</poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="0">
            <results>
                <result level="81" value="No necessary in-game text" numvotes="0" />
                <result level="82" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="83" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="84" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="85" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamecategory" id="1079" value="Humor" />
        <link type="boardgamecategory" id="1035" value="Medieval" />
        <link type="boardgamecategory" id="1047" value="Miniatures" />
        <link type="boardgamecategory" id="1120" value="Print &amp; Play" />
        <link type="boardgamemechanic" id="2023" value="Co-operative Play" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamemechanic" id="2079" value="Variable Phase Order" />
        <link type="boardgamedesigner" id="12577" value="Alex Bermudez" />
        <link type="boardgameartist" id="12577" value="Alex Bermudez" />
        <link type="boardgamepublisher" id="4" value="(Self-Published)" />
        <statistics page="1">
            <ratings >
                <usersrated value="21" />
                <average value="7.57143" />
                <bayesaverage value="0" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="Not Ranked" bayesaverage="Not Ranked" />
                </ranks>
                <stddev value="2.12852" />
                <median value="0" />
                <owned value="48" />
                <trading value="1" />
                <wanting value="10" />
                <wishing value="77" />
                <numcomments value="16" />
                <numweights value="0" />
                <averageweight value="0" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="174430">
        <thumbnail>https://cf.geekdo-images.com/images/pic2437871_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic2437871.jpg</image>
        <name type="primary" sortindex="1" value="Gloomhaven" />
        <name type="alternate" sortindex="1" value="黯淡港灣" />
        <description>Gloomhaven is a game of Euro-inspired tactical combat in a persistent world of shifting motives. Players will take on the role of a wandering adventurer with their own special set of skills and their own reasons for travelling to this dark corner of the world. Players must work together out of necessity to clear out menacing dungeons and forgotten ruins. In the process they will enhance their abilities with experience and loot, discover new locations to explore and plunder, and expand an ever-branching story fueled by the decisions they make.&amp;#10;&amp;#10;This is a game with a persistent and changing world that is ideally played over many game sessions. After a scenario, players will make decisions on what to do, which will determine how the story continues, kind of like a &amp;ldquo;Choose Your Own Adventure&amp;rdquo; book. Playing through a scenario is a cooperative affair where players will fight against automated monsters using an innovative card system to determine the order of play and what a player does on their turn.&amp;#10;&amp;#10;Each turn a player chooses two cards to play out of their hand. The number on the top card determines their initiative for the round. Each card also has a top and bottom power, and when it is a player&amp;rsquo;s turn in the initiative order, they determine whether to use the top power of one card and the bottom power of the other, or vice-versa. Players must be careful, though, because over time they will permanently lose cards from their hands. If they take too long to clear a dungeon, they may end up exhausted and be forced to retreat.&amp;#10;&amp;#10;</description>
        <yearpublished value="2017" />
        <minplayers value="1" />
        <maxplayers value="4" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="152">
            <results numplayers="1">
                <result value="Best" numvotes="24" />
                <result value="Recommended" numvotes="66" />
                <result value="Not Recommended" numvotes="24" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="36" />
                <result value="Recommended" numvotes="90" />
                <result value="Not Recommended" numvotes="5" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="74" />
                <result value="Recommended" numvotes="58" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="62" />
                <result value="Recommended" numvotes="57" />
                <result value="Not Recommended" numvotes="5" />
            </results>
            <results numplayers="4+">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="4" />
                <result value="Not Recommended" numvotes="70" />
            </results>
        </poll>
        <playingtime value="150" />
        <minplaytime value="90" />
        <maxplaytime value="150" />
        <minage value="12" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="49">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="1" />
                <result value="10" numvotes="8" />
                <result value="12" numvotes="12" />
                <result value="14" numvotes="21" />
                <result value="16" numvotes="5" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="2" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="11">
            <results>
                <result level="21" value="No necessary in-game text" numvotes="0" />
                <result level="22" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="23" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="1" />
                <result level="24" value="Extensive use of text - massive conversion needed to be playable" numvotes="9" />
                <result level="25" value="Unplayable in another language" numvotes="1" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1021" value="Economic" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamecategory" id="1047" value="Miniatures" />
        <link type="boardgamemechanic" id="2689" value="Action / Movement Programming" />
        <link type="boardgamemechanic" id="2018" value="Campaign / Battle Card Driven" />
        <link type="boardgamemechanic" id="2023" value="Co-operative Play" />
        <link type="boardgamemechanic" id="2676" value="Grid Movement" />
        <link type="boardgamemechanic" id="2040" value="Hand Management" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamemechanic" id="2020" value="Simultaneous Action Selection" />
        <link type="boardgamemechanic" id="2027" value="Storytelling" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="24281" value="Campaign Games" />
        <link type="boardgamefamily" id="8374" value="Crowdfunding: Kickstarter" />
        <link type="boardgamefamily" id="25404" value="Legacy" />
        <link type="boardgamefamily" id="5666" value="Solitaire Games" />
        <link type="boardgameexpansion" id="226868" value="Gloomhaven: Solo Scenarios" />
        <link type="boardgamedesigner" id="69802" value="Isaac Childres" />
        <link type="boardgameartist" id="77084" value="Alexandr Elichev" />
        <link type="boardgameartist" id="78961" value="Josh T. McDowell" />
        <link type="boardgameartist" id="84269" value="Alvaro Nebot" />
        <link type="boardgamepublisher" id="27425" value="Cephalofair Games" />
        <statistics page="1">
            <ratings >
                <usersrated value="4313" />
                <average value="9.05228" />
                <bayesaverage value="8.15978" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="4" bayesaverage="8.15978" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="2" bayesaverage="8.44156" />
                    <rank type="family" id="5497" name="strategygames" friendlyname="Strategy Game Rank" value="3" bayesaverage="8.27318" />
                </ranks>
                <stddev value="1.69291" />
                <median value="0" />
                <owned value="6562" />
                <trading value="29" />
                <wanting value="828" />
                <wishing value="5283" />
                <numcomments value="1411" />
                <numweights value="276" />
                <averageweight value="3.7319" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="126340">
        <thumbnail>https://cf.geekdo-images.com/images/pic1738206_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic1738206.jpg</image>
        <name type="primary" sortindex="1" value="Baldrick&#039;s Tomb" />
        <name type="alternate" sortindex="1" value="Baldrich&#039;s Tomb" />
        <description>Baldrick's Tomb is a roguelike board game for 2-4 players. The game takes place in a four-story, underground tomb that is constantly being churned from the inside out by the late sorcerer Baldrick. The locations of everything &amp;ndash; including treasures, traps, monsters, and even the exits &amp;ndash; are completely randomized for every game as a result of Baldrick smashing the crypt to bits. The players are tasked with making their way down to the bottom of this tomb, collecting a precious treasure, then climbing back out.&amp;#10;&amp;#10;But this is really only a means to an end. The real reason for a group of treasure hunters to explore a dangerous tomb is so that they can (hopefully) acquire heaps of treasure. Players will use their wit, push their luck, and call upon powerful scrolls to help themselves and hinder others, all in the pursuit of treasure points. The player who makes it out of the tomb with the most points wins.&amp;#10;&amp;#10;</description>
        <yearpublished value="2012" />
        <minplayers value="1" />
        <maxplayers value="4" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="3">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="3" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="2" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="2" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="2" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
        </poll>
        <playingtime value="30" />
        <minplaytime value="30" />
        <maxplaytime value="30" />
        <minage value="8" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="1">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="1" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="0" />
                <result value="10" numvotes="0" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="0">
            <results>
                <result level="1" value="No necessary in-game text" numvotes="0" />
                <result level="2" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="3" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="4" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="5" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2661" value="Press Your Luck" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamefamily" id="8374" value="Crowdfunding: Kickstarter" />
        <link type="boardgameexpansion" id="146254" value="Baldrick's Tomb: Open for Business" />
        <link type="boardgamedesigner" id="61284" value="Ben Haskett" />
        <link type="boardgameartist" id="59980" value="Derek Bacon" />
        <link type="boardgameartist" id="58803" value="Erin Fusco" />
        <link type="boardgameartist" id="61294" value="Kevin Harris (I)" />
        <link type="boardgameartist" id="61284" value="Ben Haskett" />
        <link type="boardgameartist" id="63174" value="Mark Major" />
        <link type="boardgamepublisher" id="17874" value="5th Street Games" />
        <link type="boardgamepublisher" id="2456" value="The Game Crafter, LLC" />
        <statistics page="1">
            <ratings >
                <usersrated value="100" />
                <average value="6.376" />
                <bayesaverage value="5.57603" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="6519" bayesaverage="5.57603" />
                </ranks>
                <stddev value="1.22614" />
                <median value="0" />
                <owned value="293" />
                <trading value="24" />
                <wanting value="5" />
                <wishing value="38" />
                <numcomments value="49" />
                <numweights value="9" />
                <averageweight value="1.4444" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="53953">
        <thumbnail>https://cf.geekdo-images.com/images/pic544780_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic544780.jpg</image>
        <name type="primary" sortindex="1" value="Thunderstone" />
        <name type="alternate" sortindex="1" value="Kamień Gromu" />
        <name type="alternate" sortindex="1" value="Громовой камень" />
        <name type="alternate" sortindex="1" value="サンダーストーン" />
        <name type="alternate" sortindex="1" value="雷霆之石" />
        <description>For ages the vile Doom Knights have sought to gather the remaining Thunderstones to fulfill a prophecy of corruption over the lands. Now the first Thunderstone has been discovered in the Dungeons of Grimhold and the Doom Knights have sent their minions to claim the relic. The Villagers of Barrowsdale gather brave souls to face the dungeon and keep the Thunderstone out of the hands of the Doom Knights.&amp;#10;&amp;#10;Thunderstone is a fantasy deck-building game much in the style of Dominion. Before the game starts a selection of Village and Hero cards will be randomnly chosen that players may add to their specific decks. Like Dominion, every player starts with a basic deck of weaker cards that they can use to purchase other more powerful cards. In Thunderstone these cards may be different Heroes such as mages, archers, thieves, or warriors or they may be supplies the heroes need like weapons, rations, or light to reach further into the dungeon.&amp;#10;&amp;#10;A dungeon deck is also created by combining several different groups of monsters. Certain groups of monsters may be more or less susceptible to different Hero types, so players will have to take this into account when they choose what to buy.&amp;#10;&amp;#10;Rather than buying puny Victory Points, players will use their deck to defeat monsters in the dungeon. From the monster deck a row of cards is laid out. Players may on their turn choose to attack a monster in the deck rather than visit town and buy cards. If they do this they play cards from their hand and resolve their abilities in order to boost strength and have enough light to reach a specific monster. Some monsters also have special abilities which may hinder the player. If they have enough strength they defeat the monster and place that card in their deck. This card is worth victory points and often can be used as money to purchase other cards. In addition to this, players are awarded experience points for defeating monsters which can be used to upgrade their heroes into more powerful versions. The game is played until the Thunderstone is revealed from the dungeon and a player is able to claim it. The player with the most victory points in their deck is the winner.&amp;#10;&amp;#10;The basic Thunderstone framework was updated in the implementation of Thunderstone: Advance.&amp;#10;&amp;#10;Integrates with&amp;#10;&amp;#10;&amp;#10;    Thunderstone Advance: Towers of Ruin&amp;#10;    Thunderstone: Dragonspire&amp;#10;    Thunderstone: Starter Set&amp;#10;&amp;#10;&amp;#10;</description>
        <yearpublished value="2009" />
        <minplayers value="1" />
        <maxplayers value="5" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="157">
            <results numplayers="1">
                <result value="Best" numvotes="14" />
                <result value="Recommended" numvotes="62" />
                <result value="Not Recommended" numvotes="25" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="50" />
                <result value="Recommended" numvotes="65" />
                <result value="Not Recommended" numvotes="10" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="82" />
                <result value="Recommended" numvotes="41" />
                <result value="Not Recommended" numvotes="2" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="27" />
                <result value="Recommended" numvotes="74" />
                <result value="Not Recommended" numvotes="17" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="2" />
                <result value="Recommended" numvotes="30" />
                <result value="Not Recommended" numvotes="66" />
            </results>
            <results numplayers="5+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="69" />
            </results>
        </poll>
        <playingtime value="60" />
        <minplaytime value="60" />
        <maxplaytime value="60" />
        <minage value="12" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="42">
            <results>
                <result value="2" numvotes="1" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="3" />
                <result value="10" numvotes="9" />
                <result value="12" numvotes="24" />
                <result value="14" numvotes="4" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="1" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="51">
            <results>
                <result level="16" value="No necessary in-game text" numvotes="0" />
                <result level="17" value="Some necessary text - easily memorized or small crib sheet" numvotes="6" />
                <result level="18" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="31" />
                <result level="19" value="Extensive use of text - massive conversion needed to be playable" numvotes="14" />
                <result level="20" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1002" value="Card Game" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamemechanic" id="2041" value="Card Drafting" />
        <link type="boardgamemechanic" id="2664" value="Deck / Pool Building" />
        <link type="boardgamemechanic" id="2040" value="Hand Management" />
        <link type="boardgamefamily" id="5666" value="Solitaire Games" />
        <link type="boardgamefamily" id="5321" value="Thunderstone" />
        <link type="boardgameexpansion" id="121007" value="Thunderstone Avatars" />
        <link type="boardgameexpansion" id="81424" value="Thunderstone: Blade Trap Promo" />
        <link type="boardgameexpansion" id="74096" value="Thunderstone: Death Sentinel Promo" />
        <link type="boardgameexpansion" id="70940" value="Thunderstone: Doomgate Legion" />
        <link type="boardgameexpansion" id="73114" value="Thunderstone: For the Dwarf Promo" />
        <link type="boardgameexpansion" id="101864" value="Thunderstone: German Promo Pack Harrulier (Harruli)" />
        <link type="boardgameexpansion" id="104891" value="Thunderstone: Heart of Doom" />
        <link type="boardgameexpansion" id="92091" value="Thunderstone: Promo Pack" />
        <link type="boardgameexpansion" id="100222" value="Thunderstone: Promo Pack #2" />
        <link type="boardgameexpansion" id="188593" value="Thunderstone: Promokarte Wächter der Stärke" />
        <link type="boardgameexpansion" id="93701" value="Thunderstone: Thornwood Siege" />
        <link type="boardgameexpansion" id="119740" value="Thunderstone: Vicious Promo Pack" />
        <link type="boardgameexpansion" id="100766" value="Thunderstone: Vision Promo" />
        <link type="boardgameexpansion" id="104394" value="Thunderstone: Werewolf Promo Pack" />
        <link type="boardgameexpansion" id="63214" value="Thunderstone: Wrath of the Elements" />
        <link type="boardgameintegration" id="85897" value="Thunderstone: Dragonspire" />
        <link type="boardgameimplementation" id="142961" value="Thunderstone Advance: Numenera" />
        <link type="boardgameimplementation" id="116998" value="Thunderstone Advance: Towers of Ruin" />
        <link type="boardgameimplementation" id="215341" value="Thunderstone Quest" />
        <link type="boardgameimplementation" id="140951" value="Thunderstone: Starter Set" />
        <link type="boardgamedesigner" id="615" value="Mike Elliott" />
        <link type="boardgameartist" id="14611" value="Jason Engle" />
        <link type="boardgamepublisher" id="396" value="Alderac Entertainment Group (AEG)" />
        <link type="boardgamepublisher" id="3475" value="Arclight" />
        <link type="boardgamepublisher" id="2973" value="Edge Entertainment" />
        <link type="boardgamepublisher" id="18852" value="Hobby World" />
        <link type="boardgamepublisher" id="39" value="Pegasus Spiele" />
        <link type="boardgamepublisher" id="7466" value="REBEL.pl" />
        <link type="boardgamepublisher" id="3888" value="Stratelibri" />
        <link type="boardgamepublisher" id="8759" value="Wargames Club Publishing" />
        <statistics page="1">
            <ratings >
                <usersrated value="9066" />
                <average value="7.00359" />
                <bayesaverage value="6.83523" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="480" bayesaverage="6.83523" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="133" bayesaverage="6.85861" />
                    <rank type="family" id="5497" name="strategygames" friendlyname="Strategy Game Rank" value="328" bayesaverage="6.84351" />
                </ranks>
                <stddev value="1.44985" />
                <median value="0" />
                <owned value="9585" />
                <trading value="589" />
                <wanting value="213" />
                <wishing value="1481" />
                <numcomments value="2103" />
                <numweights value="604" />
                <averageweight value="2.505" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="29581">
        <thumbnail>https://cf.geekdo-images.com/images/pic295554_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic295554.jpg</image>
        <name type="primary" sortindex="1" value="Tomb" />
        <description>Recruit a Party. Kill the Monsters. Take Their Stuff!&amp;#10;&amp;#10;Tomb pits opponents against one another in a game of monsters, traps, treasures, and spells. Attempts to capture the dungeon crawl experience without hours of preparation. Assemble a crack squad of adventurers and enter the fabled Goldenaxe Catacombs in search of glory and hidden treasure. With Tomb&amp;rsquo;s unique set-up and character recruitment, you&amp;rsquo;ll never play the same game twice.&amp;#10;&amp;#10;Integrates with:&amp;#10;&amp;#10;    Tomb: Cryptmaster&amp;#10;    INVALID OBJECT ID=67350, type=thing&amp;#10;&amp;#10;&amp;#10;&amp;#10;&amp;#10;</description>
        <yearpublished value="2008" />
        <minplayers value="1" />
        <maxplayers value="6" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="47">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="5" />
                <result value="Not Recommended" numvotes="18" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="6" />
                <result value="Recommended" numvotes="23" />
                <result value="Not Recommended" numvotes="3" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="26" />
                <result value="Recommended" numvotes="12" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="16" />
                <result value="Recommended" numvotes="19" />
                <result value="Not Recommended" numvotes="2" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="3" />
                <result value="Recommended" numvotes="8" />
                <result value="Not Recommended" numvotes="17" />
            </results>
            <results numplayers="6">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="3" />
                <result value="Not Recommended" numvotes="25" />
            </results>
            <results numplayers="6+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="19" />
            </results>
        </poll>
        <playingtime value="90" />
        <minplaytime value="90" />
        <maxplaytime value="90" />
        <minage value="12" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="10">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="0" />
                <result value="10" numvotes="2" />
                <result value="12" numvotes="4" />
                <result value="14" numvotes="3" />
                <result value="16" numvotes="1" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="23">
            <results>
                <result level="1" value="No necessary in-game text" numvotes="0" />
                <result level="2" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="3" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="4" value="Extensive use of text - massive conversion needed to be playable" numvotes="20" />
                <result level="5" value="Unplayable in another language" numvotes="3" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamecategory" id="1035" value="Medieval" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamemechanic" id="2016" value="Secret Unit Deployment" />
        <link type="boardgamefamily" id="5666" value="Solitaire Games" />
        <link type="boardgameintegration" id="43320" value="Tomb: Cryptmaster" />
        <link type="boardgamedesigner" id="795" value="John Zinser" />
        <link type="boardgameartist" id="14610" value="Nate Barnes" />
        <link type="boardgameartist" id="14611" value="Jason Engle" />
        <link type="boardgameartist" id="14049" value="Carl Frank" />
        <link type="boardgameartist" id="15648" value="Jonathan Hunt" />
        <link type="boardgameartist" id="19932" value="Rodney Saenz" />
        <link type="boardgameartist" id="14614" value="Chris Seaman" />
        <link type="boardgamepublisher" id="396" value="Alderac Entertainment Group (AEG)" />
        <statistics page="1">
            <ratings >
                <usersrated value="1298" />
                <average value="6.34017" />
                <bayesaverage value="5.96335" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="2128" bayesaverage="5.96335" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="386" bayesaverage="6.09915" />
                </ranks>
                <stddev value="1.54846" />
                <median value="0" />
                <owned value="1579" />
                <trading value="124" />
                <wanting value="103" />
                <wishing value="417" />
                <numcomments value="447" />
                <numweights value="160" />
                <averageweight value="2.6313" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgameexpansion" id="17729">
        <thumbnail>https://cf.geekdo-images.com/images/pic77984_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic77984.jpg</image>
        <name type="primary" sortindex="1" value="Death Test" />
        <name type="alternate" sortindex="1" value="Śmiertelna próba" />
        <description>Death Test was MicroQuest #1 in the Metagaming MicroQuests series, programmed adventures for Melee and Wizard.&amp;#10;&amp;#10;The Death Tests are basic slash-n-grab adventures. There's no plot and no objective other than to get out alive with all the booty you can carry.  This is a good way to get accustomed to the game and to build up characters' statistics.  These games introduced the Thorsz, who re-appears in Orb Quest (MQ #8).&amp;#10;&amp;#10;user comment&amp;#10;this is also in the RPGG database Death Test&amp;#10;&amp;#10;</description>
        <yearpublished value="1978" />
        <minplayers value="1" />
        <maxplayers value="5" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="2">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="2" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="2" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="2" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="2" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="2" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="5+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="1" />
            </results>
        </poll>
        <playingtime value="30" />
        <minplaytime value="30" />
        <maxplaytime value="30" />
        <minage value="10" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="0">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="0" />
                <result value="10" numvotes="0" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="0">
	</poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1042" value="Expansion for Base-game" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamecategory" id="1019" value="Wargame" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2026" value="Hex-and-Counter" />
        <link type="boardgamemechanic" id="2055" value="Paper-and-Pencil" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamefamily" id="5204" value="The Fantasy Trip" />
        <link type="boardgameexpansion" id="3464" value="Melee" inbound="true"/>
        <link type="boardgameexpansion" id="3463" value="Wizard" inbound="true"/>
        <link type="boardgamedesigner" id="22" value="Steve Jackson (I)" />
        <link type="boardgameartist" id="19809" value="Pat Hidy" />
        <link type="boardgamepublisher" id="356" value="Metagaming" />
        <link type="boardgamepublisher" id="3805" value="Sfera" />
        <statistics page="1">
            <ratings >
                <usersrated value="105" />
                <average value="6.54762" />
                <bayesaverage value="5.60026" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="Not Ranked" bayesaverage="5.60026" />
                </ranks>
                <stddev value="1.30085" />
                <median value="0" />
                <owned value="298" />
                <trading value="6" />
                <wanting value="12" />
                <wishing value="11" />
                <numcomments value="43" />
                <numweights value="13" />
                <averageweight value="1.9231" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="43161">
        <thumbnail>https://cf.geekdo-images.com/images/pic824020_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic824020.jpg</image>
        <name type="primary" sortindex="1" value="Epic Adventure Dungeon Crawl" />
        <description>Introduction&amp;#10;If it&amp;rsquo;s adventure and excitement you are looking for, you have come to the right place brave adventurer. The time has come to prove your worth. Are you willing to show us your prowess with the blade, your stealth and cunning or your mastery of the magic arts? Whatever path you choose, adventure awaits.&amp;#10; Dungeon Crawl&amp;trade; is primarily designed as a single player game set in a dungeon environment within a generic fantasy setting. The player chooses a character class to play (thief, fighter or sorcerer), rolls up the character&amp;rsquo;s attributes and places its starting equipment on the adventure sheet. The player then moves the character through the dungeon overcoming monsters, obstacles and traps in an attempt to find the dungeon&amp;rsquo;s random finale card and win the game. This game uses the game system that we created for the EA game books. Each game should take 20 &amp;ndash; 30 minutes to play and because of the random manor of the game, each game should be very different to the previous one.&amp;#10;&amp;#10;&amp;#10;Variations&amp;#10;Several card variations, each with their own unique set of monsters, traps and treasure cards will be available for download soon. These include The Forest adventure add-on pack, Evil swamp add-on pack and The City of Evil add-on pack.&amp;#10; You, the player, create a character and lower yourself into the random dungeon. This game has been designed so that it plays different every time: different maps, monster encounters, traps and finale card.&amp;#10; What is included in this game&amp;#10;The following list of items is included in this basic game set:&amp;#10;&amp;#10;Adventure Sheet&amp;#10;Spell cards&amp;#10;Monster Cards&amp;#10;Trap Cards&amp;#10;Treasure Cards&amp;#10;Corridor Tiles&amp;#10;Door tiles (locked and unlocked doors)&amp;#10;Room Tiles&amp;#10;Finale Cards&amp;#10;&amp;#10;The adventure sheet is where you keep track of your characters possessions and has a quick reference to his/her attributes, skills and character trait.&amp;#10; Spell Cards&amp;#10;Spell cards are used by sorcerers and thieves and can be included with some magical items.&amp;#10;&amp;#10;Monster Cards&amp;#10;Monster is the general term used in the game for enemies. The cards may have such things as: orcs, goblins, trolls and Dragons on them or evil humans, elves and dwarves.&amp;#10;&amp;#10;Trap cards&amp;#10;Traps can be encountered in corridors and rooms&amp;#10;&amp;#10;Treasure Cards&amp;#10;The deck consists of 100 treasure cards. Treasure is a general term for items and equipment that are found within the game.&amp;#10;&amp;#10;Corridor Tiles&amp;#10;Corridor tiles can be empty, populated with monsters, traps and treasure or be special encounter cards.&amp;#10;&amp;#10;Room Tiles&amp;#10;Room tiles can only be entered by a corridor tile with a door.&amp;#10;&amp;#10;Finale Tiles&amp;#10;The deck consists of 6 Finale tiles.&amp;#10;&amp;#10;What do I need to play?&amp;#10;All you need to play this game are 2 six-sided dice, some scrap paper, a pencil and some scissors.&amp;#10;&amp;#10;Where can I play?&amp;#10;This game can be played anywhere:&amp;#10;&amp;#10;At home in any room (a nice amount of table space is recommended)&amp;#10;In the garden (on a nice day)&amp;#10;At a friends house&amp;#10;At school during lunch or break&amp;#10;On an office desk&amp;#10;&amp;#10;Can I play this game alone or with friends?&amp;#10;Epic Adventure Dungeon Crawl is primarily designed as a single player game. However, advanced rules are included so that Dungeon Crawl can also be played with two or three players in deathmatch mode!&amp;#10;&amp;#10;&amp;#10;BLACKTHORN FOREST ADD-ON EXPANSION&amp;#10;&amp;#10;This is the first of the expansions to Dungeon Crawl - BlackThorn Forest. Like all good, classic adventures you start in a tavern (The Laughing Cow) on the edge of the forest.&amp;#10;&amp;#10;New features include special event cards, dungeon entrance and new equipment, monsters and spell cards as well as new finale cards.&amp;#10;&amp;#10;</description>
        <yearpublished value="2009" />
        <minplayers value="1" />
        <maxplayers value="1" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="0">
            <results numplayers="1+">		
				</results>
        </poll>
        <playingtime value="30" />
        <minplaytime value="30" />
        <maxplaytime value="30" />
        <minage value="12" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="0">
	</poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="0">
	</poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1059" value="Maze" />
        <link type="boardgamecategory" id="1120" value="Print &amp; Play" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamefamily" id="5666" value="Solitaire Games" />
        <link type="boardgamedesigner" id="12890" value="Jamie Wallis" />
        <link type="boardgamepublisher" id="9581" value="Greywood Publishing" />
        <statistics page="1">
            <ratings >
                <usersrated value="6" />
                <average value="6.58333" />
                <bayesaverage value="0" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="Not Ranked" bayesaverage="Not Ranked" />
                </ranks>
                <stddev value="1.78924" />
                <median value="0" />
                <owned value="37" />
                <trading value="0" />
                <wanting value="4" />
                <wishing value="28" />
                <numcomments value="9" />
                <numweights value="1" />
                <averageweight value="1" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="148694">
        <thumbnail>https://cf.geekdo-images.com/images/pic1805060_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic1805060.jpg</image>
        <name type="primary" sortindex="1" value="Dungeon of Deadliest Evil" />
        <description>The mad sorcerer Grislyk has stolen the Book of Lore from the elves and hidden it in his dungeon lair. As the elven warrior maiden Kora, you must brave three increasingly dangerous levels to recover the Book, destroy Grislyk&amp;rsquo;s magical Black Crucible, and slay the wizard himself. Magical artifacts will help you evade Grislyk&amp;rsquo;s traps and slay his army of goblins and skeletons, but you will also need your wits and a bit of luck, for knowing when to search, when to fight, and when to run is the only way to survive the DUNGEON OF DEADLIEST EVIL.&amp;#10;&amp;#10;Dungeon of Deadliest Evil is a solitaire adventure game that takes all the essential elements of a classic dungeon crawl, like slaying monsters, finding powerful artifacts, and exploring a multi-level dungeon, and packs them into an easy-to-learn game that sets up and plays in 20 minutes.&amp;#10;&amp;#10;Gameplay is based on a simple dice allocation mechanic. You have three abilities, Speed, Combat, and Defense, and at the start of each turn you must assign one of three dice (a d4, a d6, and a d8) to each of them. While the game involves a good deal of luck and dice-rolling, judicious dice allocation is the key to success. Victory is achieved by destroying the Black Crucible, retrieving the Book of Lore, slaying the evil wizard Grislyk, and finally leaving the dungeon alive.&amp;#10;&amp;#10;</description>
        <yearpublished value="2013" />
        <minplayers value="1" />
        <maxplayers value="1" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="0">
            <results numplayers="1+">		
				</results>
        </poll>
        <playingtime value="20" />
        <minplaytime value="20" />
        <maxplaytime value="20" />
        <minage value="10" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="0">
	</poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="0">
	</poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1120" value="Print &amp; Play" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamefamily" id="19564" value="Solitaire Print and Play Contest" />
        <link type="boardgamedesigner" id="70928" value="Noah Sheola" />
        <link type="boardgameartist" id="70928" value="Noah Sheola" />
        <link type="boardgamepublisher" id="1001" value="(Web published)" />
        <statistics page="1">
            <ratings >
                <usersrated value="2" />
                <average value="6.5" />
                <bayesaverage value="0" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="Not Ranked" bayesaverage="Not Ranked" />
                </ranks>
                <stddev value="0.5" />
                <median value="0" />
                <owned value="11" />
                <trading value="1" />
                <wanting value="0" />
                <wishing value="14" />
                <numcomments value="7" />
                <numweights value="0" />
                <averageweight value="0" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="133038">
        <thumbnail>https://cf.geekdo-images.com/images/pic1775517_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic1775517.jpg</image>
        <name type="primary" sortindex="1" value="Pathfinder Adventure Card Game: Rise of the Runelords – Base Set" />
        <name type="alternate" sortindex="1" value="Pathfinder Abenteuerkartenspiel: Das Erwachen der Runenherrscher – Grundbox" />
        <name type="alternate" sortindex="1" value="Pathfinder Adventure Card Game: Ascesa dei Signori delle Rune – Set Base" />
        <name type="alternate" sortindex="1" value="Pathfinder Adventure Card Game: El Auge de los Señores de la Runas" />
        <name type="alternate" sortindex="1" value="Pathfinder O Jogo de Aventuras: Ascenção dos Mestres Rúnicos – Conjunto Básico" />
        <name type="alternate" sortindex="1" value="Pathfinder, Le Jeu de Cartes: L&#039;Eveil des Seigneurs des runes – Jeu de base" />
        <name type="alternate" sortindex="1" value="Pathfinder. Карточная игра. Возвращение рунных властителей" />
        <description>A forgotten evil stirs in the ancient land of Varisia. Dark magic once more thrums amid crumbling ruins, giants gather in titanic armies, cultists murder in the name of foul deities, and maniacal goblins plot a fiery end for the peaceful town of Sandpoint.&amp;#10;&amp;#10;Launch a campaign to strike back against the evils plaguing Varisia with the Pathfinder Adventure Card Game: Rise of the Runelords - Base Set. This complete cooperative strategy card game pits 1 to 4 heroes against the traps, monsters, deadly magic, and despicable foes of the Pathfinder Roleplaying Game's award-winning Rise of the Runelords Adventure Path. In this game players take the part of a fantasy character such as a rogue or wizard, each with varying skills and proficiencies that are represented by the cards in their deck. The classic ability scores (Strength, Dexterity, etc.) are assigned with different sized dice. Players can acquire allies, spells, weapons, and other items. The goal is to find and defeat a villain before a certain number of turns pass, with the villain being represented by its own deck of cards complete with challenges and foes that must be overcome. Characters grow stronger after each game, adding unique gear and awesome magic to their decks, and gaining incredible powers, all of which they'll need to challenge greater threats in a complete Pathfinder Adventure Card Game Adventure Path.&amp;#10;&amp;#10;The Pathfinder Adventure Card Game is an expandable game, with the first set containing nearly 500 cards. The Rise of the Runelords - Base Set supports 1 to 4 players; a 110-card Character Add-On Deck expands the possible number of players to 5 or 6 and adds more character options for any number of players. The game will be expanded with bimonthly 110-card adventure decks.&amp;#10;&amp;#10;The contents of Pathfinder Adventure Card Game: Rise of the Runelords Base Set is:&amp;#10;&amp;#10;1 rulebook&amp;#10;5 dice&amp;#10;&amp;#10;385 cards:&amp;#10;7 character cards&amp;#10;7 role cards&amp;#10;7 token cards&amp;#10;1 adventure path card&amp;#10;1 adventure card&amp;#10;3 scenario cards&amp;#10;24 location cards&amp;#10;3 villain cards&amp;#10;15 henchmen cards&amp;#10;50 monster cards&amp;#10;20 barrier cards&amp;#10;40 weapon cards&amp;#10;40 spell cards&amp;#10;20 armor cards&amp;#10;40 item cards&amp;#10;35 ally cards&amp;#10;72 blessing cards&amp;#10;&amp;#10;The contents of Adventure Deck 1 &amp;ndash; Burnt Offerings (included in base set) is:&amp;#10;&amp;#10;110 cards:&amp;#10;1 adventure card&amp;#10;5 scenario cards&amp;#10;7 location cards&amp;#10;5 villain cards&amp;#10;18 henchmen cards&amp;#10;18 monster cards&amp;#10;7 barrier cards&amp;#10;10 weapon cards&amp;#10;10 spell cards&amp;#10;4 armor cards&amp;#10;10 item cards&amp;#10;9 ally cards&amp;#10;1 loot card&amp;#10;5 blessing cards&amp;#10;&amp;#10;</description>
        <yearpublished value="2013" />
        <minplayers value="1" />
        <maxplayers value="4" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="221">
            <results numplayers="1">
                <result value="Best" numvotes="51" />
                <result value="Recommended" numvotes="114" />
                <result value="Not Recommended" numvotes="16" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="43" />
                <result value="Recommended" numvotes="118" />
                <result value="Not Recommended" numvotes="3" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="88" />
                <result value="Recommended" numvotes="69" />
                <result value="Not Recommended" numvotes="4" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="94" />
                <result value="Recommended" numvotes="69" />
                <result value="Not Recommended" numvotes="8" />
            </results>
            <results numplayers="4+">
                <result value="Best" numvotes="21" />
                <result value="Recommended" numvotes="57" />
                <result value="Not Recommended" numvotes="60" />
            </results>
        </poll>
        <playingtime value="90" />
        <minplaytime value="90" />
        <maxplaytime value="90" />
        <minage value="13" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="65">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="1" />
                <result value="6" numvotes="1" />
                <result value="8" numvotes="7" />
                <result value="10" numvotes="31" />
                <result value="12" numvotes="18" />
                <result value="14" numvotes="6" />
                <result value="16" numvotes="1" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="82">
            <results>
                <result level="41" value="No necessary in-game text" numvotes="0" />
                <result level="42" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="43" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="8" />
                <result level="44" value="Extensive use of text - massive conversion needed to be playable" numvotes="68" />
                <result level="45" value="Unplayable in another language" numvotes="6" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1002" value="Card Game" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamemechanic" id="2023" value="Co-operative Play" />
        <link type="boardgamemechanic" id="2664" value="Deck / Pool Building" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2040" value="Hand Management" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamefamily" id="24281" value="Campaign Games" />
        <link type="boardgamefamily" id="7757" value="From RPG books to board games" />
        <link type="boardgamefamily" id="23234" value="Pathfinder Adventure Card Game" />
        <link type="boardgamefamily" id="5666" value="Solitaire Games" />
        <link type="boardgameexpansion" id="206316" value="Pathfinder Adventure Card Game: &quot;Goblin Golem of Obsidian&quot; Promo Card" />
        <link type="boardgameexpansion" id="151010" value="Pathfinder Adventure Card Game: Character Mats" />
        <link type="boardgameexpansion" id="217385" value="Pathfinder Adventure Card Game: Class Deck - Summoner" />
        <link type="boardgameexpansion" id="181609" value="Pathfinder Adventure Card Game: Class Deck – Alchemist" />
        <link type="boardgameexpansion" id="178670" value="Pathfinder Adventure Card Game: Class Deck – Barbarian" />
        <link type="boardgameexpansion" id="161435" value="Pathfinder Adventure Card Game: Class Deck – Bard" />
        <link type="boardgameexpansion" id="161437" value="Pathfinder Adventure Card Game: Class Deck – Cleric" />
        <link type="boardgameexpansion" id="178207" value="Pathfinder Adventure Card Game: Class Deck – Druid" />
        <link type="boardgameexpansion" id="161438" value="Pathfinder Adventure Card Game: Class Deck – Fighter" />
        <link type="boardgameexpansion" id="196544" value="Pathfinder Adventure Card Game: Class Deck – Goblins Burn!" />
        <link type="boardgameexpansion" id="193387" value="Pathfinder Adventure Card Game: Class Deck – Goblins Fight!" />
        <link type="boardgameexpansion" id="193386" value="Pathfinder Adventure Card Game: Class Deck – Gunslinger" />
        <link type="boardgameexpansion" id="230989" value="Pathfinder Adventure Card Game: Class Deck – Hunter" />
        <link type="boardgameexpansion" id="184172" value="Pathfinder Adventure Card Game: Class Deck – Inquisitor" />
        <link type="boardgameexpansion" id="230986" value="Pathfinder Adventure Card Game: Class Deck – Magus" />
        <link type="boardgameexpansion" id="176155" value="Pathfinder Adventure Card Game: Class Deck – Monk" />
        <link type="boardgameexpansion" id="180729" value="Pathfinder Adventure Card Game: Class Deck – Oracle" />
        <link type="boardgameexpansion" id="174667" value="Pathfinder Adventure Card Game: Class Deck – Paladin" />
        <link type="boardgameexpansion" id="161439" value="Pathfinder Adventure Card Game: Class Deck – Ranger" />
        <link type="boardgameexpansion" id="161440" value="Pathfinder Adventure Card Game: Class Deck – Rogue" />
        <link type="boardgameexpansion" id="161441" value="Pathfinder Adventure Card Game: Class Deck – Sorcerer" />
        <link type="boardgameexpansion" id="197483" value="Pathfinder Adventure Card Game: Class Deck – Warpriest" />
        <link type="boardgameexpansion" id="193385" value="Pathfinder Adventure Card Game: Class Deck – Witch" />
        <link type="boardgameexpansion" id="161442" value="Pathfinder Adventure Card Game: Class Deck – Wizard" />
        <link type="boardgameexpansion" id="230987" value="Pathfinder Adventure Card Game: Hell's Vengeance Character Deck 1" />
        <link type="boardgameexpansion" id="230988" value="Pathfinder Adventure Card Game: Hell's Vengeance Character Deck 2" />
        <link type="boardgameexpansion" id="230990" value="Pathfinder Adventure Card Game: Occult Adventures Character Deck 1" />
        <link type="boardgameexpansion" id="230991" value="Pathfinder Adventure Card Game: Occult Adventures Character Deck 2" />
        <link type="boardgameexpansion" id="230985" value="Pathfinder Adventure Card Game: Pathfinder Tales Character Deck" />
        <link type="boardgameexpansion" id="150074" value="Pathfinder Adventure Card Game: Rise of the Runelords - Adventure Deck 5 - Sins of the Saviors" />
        <link type="boardgameexpansion" id="150070" value="Pathfinder Adventure Card Game: Rise of the Runelords – &quot;Birdcruncher Crown&quot; Promo Card" />
        <link type="boardgameexpansion" id="149758" value="Pathfinder Adventure Card Game: Rise of the Runelords – &quot;Blessing of Zarongel&quot; Promo Card" />
        <link type="boardgameexpansion" id="149926" value="Pathfinder Adventure Card Game: Rise of the Runelords – &quot;Dance With Squealy Nord&quot; Promo Card" />
        <link type="boardgameexpansion" id="146631" value="Pathfinder Adventure Card Game: Rise of the Runelords – &quot;Fire Sneeze&quot; Promo Card" />
        <link type="boardgameexpansion" id="150072" value="Pathfinder Adventure Card Game: Rise of the Runelords – &quot;Goblin Plate +1&quot; Promo Card" />
        <link type="boardgameexpansion" id="149924" value="Pathfinder Adventure Card Game: Rise of the Runelords – &quot;Grindylow&quot; Promo Card" />
        <link type="boardgameexpansion" id="149925" value="Pathfinder Adventure Card Game: Rise of the Runelords – &quot;Horsechopper +1&quot; Promo Card" />
        <link type="boardgameexpansion" id="146632" value="Pathfinder Adventure Card Game: Rise of the Runelords – &quot;Poog of Zarongel&quot; Promo Card" />
        <link type="boardgameexpansion" id="202139" value="Pathfinder Adventure Card Game: Rise of the Runelords – &quot;Tup&quot; Promo Character Card Set" />
        <link type="boardgameexpansion" id="149261" value="Pathfinder Adventure Card Game: Rise of the Runelords – Adventure Deck 4 - Fortress of the Stone Giants" />
        <link type="boardgameexpansion" id="139037" value="Pathfinder Adventure Card Game: Rise of the Runelords – Character Add-On Deck" />
        <link type="boardgameexpansion" id="150798" value="Pathfinder Adventure Card Game: Rise of the Runelords – Spires of Xin-Shalast Adventure Deck 6" />
        <link type="boardgameexpansion" id="144873" value="Pathfinder Adventure Card Game: Rise of the Runelords – The Hook Mountain Massacre Adventure Deck 3" />
        <link type="boardgameexpansion" id="142423" value="Pathfinder Adventure Card Game: Rise of the Runelords – The Skinsaw Murders Adventure Deck 2" />
        <link type="boardgameexpansion" id="178652" value="Pathfinder Battles: Iconic Heroes Set 1" />
        <link type="boardgameexpansion" id="178653" value="Pathfinder Battles: Iconic Heroes Set 2" />
        <link type="boardgameexpansion" id="178654" value="Pathfinder Battles: Iconic Heroes Set 3" />
        <link type="boardgameexpansion" id="180727" value="Pathfinder Battles: Iconic Heroes Set 4" />
        <link type="boardgameexpansion" id="180728" value="Pathfinder Battles: Iconic Heroes Set 5" />
        <link type="boardgameexpansion" id="182910" value="Pathfinder Battles: Iconic Heroes Set 6" />
        <link type="boardgamedesigner" id="604" value="Mike Selinker" />
        <link type="boardgamedesigner" id="45191" value="Chad Brown" />
        <link type="boardgamedesigner" id="49561" value="Tanis O'Connor" />
        <link type="boardgamedesigner" id="82" value="Paul Peterson" />
        <link type="boardgamedesigner" id="70486" value="Gaby Weidling" />
        <link type="boardgameartist" id="50887" value="Noah Bradley" />
        <link type="boardgameartist" id="12130" value="Vincent Dutrait" />
        <link type="boardgamepublisher" id="4238" value="Paizo Publishing" />
        <link type="boardgamepublisher" id="4428" value="Black Book Editions" />
        <link type="boardgamepublisher" id="2366" value="Devir" />
        <link type="boardgamepublisher" id="5530" value="Giochi Uniti" />
        <link type="boardgamepublisher" id="264" value="Heidelberger Spieleverlag" />
        <link type="boardgamepublisher" id="18852" value="Hobby World" />
        <link type="boardgamepublisher" id="6174" value="Ulisses Spiele" />
        <statistics page="1">
            <ratings >
                <usersrated value="9844" />
                <average value="7.34525" />
                <bayesaverage value="7.11933" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="238" bayesaverage="7.11933" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="73" bayesaverage="7.13924" />
                </ranks>
                <stddev value="1.57254" />
                <median value="0" />
                <owned value="15312" />
                <trading value="820" />
                <wanting value="298" />
                <wishing value="1963" />
                <numcomments value="2122" />
                <numweights value="659" />
                <averageweight value="2.7086" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="27627">
        <thumbnail>https://cf.geekdo-images.com/images/pic332870_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic332870.jpg</image>
        <name type="primary" sortindex="1" value="Talisman (Revised 4th Edition)" />
        <name type="alternate" sortindex="1" value="Talisman (4th Edition)" />
        <name type="alternate" sortindex="1" value="Talisman The Magical Quest Game" />
        <name type="alternate" sortindex="1" value="Talisman: Die Magische Suche (4. Edition)" />
        <name type="alternate" sortindex="1" value="Talisman: Dobrodružství meče a magie" />
        <name type="alternate" sortindex="1" value="Talismán: El Juego de la Búsqueda Mágica" />
        <name type="alternate" sortindex="1" value="Talisman: Il Gioco delle Avventure Magiche" />
        <name type="alternate" sortindex="1" value="Talisman: Le jeu des quêtes magiques (4ème édition révisée)" />
        <name type="alternate" sortindex="1" value="Talisman: Magia i Miecz" />
        <name type="alternate" sortindex="1" value="Talisman: O Mágico Jogo de Aventura" />
        <name type="alternate" sortindex="1" value="Talisman: Varázslatos küldetések" />
        <name type="alternate" sortindex="1" value="Talisman: Магическое приключение (4е переработанное издание)" />
        <name type="alternate" sortindex="1" value="Талисман: 4-я редакция" />
        <name type="alternate" sortindex="1" value="טליסמן" />
        <name type="alternate" sortindex="1" value="タリスマン" />
        <name type="alternate" sortindex="1" value="圣符国度" />
        <description>Theme:&amp;#10;&amp;#10;Talisman is an adventure board game set in a high fantasy medieval world.  Players have 14 characters to choose from all based on role playing archetypes, such as heroes, wizards, villains, thieves, monsters, etc.  The game makes players feel they are traveling the world to find equipment, weapons, ancient relics, and companions that will help them on their quest to acquire the Crown of Command.  Along the way they visit various locales in the worlds, battle each other and fantastic creatures to make their way to the top.&amp;#10;&amp;#10;Goal:&amp;#10;&amp;#10;Each player is trying to move from the outer world and ultimately to the inner world. Players wander the outer, middle, and inner worlds trying to acquire equipment, weapons, and companions.  They will also improve statistics with equipment, companions, and encounters and battles with fantasy creatures and each other.  Once they complete a Talisman quest, players will enter the inner world and face its challenges to finally reach the Portal of Power to claim the Crown of Command.  Then the other players must race to stop this player before he eventually kills them all with the Command spell.&amp;#10;&amp;#10;Gameplay:&amp;#10;&amp;#10;To begin, players select a character card from among the 14 provided.  Characters have basic statistics to start.  These are Life [hit points], Strength [physical prowess], and Craft [Magic and Intelligence].  Some characters are naturally more gifted in combat and others in magic, while others are mix of the two.  Additionally characters are often differentiated with unique abilities, starting equipment, and starting spells.  This all makes the players actually feel different during play.  In addition items and companions players acquire during play also add to statistics, increasing Strength, Craft, Life or adding new abilities, etc.&amp;#10;&amp;#10;Actual game play is relatively simple, making the game easy to pick up with novices.  On a player's turn they throw a die for movement.  Player then chooses which direction, left or right, or if meeting qualifications may be able to move from outer to middle world, or middle to inner world.  Once on space, player follows instructions on space, or encounters face up cards already in space, or other player if in space.  Most spaces have a player draw a number of cards to encounter.  These can be creatures, companions, weapons, equipment, treasure, or relics.  Players must fight creatures and win before acquiring any other items or companions.  If another player is in the space, players may attack with either Craft or Strength but are not required to do so.  The defender defends with same statistic attacked with.  If the defender loses, he loses a life and an item or companion of attackers choice.  If the attacker loses, he loses a life.&amp;#10;&amp;#10;Players start in the outer world, and build up their character's statistics and items to try and move to the middle world.  There are two ways to move up to the middle world, one requiring a test of strength and the other a boat man's ride for a price.  Once in the middle world, play proceeds in the same manner, but the challenge generally is increased with more threats such as the desert and temple.  However, there is more potential for encounters and items as most spaces now draw more than one card.&amp;#10;&amp;#10;In the middle world, players may also acquire a Talisman quest, that once completed, will grant them a Talisman.  The Talisman is required to unlock the Crown of Command and pass through the Portal of Power in the Inner World.&amp;#10;&amp;#10;Once players have a Talisman and have enough Strength or Craft to enter the Portal of Power, they will try to enter the Inner World.  There they must face and survive the guardians there, like the Vampire's Tower and Werewolf before claiming the Crown of Command.  Once a player claims the Crown of Command, they can cast the Command Spell, automatically forcing a player to lose a life.  It then becomes a race for the Crown as the other players try to take the player with the Crown down before he finishes them all off.&amp;#10;&amp;#10;Revised using:&amp;#10;&amp;#10;    Talisman Upgrade Pack&amp;#10;&amp;#10;&amp;#10;&amp;#10;&amp;#10;</description>
        <yearpublished value="2007" />
        <minplayers value="2" />
        <maxplayers value="6" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="172">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="12" />
                <result value="Not Recommended" numvotes="91" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="10" />
                <result value="Recommended" numvotes="83" />
                <result value="Not Recommended" numvotes="37" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="48" />
                <result value="Recommended" numvotes="79" />
                <result value="Not Recommended" numvotes="5" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="101" />
                <result value="Recommended" numvotes="51" />
                <result value="Not Recommended" numvotes="2" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="37" />
                <result value="Recommended" numvotes="67" />
                <result value="Not Recommended" numvotes="24" />
            </results>
            <results numplayers="6">
                <result value="Best" numvotes="18" />
                <result value="Recommended" numvotes="52" />
                <result value="Not Recommended" numvotes="44" />
            </results>
            <results numplayers="6+">
                <result value="Best" numvotes="5" />
                <result value="Recommended" numvotes="12" />
                <result value="Not Recommended" numvotes="82" />
            </results>
        </poll>
        <playingtime value="90" />
        <minplaytime value="90" />
        <maxplaytime value="90" />
        <minage value="13" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="81">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="2" />
                <result value="6" numvotes="4" />
                <result value="8" numvotes="35" />
                <result value="10" numvotes="25" />
                <result value="12" numvotes="12" />
                <result value="14" numvotes="1" />
                <result value="16" numvotes="2" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="63">
            <results>
                <result level="1" value="No necessary in-game text" numvotes="1" />
                <result level="2" value="Some necessary text - easily memorized or small crib sheet" numvotes="3" />
                <result level="3" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="10" />
                <result level="4" value="Extensive use of text - massive conversion needed to be playable" numvotes="45" />
                <result level="5" value="Unplayable in another language" numvotes="4" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamemechanic" id="2035" value="Roll / Spin and Move" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="26" value="Talisman" />
        <link type="boardgameexpansion" id="67059" value="Talisman (4th Edition): Arena" />
        <link type="boardgameexpansion" id="67299" value="Talisman (4th Edition): Optional Characters" />
        <link type="boardgameexpansion" id="67060" value="Talisman (4th Edition): Rod of Ruin" />
        <link type="boardgameexpansion" id="67054" value="Talisman (Revised 4th Edition): Crown of Command" />
        <link type="boardgameexpansion" id="67056" value="Talisman (Revised 4th Edition): Danse Macabre" />
        <link type="boardgameexpansion" id="67058" value="Talisman (Revised 4th Edition): Doppelganger" />
        <link type="boardgameexpansion" id="67057" value="Talisman (Revised 4th Edition): Instructor" />
        <link type="boardgameexpansion" id="133745" value="Talisman (Revised 4th Edition): Mephisto #48 Promo Characters" />
        <link type="boardgameexpansion" id="121786" value="Talisman (Revised 4th Edition): The Blood Moon Expansion" />
        <link type="boardgameexpansion" id="189950" value="Talisman (Revised 4th Edition): The Cataclysm Expansion" />
        <link type="boardgameexpansion" id="131816" value="Talisman (Revised 4th Edition): The City Expansion" />
        <link type="boardgameexpansion" id="169254" value="Talisman (Revised 4th Edition): The Deep Realms Expansion" />
        <link type="boardgameexpansion" id="99815" value="Talisman (Revised 4th Edition): The Dragon Expansion" />
        <link type="boardgameexpansion" id="41064" value="Talisman (Revised 4th Edition): The Dungeon Expansion" />
        <link type="boardgameexpansion" id="152318" value="Talisman (Revised 4th Edition): The Firelands Expansion" />
        <link type="boardgameexpansion" id="54475" value="Talisman (Revised 4th Edition): The Frostmarch Expansion" />
        <link type="boardgameexpansion" id="177211" value="Talisman (Revised 4th Edition): The Harbinger Expansion" />
        <link type="boardgameexpansion" id="67051" value="Talisman (Revised 4th Edition): The Highland Expansion" />
        <link type="boardgameexpansion" id="152319" value="Talisman (Revised 4th Edition): The Nether Realm Expansion" />
        <link type="boardgameexpansion" id="38025" value="Talisman (Revised 4th Edition): The Reaper Expansion" />
        <link type="boardgameexpansion" id="75857" value="Talisman (Revised 4th Edition): The Sacred Pool Expansion" />
        <link type="boardgameexpansion" id="158979" value="Talisman (Revised 4th Edition): The Woodland Expansion" />
        <link type="boardgameimplementation" id="714" value="Talisman" inbound="true"/>
        <link type="boardgamedesigner" id="7483" value="John Goodenough" />
        <link type="boardgamedesigner" id="345" value="Robert Harris" />
        <link type="boardgameartist" id="20362" value="Massimiliano Bertolini" />
        <link type="boardgameartist" id="14202" value="Ralph Horsley" />
        <link type="boardgameartist" id="14108" value="Jeremy McHugh" />
        <link type="boardgameartist" id="12436" value="WiL Springer" />
        <link type="boardgameartist" id="20363" value="Sean Turtle" />
        <link type="boardgamepublisher" id="6457" value="Black Industries" />
        <link type="boardgamepublisher" id="6194" value="Delta Vision Publishing" />
        <link type="boardgamepublisher" id="2366" value="Devir" />
        <link type="boardgamepublisher" id="2973" value="Edge Entertainment" />
        <link type="boardgamepublisher" id="17" value="Fantasy Flight Games" />
        <link type="boardgamepublisher" id="4617" value="Galakta" />
        <link type="boardgamepublisher" id="12540" value="Game Harbor" />
        <link type="boardgamepublisher" id="26" value="Games Workshop Ltd." />
        <link type="boardgamepublisher" id="5530" value="Giochi Uniti" />
        <link type="boardgamepublisher" id="264" value="Heidelberger Spieleverlag" />
        <link type="boardgamepublisher" id="1391" value="Hobby Japan" />
        <link type="boardgamepublisher" id="23628" value="Monkey Time" />
        <link type="boardgamepublisher" id="504" value="Nexus" />
        <link type="boardgamepublisher" id="39" value="Pegasus Spiele" />
        <link type="boardgamepublisher" id="8313" value="Smart Ltd" />
        <statistics page="1">
            <ratings >
                <usersrated value="9644" />
                <average value="6.57503" />
                <bayesaverage value="6.35665" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="1078" bayesaverage="6.35665" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="301" bayesaverage="6.3144" />
                </ranks>
                <stddev value="1.83207" />
                <median value="0" />
                <owned value="14164" />
                <trading value="421" />
                <wanting value="192" />
                <wishing value="1253" />
                <numcomments value="2201" />
                <numweights value="700" />
                <averageweight value="2.2157" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="172220">
        <thumbnail>https://cf.geekdo-images.com/images/pic2496558_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic2496558.jpg</image>
        <name type="primary" sortindex="1" value="Dungeons &amp; Dragons: Temple of Elemental Evil Board Game" />
        <name type="alternate" sortindex="1" value="Temple of Elemental Evil" />
        <description>In the Dungeons &amp;amp; Dragons: Temple of Elemental Evil Board Game, you play as a heroic adventurer. With amazing abilities, spells and magic weapons, you must explore the dungeons beneath the Sword Coast where you will fight monsters, overcome hazards and find treasure. Are you ready for adventure?&amp;#10;&amp;#10;Temple of Elemental Evil includes multiple scenarios, challenging quests, and co-operative game play designed for 1-5 players. The contents can also be combined with other D&amp;amp;D Adventure System Cooperative play board games, including The Legend of Drizzt and Castle Ravenloft.&amp;#10;&amp;#10;Each player selects a hero, such as a fighter, cleric, or wizard. On their turn, each player can explore further into the dungeon (turn over new tiles), move through the already explored parts of the dungeon, and fight monsters. When a new dungeon tile is revealed, there is typically an encounter of some sort, and new monsters to fight are added. Slain monsters reward the players with treasure, and experience points, allowing them to level up and increase their skills during play. Players must cooperate to stay alive, slay the monsters, and achieve the goal of their quest. Each scenario has a different goal, from retrieving a relic to slaying a large boss monster.&amp;#10;&amp;#10;</description>
        <yearpublished value="2015" />
        <minplayers value="1" />
        <maxplayers value="5" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="20">
            <results numplayers="1">
                <result value="Best" numvotes="4" />
                <result value="Recommended" numvotes="11" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="5" />
                <result value="Recommended" numvotes="6" />
                <result value="Not Recommended" numvotes="2" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="13" />
                <result value="Recommended" numvotes="3" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="7" />
                <result value="Recommended" numvotes="8" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="4" />
                <result value="Recommended" numvotes="9" />
                <result value="Not Recommended" numvotes="2" />
            </results>
            <results numplayers="5+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="9" />
            </results>
        </poll>
        <playingtime value="60" />
        <minplaytime value="60" />
        <maxplaytime value="60" />
        <minage value="14" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="15">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="2" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="8" />
                <result value="10" numvotes="4" />
                <result value="12" numvotes="1" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="10">
            <results>
                <result level="1" value="No necessary in-game text" numvotes="0" />
                <result level="2" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="3" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="4" value="Extensive use of text - massive conversion needed to be playable" numvotes="10" />
                <result level="5" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1047" value="Miniatures" />
        <link type="boardgamemechanic" id="2023" value="Co-operative Play" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2676" value="Grid Movement" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="7005" value="Animals: Dragons" />
        <link type="boardgamefamily" id="7307" value="Dungeons &amp; Dragons" />
        <link type="boardgamefamily" id="9547" value="Dungeons and Dragons Adventure System Board Games" />
        <link type="boardgamefamily" id="7757" value="From RPG books to board games" />
        <link type="boardgamefamily" id="5666" value="Solitaire Games" />
        <link type="boardgameexpansion" id="80591" value="Dungeons &amp; Dragons: Castle Ravenloft Board Game – Gray Hag Promo" />
        <link type="boardgameexpansion" id="104391" value="Dungeons &amp; Dragons: The Legend of Drizzt Board Game – Vierna Do'Urden Promo" />
        <link type="boardgameexpansion" id="82166" value="Dungeons &amp; Dragons: Wrath of Ashardalon Boardgame - Kobold Champion Promo" />
        <link type="boardgameintegration" id="59946" value="Dungeons &amp; Dragons: Castle Ravenloft Board Game" />
        <link type="boardgameintegration" id="91872" value="Dungeons &amp; Dragons: The Legend of Drizzt Board Game" />
        <link type="boardgameintegration" id="228668" value="Dungeons &amp; Dragons: Tomb of Annihilation Board Game" />
        <link type="boardgameintegration" id="66356" value="Dungeons &amp; Dragons: Wrath of Ashardalon Board Game" />
        <link type="boardgamedesigner" id="15913" value="Peter Lee" />
        <link type="boardgamedesigner" id="69985" value="Ben Petrisor" />
        <link type="boardgamepublisher" id="13" value="Wizards of the Coast" />
        <link type="boardgamepublisher" id="221" value="WizKids" />
        <statistics page="1">
            <ratings >
                <usersrated value="1014" />
                <average value="7.51573" />
                <bayesaverage value="6.44698" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="928" bayesaverage="6.44698" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="159" bayesaverage="6.73484" />
                </ranks>
                <stddev value="1.36275" />
                <median value="0" />
                <owned value="2949" />
                <trading value="55" />
                <wanting value="247" />
                <wishing value="954" />
                <numcomments value="235" />
                <numweights value="55" />
                <averageweight value="2.5091" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="160081">
        <thumbnail>https://cf.geekdo-images.com/images/pic2619701_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic2619701.jpg</image>
        <name type="primary" sortindex="1" value="Dungeon Saga: Dwarf King&#039;s Quest" />
        <name type="alternate" sortindex="1" value="Dungeon Saga: A Busca do Rei Anão" />
        <name type="alternate" sortindex="1" value="Dungeon Saga: Die Legende beginnt" />
        <name type="alternate" sortindex="1" value="Dungeon Saga: Grobowiec Króla Krasnoludów" />
        <name type="alternate" sortindex="1" value="Dungeon Saga: La Missione del Re dei Nani" />
        <name type="alternate" sortindex="1" value="Dungeon Saga: La Quête du Roi Nain" />
        <description>Over a thousand years ago, Valandor, the greatest known hero fell in battle, fighting to protect the lives of those around him. From shore to shore, all owe thanks to his wondrous legacy. Now, sacred sites across the land have been defiled and plundered by the disgraced wizard Mortibris, who along with his vile undead minions will stop at nothing to obtain the secrets of Valandor&amp;rsquo;s power. Only the bravest heroes dare oppose him. Thrown together from the far corners of the realm, they step boldly into the depths, ready to face whatever foul evil awaits them&amp;hellip;&amp;#10;&amp;#10;Hero, your quest begins here!&amp;#10;&amp;#10;Embark on a fantasy adventure for up to five players with Dungeon Saga: Dwarf King's Quest. With highly detailed game-pieces and learn-as-you-play rules, this set contains everything you need to transform your tabletop into a deep and immersive world of heroes and monsters. Play a single game in just 30 minutes, or combine the carefully composed adventures for countless hours of classic quest gameplay. When the fate of the world hangs in the balance, which part will you play in the epic Dungeon Saga?&amp;#10;&amp;nbsp;&amp;#10;-Epic, story-driven campaign&amp;#10;-Classic quest atmosphere&amp;#10;-Easy rules you can learn as you play&amp;#10;-Characters that develop as the adventure unfolds&amp;#10;-Beautifully illustrated 3D dungeons with doors, barrels, bookcases and more!&amp;#10;-26 detailed and fully assembled miniatures in coloured plastic&amp;#10;-Evocative &amp;lsquo;ancient tome&amp;rsquo; packaging in a protective sleeve&amp;#10;&amp;#10;One player takes the part of the evil dungeon overlord with the forces of evil at his command, and the others divide the mighty heroes between them.&amp;nbsp;Each hero has strengths and weaknesses and teamwork is the key: The mighty barbarian can slaughter many foes at a time, yet he is lightly armoured and vulnerable to strong enemies. The Dwarf, on the other hand, is steadier as his thick armour can resist most attacks. The Elf is not as skilled a fighter as either of these, instead preferring to stay at a distance where her finely-honed archery skills can best be used. Finally, there is the wizard -the others may laugh at his lack of fighting skill, yet it is often his magic that carries the day. If the others can keep him alive, that is.&amp;#10;&amp;#10;This core set will be supported with a raft of expansion products as time goes on, adding new challenges and game modes to your Dungeon Saga. The first of these will be Adventurer's Companion which will add an AI system for solo and fully co-operative play, the ability to create unique characters from scratch using any model in your collection, the tools you need to design your own dungeons and much more!&amp;#10;&amp;#10;</description>
        <yearpublished value="2015" />
        <minplayers value="2" />
        <maxplayers value="5" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="10">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="6" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="2" />
                <result value="Recommended" numvotes="5" />
                <result value="Not Recommended" numvotes="2" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="3" />
                <result value="Recommended" numvotes="4" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="6" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="6" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="5+">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="6" />
            </results>
        </poll>
        <playingtime value="120" />
        <minplaytime value="30" />
        <maxplaytime value="120" />
        <minage value="10" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="9">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="2" />
                <result value="8" numvotes="4" />
                <result value="10" numvotes="1" />
                <result value="12" numvotes="1" />
                <result value="14" numvotes="1" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="0">
            <results>
                <result level="1" value="No necessary in-game text" numvotes="0" />
                <result level="2" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="3" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="4" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="5" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamecategory" id="1047" value="Miniatures" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2676" value="Grid Movement" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamemechanic" id="2019" value="Partnerships" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="24281" value="Campaign Games" />
        <link type="boardgamefamily" id="8374" value="Crowdfunding: Kickstarter" />
        <link type="boardgameexpansion" id="195004" value="Dungeon Saga: The Adventurer’s Companion" />
        <link type="boardgameexpansion" id="225496" value="Dungeon Saga: The Black Fortress" />
        <link type="boardgameexpansion" id="197263" value="Dungeon Saga: The Infernal Crypts" />
        <link type="boardgameexpansion" id="205984" value="Dungeon Saga: The Return of Valandor" />
        <link type="boardgameexpansion" id="206046" value="Dungeon Saga: The Tyrant of Halpi" />
        <link type="boardgameexpansion" id="204989" value="Dungeon Saga: The Warlord of Galahir" />
        <link type="boardgameimplementation" id="93895" value="Dwarf King's Hold: Dead Rising" inbound="true"/>
        <link type="boardgameimplementation" id="100798" value="Dwarf King's Hold: Green Menace" inbound="true"/>
        <link type="boardgamedesigner" id="944" value="Jake Thornton" />
        <link type="boardgamepublisher" id="16243" value="Mantic Games" />
        <link type="boardgamepublisher" id="9074" value="Bard Centrum Gier" />
        <link type="boardgamepublisher" id="30213" value="Fire on Board Jogos" />
        <link type="boardgamepublisher" id="264" value="Heidelberger Spieleverlag" />
        <link type="boardgamepublisher" id="30713" value="Magic Store Srl" />
        <statistics page="1">
            <ratings >
                <usersrated value="558" />
                <average value="7.45679" />
                <bayesaverage value="6.08801" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="1703" bayesaverage="6.08801" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="293" bayesaverage="6.34007" />
                </ranks>
                <stddev value="1.614" />
                <median value="0" />
                <owned value="1752" />
                <trading value="51" />
                <wanting value="77" />
                <wishing value="427" />
                <numcomments value="194" />
                <numweights value="33" />
                <averageweight value="2.4848" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="1560">
        <thumbnail>https://cf.geekdo-images.com/images/pic3638118_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic3638118.jpg</image>
        <name type="primary" sortindex="1" value="Hero" />
        <description>The publisher's description:&amp;#10;Hero is a wild, no holds barred man-to-man (or beast) game on two levels. Players control their own Hero in their portion of the maze as well as monsters in their opponents portion.  Each Hero is composed of several categories: Intelligence, Physical Appearance, Class, Strength, Luck, Hits, and Weapons Proficiency.  Each of these must be determined by the player from a fixed number of points.  To make a Hero super-strong will mean that some other category must suffer (super-strong and a lackwit?).  Monsters include such loathesome creatures as trolls, ogres, zombies, goblins, lycanthropes, men, and the horribly alluring succubus.  Each has an offensive potential as well as a defensive capability based on the type of creature vs. the Hero's weapon and how mightily he wields it.  Your Hero must avoid traps, slaughter monsters, gather gold, and make it to the end of the labyrinth to win the hand of the stunning, voluptuous daughter of the most powerful wizard in the land.  If the Hero does not there are always other challenges, unless he has become a Dead Hero.&amp;#10;&amp;#10;Components: &amp;#10;Thin album box &amp;#10;3 panel folder (Yaquinto catalog), Space Gamer Magazine advertising&amp;#10;flyer.&amp;#10;&amp;#10;Thick album box &amp;#10;Yaquinto price sheet dated &amp;quot;Feb 1 1982&amp;quot;, rules booklet marked &amp;quot;Second&amp;#10;Printing, March 1981&amp;quot;.&amp;#10;&amp;#10;Both editions&amp;#10;12 page rules booklet, card with 3 perforated hero set-up sheets, &amp;#10;2 plastic ziplock bags.&amp;#10;&amp;#10;Summary Counter Manifest: 52 3/8&amp;quot; counters, 130 1/2&amp;quot; counters &amp;#10;(9 white, 1 blank, and 3 identical sets of 40 colored red, blue, or green.)&amp;#10;&amp;#10;</description>
        <yearpublished value="1980" />
        <minplayers value="2" />
        <maxplayers value="3" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="2">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="2" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="2" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="1" />
            </results>
        </poll>
        <playingtime value="120" />
        <minplaytime value="120" />
        <maxplaytime value="120" />
        <minage value="12" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="1">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="0" />
                <result value="10" numvotes="0" />
                <result value="12" numvotes="1" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="0">
            <results>
                <result level="1" value="No necessary in-game text" numvotes="0" />
                <result level="2" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="3" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="4" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="5" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamecategory" id="1059" value="Maze" />
        <link type="boardgamedesigner" id="1101" value="Michael E. Matheny" />
        <link type="boardgameartist" id="36570" value="John Hagen" />
        <link type="boardgamepublisher" id="154" value="Yaquinto" />
        <statistics page="1">
            <ratings >
                <usersrated value="57" />
                <average value="5.62193" />
                <bayesaverage value="5.50452" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="11012" bayesaverage="5.50452" />
                </ranks>
                <stddev value="1.29578" />
                <median value="0" />
                <owned value="181" />
                <trading value="12" />
                <wanting value="5" />
                <wishing value="18" />
                <numcomments value="31" />
                <numweights value="9" />
                <averageweight value="2.4444" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="43693">
        <thumbnail>https://cf.geekdo-images.com/images/pic498963_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic498963.jpg</image>
        <name type="primary" sortindex="1" value="Delve the Card Game" />
        <description>Goal:&amp;#10;&amp;#10;Make it through the entire dungeon with a surviving hero.&amp;#10;&amp;#10;Rules:&amp;#10;&amp;#10;Pick one of the four heroes that you will use for the game.  Your starting vitality is shown on the card.  This is used for both your health and your attack value.  Damage will drop your vitality and if it ever reaches zero the game is over.  Items will modify your attack value when determining the outcomes of battles, but they do not add to your health.  For example, if your base vitality is 5, and you have taken 4 damage, 1 more damage will end the game even if you have a weapon that adds 2 to your attack.&amp;#10;&amp;#10;Pick one non-epic item to start the game with.  Unless otherwise specified, your hero can only carry two items.  Shuffle the remaining non-hero cards.  This is the draw deck.&amp;#10;&amp;#10;Start turning over the cards in the draw deck, one at a time and resolving them until you either reach the end of the deck and have won, or your hero is dead.&amp;#10;&amp;#10;</description>
        <yearpublished value="2009" />
        <minplayers value="1" />
        <maxplayers value="1" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="0">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="1+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
        </poll>
        <playingtime value="30" />
        <minplaytime value="30" />
        <maxplaytime value="30" />
        <minage value="0" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="0">
	</poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="2">
            <results>
                <result level="16" value="No necessary in-game text" numvotes="0" />
                <result level="17" value="Some necessary text - easily memorized or small crib sheet" numvotes="2" />
                <result level="18" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="19" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="20" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1002" value="Card Game" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamecategory" id="1120" value="Print &amp; Play" />
        <link type="boardgamefamily" id="5666" value="Solitaire Games" />
        <link type="boardgamedesigner" id="13262" value="Drew Chamberlain" />
        <link type="boardgameartist" id="13265" value="A. Tran" />
        <link type="boardgamepublisher" id="1001" value="(Web published)" />
        <statistics page="1">
            <ratings >
                <usersrated value="83" />
                <average value="6.05735" />
                <bayesaverage value="5.53837" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="8595" bayesaverage="5.53837" />
                </ranks>
                <stddev value="1.64939" />
                <median value="0" />
                <owned value="171" />
                <trading value="9" />
                <wanting value="7" />
                <wishing value="55" />
                <numcomments value="56" />
                <numweights value="11" />
                <averageweight value="1.4545" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="699">
        <thumbnail>https://cf.geekdo-images.com/images/pic338410_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic338410.jpg</image>
        <name type="primary" sortindex="1" value="HeroQuest" />
        <name type="alternate" sortindex="1" value="ヒーロークエスト" />
        <description>HeroQuest is Milton Bradley's approach to a Dungeons &amp;amp; Dragons-style adventure game.  One player acts as game master, revealing the maze-like dungeon piecemeal as the players wander.  Up to four other players take on a character (wizard, elf, dwarf, or barbarian) and venture forth into dungeons on fantasy quests.  Plastic miniatures and 3-D furniture make this game very approachable.  Expansions were also released for this system.&amp;#10;&amp;#10;The HeroQuest series consists of the main game and a number of expansions.&amp;#10;&amp;#10;This game was made in cooperation with Games Workshop who designed the miniatures and helped in many of the production details including background world and art in the rule book and scenario book.&amp;#10;&amp;#10;Additional material which is generally missed since it is not technically an expansion was published in the HeroQuest: Adventure Design Kit which did feature one more Heroquest adventure: A Plague of Zombies.&amp;#10;&amp;#10;Other sources of HeroQuest supplements which are available (in some cases online.)&amp;#10;&amp;#10;&amp;#10;     Adventures Unlimited # 05 &amp;quot;The Inn of Chaos&amp;quot;&amp;#10;     Vindicator Vol 1,    # 02 &amp;quot;Review: Quest Pack for the Elf&amp;quot; &amp;quot;HeroQuest Hall of Foes I&amp;quot;&amp;#10;     Vindicator Vol 1,    # 03 &amp;quot;Review: Barbarian Quest Pack&amp;quot; &amp;quot;HeroQuest Hall of Foes II&amp;quot;&amp;#10;     Vindicator Vol 1,    # 04 &amp;quot;HeroQuest Variants&amp;quot;&amp;#10;     Vindicator Vol 1,    # 5a &amp;quot;The Rogue&amp;quot;&amp;#10;     Vindicator Vol 2,    # 03 &amp;quot;HeroQuest Treasure Cards&amp;quot;&amp;#10;     Fractal Spectrum     # 13 &amp;quot;HeroQuest: A Notch Above&amp;quot;&amp;#10;     Fractal Spectrum     # 17 &amp;quot;HeroQuest Hall of Foes III&amp;quot;&amp;#10;     White Dwarf          #115 &amp;quot;The Eyes of Chaos part 1&amp;quot;&amp;#10;     White Dwarf          #134 &amp;quot;The Halls of Durrag-Dol&amp;quot;&amp;#10;     White Dwarf          #145 &amp;quot;The Eyes of Chaos part 2&amp;quot;&amp;#10;     Marvel Comic         Marvel Winter Special &amp;quot;Revenge of the Weatherman&amp;quot;&amp;#10;     The Screaming Spectre by Dave Morris: &amp;quot;Running the Gauntlet&amp;quot;&amp;#10;     The Tyrant's Tomb by Dave Morris: &amp;quot;A Growl of Thunder&amp;quot;&amp;#10;     The Alchemist's Bench&amp;#10;     Drag&amp;atilde;o Brasil #3 : Contains an article/preview of the board game by Roberto De Moraes.&amp;#10;     Drag&amp;atilde;o Brasil #4 : Contains the 5-quest pack &amp;quot;A CIDADE ESCRAVA&amp;quot; (The Slave City) by Roberto De Moraes.&amp;#10;     Drag&amp;atilde;o Brasil #6 : Contains the 3-quest pack &amp;quot;O RESGATE&amp;quot; (The Rescue) by Roberto De Moraes (signing as &amp;quot;Di'Follkyer&amp;quot;).&amp;#10;     Drag&amp;atilde;o Brasil #8 : Contains the 3-quest pack &amp;quot;ATAQUE AO MAGO DORMINHOCO&amp;quot; (Attack on the Sleeping Mage) by Roberto De Moraes.&amp;#10;     Drag&amp;atilde;o Brasil #12 : Contains information about four new HeroQuest heroes; Minotaur, Fairy, Amazon, Centaur.&amp;#10;     Drag&amp;atilde;o Dourado #5 : Contains the quest &amp;quot;O RESGATE DA PRINCESA&amp;quot; (The Rescure of the Princess) by Unknown.&amp;#10;     S&amp;oacute; Aventuras #1 : Contains the 3-quest pack &amp;quot;CACADA A CRIATURA&amp;quot; (Creature Hunt) by Roberto De Moraes.&amp;#10;     The Universe of RPG #1 : Contains a presentation of the board game by Marcos Mulatinho.&amp;#10;&amp;#10;&amp;#10;********************&amp;#10;HeroQuest Inventory (US Version)....................(Uk Version)&amp;#10;1 Game board..............................................1 Game board&amp;#10;1 Instruction Booklet....................................1 Instruction Booklet&amp;#10;1 Quest Book with 14 Quests......................1 Quest Book with 14 Quests&amp;#10;1 Evil sorcerer screen..................................1 Evil sorcerer screen&amp;#10;1 Information Table&amp;#10;1 Pad of Characters Sheets........................1 Pad of Characters Sheets&amp;#10;6 White Combat Dice.................................4 White Combat Dice&amp;#10;2 Red Six Sided Dice...................................2 Red Six Sided Dice&amp;#10;Minis:&amp;#10;8 Orcs (2 mace, 2 hatchet, 4 sword)..........................8 Orcs&amp;#10;6 Goblins (2 hatchet, 2 sword, 2 dagger) .....................6 Goblins&amp;#10;3 Fimir........................................................3 Fimir&amp;#10;4 Chaos Warriors......................................4 Chaos Warrior&amp;#10;1 Chaos Warlock.......................................1 Chaos Warlock&amp;#10;1 Gargoyle.................................................1 Gargoyle&amp;#10;4 Skeletons...............................................4 Skeletons&amp;#10;2 Zombies.................................................2 Zombies&amp;#10;2 Mummies................................................2 Mummies&amp;#10;1 Barbarian...............................................1 Barbarian&amp;#10;1 Dwarf.....................................................1 Dwarf&amp;#10;1 Elf..........................................................1 Elf&amp;#10;1 Wizard...................................................1 Wizard&amp;#10;4 Hero Character Cards............................4 Hero Character Cards&amp;#10;5 Closed Doors with bases.......................5 Closed Doors with bases&amp;#10;16 Open Doors with bases.......................16 Open Doors with bases&amp;#10;Furniture:&amp;#10;2 Tables....................................................2 Tables&amp;#10;1 Throne...................................................1 Throne&amp;#10;1 Alchemist's bench..................................1 Alchemist's bench&amp;#10;3 Treasure chests.....................................3 Treasure chests&amp;#10;1 Tomb......................................................1 Tomb&amp;#10;1 Sorcerer's table......................................1 Sorcerer's table&amp;#10;2 Bookcases.............................................2 Bookcases&amp;#10;1 Torture Rack..........................................1 Torture Rack&amp;#10;1 Fireplace................................................1 Fireplace&amp;#10;1 Weapons rack.......................................1 Weapons rack&amp;#10;1 Cupboard..............................................1 Cupboard&amp;#10;Treasure:&amp;#10;................................................................1 Empty card&amp;#10;2 Gem cards.............................................2 Gems cards=50 Gold&amp;#10;................................................................1 Gold=10 card&amp;#10;2 Gold=15 cards......................................2 Gold=20 card&amp;#10;2 Gold=25 cards......................................2 Gold=25 card&amp;#10;................................................................1 Gold=1D6*10 card&amp;#10;................................................................1 Gold=100 card&amp;#10;2 Hazard arrow cards..............................2 Hazard arrow cards&amp;#10;2 Hazard fall cards...................................1 Hazard fall card&amp;#10;1 Heroic Brew card..................................1 Heroic Brew card&amp;#10;................................................................1 Holy water card&amp;#10;2 Jewel cards&amp;#10;1 Potion of defense card..........................1 Potion of defense card&amp;#10;3 Potion of healing cards.........................2 Potion of healing cards&amp;#10;................................................................1 Potion of speed&amp;#10;1 Potion of strength card.........................1 Potion of strength card&amp;#10;6 Wandering monster cards.....................5 Wandering monster cards&amp;#10;1 Borin&amp;rsquo;s armor card.................................1 Borin&amp;rsquo;s armor card&amp;#10;1 Elixir of life card&amp;#10;1 Orc&amp;rsquo;s Bane card.....................................1 Orc&amp;rsquo;s Bane card&amp;#10;1 Ring of return card&amp;#10;1 Spell ring card&amp;#10;1 Spirit blade card.....................................1 Spirit blade card&amp;#10;1 Talisman of lore card..............................1 Talisman of lore card&amp;#10;1 Wand of magic card................................1 Wand of magic card&amp;#10;1 Wizard&amp;rsquo;s cloak card.&amp;#10;1 Wizard&amp;rsquo;s staff card&amp;#10;1 Chaos warrior card.................................1 Chaos warrior card&amp;#10;1 Fimir card................................................1 Fimir card&amp;#10;1 Gargoyle card.........................................1 Gargoyle card&amp;#10;1 Orc card..................................................1 Orc card&amp;#10;1 Goblin card..............................................1 Goblin card&amp;#10;1 Mummy card............................................1 Mummy card&amp;#10;1 Skeleton card..........................................1 Skeleton card&amp;#10;1 Zombie card............................................1 Zombie card&amp;#10;3 Air Spells Cards.......................................3 Air Spells Cards&amp;#10;3 Fire Spells Cards......................................3 Fire Spells Cards&amp;#10;3 Earth Spells Cards...................................3 Earth Spells Cards&amp;#10;3 Water Spells Cards..................................3 Water Spells Cards&amp;#10;12 Chaos Spell Cards&amp;#10;Ball of Flame&amp;#10;Cloud of Chaos&amp;#10;Command&amp;#10;Escape&amp;#10;Fear&amp;#10;Firestorm&amp;#10;Lightning Bolt&amp;#10;Rust&amp;#10;Sleep&amp;#10;Summon Orcs&amp;#10;Summon Undead&amp;#10;Tempest&amp;#10;...................................................................1 Battle Axe Card&amp;#10;...................................................................1 Chainmail Card&amp;#10;...................................................................1 Crossbow Card&amp;#10;...................................................................1 Double Edge Sword Card =(Broadsword)&amp;#10;...................................................................1 Hand Axe Card&amp;#10;...................................................................2 Helmet Cards&amp;#10;...................................................................1 Plate Mail Card&amp;#10;...................................................................2 Shield Card&amp;#10;...................................................................1 Short Sword Card&amp;#10;...................................................................1 Spear Card&amp;#10;...................................................................1 Staff Card&amp;#10;...................................................................1 Tools Card&amp;#10;1 Stairs tile..................................................1 Stairs tile&amp;#10;2 Double blocked squares tiles....................2 Double blocked squares tiles&amp;#10;12 Skulls/Blocked squares tiles&amp;#10;8 Falling Rock Trap/Blocked Squares tiles....8 Blocked squares tiles&amp;#10;3 Pit Trap/Blocked squares tiles...................6 Pit Trap squares tiles&amp;#10;3 Pit Trap/Secret doors tiles&amp;#10;4 Falling Block Trap/Secret doors tiles.........4 Secret doors tiles&amp;#10;2 Candlesticks.............................................2 Candlesticks&amp;#10;1 Set of bottles............................................1 Set of bottles&amp;#10;1 Set of scales.............................................1 Set of scales&amp;#10;4 skulls........................................................10 skulls&amp;#10;4 rats...........................................................4 rats&amp;#10;&amp;#10;</description>
        <yearpublished value="1989" />
        <minplayers value="2" />
        <maxplayers value="5" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="112">
            <results numplayers="1">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="3" />
                <result value="Not Recommended" numvotes="68" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="8" />
                <result value="Recommended" numvotes="42" />
                <result value="Not Recommended" numvotes="30" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="18" />
                <result value="Recommended" numvotes="57" />
                <result value="Not Recommended" numvotes="8" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="19" />
                <result value="Recommended" numvotes="61" />
                <result value="Not Recommended" numvotes="8" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="84" />
                <result value="Recommended" numvotes="16" />
                <result value="Not Recommended" numvotes="6" />
            </results>
            <results numplayers="5+">
                <result value="Best" numvotes="3" />
                <result value="Recommended" numvotes="5" />
                <result value="Not Recommended" numvotes="48" />
            </results>
        </poll>
        <playingtime value="90" />
        <minplaytime value="90" />
        <maxplaytime value="90" />
        <minage value="10" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="53">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="1" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="7" />
                <result value="8" numvotes="25" />
                <result value="10" numvotes="14" />
                <result value="12" numvotes="2" />
                <result value="14" numvotes="2" />
                <result value="16" numvotes="2" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="53">
            <results>
                <result level="11" value="No necessary in-game text" numvotes="0" />
                <result level="12" value="Some necessary text - easily memorized or small crib sheet" numvotes="3" />
                <result level="13" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="15" />
                <result level="14" value="Extensive use of text - massive conversion needed to be playable" numvotes="34" />
                <result level="15" value="Unplayable in another language" numvotes="1" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamecategory" id="1047" value="Miniatures" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2676" value="Grid Movement" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamemechanic" id="2019" value="Partnerships" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamemechanic" id="2035" value="Roll / Spin and Move" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="24281" value="Campaign Games" />
        <link type="boardgamefamily" id="69" value="HeroQuest" />
        <link type="boardgamefamily" id="4328" value="Warhammer Fantasy Board Games" />
        <link type="boardgameexpansion" id="121750" value="Adventure 1: The Mountain Keep (fan expansion to HeroQuest)" />
        <link type="boardgameexpansion" id="123656" value="Adventure 2: Slaves Of Zargon (fan expansion for HeroQuest)" />
        <link type="boardgameexpansion" id="123743" value="Adventure 3: The Lost Books (fan expansion for HeroQuest)" />
        <link type="boardgameexpansion" id="124371" value="Adventure 4: In The King's Service (fan expansion for HeroQuest)" />
        <link type="boardgameexpansion" id="125085" value="Adventure 5: Beyond Grin's Crag – Kellar's Keep 2 (fan expansion for HeroQuest)" />
        <link type="boardgameexpansion" id="125088" value="Adventure 6: Resurrection – Return of the Witch Lord 2 (fan expansion for HeroQuest)" />
        <link type="boardgameexpansion" id="127057" value="Adventure 7: The Rescue of Princess Millandriell (fan expansion to HeroQuest)" />
        <link type="boardgameexpansion" id="127059" value="Adventure 8: The Horror Inside the Ancient Halls of Sunca (fan expansion to HeroQuest)" />
        <link type="boardgameexpansion" id="74525" value="A Growl of Thunder" />
        <link type="boardgameexpansion" id="1765" value="HeroQuest: Against the Ogre Horde" />
        <link type="boardgameexpansion" id="1763" value="HeroQuest: Barbarian Quest Pack" />
        <link type="boardgameexpansion" id="9142" value="HeroQuest: Dungeons of Peril" />
        <link type="boardgameexpansion" id="1764" value="HeroQuest: Elf Quest Pack" />
        <link type="boardgameexpansion" id="1762" value="HeroQuest: Kellar's Keep" />
        <link type="boardgameexpansion" id="1761" value="HeroQuest: Return of the Witch Lord" />
        <link type="boardgameexpansion" id="1767" value="HeroQuest: Wizards of Morcar" />
        <link type="boardgameexpansion" id="127288" value="Masters' Series: Adventure 1 – The Deadly Hand of Zargon (fan expansion for HeroQuest)" />
        <link type="boardgameexpansion" id="74521" value="Running the Gauntlet" />
        <link type="boardgameimplementation" id="1758" value="Advanced Heroquest" />
        <link type="boardgameimplementation" id="22192" value="HeroQuest Advanced Quest" />
        <link type="boardgameimplementation" id="218933" value="Warhammer Quest: Shadows Over Hammerhal" />
        <link type="boardgamedesigner" id="1743" value="Stephen Baker" />
        <link type="boardgameartist" id="979" value="Gary Chalk" />
        <link type="boardgameartist" id="12498" value="Les Edwards" />
        <link type="boardgamepublisher" id="1731" value="Estrela" />
        <link type="boardgamepublisher" id="13103" value="El Greco" />
        <link type="boardgamepublisher" id="4539" value="MB Giochi" />
        <link type="boardgamepublisher" id="8931" value="MB Jeux" />
        <link type="boardgamepublisher" id="17039" value="MB Juegos" />
        <link type="boardgamepublisher" id="17055" value="MB peli" />
        <link type="boardgamepublisher" id="17072" value="MB spel" />
        <link type="boardgamepublisher" id="4554" value="MB Spellen" />
        <link type="boardgamepublisher" id="6290" value="MB Spiele" />
        <link type="boardgamepublisher" id="26091" value="MB spil (Danish)" />
        <link type="boardgamepublisher" id="20" value="Milton Bradley" />
        <link type="boardgamepublisher" id="1390" value="Takara" />
        <statistics page="1">
            <ratings >
                <usersrated value="8396" />
                <average value="7.03326" />
                <bayesaverage value="6.75974" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="543" bayesaverage="6.75974" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="158" bayesaverage="6.73831" />
                </ranks>
                <stddev value="1.5373" />
                <median value="0" />
                <owned value="12323" />
                <trading value="483" />
                <wanting value="271" />
                <wishing value="885" />
                <numcomments value="2392" />
                <numweights value="702" />
                <averageweight value="2.1709" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="36932">
        <thumbnail>https://cf.geekdo-images.com/images/pic570518_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic570518.jpg</image>
        <name type="primary" sortindex="1" value="Claustrophobia" />
        <name type="alternate" sortindex="1" value="Клаустрофобия" />
        <description>Claustrophobia is a miniatures-based dungeon crawl game set within the universe of Hell Dorado.&amp;#10;&amp;#10;The box contains pre-painted miniatures which are placed on large tiles showing the dungeon spaces.  Also included are character boards, counters and markers, and dice.&amp;#10;&amp;#10;One player controls a small group of determined humans, while the other plays an almost unending army of demonic creatures.  The game is thematic and highly asymmetric: human characters  are stronger, but the demon characters are more numerous.  Gameplay is very straightforward with a minimum of rules, and each game plays in an hour or less.&amp;#10;&amp;#10;In essence dice are allocated after rolling to perform actions, while cards or special abilities are also available.  The game is about managing decisions and choosing what to do with the resources that you have, managing difficult events and out-thinking your opponent.  Combat is handled by dice.&amp;#10;&amp;#10;Complexity is low, with the focus on theme and building towards a tense, climactic ending. &amp;#10; Claustrophobia is played through scenarios of which there are several in the rulebook.  Generally speaking the human characters are attempting to complete a task (e.g. escape the catacombs, close a portal) while the demons are focused on stopping them.  There are varying win conditions depending on the scenario chosen.&amp;#10;&amp;#10;</description>
        <yearpublished value="2009" />
        <minplayers value="2" />
        <maxplayers value="2" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="103">
            <results numplayers="1">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="10" />
                <result value="Not Recommended" numvotes="53" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="94" />
                <result value="Recommended" numvotes="9" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2+">
                <result value="Best" numvotes="2" />
                <result value="Recommended" numvotes="9" />
                <result value="Not Recommended" numvotes="57" />
            </results>
        </poll>
        <playingtime value="45" />
        <minplaytime value="45" />
        <maxplaytime value="45" />
        <minage value="14" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="50">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="1" />
                <result value="8" numvotes="3" />
                <result value="10" numvotes="16" />
                <result value="12" numvotes="25" />
                <result value="14" numvotes="5" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="48">
            <results>
                <result level="6" value="No necessary in-game text" numvotes="0" />
                <result level="7" value="Some necessary text - easily memorized or small crib sheet" numvotes="7" />
                <result level="8" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="35" />
                <result level="9" value="Extensive use of text - massive conversion needed to be playable" numvotes="6" />
                <result level="10" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1024" value="Horror" />
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamecategory" id="1047" value="Miniatures" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgameexpansion" id="100527" value="Claustrophobia: De Profundis" />
        <link type="boardgameexpansion" id="162409" value="Claustrophobia: Furor Sanguinis" />
        <link type="boardgamedesigner" id="4094" value="Croc" />
        <link type="boardgameartist" id="21070" value="Bertrand Benoit" />
        <link type="boardgameartist" id="14417" value="Aleksi Briclot" />
        <link type="boardgameartist" id="12402" value="Stéphane Gantiez" />
        <link type="boardgamepublisher" id="157" value="Asmodee" />
        <link type="boardgamepublisher" id="7466" value="REBEL.pl" />
        <statistics page="1">
            <ratings >
                <usersrated value="5713" />
                <average value="7.60581" />
                <bayesaverage value="7.27322" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="156" bayesaverage="7.27322" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="40" bayesaverage="7.36586" />
                </ranks>
                <stddev value="1.36512" />
                <median value="0" />
                <owned value="8201" />
                <trading value="234" />
                <wanting value="596" />
                <wishing value="3073" />
                <numcomments value="1497" />
                <numweights value="419" />
                <averageweight value="2.4893" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="1339">
        <thumbnail>https://cf.geekdo-images.com/images/pic1998857_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic1998857.jpg</image>
        <name type="primary" sortindex="1" value="Dungeon!" />
        <name type="alternate" sortindex="1" value="Calabozo" />
        <name type="alternate" sortindex="1" value="Dungeon Fantasy Boardgame" />
        <name type="alternate" sortindex="1" value="Im Drachen-Labyrinth" />
        <name type="alternate" sortindex="1" value="Verlies" />
        <description>In many ways Dungeon! is similar to Dungeons &amp;amp; Dragons, although much simplified and transformed into a board game. Players explore a dungeon that is divided into levels of increasing difficulty, fighting monsters for valuable treasure. As players venture deeper into the dungeon, the monsters become more difficult and the treasure more valuable. Several character classes each have slightly different fighting abilities &amp;ndash; most notably the wizard, who can cast spells. Combat is simulated using dice; players roll the dice to attack a monster, and if unsuccessful, the dice are rolled to determine the effect of the monster's counter-attack.&amp;#10;&amp;#10;The winner is the first player to bring a certain amount of treasure back to the Dungeon's entrance.&amp;#10;&amp;#10;Reimplemented by:&amp;#10;&amp;#10;&amp;#10;    The Classic Dungeon&amp;#10;    The New Dungeon&amp;#10;&amp;#10;&amp;#10;</description>
        <yearpublished value="1975" />
        <minplayers value="1" />
        <maxplayers value="8" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="28">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="6" />
                <result value="Not Recommended" numvotes="12" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="12" />
                <result value="Not Recommended" numvotes="9" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="4" />
                <result value="Recommended" numvotes="16" />
                <result value="Not Recommended" numvotes="2" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="18" />
                <result value="Recommended" numvotes="7" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="13" />
                <result value="Recommended" numvotes="6" />
                <result value="Not Recommended" numvotes="3" />
            </results>
            <results numplayers="6">
                <result value="Best" numvotes="5" />
                <result value="Recommended" numvotes="5" />
                <result value="Not Recommended" numvotes="5" />
            </results>
            <results numplayers="7">
                <result value="Best" numvotes="2" />
                <result value="Recommended" numvotes="6" />
                <result value="Not Recommended" numvotes="8" />
            </results>
            <results numplayers="8">
                <result value="Best" numvotes="2" />
                <result value="Recommended" numvotes="6" />
                <result value="Not Recommended" numvotes="7" />
            </results>
            <results numplayers="8+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="11" />
            </results>
        </poll>
        <playingtime value="30" />
        <minplaytime value="30" />
        <maxplaytime value="30" />
        <minage value="8" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="32">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="4" />
                <result value="5" numvotes="6" />
                <result value="6" numvotes="11" />
                <result value="8" numvotes="9" />
                <result value="10" numvotes="2" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="13">
            <results>
                <result level="1" value="No necessary in-game text" numvotes="1" />
                <result level="2" value="Some necessary text - easily memorized or small crib sheet" numvotes="11" />
                <result level="3" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="1" />
                <result level="4" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="5" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="7005" value="Animals: Dragons" />
        <link type="boardgamefamily" id="7307" value="Dungeons &amp; Dragons" />
        <link type="boardgameimplementation" id="1370" value="The Classic Dungeon" />
        <link type="boardgameimplementation" id="2301" value="The New Dungeon!" />
        <link type="boardgameimplementation" id="135672" value="Star Wars: El Imperio Contraataca" />
        <link type="boardgamedesigner" id="23355" value="Chris Dupuis" />
        <link type="boardgamedesigner" id="287" value="Michael Gray" />
        <link type="boardgamedesigner" id="561" value="Gary Gygax" />
        <link type="boardgamedesigner" id="35460" value="Larry Kessling" />
        <link type="boardgamedesigner" id="574" value="David R. Megarry" />
        <link type="boardgamedesigner" id="452" value="S. Schwab" />
        <link type="boardgamedesigner" id="562" value="Steve Winter" />
        <link type="boardgameartist" id="14508" value="Daniel Gelon" />
        <link type="boardgameartist" id="35461" value="Keith Hill" />
        <link type="boardgameartist" id="35462" value="Richard Hill" />
        <link type="boardgameartist" id="11998" value="James Holloway" />
        <link type="boardgameartist" id="35460" value="Larry Kessling" />
        <link type="boardgameartist" id="12534" value="Michael Komarck" />
        <link type="boardgameartist" id="17899" value="Tracy Lesch" />
        <link type="boardgameartist" id="37518" value="Victoria Maderna" />
        <link type="boardgameartist" id="13540" value="Erol Otus" />
        <link type="boardgameartist" id="13531" value="Harry Quinn" />
        <link type="boardgameartist" id="13528" value="Jim Roslof" />
        <link type="boardgameartist" id="13765" value="Stephen Sullivan" />
        <link type="boardgameartist" id="11883" value="Franz Vohwinkel" />
        <link type="boardgamepublisher" id="74" value="ASS Altenburger Spielkarten" />
        <link type="boardgamepublisher" id="1338" value="Jedko Games" />
        <link type="boardgamepublisher" id="26547" value="Novedades Montecarlo" />
        <link type="boardgamepublisher" id="28" value="Parker Brothers" />
        <link type="boardgamepublisher" id="16" value="TSR" />
        <link type="boardgamepublisher" id="13" value="Wizards of the Coast" />
        <statistics page="1">
            <ratings >
                <usersrated value="2775" />
                <average value="5.93458" />
                <bayesaverage value="5.75301" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="3314" bayesaverage="5.75301" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="628" bayesaverage="5.71343" />
                    <rank type="family" id="5499" name="familygames" friendlyname="Family Game Rank" value="1066" bayesaverage="5.70762" />
                </ranks>
                <stddev value="1.45131" />
                <median value="0" />
                <owned value="5665" />
                <trading value="222" />
                <wanting value="62" />
                <wishing value="358" />
                <numcomments value="1021" />
                <numweights value="275" />
                <averageweight value="1.5745" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="6366">
        <thumbnail>https://cf.geekdo-images.com/images/pic681985_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic681985.jpg</image>
        <name type="primary" sortindex="1" value="Dungeons &amp; Dragons: The Fantasy Adventure Board Game" />
        <name type="alternate" sortindex="1" value="Dungeons &amp; Dragons Brettspiel" />
        <name type="alternate" sortindex="1" value="Dungeons &amp; Dragons Fantasy in een spannend bordspel" />
        <name type="alternate" sortindex="1" value="Dungeons &amp; Dragons Un&#039;Avventura Fantasy" />
        <name type="alternate" sortindex="1" value="Dungeons &amp; Dragons Επιτραπεζιο Παιχνιδι Φαντασιας" />
        <name type="alternate" sortindex="1" value="Dungeons &amp; Dragons, le jeu de plateau" />
        <name type="alternate" sortindex="1" value="Dungeons &amp; Dragons: Das Fantasy Abenteuerspiel" />
        <name type="alternate" sortindex="1" value="Dungeons &amp; Dragons: La aventura fantástica – El juego de mesa" />
        <description>A cooperative dungeon crawl game in which a party of four heroes strives to complete adventures that the Dungeon Master puts before them.  Quite similar to HeroQuest.&amp;#10;&amp;#10;Expanded by:&amp;#10;&amp;#10;Eternal Winter Expansion Pack(2003)&amp;#10;&amp;#10;Forbidden Forest Expansion Pack(2004)&amp;#10;&amp;#10;</description>
        <yearpublished value="2003" />
        <minplayers value="2" />
        <maxplayers value="5" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="31">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="20" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="15" />
                <result value="Not Recommended" numvotes="7" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="6" />
                <result value="Recommended" numvotes="18" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="4" />
                <result value="Recommended" numvotes="16" />
                <result value="Not Recommended" numvotes="5" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="23" />
                <result value="Recommended" numvotes="5" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="5+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="2" />
                <result value="Not Recommended" numvotes="14" />
            </results>
        </poll>
        <playingtime value="60" />
        <minplaytime value="60" />
        <maxplaytime value="60" />
        <minage value="10" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="19">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="1" />
                <result value="6" numvotes="1" />
                <result value="8" numvotes="8" />
                <result value="10" numvotes="5" />
                <result value="12" numvotes="3" />
                <result value="14" numvotes="1" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="18">
            <results>
                <result level="6" value="No necessary in-game text" numvotes="0" />
                <result level="7" value="Some necessary text - easily memorized or small crib sheet" numvotes="3" />
                <result level="8" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="5" />
                <result level="9" value="Extensive use of text - massive conversion needed to be playable" numvotes="10" />
                <result level="10" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamemechanic" id="2023" value="Co-operative Play" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="22783" value="Admin: Better Description Needed!" />
        <link type="boardgamefamily" id="24281" value="Campaign Games" />
        <link type="boardgamefamily" id="7307" value="Dungeons &amp; Dragons" />
        <link type="boardgamefamily" id="7757" value="From RPG books to board games" />
        <link type="boardgameexpansion" id="8874" value="Dungeons &amp; Dragons: The Fantasy Adventure Board Game – Eternal Winter Expansion Pack" />
        <link type="boardgameexpansion" id="16138" value="Dungeons &amp; Dragons: The Fantasy Adventure Board Game – Forbidden Forest Expansion Pack" />
        <link type="boardgamedesigner" id="3864" value="Amanda Birkinshaw" />
        <link type="boardgamedesigner" id="64856" value="Barry Yearsley" />
        <link type="boardgamepublisher" id="51" value="Hasbro" />
        <link type="boardgamepublisher" id="28" value="Parker Brothers" />
        <link type="boardgamepublisher" id="4653" value="Parker Spiele" />
        <link type="boardgamepublisher" id="13" value="Wizards of the Coast" />
        <statistics page="1">
            <ratings >
                <usersrated value="1359" />
                <average value="6.50499" />
                <bayesaverage value="6.00266" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="1985" bayesaverage="6.00266" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="389" bayesaverage="6.09447" />
                </ranks>
                <stddev value="1.43507" />
                <median value="0" />
                <owned value="2774" />
                <trading value="99" />
                <wanting value="127" />
                <wishing value="307" />
                <numcomments value="409" />
                <numweights value="139" />
                <averageweight value="2.1727" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="1149">
        <thumbnail>https://cf.geekdo-images.com/images/pic897658_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic897658.jpg</image>
        <name type="primary" sortindex="1" value="Dragon Strike" />
        <description>Dragon Strike has similar game play to Milton Bradley's HeroQuest.&amp;#10;&amp;#10;One player acts as the &amp;quot;Dragon Master&amp;quot; (i.e., the DM) and controls the placement, movement, and action of the villains.  The rest of the players control one of five different hero types (Warrior, Wizard, Thief, Elf, or Dwarf) and attempt to complete various adventure goals.  Dragon Strike takes the HeroQuest game play and goes a step further in a few directions:&amp;#10;&amp;#10;1) The Wizard and Elf have more spells at their disposal and a greater variety to choose from,&amp;#10;&amp;#10;2) Dragon Strike comes with 4 different game boards (vs. HeroQuest's single board), one of which is outdoors,&amp;#10;&amp;#10;3) a slightly more advanced combat system which uses different polyhedral dice (instead of all six-siders) and has concepts like flying creatures which can only be hit with spells and missile weapons, and&amp;#10;&amp;#10;4) a (cheezy) 30 minute VHS video tape which introduces players to the game and sets the &amp;quot;mood&amp;quot; for playing.&amp;#10;&amp;#10;</description>
        <yearpublished value="1993" />
        <minplayers value="2" />
        <maxplayers value="6" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="13">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="8" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="5" />
                <result value="Not Recommended" numvotes="3" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="5" />
                <result value="Recommended" numvotes="5" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="7" />
                <result value="Recommended" numvotes="3" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="4" />
                <result value="Recommended" numvotes="6" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="6">
                <result value="Best" numvotes="4" />
                <result value="Recommended" numvotes="4" />
                <result value="Not Recommended" numvotes="2" />
            </results>
            <results numplayers="6+">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="5" />
            </results>
        </poll>
        <playingtime value="60" />
        <minplaytime value="60" />
        <maxplaytime value="60" />
        <minage value="10" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="7">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="3" />
                <result value="10" numvotes="4" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="5">
            <results>
                <result level="11" value="No necessary in-game text" numvotes="0" />
                <result level="12" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="13" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="4" />
                <result level="14" value="Extensive use of text - massive conversion needed to be playable" numvotes="1" />
                <result level="15" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamecategory" id="1047" value="Miniatures" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamemechanic" id="2663" value="Time Track" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="7005" value="Animals: Dragons" />
        <link type="boardgamedesigner" id="474" value="Bruce Nesmith" />
        <link type="boardgamepublisher" id="4680" value="Borras Plana S.A." />
        <link type="boardgamepublisher" id="16" value="TSR" />
        <statistics page="1">
            <ratings >
                <usersrated value="563" />
                <average value="6.15163" />
                <bayesaverage value="5.69364" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="3898" bayesaverage="5.69364" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="590" bayesaverage="5.77345" />
                </ranks>
                <stddev value="1.52172" />
                <median value="0" />
                <owned value="1405" />
                <trading value="136" />
                <wanting value="46" />
                <wishing value="132" />
                <numcomments value="283" />
                <numweights value="49" />
                <averageweight value="2.3265" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="160902">
        <thumbnail>https://cf.geekdo-images.com/images/pic2391607_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic2391607.jpg</image>
        <name type="primary" sortindex="1" value="Dungeons &amp; Dragons Dice Masters: Battle for Faerûn" />
        <description>Dungeons &amp;amp; Dragons Dice Masters: Battle for Faer&amp;ucirc;n is a game that utilizes WizKids Games' proprietary Dice Building Game platform in which two players take the role of warlords, collect and assemble their &amp;quot;party&amp;quot; of adventurer dice and battle in head-to-head gameplay.  Each turn, players roll the dice to see what resources they have available, buy dice, send their party members into the field, and then strike at the enemy warlord. There are multiple cards available for each type of die so players get to choose which one  to use. This lets players specialize dice to suit play style.&amp;#10;&amp;#10;Additional cards and dice to expand your collection can be found in expansion packs. Each Foil Pack contains two cards and two dice that players can add to their Dice Masters Battle for Faer&amp;ucirc;n collections. Players can create teams of their favorite fantasy characters from the Forgotten Realms universe. You can expect to see some of the most recognizable monsters and characters, such as Kobolds, Beholders, Mindflayers, Dragons, Drow, and many more!&amp;#10;&amp;#10;The Dungeons &amp;amp; Dragons Dice Masters line will consist of starter sets, booster packs, play mats, and a storage box.&amp;#10;&amp;#10;</description>
        <yearpublished value="2015" />
        <minplayers value="2" />
        <maxplayers value="2" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="15">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="9" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="14" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2+">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="2" />
                <result value="Not Recommended" numvotes="5" />
            </results>
        </poll>
        <playingtime value="0" />
        <minplaytime value="60" />
        <maxplaytime value="0" />
        <minage value="14" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="13">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="1" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="1" />
                <result value="10" numvotes="3" />
                <result value="12" numvotes="4" />
                <result value="14" numvotes="2" />
                <result value="16" numvotes="2" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="12">
            <results>
                <result level="6" value="No necessary in-game text" numvotes="0" />
                <result level="7" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="8" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="1" />
                <result level="9" value="Extensive use of text - massive conversion needed to be playable" numvotes="11" />
                <result level="10" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1044" value="Collectible Components" />
        <link type="boardgamecategory" id="1017" value="Dice" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamemechanic" id="2664" value="Deck / Pool Building" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="7005" value="Animals: Dragons" />
        <link type="boardgamefamily" id="6037" value="CDGs (Collectible Dice Games)" />
        <link type="boardgamefamily" id="25290" value="Dice Masters" />
        <link type="boardgamefamily" id="7307" value="Dungeons &amp; Dragons" />
        <link type="boardgamefamily" id="12425" value="Quarriors Pool Building system" />
        <link type="boardgameexpansion" id="202098" value="DC Comics Dice Masters: Batman" />
        <link type="boardgameexpansion" id="183482" value="Dungeons &amp; Dragons Dice Masters: Battle for Faerûn Minsc and Boo Promo Card" />
        <link type="boardgameexpansion" id="228674" value="Dungeons &amp; Dragons Dice Masters: Tomb of Annihilation" />
        <link type="boardgameexpansion" id="223601" value="Marvel Dice Masters: Spider-Man Maximum Carnage Team Pack" />
        <link type="boardgameexpansion" id="225643" value="Marvel Dice Masters: The Mighty Thor" />
        <link type="boardgameintegration" id="198619" value="DC Comics Dice Masters: Green Arrow and The Flash" />
        <link type="boardgameintegration" id="229132" value="DC Comics Dice Masters: Harley Quinn Starter Set" />
        <link type="boardgameintegration" id="138649" value="DC Comics Dice Masters: Justice League" />
        <link type="boardgameintegration" id="186772" value="DC Comics Dice Masters: Justice League – Collector's Box" />
        <link type="boardgameintegration" id="173294" value="DC Comics Dice Masters: War of Light" />
        <link type="boardgameintegration" id="219985" value="DC Comics Dice Masters: War of Light – Collector's Box" />
        <link type="boardgameintegration" id="182770" value="DC Comics Dice Masters: World's Finest" />
        <link type="boardgameintegration" id="183572" value="Dungeons &amp; Dragons Dice Masters: Faerûn Under Siege" />
        <link type="boardgameintegration" id="168998" value="Marvel Dice Masters: Age of Ultron" />
        <link type="boardgameintegration" id="148575" value="Marvel Dice Masters: Avengers vs. X-Men" />
        <link type="boardgameintegration" id="186775" value="Marvel Dice Masters: Avengers vs. X-Men – Set Up Box" />
        <link type="boardgameintegration" id="187353" value="Marvel Dice Masters: Civil War" />
        <link type="boardgameintegration" id="198620" value="Marvel Dice Masters: Deadpool" />
        <link type="boardgameintegration" id="198618" value="Marvel Dice Masters: Doctor Strange Team Pack" />
        <link type="boardgameintegration" id="202096" value="Marvel Dice Masters: Iron Man and War Machine Starter Set" />
        <link type="boardgameintegration" id="177939" value="Marvel Dice Masters: The Amazing Spider-Man" />
        <link type="boardgameintegration" id="208917" value="Marvel Dice Masters: The Defenders Team Pack" />
        <link type="boardgameintegration" id="186773" value="Marvel Dice Masters: The Uncanny X-Men – Collector's Box" />
        <link type="boardgameintegration" id="158275" value="Marvel Dice Masters: Uncanny X-Men" />
        <link type="boardgameintegration" id="214817" value="Marvel Dice Masters: X-Men First Class" />
        <link type="boardgameintegration" id="191579" value="Teenage Mutant Ninja Turtles Dice Masters" />
        <link type="boardgameintegration" id="217471" value="Teenage Mutant Ninja Turtles Dice Masters: Heroes in a Half Shell" />
        <link type="boardgameintegration" id="147363" value="Yu-Gi-Oh! Dice Masters" />
        <link type="boardgameimplementation" id="91536" value="Quarriors!" inbound="true"/>
        <link type="boardgamedesigner" id="615" value="Mike Elliott" />
        <link type="boardgamedesigner" id="1533" value="Eric M. Lang" />
        <link type="boardgamepublisher" id="221" value="WizKids" />
        <statistics page="1">
            <ratings >
                <usersrated value="1193" />
                <average value="7.45059" />
                <bayesaverage value="6.57374" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="742" bayesaverage="6.57374" />
                    <rank type="family" id="4667" name="cgs" friendlyname="Customizable Rank" value="23" bayesaverage="7.19516" />
                </ranks>
                <stddev value="1.39499" />
                <median value="0" />
                <owned value="3167" />
                <trading value="145" />
                <wanting value="52" />
                <wishing value="184" />
                <numcomments value="275" />
                <numweights value="53" />
                <averageweight value="2.1321" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="156548">
        <thumbnail>https://cf.geekdo-images.com/images/pic2308707_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic2308707.jpg</image>
        <name type="primary" sortindex="1" value="Super Dungeon Explore: Forgotten King" />
        <name type="alternate" sortindex="1" value="Super Dungeon Explore: Der Vergessene König Miniaturenspiel" />
        <name type="alternate" sortindex="1" value="Super Dungeon Explore: El Rey Olvidado" />
        <name type="alternate" sortindex="1" value="Super Dungeon Explore: Le Roi Oublié" />
        <description>Princess Emerald and her companions are questing deep into the Lordship Ruins to confront the evil that resides there. Brooding from his darkened hallways, the Forgotten King is a cursed lord who has pledged himself to the service of the Dark Consul, darkening his once lush and verdant lands. At his side are two new mini-bosses: Trent, a towering guardian of the forest with thick bark and brambles for armor, and Boris, a raging brute with snarling ursine features.&amp;#10;&amp;#10;In Super Dungeon Explore: Forgotten King, players explore the Fae Wood, home of the Kodama, sentient forest spirits with a taste for adventuring Heroes. Wisps lure Heroes into ensnaring traps as terrifying, man-eating plants sprout from the loamy forest floor to devour them. Continue into the Lordship Ruins where the once proud bramble knights, now corrupted and twisted into servants of the Dark Consul, stalk the stony ruins for any who would defile their lord's holdfast. Don't get too close to the trees, though, as we hear the squirrels are in an ill mood.&amp;#10;&amp;#10;Super Dungeon Explore: Forgotten King includes five new Heroes to brave the depths, including the Thundervale Huntress, Fae Alchemist, Royal Warden, and the brave Questing Knight. Each lend a new dynamic to gameplay and your strategy to conquer the Forgotten King and his minions.&amp;#10;&amp;#10;Forgotten King contains two play modes: Classic Mode, in which someone controls the dungeon and its monsters while everyone else takes the roles of the plucky heroes, or Arcade Mode, which allows for a fully co-operative game for up to five players.&amp;#10;&amp;#10;Forgotten King, while itself a standalone game, is compatible with all previously published Super Dungeon Explore expansions and supplements.&amp;#10;&amp;#10;</description>
        <yearpublished value="2015" />
        <minplayers value="1" />
        <maxplayers value="6" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="20">
            <results numplayers="1">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="6" />
                <result value="Not Recommended" numvotes="4" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="4" />
                <result value="Recommended" numvotes="7" />
                <result value="Not Recommended" numvotes="3" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="6" />
                <result value="Recommended" numvotes="7" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="8" />
                <result value="Recommended" numvotes="8" />
                <result value="Not Recommended" numvotes="2" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="6" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="6" />
            </results>
            <results numplayers="6">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="2" />
                <result value="Not Recommended" numvotes="7" />
            </results>
            <results numplayers="6+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="8" />
            </results>
        </poll>
        <playingtime value="120" />
        <minplaytime value="90" />
        <maxplaytime value="120" />
        <minage value="0" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="6">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="0" />
                <result value="10" numvotes="4" />
                <result value="12" numvotes="2" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="5">
            <results>
                <result level="6" value="No necessary in-game text" numvotes="1" />
                <result level="7" value="Some necessary text - easily memorized or small crib sheet" numvotes="3" />
                <result level="8" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="1" />
                <result level="9" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="10" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamecategory" id="1047" value="Miniatures" />
        <link type="boardgamemechanic" id="2001" value="Action Point Allowance System" />
        <link type="boardgamemechanic" id="2023" value="Co-operative Play" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamemechanic" id="2019" value="Partnerships" />
        <link type="boardgamemechanic" id="2079" value="Variable Phase Order" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="8374" value="Crowdfunding: Kickstarter" />
        <link type="boardgamefamily" id="27826" value="Super Dungeon Explore" />
        <link type="boardgameexpansion" id="219413" value="Super Dungeon Arena" />
        <link type="boardgameexpansion" id="187021" value="Super Dungeon Explore: Beatrix The Witch Queen" />
        <link type="boardgameexpansion" id="192953" value="Super Dungeon Explore: Boo Booty Box" />
        <link type="boardgameexpansion" id="181362" value="Super Dungeon Explore: Brave-Mode Candy" />
        <link type="boardgameexpansion" id="130297" value="Super Dungeon Explore: Calico Kate" />
        <link type="boardgameexpansion" id="117753" value="Super Dungeon Explore: Candy and Cola" />
        <link type="boardgameexpansion" id="152376" value="Super Dungeon Explore: Captain R" />
        <link type="boardgameexpansion" id="124322" value="Super Dungeon Explore: Caverns of Roxor" />
        <link type="boardgameexpansion" id="180082" value="Super Dungeon Explore: Claws of the Wyrm Warband" />
        <link type="boardgameexpansion" id="187871" value="Super Dungeon Explore: Crown Guard" />
        <link type="boardgameexpansion" id="180946" value="Super Dungeon Explore: Deeproot Wolf Rider" />
        <link type="boardgameexpansion" id="129598" value="Super Dungeon Explore: Dragon's Clutch" />
        <link type="boardgameexpansion" id="180084" value="Super Dungeon Explore: Dungeons of Crystalia Tile Pack" />
        <link type="boardgameexpansion" id="180083" value="Super Dungeon Explore: Emerald Valley Warband" />
        <link type="boardgameexpansion" id="124558" value="Super Dungeon Explore: Fireflow Denizens" />
        <link type="boardgameexpansion" id="175474" value="Super Dungeon Explore: Forgotten King – Upgrade Deck" />
        <link type="boardgameexpansion" id="187870" value="Super Dungeon Explore: Frostbyte Ravagers" />
        <link type="boardgameexpansion" id="180945" value="Super Dungeon Explore: Goro" />
        <link type="boardgameexpansion" id="124566" value="Super Dungeon Explore: Herald of Vulcanis" />
        <link type="boardgameexpansion" id="186975" value="Super Dungeon Explore: Jack Scarecrow" />
        <link type="boardgameexpansion" id="156337" value="Super Dungeon Explore: Kaelly the Nether Strider" />
        <link type="boardgameexpansion" id="130926" value="Super Dungeon Explore: Kasaro To" />
        <link type="boardgameexpansion" id="155671" value="Super Dungeon Explore: King Starfire" />
        <link type="boardgameexpansion" id="130927" value="Super Dungeon Explore: Kisa" />
        <link type="boardgameexpansion" id="181601" value="Super Dungeon Explore: Kunoichi Candy" />
        <link type="boardgameexpansion" id="186831" value="Super Dungeon Explore: Legends" />
        <link type="boardgameexpansion" id="171712" value="Super Dungeon Explore: Mistmourn Coast Warband" />
        <link type="boardgameexpansion" id="146628" value="Super Dungeon Explore: Nyan Nyan" />
        <link type="boardgameexpansion" id="130925" value="Super Dungeon Explore: One Shot" />
        <link type="boardgameexpansion" id="130296" value="Super Dungeon Explore: Princess Malya" />
        <link type="boardgameexpansion" id="182058" value="Super Dungeon Explore: PvP Arena" />
        <link type="boardgameexpansion" id="124556" value="Super Dungeon Explore: Rock Top Gang" />
        <link type="boardgameexpansion" id="130928" value="Super Dungeon Explore: Sebastian Cross" />
        <link type="boardgameexpansion" id="171560" value="Super Dungeon Explore: Ser Snapjaw" />
        <link type="boardgameexpansion" id="181572" value="Super Dungeon Explore: Shadow-Mode Candy" />
        <link type="boardgameexpansion" id="180947" value="Super Dungeon Explore: Stilt Town Zombies Warband" />
        <link type="boardgameexpansion" id="138769" value="Super Dungeon Explore: Succubus Vandella" />
        <link type="boardgameexpansion" id="209927" value="Super Dungeon Explore: Super Ninja Ambush!" />
        <link type="boardgameexpansion" id="180948" value="Super Dungeon Explore: Tabbybrook Mage" />
        <link type="boardgameexpansion" id="187872" value="Super Dungeon Explore: The Midnight Tower" />
        <link type="boardgameexpansion" id="180949" value="Super Dungeon Explore: Twilight Knight" />
        <link type="boardgameexpansion" id="180085" value="Super Dungeon Explore: Von Drakk Ghost House Tile Pack" />
        <link type="boardgameexpansion" id="138094" value="Super Dungeon Explore: Von Drakk Manor Level" />
        <link type="boardgameexpansion" id="181599" value="Super Dungeon Explore: Wandering Minstrel" />
        <link type="boardgameexpansion" id="230799" value="Testudo Tower" />
        <link type="boardgameintegration" id="92190" value="Super Dungeon Explore" />
        <link type="boardgamedesigner" id="44784" value="Chris Birkenhagen" />
        <link type="boardgamedesigner" id="30506" value="John Cadice" />
        <link type="boardgamedesigner" id="44785" value="Deke Stella" />
        <link type="boardgameartist" id="31508" value="Kris Aubin" />
        <link type="boardgameartist" id="44786" value="Elmer Damaso" />
        <link type="boardgameartist" id="44788" value="Ein Lee" />
        <link type="boardgamepublisher" id="2973" value="Edge Entertainment" />
        <link type="boardgamepublisher" id="264" value="Heidelberger Spieleverlag" />
        <link type="boardgamepublisher" id="27524" value="Ninja Division" />
        <link type="boardgamepublisher" id="14087" value="Soda Pop Miniatures" />
        <link type="boardgamepublisher" id="6174" value="Ulisses Spiele" />
        <statistics page="1">
            <ratings >
                <usersrated value="786" />
                <average value="7.34926" />
                <bayesaverage value="6.24581" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="1313" bayesaverage="6.24581" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="237" bayesaverage="6.47359" />
                    <rank type="family" id="5497" name="strategygames" friendlyname="Strategy Game Rank" value="708" bayesaverage="6.3074" />
                </ranks>
                <stddev value="1.53989" />
                <median value="0" />
                <owned value="2958" />
                <trading value="88" />
                <wanting value="54" />
                <wishing value="278" />
                <numcomments value="226" />
                <numweights value="40" />
                <averageweight value="3.125" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="144383">
        <thumbnail>https://cf.geekdo-images.com/images/pic2042613_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic2042613.jpg</image>
        <name type="primary" sortindex="1" value="Dungeon Dwellers" />
        <description>Dungeon Dwellers is a fantasy adventure card game that requires strategy, cooperation, and cunning. This game is recommended for 2-4 players. Each player will take on the role of an adventurer seeking gold. Along the way, adventurers will gain treasure, magic items, abilities, and level increases by defeating monsters within the dungeon. The winner will be the player who collects the most gold at the end of the game.&amp;#10;&amp;#10;To play, each player selects a Character (Rogue, Priest, Mage, and Fighter). All Characters have their own special ability, weapons, armor and item cards. Players will build a 30-card deck, also called the Energy Deck, with these cards.  The deck will be used to power abilities, do damage to monster and will also be used to gain additional treasure, in the form of gold cards, or items and abilities to put into active play.&amp;#10;&amp;#10;Players then take turns using their abilities and weapons to cause damage and collect experience points from monsters.  Players will use their energy deck throughout the game, but if they spend too much energy, they might not have enough to survive the final boss. Can your party work together and survive the dungeon or feel the agony of defeat. In the end there can be only one winner and that is the player with the most gold.&amp;#10;&amp;#10;</description>
        <yearpublished value="2014" />
        <minplayers value="2" />
        <maxplayers value="6" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="4">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="2" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="3" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="6">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="6+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="1" />
            </results>
        </poll>
        <playingtime value="60" />
        <minplaytime value="60" />
        <maxplaytime value="60" />
        <minage value="13" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="2">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="0" />
                <result value="10" numvotes="0" />
                <result value="12" numvotes="2" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="0">
            <results>
                <result level="31" value="No necessary in-game text" numvotes="0" />
                <result level="32" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="33" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="34" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="35" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1002" value="Card Game" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamemechanic" id="2023" value="Co-operative Play" />
        <link type="boardgamemechanic" id="2664" value="Deck / Pool Building" />
        <link type="boardgamefamily" id="8374" value="Crowdfunding: Kickstarter" />
        <link type="boardgameexpansion" id="175617" value="Dungeon Dwellers: Barbarian Expansion" />
        <link type="boardgamedesigner" id="69073" value="Scott Ostrander" />
        <link type="boardgameartist" id="73807" value="Jim Samartino" />
        <link type="boardgamepublisher" id="25431" value="S2 Adventures" />
        <statistics page="1">
            <ratings >
                <usersrated value="45" />
                <average value="6.50844" />
                <bayesaverage value="5.52156" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="9809" bayesaverage="5.52156" />
                </ranks>
                <stddev value="2.29214" />
                <median value="0" />
                <owned value="139" />
                <trading value="7" />
                <wanting value="3" />
                <wishing value="20" />
                <numcomments value="29" />
                <numweights value="7" />
                <averageweight value="2.7143" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="140951">
        <thumbnail>https://cf.geekdo-images.com/images/pic1647385_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic1647385.jpg</image>
        <name type="primary" sortindex="1" value="Thunderstone: Starter Set" />
        <name type="alternate" sortindex="1" value="Thunderstone Advance: Starter Set" />
        <name type="alternate" sortindex="1" value="Thunderstone: Dungeons, Monster, reiche Beute!" />
        <description>In the Thunderstone line of deck-building games, you build a party of heroes to defeat the dreaded Thunderstone Bearers in their dungeons or in the wilderness. As the game progresses, you gain powerful weaponry and level into new and mighty hero classes. Your goal is to claim the best cards and survive to take the Thunderstone.&amp;#10;&amp;#10;Thunderstone: Starter Set includes just enough for new players to get started in the world of Thunderstone Advance, while also providing new hero, monster and village cards that experienced players can bring to their game. This introductory set includes an easy set-up designed to get people started on the game in minutes.&amp;#10;&amp;#10;Integrates with&amp;#10;&amp;#10;&amp;#10;    Thunderstone&amp;#10;    Thunderstone Advance: Towers of Ruin&amp;#10;&amp;#10;&amp;#10;</description>
        <yearpublished value="2013" />
        <minplayers value="2" />
        <maxplayers value="5" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="5">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="3" />
                <result value="Not Recommended" numvotes="2" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="3" />
                <result value="Recommended" numvotes="2" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="4" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="4" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="4" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="5+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="4" />
            </results>
        </poll>
        <playingtime value="60" />
        <minplaytime value="45" />
        <maxplaytime value="60" />
        <minage value="12" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="3">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="0" />
                <result value="10" numvotes="1" />
                <result value="12" numvotes="2" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="3">
            <results>
                <result level="6" value="No necessary in-game text" numvotes="0" />
                <result level="7" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="8" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="3" />
                <result level="9" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="10" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1002" value="Card Game" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamemechanic" id="2041" value="Card Drafting" />
        <link type="boardgamemechanic" id="2664" value="Deck / Pool Building" />
        <link type="boardgamemechanic" id="2040" value="Hand Management" />
        <link type="boardgamefamily" id="5321" value="Thunderstone" />
        <link type="boardgamefamily" id="26097" value="Thunderstone Advance" />
        <link type="boardgameexpansion" id="122967" value="Thunderstone Advance: Caverns of Bane" />
        <link type="boardgameexpansion" id="158727" value="Thunderstone Advance: Into the Abyss" />
        <link type="boardgameexpansion" id="131306" value="Thunderstone Advance: Root of Corruption" />
        <link type="boardgameexpansion" id="121007" value="Thunderstone Avatars" />
        <link type="boardgameintegration" id="116998" value="Thunderstone Advance: Towers of Ruin" />
        <link type="boardgameintegration" id="152765" value="Thunderstone Advance: Worlds Collide" />
        <link type="boardgameimplementation" id="53953" value="Thunderstone" inbound="true"/>
        <link type="boardgameimplementation" id="116998" value="Thunderstone Advance: Towers of Ruin" inbound="true"/>
        <link type="boardgamedesigner" id="75534" value="Curt Crane" />
        <link type="boardgamedesigner" id="615" value="Mike Elliott" />
        <link type="boardgamedesigner" id="8480" value="Jeff Quick" />
        <link type="boardgameartist" id="26009" value="Christine Conrad" />
        <link type="boardgamepublisher" id="396" value="Alderac Entertainment Group (AEG)" />
        <link type="boardgamepublisher" id="39" value="Pegasus Spiele" />
        <statistics page="1">
            <ratings >
                <usersrated value="724" />
                <average value="7.04488" />
                <bayesaverage value="6.15576" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="1527" bayesaverage="6.15576" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="280" bayesaverage="6.37416" />
                    <rank type="family" id="5497" name="strategygames" friendlyname="Strategy Game Rank" value="753" bayesaverage="6.25456" />
                </ranks>
                <stddev value="1.29173" />
                <median value="0" />
                <owned value="1820" />
                <trading value="78" />
                <wanting value="62" />
                <wishing value="230" />
                <numcomments value="150" />
                <numweights value="28" />
                <averageweight value="2.2857" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="11177">
        <thumbnail>https://cf.geekdo-images.com/images/pic202577_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic202577.jpg</image>
        <name type="primary" sortindex="1" value="Cardmaster: Adventure Design Deck" />
        <description>This game can be loosely used as a role-playing aid or as a really basic dungeon-romp for several players.  The basic mechanic is building a dungeon by use cards and defeating monsters for their treasure.  The game comes with a couple basic &amp;quot;quests&amp;quot;, but most of the replayability is left up to the owner.&amp;#10;&amp;#10;There are three decks of cards present:&amp;#10;- The Location deck consists of corridors and rooms that are used to assemble to actual dungeon during play.&amp;#10;- The Monster deck is drawn from to determine possible encounters.  Traps are possible.&amp;#10;- The Treasure deck is used to give out booty to adventurers that defeat monsters.  Traps are possible here, as well.&amp;#10;&amp;#10;The game is very simplistic and could easily be developed into something much more advanced, but it is rather fun and can easily be played solitaire.&amp;#10;&amp;#10;</description>
        <yearpublished value="1993" />
        <minplayers value="1" />
        <maxplayers value="4" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="2">
            <results numplayers="1">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="1" />
            </results>
        </poll>
        <playingtime value="60" />
        <minplaytime value="60" />
        <maxplaytime value="60" />
        <minage value="8" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="0">
	</poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="1">
            <results>
                <result level="86" value="No necessary in-game text" numvotes="0" />
                <result level="87" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="88" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="1" />
                <result level="89" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="90" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamemechanic" id="2023" value="Co-operative Play" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamefamily" id="7307" value="Dungeons &amp; Dragons" />
        <link type="boardgamedesigner" id="25" value="Richard Borg" />
        <link type="boardgamepublisher" id="16" value="TSR" />
        <statistics page="1">
            <ratings >
                <usersrated value="41" />
                <average value="5.84146" />
                <bayesaverage value="5.51032" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="10597" bayesaverage="5.51032" />
                </ranks>
                <stddev value="1.7753" />
                <median value="0" />
                <owned value="125" />
                <trading value="12" />
                <wanting value="10" />
                <wishing value="26" />
                <numcomments value="19" />
                <numweights value="3" />
                <averageweight value="1.3333" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="127398">
        <thumbnail>https://cf.geekdo-images.com/images/pic2606106_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic2606106.jpg</image>
        <name type="primary" sortindex="1" value="Legends of Andor" />
        <name type="alternate" sortindex="1" value="Andor" />
        <name type="alternate" sortindex="1" value="Andor legendái" />
        <name type="alternate" sortindex="1" value="Andor: dobrodružné legendy" />
        <name type="alternate" sortindex="4" value="De Legenden van Andor" />
        <name type="alternate" sortindex="5" value="Die Legenden von Andor" />
        <name type="alternate" sortindex="1" value="Legendy krainy Andor" />
        <name type="alternate" sortindex="4" value="Le Leggende di Andor" />
        <name type="alternate" sortindex="4" value="As Lendas de Andor" />
        <name type="alternate" sortindex="5" value="Las Leyendas de Andor" />
        <name type="alternate" sortindex="1" value="Θρύλοι της Άντορ" />
        <name type="alternate" sortindex="1" value="Андор" />
        <name type="alternate" sortindex="1" value="Легендите на Андор" />
        <name type="alternate" sortindex="1" value="アンドールの伝説" />
        <description>Game description from the publisher:&amp;#10;&amp;#10;Legends of Andor is a cooperative adventure board game for two to four players in which a band of heroes must work together to defend a fantasy realm from invading hordes. To secure Andor's borders, the heroes will embark on dangerous quests over the course of five unique scenarios (as well as a final scenario created by the players themselves). But as the clever game system keeps creatures on the march toward the castle, the players must balance their priorities carefully.&amp;#10;&amp;#10;At the heart of Legends of Andor is its unique narrative, the linked scenarios of which tell an overarching story as the players successfully complete objectives. For each scenario, or &amp;quot;Legend&amp;quot;, a legend deck conveys the plot of an ever-unfolding tale...one in which the players are the protagonists. A wooden marker moves along the board's legend track at key points during each scenario, triggering the draw of a new legend card, the introduction of new game-altering effects, and the advancement of the story's plot. In the end, the players must endeavor to guide the fate of Andor through their heroic actions, bringing a happy ending to their epic fantasy tale.&amp;#10;&amp;#10;Will their heroes roam the land completing quests in the name of glory, or devote themselves to the defense of the realm? Uncover epic tales of glory as you live the Legends of Andor!&amp;#10;&amp;#10;</description>
        <yearpublished value="2012" />
        <minplayers value="2" />
        <maxplayers value="4" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="176">
            <results numplayers="1">
                <result value="Best" numvotes="13" />
                <result value="Recommended" numvotes="67" />
                <result value="Not Recommended" numvotes="29" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="19" />
                <result value="Recommended" numvotes="100" />
                <result value="Not Recommended" numvotes="8" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="30" />
                <result value="Recommended" numvotes="87" />
                <result value="Not Recommended" numvotes="7" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="115" />
                <result value="Recommended" numvotes="27" />
                <result value="Not Recommended" numvotes="5" />
            </results>
            <results numplayers="4+">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="7" />
                <result value="Not Recommended" numvotes="47" />
            </results>
        </poll>
        <playingtime value="90" />
        <minplaytime value="60" />
        <maxplaytime value="90" />
        <minage value="10" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="76">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="1" />
                <result value="5" numvotes="1" />
                <result value="6" numvotes="6" />
                <result value="8" numvotes="24" />
                <result value="10" numvotes="26" />
                <result value="12" numvotes="13" />
                <result value="14" numvotes="4" />
                <result value="16" numvotes="1" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="63">
            <results>
                <result level="11" value="No necessary in-game text" numvotes="0" />
                <result level="12" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="13" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="4" />
                <result level="14" value="Extensive use of text - massive conversion needed to be playable" numvotes="53" />
                <result level="15" value="Unplayable in another language" numvotes="6" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamecategory" id="1028" value="Puzzle" />
        <link type="boardgamemechanic" id="2046" value="Area Movement" />
        <link type="boardgamemechanic" id="2023" value="Co-operative Play" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="24281" value="Campaign Games" />
        <link type="boardgamefamily" id="24565" value="Legends of Andor" />
        <link type="boardgameexpansion" id="155108" value="Andor: Les Présents de l'Arbre des Chants" />
        <link type="boardgameexpansion" id="208986" value="Die Legenden von Andor: Die Rückkehr" />
        <link type="boardgameexpansion" id="228673" value="Die Legende von Andor: Die Bonus-Box" />
        <link type="boardgameexpansion" id="139604" value="Die Legenden von Andor: Das letzte Lagerfeuer" />
        <link type="boardgameexpansion" id="163327" value="Die Legenden von Andor: Der Kampf um Cavern" />
        <link type="boardgameexpansion" id="191889" value="Die Legenden von Andor: Der Unbekannte Krieger" />
        <link type="boardgameexpansion" id="175925" value="Die Legenden von Andor: Die Jagd" />
        <link type="boardgameexpansion" id="186149" value="Die Legenden von Andor: Die Taverne von Andor" />
        <link type="boardgameexpansion" id="149981" value="Die Legenden von Andor: Die Wunschbrunnen" />
        <link type="boardgameexpansion" id="188996" value="Die Legenden von Andor: Koram, der Gor-Häuptling" />
        <link type="boardgameexpansion" id="132441" value="Legends of Andor: Call of the Skrals" />
        <link type="boardgameexpansion" id="202175" value="Legends of Andor: Dark Heroes" />
        <link type="boardgameexpansion" id="156318" value="Legends of Andor: Journey to the North" />
        <link type="boardgameexpansion" id="132834" value="Legends of Andor: Liberating the Mine" />
        <link type="boardgameexpansion" id="151825" value="Legends of Andor: New Heroes" />
        <link type="boardgameexpansion" id="217521" value="Legends of Andor: Tavern Turmoil" />
        <link type="boardgameexpansion" id="141018" value="Legends of Andor: The King's Escort" />
        <link type="boardgameexpansion" id="136986" value="Legends of Andor: The Star Shield" />
        <link type="boardgameexpansion" id="143988" value="Legends of Andor: The Stranger" />
        <link type="boardgameexpansion" id="132422" value="Legends of Andor: Wolf Warrior" />
        <link type="boardgameexpansion" id="150810" value="Las Leyendas de Andor: Los Héroes de Córdoba" />
        <link type="boardgameintegration" id="198287" value="Legends of Andor: The Last Hope" />
        <link type="boardgamedesigner" id="11825" value="Michael Menzel" />
        <link type="boardgameartist" id="26874" value="Michaela Kienle" />
        <link type="boardgameartist" id="11825" value="Michael Menzel" />
        <link type="boardgamepublisher" id="37" value="KOSMOS" />
        <link type="boardgamepublisher" id="267" value="999 Games" />
        <link type="boardgamepublisher" id="4304" value="Albi" />
        <link type="boardgamepublisher" id="3475" value="Arclight" />
        <link type="boardgamepublisher" id="2366" value="Devir" />
        <link type="boardgamepublisher" id="22560" value="Fantasmagoria" />
        <link type="boardgamepublisher" id="17" value="Fantasy Flight Games" />
        <link type="boardgamepublisher" id="4617" value="Galakta" />
        <link type="boardgamepublisher" id="5530" value="Giochi Uniti" />
        <link type="boardgamepublisher" id="8923" value="IELLO" />
        <link type="boardgamepublisher" id="6214" value="Kaissa Chess &amp; Games" />
        <link type="boardgamepublisher" id="22" value="Piatnik" />
        <link type="boardgamepublisher" id="1466" value="Zvezda" />
        <statistics page="1">
            <ratings >
                <usersrated value="8198" />
                <average value="7.33021" />
                <bayesaverage value="7.09364" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="257" bayesaverage="7.09364" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="87" bayesaverage="7.1027" />
                </ranks>
                <stddev value="1.41458" />
                <median value="0" />
                <owned value="13813" />
                <trading value="341" />
                <wanting value="615" />
                <wishing value="2866" />
                <numcomments value="1611" />
                <numweights value="479" />
                <averageweight value="2.7557" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="98527">
        <thumbnail>https://cf.geekdo-images.com/images/pic3596584_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic3596584.jpg</image>
        <name type="primary" sortindex="1" value="Gloom of Kilforth: A Fantasy Quest Game" />
        <name type="alternate" sortindex="1" value="Fantasy Quest" />
        <description>The land of Kilforth is a perilous domain filled with nefarious monsters, mysterious Strangers and treacherous Locations, and dominated at its centre by The Sprawl, a huge city where intrepid Heroes begin their journey to fame and fortune. Throughout the land various factions vie for power over each other, such as the supposedly noble Order of the Rose or the terrifying Doom Guard. And presiding over the world outside Kilforth is the ever-present Overlord, Masklaw. Over the coming month, a deadly Gloom will descend upon Kilforth,which the Heroes must Battle through to prove their worth, defeat an Ancient evil, and save the land from darkness.&amp;#10; Gloom of Kilforth is a card game of high fantasy with a Gothic edge, playable in 1-3 hours, where 1-4 players, working individually or together, must take their humble adventurers on a journey through a dark world of magic and peril. They will visit strange places, stranger people and overcome powerful enemies in their mission to discover mysterious artefacts and mystical Spells. Players follow their Hero&amp;rsquo;s tale from modest beginnings through an epic story to an exciting climactic battle for the fate of the world. Gloom of Kilforth takes about 45 minutes per player to play.&amp;#10;&amp;#10;The following is taken from my design journal:&amp;#10;&amp;#10;This game has been in development for a long time and has undergone so many permutations in the last six years that I&amp;rsquo;ve literally ripped it up and started again numerous times.  From board game, to miniatures game, to proto-RPG I&amp;rsquo;ve finally settled on a format I hope will be cost effective and elegant: the card game.&amp;#10; Gloom of Kilforth sees 1-4 players taking a humble adventurer on a journey through a dark world of magic and peril and following their tale from modest beginnings through an epic story to an exciting climactic battle for the fate of the world.&amp;#10; Drawing inspiration from titles we&amp;rsquo;ve already seen like combat-heavy tactical dungeon crawls (Descent, D&amp;amp;D, etc.), condensed overland adventures concerned either with combat (Runebound) or random encounters (Talisman), games that stretch into story-telling (Tales of the Arabian Nights), cooperative games against insurmountable odds (Arkham Horror, Defenders of the Realm), and tactical adventure card games (Lord of the Rings: The Card Game), I&amp;rsquo;ve always been looking to design a game that distils the heroic story telling of an in-depth role playing game down into an amount of time that&amp;rsquo;s playable in an evening.  It&amp;rsquo;s something that many of us crave as we get older and have kids and relationships and jobs and so on which preclude us from throwing all that time away on months of role-playing games.&amp;#10; So whilst I wanted to include all the high fantasy stuff that many of us love, and which in many ways mostly stems from Tolkien&amp;rsquo;s work, I also tried to develop new techniques of weaving them together to create story-based gameplay.&amp;#10; The two key drivers for the game are the Saga Chapters and Night card decks.  The Sagas represent the tales that the heroes will tell as they progress on their journey to fame and fortune, whilst the Night cards are global events that can affect everyone in the Kingdom.&amp;#10;&amp;#10;</description>
        <yearpublished value="2017" />
        <minplayers value="1" />
        <maxplayers value="4" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="16">
            <results numplayers="1">
                <result value="Best" numvotes="13" />
                <result value="Recommended" numvotes="3" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="8" />
                <result value="Recommended" numvotes="6" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="4" />
                <result value="Recommended" numvotes="6" />
                <result value="Not Recommended" numvotes="3" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="2" />
                <result value="Recommended" numvotes="7" />
                <result value="Not Recommended" numvotes="4" />
            </results>
            <results numplayers="4+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="10" />
            </results>
        </poll>
        <playingtime value="180" />
        <minplaytime value="60" />
        <maxplaytime value="180" />
        <minage value="13" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="8">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="0" />
                <result value="10" numvotes="2" />
                <result value="12" numvotes="5" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="1" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="4">
            <results>
                <result level="21" value="No necessary in-game text" numvotes="0" />
                <result level="22" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="23" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="4" />
                <result level="24" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="25" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1002" value="Card Game" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamemechanic" id="2023" value="Co-operative Play" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="8374" value="Crowdfunding: Kickstarter" />
        <link type="boardgamefamily" id="5666" value="Solitaire Games" />
        <link type="boardgamedesigner" id="49733" value="Tristan Hall" />
        <link type="boardgameartist" id="74094" value="Ania Kryczkowska" />
        <link type="boardgamepublisher" id="36632" value="Hall or Nothing Productions" />
        <link type="boardgamepublisher" id="24453" value="PandaGM" />
        <statistics page="1">
            <ratings >
                <usersrated value="308" />
                <average value="7.90714" />
                <bayesaverage value="5.98757" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="2034" bayesaverage="5.98757" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="309" bayesaverage="6.28712" />
                </ranks>
                <stddev value="1.63148" />
                <median value="0" />
                <owned value="913" />
                <trading value="21" />
                <wanting value="126" />
                <wishing value="569" />
                <numcomments value="187" />
                <numweights value="17" />
                <averageweight value="2.8824" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="7389">
        <thumbnail>https://cf.geekdo-images.com/images/pic30144_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic30144.jpg</image>
        <name type="primary" sortindex="5" value="The Castle" />
        <name type="alternate" sortindex="5" value="The Castle" />
        <description>Heroes, prepare for adventure. The Evil Lord of the Black Marches has kidnapped the daughter of the King. A reward of 1,000 gold pieces has been offered for the rescue of his Princess.&amp;#10;&amp;#10;The Castle is a game of fantasy adventure that is easy to set up and fun to play. Players control various characters in a search for the means to rescue the Princess. To rescue the Princess, you must fight the evil creatures inhabiting the Castle and find the keys to open her Cell.&amp;#10;&amp;#10;</description>
        <yearpublished value="1981" />
        <minplayers value="1" />
        <maxplayers value="6" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="2">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="6">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="6+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="1" />
            </results>
        </poll>
        <playingtime value="45" />
        <minplaytime value="45" />
        <maxplaytime value="45" />
        <minage value="10" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="0">
	</poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="0">
	</poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamemechanic" id="2046" value="Area Movement" />
        <link type="boardgamemechanic" id="2019" value="Partnerships" />
        <link type="boardgamemechanic" id="2016" value="Secret Unit Deployment" />
        <link type="boardgamefamily" id="22783" value="Admin: Better Description Needed!" />
        <link type="boardgamedesigner" id="661" value="Neil Zimmerer" />
        <link type="boardgameartist" id="36591" value="Darch Clampitt" />
        <link type="boardgamepublisher" id="10" value="Mayfair Games" />
        <statistics page="1">
            <ratings >
                <usersrated value="15" />
                <average value="6" />
                <bayesaverage value="0" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="Not Ranked" bayesaverage="Not Ranked" />
                </ranks>
                <stddev value="1.21106" />
                <median value="0" />
                <owned value="70" />
                <trading value="2" />
                <wanting value="16" />
                <wishing value="36" />
                <numcomments value="20" />
                <numweights value="2" />
                <averageweight value="1" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="167190">
        <thumbnail>https://cf.geekdo-images.com/images/pic2296514_t.png</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic2296514.png</image>
        <name type="primary" sortindex="1" value="Of Dungeons Deep! (Second Edition)" />
        <description>Of Dungeons Deep (Second Edition) is a vastly expanded version of the original game. It now play 1-4 players and consists of numerous Heroes and Henchmen to choose from to delve in the dungeon below. Here are some game highlights.&amp;#10;&amp;#10;1)Bluffing and Blind Bidding. Players are attempting to destroy the nasty creatures below in the dungeon to gain fame by playing cards face down and revealing simultaneously. Each enemy has a set number of hit points based on the number of players. There are three enemies to deal with in each level of the dungeon, so strategy, tactics, and bluffing are a must. There is also two rounds of bidding so players gain insight into what other players are up to.&amp;#10;&amp;#10;2)Deck Building. When a player defeats an enemy, that card is rotated 180 degrees and then added to the player's discard pile. The bottom of each monster card indicates what item the enemy is carrying. These items add power to your character in future rounds, and act as an organic and thematic way to show that your characters are advancing.&amp;#10;&amp;#10;3)Draft Your Unique Party. Before play begins, players complete a draft in order to create their starting hand of twelve cards. Each player gets one Hero and one Henchman. All characters are very unique and play quite differently from one another. This sets the bar high for replay value!&amp;#10;&amp;#10;4)No Down Time! Since all play is done simultaneously, no players are ever waiting on others for very long. This makes Of Dungeons Deep! one of the fastest dungeon delvers out there.&amp;#10;&amp;#10;</description>
        <yearpublished value="2015" />
        <minplayers value="1" />
        <maxplayers value="4" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="1">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
        </poll>
        <playingtime value="30" />
        <minplaytime value="30" />
        <maxplaytime value="30" />
        <minage value="10" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="0">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="0" />
                <result value="10" numvotes="0" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="0">
	</poll>
        <link type="boardgamecategory" id="1023" value="Bluffing" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamemechanic" id="2014" value="Betting/Wagering" />
        <link type="boardgamemechanic" id="2041" value="Card Drafting" />
        <link type="boardgamemechanic" id="2664" value="Deck / Pool Building" />
        <link type="boardgamefamily" id="22184" value="Admin: Unreleased Games" />
        <link type="boardgamefamily" id="8374" value="Crowdfunding: Kickstarter" />
        <link type="boardgameimplementation" id="153220" value="Of Dungeons Deep!" inbound="true"/>
        <link type="boardgamedesigner" id="59916" value="Jason Glover" />
        <link type="boardgameartist" id="59980" value="Derek Bacon" />
        <link type="boardgamepublisher" id="22367" value="Grey Gnome Games" />
        <statistics page="1">
            <ratings >
                <usersrated value="57" />
                <average value="6.50461" />
                <bayesaverage value="5.55056" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="7826" bayesaverage="5.55056" />
                </ranks>
                <stddev value="1.28309" />
                <median value="0" />
                <owned value="254" />
                <trading value="21" />
                <wanting value="0" />
                <wishing value="10" />
                <numcomments value="21" />
                <numweights value="5" />
                <averageweight value="1.4" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="87113">
        <thumbnail>https://cf.geekdo-images.com/images/pic2986473_t.png</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic2986473.png</image>
        <name type="primary" sortindex="1" value="RAID: Random Adventures In Dungeons" />
        <description>RAID - Random Adventures in Dungeons is a fast-paced, easy to learn, action/adventure RPG from Double Aye Games.&amp;#10;&amp;#10;Enter an ever-changing world where no two games will ever be the same.  Battle monsters while seeking untold riches and the way out of the dungeon.  Work with your friends, or leave them to be eaten by the monsters while you take off with the loot!&amp;#10;&amp;#10;Choose from 7 customizable character types:&amp;#10;Wizard, Warrior, Archer, Monk, Paladin, Thief, or Cleric.&amp;#10;&amp;#10;Equip your character with weapons and armor you gain from your battles. Watch out for traps!  There is a new surprise around every corner and no two dungeons are ever the same.&amp;#10;&amp;#10;Contents:&amp;#10;45 Random Encounter Cards&amp;#10;45 Treasure Cards&amp;#10;23 Character Creation Cards&amp;#10;24 Map Tile Cards&amp;#10;2 Twenty Sided Dice &amp;#10;1 Ten Sided Die&amp;#10;1 Four Sided Die&amp;#10;4 Character Figures&amp;#10;A Full Instruction Manual&amp;#10;&amp;#10;</description>
        <yearpublished value="2010" />
        <minplayers value="1" />
        <maxplayers value="5" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="1">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="5+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="1" />
            </results>
        </poll>
        <playingtime value="60" />
        <minplaytime value="30" />
        <maxplaytime value="60" />
        <minage value="12" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="1">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="0" />
                <result value="10" numvotes="0" />
                <result value="12" numvotes="1" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="1">
            <results>
                <result level="91" value="No necessary in-game text" numvotes="0" />
                <result level="92" value="Some necessary text - easily memorized or small crib sheet" numvotes="1" />
                <result level="93" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="94" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="95" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1002" value="Card Game" />
        <link type="boardgamecategory" id="1094" value="Educational" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1035" value="Medieval" />
        <link type="boardgamecategory" id="1047" value="Miniatures" />
        <link type="boardgamecategory" id="1070" value="Renaissance" />
        <link type="boardgamemechanic" id="2018" value="Campaign / Battle Card Driven" />
        <link type="boardgamemechanic" id="2023" value="Co-operative Play" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamemechanic" id="2002" value="Tile Placement" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamepublisher" id="15176" value="Double Aye Games" />
        <link type="boardgamepublisher" id="2456" value="The Game Crafter, LLC" />
        <statistics page="1">
            <ratings >
                <usersrated value="5" />
                <average value="7.2" />
                <bayesaverage value="0" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="Not Ranked" bayesaverage="Not Ranked" />
                </ranks>
                <stddev value="3.42929" />
                <median value="0" />
                <owned value="6" />
                <trading value="0" />
                <wanting value="0" />
                <wishing value="4" />
                <numcomments value="2" />
                <numweights value="1" />
                <averageweight value="1" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="145793">
        <thumbnail>https://cf.geekdo-images.com/images/pic1734960_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic1734960.jpg</image>
        <name type="primary" sortindex="1" value="Dungeon Attack!" />
        <description>Dungeon Attack! is a fast-paced, action packed dice game where you and your friends venture into an ancient dungeon, defeat angry monsters, and search for treasure.&amp;#10;&amp;#10;Each die represents a monster. A single die is a strong monster while rolling a handful of dice represents weak minions fighting at their master's will.&amp;#10;&amp;#10;The game pack easily accommodates four players and more can join in on the fun with additional dice packs.&amp;#10;&amp;#10;</description>
        <yearpublished value="2013" />
        <minplayers value="1" />
        <maxplayers value="4" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="0">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
        </poll>
        <playingtime value="15" />
        <minplaytime value="15" />
        <maxplaytime value="15" />
        <minage value="10" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="0">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="0" />
                <result value="10" numvotes="0" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="0">
            <results>
                <result level="96" value="No necessary in-game text" numvotes="0" />
                <result level="97" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="98" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="99" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="100" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1017" value="Dice" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamefamily" id="8374" value="Crowdfunding: Kickstarter" />
        <link type="boardgameexpansion" id="156990" value="Dungeon Attack!: Adventurer Pack Expansion" />
        <link type="boardgameexpansion" id="157169" value="Dungeon Attack!: Chaos Dice" />
        <link type="boardgameexpansion" id="156992" value="Dungeon Attack!: Dungeon Adventure Cards" />
        <link type="boardgameexpansion" id="157166" value="Dungeon Attack!: Event Dice" />
        <link type="boardgameexpansion" id="156995" value="Dungeon Attack!: Poison Dice" />
        <link type="boardgamedesigner" id="74327" value="John S. Jacobs" />
        <link type="boardgamedesigner" id="61117" value="Emil G. Palisoc" />
        <link type="boardgameartist" id="74310" value="Tim Lattie" />
        <link type="boardgamepublisher" id="22822" value="Attack Dice, LLC" />
        <statistics page="1">
            <ratings >
                <usersrated value="21" />
                <average value="6.29357" />
                <bayesaverage value="0" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="Not Ranked" bayesaverage="Not Ranked" />
                </ranks>
                <stddev value="2.3543" />
                <median value="0" />
                <owned value="62" />
                <trading value="2" />
                <wanting value="4" />
                <wishing value="13" />
                <numcomments value="11" />
                <numweights value="2" />
                <averageweight value="1.5" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgameexpansion" id="9142">
        <thumbnail>https://cf.geekdo-images.com/images/pic40316_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic40316.jpg</image>
        <name type="primary" sortindex="1" value="HeroQuest: Dungeons of Peril" />
        <description>Designer's Note: This is not a professionally published game; it is a series of homemade expansions for Hero quest. I have been selling the games for 2 1/2 years, and have sold well over 600 expansions. So I believe there is justification for presenting them in this forum.)&amp;#10;&amp;#10;Dungeons of Peril is the collective name for my first four expansions for Hero Quest, a fantasy board game published by Games Workshop in conjunction with Milton Bradley.&amp;#10;&amp;#10;The 4 expansions are:&amp;#10;&amp;#10;1) Heroes of the Empire - Play one of 16 new Heroes - Cleric, Warrior-Monk, Mystic, Shapeshifter, Paladin, Halfling Thief, Alchemist, Wood Elf Mage, Vampire Hunter, Rogue, Elf Archer, Weaponmaster, Imperial Ogre, Troll Wizard, Dwarf Ranger, and Shadow Walker. This set includes 16 full-color Hero cards; 24 cards with new spells, equipment, etc. for these Heroes; a reference sheet with new Potions and Items; and a 4-page rulebook.&amp;#10;&amp;#10;2) Endless Dungeons - Create a virtually endless number of dungeons with this set. It includes 32 different full-color dungeon tiles, a 10-page rulebook detailing the Special Tiles (with new traps, monsters, etc.), and a double-sided reference sheet. There are 16 standard tiles (4 of each of the following types: Corridor, Small Room, Medium Room, and Large Room), 2 Stairs tiles, and 14 Special Tiles. Use the tiles to create pre-generated dungeons, or create random ones in just a few minutes.&amp;#10;&amp;#10;3) Servants of Darkness - This is a set of full-color 3-D stand-ups to use instead of miniatures. The set includes 128 stand-ups - 19 different Heroes, 8 Mercenaries, and 64 different monsters (there are multiple stand-ups for the mercenaries and some monsters). The stand- ups are (roughly) to scale and vary in size, from the standard human size to the very large Dragon and Rock Giant. Also included is a 14-page rulebook for using ALL of the monsters in Heroquest.&amp;#10;&amp;#10;4) Perilous Quests &amp;ndash; This expansion provides instructions on how to create and populate an entire dungeon. The rules walk you through how to create the dungeon and how to fill it with monsters, traps, dungeon features (like a Magic Mirror or strange Mould), and special rooms. This is done using two new types of cards (Encounter and Search). You can create an entire dungeon in just a few minutes. The rules are designed to allow as much flexibility as desired when creating a dungeon. The rules can be used for pre-generated quests, but they also allow you to play without a game master and are ideally suited for SOLO play! Finally, the Dungeon Bash rules allow parties of Heroes to go head-to-head!&amp;#10;&amp;#10;Perilous Quests includes the following: 20 new Artifact cards, 16 Search cards, 8 Encounter cards, 4 Lich spells, 8 new Chaos spells, 8 Chaos monster cards (4 Sorcerers and 4 Chaos Spawn), 8 Elemental monster cards, and a sheet of dungeon counters (representing various special features).&amp;#10;&amp;#10;Expands&amp;#10;&amp;#10;    HeroQuest&amp;#10;&amp;#10;&amp;#10;&amp;#10;&amp;#10;</description>
        <yearpublished value="2002" />
        <minplayers value="1" />
        <maxplayers value="5" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="0">
            <results numplayers="5+">		
				</results>
        </poll>
        <playingtime value="120" />
        <minplaytime value="120" />
        <maxplaytime value="120" />
        <minage value="10" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="0">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="0" />
                <result value="10" numvotes="0" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="0">
            <results>
                <result level="101" value="No necessary in-game text" numvotes="0" />
                <result level="102" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="103" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="104" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="105" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1042" value="Expansion for Base-game" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="2687" value="Fan Expansion" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamemechanic" id="2023" value="Co-operative Play" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="69" value="HeroQuest" />
        <link type="boardgamefamily" id="4328" value="Warhammer Fantasy Board Games" />
        <link type="boardgameexpansion" id="699" value="HeroQuest" inbound="true"/>
        <link type="boardgamedesigner" id="3093" value="Andrew Sekela" />
        <link type="boardgamepublisher" id="4" value="(Self-Published)" />
        <statistics page="1">
            <ratings >
                <usersrated value="11" />
                <average value="6.5" />
                <bayesaverage value="0" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="Not Ranked" bayesaverage="Not Ranked" />
                </ranks>
                <stddev value="2.85243" />
                <median value="0" />
                <owned value="19" />
                <trading value="1" />
                <wanting value="37" />
                <wishing value="65" />
                <numcomments value="6" />
                <numweights value="0" />
                <averageweight value="0" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgameexpansion" id="126029">
        <thumbnail>https://cf.geekdo-images.com/images/pic1536998_t.png</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic1536998.png</image>
        <name type="primary" sortindex="1" value="Dungeon Crawler: Mines of Khurgan" />
        <description>In Dungeon Crawler ECG your party of adventurers face off against terrain, traps, events and characters using equipment, magic, skills and tactics to try and complete 2 out of 3 quests or just to survive the dungeon!&amp;#10;&amp;#10;Each round cards are drawn from the dungeon to face off against, and the player must strategize the best way through each encounter.  This game starts off in Story Mode, but can expand for Multi-player.&amp;#10;&amp;#10;The Mines of Khurgan really adds some brutal combinations to the mix!  This expansion focuses around a tribe of Kobolds and their deadly traps.  The heroes plunge down in to the mines to face the Kobold Shaman Squee or to face the ghost of Khurgan himself!&amp;#10;&amp;#10;Mines of Khurgan introduces a new Adventurer (Ice Dwarf Explorer), a new Quest (Divine Plan) and 16 new crawler and dungeon cards.&amp;#10;&amp;#10;The expansion totals 82 all new cards with 34 new pieces of art and a punch cardstock card for eight additional tokens and a new Challenger token.&amp;#10;&amp;#10;This is not a game in itself, but an expansion pack.&amp;#10;&amp;#10;</description>
        <yearpublished value="2012" />
        <minplayers value="1" />
        <maxplayers value="6" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="1">
            <results numplayers="1">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="6">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="6+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
        </poll>
        <playingtime value="1" />
        <minplaytime value="1" />
        <maxplaytime value="1" />
        <minage value="13" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="0">
	</poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="0">
	</poll>
        <link type="boardgamecategory" id="1002" value="Card Game" />
        <link type="boardgamecategory" id="1044" value="Collectible Components" />
        <link type="boardgamecategory" id="1042" value="Expansion for Base-game" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamemechanic" id="2023" value="Co-operative Play" />
        <link type="boardgamemechanic" id="2040" value="Hand Management" />
        <link type="boardgamemechanic" id="2079" value="Variable Phase Order" />
        <link type="boardgamefamily" id="6040" value="CCGs (Collectible Card Games)" />
        <link type="boardgamefamily" id="5666" value="Solitaire Games" />
        <link type="boardgameexpansion" id="67878" value="Dungeon Crawler" inbound="true"/>
        <link type="boardgamedesigner" id="36251" value="Jey Legarie" />
        <link type="boardgameartist" id="16495" value="David Bezzina" />
        <link type="boardgameartist" id="36268" value="Ricardo Boronat" />
        <link type="boardgameartist" id="36267" value="Simon Buckroyd" />
        <link type="boardgameartist" id="36254" value="Lauren K. Cannon" />
        <link type="boardgameartist" id="24841" value="Víctor Pérez Corbella" />
        <link type="boardgameartist" id="36258" value="Falk Hansel" />
        <link type="boardgameartist" id="36264" value="Alex Li" />
        <link type="boardgameartist" id="15291" value="Claudio Pozas" />
        <link type="boardgameartist" id="79951" value="Dominick Rabrun" />
        <link type="boardgameartist" id="39821" value="George Todorovski" />
        <link type="boardgameartist" id="36270" value="Nicolas Tribehou" />
        <link type="boardgameartist" id="36265" value="Vanessa Walsh" />
        <link type="boardgamepublisher" id="4" value="(Self-Published)" />
        <link type="boardgamepublisher" id="11823" value="Gifted Vision" />
        <statistics page="1">
            <ratings >
                <usersrated value="24" />
                <average value="7.66667" />
                <bayesaverage value="0" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="Not Ranked" bayesaverage="Not Ranked" />
                </ranks>
                <stddev value="1.7658" />
                <median value="0" />
                <owned value="147" />
                <trading value="8" />
                <wanting value="4" />
                <wishing value="15" />
                <numcomments value="14" />
                <numweights value="5" />
                <averageweight value="3" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="147635">
        <thumbnail>https://cf.geekdo-images.com/images/pic3340087_t.png</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic3340087.png</image>
        <name type="primary" sortindex="1" value="Dungeon Crusade" />
        <description>Welcome to the world of Avalon!&amp;#10;&amp;#10;Dungeon Crusade is a solo/co-operative, sandbox dungeon crawl. Inspired by the classic age of board games, role-playing games and video games but fitted with new and fresh mechanics.&amp;#10;&amp;#10;In Dungeon Crusade your party will enter an ancient dungeon located beneath a village to stem the tide of evil beleaguering the poor villagers. Each time you visit you the dungeon you will have an over arching goal that you need to achieve, but you can also pick up side quests and even some odd jobs from the tavern to further modify your adventure!&amp;#10;&amp;#10;6 stalwart Heroes are accompanied by their trusty fetch hound Albus. Each Hero has strengths and weakness' and it is up to you to decide if you will split the party to cover more ground or stick together incase a larger threat presents itself...&amp;#10;&amp;#10;In the dungeon you will encounter wandering monsters who move about the board. Beware! These monsters might turn into raiding monsters and make their way to village.&amp;#10;&amp;#10;You can mine for minerals to craft enhancements for your weapons. You can seek out and hunt down rare and legendary artifacts. You can send Albus back to the village to get a potion in a pinch.&amp;#10;&amp;#10;If your quest is successful then the village celebrates in your honor and throws you a grand feast and presents your party with gifts. You can shop around for new gear from the ever changing marketplace, gamble some gold in the house of chance, visit a temple and pray for assistance and more!&amp;#10;&amp;#10;Don't get too comfortable because evil never rests and you'll find yourself back in the dungeon facing tougher challenges but hopefully better armed!&amp;#10;&amp;#10;</description>
        <yearpublished value="2017" />
        <minplayers value="1" />
        <maxplayers value="6" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="2">
            <results numplayers="1">
                <result value="Best" numvotes="2" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="2" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="2" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="2" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="2" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="6">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="6+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
        </poll>
        <playingtime value="240" />
        <minplaytime value="60" />
        <maxplaytime value="240" />
        <minage value="10" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="1">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="0" />
                <result value="10" numvotes="1" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="0">
            <results>
                <result level="1" value="No necessary in-game text" numvotes="0" />
                <result level="2" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="3" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="4" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="5" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1017" value="Dice" />
        <link type="boardgamemechanic" id="2023" value="Co-operative Play" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamefamily" id="22783" value="Admin: Better Description Needed!" />
        <link type="boardgamefamily" id="22184" value="Admin: Unreleased Games" />
        <link type="boardgamefamily" id="8374" value="Crowdfunding: Kickstarter" />
        <link type="boardgamefamily" id="5666" value="Solitaire Games" />
        <link type="boardgameartist" id="66880" value="Joseph Arnold" />
        <link type="boardgameartist" id="97884" value="Shaun Ellis" />
        <link type="boardgameartist" id="27559" value="Alfredo Lopez, Jr." />
        <link type="boardgameartist" id="38179" value="Damien Mammoliti" />
        <link type="boardgamepublisher" id="4" value="(Self-Published)" />
        <statistics page="1">
            <ratings >
                <usersrated value="26" />
                <average value="9.53846" />
                <bayesaverage value="0" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="Not Ranked" bayesaverage="Not Ranked" />
                </ranks>
                <stddev value="1.73717" />
                <median value="0" />
                <owned value="10" />
                <trading value="0" />
                <wanting value="9" />
                <wishing value="84" />
                <numcomments value="31" />
                <numweights value="1" />
                <averageweight value="4" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="99167">
        <thumbnail>https://cf.geekdo-images.com/images/pic1008038_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic1008038.jpg</image>
        <name type="primary" sortindex="1" value="Dungeon Star" />
        <description>The dungeon goes through the ground.&amp;#10;It's also very famous in the world as the treasure&amp;quot;God bless&amp;quot;.  Anybody said the &amp;quot;God bless&amp;quot; was placed on the most deep floor, and any monsters lived in the dungeon. It's many and many.&amp;#10;&amp;#10;However, in this world, the monsters live anywhere without cities and towns. The people sometimes has a battle with them. But the monsters in the dungeon are different with other monsters. Because anyone can't see the &amp;quot;God bless&amp;quot;.&amp;#10;&amp;#10;So the people was interested in &amp;quot;God bless&amp;quot; and the dungeon. At first, it's mercenaries and ventures. But a few years ago, the nobles are interested in them.&amp;#10;The nobles hire the mercenaries and ventures and so on, and they pay the cost to the mercenaries and ventures, they take any treasure in the dungeon. Of course, their target is &amp;quot;God bless&amp;quot;.&amp;#10;&amp;#10;The player is one of the nobles. They hire the mercenaries and ventures and so on, and take the any treasure and a honor as stars. The stars means the noble can go to more deep floor. It's a honor to other nobles.&amp;#10;&amp;#10;The player with most stars is a winner.&amp;#10;&amp;#10;</description>
        <yearpublished value="2011" />
        <minplayers value="3" />
        <maxplayers value="6" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="0">
            <results numplayers="6+">		
				</results>
        </poll>
        <playingtime value="45" />
        <minplaytime value="45" />
        <maxplaytime value="45" />
        <minage value="8" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="0">
	</poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="0">
	</poll>
        <link type="boardgamecategory" id="1017" value="Dice" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgameexpansion" id="120914" value="Ore no Shikabane wo Koeteyuke -Jigoku Meguri-" />
        <link type="boardgamedesigner" id="28932" value="Rinchu" />
        <link type="boardgamepublisher" id="10782" value="Takamagahara" />
        <statistics page="1">
            <ratings >
                <usersrated value="10" />
                <average value="6.05" />
                <bayesaverage value="0" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="Not Ranked" bayesaverage="Not Ranked" />
                </ranks>
                <stddev value="1.49081" />
                <median value="0" />
                <owned value="6" />
                <trading value="0" />
                <wanting value="0" />
                <wishing value="0" />
                <numcomments value="4" />
                <numweights value="2" />
                <averageweight value="2" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="59938">
        <thumbnail>https://cf.geekdo-images.com/images/pic587910_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic587910.jpg</image>
        <name type="primary" sortindex="1" value="Dungeon Escape" />
        <description>The one with the most treasure wins! &amp;hellip; Just watch out for the dragons! Dungeon Escape uses a regular deck of cards and an ingenious set of rules to create a Euro-style game board. Choose one of the classic fantasy characters and gather treasure while attempting to escape alive. This ultimate dungeon crawl is for 1 to 8 players, ages 8 and up; game time is 30 minutes.&amp;#10;&amp;#10;Goal:  Escape the dungeon alive while collecting the most treasure.&amp;#10;&amp;#10;Equipment required:  1 deck of cards, 2 six sided dice and a scorepad to keep track of health points&amp;#10;&amp;#10;&amp;#10;</description>
        <yearpublished value="2004" />
        <minplayers value="1" />
        <maxplayers value="8" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="0">
            <results numplayers="8+">		
				</results>
        </poll>
        <playingtime value="30" />
        <minplaytime value="30" />
        <maxplaytime value="30" />
        <minage value="8" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="0">
	</poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="0">
	</poll>
        <link type="boardgamecategory" id="1002" value="Card Game" />
        <link type="boardgamemechanic" id="2041" value="Card Drafting" />
        <link type="boardgamedesigner" id="3" value="(Uncredited)" />
        <link type="boardgamepublisher" id="4430" value="Fuller Flippers" />
        <statistics page="1">
            <ratings >
                <usersrated value="3" />
                <average value="7.33333" />
                <bayesaverage value="0" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="Not Ranked" bayesaverage="Not Ranked" />
                </ranks>
                <stddev value="1.88562" />
                <median value="0" />
                <owned value="4" />
                <trading value="0" />
                <wanting value="0" />
                <wishing value="0" />
                <numcomments value="3" />
                <numweights value="0" />
                <averageweight value="0" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="181521">
        <thumbnail>https://cf.geekdo-images.com/images/pic2625794_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic2625794.jpg</image>
        <name type="primary" sortindex="1" value="Warhammer Quest: The Adventure Card Game" />
        <name type="alternate" sortindex="1" value="Warhammer Quest : Le Jeu d’Aventure" />
        <name type="alternate" sortindex="1" value="Warhammer Quest: Das Abenteuer-Kartenspiel" />
        <name type="alternate" sortindex="1" value="Warhammer Quest: Dobrodružná karetní hra" />
        <name type="alternate" sortindex="1" value="Warhammer Quest: El juego de cartas de aventuras" />
        <name type="alternate" sortindex="1" value="Warhammer Quest: Przygodowa gra karciana" />
        <description>Join forces with legendary heroes to brave the many dangers of a cavernous dungeon. Wield potent weapons and magic. Conquer hordes of vile monsters. Discover fabulous treasures.&amp;#10;&amp;#10;Warhammer Quest: The Adventure Card Game is a cooperative game of heroic dungeon adventures for one to four players. Players assume the roles of some of the Old World's most iconic heroes, then venture into the shadows to battle ghouls, Goblins, Skaven, giant bats, swarms of rats, and other monsters.&amp;#10;&amp;#10;Can you survive their relentless onslaught? Can you press deeper into their lair to find the evil villain that drives them forward? There are only two ways for your quest to end &amp;ndash; in death or in glory!&amp;#10;&amp;#10;</description>
        <yearpublished value="2015" />
        <minplayers value="1" />
        <maxplayers value="4" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="74">
            <results numplayers="1">
                <result value="Best" numvotes="14" />
                <result value="Recommended" numvotes="39" />
                <result value="Not Recommended" numvotes="7" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="17" />
                <result value="Recommended" numvotes="30" />
                <result value="Not Recommended" numvotes="8" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="8" />
                <result value="Recommended" numvotes="34" />
                <result value="Not Recommended" numvotes="4" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="36" />
                <result value="Recommended" numvotes="16" />
                <result value="Not Recommended" numvotes="4" />
            </results>
            <results numplayers="4+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="29" />
            </results>
        </poll>
        <playingtime value="60" />
        <minplaytime value="30" />
        <maxplaytime value="60" />
        <minage value="14" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="15">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="0" />
                <result value="10" numvotes="7" />
                <result value="12" numvotes="7" />
                <result value="14" numvotes="1" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="13">
            <results>
                <result level="16" value="No necessary in-game text" numvotes="0" />
                <result level="17" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="18" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="1" />
                <result level="19" value="Extensive use of text - massive conversion needed to be playable" numvotes="12" />
                <result level="20" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1002" value="Card Game" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamemechanic" id="2023" value="Co-operative Play" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="24281" value="Campaign Games" />
        <link type="boardgamefamily" id="5666" value="Solitaire Games" />
        <link type="boardgamefamily" id="4330" value="Warhammer Fantasy Card Games" />
        <link type="boardgameexpansion" id="202395" value="Warhammer Quest: The Adventure Card Game – Trollslayer Expansion Pack" />
        <link type="boardgameexpansion" id="202394" value="Warhammer Quest: The Adventure Card Game – Witch Hunter Expansion Pack" />
        <link type="boardgamedesigner" id="72460" value="Justin Kemppainen" />
        <link type="boardgamedesigner" id="36921" value="Brady Sadler" />
        <link type="boardgamedesigner" id="50880" value="Adam Sadler" />
        <link type="boardgamepublisher" id="23043" value="ADC Blackfire Entertainment" />
        <link type="boardgamepublisher" id="15889" value="Asterion Press" />
        <link type="boardgamepublisher" id="2973" value="Edge Entertainment" />
        <link type="boardgamepublisher" id="17" value="Fantasy Flight Games" />
        <link type="boardgamepublisher" id="4617" value="Galakta" />
        <link type="boardgamepublisher" id="264" value="Heidelberger Spieleverlag" />
        <statistics page="1">
            <ratings >
                <usersrated value="3181" />
                <average value="7.6064" />
                <bayesaverage value="7.03499" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="302" bayesaverage="7.03499" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="59" bayesaverage="7.20471" />
                </ranks>
                <stddev value="1.24486" />
                <median value="0" />
                <owned value="6792" />
                <trading value="292" />
                <wanting value="188" />
                <wishing value="988" />
                <numcomments value="663" />
                <numweights value="145" />
                <averageweight value="2.7241" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="14545">
        <thumbnail>https://cf.geekdo-images.com/images/pic187867_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic187867.jpg</image>
        <name type="primary" sortindex="1" value="Caverns of Doom" />
        <description>According to Sid Sackson's &amp;quot;A Gamut of Games&amp;quot;: Enter a series of caverns in search of treasures of all kind. A die calls up monsters (which, like the adventurers, are metal figures to be colored with the paints supplied) and governs their attacks.&amp;#10;&amp;#10;Crypt of the Sorcerer was the companion piece in the series; the boards could be combined into one adventure.&amp;#10;&amp;#10;</description>
        <yearpublished value="1980" />
        <minplayers value="1" />
        <maxplayers value="6" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="1">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="6">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="6+">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
        </poll>
        <playingtime value="30" />
        <minplaytime value="30" />
        <maxplaytime value="30" />
        <minage value="12" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="1">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="1" />
                <result value="10" numvotes="0" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="0">
	</poll>
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1047" value="Miniatures" />
        <link type="boardgamemechanic" id="2023" value="Co-operative Play" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2676" value="Grid Movement" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgameintegration" id="14546" value="Crypt of the Sorcerer" />
        <link type="boardgamedesigner" id="693" value="Arnold Hendrick" />
        <link type="boardgameartist" id="23450" value="David Helber" />
        <link type="boardgameartist" id="34575" value="Cynthia Sims Millan" />
        <link type="boardgamepublisher" id="368" value="Heritage USA" />
        <statistics page="1">
            <ratings >
                <usersrated value="14" />
                <average value="6.07143" />
                <bayesaverage value="0" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="Not Ranked" bayesaverage="Not Ranked" />
                </ranks>
                <stddev value="1.22266" />
                <median value="0" />
                <owned value="32" />
                <trading value="0" />
                <wanting value="12" />
                <wishing value="19" />
                <numcomments value="10" />
                <numweights value="4" />
                <averageweight value="1.5" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="23953">
        <thumbnail>https://cf.geekdo-images.com/images/pic193671_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic193671.jpg</image>
        <name type="primary" sortindex="1" value="Outside the Scope of BGG" />
        <description>Outside the Scope... is one of several catch-all entries in the Admin: Miscellaneous Placeholder family. This entry represents items that are not board games in the sense defined by BoardGameGeek.  These include:&amp;#10;&amp;#10;&amp;#10;    OUTDOOR DEXTERITY OR 'SPORTING GOODS' GAMES&amp;#10;         Bocce&amp;#10;         Cornhole&amp;#10;         Croquet&amp;#10;         Disc Golf&amp;#10;         Horseshoes&amp;#10;         Jarts&amp;#10;         Kubb &amp;#10;         M&amp;ouml;lkky&amp;#10;         Roller Dice&amp;#10;    &amp;#10;&amp;#10;&amp;#10;&amp;#10;    SOME INDOOR DEXTERITY  OR 'SPORTING GOODS' GAMES&amp;#10;         Air Hockey&amp;#10;         Billiards&amp;#10;         Darts&amp;#10;         Foosball&amp;#10;         Nerf Golf&amp;#10;         Table Hockey&amp;#10;         Table Tennis&amp;#10;    &amp;#10;&amp;#10;&amp;#10;&amp;#10;    SOLO PUZZLES&amp;#10;         Ant Trails&amp;#10;         Block by Block&amp;#10;         Brick by Brick&amp;#10;         Brains: Japanese Garden&amp;#10;         Clue Suspects&amp;#10;         Code Master: Programming Logic Game&amp;#10;         Colorplay&amp;#10;         Dragonflies&amp;#10;         Filled Stairs&amp;#10;         Flip Side Game&amp;#10;         Flying Hex&amp;#10;         Gadeiro&amp;#10;         Hi-Q&amp;#10;         Hoppers&amp;#10;         Izzi&amp;#10;         Kakuro&amp;#10;         Leapin' Lizards&amp;#10;         Logic Links&amp;#10;         Lunar Lockout&amp;#10;         Match'Em Up&amp;#10;         Penta&amp;#10;         River Crossing&amp;#10;         Rush Hour &amp;#10;         Shape by Shape&amp;#10;         Solitaire Chess&amp;#10;         Square by Square&amp;#10;         Square Root&amp;#10;         Subtrax&amp;#10;         Sudoku&amp;#10;         Tangrams&amp;#10;         Transmission&amp;#10;         Tantrix (solo-only versions)&amp;#10;         That-A-Way&amp;#10;         Tip Over&amp;#10;         Trifolia&amp;#10;    &amp;#10;&amp;#10;&amp;#10;&amp;#10;    VIDEO ONLY GAMES WITHOUT BOARDS OR CARDS:&amp;#10;         Deal or No Deal DVD Game&amp;#10;         Deal or No Deal and Who Wants to Be a Millionaire Combo DVD Game&amp;#10;         Derby Day DVD Game&amp;#10;         E Pop!-A-Razzi DVD Game&amp;#10;         Family Feud DVD Game&amp;#10;         Family Feud 2nd Edition DVD Game&amp;#10;         Frogger DVD Game&amp;#10;         Let's Make a Deal DVD Game&amp;#10;         Press Your Luck DVD Game&amp;#10;         Pirates of the Caribbean DVD Treasure Hunt&amp;#10;         Price Is Right DVD Game&amp;#10;         Price is Right 2nd Edition DVD Game&amp;#10;         Shrek Bingo DVD Game&amp;#10;         Singing Bee DVD Game&amp;#10;         Sudoku DVD Game&amp;#10;         Who Wants To Be a Millionaire DVD Game&amp;#10;         Would You Rather DVD Game &amp;#10;    &amp;#10;&amp;#10;&amp;#10;ROLE PLAYING GAMES are to be added on RPGGeek&amp;#10;VIDEO AND ELECTRONIC GAMES are to be added on Video Game Geek&amp;#10;&amp;#10;See also:&amp;#10;BGG Guide to Game Submissions&amp;#10;Game Criteria&amp;#10;&amp;#10;</description>
        <yearpublished value="0" />
        <minplayers value="0" />
        <maxplayers value="0" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="19">
            <results numplayers="0+">
                <result value="Best" numvotes="7" />
                <result value="Recommended" numvotes="2" />
                <result value="Not Recommended" numvotes="6" />
            </results>
        </poll>
        <playingtime value="0" />
        <minplaytime value="0" />
        <maxplaytime value="0" />
        <minage value="0" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="12">
            <results>
                <result value="2" numvotes="9" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="1" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="0" />
                <result value="10" numvotes="0" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="2" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="10">
            <results>
                <result level="26" value="No necessary in-game text" numvotes="6" />
                <result level="27" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="28" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="29" value="Extensive use of text - massive conversion needed to be playable" numvotes="1" />
                <result level="30" value="Unplayable in another language" numvotes="3" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1042" value="Expansion for Base-game" />
        <link type="boardgamefamily" id="4347" value="Admin: Miscellaneous Placeholder" />
        <link type="boardgamedesigner" id="3" value="(Uncredited)" />
        <link type="boardgameartist" id="3" value="(Uncredited)" />
        <link type="boardgamepublisher" id="3320" value="(Unknown)" />
        <statistics page="1">
            <ratings >
                <usersrated value="505" />
                <average value="6.73356" />
                <bayesaverage value="5.92247" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="2304" bayesaverage="5.92247" />
                    <rank type="family" id="5499" name="familygames" friendlyname="Family Game Rank" value="610" bayesaverage="6.05052" />
                </ranks>
                <stddev value="2.23991" />
                <median value="0" />
                <owned value="2119" />
                <trading value="782" />
                <wanting value="152" />
                <wishing value="158" />
                <numcomments value="1046" />
                <numweights value="79" />
                <averageweight value="1.6582" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="32678">
        <thumbnail>https://cf.geekdo-images.com/images/pic266724_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic266724.jpg</image>
        <name type="primary" sortindex="1" value="Hero: Immortal King – The Lair of the Lich" />
        <name type="alternate" sortindex="1" value="Hero: Immortal King – Le repaire de la liche" />
        <description>Hero: Immortal King takes the concepts of a traditional role-playing game, and turns it into a head-to-head (or solitaire) card game between the adventurers and the dungeon.  One player leads the adventurers down three dangerous corridors (each represented by a deck of cards), while the other player manages the dungeon and its dangers.  The adventurers win by defeating the final monster in the dungeon.  The dungeon wins if the adventurers lose all their Courage - represented by tokens.&amp;#10;&amp;#10;Le repaire de la liche (The Lair of the Lich) has no traps for the adventurers, but that just means there are more monsters!&amp;#10;&amp;#10;</description>
        <yearpublished value="2007" />
        <minplayers value="1" />
        <maxplayers value="2" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="5">
            <results numplayers="1">
                <result value="Best" numvotes="3" />
                <result value="Recommended" numvotes="2" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="2" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="2" />
            </results>
            <results numplayers="2+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="3" />
            </results>
        </poll>
        <playingtime value="30" />
        <minplaytime value="30" />
        <maxplaytime value="30" />
        <minage value="9" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="1">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="0" />
                <result value="10" numvotes="1" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="2">
            <results>
                <result level="6" value="No necessary in-game text" numvotes="0" />
                <result level="7" value="Some necessary text - easily memorized or small crib sheet" numvotes="2" />
                <result level="8" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="9" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="10" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1002" value="Card Game" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamefamily" id="4538" value="Hero: Immortal King series" />
        <link type="boardgamedesigner" id="4376" value="Emmanuel Beltrando" />
        <link type="boardgameartist" id="12401" value="Laurent &quot;Lohran&quot; Couturier" />
        <link type="boardgameartist" id="12402" value="Stéphane Gantiez" />
        <link type="boardgamepublisher" id="157" value="Asmodee" />
        <statistics page="1">
            <ratings >
                <usersrated value="169" />
                <average value="5.26035" />
                <bayesaverage value="5.45276" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="13076" bayesaverage="5.45276" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="851" bayesaverage="5.42676" />
                </ranks>
                <stddev value="1.74289" />
                <median value="0" />
                <owned value="407" />
                <trading value="39" />
                <wanting value="3" />
                <wishing value="28" />
                <numcomments value="57" />
                <numweights value="17" />
                <averageweight value="1.5294" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="166710">
        <thumbnail>https://cf.geekdo-images.com/images/pic2264084_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic2264084.jpg</image>
        <name type="primary" sortindex="1" value="Dragon&#039;s Ransom" />
        <description>Hark! Another hero approaches. Prepare the minions. Get them in line. The dragon's ransom must never be claimed!&amp;#10;&amp;#10;In Dragon's Ransom, you take on the role of Master of the Dungeon, sending waves of minions towards ill-prepared heroes. Link minions to create devastating combos, but beware- the heroes may be fools but they will fight back.&amp;#10;&amp;#10;Dragon's Ransom is a reverse dungeon crawl solo &amp;amp; co-operative card game for 1 - 4 players. On your turn you will draw cards from the minion deck and play minions and traps against the heroes that oppose you. Once they're built up, play Attack! cards to send your chains rushing forward to attack the heroes. Spend too much time building the chains and the heroes will strike back, breaking apart your ranks. Defeat all the heroes to win or exhaust your minion supply to suffer defeat.&amp;#10;&amp;#10;Dragon's Ransom is a primarily solitaire game with official rules and components for multiplayer up to 4.&amp;#10;&amp;#10;</description>
        <yearpublished value="2015" />
        <minplayers value="1" />
        <maxplayers value="4" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="5">
            <results numplayers="1">
                <result value="Best" numvotes="4" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="2" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="2" />
            </results>
            <results numplayers="4+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="2" />
            </results>
        </poll>
        <playingtime value="30" />
        <minplaytime value="30" />
        <maxplaytime value="30" />
        <minage value="8" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="0">
	</poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="0">
            <results>
                <result level="106" value="No necessary in-game text" numvotes="0" />
                <result level="107" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="108" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="109" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="110" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1002" value="Card Game" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamemechanic" id="2023" value="Co-operative Play" />
        <link type="boardgamemechanic" id="2004" value="Set Collection" />
        <link type="boardgamefamily" id="8374" value="Crowdfunding: Kickstarter" />
        <link type="boardgamedesigner" id="68633" value="Tony Go" />
        <link type="boardgameartist" id="69062" value="Tim McBurnie" />
        <link type="boardgamepublisher" id="4" value="(Self-Published)" />
        <link type="boardgamepublisher" id="28238" value="Tau Leader Games" />
        <statistics page="1">
            <ratings >
                <usersrated value="77" />
                <average value="6.29026" />
                <bayesaverage value="5.55078" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="7813" bayesaverage="5.55078" />
                </ranks>
                <stddev value="1.53185" />
                <median value="0" />
                <owned value="262" />
                <trading value="18" />
                <wanting value="13" />
                <wishing value="58" />
                <numcomments value="33" />
                <numweights value="6" />
                <averageweight value="1.6667" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgameexpansion" id="32072">
        <thumbnail>https://cf.geekdo-images.com/images/pic252952_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic252952.jpg</image>
        <name type="primary" sortindex="1" value="Song of Gold and Darkness" />
        <name type="alternate" sortindex="4" value="Il Canto delle Tenebre" />
        <description>Song of Gold and Darkness is the first expansion for the Song of Blades and Heroes fantasy skirmish rules. It includes rules clarifications and complete rules for dungeon adventuring.&amp;#10;&amp;#10;</description>
        <yearpublished value="2007" />
        <minplayers value="1" />
        <maxplayers value="2" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="1">
            <results numplayers="1">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
        </poll>
        <playingtime value="45" />
        <minplaytime value="45" />
        <maxplaytime value="45" />
        <minage value="12" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="0">
	</poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="0">
	</poll>
        <link type="boardgamecategory" id="1042" value="Expansion for Base-game" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1047" value="Miniatures" />
        <link type="boardgamecategory" id="1120" value="Print &amp; Play" />
        <link type="boardgamecategory" id="1019" value="Wargame" />
        <link type="boardgamemechanic" id="2001" value="Action Point Allowance System" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="5555" value="Song of Blades and Heroes" />
        <link type="boardgameexpansion" id="30804" value="Song of Blades and Heroes" inbound="true"/>
        <link type="boardgameimplementation" id="165027" value="ShadowSea:  The Stygian Depths" />
        <link type="boardgamedesigner" id="9056" value="Andrea Sfiligoi" />
        <link type="boardgameartist" id="9056" value="Andrea Sfiligoi" />
        <link type="boardgamepublisher" id="1001" value="(Web published)" />
        <link type="boardgamepublisher" id="7993" value="Ganesha Games" />
        <statistics page="1">
            <ratings >
                <usersrated value="78" />
                <average value="7.6309" />
                <bayesaverage value="5.64957" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="Not Ranked" bayesaverage="5.64957" />
                </ranks>
                <stddev value="1.14822" />
                <median value="0" />
                <owned value="229" />
                <trading value="1" />
                <wanting value="12" />
                <wishing value="26" />
                <numcomments value="21" />
                <numweights value="4" />
                <averageweight value="3.25" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="149241">
        <thumbnail>https://cf.geekdo-images.com/images/pic1808352_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic1808352.jpg</image>
        <name type="primary" sortindex="1" value="Assault on Doomrock" />
        <description>Assault on Doomrock is a co-operative adventure game set in a humorous fantasy world. Players start the adventure by generating random heroes from two cards. Combinations like sadistic paladin, stinky warrior, frustrated mage or impatient rogue are only few of the possibilities.&amp;#10;&amp;#10;The unique party of heroes will venture forth into a randomly assembled world map. While gaining crazy abilities, and searching for gold and ridiculous items, heroes must face three increasingly difficult encounters. These battles play out in a grid-free, highly tactical battle system that uses character positioning, dice and ability cards.&amp;#10;&amp;#10;The goal of the game is to defeat the third epic boss encounter. In order to do that, heroes must carefully exploit the map to grow as powerful as possible before they run out of time.&amp;#10;&amp;#10;Feature highlights:&amp;#10;&amp;#10;    Fully cooperative board game, with card driven artificial intelligence.&amp;#10;    Variable heroes and scenarios, generated from over 300 cards.&amp;#10;    Grid-free, highly tactical battle system, with dice allocation planning phase.&amp;#10;    Fully randomized adventure on the world map, with quests, events, shops and rewarding exploration.&amp;#10;    6 Heroes with 8 random traits. 74 unique ability cards. 70 item rewards.&amp;#10;    9 possible battle encounters, each with their unique artificial intelligence deck, which gives over 30 battle encounter combinations. &amp;#10;&amp;#10;&amp;#10;&amp;#10;&amp;#10;</description>
        <yearpublished value="2014" />
        <minplayers value="1" />
        <maxplayers value="4" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="32">
            <results numplayers="1">
                <result value="Best" numvotes="13" />
                <result value="Recommended" numvotes="11" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="13" />
                <result value="Recommended" numvotes="11" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="17" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="7" />
                <result value="Recommended" numvotes="7" />
                <result value="Not Recommended" numvotes="5" />
            </results>
            <results numplayers="4+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="10" />
            </results>
        </poll>
        <playingtime value="150" />
        <minplaytime value="150" />
        <maxplaytime value="150" />
        <minage value="10" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="7">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="0" />
                <result value="10" numvotes="1" />
                <result value="12" numvotes="4" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="2" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="15">
            <results>
                <result level="6" value="No necessary in-game text" numvotes="0" />
                <result level="7" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="8" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="9" value="Extensive use of text - massive conversion needed to be playable" numvotes="11" />
                <result level="10" value="Unplayable in another language" numvotes="4" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamecategory" id="1079" value="Humor" />
        <link type="boardgamecategory" id="2481" value="Zombies" />
        <link type="boardgamemechanic" id="2023" value="Co-operative Play" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="16972" value="Crowdfunding: Indiegogo" />
        <link type="boardgamefamily" id="8374" value="Crowdfunding: Kickstarter" />
        <link type="boardgamefamily" id="5666" value="Solitaire Games" />
        <link type="boardgameexpansion" id="172365" value="Assault on Doomrock: Doompocalypse" />
        <link type="boardgameexpansion" id="186462" value="Assault on Doomrock: Doompocalypse – Kickstarter Promo Pack" />
        <link type="boardgameexpansion" id="170939" value="Assault on Doomrock: Indiegogo Promo Pack" />
        <link type="boardgamedesigner" id="71089" value="Tom Stasiak" />
        <link type="boardgameartist" id="80452" value="Tomasz Florkiewicz" />
        <link type="boardgameartist" id="80449" value="Przemysław Geremek" />
        <link type="boardgameartist" id="80453" value="Michał Grochalak" />
        <link type="boardgameartist" id="80450" value="Adam Kabalak" />
        <link type="boardgameartist" id="80448" value="Bartosz Pławecki" />
        <link type="boardgameartist" id="80451" value="Marcin Rubinkowski" />
        <link type="boardgameartist" id="71089" value="Tom Stasiak" />
        <link type="boardgamepublisher" id="26034" value="Beautiful Disaster Games" />
        <statistics page="1">
            <ratings >
                <usersrated value="654" />
                <average value="7.23153" />
                <bayesaverage value="6.18472" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="1446" bayesaverage="6.18472" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="241" bayesaverage="6.47031" />
                </ranks>
                <stddev value="1.62281" />
                <median value="0" />
                <owned value="1343" />
                <trading value="66" />
                <wanting value="184" />
                <wishing value="702" />
                <numcomments value="298" />
                <numweights value="49" />
                <averageweight value="3.1224" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="134615">
        <thumbnail>https://cf.geekdo-images.com/images/pic1494051_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic1494051.jpg</image>
        <name type="primary" sortindex="1" value="Zogar&#039;s Gaze" />
        <description>Draw a random race and class card and keep your identity a secret. Then you adventure into Zogar&amp;rsquo;s Dungeon and attempt to collect the objects you need to meet your two separate win conditions. You must enter the dungeon on your turn but you can leave whenever you want. Press your luck and try to collect as much loot as you can, but be aware, Zogar&amp;rsquo;s minions are wandering about and you might lose all you have gained if you perish.  In addition Zogar&amp;rsquo;s all seeing eyes are protecting his lair and if too many are revealed, than every player loses and Zogar wins the game. Muhahahaha!&amp;#10;&amp;#10;Do not fear; there is also a market where you can secretly turn in loot you do not need for items that can save your life from the dangers below.&amp;#10;&amp;#10;This is a 1-4 player game where players attempt to meet certain win conditions based on their race and class. The first player to meet these conditions wins. Try and figure out who the other players are and attempt to slow them down. The game plays quickly with a 4 player game lasting between 30-45 minutes.&amp;#10;&amp;#10;</description>
        <yearpublished value="2013" />
        <minplayers value="1" />
        <maxplayers value="5" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="3">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="2" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="3" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="3" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="2" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="2" />
            </results>
            <results numplayers="5+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="1" />
            </results>
        </poll>
        <playingtime value="40" />
        <minplaytime value="40" />
        <maxplaytime value="40" />
        <minage value="12" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="3">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="3" />
                <result value="10" numvotes="0" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="3">
            <results>
                <result level="111" value="No necessary in-game text" numvotes="0" />
                <result level="112" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="113" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="3" />
                <result level="114" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="115" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1002" value="Card Game" />
        <link type="boardgamecategory" id="1017" value="Dice" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2047" value="Memory" />
        <link type="boardgamemechanic" id="2661" value="Press Your Luck" />
        <link type="boardgamemechanic" id="2004" value="Set Collection" />
        <link type="boardgamefamily" id="8374" value="Crowdfunding: Kickstarter" />
        <link type="boardgameimplementation" id="187459" value="Zogar's Gaze (Second Edition)" />
        <link type="boardgamedesigner" id="59916" value="Jason Glover" />
        <link type="boardgameartist" id="59916" value="Jason Glover" />
        <link type="boardgamepublisher" id="22367" value="Grey Gnome Games" />
        <statistics page="1">
            <ratings >
                <usersrated value="136" />
                <average value="5.64632" />
                <bayesaverage value="5.49707" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="11497" bayesaverage="5.49707" />
                </ranks>
                <stddev value="2.03206" />
                <median value="0" />
                <owned value="326" />
                <trading value="30" />
                <wanting value="4" />
                <wishing value="23" />
                <numcomments value="56" />
                <numweights value="11" />
                <averageweight value="1.3636" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="146221">
        <thumbnail>https://cf.geekdo-images.com/images/pic2296858_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic2296858.jpg</image>
        <name type="primary" sortindex="1" value="Forge War" />
        <description>In Forge War, players will take on the role of blacksmiths in a kingdom rife with marauding harpies, cursed dungeons and fire-breathing dragons. They are charged with gathering ore from the mines, purchasing weapon designs from the market and then using these resources to forge weapons for adventurers who will go on quests to fight back the ever-deepening darkness. If the adventurers are successful, they will return with more ore, money and other rewards with which players can invest back into their burgeoning weaponsmithing empire.&amp;#10;&amp;#10;At its core, Forge War is a rewarding game of aggressive investment, which occurs through the acquisition of quests. Quest management becomes challenging for the player, however, because quests undertaken aren't completed immediately, but instead progress each turn and become more difficult. At specific time intervals, players will need to add more resources to their quests or face failure.&amp;#10;&amp;#10;Gameplay cycles through three different phases in each round. The first phase consists of moving pieces around a hex grid to maximize resource production. The second phase is a market phase that features an action blocking mechanic to gain access to new weapon plans and other advantages. The final phase is the acquisition and management of quests, which are selected from a pool of available cards.&amp;#10;&amp;#10;</description>
        <yearpublished value="2015" />
        <minplayers value="1" />
        <maxplayers value="4" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="31">
            <results numplayers="1">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="8" />
                <result value="Not Recommended" numvotes="6" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="6" />
                <result value="Recommended" numvotes="17" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="15" />
                <result value="Recommended" numvotes="7" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="6" />
                <result value="Recommended" numvotes="15" />
                <result value="Not Recommended" numvotes="3" />
            </results>
            <results numplayers="4+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="12" />
            </results>
        </poll>
        <playingtime value="180" />
        <minplaytime value="60" />
        <maxplaytime value="180" />
        <minage value="0" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="8">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="0" />
                <result value="10" numvotes="0" />
                <result value="12" numvotes="4" />
                <result value="14" numvotes="4" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="6">
            <results>
                <result level="1" value="No necessary in-game text" numvotes="0" />
                <result level="2" value="Some necessary text - easily memorized or small crib sheet" numvotes="5" />
                <result level="3" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="1" />
                <result level="4" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="5" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1021" value="Economic" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1088" value="Industry / Manufacturing" />
        <link type="boardgamecategory" id="1035" value="Medieval" />
        <link type="boardgamemechanic" id="2676" value="Grid Movement" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamemechanic" id="2079" value="Variable Phase Order" />
        <link type="boardgamemechanic" id="2082" value="Worker Placement" />
        <link type="boardgamefamily" id="8374" value="Crowdfunding: Kickstarter" />
        <link type="boardgamefamily" id="5666" value="Solitaire Games" />
        <link type="boardgamedesigner" id="69802" value="Isaac Childres" />
        <link type="boardgameartist" id="78961" value="Josh T. McDowell" />
        <link type="boardgameartist" id="15602" value="Jeff Ward" />
        <link type="boardgamepublisher" id="27425" value="Cephalofair Games" />
        <statistics page="1">
            <ratings >
                <usersrated value="1125" />
                <average value="7.45807" />
                <bayesaverage value="6.51397" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="827" bayesaverage="6.51397" />
                    <rank type="family" id="5497" name="strategygames" friendlyname="Strategy Game Rank" value="416" bayesaverage="6.67951" />
                </ranks>
                <stddev value="1.48018" />
                <median value="0" />
                <owned value="2253" />
                <trading value="119" />
                <wanting value="192" />
                <wishing value="836" />
                <numcomments value="374" />
                <numweights value="96" />
                <averageweight value="3.7292" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="28167">
        <thumbnail>https://cf.geekdo-images.com/images/pic187771_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic187771.jpg</image>
        <name type="primary" sortindex="1" value="Maze of the Red Mage: A Solitaire Dungeon Adventure!" />
        <description>&amp;hellip;You awaken in a small shadowy chamber lit only by a fiery brazier&amp;hellip;a deep voice from a shimmering red figure intones &amp;ldquo;You will plague me no longer!  You have interfered in my plans for far too long. You claim to be a hero?  Well then&amp;hellip; let&amp;rsquo;s put you to the test!  I have entombed you inside my maze&amp;hellip;can you escape and prove yourself worthy of the title hero? If you can escape my maze before sunrise I shall leave your lands forever&amp;hellip;&amp;#10;&amp;#10;Maze of the Red Mage is a solitaire dungeon adventure game.  Your goal is to defeat the Red Mage by escaping before the sunrises!  If the Sun rises or you die in the maze, the Red Mage will rule your lands forever!&amp;#10;&amp;#10;The dungeon is set up randomly face down using tiles.  A blend of the classic PC games Minesweeper and Rogue Maze of the Red Mage includes: variable creatures, treasures, dungeon design and characters making every game different! It includes rules to level up your character as well, all in a quick re-playable lunchtime escape!&amp;#10;&amp;#10;</description>
        <yearpublished value="2007" />
        <minplayers value="1" />
        <maxplayers value="1" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="1">
            <results numplayers="1">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="1+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="1" />
            </results>
        </poll>
        <playingtime value="30" />
        <minplaytime value="30" />
        <maxplaytime value="30" />
        <minage value="8" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="0">
	</poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="0">
	</poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1002" value="Card Game" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1059" value="Maze" />
        <link type="boardgamecategory" id="1035" value="Medieval" />
        <link type="boardgamecategory" id="1120" value="Print &amp; Play" />
        <link type="boardgamemechanic" id="2057" value="Chit-Pull System" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamemechanic" id="2078" value="Point to Point Movement" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamemechanic" id="2002" value="Tile Placement" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="5666" value="Solitaire Games" />
        <link type="boardgamedesigner" id="8379" value="Christopher Brandon" />
        <link type="boardgamepublisher" id="4" value="(Self-Published)" />
        <link type="boardgamepublisher" id="1001" value="(Web published)" />
        <statistics page="1">
            <ratings >
                <usersrated value="18" />
                <average value="5.66667" />
                <bayesaverage value="0" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="Not Ranked" bayesaverage="Not Ranked" />
                </ranks>
                <stddev value="1.58114" />
                <median value="0" />
                <owned value="44" />
                <trading value="1" />
                <wanting value="6" />
                <wishing value="51" />
                <numcomments value="14" />
                <numweights value="4" />
                <averageweight value="1.5" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="139588">
        <thumbnail>https://cf.geekdo-images.com/images/pic2490943_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic2490943.jpg</image>
        <name type="primary" sortindex="1" value="Ultima 1: The Boardgame" />
        <description>A remake of the original Ultima 1 computer game by Richard Garriott but in Print &amp;amp; Play boardgame format. For [1] player/solitaire gaming.&amp;#10;&amp;#10;The game will consist of all [4] map board continents with each map containing four quadrants printed on 11x17 sheets, which allows you to play on one board at a time or put them all together for one big gameboard.&amp;#10;&amp;#10;You can play as one of four character types: THIEF, MAGE, FIGHTER or CLERIC who adventures across the lands of Sosaria, ie gameboards, to accomplish goals, gather gold, gather gems, weapons, armor, spells and scrolls, travelling aids, and equipment.  Adventure into Dark Dungeons, Castles, and Towns for Supplies, Equipment and information. Speak with Kings to gather information about the location of all four gems, Fight wandering monsters and evil individuals, open chest to find riches, plus level up and increase your characters abilities and win the game by discovering secret information, finding lost treasures, and defeating the evil overlord &amp;quot;Big Boss&amp;quot; Mondain.&amp;#10;&amp;#10;All the fun of the original Ultima 1 but with more challenges, more monsters, more riches, and more fame... plus in a Print &amp;amp; Play board game format.&amp;#10;&amp;#10;I've taken some liberty with the game since a board game can't do everything a computer can do but should keep the original play as close to the PC game as possible.&amp;#10;&amp;#10;For those of you who have played through the original PC game, you will find that this board game will be similar experience with you traveling, searching, and fighting your way across Sosaria.  Just remember that you are now the computer and will be tracking all your stats and information.&amp;#10;&amp;#10;I will also try to add as many random elements to the game so each time you play it will be the same Ultima 1 but with a little different experience.&amp;#10;&amp;#10;</description>
        <yearpublished value="2013" />
        <minplayers value="1" />
        <maxplayers value="0" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="1">
            <results numplayers="0+">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
        </poll>
        <playingtime value="1" />
        <minplaytime value="1" />
        <maxplaytime value="1" />
        <minage value="12" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="1">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="0" />
                <result value="10" numvotes="0" />
                <result value="12" numvotes="0" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="1" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="2">
            <results>
                <result level="116" value="No necessary in-game text" numvotes="0" />
                <result level="117" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="118" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="0" />
                <result level="119" value="Extensive use of text - massive conversion needed to be playable" numvotes="2" />
                <result level="120" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1035" value="Medieval" />
        <link type="boardgamecategory" id="1120" value="Print &amp; Play" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2676" value="Grid Movement" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamefamily" id="19564" value="Solitaire Print and Play Contest" />
        <link type="boardgamedesigner" id="57049" value="Joseph Propati" />
        <link type="boardgameartist" id="57049" value="Joseph Propati" />
        <link type="boardgamepublisher" id="1001" value="(Web published)" />
        <statistics page="1">
            <ratings >
                <usersrated value="1" />
                <average value="8" />
                <bayesaverage value="0" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="Not Ranked" bayesaverage="Not Ranked" />
                </ranks>
                <stddev value="0" />
                <median value="0" />
                <owned value="7" />
                <trading value="0" />
                <wanting value="3" />
                <wishing value="35" />
                <numcomments value="5" />
                <numweights value="1" />
                <averageweight value="2" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="22">
        <thumbnail>https://cf.geekdo-images.com/images/pic148345_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic148345.jpg</image>
        <name type="primary" sortindex="1" value="Magic Realm" />
        <description>From the 2nd edition rulebook intro for MAGIC REALM:&amp;#10;&amp;#10;MAGIC REALM is a game of fantasy adventuring, set in a land filled with monsters, fabulous treasures, great warriors, and magicians. The scene is set in the ruins of a mighty kingdom, now inhabited by sparse groups of natives and swarms of monsters. Beneath it all are the rich remnants of a magical civilization, scattered and lost across the map.&amp;#10;To this scene come the adventurers, seekers of riches and fame, to make a name for themselves in this promising field. Swordsman and Dwarf, Magician and Sorceror, the humans and the half-humans come seeking to loot the legendary riches of a lost civilization. Now you can play the part of one of these adventurers, stepping into an unknown Realm of magic and monsters, battles and treasures.&amp;#10;&amp;#10;As a player, you will take on the role of one of the sixteen major characters who are represented in detail in the game. You will control where he goes, what he tries to do, how he handles himself in combat, and much more. In the course of the game, you will run into deadly monsters, tribes of humans ranging from old friends to sworn enemies, and treasures that will enhance your abilities in many ways.&amp;#10;&amp;#10;MAGIC REALM is a complex game designed to recapture the suspense and desperate struggles of fantasy literature. The game creates a small but complete fantasy world, where each game is a new adventure with a new map where everything lies hidden at new locations. The game includes many more playing pieces than are actually used in a single playing. The additional pieces are set up and can appear, depending on the directions in which the characters explore, but many of the treasure troves, treasures, and spells will still be set up, unfound, when the game ends, and many of the monsters and natives might never be met. The result is an extremely unpredictable game full of surprises, a game that plays very differently each time it is played.&amp;#10;The complete game system includes hiking, hiding and searching, fatigue, wounds, rest, trade, hiring natives, and combat between characters, monsters, and natives using a variety of weapons on horseback and afoot, as well as many magical effects.&amp;#10;&amp;#10;Between exploring a new land where the mountains, caves, valleys, and woods change every game, and not knowing what you will find in each place, you will find each game a new and unpredictable adventure, filled with surprises. You will find this like no other board game you have ever played.&amp;#10;&amp;#10;Avalon Hill Complexity rating - 9&amp;#10;&amp;#10;See also the list of articles about Magic Realm in The General.&amp;#10;&amp;#10;</description>
        <yearpublished value="1979" />
        <minplayers value="1" />
        <maxplayers value="16" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="44">
            <results numplayers="1">
                <result value="Best" numvotes="7" />
                <result value="Recommended" numvotes="23" />
                <result value="Not Recommended" numvotes="3" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="8" />
                <result value="Recommended" numvotes="25" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="21" />
                <result value="Recommended" numvotes="17" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="21" />
                <result value="Recommended" numvotes="17" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="14" />
                <result value="Recommended" numvotes="16" />
                <result value="Not Recommended" numvotes="3" />
            </results>
            <results numplayers="6">
                <result value="Best" numvotes="11" />
                <result value="Recommended" numvotes="19" />
                <result value="Not Recommended" numvotes="3" />
            </results>
            <results numplayers="7">
                <result value="Best" numvotes="5" />
                <result value="Recommended" numvotes="16" />
                <result value="Not Recommended" numvotes="10" />
            </results>
            <results numplayers="8">
                <result value="Best" numvotes="4" />
                <result value="Recommended" numvotes="17" />
                <result value="Not Recommended" numvotes="11" />
            </results>
            <results numplayers="9">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="13" />
                <result value="Not Recommended" numvotes="16" />
            </results>
            <results numplayers="10">
                <result value="Best" numvotes="2" />
                <result value="Recommended" numvotes="10" />
                <result value="Not Recommended" numvotes="19" />
            </results>
            <results numplayers="11">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="8" />
                <result value="Not Recommended" numvotes="22" />
            </results>
            <results numplayers="12">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="8" />
                <result value="Not Recommended" numvotes="21" />
            </results>
            <results numplayers="13">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="8" />
                <result value="Not Recommended" numvotes="21" />
            </results>
            <results numplayers="14">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="8" />
                <result value="Not Recommended" numvotes="22" />
            </results>
            <results numplayers="15">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="8" />
                <result value="Not Recommended" numvotes="22" />
            </results>
            <results numplayers="16">
                <result value="Best" numvotes="2" />
                <result value="Recommended" numvotes="7" />
                <result value="Not Recommended" numvotes="22" />
            </results>
            <results numplayers="16+">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="23" />
            </results>
        </poll>
        <playingtime value="240" />
        <minplaytime value="240" />
        <maxplaytime value="240" />
        <minage value="12" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="18">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="1" />
                <result value="8" numvotes="0" />
                <result value="10" numvotes="0" />
                <result value="12" numvotes="5" />
                <result value="14" numvotes="4" />
                <result value="16" numvotes="5" />
                <result value="18" numvotes="2" />
                <result value="21 and up" numvotes="1" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="12">
            <results>
                <result level="11" value="No necessary in-game text" numvotes="0" />
                <result level="12" value="Some necessary text - easily memorized or small crib sheet" numvotes="2" />
                <result level="13" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="5" />
                <result level="14" value="Extensive use of text - massive conversion needed to be playable" numvotes="3" />
                <result level="15" value="Unplayable in another language" numvotes="2" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamemechanic" id="2689" value="Action / Movement Programming" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamemechanic" id="2003" value="Rock-Paper-Scissors" />
        <link type="boardgamemechanic" id="2028" value="Role Playing" />
        <link type="boardgamemechanic" id="2020" value="Simultaneous Action Selection" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="5666" value="Solitaire Games" />
        <link type="boardgameimplementation" id="176070" value="Magic Realm Light 30" />
        <link type="boardgamedesigner" id="19" value="Richard Hamblen" />
        <link type="boardgameartist" id="20202" value="George Goebel" />
        <link type="boardgameartist" id="20475" value="Kim Grommel" />
        <link type="boardgameartist" id="19" value="Richard Hamblen" />
        <link type="boardgameartist" id="319" value="Randall C. Reed" />
        <link type="boardgameartist" id="1158" value="Chris White (I)" />
        <link type="boardgamepublisher" id="4" value="(Self-Published)" />
        <link type="boardgamepublisher" id="5" value="The Avalon Hill Game Co" />
        <statistics page="1">
            <ratings >
                <usersrated value="1723" />
                <average value="7.14847" />
                <bayesaverage value="6.49824" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="851" bayesaverage="6.49824" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="169" bayesaverage="6.69629" />
                    <rank type="family" id="5497" name="strategygames" friendlyname="Strategy Game Rank" value="496" bayesaverage="6.58524" />
                </ranks>
                <stddev value="1.9591" />
                <median value="0" />
                <owned value="3234" />
                <trading value="114" />
                <wanting value="389" />
                <wishing value="1148" />
                <numcomments value="991" />
                <numweights value="341" />
                <averageweight value="4.5015" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="80771">
        <thumbnail>https://cf.geekdo-images.com/images/pic1733595_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic1733595.jpg</image>
        <name type="primary" sortindex="1" value="Dungeon Raiders" />
        <name type="alternate" sortindex="1" value="Расхитители Подземелий" />
        <name type="alternate" sortindex="1" value="Расхитители Подземелий" />
        <name type="alternate" sortindex="1" value="ダンジョンレイダース" />
        <description>Join a brave party of adventurers! Explore a dungeon filled with monsters, traps and treasure!&amp;#10;&amp;#10;In Dungeon Raiders, each player takes the role of a different adventurer. You'll need to work together to survive the dungeon, but only one of you will make it out with the most treasure and win the game! The dungeon is different each time you play, offering new surprises as you collect treasure, trigger traps, and fight off horrible monsters.&amp;#10;&amp;#10;Microbadge ::   &amp;#10;&amp;#10;</description>
        <yearpublished value="2011" />
        <minplayers value="3" />
        <maxplayers value="5" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="23">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="14" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="6" />
                <result value="Not Recommended" numvotes="11" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="3" />
                <result value="Recommended" numvotes="14" />
                <result value="Not Recommended" numvotes="3" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="10" />
                <result value="Recommended" numvotes="12" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="14" />
                <result value="Recommended" numvotes="6" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="5+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="10" />
            </results>
        </poll>
        <playingtime value="60" />
        <minplaytime value="20" />
        <maxplaytime value="60" />
        <minage value="8" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="6">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="1" />
                <result value="8" numvotes="4" />
                <result value="10" numvotes="0" />
                <result value="12" numvotes="1" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="12">
            <results>
                <result level="26" value="No necessary in-game text" numvotes="3" />
                <result level="27" value="Some necessary text - easily memorized or small crib sheet" numvotes="8" />
                <result level="28" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="1" />
                <result level="29" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="30" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1023" value="Bluffing" />
        <link type="boardgamecategory" id="1002" value="Card Game" />
        <link type="boardgamecategory" id="1020" value="Exploration" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamemechanic" id="2040" value="Hand Management" />
        <link type="boardgamemechanic" id="2685" value="Player Elimination" />
        <link type="boardgamemechanic" id="2020" value="Simultaneous Action Selection" />
        <link type="boardgamemechanic" id="2686" value="Take That" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamedesigner" id="8347" value="Phil Walker-Harding" />
        <link type="boardgameartist" id="34490" value="Chechu Nieto" />
        <link type="boardgameartist" id="40240" value="Meredith Walker" />
        <link type="boardgameartist" id="8347" value="Phil Walker-Harding" />
        <link type="boardgamepublisher" id="6567" value="Adventureland Games" />
        <link type="boardgamepublisher" id="2366" value="Devir" />
        <link type="boardgamepublisher" id="29194" value="GaGa Games" />
        <link type="boardgamepublisher" id="6275" value="HomoLudicus" />
        <link type="boardgamepublisher" id="23296" value="Passport Game Studios" />
        <link type="boardgamepublisher" id="22609" value="テンデイズゲームズ (Ten Days Games)" />
        <statistics page="1">
            <ratings >
                <usersrated value="1231" />
                <average value="6.68795" />
                <bayesaverage value="6.131" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="1588" bayesaverage="6.131" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="323" bayesaverage="6.25702" />
                    <rank type="family" id="5499" name="familygames" friendlyname="Family Game Rank" value="443" bayesaverage="6.2203" />
                </ranks>
                <stddev value="1.16364" />
                <median value="0" />
                <owned value="1791" />
                <trading value="61" />
                <wanting value="45" />
                <wishing value="238" />
                <numcomments value="259" />
                <numweights value="81" />
                <averageweight value="1.3827" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="149787">
        <thumbnail>https://cf.geekdo-images.com/images/pic2726841_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic2726841.jpg</image>
        <name type="primary" sortindex="1" value="Perdition&#039;s Mouth: Abyssal Rift" />
        <description>Perdition's Mouth: Abyssal Rift is intended to be a new kind of dungeon crawl, one that embraces the European school of game design with clever and elegant mechanisms and emphasizes strategy while minimizing luck. Cooperation, planning, and the enemy response deck eliminate the need for chucking dice, creating a tense combat environment with meaningful decisions! The rondels provide another tactical layer, including the enemy's devious and challenging AI.&amp;#10;&amp;#10;The rules allow you to learn to play in 15 minutes, with a typical game round lasting less than ten minutes, even with up to six players, but deep, strategic cooperation will be required for your band of heroes to make it through to the Abyssal Rift and maybe even come out alive.&amp;#10;&amp;#10;Perdition&amp;rsquo;s Mouth is designed to be played as a story-supported campaign over several gaming sessions. In the campaign, you have to fight through at least six increasingly challenging scenarios and the level of success during each adventure has a direct effect on the rest of the story. Can you survive the labyrinth of the insectoid god?&amp;#10;&amp;#10;</description>
        <yearpublished value="2016" />
        <minplayers value="1" />
        <maxplayers value="6" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="11">
            <results numplayers="1">
                <result value="Best" numvotes="2" />
                <result value="Recommended" numvotes="4" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="1" />
                <result value="Recommended" numvotes="5" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="2" />
                <result value="Recommended" numvotes="6" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="5" />
                <result value="Recommended" numvotes="4" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="2" />
                <result value="Recommended" numvotes="4" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="6">
                <result value="Best" numvotes="3" />
                <result value="Recommended" numvotes="3" />
                <result value="Not Recommended" numvotes="2" />
            </results>
            <results numplayers="6+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="3" />
            </results>
        </poll>
        <playingtime value="180" />
        <minplaytime value="30" />
        <maxplaytime value="180" />
        <minage value="10" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="4">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="1" />
                <result value="10" numvotes="2" />
                <result value="12" numvotes="1" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="0" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="6">
            <results>
                <result level="1" value="No necessary in-game text" numvotes="0" />
                <result level="2" value="Some necessary text - easily memorized or small crib sheet" numvotes="2" />
                <result level="3" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="4" />
                <result level="4" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="5" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1024" value="Horror" />
        <link type="boardgamecategory" id="1047" value="Miniatures" />
        <link type="boardgamecategory" id="1028" value="Puzzle" />
        <link type="boardgamemechanic" id="2001" value="Action Point Allowance System" />
        <link type="boardgamemechanic" id="2018" value="Campaign / Battle Card Driven" />
        <link type="boardgamemechanic" id="2023" value="Co-operative Play" />
        <link type="boardgamemechanic" id="2040" value="Hand Management" />
        <link type="boardgamemechanic" id="2079" value="Variable Phase Order" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="24281" value="Campaign Games" />
        <link type="boardgamefamily" id="8374" value="Crowdfunding: Kickstarter" />
        <link type="boardgamefamily" id="5666" value="Solitaire Games" />
        <link type="boardgameexpansion" id="220657" value="Perdition's Mouth: Abyssal Rift – Hero Trait Deck" />
        <link type="boardgameexpansion" id="220658" value="Perdition's Mouth: Abyssal Rift – Mogba’gh" />
        <link type="boardgameexpansion" id="221771" value="Perdition's Mouth: Abyssal Rift – Promo deck" />
        <link type="boardgameexpansion" id="206924" value="Perdition's Mouth: Abyssal Rift – The Hideout" />
        <link type="boardgameexpansion" id="230338" value="Perdition's Mouth: Abyssal Rift – Traitor Guard" />
        <link type="boardgameexpansion" id="219577" value="Perdition's Mouth: Abyssal Rift – Wound Deck" />
        <link type="boardgameexpansion" id="231500" value="Perdition's Mouth: Traitor Guard" />
        <link type="boardgamedesigner" id="71320" value="Thomas Klausner" />
        <link type="boardgamedesigner" id="11261" value="Timo Multamäki" />
        <link type="boardgamedesigner" id="2336" value="Kevin Wilson" />
        <link type="boardgameartist" id="11933" value="Matthias Catrein" />
        <link type="boardgameartist" id="66790" value="Jere Kasanen" />
        <link type="boardgameartist" id="80860" value="Jamie Noble-Frier" />
        <link type="boardgameartist" id="52602" value="Juha Salmijärvi" />
        <link type="boardgameartist" id="71319" value="Tanja Ylitalo" />
        <link type="boardgamepublisher" id="34201" value="Cosmic Games" />
        <link type="boardgamepublisher" id="8827" value="Dragon Dawn Productions" />
        <statistics page="1">
            <ratings >
                <usersrated value="174" />
                <average value="7.82701" />
                <bayesaverage value="5.77616" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="3151" bayesaverage="5.77616" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="437" bayesaverage="6" />
                    <rank type="family" id="5497" name="strategygames" friendlyname="Strategy Game Rank" value="1180" bayesaverage="5.84086" />
                </ranks>
                <stddev value="1.71508" />
                <median value="0" />
                <owned value="450" />
                <trading value="11" />
                <wanting value="85" />
                <wishing value="351" />
                <numcomments value="90" />
                <numweights value="14" />
                <averageweight value="3.7143" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="4284">
        <thumbnail>https://cf.geekdo-images.com/images/pic13544_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic13544.jpg</image>
        <name type="primary" sortindex="1" value="Dice Quest" />
        <description>Dice Quest is a pseudo fantasy role-playing game that was designed to have the minimum elements of a RPG, without being a an actual RPG.  The game mechanics allow players to create their own RPG-style adventurers who possess a Character Class, Hit Points and Experience Points for leveling up.  Each pocket-sized game box includes 4 Specialty Dice, the game rules, a pad of Character Sheets and pad of graph paper for laying out the dungeon.  The four specialty dice included with Dice Quest subtitute the need for a game moderator or &amp;quot;Dungeon Master&amp;quot; and allow players to create the labyrinth, encounter monsters, resolve combat and collect treasure while on their dungeon outing.&amp;#10;&amp;#10;</description>
        <yearpublished value="1990" />
        <minplayers value="1" />
        <maxplayers value="0" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="0">
            <results numplayers="0+">		
				</results>
        </poll>
        <playingtime value="10" />
        <minplaytime value="10" />
        <maxplaytime value="10" />
        <minage value="0" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="0">
	</poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="0">
	</poll>
        <link type="boardgamecategory" id="1017" value="Dice" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2055" value="Paper-and-Pencil" />
        <link type="boardgamepublisher" id="995" value="Shinwa Corporation" />
        <statistics page="1">
            <ratings >
                <usersrated value="4" />
                <average value="6.25" />
                <bayesaverage value="0" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="Not Ranked" bayesaverage="Not Ranked" />
                </ranks>
                <stddev value="0.433013" />
                <median value="0" />
                <owned value="4" />
                <trading value="0" />
                <wanting value="11" />
                <wishing value="11" />
                <numcomments value="0" />
                <numweights value="1" />
                <averageweight value="1" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="170771">
        <thumbnail>https://cf.geekdo-images.com/images/pic2673763_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic2673763.jpg</image>
        <name type="primary" sortindex="1" value="Sword &amp; Sorcery" />
        <description>Description from the publisher:&amp;#10;&amp;#10;Sword &amp;amp; Sorcery is an epic-fantasy cooperative board game in which 1-5 players fight together against the forces of evil, which are controlled by the game system itself.&amp;#10;&amp;#10;Each player controls one or more heroes &amp;ndash; legendary characters brought back to life by powerful sorcery. Weakened by the resurrection, they grow stronger during their story-driven quests. By acquiring soul points during battles, the heroes' souls regenerate, restoring their legendary status with multiple powers, magic and soul weapons, and powerful artifacts.&amp;#10;&amp;#10;Designed by Gremlin Project (the same team who created Galaxy Defenders),  the game system in Sword &amp;amp; Sorcery represents the perfect evolution of its forerunner. Gameplay is faster and dynamic, thanks to an innovative area movement and area control system, with new features never seen before in a game of this category.&amp;#10;&amp;#10;Key features of Galaxy Defenders are also preserved in Sword &amp;amp; Sorcery, such as the advanced AI system for monsters, a high degree of character customization, and the multiple tactical options during battles. Sword &amp;amp; Sorcery packs, in a top-quality board game format, all the excitement of the best MMORPGs and action RPGs, to provide the ultimate heroic fantasy board game adventure.&amp;#10;&amp;#10;</description>
        <yearpublished value="2017" />
        <minplayers value="1" />
        <maxplayers value="5" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="10">
            <results numplayers="1">
                <result value="Best" numvotes="4" />
                <result value="Recommended" numvotes="3" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="6" />
                <result value="Recommended" numvotes="3" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="6" />
                <result value="Recommended" numvotes="2" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="4" />
                <result value="Recommended" numvotes="4" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="2" />
                <result value="Recommended" numvotes="3" />
                <result value="Not Recommended" numvotes="3" />
            </results>
            <results numplayers="5+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="5" />
            </results>
        </poll>
        <playingtime value="90" />
        <minplaytime value="60" />
        <maxplaytime value="90" />
        <minage value="12" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="7">
            <results>
                <result value="2" numvotes="0" />
                <result value="3" numvotes="0" />
                <result value="4" numvotes="0" />
                <result value="5" numvotes="0" />
                <result value="6" numvotes="0" />
                <result value="8" numvotes="0" />
                <result value="10" numvotes="5" />
                <result value="12" numvotes="1" />
                <result value="14" numvotes="0" />
                <result value="16" numvotes="1" />
                <result value="18" numvotes="0" />
                <result value="21 and up" numvotes="0" />
            </results>
        </poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="3">
            <results>
                <result level="41" value="No necessary in-game text" numvotes="0" />
                <result level="42" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="43" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="2" />
                <result level="44" value="Extensive use of text - massive conversion needed to be playable" numvotes="1" />
                <result level="45" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1017" value="Dice" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamecategory" id="1046" value="Fighting" />
        <link type="boardgamecategory" id="1047" value="Miniatures" />
        <link type="boardgamemechanic" id="2001" value="Action Point Allowance System" />
        <link type="boardgamemechanic" id="2046" value="Area Movement" />
        <link type="boardgamemechanic" id="2023" value="Co-operative Play" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamemechanic" id="2011" value="Modular Board" />
        <link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
        <link type="boardgamefamily" id="24281" value="Campaign Games" />
        <link type="boardgamefamily" id="25158" value="Components: Miniatures" />
        <link type="boardgamefamily" id="8374" value="Crowdfunding: Kickstarter" />
        <link type="boardgamefamily" id="5615" value="Monsters" />
        <link type="boardgamefamily" id="5666" value="Solitaire Games" />
        <link type="boardgameexpansion" id="188349" value="Sword &amp; Sorcery: Vastaryous' Lair" />
        <link type="boardgamedesigner" id="67159" value="Simone Romano" />
        <link type="boardgamedesigner" id="67160" value="Nunzio Surace" />
        <link type="boardgameartist" id="4352" value="Mario Barbati" />
        <link type="boardgameartist" id="46213" value="Fabrizio Fiorentino" />
        <link type="boardgameartist" id="84289" value="Phroilan Gardner" />
        <link type="boardgameartist" id="84290" value="Fausto Gutierrez" />
        <link type="boardgamepublisher" id="17917" value="Ares Games" />
        <link type="boardgamepublisher" id="24589" value="Gremlin Project" />
        <link type="boardgamepublisher" id="264" value="Heidelberger Spieleverlag" />
        <statistics page="1">
            <ratings >
                <usersrated value="314" />
                <average value="8.55006" />
                <bayesaverage value="6.07528" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="1738" bayesaverage="6.07528" />
                    <rank type="family" id="5496" name="thematic" friendlyname="Thematic Rank" value="257" bayesaverage="6.44021" />
                </ranks>
                <stddev value="1.44873" />
                <median value="0" />
                <owned value="1274" />
                <trading value="9" />
                <wanting value="184" />
                <wishing value="1201" />
                <numcomments value="203" />
                <numweights value="29" />
                <averageweight value="3.7241" />
            </ratings>
        </statistics>
    </item>
    <item type="boardgame" id="156118">
        <thumbnail>https://cf.geekdo-images.com/images/pic1958377_t.jpg</thumbnail>
        <image>https://cf.geekdo-images.com/images/pic1958377.jpg</image>
        <name type="primary" sortindex="5" value="The Red Dragon&#039;s Lair" />
        <description>The Red Dragon's Lair is a fantasy adventure in which you become a Magician, Rogue, Warrior or Paladin on a quest to slay an evil dragon. You control the actions of a daring adventurer finding the way through a dungeon filled with undead monsters, elementals and treacherous traps. In the mysterious creepy corridors of the dungeon your quest continues against the evil forces that oppose you. Your daring efforts to reach the Red Dragon's Lair is where your adventure begins and your quest awaits.&amp;#10;&amp;#10;The evil Red Dragon lives deep within a dungeon filled with undead monsters and elementals. Your goal is to clear the dungeon of evil and slay the Red Dragon. You and the other players join together looting monsters and plundering the dungeon in search of magical items and weapons!&amp;#10;&amp;#10;This game is a character-driven game, which uses both cards and dice to deal with the many obstacles within the dungeon and the Red Dragon's Lair. Players play cards from their hands and roll dice to complete their goal.&amp;#10;&amp;#10;Players choose a character deck at the beginning of the game then equip their special items and weapons. Each character is unique and uses different styles of play. The crafty Rogue hides in the shadows firing arrows from a distance. The Paladin engages the monsters head-on with shield and sword. The Warrior jumps in the fray without regard for himself slaying monsters near and far. And the Magician uses powerful magic to protect the others and destroy monsters! The awesome forces that oppose you can prove to be more than a match and adventurers will die!&amp;#10;&amp;#10;Working together players battle monsters and avoid traps on their way to the Red Dragon's Lair. If you slay the Red Dragon you win the game!&amp;#10;&amp;#10;</description>
        <yearpublished value="2014" />
        <minplayers value="1" />
        <maxplayers value="7" />
        <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="3">
            <results numplayers="1">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="1" />
            </results>
            <results numplayers="2">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="3">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="3" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="4">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="5">
                <result value="Best" numvotes="2" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="6">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="7">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="1" />
                <result value="Not Recommended" numvotes="0" />
            </results>
            <results numplayers="7+">
                <result value="Best" numvotes="0" />
                <result value="Recommended" numvotes="0" />
                <result value="Not Recommended" numvotes="1" />
            </results>
        </poll>
        <playingtime value="120" />
        <minplaytime value="45" />
        <maxplaytime value="120" />
        <minage value="9" />
        <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="0">
	</poll>
        <poll name="language_dependence" title="Language Dependence" totalvotes="3">
            <results>
                <result level="121" value="No necessary in-game text" numvotes="0" />
                <result level="122" value="Some necessary text - easily memorized or small crib sheet" numvotes="0" />
                <result level="123" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="3" />
                <result level="124" value="Extensive use of text - massive conversion needed to be playable" numvotes="0" />
                <result level="125" value="Unplayable in another language" numvotes="0" />
            </results>
        </poll>
        <link type="boardgamecategory" id="1022" value="Adventure" />
        <link type="boardgamecategory" id="1002" value="Card Game" />
        <link type="boardgamecategory" id="1010" value="Fantasy" />
        <link type="boardgamemechanic" id="2023" value="Co-operative Play" />
        <link type="boardgamemechanic" id="2072" value="Dice Rolling" />
        <link type="boardgamefamily" id="7005" value="Animals: Dragons" />
        <link type="boardgamefamily" id="8374" value="Crowdfunding: Kickstarter" />
        <link type="boardgameexpansion" id="170956" value="The Red Dragon's Lair: Robin Hood the Rogue – Expansion Character" />
        <link type="boardgameintegration" id="192817" value="The Black Knights Adventure" />
        <link type="boardgameintegration" id="203213" value="The Red Dragon's Lair 2: Pharaoh's Tomb" />
        <link type="boardgamedesigner" id="7018" value="Logan Montgomery Knight" />
        <link type="boardgamedesigner" id="78959" value="Luke William Knight" />
        <link type="boardgameartist" id="80430" value="Amitabha Naskar" />
        <link type="boardgamepublisher" id="4" value="(Self-Published)" />
        <link type="boardgamepublisher" id="2456" value="The Game Crafter, LLC" />
        <link type="boardgamepublisher" id="28513" value="Knight Games (II)" />
        <statistics page="1">
            <ratings >
                <usersrated value="35" />
                <average value="7.10571" />
                <bayesaverage value="5.50671" />
                <ranks>
                    <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="10864" bayesaverage="5.50671" />
                </ranks>
                <stddev value="2.45321" />
                <median value="0" />
                <owned value="97" />
                <trading value="9" />
                <wanting value="2" />
                <wishing value="5" />
                <numcomments value="29" />
                <numweights value="5" />
                <averageweight value="1.6" />
            </ratings>
        </statistics>
    </item>
</items>`;
}