import React, { useState, useEffect }from "react";
import Editor from "./Editor";
import useLocalStorage from "../hooks/useLocalStorage";

function App() {
    const  [html, setHtml] = useLocalStorage('html', '')
    const  [css, setCss] = useLocalStorage('css', '')
    const  [js, setJs] = useLocalStorage('js', '')
    const  [srcDoc, setSrcDoc] = useState('')

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc (`
                <html> 
                    <body> ${html}</body>
                    <style>${css}</style>
                    <script>${js}</script>
                </html>
            `)
            
        }, 400);
        return () => clearTimeout(timeout)
    }, [html, css, js])

return (
    <>

        <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
            <img
              src="./logo51.png"
              width="40"
              height="40"
              className="d-inline-block align-top"
              alt="logo"
              style={{ marginLeft: '15px' }}
            />

            <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" href="#"
                     style={{ color: 'white', fontSize:'20px' }}
                    >Online Code Editor
                </a>
              </li>
            </ul>
        </nav>

        {/* <!-- Black with white text --> */}
        {/* <nav class="navbar navbar-expand-sm bg-dark navbar-dark">...</nav> */}

        {/* <!-- Blue with white text --> */}
        {/* <nav class="navbar navbar-expand-sm bg-primary navbar-dark">...</nav> */}

        <div className="pane top-pane">
            <Editor 
                language = "xml"
                displayName = "HTML"    
                value = {html}
                onChange = {setHtml}
            />
             <Editor 
                language = "css"
                displayName = "CSS"    
                value = {css}
                onChange = {setCss}
            />
            <Editor 
                language = "javascript"
                displayName = "JS"    
                value = {js}
                onChange = {setJs}
            />
        </div>
        <div className="pane">
            <iframe
                srcDoc={srcDoc}
                title="output"
                sandbox="allow-scripts"
                frameBorder="0"
                width="100%"
                height="100%"
            />
        </div>
    </>
)
}

export default App;
