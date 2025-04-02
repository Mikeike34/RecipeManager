
//returns the userID of the user that is currently logged in. 
export const useGetUserID = () => {
    return window.localStorage.getItem('userID');
};