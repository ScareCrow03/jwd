import "vditor/dist/index.css";
import React, {forwardRef, useState} from "react";
import Vditor from "vditor";
//import {http} from "../utils/http";
import 'github-markdown-css';
// import {marked} from "marked";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import remarkGfm from 'remark-gfm';
import {saveAnswer} from "../service/answerService";
import {useSearchParams} from "react-router-dom";



const AskEditor = (props) => {
    const [vd, setVd] = React.useState();
    const [answer, setAnswer] = React.useState();
    const [search] = useSearchParams();
    const questionId = search.get('id');
    const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容

    const handleClick = (e) =>{
        props.sendContent(e)
    }

    React.useEffect(() => {
        const vditor = new Vditor("vditor", {
            width: "100%",
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
                    click:()=> {
                        console.log(questionId)
                        console.log(vditor.getValue());

                        const callback = () =>{
                            console.log(vditor.getValue());
                        }
                        // console.log(vditor.exportJSON(vditor.getValue()));
                        let content = vditor.getValue();
                        handleClick(vditor.getValue());
                        setMarkdownContent(vditor.getValue());
                    },

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
                                    vditor.setValue(" ");
                                        // eslint-disable-next-line no-unused-expressions
                                    setVd(vditor);
                                },
                                blur: (event) => {
                                    console.log(vditor.getValue());
                                    handleClick(vditor.getValue());
                                    setMarkdownContent(vditor.getValue());

                                },
                                upload: {
                                url: "http://123.60.52.71:8080/image/upload",
                                linkToImgUrl: "http://123.60.52.71:8080/image/upload",
                                headers: {
                                    AccessControlAllowOrigin: "*",
                                },
                                format(files,responseText) {
                                const res = JSON.parse(responseText);
                                const name = res.filename;
                                const url = 'http://123.60.52.71:8080'+res.url;
                                const result = JSON.stringify({
                                code: 0,
                                data: { errFiles: '', succMap: { [name]: url } },
                            });
                                return result;
                            },
                            },
                                });
                                }, []);
                                return (
                                <>
                                    <div id="vditor" style={{
                                        margin:"auto",
                                    }} />
                                    {/* <ReactMarkdown className={'markdown-body'} children={markdownContent} onChange={(e)=>handleClick(e.target.value)} remarkPlugins={[remarkMath,remarkGfm]} rehypePlugins={[rehypeKatex,rehypeRaw,]} escapeHtml={true}/> */}
                                </>
                                )

                                };


                                export default AskEditor;
