import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import 'video.js/dist/video-js.css'
import './App.css'

import Player from './components/Player';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello. go to /watch for video player</div>,
    errorElement: <div>404 Not Found</div>
  },
  {
    path: '/watch',
    element: <Player />,
    errorElement: <div>404 Not Found</div>
  }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
