import { CSSProperties } from "react";
import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

export interface Component {
  id: number;
  name: string;
  props: any;
  styles?: CSSProperties;
  desc: string;
  children?: Component[];
  parentId?: number;
}

interface State {
  components: Component[];
  curComponentId?: number | null; // 当前选中的组件id,点击时设置区同步
  curComponent: Component | null; // 当前选中的组件对象
  mode: "edit" | "preview"; // 编辑模式或预览模式
}

interface Action {
  addComponent: (component: Component, parentId?: number) => void;
  deleteComponent: (componentId: number) => void;
  updateComponentProps: (componentId: number, props: any) => void;
  updateComponentStyles: (
    componentId: number,
    styles: CSSProperties,
    replace?: boolean
  ) => void;
  setCurComponentId: (componentId: number | null) => void;
  setMode: (mode: State["mode"]) => void;
}
const creator: StateCreator<State & Action> = (set, get) => ({
  // 实现一个组件列表，其中有一个Page作为顶层节点；实现增删改方法
  components: [
    {
      id: 1,
      name: "Page",
      props: {},
      desc: "页面",
    },
  ],
  curComponentId: null,
  curComponent: null,
  mode: "edit",
  setMode: (mode) => set({ mode }),
  setCurComponentId: (componentId) =>
    set((state) => ({
      curComponentId: componentId,
      curComponent: getComponentById(componentId, state.components),
    })),
  addComponent: (component, parentId) =>
    set((state) => {
      if (parentId) {
        const parentComponent = getComponentById(parentId, state.components);

        if (parentComponent) {
          if (parentComponent.children) {
            parentComponent.children.push(component); // 找到父节点后给父节点的children添加一个子节点
          } else {
            parentComponent.children = [component]; // 父节点还没有children属性时给他添加一个
          }
        }

        component.parentId = parentId; // 新增节点的父节点指向父节点
        return { components: [...state.components] };
      }
      return { components: [...state.components, component] }; // 无父节点则直接新增为一级节点
    }),
  deleteComponent: (componentId) => {
    if (!componentId) return;

    const component = getComponentById(componentId, get().components);
    if (component?.parentId) {
      const parentComponent = getComponentById(
        component.parentId,
        get().components
      );

      if (parentComponent) {
        parentComponent.children = parentComponent?.children?.filter(
          (item) => item.id !== +componentId
        );

        set({ components: [...get().components] });
      }
    }
  },
  updateComponentProps: (componentId, props) =>
    set((state) => {
      const component = getComponentById(componentId, state.components);
      if (component) {
        component.props = { ...component.props, ...props };

        return { components: [...state.components] };
      }

      return { components: [...state.components] };
    }),
  updateComponentStyles: (componentId, styles) =>
    set((state) => {
      const component = getComponentById(componentId, state.components);
      if (component) {
        component.styles = { ...component.styles, ...styles };

        return { components: [...state.components] };
      }

      return { components: [...state.components] };
    }),
});

export const useComponetsStore = create<State & Action>()(
  persist(creator, {
    name: "xxx",
  })
);

export function getComponentById(
  id: number | null,
  components: Component[]
): Component | null {
  if (!id) return null;

  for (const component of components) {
    if (component.id == id) return component;
    if (component.children && component.children.length > 0) {
      const result = getComponentById(id, component.children);
      if (result !== null) return result;
    }
  }
  return null;
}
// 增删改都需要查找当前组件的父节点，于是实现一个递归的查找组件方法
