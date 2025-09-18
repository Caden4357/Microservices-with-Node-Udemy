import Link from 'next/link';

const Header = ({ currentUser }) => {
    const Links = [
        !currentUser && { label: 'Sign Up', href: '/auth/signup' },
        !currentUser && { label: 'Sign In', href: '/auth/signin' },
        currentUser && { label: 'Sign Out', href: '/auth/signout' },
    ].filter(Boolean);
    return (
        <nav className="navbar navbar-light bg-light">
            <Link href="/" className='navbar-brand'>GitTix</Link>
            <div className="d-flex">
                <ul className="nav d-flex align-items-center">
                    {Links.map(({ label, href }) => (
                        <li key={href} className="nav-item">
                            <Link href={href} className="nav-link">{label}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
};

export default Header;