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
import { NavTop } from './shared_pages/NavTop';
import { AnonymousLogin } from './shared_pages/AnonymousLogin';

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
    const isUser = clientPrincipal?.userRoles.includes('anonymous');
    const isAdmin = clientPrincipal?.userRoles.includes('admin');

    // const isAdmin = true;
    // const isUser = true;

    if (!loaded) {
      return <p>Loading...</p>;
    }
    return (
          <>
                {isUser ? (
                  <>
                    {/* <header className="App-header">
                      <section className="App-header__login">
                      <h2>DataSense</h2>
                        <Button>
                          <Logout />
                        </Button>
                      </section>
                  </header> */}
                  <NavTop />
                    <Router>
                      <NavBottom 
                        isAdmin={isAdmin}
                      />
                      <main className="page-container">
                          <Routes>
                              <Route path='/anonymouslogin' element={<AnonymousLogin />}></Route>
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
                  </>
                ) : (
                  <>
                  {/* <header className="App-header">
                    <section className="App-header__login">
                    <h2>DataSense</h2>
                      <Button>
                        <Logout />
                      </Button>
                    </section>
                </header> */}
                  <Router>
                    <main className="page-container">
                        <Routes>
                            <Route path='/anonymouslogin' element={<AnonymousLogin />}></Route>
                            <Route path="/anonymousform" element={<NewFormPage
                                className="newformpage-container"
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
                  // <article className="Mainpage-login">
                  //   <img src="https://res.cloudinary.com/dlw9fdrql/image/upload/v1714415047/office_tracker_logo_konca1.png" alt="" />
                  //   <h2>OFFICE TRACKER</h2>
                  //   <p>HARMONIZING THE INTEPERSONAL WORKSPACE</p>
                  //   <section className="Mainpage-login__buttons">
                  //       <StaticWebAuthLogins
                  //           twitter={false}
                  //           customRenderer={({ href, className, name }) => (
                  //             <Button className="login-button">
                  //               <a href={href} className={className}>
                  //                 Login With {name}
                  //               </a>
                  //             </Button>
                  //           )}
                  //         />
                  //   </section>
                  // </article>
          )}
          </>
    )
}
export default App