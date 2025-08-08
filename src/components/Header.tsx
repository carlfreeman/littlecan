import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  const navItems = [
    { name: '/Главная', path: '/' },
    { name: '/Фотосклад', path: '/gallery' },
    // { name: '/Сезоны', path: '/series' },
    { name: '/Автор', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/5 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center space-x-2 z-100">
            <Image 
              src="/logo.svg" 
              alt="Photographer Logo" 
              width={40} 
              height={40} 
              className="h-10 w-10 bg-white border rounded-full"
            />
          </div>
        </Link>
        
        <nav className="block">
          <ul className="flex space-x-8">
            {navItems.map(item => (
              <li key={item.name}>
                <Link 
                  href={item.path} 
                  className="text-gray-200 hover:text-white transition-colors duration-200"
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