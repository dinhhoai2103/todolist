import React, { useState, useEffect } from "react";
import { Button, Form, Form as FormBootstrap } from "react-bootstrap";
import { connect } from "react-redux";

import "./styles.css";

import ModifyModal from "./ModifyModal";
import DeleteModal from "./DeleteModal";
import {
  createTask,
  getTaskList,
  getCompleteList,
  editTask,
  deleteTask,
  completeTask,
  deleteCompleteTask,
} from "../../redux/actions";

function TodoList({
  todoList,
  completeList,
  getTaskList,
  getCompleteList,
  createTask,
  editTask,
  deleteTask,
  completeTask,
  deleteCompleteTask,
}) {
  useEffect(() => {
    getTaskList();
    getCompleteList();
  }, []);

  // Show/Hide description
  const [moreInfo, setMoreInfo] = useState([]);
  const handleToggleMoreInfo = (id) => {
    const moreInfoIndex = moreInfo.findIndex((moreId) => moreId === id);
    if (moreInfoIndex === -1) {
      setMoreInfo([...moreInfo, id]);
    } else {
      const newMoreInfo = moreInfo;
      newMoreInfo.splice(moreInfoIndex, 1);
      setMoreInfo([...newMoreInfo]);
    }
  };

  const [isShowMore, setIsShowMore] = useState(false);
  // SEARCH
  const [searchKey, setSearchKey] = useState("");
  const handleChangeSearch = (e) => {
    const { value } = e.target;
    setSearchKey(value);
  };
  // MODIFY (CREATE/EDIT)
  const handleShowModifyModal = (modifyType, modifyValue) => {
    setIsShowModifyModal(true);
    if (modifyType === "create") {
      setModifyModalData({
        type: modifyType,
      });
    } else {
      setModifyModalData({
        type: modifyType,
        id: modifyValue.id,
        title: modifyValue.title,
        description: modifyValue.description,
      });
    }
  };
  const handleHideModifyModal = () => {
    setIsShowModifyModal(false);
    setModifyModalData({});
  };

  const [isShowModifyModal, setIsShowModifyModal] = useState(false);

  const [modifyModalData, setModifyModalData] = useState({});

  const handleSubmitForm = (values, type, editedId) => {
    if (type === "create") {
      createTask({
        title: values.title,
        description: values.description,
      });
    } else {
      editTask({
        id: editedId,
        title: values.title,
        description: values.description,
      });
    }
    setIsShowModifyModal(false);
  };
  // DELETE
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState({});
  const handleShowDeleteModal = (index) => {
    setIsShowDeleteModal(true);
    setDeleteModalData({ index: index });
  };
  const handleHideDeleteModal = () => {
    setIsShowDeleteModal(false);
    setDeleteModalData({});
  };
  const handleDeleteTask = (id) => {
    deleteTask({ id: id });
    setIsShowDeleteModal(false);
  };
  const handleDeleteCompleteTask = (id) => {
    deleteCompleteTask({ id: id });
  };
  const filterTodoListData = todoList.filter((item) => {
    return item.title.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1;
  });
  const handleCompleteTask = (e, completeItem) => {
    e.preventDefault();
    const { checked } = e.target;
    if (checked) {
      completeTask({ completeItem });
    }
  };
  const renderJobs = () => {
    return filterTodoListData.map((item, index) => {
      if (!isShowMore && index > 4) return null;
      return (
        <div className="todo-items" key={`todolist-${item.id}-${index}`}>
          <div className="d-flex justify-content-center align-items-center ml-2">
            <Form.Check
              type="checkbox"
              onChange={(e) => {
                handleDeleteTask(item.id);
                handleCompleteTask(e, item);
              }}
            />
          </div>
          <div className="todo-item">
            <div>{item.title}</div>
            {moreInfo.findIndex((id) => id === item.id) !== -1 && (
              <div>{item.description}</div>
            )}
          </div>

          <div onClick={() => handleToggleMoreInfo(item.id)}>
            {moreInfo.findIndex((moreId) => moreId === item.id) === -1 ? (
              <i className="show-icon fa fa-eye"></i>
            ) : (
              <i className="hide-icon fa fa-eye-slash"></i>
            )}
          </div>
          <i
            className="edit fa fa-pencil-square"
            onClick={() => {
              handleShowModifyModal("edit", item);
            }}
          ></i>
          <i
            className="delete fa fa-minus-square"
            onClick={() => handleShowDeleteModal(item.id)}
          ></i>
        </div>
      );
    });
  };

  const renderCompleteJobs = () => {
    return completeList.map((item, index) => {
      if (!isShowMore && index > 4) return null;
      return (
        <div
          className="todo-items bg-secondary"
          key={`completelist-${item.id}-${index}`}
        >
          <div className="todo-item d-flex">
            <del>
              <div>{item.title}</div>
              <div>{item.description}</div>
            </del>
          </div>
          <i
            className="fa fa-trash ml-2"
            onClick={() => handleDeleteCompleteTask(item.id)}
          ></i>
        </div>
      );
    });
  };

  return (
    <div className="todo-list">
      <div className="add">
        <div className="todo-header">
          <h2>To Do List</h2>
        </div>
        <Button
          variant="primary"
          onClick={() => handleShowModifyModal("create")}
        >
          <i className="fa fa-plus-square"></i>
        </Button>
      </div>
      <div className="search-box">
        <input
          type="text"
          name=""
          className="search-txt"
          placeholder="Type here to search"
          onChange={(e) => handleChangeSearch(e)}
        />
        <div className="search btn">
          <i className="fa fa-search search-icon"></i>
        </div>
      </div>
      <div className="jobs">{renderJobs()}</div>
      {!isShowMore && filterTodoListData.length > 5 && (
        <div className="d-flex justify-content-center">
          <Button
            variant="outline-info"
            className="rounded-pill"
            onClick={() => setIsShowMore(true)}
          >
            Hiển thị thêm
          </Button>
        </div>
      )}

      <div className="jobs">
        {completeList.length > 0 && (
          <div className="d-flex justify-content-center">
            <h4 className="text-center text-success">
              Công việc đã hoàn thành
            </h4>
          </div>
        )}
        {renderCompleteJobs()}
      </div>
      {!isShowMore && completeList.length > 5 && (
        <div className="d-flex justify-content-center">
          <Button
            variant="outline-info"
            className="rounded-pill"
            onClick={() => setIsShowMore(true)}
          >
            Hiển thị thêm
          </Button>
        </div>
      )}
      <ModifyModal
        isShowModifyModal={isShowModifyModal}
        handleHideModifyModal={handleHideModifyModal}
        handleSubmitForm={handleSubmitForm}
        modifyModalData={modifyModalData}
      />

      <DeleteModal
        isShowDeleteModal={isShowDeleteModal}
        handleHideDeleteModal={handleHideDeleteModal}
        handleDeleteTask={handleDeleteTask}
        deleteModalData={deleteModalData}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  const { todoList, completeList } = state.todoListReducer;
  return {
    todoList,
    completeList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTaskList: (params) => dispatch(getTaskList(params)),
    getCompleteList: (params) => dispatch(getCompleteList(params)),
    createTask: (params) => dispatch(createTask(params)),
    editTask: (params) => dispatch(editTask(params)),
    deleteTask: (params) => dispatch(deleteTask(params)),
    completeTask: (params) => dispatch(completeTask(params)),
    deleteCompleteTask: (params) => dispatch(deleteCompleteTask(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
