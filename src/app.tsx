import { Router, useLocation } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense, Show } from "solid-js";
import { MetaProvider } from "@solidjs/meta";
import HomeLayout from "./layouts/home.layout";
import ErrorLayout from "./layouts/error.layout";
import "./app.css";

function AppContent(props: { children: any }) {
  const location = useLocation();
  const is404 = () => {
    if (location.pathname === "/") return false;
    if (location.pathname.startsWith("/services")) return false;
    return !["/tutorial", "/contact", "/upload"].includes(location.pathname);
  };

  return (
    <Show when={is404()} fallback={<HomeLayout>{props.children}</HomeLayout>}>
      <ErrorLayout>{props.children}</ErrorLayout>
    </Show>
  );
}

export default function App() {
  return (
    <MetaProvider>
      <Router root={props => <AppContent>{props.children}</AppContent>}>
        <FileRoutes />
      </Router>
    </MetaProvider>
  );
}
