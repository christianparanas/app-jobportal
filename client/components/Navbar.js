import styled from "styled-components";

const NavContainer = styled.nav`
  .nav_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;

    .logo_container {
      h4 {
        margin: 0;
      }
    }
  }
`;

function Navbar() {
  return (
    <NavContainer>
      <div className="nav_container">
        <div className="logo_container">
          <h4>Indeeed</h4>
        </div>
        <div className="nav_items_container"></div>
      </div>
    </NavContainer>
  );
}

export default Navbar;
