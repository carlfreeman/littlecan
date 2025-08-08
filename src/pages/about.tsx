import Image from 'next/image';

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 font-geist">Привет!</h1>
          <div className="w-64 h-64 mx-auto rounded-full overflow-hidden border-2 border-gray-400 mb-6">
            <Image
              src="/photos/artist.webp"
              alt="Photographer"
              width={256}
              height={256}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Social Links Section */}
          <div className="flex justify-center gap-6 mt-8">
            <a 
              href="https://t.me/markly39" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path 
                  fill="currentColor" 
                  d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.26.26-.534.26l.213-3.05 5.56-5.022c.22-.196-.048-.3-.338-.108l-6.87 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.57-4.46c.53-.196 1.002.13.832.942z"
                />
              </svg>
              <span>Telegram</span>
            </a>
            
            <a 
              href="https://instagram.com/mark_litvak_muz" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path 
                  fill="currentColor" 
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                />
              </svg>
              <span>Instagram</span>
            </a>
            
            <a 
              href="mailto:carlfreeman@gmail.com"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path 
                  fill="currentColor" 
                  d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                />
              </svg>
              <span>Email</span>
            </a>
          </div>
        </div>

        <div className="prose prose-invert text-justify max-w-none space-y-4">
          <p>
            Я Марк Литвак. Снимаю город, друзей и вещи, мимо которых обычно проходят: трещины в асфальте, смятые билеты, тени на стенах. 
            То, что кажется невзрачным, часто хранит больше историй, чем парадные фасады. Это поиск необычного в обычном, поэзии в повседневности.
            Когда я иду по городу с камерой, ищу не просто интересные объекты - моменты, которые раскрывают что-то более глубокое о человеческом состоянии.
          </p>
          <p>
            Вся история - не про идеальную композицию, а про то, как обыденное становится значимым, если дать ему время.
            Это архив уходящих мгновений, гаммы чувств и образов, в котором каждый находит что-то свое. Потому и постобработка минимальная, оставляет несовершенства памяти.
          </p>
          <p>
            Верю, что фотография - это не окончательная фиксация момента, а способ сохранить, пересоздать его, чтобы пережить заново.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 font-geist">Объекты</h3>
              <ul className="space-y-2">
                <li>Интересные люди на улице</li>
                <li>Динамичные сцены</li>
                <li>Формы, линии, направления в городской среде</li>
                <li>Игры света, восприятия и метафизики</li>
              </ul>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 font-geist">Стек</h3>
              <ul className="space-y-2">
                <li>Canon EOS 1100D</li>
                <li>18-55mm f/3.5-5.6</li>
                <li>ML, PS</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}