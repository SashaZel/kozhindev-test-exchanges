import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from './Header';
import Layout from './Layout';

function App() {
    return (
        <Provider store={store}>
            <div>
                <Header />
                Great react setup from scratch without cra testing ts
                <Layout />
            </div>
        </Provider>
    );
}
export default App;
