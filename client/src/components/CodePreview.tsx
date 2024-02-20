import React, { useState, useEffect } from 'react';
import axios from 'axios';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // or another style of your choice
import { Col, Container, Row } from 'react-bootstrap';
import './stylesheets/CodePreview.css';

interface File {
    url: string;
    content: string;
    name: string;
}

const CodePreviewPage = () => {
    const urls = ['https://api.github.com/repos/arashamiry/smasko/contents/client/src/App.tsx', 'https://api.github.com/repos/dinohromic/PayMe2.0/contents/app/src/main/java/com/example/payme20/model/Member.java'];
    const [files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if(files.length !== 0) {
            setFiles([])
        }
        const fetchCode = async (url: string, index: number) => {
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Accept': 'application/vnd.github.v3.raw',
                    },
                });

                setFiles(prevFiles => {
                    const updatedFiles = [...prevFiles];
                    updatedFiles[index] = {
                        url: url,
                        content: response.data,
                        name: extractFileName(url)
                    };
                    return updatedFiles;
                });

            } catch (error) {
                console.error('Error fetching file content:', error);
            } finally {
                setLoading(false);
            }
        };
        urls.forEach((url, index) => {
            fetchCode(url, index);
        });
    }, []);

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

    const extractFileName = (url: string): string => {
        const parts = url.split('/');
        return parts[parts.length - 1];
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container className='code-container'>
            <Row>
                {files.map((file, index) => (
                    <Col key={index} md="6">
                        <h1 className='code-header'>{file.name}</h1>
                        <pre>
                            <code>{file.content}</code>
                        </pre>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default CodePreviewPage;
