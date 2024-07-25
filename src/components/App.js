import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import useLocalStorage from "../hooks/useLocalStorage";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
    const [html, setHtml] = useLocalStorage('html', '');
    const [css, setCss] = useLocalStorage('css', '');
    const [js, setJs] = useLocalStorage('js', '');
    const [srcDoc, setSrcDoc] = useState('');
    const [showCard, setShowCard] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc(`
                <html>
                    <body>${html}</body>
                    <style>${css}</style>
                    <script>${js}</script>
                </html>
            `);
        }, 400);
        return () => clearTimeout(timeout);
    }, [html, css, js]);

    const toggleCard = () => {
        setShowCard(!showCard);
    };

    const closeCard = () => {
        setShowCard(false);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">
                    <img
                        src="./logo51.png"
                        width="40"
                        height="40"
                        className="d-inline-block align-top"
                        alt="logo"
                        style={{ marginLeft: '15px' }}
                    />
                    Online Code Editor
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={toggleCard}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${showCard ? 'd-none' : ''}`} id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="https://linkedin.com/in/nishant-khandhar"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: 'white' }}
                            >
                                Developed by: Nishant Khandhar
                                <img
                                    src="./me.jpg"
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                    alt="profile"
                                    style={{ marginLeft: '15px', borderRadius: '50%' }}
                                />
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            {showCard && (
                <div className="overlay">
                    <div className="card mt-4">
                        <div className="card-body text-center">
                            <button type="button" className="btn-close float-end" aria-label="Close" onClick={closeCard}></button>
                            <h5 className="card-title">Developed by:</h5>
                            <p className="card-text">Nishant Khandhar</p>
                            <img
                                src="./me.jpg"
                                width="50"
                                height="50"
                                className="d-inline-block align-top"
                                alt="profile"
                                style={{ marginLeft: '15px', borderRadius: '50%' }}
                            />
                        </div>
                    </div>
                </div>
            )}

            <div className="pane top-pane">
                <Editor
                    language="xml"
                    displayName="HTML"
                    value={html}
                    onChange={setHtml}
                />
                <Editor
                    language="css"
                    displayName="CSS"
                    value={css}
                    onChange={setCss}
                />
                <Editor
                    language="javascript"
                    displayName="JS"
                    value={js}
                    onChange={setJs}
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

            <style jsx>{`
                .overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: rgba(0, 0, 0, 0.5);
                    z-index: 1050;
                }
                .card {
                    background-color: rgba(33, 37, 41, 0.9);
                    color: white;
                    width: 300px;
                    position: relative;
                }
                .btn-close {
                    background-color: white;
                    border: none;
                }
                .navbar-collapse.d-none {
                    display: none !important;
                }
            `}</style>
        </>
    );
}

export default App;
