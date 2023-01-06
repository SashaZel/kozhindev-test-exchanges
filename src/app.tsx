import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from './Header';
import Layout from './Layout';
import Footer from './Footer';

export default function App() {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <div>
                    <Header />
                    <Layout />
                    <Footer />
                </div>
            </Provider>
        </React.StrictMode>
    );
}
