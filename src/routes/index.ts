import { lazy } from "react";

const ConnectCalendar = lazy(() => import('../pages/ConnectCalendar'));
const UpcomingEvents = lazy(() => import('../pages/UpcomingEvents'));
const AddInstantMeeting = lazy(() => import('../pages/AddInstantMeeting'));
const EventsHistory = lazy(() => import('../pages/EventsHistory'));
const TeamOrganization = lazy(() => import('../pages/TeamOrganization'));

const coreRoutes = [
  {
    path: '/connect-calendar',
    component: ConnectCalendar
  },
  {
    path: '/upcoming-events',
    component: UpcomingEvents
  },
  {
    path: '/add-instant-meeting',
    component: AddInstantMeeting
  },
  {
    path: '/events-history',
    component: EventsHistory
  },
  {
    path: '/team-organization',
    component: TeamOrganization
  }
];

const routes = [...coreRoutes];
export default routes;