import api from "../../../api/api";

const deletePosition = async (id: number) => {
  const response = await api.delete(`/positions/${id}/`);
  return response.data;
};

export default deletePosition;
