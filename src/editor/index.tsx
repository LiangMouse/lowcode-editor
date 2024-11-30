import { Allotment } from "allotment"; //实现可拖动改变大小的pane
import "allotment/dist/style.css";

export default function ReactPlayground() {
  return (
    <div className="h-[100vh] flex flex-col">
      <div className="">Header</div>
      <Allotment>
        <Allotment.Pane preferredSize={240} maxSize={300} minSize={200}>
          Material
        </Allotment.Pane>
        <Allotment.Pane>EditArea</Allotment.Pane>
        <Allotment.Pane preferredSize={300} maxSize={500} minSize={300}>
          Seeting
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}
