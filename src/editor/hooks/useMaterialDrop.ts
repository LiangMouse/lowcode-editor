// 拖拽放置生效的Hook函数
import { useDrop } from "react-dnd";
import { useComponentConfigStore } from "../stores/component-config";
import { useComponetsStore } from "../stores/components";

export function useMaterailDrop(accept: string[], id: number) {
  // accept: 允许放置的类型,id: 父组件的id
  const { addComponent } = useComponetsStore();
  const { componentConfig } = useComponentConfigStore();

  const [{ canDrop }, drop] = useDrop(() => ({
    accept,
    drop: (item: { type: string }, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }

      const props = componentConfig[item.type].defaultProps;

      addComponent(
        {
          id: new Date().getTime(),
          name: item.type,
          props,
        },
        id
      );
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
    //collect 函数的作用是根据拖放操作的状态（例如是否可以放置、是否正在拖动等）来收集数据，并返回这些数据，以便在组件中使用。
    //这里的canDrop是布尔值，表示是否可以放置。
  }));

  return { canDrop, drop };
}
