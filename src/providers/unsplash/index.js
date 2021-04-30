import Unsplash, { toJson } from "unsplash-js";


const unsplash = new Unsplash({
    accessKey: "YwBoQMAjGijgGBTwykuAoDf1QXkj1eWbDavDDoYjSVI",
    secret: "Xn3dU_LS43pwMN0i6bC3PHIrDx60Io2ydAznZEStn2Q",
    callbackUrl: "urn:ietf:wg:oauth:2.0:oob",
    bearerToken: "1mpKHOw3OJlQ2gGFwmabKA_jyeeh6voaRpIfbhv2r9o"
});


// unsplash.auth.userAuthentication("Z0iK154CGZ3oA_hw2-Dp60wrw_KjubjGZ_9mYzFcLdc")
//     .then(toJson)
//     .then(json => {
//         console.log(json.access_token);
//         unsplash.auth.setBearerToken(json.access_token);
//     });

export default {
    createAlbom: (params) => {
        const { title, description } = params;
        return new Promise((resolve, reject) => {
            unsplash.collections.createCollection(title, description, true).then(toJson)
                .then(json => {
                    console.log(json)
                    resolve(json)
                }).catch(err => reject(err));
        });
    },

    fetchAlboms: function(params) {
        const { perPage, page } = params

        return new Promise((resolve, reject) => {
            unsplash.users.collections('drinkcsis', page, perPage, 'latest').then(toJson)
                .then(json => {
                    console.log(json)
                    resolve(json)
                }).catch(err => reject(err));
        });
    },
}