import { Button, Card, Form, Modal } from "react-bootstrap";

type PreviewFormSidebarProps = {
    show: boolean;
    handleClose: () => void;
    handleCreateForm: (e: React.MouseEvent) => void
    setReviewName: (name: string) => void;
};

const ReviewNameModal = ({ show, handleClose, handleCreateForm, setReviewName }: PreviewFormSidebarProps) => {
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