import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function DeleteModal({
  isShowDeleteModal,
  handleHideDeleteModal,
  handleDeleteTask,
  deleteModalData,
}) {
  return (
    <Modal show={isShowDeleteModal} onHide={handleHideDeleteModal}>
      <Modal.Header closeButton>
        <Modal.Title>Xác nhận xóa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Bạn có chắc muốn xóa không
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleHideDeleteModal()}>
        <i className="fa fa-window-close"></i>
        </Button>
        <Button
          type="submit"
          variant="danger"
          onClick={() => handleDeleteTask(deleteModalData.index)}
        >
          <i className="fa fa-check-square"></i>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
