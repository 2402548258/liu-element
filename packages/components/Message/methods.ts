import { h, isVNode, render, shallowReactive } from "vue";
import { messageTypes, type CreateMessageProps, type Message, type MessageFn, type MessageHandler, type MessageInstance, type MessageParams, type MessageProps, type messageType } from "./type";
import { each, findIndex, get, isString, set } from "lodash-es";
import { useId, useZIndex } from "@liu-element/hooks";
import MessageConstructor from "./Message.vue";


const instances: MessageInstance[] = shallowReactive([]);
const {nextZIndex} =useZIndex()

export const messageDefaults = {
  type: "info",
  duration: 3000,
  offset: 10,
  transitionName: "fade-up",
} as const;

function normalizeOptions(options: MessageParams):CreateMessageProps{
  const result = !options || isString(options) || isVNode(options) ? {
    message: options,
  } : options;
 return { ...messageDefaults, ...result };
}

function createMessage(props: CreateMessageProps):MessageInstance{ 
  const id = useId().value
  const container = document.createElement("div");
  const options = normalizeOptions(props);



  const destroy = () => {
    const idx = findIndex(instances, {id})
    if(idx===-1) return
    instances.splice(idx, 1)
    render(null, container)
  }

  const _props = {
    ...props,
    id,
    zIndex: nextZIndex(),
    onDestory: destroy,
  }; 

    const vnode = h(MessageConstructor, _props);
    render(vnode, container);
    document.body.appendChild(container.firstElementChild!);
    const vm = vnode.component!
    const handle:MessageHandler = {
      close:vm.exposed!.close
    }
    const instance: MessageInstance = {
      props: _props,
      id, 
      vnode,
      vm,
      handler: handle,
    };
    instances.push(instance);
    return instance;
}

export const message:MessageFn & Partial<Message> = function (options:MessageParams){
   const normallize = normalizeOptions(options)
   const instance = createMessage(normallize)
   return instance.handler
}

export function closeAll(type?: messageType) {
  each(instances, (instance) => {
    if (type) {
      instance.props.type === type && instance.handler.close();
      return;
    }
    instance.handler.close();
  });
}

each(messageTypes, (type) => {
  set(message, type, (options: MessageParams) => {
    const normalized = normalizeOptions(options);
    return message({ ...normalized, type });
  });
});

message.closeAll = closeAll;

export function getLastBottomOffset(this:MessageProps){
 const ids = findIndex(instances, {id:this.id})
 if(ids<=0) return 0
 return get(instances, [ids - 1, "vm", "exposed", "bottomOffset", "value"]);
}


export default message as Message;