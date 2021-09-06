import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react';
import { Add } from '../components/Add';
import { Group, GroupData } from '../components/Group';
import { Player, PlayerData } from '../components/Player';
import { getID } from '../util/id';
import { TranslationService as t } from '../util/translation';

const Page: React.FC<{ title: string, onClick?: () => unknown }> = ({ title, children, onClick }) => {
  let cols = 2;

  const screenSize = ScreenSize();
  if (screenSize.width < 650) cols = 1;

  return (
    <div className="flex flex-col justify-start items-start my-16" >
      <h1 className="text-6xl mb-8 cursor-pointer" onClick={onClick} >{title}</h1>
      <div className={`grid grid-cols-${cols} max-h-full overflow-y-auto overflow-x-hidden`}>
        {children}
      </div>
    </div>
  );
};

type GroupStore = Map<number, GroupData>;
type PlayerStore = Map<number, PlayerData>;

interface Context {
  groups: GroupStore;
  players: PlayerStore;

  updateGroup(group: GroupData): void;
  updatePlayer(player: PlayerData): void;
}

function getGroup() {
  const r = Math.random();
  const c = Math.floor((r * 16 ** 6) / 2 + (16 ** 6) / 2);

  return {
    id: getID(),
    name: t.get('group.name'),
    color: `#${c.toString(16)}`,
  } as GroupData;
}
function getPlayer(groups: GroupStore) {
  return {
    id: getID(),
    name: t.get('player.name'),
    group: Array.from(groups.values())[0]?.id ?? -1,

    betting: 0,
  } as PlayerData;
}

function getGroups() {
  const groups: GroupData[] = [
    getGroup(),
    getGroup(),
    getGroup(),
  ];

  const map: GroupStore = new Map();
  groups.forEach(g => map.set(g.id, g));

  return map;
}
function getPlayers(groups: GroupStore) {
  const players: PlayerData[] = [
    getPlayer(groups),
    getPlayer(groups),
    getPlayer(groups),
  ];

  const map: PlayerStore = new Map();
  players.forEach(g => map.set(g.id, g));

  return map;
}

const PlayerPage: React.FC<{ context: Context, onClick?: () => unknown }> = ({ context, onClick }) => {
  const { groups, players, updatePlayer } = context;

  return (
    <Page title={t.get('player.title')} onClick={onClick} >
      {
        Array.from(players.values()).map(player => (
          <Player key={player.id} groups={groups} players={players} player={player} update={updatePlayer} />
        ))
      }
      <Add
        onClick={() => {
          const newPlayer = getPlayer(groups);
          updatePlayer(newPlayer);
        }}
      />
    </Page>
  );
};

const GroupPage: React.FC<{ context: Context, onClick?: () => unknown }> = ({ context, onClick }) => {
  const { groups, players, updateGroup } = context;

  return (
    <Page title={t.get('group.title')} onClick={onClick} >
      {
        Array.from(groups.values()).map(group => (
          <Group key={group.id} group={group} update={updateGroup} />
        ))
      }
      <Add
        onClick={() => {
          const newGroup = getGroup();
          updateGroup(newGroup);
        }}
      />
    </Page>
  );
};

interface Size {
  width: number;
  height: number;
}

function ScreenSize() {
  const [size, setSize] = useState<Size | null>(null);
  useEffect(() => {
    function onResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    onResize();

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return size ?? { width: 0, height: 0 };
}

const DefaultLayout: React.FC<{ context: Context }> = ({ context }) => {
  return (
    <div className="py-8 px-24 h-screen w-screen grid grid-cols-main grid-rows-full" >
      <PlayerPage context={context} />
      <div className="h-full bg-gray-600 mx-14 rounded-full" style={{ width: 3 }} />
      <GroupPage context={context} />
    </div>
  );
}

const SingleLayout: React.FC<{ context: Context }> = ({ context }) => {
  const { groups, players, updateGroup, updatePlayer } = context;
  const [viewingGroup, setViewingGroup] = useState(false);

  return (
    <div className="py-8 px-8 h-screen w-screen flex flex-col justify-start items-center" >
      {
        viewingGroup ?
        <GroupPage context={context} onClick={() => setViewingGroup(false)} /> :
        <PlayerPage context={context} onClick={() => setViewingGroup(true)} />
      }
    </div>
  );
}

const initialGroups = getGroups();
const initialPlayers = getPlayers(initialGroups);

const Home: NextPage = () => {
  const [groups, setGroups] = useState<GroupStore>(new Map());
  const [players, setPlayers] = useState<PlayerStore>(new Map());

  const screenSize = ScreenSize();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setGroups(initialGroups);
      setPlayers(initialPlayers);
    }
  }, []);

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

  if (screenSize.width < 1220) {
    return (
      <SingleLayout context={{
        groups,
        players,
  
        updateGroup,
        updatePlayer,
      }} />
    );
  }

  return (
    <DefaultLayout context={{
      groups,
      players,

      updateGroup,
      updatePlayer,
    }} />
  );
}

export default Home
