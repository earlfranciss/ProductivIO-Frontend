import React from "react";
import MainLayout from "../components/MainLayout";

export default function Dashboard() {
  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p>Welcome to the main app page with sidebar!</p>
        <p>Add your components here to test the layout.</p>
      </div>
    </MainLayout>
  );
}
