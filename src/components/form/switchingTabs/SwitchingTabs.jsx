import { useLayoutEffect, useRef, useState } from "react";
import "./SwitchingTabs.scss";

function SwitchingTabs({ data, onTabChange, tabIndex }) {
  const [tabWidth, setTabWidth] = useState(0);
  const currTab = useRef();

  function activeTab(tab, index) {
    onTabChange(index);
  }

  useLayoutEffect(() => {
    const { width } = currTab.current.getBoundingClientRect();
    setTabWidth(width);
  });

  return (
    <div className="switching-tabs">
      <div className="tab-items">
        {data.map((tab, index) => (
          <span
            key={index}
            onClick={() => activeTab(tab, index)}
            ref={currTab}
            className={`tab-item ${tabIndex === index ? "active" : ""}`}
          >
            {tab}
          </span>
        ))}
        <span
          className="tabs-moving-bg"
          style={{ left: tabWidth * tabIndex }}
        ></span>
      </div>
    </div>
  );
}

export default SwitchingTabs;
