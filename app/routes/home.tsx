import type { Route } from "./+types/home";
import { Navigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "React Camera Pro Explorer" },
    { name: "description", content: "Explore react-camera-pro functionality" },
  ];
}

export default function Home() {
  // Redirect to camera page as the main entry point
  return <Navigate to="/camera" replace />;
}
