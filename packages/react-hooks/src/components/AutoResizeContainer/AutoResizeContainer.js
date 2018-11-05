/**
 * Based on react-virtualized modded version of Detect Element Resize.
 * https://github.com/bvaughn/react-virtualized/blob/master/source/vendor/detectElementResize.js
 *
 * Which is based on Sebasitan Decima's implementation.
 * https://github.com/sdecima/javascript-detect-element-resize
 * Sebastian Decima
 *
 * TODO:
 * 1. Removed crossed browser support as a POC.
 * 2. Animation effects are not tested.
 */

import React, { useRef, useLayoutEffect } from "react";
import classnames from "classnames";
import raf from "raf";
import styles from "./styles.css";

export default function AutoSizeContainer({ onResize, children, className }) {
  const state = useRef(null);
  const container = useRef(null);
  const expandTrigger = useRef(null);
  const expandChild = useRef(null);
  const contractTrigger = useRef(null);
  useLayoutEffect(() => {
    state.current.resetTriggers();
  }, []); // only run on mount
  if (!state.current) {
    state.current = {
      width: null,
      height: null,
      handle: null,
      onScrollCapture({ target }) {
        if (
          (expandTrigger.current && expandTrigger.current === target) ||
          (contractTrigger.current && contractTrigger.current === target)
        ) {
          state.current.resetTriggers();
          if (state.current.handle) {
            raf.cancel(state.current.handle);
          }
          state.current.handle = raf(state.current.checkTriggers);
        }
      },
      resetTriggers() {
        if (
          expandTrigger.current &&
          expandChild.current &&
          contractTrigger.current
        ) {
          contractTrigger.current.scrollLeft =
            contractTrigger.current.scrollWidth;
          contractTrigger.current.scrollTop =
            contractTrigger.current.scrollHeight;
          expandChild.current.style.width =
            expandTrigger.current.offsetWidth + 1 + "px";
          expandChild.current.style.height =
            expandTrigger.current.offsetHeight + 1 + "px";
          expandTrigger.current.scrollLeft = expandTrigger.current.scrollWidth;
          expandTrigger.current.scrollTop = expandTrigger.current.scrollHeight;
        }
      },
      checkTriggers() {
        if (
          container.current &&
          (container.current.offsetWidth !== state.current.width ||
            container.current.offsetHeight !== state.current.height)
        ) {
          state.current.width = container.current.offsetWidth;
          state.current.height = container.current.offsetHeight;
          if (typeof state.current.onResize === "function") {
            state.current.onResize({
              width: state.current.width,
              height: state.current.height
            });
          }
        }
      },
      onResize: null,
      onAnimationStart({ animationName }) {
        if (animationName === styles.animationName) {
          state.current.resetTriggers();
        }
      }
    };
  }
  state.current.onResize = onResize;
  return (
    <div
      ref={container}
      className={classnames(styles.container, className)}
      onScrollCapture={state.current.onScrollCapture}
    >
      <div>{children}</div>
      <div
        className={styles.resizeTriggers}
        onAnimationStart={state.current.onAnimationStart}
      >
        <div ref={expandTrigger} className={styles.expandTrigger}>
          <div ref={expandChild} />
        </div>
        <div ref={contractTrigger} className={styles.contractTrigger} />
      </div>
    </div>
  );
}
