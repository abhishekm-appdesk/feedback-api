function isUserValid(userObject){
    if(userObject.id == null || userObject.fullName == null 
        || userObject.email == null || userObject.password == null 
        || userObject.userType == null || userObject.userType == null ||
        userObject.joinedOn == null ||
        userObject.position == null ||
        userObject.buddyId == null ||
        userObject.managerId == null){
            return false;
        }

        return true;
}
function checkIfNull(key) {
    return key == null || key == "" || key == undefined
}

export {isUserValid,checkIfNull}