const handleFormSubmit = (
    endPointString,
    name,
    password,
    passwordConfirm,
    authorizeUser,
    setShowOverlay,
    setErrorClassName
) => {
    return (event) => {
        event.preventDefault();

        if (password !== passwordConfirm && endPointString === "") {
            setShowOverlay(true);
            return setErrorClassName("error-state")
        }

        authorizeUser({name, password, endPointString})

    };
};

export default handleFormSubmit;