import { DiagramEngine } from "@projectstorm/react-diagrams";
import { graphlib, layout as dagreLayout } from "dagre";

export const layoutGraph = (
  engine: DiagramEngine,
  config = { rankdir: "TB", ranker: "longest-path" }
): void => {
  const model = engine.getModel();
  const g = new graphlib.Graph({
    multigraph: true,
    directed: true
  });
  g.setGraph(config);

  model.getNodes().forEach(node =>
    g.setNode(node.getID(), {
      width: node.width,
      height: node.height
    })
  );

  g.setDefaultEdgeLabel(() => ({}));

  model.getLinks().forEach(link => {
    if (link.getSourcePort() && link.getTargetPort()) {
      g.setEdge({
        v: link
          .getSourcePort()
          .getNode()
          .getID(),
        w: link
          .getTargetPort()
          .getNode()
          .getID(),
        name: link.getID()
      });
    }
  });

  dagreLayout(g);

  g.nodes().forEach(v => {
    const node = g.node(v);
    model.getNode(v).setPosition(node.x, node.y);
  });

  engine.setModel(model);
  engine.repaintCanvas();
};
