import SyntaxHighlighter from 'react-syntax-highlighter';
import { Col, Row } from 'react-bootstrap';
import darkTheme from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark';
import lightTheme from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-light';
import './stylesheets/CodePreview.css';

export interface CodeFile {
    url: string;
    content: string;
    name: string;
}

interface CodePreviewPageProps {
    files: CodeFile[];
    isDarkMode: boolean;
}

const CodePreviewPage = ({ files, isDarkMode }: CodePreviewPageProps) => {
    return (     
        <Row className='code-container bg-body'>
            {files.length === 2 &&
                files.map((file, index) => (
                    <Col key={index} md="6" className='p-0'>
                        <h1 className='code-header'>{file.name}</h1>                
                        <pre className='mb-0'>
                            <SyntaxHighlighter style={isDarkMode ? darkTheme : lightTheme} showLineNumbers={true}>{typeof file.content === "object" ? JSON.stringify(file.content, null, 2) : file.content }</SyntaxHighlighter>
                        </pre>
                    </Col>
                ))}
            {files.length === 1 &&
                files.map((file, index) => (
                    <Col key={index} md="12" className='p-0'>
                        <h1 className='code-header'>{file.name}</h1>                     
                        <pre className='mb-0'>
                            <SyntaxHighlighter style={isDarkMode ? darkTheme : lightTheme} showLineNumbers={true}>{typeof file.content === "string" ? file.content : JSON.stringify(file.content, null, 2)}</SyntaxHighlighter>
                        </pre>
                    </Col>
                ))}
        </Row>
    );
}

export default CodePreviewPage;
