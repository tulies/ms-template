import React, { useState } from "react";
import FormRender from "form-render/lib/antd";

// import styles from "./index.module.less";
const SCHEMA = JSON.parse(`
{
  "propsSchema": {
    "type": "object",
    "properties": {
      "string": {
        "title": "字符串",
        "type": "string"
      },
      "select": {
        "title": "单选",
        "type": "string",
        "enum": [
          "a",
          "b",
          "c"
        ],
        "enumNames": [
          "选项1",
          "选项2",
          "选项3"
        ]
      }
    }
  },
  "formData": {
    "string": "",
    "select": "a"
  }
}
`);
export default (props) => {
  const [formData, setData] = useState({});
  const [valid, setValid] = useState([]);

  const onSubmit = () => {
    if (valid.length > 0) {
      alert(`校验未通过字段：${valid.toString()}`);
    } else {
      alert(JSON.stringify(formData, null, 2));
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <FormRender
        {...SCHEMA}
        formData={formData}
        onChange={setData}
        onValidate={setValid}
      />
      <button onClick={onSubmit}>提交</button>
    </div>
  );
};
