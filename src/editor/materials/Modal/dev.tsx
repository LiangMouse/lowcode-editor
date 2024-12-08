// ToDo: Implement Modal remove functionality
import { useDrag } from "react-dnd";
import { useMaterailDrop } from "../../hooks/useMaterialDrop";
import { CommonComponentProps } from "../../interface";
import { useEffect, useRef } from "react";

function Modal({ id, children, title, styles }: CommonComponentProps) {
  const { canDrop, drop } = useMaterailDrop(
    ["Button", "Container", "Table"],
    id
  );
  const divRef = useRef<HTMLDivElement>(null);
  const [_, drag] = useDrag({
    type: "Modal",
    item: {
      type: "Modal",
      id,
      dragType: "move",
    },
  });
  useEffect(() => {
    drop(divRef);
    drag(divRef);
  }, []);
  return (
    <div
      ref={divRef}
      style={styles}
      data-component-id={id}
      className={`min-h-[100px] p-[20px] ${
        canDrop ? "border-[2px] border-[blue]" : "border-[1px] border-[#000]"
      }`}
    >
      <h4>{title}</h4>
      <div>{children}</div>
    </div>
  );
}

export default Modal;
