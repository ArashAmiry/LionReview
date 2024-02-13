import React, { useState, useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css'; // Import the desired style


interface GitHubFileViewerProps {
    owner: string;
    repo: string;
    path: string;
}

function GitHubFileViewer({ owner, repo, path }: GitHubFileViewerProps) {
    const [fileContent, setFileContent] = useState('');
    const codeRef = useRef<HTMLElement>(null);
    

    useEffect(() => {
        async function fetchGitHubFile() {
            try {
                const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`);
                const data = await response.json();
                // GitHub API returns the content base64 encoded
                const content = atob(data.content);
                setFileContent(content);
            } catch (error) {
                console.error('Error fetching GitHub file:', error);
            }
        }

        fetchGitHubFile();
    }, [owner, repo, path]);
    
    useEffect(() => {
        // Apply syntax highlighting when fileContent changes and codeRef is available
        if (fileContent && codeRef.current) {
            hljs.highlightBlock(codeRef.current);
        }
    }, [fileContent, path]);



    // Function to escape HTML content
    function escapeHTML(html: string) {
        return html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    return (
        <pre>
            <code ref={codeRef} className="hljs" dangerouslySetInnerHTML={{ __html: escapeHTML(fileContent) }} />
        </pre>
    );
}

export default GitHubFileViewer;
