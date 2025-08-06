import Image from 'next/image';

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 font-geist">About Me</h1>
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gray-700 mb-6">
            <Image
              src="/photos/artist.webp"
              alt="Photographer"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Visual storyteller capturing authentic moments through an artistic lens
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <h2>My Journey</h2>
          <p>
            My photographic journey began over a decade ago when I first picked up a film camera. 
            What started as a hobby quickly evolved into a passion for visual storytelling. 
            I transitioned to digital photography in 2015 but maintain a film-inspired approach 
            to composition and patience in my work.
          </p>
          
          <h2>Philosophy</h2>
          <p>
            I believe photography is the art of observation. It's about finding something interesting 
            in an ordinary place. My approach focuses on:
          </p>
          <ul>
            <li>Capturing authentic moments and emotions</li>
            <li>Exploring the relationship between light and shadow</li>
            <li>Finding beauty in urban decay and natural imperfections</li>
            <li>Creating visual narratives that invite interpretation</li>
          </ul>
          
          <h2>Technical Approach</h2>
          <p>
            While I embrace digital technology for its capabilities, I maintain a minimalist approach:
          </p>
          <ul>
            <li>Natural light whenever possible</li>
            <li>Minimal post-processing to preserve authenticity</li>
            <li>Prime lenses to encourage compositional discipline</li>
            <li>Film simulation presets for consistent tonal qualities</li>
          </ul>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 font-geist">Exhibitions</h3>
              <ul className="space-y-2">
                <li>Urban Perspectives - Gallery Moderna (2023)</li>
                <li>Nature Unveiled - Central Art Space (2022)</li>
                <li>Street Stories - Downtown Gallery (2021)</li>
              </ul>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 font-geist">Equipment</h3>
              <ul className="space-y-2">
                <li>Canon EOS R5</li>
                <li>Fujifilm X-T4</li>
                <li>35mm f/1.4, 50mm f/1.2, 85mm f/1.8</li>
                <li>Various film cameras for personal projects</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}