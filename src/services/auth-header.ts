export default function authHeader() {
    const userStr = localStorage.getItem("user");
    if (userStr) {
        return { 
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": userStr 
        };
    } else {
        console.log("No session");
        return {};
    }
}

/*
const userStr = localStorage.getItem("user");
    let user = null;
    if (userStr)
        user = JSON.parse(userStr);

    if (user && user.accessToken) {
        return { Authorization: user };
    } else {
        return {};
    }
*/
