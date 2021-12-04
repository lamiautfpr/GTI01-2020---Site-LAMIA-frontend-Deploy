import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Home from '../pages/Home';

import ListProducts from '../pages/List/Products';
import ListProjects from '../pages/List/Projects';
import ListPublications from '../pages/List/Publications';
import Login from '../pages/Login';

import Dashboard from '../pages/Dashboard';
import DashboardMembers from '../pages/Dashboard/Members';
import UnderConstruction from '../pages/Dashboard/UnderConstruction';

import ListMembers from '../pages/ListMembers';
import Member from '../pages/Member';
import ProjectView from '../pages/Work';
import NewsList from '../pages/NewsList';
import News from '../pages/News';

// Switch é para apresentar uma rota de cada vez

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/news" exact component={NewsList} />
    <Route path="/news/:id" exact component={News} />
    <Route path="/members" exact component={ListMembers} />

    <Route path="/login" exact component={Login} />

    <Route path="/works/products" exact component={ListProducts} />
    <Route path="/works/projects" exact component={ListProjects} />
    <Route path="/works/publications" exact component={ListPublications} />

    <Route path="/work/:slug" exact component={ProjectView} />

    <Route path="/dashboard" exact component={Dashboard} isPrivate />
    <Route
      path="/dashboard/members"
      exact
      component={DashboardMembers}
      isPrivate
      permittedFor={['Administrador', 'Coordenador', 'Orientador']}
    />
    <Route
      path="/dashboard/members/:login"
      exact
      component={DashboardMembers}
      isPrivate
      permittedFor={['Administrador', 'Coordenador', 'Orientador']}
    />

    <Route
      path="/dashboard/products"
      exact
      component={UnderConstruction}
      isPrivate
    />
    <Route
      path="/dashboard/projects"
      exact
      component={UnderConstruction}
      isPrivate
    />
    <Route
      path="/dashboard/publications"
      exact
      component={UnderConstruction}
      isPrivate
    />

    <Route path="/:login" exact component={Member} />
  </Switch>
);

export default Routes;
