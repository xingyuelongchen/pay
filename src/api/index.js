

// const files = require.context('./', true, /[A-Z][\w\d]+\.js$/);
// const MODULES = {};
// files.keys().forEach(key => {
//     const filename = key.replace(/(\.\/|\.js)/g, '');
//     MODULES[filename] = files(key)['default']
// });
export const Axios = require('./Axios').default;
export const Storage = require('./Storage').default;
export const FormatDate = require('./FormatDate').default;
export const Config = require('./Config');
export const Validate = require('./Validate');
const obj = { Axios, Config, Storage, ...Storage, Validate, FormatDate };
export default {
    install(VM) {
        var version = Number(VM.version.split('.')[0])
        if (version == 3) {
            // vue ^3.0  版本扩展方法
            VM.config.globalProperties = obj;
        } else {
            // vue 2.0+  版本扩展方法 
            Object.keys(obj).forEach(e => {
                VM.prototype[e.toLocaleLowerCase()] = obj[e]
            })
        }
    }
};

