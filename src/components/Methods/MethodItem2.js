import { useBonadocsStore } from "../../store";
import LiveMarkdown from "../MarkdownPreview";
import { MethodParam } from "./MethodParam";
export const MethodItem2 = () => {
  const getCurrentMethod = useBonadocsStore((state) => state.currentMethod);

  return (
    <div className="method">
      <div className="method__title">{getCurrentMethod[1].name}</div>
      <LiveMarkdown />
      <MethodParam />
    </div>
  );
};
