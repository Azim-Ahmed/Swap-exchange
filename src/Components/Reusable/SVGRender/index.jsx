/**
 *@function SVGRender.jsx
 *@author Azim
 *
 **/
const SVGRender = (props) => {
  return (
    <img
      style={props?.style ? props?.style : { height: "16px", width: "16px" }}
      src={props.img}
      alt={props.alter}
      className={props.className}
      {...props}
    />
  );
};

export default SVGRender;
