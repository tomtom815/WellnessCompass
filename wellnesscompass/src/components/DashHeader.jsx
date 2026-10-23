import {Link} from 'react-router-dom';


const DashHeader = () => {
  const content = (
    <header className="dash-header">
        <div class="dash-header__container">
            <Link to="/*filllater*/">
                <h1 className="dash-header__title">Wellness Compass Dashboard</h1>
            </Link>
            <nav className="dash-header__nav">
                {/* add nav later*/}
            </nav>
        </div>
    </header>
  )
  return content;
}

export default DashHeader