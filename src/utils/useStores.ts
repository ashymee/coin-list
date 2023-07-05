import { create } from "zustand";

export interface DataProps {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

type Stores = {
  data: DataProps[];
  setData: (data: DataProps[]) => void;

  singleData: DataProps | null;
  setSingleData: (singleData: DataProps | null) => void;

  searchText: string;
  setSearchText: (searchText: string) => void;

  deletedId: string;
  setDeletedId: (deletedId: string) => void;

  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;

  errorMessage: string | null;
  setErrorMessage: (errorMessage: string) => void;
};

const useStores = create<Stores>((set) => ({
  data: [],
  setData: (data) =>
    set((state) => ({
      ...state,
      data,
    })),

  singleData: null,
  setSingleData: (singleData) =>
    set((state) => ({
      ...state,
      singleData,
    })),

  searchText: "",
  setSearchText: (searchText) =>
    set((state) => ({
      ...state,
      searchText,
    })),

  deletedId: "",
  setDeletedId: (deletedId) =>
    set((state) => ({
      ...state,
      deletedId,
    })),

  isLoading: true,
  setIsLoading: (isLoading) =>
    set((state) => ({
      ...state,
      isLoading,
    })),

  errorMessage: null,
  setErrorMessage: (errorMessage) =>
    set((state) => ({
      ...state,
      errorMessage,
    })),
}));

export default useStores;
