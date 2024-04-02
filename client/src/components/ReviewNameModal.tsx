import { Button, Card, Form, Modal } from "react-bootstrap";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';

type PreviewFormSidebarProps = {
    show: boolean;
    handleClose: () => void;
    handleCreateForm: (e: React.MouseEvent) => void
    setReviewName: (name: string) => void;
    setRandomize: (randomize: Boolean) => void;
};

const ReviewNameModal = ({ show, handleClose, handleCreateForm, setReviewName, setRandomize }: PreviewFormSidebarProps) => {

    const [checked, setChecked] = useState(false);

    const handleClick = () => {
        const clicked = !checked;
        setChecked(!checked);
        setRandomize(clicked);
    }

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="name"
                            placeholder="Gregorys Review"
                            autoFocus
                            required
                            onChange={(e) => {
                                const { value } = e.target;
                                setReviewName(value);
                            }}
                        />
                        <FormControlLabel className="pt-2"
                            checked={checked}
                            onChange={() => handleClick()}
                            control={<Checkbox />}
                            label="Randomize the order of pages"
                            labelPlacement="end"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleCreateForm}>
                    Create Form
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ReviewNameModal;