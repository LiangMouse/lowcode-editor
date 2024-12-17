//不用带 border，也不用处理 drop 事件。
import { CommonComponentProps } from "../../interface";

const Container = ({ children, styles }: CommonComponentProps) => {
  return (
    <div style={styles} className={`p-[20px]`}>
      {children}
    </div>
  );
};

export default Container;
