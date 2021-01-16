import React, { Suspense, lazy } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import Loading from './components/Loading'

const NotFound = lazy(() => import('./pages/NotFound'))
const PublicQuiz = lazy(() => import('./pages/PublicQuiz'))

export default function PageRouter() {
    return (
        <Router>
            <Suspense fallback={<Loading />}>
                <Switch>
                    <Route exact path="/:qid" component={PublicQuiz} />
                    <Route component={NotFound} />
                </Switch>
            </Suspense>
        </Router>
    )
}
