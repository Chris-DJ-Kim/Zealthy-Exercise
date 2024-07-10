import React from "react";
import Header from "../Header/Header";

const AdminPage = () => {
  return (
    <div>
      <Header isAdmin={true} />I am the admin page
    </div>
  );
};

export default AdminPage;
