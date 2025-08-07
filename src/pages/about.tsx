import Image from 'next/image';

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 font-geist">Привет!</h1>
          <div className="w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-gray-700 mb-6">
            <Image
              src="/photos/artist.webp"
              alt="Photographer"
              width={256}
              height={256}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="prose prose-invert text-justify max-w-none space-y-4">
          <p>
            Я Марк Литвак. Снимаю город, друзей и вещи, мимо которых обычно проходят: трещины в асфальте, смятые билеты, тени на стенах. 
            То, что кажется невзрачным, часто хранит больше историй, чем парадные фасады. Это поиск необычного в обычном, поэзии в повседневности.
            Когда я иду по городу с камерой, я ищу не просто интересные объекты - я ищу моменты, которые раскрывают что-то более глубокое о человеческом состоянии.
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