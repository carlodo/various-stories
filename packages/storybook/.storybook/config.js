import { configure, addDecorator } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

function loadStories() {
  const req = require.context("../src", true, /\.stories\.tsx$/);

  addDecorator(withInfo);
  req.keys().forEach(req);
}

configure(loadStories, module);
