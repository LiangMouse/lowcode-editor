import { Button as AntdButton } from "antd";
import { CommonComponentProps } from "../../interface";

const Button = ({ id, type, text, styles }: CommonComponentProps) => {
  return (
    <AntdButton data-component-id={id} style={styles} type={type}>
      {text}
    </AntdButton>
  );
};

export default Button;
