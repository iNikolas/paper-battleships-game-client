const handleInputChange = (inputType, {setName, setPassword, showOverlay, setShowOverlay, setErrorClassName, setPasswordConfirm}) => {
    return (event) => {
        if (inputType === "name") setName(event.target.value);
        if (inputType === "password") {
            setPassword(event.target.value);
            if (showOverlay) {
                setShowOverlay(false);
                setErrorClassName("");
            }
        }
        if (inputType === "password-confirm") {
            setPasswordConfirm(event.target.value);
            if (showOverlay) {
                setShowOverlay(false);
                setErrorClassName("");
            }
        }
    };
};

export default handleInputChange