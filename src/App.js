import './App.css'
import {Switch, Route} from 'react-router-dom'
import LoginRoute from './components/LoginRoute'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import JobsRoute from './components/JobsRoute'
import NotFound from './components/NotFound'
import JobItemDetailsRoute from './components/JobItemDetailsRoute'

// These are the lists used in the application. You can move them to any component needed.
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginRoute} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute
      exact
      path="/jobs"
      render={props => (
        <JobsRoute
          {...props}
          salaryRangesList={salaryRangesList}
          employmentTypesList={employmentTypesList}
        />
      )}
    />
    <ProtectedRoute exact path="/jobs/:id" component={JobItemDetailsRoute} />
    <Route component={NotFound} />
  </Switch>
)

export default App
