import ReactDOM from "react-dom";

export const CustomPortal = ({ children }: { children: React.ReactNode }) => {
  if (typeof window === "undefined") return null;
  return ReactDOM.createPortal(children, document.body);
};
