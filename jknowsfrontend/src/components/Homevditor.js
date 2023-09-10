import "vditor/dist/index.css";
import React from "react";
import Vditor from "vditor";

const Homevditor = () => {
    const [vd, setVd] = React.useState();
    React.useEffect(() => {
        const vditor = new Vditor("vditor", {
            textalign: "left",
            icon: "ant",
            toolbar: [
                "emoji",
                "headings",
                "bold",
                "italic",
                "strike",
                "link",
                "|",
                "list",
                "ordered-list",
                "check",
                "outdent",
                "indent",
                "|",
                "quote",
                "line",
                "code",
                "inline-code",
                "insert-before",
                "insert-after",
                "|",
                "upload",
                "record",
                "table",
                "|",
                "undo",
                "redo",
                "|",
                "fullscreen",
                "edit-mode",
                {
                    name: "publish",
                    tipPosition: "s",
                    tip: "发布文章",
                    className: "right",
                    icon: `<img style="height: 16px" src='https://img.58cdn.com.cn/escstatic/docs/imgUpload/idocs/publish.svg'/>`,
                    click: () => {
                        console.log(vditor.getValue());
                    }
                },
                {
                    name: "more",
                    toolbar: [
                        "both",
                        "code-theme",
                        "content-theme",
                        "export",
                        "outline",
                        "preview",
                        "devtools",
                        "info",
                        "help"
                    ]
                }
            ],
            after: () => {
                vditor.setValue("`Vditor` 最小代码示例");
                setVd(vditor);
            }
        });
    }, []);
    return <div id="vditor" className="vditor"/>;
}
export default Homevditor;