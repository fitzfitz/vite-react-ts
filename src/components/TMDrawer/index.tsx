import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import useMountTransition from "./useMountTransition";
import { fcx } from "@fitzzz/utils";
import styles from "./TMDrawer.module.scss";
import { IoCloseOutline } from "react-icons/io5";

function createPortalRoot() {
  const drawerRoot = document.createElement("div");
  drawerRoot.setAttribute("id", "drawer-root");

  return drawerRoot;
}

type Props = {
  isOpen?: boolean;
  children?: React.ReactNode;
  className?: string;
  onClose: () => void;
  position?: "top" | "bottom" | "left" | "right";
  removeWhenClosed?: boolean;
  header?: boolean;
  title?: string;
  bodyWrap?: boolean;
  closeIcon?: React.ReactNode;
};

const TMDrawer = ({
  isOpen = false,
  children,
  className,
  onClose,
  position = "left",
  removeWhenClosed = true,
  header = true,
  title,
  bodyWrap = true,
  closeIcon,
}: Props) => {
  const bodyRef = useRef(document.querySelector("body"));
  const portalRootRef = useRef(
    document.getElementById("drawer-root") || createPortalRoot()
  );
  const isTransitioning = useMountTransition(isOpen, 300);

  // Append portal root on mount
  useEffect(() => {
    bodyRef?.current?.appendChild(portalRootRef.current);
    const portal = portalRootRef.current;
    const bodyEl = bodyRef.current;

    return () => {
      // Clean up the portal when drawer component unmounts
      portal.remove();
      // Ensure scroll overflow is removed
      if (bodyEl?.style?.overflow) bodyEl.style.overflow = "";
    };
  }, []);

  // Prevent page scrolling when the drawer is open
  useEffect(() => {
    const updatePageScroll = () => {
      if (isOpen && bodyRef?.current?.style?.overflow) {
        bodyRef.current.style.overflow = "hidden";
      } else if (bodyRef?.current?.style?.overflow) {
        bodyRef.current.style.overflow = "";
      }
    };

    updatePageScroll();
  }, [isOpen]);

  // Allow Escape key to dismiss the drawer
  useEffect(() => {
    const onKeyPress = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keyup", onKeyPress);
    }

    return () => {
      window.removeEventListener("keyup", onKeyPress);
    };
  }, [isOpen, onClose]);

  if (!isTransitioning && removeWhenClosed && !isOpen) {
    return null;
  }

  return createPortal(
    <div
      aria-hidden={isOpen ? "false" : "true"}
      className={fcx(
        styles["drawer-container"],
        isOpen && styles.open,
        isTransitioning && styles.in
      )}
    >
      <div
        className={fcx(styles["drawer"], styles[position], className)}
        role="dialog"
      >
        {header ? (
          <div className={styles["header"]}>
            <label>{title}</label>
            <button className={styles["close-button"]} onClick={onClose}>
              {closeIcon || <IoCloseOutline className="text-gray-500" />}
            </button>
          </div>
        ) : null}
        {bodyWrap ? (
          <div className={styles["content"]}>{children}</div>
        ) : (
          children
        )}
      </div>
      <div
        className={styles["backdrop"]}
        onClick={onClose}
        aria-hidden="true"
      />
    </div>,
    portalRootRef.current
  );
};

export default TMDrawer;
