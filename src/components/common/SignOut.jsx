import React from "react";
import Swal from "sweetalert2";

export function SignOut() {
  function logout() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0EBE7F",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("persist:root");
        window.location.href = "/";
      }
    });
  }

  return (
    <div onClick={logout} style={{ cursor: "pointer", color: "red" }}>
      Log out
    </div>
  );
}
