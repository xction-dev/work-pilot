import { create } from "zustand";
import { Video } from "../../data/types";

type LogStore = {
  current: string[];
  history: string[];
  phoneNo: string | null;
  isLoaded: boolean;
};

export const useLog = create<LogStore>()((set) => ({
  current: [],
  history: [],
  phoneNo: null,
  isLoaded: false,
}));

export const initiateLog = (sources: Video[]) => {
  loadLog();
  const { current } = useLog.getState();
  if (current.length > 0) {
    const currentSource = sources.find(
      (source) => source.id === current[current.length - 1],
    );
    if (currentSource) {
      return currentSource;
    }
  }
  return sources[0];
};

export const addCurrentLog = (id: string) => {
  const { current } = useLog.getState();
  if (current.includes(id)) return;

  window.localStorage.setItem("current", JSON.stringify([...current, id]));
  useLog.setState({ current: [...current, id] });
};

export const addPhoneNo = (phoneNo: string) => {
  window.localStorage.setItem("phoneNo", phoneNo);
  useLog.setState({ phoneNo });
};

export const updateHistory = () => {
  const { current, history } = useLog.getState();
  const validCurrent = current.filter((id) => !history.includes(id));
  window.localStorage.setItem(
    "history",
    JSON.stringify([...history, ...validCurrent]),
  );
  window.localStorage.setItem("current", JSON.stringify([]));
  useLog.setState({ current: [], history: [...history, ...validCurrent] });
};

export const loadLog = () => {
  if (useLog.getState().isLoaded) return;

  const current = window.localStorage.getItem("current");
  const history = window.localStorage.getItem("history");
  const phoneNo = window.localStorage.getItem("phoneNo");

  useLog.setState({
    current: current ? (JSON.parse(current) as string[]) : [],
    history: history ? (JSON.parse(history) as string[]) : [],
    phoneNo: phoneNo ? phoneNo : null,
    isLoaded: true,
  });
};

export const resetLog = () => {
  window.localStorage.setItem("current", JSON.stringify([]));
  window.localStorage.setItem("history", JSON.stringify([]));

  useLog.setState({ current: [], history: [], phoneNo: null });
};
