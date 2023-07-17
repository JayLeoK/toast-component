import React from "react";

import Button from "../Button";

import styles from "./ToastPlayground.module.css";
import Toast from "../Toast/Toast";
import ToastShelf from "../ToastShelf/ToastShelf";
import { ToastContext } from "../ToastProvider";
const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const defaultVariant = VARIANT_OPTIONS[0];

  const [variantSelected, setVariantSelected] = React.useState(defaultVariant);
  const [message, setMessage] = React.useState("");
  const { appendToast } = React.useContext(ToastContext);

  function handleSubmit(event) {
    event.preventDefault();
    appendToast({ variant: variantSelected, message });
    setMessage("");
    setVariantSelected(defaultVariant);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>
      <ToastShelf />
      <form onSubmit={handleSubmit} className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((variantOption) => {
              const variantId = `variant-${variantOption}`;

              return (
                <label key={variantId} htmlFor={variantId}>
                  <input
                    id={variantId}
                    type="radio"
                    name="variant"
                    value={variantOption}
                    checked={variantSelected === variantOption}
                    onChange={(event) => setVariantSelected(event.target.value)}
                  />
                  {variantOption}
                </label>
              );
            })}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
