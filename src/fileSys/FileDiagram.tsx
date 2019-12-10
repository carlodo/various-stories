import React from "react";
import { makeLearnCliBundle } from "./filesystemCLI";
import { Diagram } from "../cliGraphPlatform/Diagram";

const tutorial = makeLearnCliBundle();

type Props = {};

export const FileDiagram: React.FC<Props> = () => {
  return <Diagram cliBundle={tutorial} />;
};
