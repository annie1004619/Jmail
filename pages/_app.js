import '../styles/globals.css'
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from "redux-persist";
import {store} from '../stores/index'

function MyApp({Component, pageProps}) {
    const persistor = persistStore(store)

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Component {...pageProps} />
            </PersistGate>
        </Provider>
    )
}

export default MyApp;
