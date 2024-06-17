import { useState, useRef, useCallback, useMemo } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";
import Sidebar from "./Components/SideBar";
import UpdateNode from "./Components/UpdateNode";
import Notification from "./Components/Notification";
import newNode from "./Components/newNode";
import "./index.css";
import Topbar from "./Components/TopBar";

let id = 0;

const App = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [messageColor, setMessageColor] = useState(null);
  const [targetHandles, setTargetHandles] = useState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodeSelected, setNodeSelected] = useState(false);
  const [changeNode, setChangeNode] = useState(null);

  const update = useCallback((event, node) => {
    // console.log(event, node);
    setChangeNode(node);
    setNodeSelected(true);
  }, []);

  let sourceHandles = [];
  let targetHandle = [];
  const onConnect = useCallback(
    (params) => {
      // console.log(params)

      if (sourceHandles.includes(params.source)) return;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      sourceHandles = sourceHandles.concat(params.source);

      setEdges((eds) =>
        addEdge({ ...params, markerEnd: { type: "arrowclosed" } }, eds)
      );

      if (targetHandle.includes(params.target)) return;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      targetHandle = targetHandle.concat(params.target);
      setTargetHandles(targetHandle);
    },
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      // creating a new node
      const newerNode = {
        id: `node_${id}`,
        type: "node",
        position,
        data: { heading: "Send Message", label: ` ${id}` },
      };

      id++;
      setNodes((nds) => nds.concat(newerNode));
    },
    [reactFlowInstance, setNodes]
  );
  let proOptions = { hideAttribution: true };

  const nodeTypes = useMemo(
    () => ({
      node: newNode,
    }),
    []
  );

  const saveFlow = () => {
    const totalNodes = reactFlowInstance.getNodes().length;

    if (targetHandles.length !== totalNodes - 1) {
      setErrorMessage("Cannot save Flow");
      setMessageColor("redMessage");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } else {
      setErrorMessage("Saved Flow");
      setMessageColor("greenMessage");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div className="appflow" style={{ width: "100vw", height: "100vh" }}>
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <div className="topbar">
            <Notification
              errorMessage={errorMessage}
              messageColor={messageColor}
            />
          </div>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            proOptions={proOptions}
            onNodeClick={update}
            nodeTypes={nodeTypes}
          >
            <Controls />
            <MiniMap nodeStrokeWidth={3} />
          </ReactFlow>
        </div>
        {nodeSelected ? (
          <div className="rightbar">
            <Topbar saveFlow={saveFlow} />
            <UpdateNode
              selectedNode={changeNode}
              setNodeSelected={setNodeSelected}
              setNodes={setNodes}
            />
          </div>
        ) : (
          <div className="rightbar">
            <Topbar saveFlow={saveFlow} />
            <Sidebar />
          </div>
        )}
      </ReactFlowProvider>
    </div>
  );
};

export default App;
