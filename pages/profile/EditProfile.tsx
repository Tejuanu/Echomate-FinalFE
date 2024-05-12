import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "src/redux/hooks";

export default function EditProfile() {
  const navigate = useNavigate();
  const params = useParams();
  const { user } = useAppSelector((state) => state.auth);

  React.useEffect(() => {
    if (params.id && user) {
      if (params.id !== user.uid) {
        navigate("/profile");
      }
    }
  }, [params.id, user, navigate]);
  
  return <div>EditProfile</div>;
}
