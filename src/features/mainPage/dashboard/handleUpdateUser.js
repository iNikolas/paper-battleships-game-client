import { BACKEND } from "../../../common/constants";

const handleUpdateUser = async (body, token) => {
  const response = await fetch(`${BACKEND}/users/${body.data.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  return response
};

export default handleUpdateUser;
