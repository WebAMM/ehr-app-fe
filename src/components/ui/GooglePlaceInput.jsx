import { Autocomplete } from "@react-google-maps/api";
import { useRef } from "react";
export default function GooglePlaceInput({
  name,
  label,
  type = "city",
  placeholder = "Search location",
  formik,
  onPlaceSelect,
}) {
  const autoRef = useRef(null);

  const handlePlaceChanged = () => {
    const place = autoRef.current?.getPlace?.();
    if (!place?.geometry?.location) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    const getComponent = (type) =>
      place.address_components?.find((c) => c.types.includes(type))?.long_name;

    let formattedData = {};

    switch (type) {
      case "city":
        formattedData = {
          name:
            getComponent("locality") || place.formatted_address || place.name,
          location: {
            type: "Point",
            coordinates: [lng, lat],
          },
        };
        break;

      case "country":
        formattedData = {
          name: getComponent("country"),
          location: {
            type: "Point",
            coordinates: [lng, lat],
          },
        };
        break;

      case "establishment":
        formattedData = {
          name: place.name,
          address: place.name,
          location: {
            type: "Point",
            coordinates: [lng, lat],
          },
        };
        break;

      case "address":
      default:
        formattedData = {
          address: place.name ? place.name : "",

          location: {
            type: "Point",
            coordinates: [lng, lat],
          },
        };
    }

    formik.setFieldValue(name, formattedData);
    if (onPlaceSelect) onPlaceSelect(formattedData);
  };

  return (
    <div>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <Autocomplete
        onLoad={(ac) => (autoRef.current = ac)}
        onPlaceChanged={handlePlaceChanged}
        options={{
          types:
            type === "country"
              ? ["(regions)"]
              : type === "establishment"
                ? ["establishment"]
                : type === "city"
                  ? ["(cities)"]
                  : ["address"],
        }}
      >
        <input
          name={name}
          placeholder={placeholder}
          className="w-full p-3 text-gray-700 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={
            typeof formik.values[name] === "object"
              ? formik.values[name]?.name || formik.values[name]?.address || ""
              : formik.values[name] || ""
          }
          onChange={(e) => formik.setFieldValue(name, e.target.value)}
          onBlur={formik.handleBlur}
        />
      </Autocomplete>

      {formik.touched[name] && formik.errors[name] && (
        <p className="mt-1 text-sm text-red-500">{formik.errors[name]}</p>
      )}
    </div>
  );
}
