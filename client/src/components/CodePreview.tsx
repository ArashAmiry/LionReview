import { useState, useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { Col, Row } from 'react-bootstrap';
import './stylesheets/CodePreview.css';

export interface CodeFile {
    url: string;
    content: string;
    name: string;
}

interface CodePreviewPageProps {
    files: CodeFile[];
}

const CodePreviewPage = ({ files }: CodePreviewPageProps) => {

    useEffect(() => {
        // Highlight code when the 'files' state updates
        files.forEach(({ content }) => {
            if (content) {
                document.querySelectorAll('pre code').forEach((block) => {
                    hljs.highlightAll();
                });
            }
        });
    }, [files]);

    return (
        <Row className='code-container'>
            {files.length === 2 &&
                files.map((file, index) => (
                    <Col key={index} md="6" className='p-0'>
                        <h1 className='code-header'>{file.name}</h1>
                        <pre className='mb-0'>
                        <code>{typeof file.content === "object" ? JSON.stringify(file.content, null, 2) : file.content }</code>
                        </pre>
                    </Col>
                ))}
            {files.length === 1 &&
                files.map((file, index) => (
                    <Col key={index} md="12" className='p-0'>
                        <h1 className='code-header'>{file.name}</h1>
                        <pre className='mb-0'>
                            <code>{typeof file.content === "string" ? file.content : JSON.stringify(file.content, null, 2)}</code>
                        </pre>
                    </Col>
                ))}
        </Row>
    );
}

export default CodePreviewPage;
