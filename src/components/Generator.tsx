import { useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectAdjectives, selectNames } from "../app/data";
import { chain, isEmpty } from "lodash";
import { startsWith } from "lodash/fp";
import copyPaste from "./copy-paste.png";

export function Generator() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const adjectives = useSelector(selectAdjectives);
  const names = useSelector(selectNames);
  const [version, setVersion] = useState("");
  const [copied, setCopied] = useState(false);
  const handleGenerate = useCallback(() => {
    setCopied(false);
    const adjective = chain(adjectives).shuffle().first().value();
    const name = chain(names)
      .filter(startsWith(adjective.at(0)!))
      .shuffle()
      .first()
      .value();
    setVersion(`${adjective}-${name}`);
  }, [adjectives, names]);
  const handleCopy = useCallback(() => {
    if (!isEmpty(version)) {
      audioRef.current?.play();
      setCopied(true);
      navigator.clipboard.writeText(version);
    }
  }, [version]);
  return (
    <>
      <audio
        ref={audioRef}
        src={process.env.PUBLIC_URL + "/static/audio/1-up.mp3"}
      />
      <div
        className="nes-container with-title is-centered"
        style={{
          width: "50%",
          height: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-end",
          gap: "1em",
        }}
      >
        <p className="title">Generator</p>
        <div
          className="nes-container with-title"
          style={{
            position: "relative",
            flexGrow: 1,
          }}
        >
          <p className="title">Version</p>
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <p
              className="nes-text is-primary"
              style={{
                flexGrow: 1,
                alignSelf: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {version}
            </p>
            {isEmpty(version) || (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-end",
                }}
              >
                <p className="nes-balloon from-right nes-pointer">
                  {copied ? <>Copied!</> : <>Click me to copy</>}
                </p>
                <span onClick={handleCopy}>
                  <img
                    src={copyPaste}
                    width="25px"
                    height="25px"
                    alt="copy-paste"
                  />
                </span>
              </div>
            )}
          </div>
        </div>
        <button type="button" className="nes-btn" onClick={handleGenerate}>
          Generate
        </button>
      </div>
    </>
  );
}
