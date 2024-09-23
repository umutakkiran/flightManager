import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import baseUrl from "../utils/config";

const addData = async (data) => {
  console.log(data.endpoint, data.data)
  return await axios.post(`${baseUrl}${data.endpoint}`, data.data, {

  }).catch(error => {
    console.log('Error:', error.response.data.Data);
  });
}

const putData = async (data) => {
  console.log(data.endpoint, data.data)
  return await axios.put(`${baseUrl}${data.endpoint}`, data.data, {
  }).catch(error => {
    console.log('Error:', error.response.data.Data);
  });
}

const delData = async (data) => {
  console.log(data.endpoint, data.data)
  return await axios.delete(`${baseUrl}${data.endpoint}`, {

    data: data?.data ? data.data : null
  }).catch(error => {
    console.log('Error:', error.response.data.Data);
  });
}

export const useAddMutate = () => {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: addData,
      onSuccess: (data, variables) => Promise.all([
        variables.key.forEach(key => {
          queryClient.invalidateQueries({ queryKey: [key] });
        })
      ])
    }
  )
}

export const useUpdateMutate = () => {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: putData,
      onSuccess: (data, variables) => Promise.all([
        variables.key.forEach(key => {
          queryClient.invalidateQueries({ queryKey: [key] });
        })
      ])
    }
  )
}

export const useDeleteMutate = () => {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: delData,
      onSuccess: (data, variables) => Promise.all([
        variables.key.forEach(key => {
          queryClient.invalidateQueries({ queryKey: [key] });
        })
      ])
    }
  )
}
