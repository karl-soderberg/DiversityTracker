//import { useState } from "react"
import './App.css'
import { NavBottom } from "./shared_pages/NavBottom";
import { ChartPage } from "./pages/ChartPage";
import { NewFormPage } from "./pages/NewFormPage";
import { AdminPage } from "./pages/AdminPage";
import { useQuery } from "react-query";
import { APIFormsResponse, Question } from "./types/types";
import { GetAllQuestions, GetFormsData } from "./util/Http";
import {
  Logout,
  StaticWebAuthLogins,
  ClientPrincipalContextProvider,
  UserPurge,
  useClientPrincipal,
} from "@aaronpowell/react-static-web-apps-auth";
import { Button } from 'antd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const UserDisplay = () => {
  const { clientPrincipal, loaded } = useClientPrincipal();

  if (!loaded) {
    return <p>Checking user info...</p>;
  }

  if (clientPrincipal) {
    return (
      <div>
        <p>
          {clientPrincipal.identityProvider} {clientPrincipal.userDetails}{" "}
          {clientPrincipal.userId} {clientPrincipal.userRoles}
        </p>
        <p>
          <Logout />
        </p>
        <p>
          <UserPurge provider={clientPrincipal.identityProvider} />
        </p>
      </div>
    );
  }

  return <p className="Not-signed-in">User not signed in</p>;
};



function App() {
  //const [page, setPage] = useState("ChartPage");

  const { data, isLoading, isError, error, refetch } = useQuery<Array<Question>, Error>({
    queryKey: ['getQuestions'],
    queryFn: () => GetAllQuestions()
  });

  const { data: formsData, isLoading: isLoadingForms, isError: isErrorForms, error: errorForms } = useQuery<APIFormsResponse>({
    queryKey: ['getFormData'],
    queryFn: () => GetFormsData()
  });

    return (
      <>
        <Router>
        <header className="App-header">
            <section className="App-header__login">
              <StaticWebAuthLogins
                twitter={false}
                customRenderer={({ href, className, name }) => (
                  <Button type="primary" className="login-button">
                    <a href={href} className={className}>
                      Login With {name}
                    </a>
                  </Button>
                )}
                />
            </section>
          <ClientPrincipalContextProvider>
            <UserDisplay />
          </ClientPrincipalContextProvider>
        </header>
      <NavBottom  />
      <main className="page-container">
        <Routes>
          <Route path="/newform" element={<NewFormPage 
              className="newformpage-container"
              questionData={data}
              isLoading={isLoading}
              isError={isError}
              error={error}
              refetch={refetch}
            />} />
          <Route path="/chart" element={<ChartPage 
              className="chartpage-container"
              questionData={data}
              isLoading={isLoading}
              isError={isError}
              error={error}
              refetch={refetch}
              formsData={formsData}
            />} />
          <Route path="/admin" element={<AdminPage 
              className="adminpage-container"
              questionData={data}
              isLoading={isLoading}
              isError={isError}
              error={error}
              refetch={refetch}
            />} />
        </Routes>
      </main>
    </Router>
      
          
      </>
         
    )
}

export default App
