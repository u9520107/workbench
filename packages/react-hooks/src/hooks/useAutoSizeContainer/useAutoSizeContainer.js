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
import useSize from "../useSize";
import styles from "./styles.css";

function resetTriggers({
  expandTrigger: { current: expandTrigger },
  expandChild: { current: expandChild },
  contractTrigger: { current: contractTrigger }
}) {
  if (expandTrigger && expandChild && contractTrigger) {
    contractTrigger.scrollLeft = contractTrigger.scrollWidth;
    contractTrigger.scrollTop = contractTrigger.scrollHeight;
    expandChild.style.width = expandTrigger.offsetWidth + 1 + "px";
    expandChild.style.height = expandTrigger.offsetHeight + 1 + "px";
    expandTrigger.scrollLeft = expandTrigger.scrollWidth;
    expandTrigger.scrollTop = expandTrigger.scrollHeight;
  }
}

export default function useAutoSizeContainer() {
  const state = useRef({
    width: null,
    height: null,
    handle: null,
    component: null
  });
  const domRefs = useRef({
    container: useRef(null),
    expandTrigger: useRef(null),
    expandChild: useRef(null),
    contractTrigger: useRef(null)
  });
  const {
    container,
    expandTrigger,
    expandChild,
    contractTrigger
  } = domRefs.current;
  const [{ width, height }, setSize] = useSize();
  useLayoutEffect(() => {
    resetTriggers(domRefs.current);
  });
  if (!state.current.component) {
    state.current.component = ({ children, className }) => (
      <div
        ref={container}
        className={classnames(styles.container, className)}
        onScrollCapture={({ target }) => {
          if (
            (expandTrigger.current && expandTrigger.current === target) ||
            (contractTrigger.current && contractTrigger.current === target)
          ) {
            resetTriggers(domRefs.current);
            if (state.current.handle) {
              raf.cancel(state.current.handle);
            }
            state.current.handle = raf(() => {
              if (
                container.current &&
                (container.current.offsetWidth !== state.current.width ||
                  container.current.offsetHeight !== state.current.height)
              ) {
                state.current.width = container.current.offsetWidth;
                state.current.height = container.current.offsetHeight;
                setSize({
                  width: state.current.width,
                  height: state.current.height
                });
              }
            });
          }
        }}
      >
        <div>{children}</div>
        <div
          className={styles.resizeTriggers}
          onAnimationStart={({ animationName }) => {
            if (animationName === styles.animationName) {
              resetTriggers(domRefs);
            }
          }}
        >
          <div ref={expandTrigger} className={styles.expandTrigger}>
            <div ref={expandChild} />
          </div>
          <div ref={contractTrigger} className={styles.contractTrigger} />
        </div>
      </div>
    );
  }
  return [state.current.component, width, height];
}
