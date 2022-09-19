import { useCallback, useEffect, useRef, useState } from "react";

export function Loading() {
  const [value, setValue] = useState(0);
  const requestRef = useRef(0);
  const previousTimeRef = useRef(0);
  const animate = useCallback((time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;

      // Pass on a function to the setter of the state
      // to make sure we always have the latest state
      setValue((value) => (value + deltaTime * 0.01) % 100);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, []);
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  });
  return (
    <div className="nes-container with-title" style={{ width: "50%" }}>
      <p className="title">Loading</p>
      <progress
        className="nes-progress is-pattern"
        value={value}
        max={100}
      ></progress>
    </div>
  );
}
