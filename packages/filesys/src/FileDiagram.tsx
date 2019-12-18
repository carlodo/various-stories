import React from "react";
import { makeFilesysCliBundle } from "./filesystemCLI";
import { Diagram } from "@sljk/nice-graph";

const filesysCliBundle = makeFilesysCliBundle();

type Props = {};

export const FileDiagram: React.FC<Props> = () => {
  return <Diagram cliBundle={filesysCliBundle} />;
};
