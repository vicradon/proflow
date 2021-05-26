import GeneralTemplate from "../templates/GeneralTemplate/GeneralTemplate";

function NotFound() {
  return (
    <GeneralTemplate>
      <div
        style={{ height: "65vh" }}
        className="d-flex justify-content-center align-items-center font-size-2rem"
      >
        <span className="px-2">404</span>
        <span className="text-muted ">| Not Found</span>
      </div>
    </GeneralTemplate>
  );
}

export default NotFound;
