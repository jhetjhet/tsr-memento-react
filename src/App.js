import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout";
import PageLayout from "./layout/pages";
import RecordDetail from "./pages/record/detail";
import RecordPage from "./pages/record/lists";
import EntryDetailPage from "./pages/record/entries/detail";
import EntryListsPage from "./pages/record/entries/lists";
import LoginPage from "./pages/login";
import { VerifyToken } from "./provider/authentication";
import Page404 from "./pages/page404";
import Response404Listener from "./provider/notfound";
import RegisterPage from "./pages/register";

import {
  ROUTER_PAGE_ENDPOINTS,
  routePageUrlBuilder,
  getBuildUrlByEndPoints,
} from "./constants/urls";

function App() {
  return (
    <Response404Listener>
      <Routes>
        <Route
          path="*"
          element={
            <Page404 />
          }
        />

        <Route path="*" element={<MainLayout />}>
          
          {/* TEMPPORARY REDIRECT (ACT AS MAIN PAGE) */}
          <Route 
            path=""
            element={
              <Navigate 
                to={getBuildUrlByEndPoints(routePageUrlBuilder, ROUTER_PAGE_ENDPOINTS.RECORD_LISTS_PAGE)}
                replace
              />
            }
          />

          <Route path="records">

            <Route path="detail">
              <Route
                path=""
                element={
                  <PageLayout header={"create record"}>
                    <VerifyToken>
                      <RecordDetail />
                    </VerifyToken>
                  </PageLayout>}
              />
              <Route path=":record_id">

                <Route
                  path=""
                  element={
                    <PageLayout header={"Edit record"}>
                      <VerifyToken>
                        <RecordDetail />
                      </VerifyToken>
                    </PageLayout>}
                />

                <Route path="entries">

                  <Route
                    path="lists"
                    element={
                      <PageLayout header={"Entries"}>
                        <VerifyToken>
                          <EntryListsPage />
                        </VerifyToken>
                      </PageLayout>
                    }
                  />

                  <Route
                    path="detail"
                    element={
                      <PageLayout header={"New Entry"}>
                        <VerifyToken>
                          <EntryDetailPage />
                        </VerifyToken>
                      </PageLayout>
                    }
                  />

                  <Route
                    path="detail/:entry_id"
                    element={
                      <PageLayout header={"Edit Entry"}>
                        <VerifyToken>
                          <EntryDetailPage />
                        </VerifyToken>
                      </PageLayout>
                    }
                  />

                </Route>

              </Route>
            </Route>
            <Route
              path="lists"
              element={
                <PageLayout header={"Records"}>
                  <VerifyToken>
                    <RecordPage />
                  </VerifyToken>
                </PageLayout>}
            />
          </Route>
        </Route>

        <Route
          path="login"
          element={
            <LoginPage />
          }
        />
        <Route 
          path="register"
          element={
            <RegisterPage />
          }
        />

      </Routes>
    </Response404Listener>
  );
}

export default App;
