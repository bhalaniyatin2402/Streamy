import { Provider } from 'react-redux'
import store from './stote/store'
import CustomRoutes from './routes/CustomRoutes'
import Header from './components/layout/header/Header'
import Footer from './components/layout/footer/Footer'

function App() {
  return (
    <Provider store={store}>
      <Header />
        <CustomRoutes />
      <Footer />
    </Provider>
  )
}

export default App
