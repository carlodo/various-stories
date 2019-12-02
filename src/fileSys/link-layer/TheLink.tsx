import * as React from "react";
import {
  DiagramEngine,
  LinkWidget,
  PointModel
} from "@projectstorm/react-diagrams-core";
import { MouseEvent } from "react";
import {
  DefaultLinkModel,
  DefaultLinkPointWidget,
  DefaultLinkSegmentWidget
} from "@projectstorm/react-diagrams";

export interface DefaultLinkProps {
  link: DefaultLinkModel;
  diagramEngine: DiagramEngine;
  pointAdded?: (point: PointModel, event: MouseEvent) => any;
}

export interface DefaultLinkState {
  selected: boolean;
}

export class DefaultLinkWidget extends React.Component<
  DefaultLinkProps,
  DefaultLinkState
> {
  refPaths: React.RefObject<SVGPathElement>[];

  constructor(props: DefaultLinkProps) {
    super(props);
    this.refPaths = [];
    this.state = {
      selected: false
    };
  }

  componentDidUpdate(): void {
    this.props.link.setRenderedPaths(
      this.refPaths.map(ref => {
        return ref.current;
      })
    );
  }

  componentDidMount(): void {
    this.props.link.setRenderedPaths(
      this.refPaths.map(ref => {
        return ref.current;
      })
    );
  }

  componentWillUnmount(): void {
    this.props.link.setRenderedPaths([]);
  }

  addPointToLink(event: MouseEvent, index: number) {
    if (
      !event.shiftKey &&
      !this.props.link.isLocked() &&
      this.props.link.getPoints().length - 1 <=
        this.props.diagramEngine.getMaxNumberPointsPerLink()
    ) {
      const point = new PointModel({
        link: this.props.link,
        position: this.props.diagramEngine.getRelativeMousePoint(event)
      });
      this.props.link.addPoint(point, index);
      event.persist();
      event.stopPropagation();
      this.forceUpdate(() => {
        this.props.diagramEngine.getActionEventBus().fireAction({
          event,
          model: point
        });
      });
    }
  }

  generatePoint(point: PointModel): JSX.Element {
    return (
      <DefaultLinkPointWidget
        key={point.getID()}
        point={point as any}
        colorSelected={this.props.link.getOptions().selectedColor}
        color={this.props.link.getOptions().color}
      />
    );
  }

  generateLink(
    path: string,
    extraProps: any,
    id: string | number
  ): JSX.Element {
    const ref = React.createRef<SVGPathElement>();
    this.refPaths.push(ref);
    return (
      <DefaultLinkSegmentWidget
        key={`link-${id}`}
        path={path}
        selected={this.state.selected}
        diagramEngine={this.props.diagramEngine}
        factory={this.props.diagramEngine.getFactoryForLink(this.props.link)}
        link={this.props.link}
        forwardRef={ref}
        onSelection={selected => {
          this.setState({ selected: selected });
        }}
        extras={extraProps}
      />
    );
  }

  render() {
    //ensure id is present for all points on the path
    var points = this.props.link.getPoints();
    var paths = [];
    this.refPaths = [];

    if (points.length === 2) {
      paths.push(
        this.generateLink(
          this.props.link.getSVGPath(),
          {
            onMouseDown: event => {
              this.addPointToLink(event, 1);
            }
          },
          "0"
        )
      );

      // draw the link as dangeling
      if (this.props.link.getTargetPort() == null) {
        paths.push(this.generatePoint(points[1]));
      }
    }

    return (
      <g data-default-link-test={this.props.link.getOptions().testName}>
        <DefaultLinkSegmentWidget
          key="link-0"
          path={path}
          selected={this.state.selected}
          diagramEngine={this.props.diagramEngine}
          factory={this.props.diagramEngine.getFactoryForLink(this.props.link)}
          link={this.props.link}
          forwardRef={() => <span>asdf</span>}
          extras={{}}
        />
        <DefaultLinkSegmentWidget
          key="link-1"
          path={path}
          selected={this.state.selected}
          diagramEngine={this.props.diagramEngine}
          factory={this.props.diagramEngine.getFactoryForLink(this.props.link)}
          link={this.props.link}
          onSelection={selected => {
            this.setState({ selected: selected });
          }}
        />
      </g>
    );
  }
}
