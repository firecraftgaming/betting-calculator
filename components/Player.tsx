import React, { useState } from "react";
import { Box } from "./Box";
import { GroupData, invalidGroup } from "./Group";
import { TranslationService as t } from '../util/translation';
import { Delete } from "./Delete";

const GroupChanger: React.FC<{ group: GroupData, onClick?: () => unknown }> = ({ group, onClick }) => {
  return (
    <button className="underline" style={{ color: group.color }} onClick={() => onClick?.()}>{group.name || ''}</button>
  );
};

function getNext(groups: Map<number, GroupData>, current: number) {
  const values = Array.from(groups.values());
  for (let i = 0; i < values.length; i++) {
    if (!groups.has(current)) return values[i].id;
    if (values[i].id !== current) continue;

    const index = (i + 1) % values.length;
    return values[index].id;
  }

  return -1;
}

export interface PlayerData {
  id: number;
  name: string;
  group: number;

  betting: number;
}
function formatNumber(number: number) {
  if (isNaN(number)) return '';
  return number.toString();
}
function calculateWinning(players: Map<number, PlayerData>, player: PlayerData) {
  if (player.betting < 1) return 0;
  const p = Array.from(players.values());

  const totalBetting = p.reduce((acc, cur) => acc + cur.betting, 0);
  const totalBettingGroup = p.filter(p => p.group === player.group).reduce((acc, cur) => acc + cur.betting, 0);

  const winningFraction = player.betting / totalBettingGroup;
  const winning = Math.floor(totalBetting * winningFraction);
  return winning;
}
export const Player: React.FC<{ groups: Map<number, GroupData>, players: Map<number, PlayerData>, player: PlayerData, update: (player: PlayerData, remove?: boolean) => void }> = ({ groups, players, player, update }) => {
  let group = groups.get(player.group) ?? invalidGroup;
  if (group === invalidGroup) {
    const next = getNext(groups, player.group);
    if (next >= 0) {
      group = groups.get(next) ?? invalidGroup;
      update({ ...player, group: next });
    }
  }

  return (
    <Box color={group.color}>
      <div>
        <input
          className="text-xl font-bold outline-none bg-transparent pr-4"
          value={player.name}
          onChange={(e) => update({ ...player, name: e.target.value })}
        />
        <div>{t.get('player.betting.on')} <GroupChanger group={group} onClick={() => {
          player.group = getNext(groups, player.group);
          update(player);
        }} /></div>
      </div>

      <div className="w-full my-8 rounded-full" style={{ height: 3, backgroundColor: group.color }} />

      <div>
        <div>{t.get('player.betting.amount')} <input
          className="outline-none bg-transparent"
          value={formatNumber(player.betting)}
          type="number"
          onChange={(e) => update({ ...player, betting: parseInt(e.target.value) })}
        /></div>
        <div>{t.get('player.winning.amount')} {calculateWinning(players, player)}</div>
      </div>

      <button
        className="flex justify-center items-center absolute bottom-0 right-0 w-10 h-10 rounded-lg m-3 hover:bg-red-hover"
        onClick={() => update(player, true)}
      >
        <Delete />
      </button>
    </Box>
  );
}