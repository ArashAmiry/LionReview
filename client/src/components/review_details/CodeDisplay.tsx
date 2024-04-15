import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import SyntaxHighlighter from "react-syntax-highlighter";
import darkTheme from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark';
import lightTheme from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-light';

import '../stylesheets/review_details/CodeDisplay.css'

interface CodeDisplayProps {
    files: { name: string, content: string }[];
    isDarkMode: boolean
}

function CodeDisplay({ files, isDarkMode}: CodeDisplayProps) {

    return (
        <Row className='container-code bg-body' style={{ width: files.length === 2 ? '90%' : '70%' }}>
            {files.length === 2 &&
                files.map((file, index) => (
                    <Col key={index} md="6" className='p-0'>
                        <h1 className='header-code'>{file.name}</h1>
                        <SyntaxHighlighter style={isDarkMode ? darkTheme : lightTheme} showLineNumbers={true}>{typeof file.content === "string" ? file.content : JSON.stringify(file.content, null, 2)}</SyntaxHighlighter>
                    </Col>
                ))}
            {files.length === 1 &&
                files.map((file, index) => (
                    <Col key={index} md="12" className='p-0'>
                        <h1 className='header-code'>{file.name}</h1>                         
                        <SyntaxHighlighter style={isDarkMode ? darkTheme : lightTheme} showLineNumbers={true}>{typeof file.content === "string" ? file.content : JSON.stringify(file.content, null, 2)}</SyntaxHighlighter>
                    </Col>
                ))}
        </Row>
    )
}

export default CodeDisplay;