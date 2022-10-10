import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
/**
 *@function QuillText.jsx
 *@author Azim
 *
 **/

const QuillText = ({ value, onChange, placeholder, defaultValue }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];
  return (
    <ReactQuill
      style={{ width: "100%" }}
      theme="snow"
      value={value}
      defaultValue={defaultValue ? defaultValue : ""}
      onChange={onChange}
      modules={modules}
      formats={formats}
      placeholder={placeholder ? placeholder : "Description"}
    />
  );
};

export default QuillText;
