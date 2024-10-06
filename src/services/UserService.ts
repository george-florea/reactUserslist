import { useDispatch, useSelector } from "react-redux";
import { IUser } from "../pages/Users/interfaces/IUser";
import ApiPaths from "../statics/ApiPaths";
import { userActions } from "../store/reducers/user";
import ApiUtils from "../utils/ApiUtils";
import { RootState } from "../store";
interface IApiResponse {
  users: IUser[];
  total: number;
  skip: number;
  limit: number;
}
const useUserService = () => {
  const { get } = ApiUtils();
  const dispatcher = useDispatch();
  const { skip, limit } = useSelector((s: RootState) => s.user);

  const getAllUsers = async () => {
    let data: IApiResponse = await get(ApiPaths.ALLUSERS(limit, skip));
    dispatcher(userActions.setUser(data));
  };

  const getFilteredUsers = async (query: string) => {
    let data = await get(ApiPaths.FILTERUSERS(query));
    dispatcher(userActions.setUser(data));
  };

  return {
    getAllUsers,
    getFilteredUsers,
  };
};

export default useUserService;
