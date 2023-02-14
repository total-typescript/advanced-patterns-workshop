import React from "react";

/**
 * As a bonus, how do we make sure that it has
 * some required props?
 */

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "custom-solution-element": {
        children?: React.ReactNode;
      };
    }
  }
}

const element = <custom-solution-element>hello world</custom-solution-element>;
