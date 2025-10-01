export const getUserFromToken = (token = null) => {
    const tokenToUse = token || localStorage.getItem('token');
    if (!tokenToUse) return null;
    try {
        return JSON.parse(atob(tokenToUse.split('.')[1])).payload;
    } catch {
        return null;
    }
};

export const setTokenAndGetUser = (token) => {
    if (token) {
        localStorage.setItem('token', token);
        return getUserFromToken(token);
    }
    return null;
};

export const clearToken = () => {
    localStorage.removeItem('token');
};