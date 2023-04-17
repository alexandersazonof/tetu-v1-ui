import { componentWrapperDecorator } from "@storybook/angular";

// workaround for error 'Buffer is not defined
import { Buffer } from "buffer";
window.Buffer = Buffer;

export const parameters = {
  controls: {},
  docs: { inlineStories: true },
};

const withProvider = (story, context) => {
  return componentWrapperDecorator((story) => {
    // Styles for storybook wrapper
    return `
<div style="font-family: 'Source Sans Pro', sans-serif;
            color: #444444;
            padding: 12px">
    ${story}
</div>`;
  })(story, context);
};

export const decorators = [ withProvider ];
