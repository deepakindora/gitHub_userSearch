import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Search from "./component/Search";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
   <Search/>
   </QueryClientProvider>
  );
}

export default App;
