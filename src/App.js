import './App.css';
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache
} from '@tanstack/react-query'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './UI/Home';
import Flights from './UI/Flights';
import 'flowbite';
import { Provider } from 'react-redux'
import store from './utils/store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const onError = (data) => {
  console.log(`error: ${data.message}`)
}

const onSuccess = (data) => {
  console.log(`success: ${data}`)
}

const onSuccessMutate = (data) => {
  console.log('Request sent successfully!');
}

// Create a client ve hata mesajını göstermek için genel bir kod yaz
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onSuccess,
    onError,
  }),
  mutationCache: new MutationCache({
    onSuccess: onSuccessMutate,
  })
})

function App() {

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flights" element={<Flights />} />
          </Routes>
        </Router>
        <ToastContainer position='top-center' />
      </QueryClientProvider>
    </Provider>


  );
}

export default App;
