import React from "react";
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from "react-feather";

import VisuallyHidden from "../VisuallyHidden";

import styles from "./Toast.module.css";
import { ToastContext } from "../ToastProvider";

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function Toast({ id, variant = "notice", icon = null, children }) {
  const { dismissToast } = React.useContext(ToastContext);
  const IconSelected = icon ? icon : ICONS_BY_VARIANT[variant];

  return (
    <div className={`${styles.toast} ${styles[variant]}`}>
      <div className={styles.iconContainer}>
        <IconSelected size={24} />
      </div>
      <p className={styles.content}>
        <VisuallyHidden>{`${variant} - `}</VisuallyHidden>
        {children}
      </p>
      <button
        className={styles.closeButton}
        aria-label="Dismiss message"
        aria-live="off"
      >
        <X onClick={() => dismissToast(id)} size={24} />
      </button>
    </div>
  );
}

export default Toast;
