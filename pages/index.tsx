import type { NextPage } from 'next'
import React, { useState } from 'react';
import { Group, GroupData } from '../components/Group';
import { Player, PlayerData } from '../components/Player';
import { getID } from '../util/id';
import { TranslationService as t } from '../util/translation';

const Page: React.FC<{ title: string }> = ({ title, children }) => {
  return (
    <div className="flex flex-col justify-start items-start my-16" >
      <h1 className="text-6xl mb-8">{title}</h1>
      <div className="grid grid-cols-2 max-h-full overflow-y-auto overflow-x-hidden">
        {children}
      </div>
    </div>
  );
};

function getGroups() {
  const groups: GroupData[] = [
    {
      id: getID(),
      name: 'Group 1',
      color: 'purple',
    },
    {
      id: getID(),
      name: 'Group 2',
      color: 'blue',
    },
    {
      id: getID(),
      name: 'Group 3',
      color: 'red',
    },
    {
      id: getID(),
      name: 'Group 4',
      color: 'green',
    },
  ];

  const map = new Map<number, GroupData>();
  groups.forEach(g => map.set(g.id, g));

  return map;
}
function getPlayers(groups: Map<number, GroupData>) {
  const players: PlayerData[] = [
    {
      id: getID(),
      name: 'Eliyah Sundström',
      group: Array.from(groups.values()).find(v => v.name === 'Group 2')?.id!,
      betting: 0,
    },
    {
      id: getID(),
      name: 'Enzo Sundström',
      group: Array.from(groups.values()).find(v => v.name === 'Group 3')?.id!,
      betting: 0,
    },
    {
      id: getID(),
      name: 'Ellie',
      group: Array.from(groups.values()).find(v => v.name === 'Group 4')?.id!,
      betting: 0,
    },
    {
      id: getID(),
      name: 'firecraft gaming',
      group: Array.from(groups.values()).find(v => v.name === 'Group 3')?.id!,
      betting: 0,
    },
  ];

  const map = new Map<number, PlayerData>();
  players.forEach(g => map.set(g.id, g));

  return map;
}

const initialGroups = getGroups();
const initialPlayers = getPlayers(initialGroups);

const Home: NextPage = () => {
  const [groups, setGroups] = useState(initialGroups);
  const [players, setPlayers] = useState(initialPlayers);

  function updatePlayer(player: PlayerData) {
    const newPlayers = new Map(players);
    player.betting = Math.max(player.betting, 0);
    newPlayers.set(player.id, player);
    setPlayers(newPlayers);
  }

  function updateGroup(group: GroupData) {
    const newGroups = new Map(groups);
    newGroups.set(group.id, group);
    setGroups(newGroups);
  }
  
  return (
    <div className="py-8 px-24 h-screen w-screen grid grid-cols-main grid-rows-full" >
      <Page title={t.get('player.title')}>
        {
          Array.from(players.values()).map(player => (
            <Player key={player.id} groups={groups} players={players} player={player} update={updatePlayer} />
          ))
        }
      </Page>
      <div className="h-full bg-gray-600 mx-14 rounded-full" style={{ width: 3 }} />
      <Page title={t.get('group.title')}>
        {
          Array.from(groups.values()).map(group => (
            <Group key={group.id} group={group} update={updateGroup} />
          ))
        }
      </Page>
    </div>
  )
}

export default Home
