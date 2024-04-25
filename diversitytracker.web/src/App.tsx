import { useState } from "react"
import './App.css'
import { NavBottom } from "./shared_pages/NavBottom";
import { ChartPage } from "./pages/ChartPage";
import { FormPage } from "./pages/FormPage";
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

  return <p>User not signed in</p>;
};



function App() {
  const [page, setPage] = useState("ChartPage");

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


        <header className="App-header">
        <StaticWebAuthLogins
          customProviders={[{ id: "okta", name: "Okta" }]}
          label={(name) => `Do sign in ${name}`}
        />

        <br />
        <p>Login with custom renderer.</p>
        <StaticWebAuthLogins
          customProviders={[{ id: "okta", name: "Okta" }]}
          customRenderer={({ href, className, name }) => (
            <button className="login-button">
              <a href={href} className={className}>
                Custom Login Renderer - {name}
              </a>
            </button>
          )}
        />

        <ClientPrincipalContextProvider>
          <UserDisplay />
        </ClientPrincipalContextProvider>
      </header>
      <NavBottom 
        page={page}
        setPage={(page) => setPage(page)}
      />
      <main className="page-container">
        <FormPage 
          className={"formpage-container " + (page == "FormPage" && "active")}
          questionData={data}
          isLoading={isLoading}
          isError={isError}
          error={error}
          refetch={refetch}
        />
        <NewFormPage 
          className={"newformpage-container " + (page == "NewFormPage" && "active")}
          questionData={data}
          isLoading={isLoading}
          isError={isError}
          error={error}
          refetch={refetch}
        />
        <ChartPage 
          className={"chartpage-container " + (page == "ChartPage" && "active")}
          questionData={data}
          isLoading={isLoading}
          isError={isError}
          error={error}
          refetch={refetch}
          formsData={formsData}
        />
        <AdminPage 
          className={"adminpage-container " + (page == "AdminPage" && "active")}
          questionData={data}
          isLoading={isLoading}
          isError={isError}
          error={error}
          refetch={refetch}
        />
      </main>
    </>
  )
}

export default App
