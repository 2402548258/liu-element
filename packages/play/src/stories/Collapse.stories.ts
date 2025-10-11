
import type { Meta, StoryObj} from "@storybook/vue3-vite";
import { LiuCollapse, LiuCollapseItem } from "@xiaoyue789/liu-element";
// import "eric-ui/dist/theme/Collapse.css";

type Story = StoryObj<typeof meta>;

const meta: Meta<typeof LiuCollapse> = {
  title: "Example/Collapse",
  component: LiuCollapse,
  subcomponents: { LiuCollapseItem },
  tags: ["autodocs"],
};

export const Default: Story = {
  render: (args) => ({
    components: {
      LiuCollapse,
      LiuCollapseItem,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
    <liu-collapse v-bind="args">
      <liu-collapse-item name="a" title="Title a" :disabled="args.disableda">
        <div>this is content a</div>
      </liu-collapse-item>
      <liu-collapse-item name="b" title="title b" :disabled="args.disabledb">
        <div>this is content b</div>
      </liu-collapse-item>
      <liu-collapse-item name="c" title="title c" :disabled="args.disabledc">
        <div>this is content c</div>
      </liu-collapse-item>
    </liu-collapse>
    `,
  }),
  args: {
    accordion: false,
    modelValue: ["a"],
    disableda: false,
    disabledb: false,
    disabledc: false,
  },
};

export default meta;
