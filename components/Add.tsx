import React from "react";
import { Box } from "./Box";

export const Add: React.FC<{ onClick?: () => unknown }> = ({ onClick }) => {
  return (
    <Box color={'#fff'} className="flex justify-center items-center" >
      <button
        className="flex justify-center items-center w-48 h-48 bg-button hover:bg-button-hover rounded-full"
        onClick={onClick}
      >
        <img className="w-40 h-40" src="/plus.svg" />
      </button>
    </Box>
  );
}