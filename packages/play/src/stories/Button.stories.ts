import type { Meta, StoryObj, ArgTypes } from "@storybook/vue3-vite";
import { LiuButton } from "liu-element";




// type Story = StoryObj<typeof LiuButton> & { argTypes?: ArgTypes };
type Story = StoryObj<typeof meta>;

const meta: Meta<typeof LiuButton> = {
  title: "Example/Button",
  component: LiuButton,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["primary", "success", "warning", "danger", "info", ""],
    },
    size: {
      control: { type: "select" },
      options: ["large", "default", "small", ""],
    },
    disabled: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
    },
    useThrottle: {
      control: "boolean",
    },
    throttleDuration: {
      control: "number",
    },
    autofocus: {
      control: "boolean",
    },
    tag: {
      control: { type: "select" },
      options: ["button", "a", "div"],
    },
    nativeType: {
      control: { type: "select" },
      options: ["button", "submit", "reset", ""],
    },
    icon: {
      control: { type: "text" },
    },
    loadingIcon: {
      control: { type: "text" },
    },
  },
  args:{onClick:() => {console.log("click")}}
};
const container = (val: string) => `
<div style="margin:5px">
  ${val}
</div>
`;
export const Default: Story & { args: { content: string } }= {
  argTypes: {
    content: {
      control: { type: "text" },
    },
  },
  args: {
    type: "primary",
    content: "Button",
  },
  render: (args:any) => ({
    components: { LiuButton },
    setup() {
      return { args };
    },
    template: container(
      `<liu-button v-bind="args">{{args.content}}</liu-button>`
    ),
  }),
}
export default meta;
