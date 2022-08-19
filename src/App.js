import { Routes, Route } from "react-router-dom";
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

      </Routes>
    </Response404Listener>
  );
}

export default App;
