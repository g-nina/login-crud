import React, { lazy } from 'react'
import { HomeRedirect } from './RouteUtils'
import RouteController from './RouteController'
import { Redirect } from 'react-router-dom';
const Dashboard = lazy(() => import('../components/views/Dashboard'));
const Login = lazy(() => import('../components/views/Login'));
const Home = lazy(() => import('../components/views/Home'));
const Crud = lazy(() => import('../components/views/Crud'));



const routes = [
    {
        path: "/",
        exact: true,    
        component: HomeRedirect
    },
    {
        path: "/login",
        exact: true,
        render: props => <Login {...props} />
    },
    {
        path: "/app",
        render: props => <RouteController component={Home} {...props} />,
        routes: [
            {
                path: "/app",
                exact: true,
                render: props => <RouteController component={Dashboard} {...props} />
            },
            {
                path: "/app/Crud",
                exact: true,
                render: props => <RouteController component={Crud} {...props} />
            }
        ]
    }
]

export default routes