import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { CodeFile } from "./CodePreview";

function CodeReview({files} : {files: {name: string, content: string}[]}) {
    
    return (
        <Row className='code-container'>
            {files.length === 2 &&
                files.map((file, index) => (
                    <Col key={index} md="6" className='p-0'>
                        <h1 className='code-header'>{file.name}</h1>
                        <pre>
                            <code>{typeof file.content === "object" ? JSON.stringify(file.content, null, 2) : file.content}</code>
                        </pre>
                    </Col>
                ))}
            {files.length === 1 &&
                files.map((file, index) => (
                    <Col key={index} md="12" className='p-0'>
                        <h1 className='code-header'>{file.name}</h1>
                        <pre>
                            <code>{typeof file.content === "string" ? file.content : JSON.stringify(file.content, null, 2)}</code>
                        </pre>
                    </Col>
                ))}
        </Row>
    )
}

export default CodeReview;