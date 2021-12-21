import type React from "react";
import { createPortal } from "react-dom";

const Portal: React.FC = ({ children }) => {
  const portalRoot = document.getElementById("portalRoot")!;

  return createPortal(children, portalRoot);
};

export default Portal;
