
const getdicofr = () => {
    return Promise.all([new Promise(resolve => {
            require.ensure(['./dico-fr.js'], () => {
                resolve(require('./dico-fr.js'));
            }, `${(process.env.NODE_ENV=='development')?"main":"dico-fr"}`);
        }),
        new Promise(resolve => {
            require.ensure(['./Mysite-dico-fr.js'], () => {
                resolve(require('./Mysite-dico-fr.js'));
            }, `${(process.env.NODE_ENV=='development')?"main":"dico-fr"}`);
        })
    ]);
};
const getdicopt = () => {
    return Promise.all([new Promise(resolve => {
            require.ensure(['./dico-pt.js'], () => {
                resolve(require('./dico-pt.js'));
            }, `${(process.env.NODE_ENV=='development')?"main":"dico-pt"}`);
        }),
        new Promise(resolve => {
            require.ensure(['./Mysite-dico-pt.js'], () => {
                resolve(require('./Mysite-dico-pt.js'));
            }, `${(process.env.NODE_ENV=='development')?"main":"dico-pt"}`);
        })
    ]);
};
const getdicoen = () => {
    return Promise.all([new Promise(resolve => {
            require.ensure(['./dico-en.js'], () => {
                resolve(require('./dico-en.js'));
            }, `${(process.env.NODE_ENV=='development')?"main":"dico-en"}`);
        }),
        new Promise(resolve => {
            require.ensure(['./Mysite-dico-en.js'], () => {
                resolve(require('./Mysite-dico-en.js'));
            }, `${(process.env.NODE_ENV=='development')?"main":"dico-en"}`);
        })
    ]);
};
const getdicoru = () => {
    return Promise.all([new Promise(resolve => {
            require.ensure(['./dico-ru.js'], () => {
                resolve(require('./dico-ru.js'));
            }, `${(process.env.NODE_ENV=='development')?"main":"dico-ru"}`);
        }),
        new Promise(resolve => {
            require.ensure(['./Mysite-dico-ru.js'], () => {
                resolve(require('./Mysite-dico-ru.js'));
            }, `${(process.env.NODE_ENV=='development')?"main":"dico-ru"}`);
        })
    ]);
};
const dicoarray_func={
fr:getdicofr,
ru:getdicoru,
uk:getdicoru,
pt:getdicopt,
en:getdicoen,
}

export default dicoarray_func;
