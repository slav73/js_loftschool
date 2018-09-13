function auth() {

    VK.init ({
        apiId:6684518
    });

    return new Promise((resolve, reject) => {
        VK.Auth.login(data => {
            if(data.session) {
                resolve();
            } else {
                reject(new Error('Не удалось авторизоваться!'));
            }
        }, 2);
    });
}

function callAPI(method, params) {
    params.v = '5.84';

    return new Promise((resolve, reject) => {
        VK.api(method, params, (data) => {
            if (data.error) {
                reject(data.error);
            } else {
                resolve(data.response);
            }
        });
    });
}

export { auth, callAPI }; 