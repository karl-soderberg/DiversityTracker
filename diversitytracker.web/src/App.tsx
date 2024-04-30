import './App.css'
import { NavBottom } from "./shared_pages/NavBottom";
import { ChartPage } from "./pages/ChartPage";
import { NewFormPage } from "./pages/NewFormPage";
import { AdminPage } from "./pages/AdminPage";
import { useMutation, useQuery } from "react-query";
import { APIFormsResponse, Question } from "./types/types";
import { GetAllQuestions, GetFormsData, aiCreateDataFromQuestionAnswersInterpretation, aiInterperetAllQuestionAnswers, aiInterperetAllQuestionValues, aiInterperetAllRealData, aiInterperetAllReflectionsForms } from "./util/Http";
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

  return <p>User not signed in</p>;
};



function App() {

  const { data, isLoading, isError, error, refetch: questionRefetch } = useQuery<Array<Question>, Error>({
    queryKey: ['getQuestions'],
    queryFn: () => GetAllQuestions()
  });

  const {data: formsData, isLoading: aiIsLoadingForms, isError: aiIsErrorForms, error: aiErrorForms, refetch } = useQuery<APIFormsResponse>({
    queryKey: ['getFormData'],
    queryFn: () => GetFormsData()
  });

  const InterperetAllReflectionsForms = useMutation(() => aiInterperetAllReflectionsForms(), {
      onSuccess: () => {
          refetch();
          questionRefetch();
      }
  });

  const InterperetAllRealData = useMutation(() => aiInterperetAllRealData(), {
      onSuccess: () => {
          refetch();
          questionRefetch();
      }
  });

  const InterperetAllQuestionAnswers = useMutation(() => aiInterperetAllQuestionAnswers(), {
    onSuccess: () => {
        refetch();
        questionRefetch();
    }
  });

  const InterperetAllQuestionValues = useMutation(() => aiInterperetAllQuestionValues(), {
      onSuccess: () => {
          refetch();
          questionRefetch();
      }
  });

  const CreateDataFromQuestionAnswersInterpretation = useMutation(() => aiCreateDataFromQuestionAnswersInterpretation(), {
      onSuccess: () => {
          refetch();
          questionRefetch();
      }
  });

    const { clientPrincipal, loaded } = useClientPrincipal();
    const isUser = clientPrincipal !== undefined;

    if (!loaded) {
      return <p>Loading...</p>; 
    }

    return (
          <>
              <header className="App-header">
                    <section className="App-header__login">
                    <h2>DataSense</h2>
                    <StaticWebAuthLogins
                                  twitter={false}
                                  customRenderer={({ href, className, name }) => (
                                    <button className="login-button">
                                      <a href={href} className={className}>
                                        Login With {name}
                                      </a>
                                    </button>
                                  )}
                                  />
                    <p>{isUser}</p>
                    
                      <UserDisplay />
                    

                    <Button>
                      <Logout />      
                    </Button>
                    </section>
                </header>
                {isUser ? (
                  <Router>
                    <NavBottom />
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
                              InterperetAllRealData={InterperetAllRealData.mutate}
                              InterperetAllReflectionsForms={InterperetAllReflectionsForms.mutate}
                              InterperetAllQuestionAnswers={() => {InterperetAllQuestionAnswers.mutate; InterperetAllQuestionValues.mutate}}
                              InterperetAllQuestionValues={() => {InterperetAllQuestionValues.mutate; InterperetAllQuestionAnswers.mutate}}
                              CreateDataFromQuestionAnswersInterpretation={CreateDataFromQuestionAnswersInterpretation.mutate}
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
                ) : (
                  <article className="Mainpage-login">
                  <h2 className="Mainpage-login__title">DataSense</h2>
                  <section className="Mainpage-login__buttons">
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
          </article>
          )}
          </>  
    )
}

export default App
