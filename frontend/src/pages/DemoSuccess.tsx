import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SuccessPage } from "@components/SuccessPage";

export function DemoSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const sessionId = params.get("session_id");

  useEffect(() => {
    if (!sessionId) {
      navigate("/", { replace: true }); 
    }
  }, [sessionId, navigate]);

  if (!sessionId) return null;

  return <SuccessPage />;
}
