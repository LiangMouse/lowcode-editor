import { useComponetsStore } from "../../stores/components";

export function Setting() {
  const { components } = useComponetsStore();

  return (
    <div>
      <pre>{JSON.stringify(components, null, 2)}</pre>
      {/* null是不被替换的内容，2是每级的缩进 */}
    </div>
  );
}
