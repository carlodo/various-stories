import React from "react";
import { makeLearnCliBundle } from "./filesystemCLI";
import { Diagram } from "@sljk/nice-graph";

const tutorial = makeLearnCliBundle();

type Props = {};

export const FileDiagram: React.FC<Props> = () => {
  return <Diagram cliBundle={tutorial} />;
};
