export const  checkFormValidate = (email, password, name) => {
    const isEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const isPassword =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    
    const isName =  name !== undefined ? /^[A-Z][a-zA-Z '.-]*[A-Za-z][^-]$/.test(name) : true;
    
    if(!isEmail) return "Email Id is not valid";
    if(!isPassword) return "Password is not valid";
    if(!isName) return "Name is not valid";

    return null;
}