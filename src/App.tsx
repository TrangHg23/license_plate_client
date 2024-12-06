import { Fragment } from "react/jsx-runtime";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router";
import DefaultLayout from "./layout/DefautLayout";
import 'react-toastify/dist/ReactToastify.css';
import { allRoutes } from "./routes";

export default function App () {
  return (
    <main>
      <Routes>
          { 
            allRoutes.map((route, i) => {
              let Layout;
              if(route.layout === null) Layout = Fragment
              else if(route.layout) Layout = route.layout
              else Layout = DefaultLayout
              const Page = route.component
                return (
                  <Route key={i} path={route.path} element={<Layout><Page/></Layout>}/>
                )
            })
          }
      </Routes>
      <ToastContainer autoClose={5000} closeOnClick/>
    </main>
  )
}