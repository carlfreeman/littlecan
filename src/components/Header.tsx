import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  const navItems = [
    { name: 'Main', path: '/' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Series', path: '/series' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center space-x-2">
            <Image 
              src="/logo.svg" 
              alt="Photographer Logo" 
              width={40} 
              height={40} 
              className="h-10 w-10"
            />
            <span className="text-xl font-semibold">PHOTOGRAPHY</span>
          </div>
        </Link>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navItems.map(item => (
              <li key={item.name}>
                <Link 
                  href={item.path} 
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;