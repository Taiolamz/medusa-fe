
import { lazy } from "react"

const Dashboard = lazy(() => import("@/pages/app/dashboard"))
const Users = lazy(() => import("@/pages/app/users"))
const Settings = lazy(() => import("@/pages/app/settings"))


export {
    Dashboard,
    Users,
    Settings,
}
