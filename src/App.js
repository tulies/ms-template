import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import Main from './pages/Main';
// import About from './pages/About';
// import List from './pages/List';
import routes from "./router/routes";
import BlankLayout from "@/layouts/BlankLayout";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <div> */}
        {/* <div className="header-nav">
          <NavLink to="/" exact>首页</NavLink>
          <NavLink to="/list">列表</NavLink>
          <NavLink to="/about">关于</NavLink>
        </div> */}
        {routes.map((router, index) => {
          // if (router.layout) {
          //   return (
          //     <router.component key={index}>
          //       {router.children.map((router2, index2) => {
          //         return (
          //           <Route
          //             exact
          //             key={index2}
          //             path={router2.path}
          //             render={(props) => (
          //               <router2.component {...props} routes={router2.children} />
          //             )}
          //           />
          //         );
          //       })}
          //     </router.component>
          //   );
          // }

          // 不要问我为什么写多层循循序不做个组件，因为懒，。。
          return (
            <Route
              exact={router.exac}
              key={index}
              path={router.path}
              render={(props) => {
                return (
                  <router.component {...props} routes={router.children}>
                    {router.children.map((router2, index2) => {
                      return (
                        <Route
                          key={index2}
                          path={router2.path}
                          render={(props2) => {
                            const RouterChild2 =
                              router2.component || BlankLayout;
                            return (
                              <RouterChild2
                                {...props2}
                                routes={router2.children}
                              >
                                {router2.children &&
                                  router2.children.map((router3, index3) => {
                                    return (
                                      <Route
                                        exact
                                        key={index3}
                                        path={router3.path}
                                        render={(props3) => (
                                          <router3.component
                                            {...props3}
                                            routes={router2.children}
                                          ></router3.component>
                                        )}
                                      />
                                    );
                                  })}
                              </RouterChild2>
                            );
                          }}
                        />
                      );
                    })}
                  </router.component>
                );
              }}
            />
          );
        })}
        {/* </div> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
