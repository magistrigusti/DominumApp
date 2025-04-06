// страница /user
import { UserContainer } from "@/layout/UserPage/UserContainer";

export default function UserRoute() {
  return (
    <div className="app">
      <div className="page fullscreen container">
        <UserContainer />
      </div>
    </div>
  );
}
