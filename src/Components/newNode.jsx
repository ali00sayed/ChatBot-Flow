import { Handle, Position } from "reactflow";
import PropTypes from "prop-types";

// This is for the Node that we drag and put in the display to diaplay nodes
const Node = ({ data }) => {
  // console.log(data);

  return (
    <div>
      <div className=" bg-teal-500 rounded-tl-sm rounded-tr-sm font-bold  text-black pl-4 pt-1 pb-1 flex items-center justify-between  w-[275px] ">
        <div className="flex items-center">{data.heading}</div>
        <div className=" pr-4">
          <img className="w-6" src="message.svg " alt="message icon" />
        </div>
      </div>
      <div className="p-4 rounded-bl-sm rounded-br-sm  bg-white ">
        <div className="text-black">{data.label}</div>
      </div>
      <Handle type="source" position={Position.Right} id="source" />
      <Handle type="target" position={Position.Left} id="target" />
    </div>
  );
};
Node.propTypes = {
  data: PropTypes.shape({
    heading: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default Node;
