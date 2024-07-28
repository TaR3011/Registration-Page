import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import Dialog from "./Dialog.jsx";
import Label from "./Label.jsx";

const initData = {
  fullName: "",
  phoneNumber: "",
  universityEmail: "",
  universityID: "",
  academicProgramme: "",
  academicYear: "",
  branch: "",
  share: "", // New field for sharing something
  acknowledge: false,
};

function CustomForm() {
  const [formData, setFormData] = useState(initData);
  const [showDialog, setShowDialog] = useState(false);
  const [error, setError] = useState("");


  const handelSendEmail = () => {
    emailjs
      .send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        { user_name: formData.fullName, user_email: formData.universityEmail },
        { publicKey: import.meta.env.VITE_PUBLIC_KEY }
      )
      .then(
        () => {
          console.log("success!");
        },
        (e) => {
          console.log(e.text);
        }
      );
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.acknowledge) {
      alert("Please acknowledge that all the information is correct.");
      return;
    }
    const emailDomain = "@aou.edu.sa";
    if (!formData.universityEmail.endsWith(emailDomain)) {
      setError(`email must end with ${emailDomain}`);
      return;
    } else {
      setError(""); // Clear any previous error messages
      handelSendEmail();
      setFormData(initData);
      setShowDialog(true);
      console.log(formData);

      // console.log("Form submitted:", formData);
    }
  };

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  return (
    <div>
      <h1>Student Information Form</h1>
      <form onSubmit={handleSubmit}>
        {/* Full Name */}
        <div>
          <Label ar=": الاسم الكامل" en="Full Name :" />

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone Number */}
        <div>
          <Label ar=": رقم الجوال" en="Phone Number :" />
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        {/* University Email */}
        <div>
          <Label ar=": البريد الجامعي" en="University Email :" />
          <input
            className={error ? "error" : ""}
            type="email"
            name="universityEmail"
            value={formData.universityEmail}
            onChange={handleChange}
            required
          />
          {error ? <p className="p__error">{error}</p> : ""}
        </div>

        {/* University ID */}
        <div>
          <Label ar=": الرقم الجامعي" en="University ID :" />

          <input
            type="number"
            name="universityID"
            value={formData.universityID}
            onChange={handleChange}
            required
          />
        </div>

        {/* Academic Programme */}
        <div>
          <Label ar=": التخصص الدراسي" en="Academic Programme :" />

          <select
            name="academicProgramme"
            value={formData.academicProgramme}
            onChange={handleChange}
            required
          >
            <option value="">Select a programme</option>
            <option value="Information Technology and Computing">
              Information Technology and Computing
            </option>
            <option value="Computer Science">Computer Science</option>
            <option value="Computing with Business">
              Computing with Business
            </option>
            <option value="Network and Security ">Network and Security</option>
            <option value="Web Development">Web Development</option>
          </select>
        </div>

        {/* Academic Year */}
        <div>
          <Label ar=": السنة الدراسية" en="Academic Year :" />

          <select
            name="academicYear"
            value={formData.academicYear}
            onChange={handleChange}
            required
          >
            <option value="">Select your year</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>
        </div>

        {/* Branch */}
        <div>
          <Label ar=": الفرع" en="Branch :" />

          <select
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            required
          >
            <option value="">Select a branch</option>
            <option value="Main Campus">Riyadh branch</option>
            <option value="City Campus">Other brancg</option>
          </select>
        </div>

        {/* Optional Share Text Field */}
        <div>
          <Label
            ar=": هل هناك ماتريد مشاركته"
            en="Do you have something to share?"
          />

          <textarea
            name="share"
            value={formData.share}
            onChange={handleChange}
            placeholder="Enter your answer"
          />
        </div>

        {/* Acknowledgement Checkbox */}
        <div>
          <Label
            ar="اتعهد بصحه المعلومات"
            en="I acknowledge that all information are
            correct"
          >
            <input
              type="checkbox"
              name="acknowledge"
              checked={formData.acknowledge}
              onChange={handleChange}
              required
            />
          </Label>
        </div>

        {/* Submit Button */}
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
      <Dialog isOpen={showDialog} onClose={handleDialogClose} />
    </div>
  );
}

export default CustomForm;
