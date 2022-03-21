import React, {useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "./Dashboard.css";
import handleUpdateUser from "./handleUpdateUser";
import ToastComponent from "../../../common/ToastError/ToastError";
import {useDispatch, useSelector} from "react-redux";
import {updateUserAsync} from "../../../common/userSlice";
import {changeErrorState} from "../../../common/errorSlice";

const Dashboard = ({showDashboard, setShowDashboard}) => {
    const {id, name, rights} = useSelector(state => state.user.user)
    const dispatch = useDispatch()

    const [newName, setNewName] = useState(name);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [changePassword, setChangePassword] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [errorClassName, setErrorClassName] = useState("");
    const [working, setWorking] = useState(false);
    const [hidePasswordInput, setHidePasswordInput] = useState(true);

    const isDisabled =
        !oldPassword ||
        (changePassword && (!newPassword || !passwordConfirmation)) ||
        ((newName === name || !newName) && !changePassword);

    const handleFieldChange = (fieldName) => {
        return (event) => {
            const value = event.target.value;

            if (fieldName === "newName") setNewName(value);
            if (fieldName === "oldPassword") setOldPassword(value);
            if (fieldName === "newPassword") {
                setNewPassword(value);
                if (showOverlay) {
                    setShowOverlay(false);
                    setErrorClassName("");
                }
            }
            if (fieldName === "passwordConfirmation") {
                setPasswordConfirmation(value);
                if (showOverlay) {
                    setShowOverlay(false);
                    setErrorClassName("");
                }
            }
        };
    };

    const handleFormSubmit = async () => {
        if (changePassword && newPassword !== passwordConfirmation) {
            setShowOverlay(true);
            setErrorClassName("error-state");
            return;
        }
            setWorking(true);

            const {payload: {status}} = await dispatch(updateUserAsync({id, newName, name, oldPassword, changePassword, newPassword}))

            console.log(status);

            if (status === "updated") setShowDashboard(false);
            setWorking(false);
    };

    useEffect(() => {
        if (showDashboard) {
            setNewName(name);
            setOldPassword("");
            setNewPassword("");
            setPasswordConfirmation("");
            setChangePassword(false);
            setShowOverlay(false);
            setErrorClassName("");
            setHidePasswordInput(true);
            dispatch(changeErrorState(null))
        }
    }, [showDashboard, name]);

    useEffect(() => {
        if (changePassword || name !== newName) setHidePasswordInput(false);
        if (!changePassword && name === newName) setHidePasswordInput(true);
    }, [changePassword, newName]);

    return (
        <Modal
            show={showDashboard}
            onHide={() => setShowDashboard(false)}
            backdrop="static"
            keyboard={false}
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>Dashboard for: {name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ToastComponent/>
                <p>
                    <b>Your unique user ID is</b>: {id}
                </p>
                <p>
                    <b>Rights</b>: {rights}
                </p>

                <Form onSubmit={(event) => event.preventDefault()}>
                    <Form.Group className="mb-3" controlId="formNewName">
                        <Form.Label>New user name</Form.Label>
                        <Form.Control
                            type="text"
                            value={newName}
                            onChange={handleFieldChange("newName")}
                            maxLength="20"
                            placeholder="Your new name"
                        />
                        <Form.Text className="text-muted">
                            You can leave this field empty to persist current name
                        </Form.Text>
                    </Form.Group>

                    {!hidePasswordInput && (
                        <Form.Group className="mb-3" controlId="formOldPassword">
                            <Form.Label>Current password</Form.Label>
                            <Form.Control
                                value={oldPassword}
                                onChange={handleFieldChange("oldPassword")}
                                required
                                type="password"
                                placeholder="Password"
                            />
                            <Form.Text className="text-muted">Can not be empty</Form.Text>
                        </Form.Group>
                    )}

                    {changePassword && (
                        <>
                            <Form.Group className="mb-3" controlId="formNewPassword">
                                <Form.Label>New password</Form.Label>
                                <OverlayTrigger
                                    placement="top"
                                    show={showOverlay}
                                    overlay={
                                        <Tooltip id="newPasswordTooltip">
                                            Passwords do not mach!
                                        </Tooltip>
                                    }
                                >
                                    <Form.Control
                                        className={errorClassName}
                                        value={newPassword}
                                        onChange={handleFieldChange("newPassword")}
                                        required
                                        type="password"
                                        placeholder="Password"
                                    />
                                </OverlayTrigger>
                                <Form.Text className="text-muted">
                                    You can leave this field empty to persist current password
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPasswordConfirm">
                                <Form.Label>Confirm new password</Form.Label>
                                <Form.Control
                                    className={errorClassName}
                                    value={passwordConfirmation}
                                    onChange={handleFieldChange("passwordConfirmation")}
                                    required
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Group>
                        </>
                    )}

                    <Form.Group className="mb-3" controlId="changePasswordCheckbox">
                        <Form.Check
                            checked={changePassword}
                            onChange={() => setChangePassword((prevState) => !prevState)}
                            type="checkbox"
                            label="Change password"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowDashboard(false)}>
                    Close
                </Button>
                <Button
                    disabled={isDisabled || working}
                    onClick={handleFormSubmit}
                    variant="primary"
                >
                    {working ? "Updating..." : "Save changes"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Dashboard;
