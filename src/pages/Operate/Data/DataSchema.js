import React, { useRef, useEffect } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import styles from "./index.module.less";

export default () => {
  const monacoEditor = useRef();
  useEffect(() => {
    console.log(monacoEditor.current);
    console.log("componentDidMount");
    // eslint-disable-next-line no-unused-vars
    const editor = monaco.editor.create(monacoEditor.current, {
      value: `{
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
}`,
      language: "json",

      // lineNumbers: "off",
      // roundedSelection: false,
      // scrollBeyondLastLine: false,
      readOnly: false,
      // theme: "vs-dark",
    });
  }, []);
  return <div ref={monacoEditor} className={styles.codeEditor}></div>;
};
