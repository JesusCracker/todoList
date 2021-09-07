import dva from 'dva';
import './index.css';
import { createBrowserHistory as createHistory } from 'history';
import createLoading from 'dva-loading'

// 1. Initialize
const app = dva({
    history: createHistory({
        basename:'/'
    }),
    onError(e,dispatch) {
        e.preventDefault();//effects里面没有写好，加判断吧
        // dispatch(routerRedux.push({ pathname: '/'}));
    }
});


// 2. Plugins
app.use(createLoading());

// 3. Model
// app.model(require('./models/example').default);
require('./models').default.forEach(key => app.model(key.default));

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
