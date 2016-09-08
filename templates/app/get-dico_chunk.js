
const getdicofr = () => {
    return Promise.all([new Promise(resolve => {
            require.ensure(['./dico-fr.js'], () => {
                resolve(require('./dico-fr.js'));
            }, "dico-fr");
        }),
        new Promise(resolve => {
            require.ensure(['./Mysite-dico-fr.js'], () => {
                resolve(require('./Mysite-dico-fr.js'));
            }, "dico-fr");
        })
    ]);
};
const getdicopt = () => {
    return Promise.all([new Promise(resolve => {
            require.ensure(['./dico-pt.js'], () => {
                resolve(require('./dico-pt.js'));
            }, "dico-pt");
        }),
        new Promise(resolve => {
            require.ensure(['./Mysite-dico-pt.js'], () => {
                resolve(require('./Mysite-dico-pt.js'));
            }, "dico-pt");
        })
    ]);
};
const getdicoen = () => {
    return Promise.all([new Promise(resolve => {
            require.ensure(['./dico-en.js'], () => {
                resolve(require('./dico-en.js'));
            }, "dico-en");
        }),
        new Promise(resolve => {
            require.ensure(['./Mysite-dico-en.js'], () => {
                resolve(require('./Mysite-dico-en.js'));
            }, "dico-en");
        })
    ]);
};
const getdicoru = () => {
    return Promise.all([new Promise(resolve => {
            require.ensure(['./dico-ru.js'], () => {
                resolve(require('./dico-ru.js'));
            }, "dico-ru");
        }),
        new Promise(resolve => {
            require.ensure(['./Mysite-dico-ru.js'], () => {
                resolve(require('./Mysite-dico-ru.js'));
            }, "dico-ru");
        })
    ]);
};
const dicoarray_func={
fr:getdicofr,
ru:getdicoru,
pt:getdicopt,
en:getdicoen,
}

export default dicoarray_func;
