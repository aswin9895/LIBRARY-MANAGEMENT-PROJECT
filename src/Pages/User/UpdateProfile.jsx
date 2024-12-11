import React, { useEffect, useState } from "react";
import uselogo from "../../assets/userlogo.png";
import Header from "../../Components/Header";
import { Form } from "react-bootstrap";
import Footer from "../../Components/Footer";
import SERVER_URL from "../../Services/SERVER_URL";
import { updateprofileAPI } from "../../Services/allAPI";

const UpdateProfile = () => {
  const [preview, setPreview] = useState("");
  const [existingProfileImage, setExistingProfileImage] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: "", email: "", phn: "", branch: "", admnum: "", admyear: "", profilePic: null,
  });

  const [id, setId] = useState("");

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("users"));
    if (user) {
      setUserDetails({
        ...userDetails, name: user.name, email: user.email, phn: user.phn, branch: user.branch, admnum: user.admnum, admyear: user.admyear,
      });
      setId(user._id);
      setExistingProfileImage(user.profilePic);
    }
  }, []);

  // Update the preview when a new image is selected
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg")) {
      setUserDetails((prevDetails) => ({
        ...prevDetails, profilePic: file,
      }));
      setPreview(URL.createObjectURL(file));
    } else {
      alert("Only JPG, JPEG, and PNG files are allowed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phn, branch, admnum, admyear, profilePic } = userDetails;

    if (name && email && phn && branch && admnum && admyear) {
      const reqBody = new FormData();
      reqBody.append("name", name);
      reqBody.append("email", email);
      reqBody.append("phn", phn);
      reqBody.append("branch", branch);
      reqBody.append("admnum", admnum);
      reqBody.append("admyear", admyear);

      if (profilePic) {
        reqBody.append("profilePic", profilePic);
      } else {
        reqBody.append("profilePic", existingProfileImage);
      }

      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          Authorization: `Bearer ${token}`,
        };
        const result = await updateprofileAPI(id, reqBody, reqHeader);
        if (result.status === 200) {
          alert("User Profile updated Successfully!!!");
          sessionStorage.setItem("users", JSON.stringify(result.data));
        } else {
          console.log(result);
        }
      } else {
        alert("Token Missing. Please Login.");
      }
    } else {
      alert("Please fill the form completely.");
    }
  };

  const handleCancel = () => {
    const user = JSON.parse(sessionStorage.getItem("users"));
    if (user) {
      setUserDetails({
        ...userDetails,
        name: user.name,
        email: user.email,
        phn: user.phn,
        branch: user.branch,
        admnum: user.admnum,
        admyear: user.admyear,
        profilePic: null,
      });
      setPreview("");
      setExistingProfileImage(user.profilePic);
    }
  };

  return (
    <div>
      <Header />
      <div
        style={{
          paddingTop: "170px",
          paddingBottom: "100px",
          backgroundColor: "black",
          minHeight: "100vh",
        }}
        className="d-flex justify-content-center align-items-center"
      >
        <div className="w-sm-75 border rounded p-5 text-center">
          <h1 className="text-light fw-bolder text-center">UPDATE PROFILE</h1>
          <hr className="text-light fw-bolder" />
          <div className="d-flex justify-content-center align-items-center flex-wrap">
            <div className="me-5">
              <label>
                <input
                  onChange={handleFileChange}
                  type="file"
                  className="d-none"
                />
                <img
                  style={{
                    borderWidth: "5px",
                    borderRadius: "50%",
                    border: "solid",
                    borderColor: "white",
                  }}
                  width={"200px"}
                  height={"200px"}
                  src={
                    preview
                      ? preview
                      : existingProfileImage
                        ? `${SERVER_URL}/uploads/${existingProfileImage}`
                        : uselogo
                  }
                  alt="Profile Preview"
                />
              </label>
            </div>
            <Form>
              <Form.Group className="mb-3 mt-3" controlId="Name">
                <Form.Control
                  value={userDetails.name}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, name: e.target.value })
                  }
                  style={{
                    color: "black",
                    padding: "15px",
                    borderRadius: "10px",
                  }}
                  className="fw-bold bg-light"
                  type="text"
                  placeholder="Name"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="EmailId">
                <Form.Control
                  value={userDetails.email}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, email: e.target.value })
                  }
                  style={{
                    color: "black",
                    padding: "15px",
                    borderRadius: "10px",
                  }}
                  className="fw-bold bg-light"
                  type="email"
                  placeholder="Email-Id"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="PhoneNumber">
                <Form.Control
                  value={userDetails.phn}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, phn: e.target.value })
                  }
                  style={{
                    color: "black",
                    padding: "15px",
                    borderRadius: "10px",
                  }}
                  className="fw-bold bg-light"
                  type="text"
                  placeholder="Phone Number"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="Branch">
                <Form.Control
                  value={userDetails.branch}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, branch: e.target.value })
                  }
                  style={{
                    color: "black",
                    padding: "15px",
                    borderRadius: "10px",
                  }}
                  className="fw-bold bg-light"
                  type="text"
                  placeholder="Branch"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="AdmissionNumber">
                <Form.Control
                  value={userDetails.admnum}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, admnum: e.target.value })
                  }
                  style={{
                    color: "black",
                    padding: "15px",
                    borderRadius: "10px",
                  }}
                  className="fw-bold bg-light"
                  type="text"
                  placeholder="Admission-Number"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="AdmissionYear">
                <Form.Control
                  value={userDetails.admyear}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, admyear: e.target.value })
                  }
                  style={{
                    color: "black",
                    padding: "15px",
                    borderRadius: "10px",
                  }}
                  className="fw-bold bg-light"
                  type="text"
                  placeholder="Admission-Year"
                />
              </Form.Group>
            </Form>
          </div>
          <button
            onClick={handleCancel}
            style={{ backgroundColor: "red" }}
            className="fw-bolder text-light px-3 rounded py-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            style={{ backgroundColor: "lightseagreen" }}
            className="fw-bolder text-light px-3 rounded py-2"
          >
            Submit
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateProfile;
