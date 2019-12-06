import React from "react";
import { storiesOf } from "@storybook/react";
import { Diagram } from "./flowDiagram";
import {
  ActivityNode,
  ActivityNodePort
} from "./flowDiagram/Nodes/Activity/ActivityNode";
import { theme } from "./flowDiagram/theme";
import { EventNodePort, EventNode } from "./flowDiagram/Nodes/Event/EventNode";
import {
  GatewayPort,
  GatewayNode,
  Spacer
} from "./flowDiagram/Nodes/Gateway/GatewayNode";
import { themeDecorator } from "./themeDecorator";
import { Folder, FolderBody } from "./filesys/graph/folder/Folder";
import { File, FileBody } from "./filesys/graph/file/File";
import { Diagram as FileDiagram } from "./filesys/Diagram";
import { diagramDecorator } from "./diagramDecorator";

storiesOf("Diagrams", module)
  .addParameters({ options: { enableShortcuts: false } })
  .addDecorator(diagramDecorator)
  .add("File sysytem diagram", () => <FileDiagram />)
  .add("Flow diagram", () => <Diagram />);

storiesOf("File system diagram components", module)
  .addParameters({ options: { enableShortcuts: false } })
  .addDecorator(themeDecorator)
  .add(
    "Directory",
    () => (
      <Folder model={{ name: "home" }}>
        <FolderBody />
      </Folder>
    ),
    { info: { inline: true } }
  )
  .add(
    "Working directory",
    () => (
      <Folder model={{ name: "home", isPWD: true }}>
        <FolderBody isPWD />
      </Folder>
    ),
    { info: { inline: true } }
  )
  .add(
    "File",
    () => (
      <File model={{ name: "passwd" }}>
        <FileBody />
      </File>
    ),
    { info: { inline: true } }
  );

storiesOf("Flow diagram components", module)
  .addDecorator(themeDecorator)
  .add(
    "Activity Node",
    () => (
      <ActivityNode
        model={{
          name: "Sample activity",
          color: theme.global.colors.green,
          isSelected: () => false
        }}
      >
        <ActivityNodePort />
      </ActivityNode>
    ),
    { info: { inline: true } }
  )
  .add(
    "Event Node",
    () => (
      <EventNode
        model={{
          name: "Sample event",
          color: theme.global.colors.green,
          isSelected: () => false
        }}
      >
        <EventNodePort />
        <EventNodePort />
      </EventNode>
    ),
    { info: { inline: true } }
  )
  .add(
    "Gateway Node",
    () => (
      <GatewayNode
        model={{
          name: "Sample gateway",
          color: theme.global.colors.purple,
          isSelected: () => false
        }}
      >
        <GatewayPort />
        <GatewayPort />
        <Spacer />
        <GatewayPort />
        <GatewayPort />
      </GatewayNode>
    ),
    {
      info: { inline: true }
    }
  );
