import { useParams } from "react-router";
import "./styles.css";
function Welcome() {
  let { id } = useParams();
  return (
    <div className="welcome">
      <h3 className="title">Bem-vindo, {id} </h3>
    </div>
  );
}
export default Welcome;
