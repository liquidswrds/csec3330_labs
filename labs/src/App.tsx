import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Dashboard } from './features/dashboard/components/Dashboard'
import { SystemBoundaryLab } from './features/system-boundary-lab/components/SystemBoundaryLab'
import { InterconnectionLab } from './features/interconnection-lab/components/InterconnectionLab'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/lab/1.1" element={<SystemBoundaryLab />} />
        <Route path="/lab/1.2" element={<InterconnectionLab />} />
      </Routes>
    </Router>
  )
}

export default App