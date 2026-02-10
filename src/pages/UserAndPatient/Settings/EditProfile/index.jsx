import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Upload, User, Heart, Phone } from "lucide-react";

import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import StickyHeader from "@/components/ui/StickyHeader";

const EditProfilePage = () => {
  const [profileImage, setProfileImage] = useState(
    "https://randomuser.me/api/portraits/men/32.jpg",
  );
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    dateOfBirth: Yup.string().required("Date of birth is required"),
    gender: Yup.string().required("Gender is required"),
    address: Yup.string(),
    city: Yup.string(),
    country: Yup.string(),
    bloodGroup: Yup.string(),
    weight: Yup.number().min(0, "Weight must be positive"),
    height: Yup.number().min(0, "Height must be positive"),
    emergencyContactName: Yup.string(),
    relationship: Yup.string(),
    emergencyMobileNumber: Yup.string(),
  });

  const initialValues = {
    firstName: "Daniel",
    lastName: "Martinez",
    email: "daniel.martinez@example.com",
    phoneNumber: "+123 856479683",
    dateOfBirth: "1990-05-15",
    gender: "Male",
    address: "123 Main Street",
    city: "New York",
    country: "USA",
    bloodGroup: "O+",
    weight: "75",
    height: "180",
    emergencyContactName: "Maria Martinez",
    relationship: "Sister",
    emergencyMobileNumber: "+123 856479683",
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileImage(url);
    }
  };

  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
    // Add your API call here
  };

  return (
    <div className="bg-pageBackground min-h-screen sm:p-6 lg:p-7">
      <StickyHeader linkTo="/settings" linkText="Back to settings" />
      <div className="max-w-4xl space-y-6 mt-3  p-4">
        <PageHeader
          title="Edit Profile"
          subtitle="Update your personal information"
        />

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form className="space-y-6">
              <Card padding="lg" shadow="sm">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative">
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-gray-100 shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="absolute bottom-2 right-2 bg-secondary text-white rounded-full p-2 shadow hover:bg-secondary-dark transition"
                    >
                      <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                  </div>

                  <div className="text-center sm:text-left flex-1">
                    <p className="text-sm text-text opacity-70 mb-3">
                      Upload your profile photo
                    </p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="text-secondary hover:text-secondary-dark font-medium text-sm transition"
                    >
                      Choose File
                    </button>
                    <p className="text-xs text-text opacity-50 mt-2">
                      JPG, PNG or GIF (Max 5MB)
                    </p>
                  </div>
                </div>
              </Card>

              {/* Personal Information Section */}
              <Card
                padding="md"
                shadow="sm"
                title="Personal Information"
                icon={User}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                  {/* First Name */}
                  <Input
                    label="First Name *"
                    name="firstName"
                    type="text"
                    placeholder="Enter first name"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.firstName && errors.firstName
                        ? errors.firstName
                        : ""
                    }
                  />

                  {/* Last Name */}
                  <Input
                    label="Last Name *"
                    name="lastName"
                    type="text"
                    placeholder="Enter last name"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.lastName && errors.lastName ? errors.lastName : ""
                    }
                  />

                  {/* Email Address */}
                  <Input
                    label="Email Address *"
                    name="email"
                    type="email"
                    placeholder="Enter email address"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && errors.email ? errors.email : ""}
                  />

                  {/* Phone Number */}
                  <Input
                    label="Phone Number *"
                    name="phoneNumber"
                    type="tel"
                    placeholder="Enter phone number"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.phoneNumber && errors.phoneNumber
                        ? errors.phoneNumber
                        : ""
                    }
                  />

                  {/* Date of Birth */}
                  <Input
                    label="Date of Birth *"
                    name="dateOfBirth"
                    type="date"
                    value={values.dateOfBirth}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.dateOfBirth && errors.dateOfBirth
                        ? errors.dateOfBirth
                        : ""
                    }
                  />

                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Gender *
                    </label>
                    <select
                      name="gender"
                      value={values.gender}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-text bg-bg"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {touched.gender && errors.gender && (
                      <p className="text-red-600 text-xs mt-1">
                        {errors.gender}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <Input
                    label="Address"
                    name="address"
                    type="text"
                    placeholder="Enter address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.address && errors.address ? errors.address : ""
                    }
                  />

                  {/* City */}
                  <Input
                    label="City"
                    name="city"
                    type="text"
                    placeholder="Enter city"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.city && errors.city ? errors.city : ""}
                  />

                  {/* Country */}
                  <Input
                    label="Country"
                    name="country"
                    type="text"
                    placeholder="Enter country"
                    value={values.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.country && errors.country ? errors.country : ""
                    }
                  />
                </div>
              </Card>

              {/* Health Information Section */}
              <Card
                padding="md"
                shadow="sm"
                title="Health Information"
                icon={Heart}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                  {/* Blood Group */}
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Blood Group
                    </label>
                    <select
                      name="bloodGroup"
                      value={values.bloodGroup}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-text bg-bg"
                    >
                      <option value="">Select Blood Group</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>

                  {/* Weight */}
                  <Input
                    label="Weight (KG)"
                    name="weight"
                    type="number"
                    placeholder="Enter weight"
                    value={values.weight}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.weight && errors.weight ? errors.weight : ""}
                  />

                  {/* Height */}
                  <Input
                    label="Height (CM)"
                    name="height"
                    type="number"
                    placeholder="Enter height"
                    value={values.height}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.height && errors.height ? errors.height : ""}
                  />
                </div>
              </Card>
              <Card
                padding="md"
                shadow="sm"
                title="Emergency Contact"
                icon={Phone}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                  {/* Contact Name */}
                  <Input
                    label="Contact Name"
                    name="emergencyContactName"
                    type="text"
                    placeholder="Enter contact name"
                    value={values.emergencyContactName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.emergencyContactName &&
                      errors.emergencyContactName
                        ? errors.emergencyContactName
                        : ""
                    }
                  />

                  {/* Relationship */}
                  <Input
                    label="Relationship"
                    name="relationship"
                    type="text"
                    placeholder="Enter relationship"
                    value={values.relationship}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.relationship && errors.relationship
                        ? errors.relationship
                        : ""
                    }
                  />

                  {/* Mobile Number */}
                  <Input
                    label="Mobile Number"
                    name="emergencyMobileNumber"
                    type="tel"
                    placeholder="Enter mobile number"
                    value={values.emergencyMobileNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.emergencyMobileNumber &&
                      errors.emergencyMobileNumber
                        ? errors.emergencyMobileNumber
                        : ""
                    }
                  />
                </div>
              </Card>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 max-w-4xl">
                <Button
                  type="button"
                  variant="grayOutline"
                  onClick={() => navigate(-1)}
                  className=" sm:flex-none "
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="secondary"
                  className="flex-1 sm:flex-none sm:ml-auto "
                >
                  Save Changes
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditProfilePage;
