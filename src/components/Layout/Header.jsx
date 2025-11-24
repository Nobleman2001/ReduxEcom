import { useNavigate } from "react-router";
import Button from "../Buttons/Button";
import Container from "../Container/Container";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="bg-gray-50 py-5">
      <Container>
        <div className="flex items-center">
          <div className="w-1/3">
            <img
              onClick={() => navigate("/")}
              src="/src/assets/Books/book-logo.png"
              alt="book-logo"
              className="w-15 cursor-pointer"
            />
          </div>
          <div className="" >
            <Button />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
