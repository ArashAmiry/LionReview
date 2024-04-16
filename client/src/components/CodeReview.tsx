import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import hljs from "highlight.js";
import SyntaxHighlighter from "react-syntax-highlighter";
import darkTheme from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark';
import lightTheme from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-light';

function CodeReview({ files, isDarkMode}: { files: { name: string, content: string }[], isDarkMode: boolean}) {

    return (
        <Row className='code-container'>
            {files.length === 2 &&
                files.map((file, index) => (
                    <Col key={index} md="6" className='p-0'>
                        <h1 className='code-header'>{file.name}</h1>
                        <SyntaxHighlighter 
                                style={isDarkMode ? darkTheme : lightTheme} 
                                showLineNumbers={true}>
                                    {typeof file.content === "string" ? file.content : JSON.stringify(file.content, null, 2)}
                        </SyntaxHighlighter>      
                    </Col>
                ))}
            {files.length === 1 &&
                files.map((file, index) => (
                    <Col key={index} md="12" className='p-0'>
                        <h1 className='code-header'>{file.name}</h1>
                        <SyntaxHighlighter 
                                style={isDarkMode ? darkTheme : lightTheme} 
                                showLineNumbers={true}>
                                    {typeof file.content === "string" ? file.content : JSON.stringify(file.content, null, 2)}
                        </SyntaxHighlighter>      
                    </Col>
                ))}
        </Row>
    )
}

export default CodeReview;