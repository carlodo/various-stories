import React from "react";
import { storiesOf } from "@storybook/react";
import { FileDiagram } from "@sljk/filesys";
import { diagramDecorator } from "./storyDecorators";

storiesOf("Diagrams", module)
  .addParameters({ options: { enableShortcuts: false } })
  .addDecorator(diagramDecorator)
  .add("File sysytem diagram", () => <FileDiagram />);
