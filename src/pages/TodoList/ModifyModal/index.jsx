import React from "react";
import { Button, Modal, Form as FormBootstrap } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
function ModifyModal({
  isShowModifyModal,
  handleHideModifyModal,
  handleSubmitForm,
  modifyModalData,
}) {
  
  return (
    <Modal show={isShowModifyModal} onHide={handleHideModifyModal}>
      <Modal.Header closeButton>
        <Modal.Title>{`${modifyModalData.type === 'create' ? 'Thêm' : 'Sửa'} công việc`}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={modifyModalData.type === 'create'
        ? {
          title: '',
          description: '',
        }
        : {
          title: modifyModalData.title,
          description: modifyModalData.description,
        }
        }
        validationSchema={Yup.object({
          title: Yup.string()
            .required('Nội dung công việc không được để trống')
            .max(50, 'Nội dung công việc không được quá 50 kí tự'),
          description: Yup.string()
            .required('Mô tả công việc không được để trống')
            .max(50, 'Mô tả công việc không được quá 200 kí tự'),
        })}
        onSubmit={(values) => handleSubmitForm(values, modifyModalData.type, modifyModalData.id)}
      >
        <Form>
          <Modal.Body>
            <FormBootstrap.Group>
              <label htmlFor="title">Tên công việc</label>
              <Field
                type="text"
                className="input form-control"
                name="title"
                placeholder="Tên công việc"
              />
              <div className="text-danger m-1">
                <ErrorMessage name="title" />
              </div>
              <label htmlFor="">Mô tả công việc</label>
              <Field
                type="text"
                className="input form-control"
                as="textarea"
                name="description"
                placeholder="Mô tả công việc"
              />
               <div className="text-danger m-1">
                <ErrorMessage name="description" />
              </div>
            </FormBootstrap.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleHideModifyModal()}>
              <i className="fa fa-window-close"></i>
            </Button>
            <Button type="submit" variant="primary">
              <i className="fa fa-check-square"></i>
            </Button>
          </Modal.Footer>
        </Form>
      </Formik>
    </Modal>

    
  );
}

export default ModifyModal;
