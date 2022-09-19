import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectIsLoading } from "./app/data";
import { fetchData } from "./app/services/data";
import { useAppDispatch } from "./app/store";
import { Generator } from "./components/Generator";
import { Loading } from "./components/Loading";

function App() {
  const dispatch = useAppDispatch();
  const loading = useSelector(selectIsLoading);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? <Loading /> : <Generator />}
    </div>
  );
}

export default App;
