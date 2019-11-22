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
import { FolderPort, Folder } from "./fileSys/Nodes/Folder/Folder";

storiesOf("Flow diagram", module)
  .addDecorator(themeDecorator)
  .add("Flow Diagram", () => <Diagram />, {
    info: { inline: false }
  })
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

storiesOf("File system", module)
  .addDecorator(themeDecorator)
  .add(
    "Folder",
    () => (
      <Folder model={{ name: "/", color: "blue", isSelected: () => false }}>
        <FolderPort />
        <FolderPort />
      </Folder>
    ),
    {
      info: { inline: true }
    }
  );
