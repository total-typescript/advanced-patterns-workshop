import React from "react";

/**
 * As a bonus, how do we make sure that it has
 * some required props?
 */

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "custom-solution-element": {};
    }
  }
}

const element = <custom-solution-element>hello world</custom-solution-element>;
