import React, {useState} from "react";
import "./RegisterPage.css";
import handleFormSubmit from "./helpers/handleFormSubmit";
import ToastComponent from "../../common/ToastError/ToastError";
import {useDispatch} from "react-redux";
import handleInputChange from "./helpers/handleInputChange";
import Input from "./input/Input";
import ModeButton from "./modeButton/ModeButton";
import {authorizeUserAsync} from "../../common/userSlice";

const RegisterPage = () => {
    const dispatch = useDispatch()
    const authorizeUser = (userData) => dispatch(authorizeUserAsync(userData))

    const [mode, setMode] = useState("signIn");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [showOverlay, setShowOverlay] = useState(false);
    const [errorClassName, setErrorClassName] = useState("");
    const inputData = {setName, setPassword, showOverlay, setShowOverlay, setErrorClassName, setPasswordConfirm}

    return (
        <div className="full-screen-container">
            <div className="login-container">
                <h3 className="login-title">Welcome</h3>
                <form>
                    <Input className='' id="name-input" type="text" labelText='User name '
                           handler={handleInputChange('name', inputData)}
                           value={name}/>
                    <Input className={errorClassName} id="password" type="password" labelText='Password '
                           handler={handleInputChange('password', inputData)}
                           value={password} withOverlay showOverlay={showOverlay}/>

                    {mode === "register" && <Input className={errorClassName} id="password-confirm" type="password"
                                                   labelText='Confirm password '
                                                   handler={handleInputChange('password-confirm', inputData)}
                                                   value={passwordConfirm}/>}
                    <div className="button-group">
                        {mode === "signIn" && <ModeButton question='Need an account?' suggestion='Create it now!'
                                                          handler={() => setMode("register")}/>}
                        {mode === "register" && <ModeButton question='Already registered?' suggestion='Sign In!'
                                                            handler={() => setMode("signIn")}/>}
                        {mode === "register" && (
                            <button
                                type="submit"
                                onClick={handleFormSubmit(
                                    "",
                                    name,
                                    password,
                                    passwordConfirm,
                                    authorizeUser,
                                    setShowOverlay,
                                    setErrorClassName
                                )}
                                className="login-button"
                            >
                                Register
                            </button>
                        )}
                        {mode === "signIn" && (
                            <button
                                type="submit"
                                onClick={handleFormSubmit(
                                    "login",
                                    name,
                                    password,
                                    passwordConfirm,
                                    authorizeUser,
                                    setShowOverlay,
                                    setErrorClassName
                                )}
                                className="login-button"
                            >
                                Sign In
                            </button>
                        )}
                    </div>
                </form>
            </div>
            <ToastComponent/>
        </div>
    );
};

export default RegisterPage;