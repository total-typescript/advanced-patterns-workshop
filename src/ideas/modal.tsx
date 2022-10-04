import React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      modal: {
        id: string;
        children?: React.ReactNode;
      };
    }
  }
}

const Component = () => {
  return <modal id="modal">Nice modal!</modal>;
};
