import { useState } from "react";
import { Button } from "react-bootstrap";
import GeneralTemplate from "../../../templates/GeneralTemplate/GeneralTemplate";
import Images from "../../../../components/Images";

function AvatarUpload() {
  const [uploadDisabled, setUploadDisabled] = useState(true);
  return (
    <GeneralTemplate noAuth>
      <div className={"d-flex flex-column align-items-center"}>
        <h3 className="text-center">Upload your passport</h3>

        <img className="my-3" src={Images.DefaultAvatar} alt="person" />
        <Button className="w-50" disabled={uploadDisabled}>
          Upload
        </Button>
      </div>
    </GeneralTemplate>
  );
}

export default AvatarUpload;
