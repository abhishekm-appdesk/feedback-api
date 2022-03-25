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

export {isUserValid}