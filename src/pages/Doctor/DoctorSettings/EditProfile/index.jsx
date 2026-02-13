import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import Card from "../../../../components/ui/Card";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";

const DoctorSettingsEditProfile = () => {
  const initialValues = {
    fullName: "Dr. David Patel",
    phoneNumber: "+221 77 123 4567",
    specialty: "Cardiologist",
    experience: "10+ Year",
    organization: "Golden Gate Cardiology Center",
    consultationFees: "500",
    aboutMe:
      "Dr. David Patel, a dedicated cardiologist, brings a wealth of experience to Golden Gate Cardiology Center in Golden Gate, CA.",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().trim().required("Full name is required"),
    phoneNumber: Yup.string()
      .trim()
      .required("Phone number is required")
      .matches(/^[+\d\s()-]{7,20}$/i, "Enter a valid phone number"),
    specialty: Yup.string().trim().required("Specialty is required"),
    experience: Yup.string().trim().required("Experience is required"),
    organization: Yup.string().trim().required("Organization is required"),
    consultationFees: Yup.number()
      .typeError("Consultation fees must be a number")
      .min(0, "Consultation fees must be 0 or more")
      .required("Consultation fees is required"),
    aboutMe: Yup.string().trim().required("About me is required"),
  });

  return (
    <div className="w-full">
      <Card
        title="Edit Profile"
        padding="lg"
        shadow="sm"
        parentClass="rounded-2xl"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            // Hook this to your API when ready
            // For now we just keep the UI/validation behavior.
            // eslint-disable-next-line no-console
            console.log("Update doctor profile", values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
          }) => (
            <Form className="space-y-6">
              <div className="flex items-center gap-4">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Doctor"
                  className="w-16 h-16 rounded-2xl object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Profile Photo</p>
                  <div className="mt-2">
                    <Button type="button" variant="grayOutline" size="sm">
                      Change Photo
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                  label="Full Name"
                  name="fullName"
                  placeholder="Enter full name"
                  value={values.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.fullName ? errors.fullName : ""}
                />
                <Input
                  label="Phone Number"
                  name="phoneNumber"
                  placeholder="Enter phone number"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phoneNumber ? errors.phoneNumber : ""}
                />
                <Input
                  label="Specialty"
                  name="specialty"
                  placeholder="Enter specialty"
                  value={values.specialty}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.specialty ? errors.specialty : ""}
                />
                <Input
                  label="Experience"
                  name="experience"
                  placeholder="e.g. 10+ Year"
                  value={values.experience}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.experience ? errors.experience : ""}
                />
                <Input
                  label="Organization"
                  name="organization"
                  placeholder="Enter organization"
                  value={values.organization}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.organization ? errors.organization : ""}
                />
                <Input
                  label="Consultation Fees"
                  name="consultationFees"
                  placeholder="Enter fees"
                  value={values.consultationFees}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.consultationFees ? errors.consultationFees : ""
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="aboutMe"
                  className="block text-start text-sm font-medium text-gray-700 mb-1"
                >
                  About Me
                </label>
                <textarea
                  id="aboutMe"
                  name="aboutMe"
                  rows={4}
                  value={values.aboutMe}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-opacity-50 transition-all ${
                    touched.aboutMe && errors.aboutMe
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-secondary focus:ring-secondary"
                  }`}
                />
                {touched.aboutMe && errors.aboutMe ? (
                  <p className="mt-1 text-sm text-red-500">{errors.aboutMe}</p>
                ) : null}
              </div>

              <Button
                type="submit"
                variant="gradient"
                size="lg"
                fullWidth
                disabled={isSubmitting}
              >
                Update Profile
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default DoctorSettingsEditProfile;
