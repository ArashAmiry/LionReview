import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

interface FormData {
  // Define your form data structure here
  // For example:
    id: number;
    title: string;
    description: string;
}

const PopulateForms: React.FC = () => {
  // State to hold forms data
    const [forms, setForms] = useState<FormData[]>([]);

  // Function to render forms as card components
    const renderForms = () => {
    if (forms.length === 0) {
        return <div>No forms created yet.</div>;
    } else {
        return forms.map(form => (
        <Card key={form.id}>
            <Card.Body>
            <Card.Title>{form.title}</Card.Title>
            <Card.Text>{form.description}</Card.Text>
            </Card.Body>
        </Card>
        ));
        }
    };

    return (
    <div>
        {renderForms()}
    </div>
    );
};

export default PopulateForms;