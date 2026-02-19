import React, { useState } from "react";
import { useAuth, useUserRole } from "../../hooks/useAuth";
import {
  useGetUserProfileQuery,
  useGetDoctorDashboardQuery,
  useGetClinicDashboardQuery,
  useUpdateUserProfileMutation,
} from "../../services";

// Example Login Component
export const LoginExample = () => {
  const { login, loading, error, isLoggingIn } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(credentials);

    if (result.success) {
      console.log("Login successful:", result.data);
      // Redirect or handle success
    } else {
      console.error("Login failed:", result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
          placeholder="Email"
          required
        />
      </div>
      <div>
        <input
          type="password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          placeholder="Password"
          required
        />
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button type="submit" disabled={isLoggingIn}>
        {isLoggingIn ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

// Example Dashboard Component with role-based content
export const DashboardExample = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { isDoctor, isPatient, isClinicAdmin, role } = useUserRole();

  // Conditionally fetch data based on user role
  const { data: userProfile, isLoading: profileLoading } =
    useGetUserProfileQuery(user?.id, {
      skip: !isPatient || !user?.id,
    });

  const { data: doctorDashboard, isLoading: doctorLoading } =
    useGetDoctorDashboardQuery(user?.id, {
      skip: !isDoctor || !user?.id,
    });

  const { data: clinicDashboard, isLoading: clinicLoading } =
    useGetClinicDashboardQuery(user?.clinicId, {
      skip: !isClinicAdmin || !user?.clinicId,
    });

  if (!isAuthenticated) {
    return <LoginExample />;
  }

  return (
    <div>
      <h1>Welcome, {user?.name || user?.firstName}!</h1>
      <p>Role: {role}</p>

      <button onClick={logout}>Logout</button>

      {/* Role-based content */}
      {isPatient && (
        <div>
          <h2>Patient Dashboard</h2>
          {profileLoading ? (
            <p>Loading profile...</p>
          ) : (
            <div>
              <p>Email: {userProfile?.email}</p>
              <p>Phone: {userProfile?.phone}</p>
              {/* Add more patient-specific content */}
            </div>
          )}
        </div>
      )}

      {isDoctor && (
        <div>
          <h2>Doctor Dashboard</h2>
          {doctorLoading ? (
            <p>Loading dashboard...</p>
          ) : (
            <div>
              <p>Today's Appointments: {doctorDashboard?.todayAppointments}</p>
              <p>Total Patients: {doctorDashboard?.totalPatients}</p>
              {/* Add more doctor-specific content */}
            </div>
          )}
        </div>
      )}

      {isClinicAdmin && (
        <div>
          <h2>Clinic Dashboard</h2>
          {clinicLoading ? (
            <p>Loading dashboard...</p>
          ) : (
            <div>
              <p>Total Staff: {clinicDashboard?.totalStaff}</p>
              <p>Appointments Today: {clinicDashboard?.appointmentsToday}</p>
              {/* Add more clinic-specific content */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Example component showing how to use mutations
export const UserProfileExample = () => {
  const { user, isAuthenticated } = useAuth();
  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({
        userId: user.id,
        userData: formData,
      }).unwrap();
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile");
    }
  };

  if (!isAuthenticated) {
    return <div>Please log in to view your profile</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Profile</h2>
      <div>
        <input
          type="text"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
          placeholder="First Name"
        />
      </div>
      <div>
        <input
          type="text"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
          placeholder="Last Name"
        />
      </div>
      <div>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="Phone"
        />
      </div>
      <button type="submit" disabled={isUpdating}>
        {isUpdating ? "Updating..." : "Update Profile"}
      </button>
    </form>
  );
};
