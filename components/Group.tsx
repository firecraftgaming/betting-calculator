import React from "react";
import { Box } from "./Box";

export const invalidGroup: GroupData = {
  id: -1,
  name: "Invalid",
  color: "#fff",
} as const;

export interface GroupData {
  id: number;
  name: string;
  color: string;
}

export const Group: React.FC<{ group: GroupData, update: (group: GroupData) => void }> = ({ group, update }) => {
  return (
    <Box color={group.color}>
      <input
        className="text-xl font-bold outline-none bg-transparent"
        value={group.name}
        onChange={(e) => update({ ...group, name: e.target.value })}
      />
    </Box>
  );
}