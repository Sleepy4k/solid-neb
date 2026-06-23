import { useNavigate } from "@solidjs/router";
import { createEffect } from "solid-js";

export default function UploadRedirect() {
  const navigate = useNavigate();
  createEffect(() => navigate("/services/seb", { replace: true }));
  return null;
}
