import { Suspense, lazy } from 'react'
import './App.css'

const HomePage = lazy( () => import("./pages/home") );
function App() {
  return (
    <Suspense>
      <HomePage/>
    </Suspense>
  )
}


export default App
