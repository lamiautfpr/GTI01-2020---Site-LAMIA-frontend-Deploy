import React from 'react';
import { Switch } from 'react-router-dom';
import { hasPermission } from '../hooks/Auth';
import Dashboard from '../pages/Dashboard';
import DashboardMembers from '../pages/Dashboard/Members';
import DashboardExperiseAreas from '../pages/Dashboard/ExperiseAreas';
import UnderConstruction from '../pages/Dashboard/UnderConstruction';
import Home from '../pages/Home';
import ListProducts from '../pages/List/Products';
import ListProjects from '../pages/List/Projects';
import ListPublications from '../pages/List/Publications';
import ListMembers from '../pages/ListMembers';
import Login from '../pages/Login';
import Member from '../pages/Member';
import News from '../pages/News';
import NewsList from '../pages/NewsList';
import ProjectView from '../pages/Work';
import Route from './Route';

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
      permittedFor={hasPermission}
    />
    <Route
      path="/dashboard/members/:login"
      exact
      component={DashboardMembers}
      isPrivate
      permittedFor={hasPermission}
    />
    <Route
      path="/dashboard/expertise-areas"
      exact
      component={DashboardExperiseAreas}
      isPrivate
      permittedFor={hasPermission}
    />
    <Route
      path="/dashboard/expertise-areas/:name"
      exact
      component={DashboardExperiseAreas}
      isPrivate
      permittedFor={hasPermission}
    />
    <Route
      path="/dashboard/categories"
      exact
      component={UnderConstruction}
      permittedFor={hasPermission}
    />
    <Route
      path="/dashboard/types"
      exact
      component={UnderConstruction}
      isPrivate
      permittedFor={hasPermission}
    />
    <Route
      path="/dashboard/works"
      exact
      component={UnderConstruction}
      isPrivate
      permittedFor={[...hasPermission, 'Membro']}
    />
    <Route
      path="/dashboard/phrases"
      exact
      component={UnderConstruction}
      isPrivate
    />
    <Route path="/:login" exact component={Member} />
  </Switch>
);

export default Routes;
