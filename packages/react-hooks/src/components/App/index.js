import React, { useState, useEffect } from "react";
import styles from "./styles.css";

import useAutoSizeContainer from "../../hooks/useAutoSizeContainer";
import useSize from "../../hooks/useSize";

function AutoSizingHelloWorld() {
  const Container = useAutoSizeContainer();
  const [{ width, height }, setSize] = useSize();
  return (
    <Container onResize={setSize}>
      <HelloWorld width={width} height={height} />
    </Container>
  );
}

function HelloWorld({ width, height }) {
  return (
    <div style={{ width, height, background: "#eeeeee", overflow: "hidden" }}>
      Hello World : ({width}, {height})
    </div>
  );
}
export default function App() {
  const [detect, setDetect] = useState(true);
  const content = detect ? <AutoSizingHelloWorld /> : <HelloWorld />;
  return (
    <div className={styles.app}>
      <div className={styles.options}>
        Use AutoSizer:
        <input
          type="checkbox"
          checked={detect}
          onChange={({ currentTarget: { checked } }) => setDetect(checked)}
        />
      </div>
      <div className={styles.content}>{content}</div>
    </div>
  );
}
