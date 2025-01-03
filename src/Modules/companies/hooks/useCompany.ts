import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";
import { companiesService } from "../services";
import { CompanyData } from "../types/companyData.type";

const useCompany = {
  useGet: (): UseQueryResult<CompanyData[]> => {
    return useQuery({
      queryKey: ["companies"],
      queryFn: companiesService.get,
    });
  },
  useCreate: (): UseMutationResult<CompanyData, Error, CompanyData> => {
    return useMutation({
      mutationKey: ["createCompany"],
      mutationFn: (data: CompanyData) => companiesService.create(data),
      onError: (error) => {
        console.error("Mutation error:", error);
      },
    });
  },
  
  useUpdate: (): UseMutationResult<
    CompanyData,
    Error,
    { id: number; data: CompanyData }
  > => {
    return useMutation({
      mutationKey: ["updateCompany"],
      mutationFn: ({ id, data }) => companiesService.update(id, data),
    });
  },
  useDelete: (): UseMutationResult<void, Error, number> => {
    return useMutation({
      mutationKey: ["deleteCompany"],
      mutationFn: (id: number) => companiesService.delete(id),
    });
  },
};

export default useCompany;
