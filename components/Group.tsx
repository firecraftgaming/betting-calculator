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
  function openColorPicker() {
    const elem = document.createElement("input");
    elem.type = "color";
    elem.value = group.color;
    
    elem.addEventListener("change", (e) => {
      const color = (e.target as HTMLInputElement)?.value;
      if (color) {
        update({ ...group, color });
      }
    });

    elem.click();
  }

  return (
    <Box color={group.color}>
      <div>
        <input
          className="text-xl font-bold outline-none bg-transparent"
          value={group.name}
          onChange={(e) => update({ ...group, name: e.target.value })}
        />
      </div>
      <div />
      <div />
      <button
        className="absolute top-0 right-0 w-10 h-10 rounded-lg m-3"
        onClick={() => openColorPicker()}
        style={{
          backgroundColor: group.color,
        }}
      />
    </Box>
  );
}