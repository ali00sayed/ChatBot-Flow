import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const UpdateNode = ({ selectedNode, setNodeSelected, setNodes }) => {
  const [nodeName, setNodeName] = useState(selectedNode.data["label"]);

  // console.log(reactFlowInstance.getNodes());
  let id = selectedNode.id;

  useEffect(() => {
    // console.log(selectedNode.data['label'], setNodes);

    setNodeName(selectedNode.data["label"]);
  }, [id]);

  // update the node on click of the save changes button
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          //  create a new object here in order to notify react flow about the change
          node.data = {
            ...node.data,
            label: nodeName,
          };
        }

        return node;
      })
    );
  }, [selectedNode, nodeName, setNodes]);

  // click of the save changes button
  const mainSidebar = () => {
    setNodeSelected(false);
  };

  return (
    <>
      <div className="update">
        <div className="black">
          <span
            className="bg-slate-500 hover:bg-slate-600 text-white font-bold p-2  rounded cursor-pointer"
            onClick={mainSidebar}
          >
            Go Back
          </span>
        </div>
      </div>
      <div style={{ width: `100%`, height: 2, background: "grey" }}></div>

      <div className="update">
        <h3 className=" text-sm mb-2">Change Text:</h3>
        <textarea
          rows="4"
          cols="25"
          value={nodeName}
          onChange={(evt) => {
            setNodeName(evt.target.value);
          }}
          style={{ marginBottom: 15, borderRadius: 5 }}
        />
      </div>
      <div style={{ width: `100%`, height: 2, background: "grey" }}></div>
    </>
  );
};
UpdateNode.propTypes = {
  selectedNode: PropTypes.shape({
    id: PropTypes.string.isRequired,
    data: PropTypes.shape({
      label: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  setNodeSelected: PropTypes.func.isRequired,
  setNodes: PropTypes.func.isRequired,
  setNewNodeLabel: PropTypes.func,
};

export default UpdateNode;
