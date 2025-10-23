import {
  createVNode,
  isVNode,
  ref,
  render,
  nextTick,
  type ComponentPublicInstance,
  type VNode,
} from "vue";
import type {
  IErMessageBox,
  MessageBoxAction,
  MessageBoxCallback,
  MessageBoxOptions,
  MessageBoxProps,
} from "./types";
import { assign, each, isFunction, isObject, isString, isUndefined,set } from "lodash-es";
import messageBoxConstructor from "./MessageBox.vue";
const MessageInstanceMap = new Map<
  ComponentPublicInstance<{ doClose: () => void }>,
  {
    options: MessageBoxOptions;
    callback: MessageBoxCallback | void;
    resolve: (res: any) => void;
    reject: (res: any) => void;
  }
>();

function MessageBox(options: MessageBoxOptions | string | VNode): Promise<any> {
  let callback: MessageBoxCallback | void;
  if (isString(options) || isVNode(options)) {
    options = { message: options };
  } else {
    callback = options.callback;
  }
  return new Promise((resolve, reject) => {
    const vm = showMessage(options);
    MessageInstanceMap.set(vm, {
      options,
      callback,
      resolve,
      reject,
    });
  });
}

function showMessage(options: MessageBoxOptions) {
  const container = document.createElement("div");
  const props: MessageBoxProps = {
    ...options,
    doClose() {
      vm.visible!.value = false;
    },
    doAction(action: MessageBoxAction, inputVal: string) {
      const currentMsg = MessageInstanceMap.get(vm);
      let resolve:
        | MessageBoxAction
        | { value: string; action: MessageBoxAction };
      nextTick(() => vm.doClose());
      if (options.showInput) {
        resolve = { value: inputVal, action };
      } else {
        resolve = action;
      }
      if (options.callback) {
        options.callback(resolve);
        return;
      }
      if (action === "close" || action === "cancel") {
        currentMsg?.reject(resolve);
        return;
      }
      currentMsg?.resolve(resolve);
    },
    destroy() {
      render(null, container);
      MessageInstanceMap.delete(vm);
    },
  };

  const instance = initInstance(props, container);
  const vm = instance?.proxy as ComponentPublicInstance<MessageBoxProps>;
  vm.visible!.value = true;
  return vm;
}

function initInstance(props: MessageBoxProps, container: HTMLElement) {
  const visible = ref(false);
  const isNodeMsg = isVNode(props?.message) || isFunction(props?.message);
  const generateDefaultSlot = (message: VNode | (() => VNode)) =>
    isFunction(message) ? message : () => message;
  const vNode = createVNode(
    messageBoxConstructor,
    {
      ...props,
      visible,
    },
    isNodeMsg
      ? generateDefaultSlot(props.message as VNode | (() => VNode))
      : void 0
  );
  render(vNode, container);
  document.body.appendChild(container.firstElementChild!);
  return vNode.component;
}

const MESSAGE_BOX_VARIANTS = ["alert", "confirm", "prompt"] as const;

const MESSAGE_BOX_DEFAULT_OPTS: Record<
  (typeof MESSAGE_BOX_VARIANTS)[number],
  Partial<MessageBoxOptions>
> = {
  alert: { closeOnClickModal: false },
  confirm: { showCancelButton: true },
  prompt: { showCancelButton: true, showInput: true },
};

function messageBoxFactory(boxType: (typeof MESSAGE_BOX_VARIANTS)[number]) {
  return (
    message: string | VNode,
    title: string | MessageBoxOptions,
    options: MessageBoxOptions
  ) => {
    let titleOrOptions = "";
    if (isObject(title)) {
      options = title;
      titleOrOptions = "";
    } else if (isUndefined(title)) {
      titleOrOptions = "";
    } else {
      titleOrOptions = title;
    }
    return MessageBox(
        assign({
            title:titleOrOptions,
            message,
            type:'',
            boxType,
            ...MESSAGE_BOX_DEFAULT_OPTS[boxType],
        },
        options
    )  
    )
  };
}

each(MESSAGE_BOX_VARIANTS, (type) => {
    set(MessageBox,type,messageBoxFactory(type))
})

set(MessageBox, "close", () => {
  MessageInstanceMap.forEach((_, vm) => {
    vm.doClose();
  });
  MessageInstanceMap.clear();
});


export default MessageBox as IErMessageBox;

