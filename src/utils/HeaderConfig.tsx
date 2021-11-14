const HeaderConfig = (token: string) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

export default HeaderConfig;
