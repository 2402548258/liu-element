import type { StoryObj, Meta, ArgTypes } from "@storybook/vue3-vite";
import { ref, watch } from "vue";
import { fn } from "storybook/test";
import { LiuAlert, type AlertInstance } from "@xiaoyue789/liu-element";


type Story = StoryObj<typeof LiuAlert> & { argTypes?: ArgTypes };

const meta: Meta<typeof LiuAlert> = {
  title: "Example/Alert",
  component: LiuAlert,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["success", "warning", "info", "danger"],
    },
    effect: {
      control: "select",
      options: ["light", "dark"],
    },
    center: {
      control: "boolean",
    },
  },
  args: {
    onClose: fn(),
  },
};

export const Default: Story & { args: { visible: boolean } } = {
  args: {
    title: "标题",
    description: "这是一段描述",
    type: "success",
    effect: "light",
    closable: true,
    showIcon: true,
    visible: true,
  },
  render: (args) => ({
    components: { LiuAlert },
    setup() {
      const alertRef = ref<AlertInstance>();
      watch(
        () => (args as any).visible,
        (val: boolean) => {
          if (val) {
            alertRef.value?.open();
          } else {
            alertRef.value?.close();
          }
        }
      );
      return { args, alertRef };
    },
    template: `
     <liu-alert ref="alertRef" v-bind="args"></liu-alert>
    `,
  }),
};

export default meta;
