import { useEffect, useState } from "react";

const Sidebar = () => {
  const [showUsage, setShowUsage] = useState(true);

  //  drag & drop message of nodes to user on first load of the application
  useEffect(() => {
    setTimeout(() => {
      setShowUsage(false);
    }, 3000);
  }, [showUsage]);

  const displayUsage = showUsage ? "" : "none";
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <>
      <div
        className="text-black text-xs p-2  "
        style={{ display: displayUsage }}
      >
        Drag the Message button left side to insert a node
      </div>
      <aside>
        <div
          className="appnode"
          onDragStart={(event) => onDragStart(event, "default")}
          draggable
        >
          Message
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
