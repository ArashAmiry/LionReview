import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    urls: string[];
    cachedFiles: Record<string, CodeFile>; 
    updateCachedFiles: (url: string, fileData: CodeFile) => void;
}

const CodePreviewPage = ({ urls, cachedFiles, updateCachedFiles }: CodePreviewPageProps) => {
    const [files, setFiles] = useState<CodeFile[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCode = async (url: string): Promise<CodeFile> => {
            if (cachedFiles[url]) {
                return cachedFiles[url];
            }
            try {
                const response = await axios.get('http://localhost:8080/create', {
                    params: {
                        path: url
                    }
                });
                const newFile : CodeFile = {
                    url: url,
                    content: response.data,
                    name: extractFileName(url)
                };
                updateCachedFiles(url, newFile);
                return newFile;
            } catch (error) {
                console.error('Error fetching file content:', error);
                return {
                    url: "",
                    content: "",
                    name: "File not found"
                }
            }
        };

        const fetchAllFiles = async () => {
            const filesPromises = urls.map(url => fetchCode(url));
            const fetchedFiles = await Promise.all(filesPromises);
            setFiles(fetchedFiles);
            setLoading(false);

        };

        fetchAllFiles();
    }, [urls]);

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
        <Row className='code-container'>
            {files.length === 2 &&
                files.map((file, index) => (
                    <Col key={index} md="6" className='p-0'>
                        <h1 className='code-header'>{file.name}</h1>
                        <pre>
                        <code>{typeof file.content === "object" ? JSON.stringify(file.content, null, 2) : file.content }</code>
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
    );
}

export default CodePreviewPage;
