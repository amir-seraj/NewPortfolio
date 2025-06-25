const allprojects = [

  {
    slug: "perfect-posture-case-study",
    title: "Perfect Posture Case Study",
    tags: ["AI", "Machine Learning", "Technology"],
    description:
      "Enhancing Gamers' Health Through Ergonomic Intervention.",
    body: `
<div class="mb-8 p-6 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg">
  <h2 class="text-2xl font-bold mb-2">🎮 Perfect Posture Case Study</h2>
  <p class="text-lg opacity-90 mb-4">Enhancing Gamers' Health Through Ergonomic Intervention</p>
  <div class="flex flex-wrap gap-2">
    <span class="px-3 py-1   rounded-full text-sm">User Research</span>
    <span class="px-3 py-1   rounded-full text-sm">Prototype Testing</span>
    <span class="px-3 py-1   rounded-full text-sm">Computer Vision</span>
    <span class="px-3 py-1   rounded-full text-sm">Ergonomics</span>
  </div>
</div>

<p class="text-gray-700 dark:text-gray-300 mb-2"><strong>Authors:</strong> AmirArsalan Serajoddin, Ali Rahneshin</p>

<h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Introduction</h2>

<div class="bg-blue-50 dark:bg-blue-900/20  -l-4  -blue-500 p-6 rounded-r-lg mb-6">
  <p class="text-gray-700 dark:text-gray-300 mb-4">
    <strong>Background:</strong> Prolonged gaming sessions can lead to various health issues, including musculoskeletal disorders (MSDs) and metabolic syndrome. Recognizing this, the "Perfect Posture" project was initiated to develop a solution aimed at mitigating these health risks by promoting better posture among gamers.
  </p>
  <p class="text-gray-700 dark:text-gray-300">
    <strong>Project Overview:</strong> The project spans multiple iterative phases, each refining the system's capabilities through user feedback and technological enhancements. This case study outlines the development process from initial concept to final prototype testing and presentation.
  </p>
</div>

<h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Iterative Development Process</h2>

<div class="space-y-8">
  <div class="  dark:bg-gray-800 p-6 rounded-lg shadow-md   dark: -gray-700">
    <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Iteration 1: Problem Identification and Initial Concept</h3>
    <div class="mb-4">
      <img src="/images/PerfectPosture/1-1.png" alt="Problem identification" class="w-full max-w-md mx-auto rounded-lg shadow-sm"/>
    </div>
    <ul class="space-y-2 text-gray-700 dark:text-gray-300">
      <li><strong>Objective:</strong> Identify key health issues associated with gaming and conceptualize a potential solution.</li>
      <li><strong>Activities:</strong> Reviewed literature to understand the scope of health issues among gamers.</li>
      <li><strong>Outcome:</strong> Defined the project's primary goal—to reduce musculoskeletal problems and metabolic risks through better posture. Established the initial concept for a posture monitoring system using digital tools and ergonomic methodologies.</li>
    </ul>
    <div class="grid md:grid-cols-2 gap-4 mt-4">
      <img src="/images/PerfectPosture/1-2.png" alt="Research findings" class="w-full rounded-lg shadow-sm"/>
      <img src="/images/PerfectPosture/1-3.png" alt="Initial concept" class="w-full rounded-lg shadow-sm"/>
    </div>
  </div>

  <div class="  dark:bg-gray-800 p-6 rounded-lg shadow-md  dark: -gray-700">
    <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Iteration 2: Persona and Scenario Development</h3>
    <ul class="space-y-3 text-gray-700 dark:text-gray-300 mb-4">
      <li><strong>Objective:</strong> Develop personas representing the target user base and create scenarios to guide system design.</li>
      <li>
        <strong>Personas Created:</strong>
        <div class="mt-2 ml-4">
          <p>• <strong>Alex:</strong> A 20-year-old newbie gamer with limited awareness of posture implications.</p>
          <p>• <strong>Jordan:</strong> A 29-year-old professional gamer experiencing neck pain and other posture-related issues.</p>
        </div>
      </li>
      <li><strong>Scenarios:</strong> Focused on gaming environments where posture correction is most needed, guiding the design towards real-world application.</li>
    </ul>
    <div class="grid md:grid-cols-2 gap-4">
      <img src="/images/PerfectPosture/2-1.png" alt="Alex persona" class="w-full rounded-lg shadow-sm"/>
      <img src="/images/PerfectPosture/2-3.png" alt="Jordan persona" class="w-full rounded-lg shadow-sm"/>
      <img src="/images/PerfectPosture/2-2.png" alt="Scenario 1" class="w-full rounded-lg shadow-sm"/>
      <img src="/images/PerfectPosture/2-4.png" alt="Scenario 2" class="w-full rounded-lg shadow-sm"/>
    </div>
  </div>

  <div class="  dark:bg-gray-800 p-6 rounded-lg shadow-md  dark: -gray-700">
    <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Iteration 3: Feature Design and Prototype Development</h3>
    <ul class="space-y-3 text-gray-700 dark:text-gray-300 mb-4">
      <li><strong>Objective:</strong> Design the features of the "Perfect Posture" system and develop an initial prototype.</li>
      <li><strong>Key Features:</strong> Computer vision for posture tracking, real-time feedback through visual and auditory cues, community engagement features to encourage user participation and adherence.</li>
      <li><strong>Prototype Development:</strong> Built a webcam-based prototype capable of monitoring and analyzing user posture in real-time.</li>
    </ul>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <img src="/images/PerfectPosture/3-1.png" alt="Feature design" class="w-full rounded-lg shadow-sm"/>
      <img src="/images/PerfectPosture/3-2.png" alt="Prototype 1" class="w-full rounded-lg shadow-sm"/>
      <img src="/images/PerfectPosture/3-3.png" alt="Prototype 2" class="w-full rounded-lg shadow-sm"/>
      <img src="/images/PerfectPosture/3-4.png" alt="System architecture" class="w-full rounded-lg shadow-sm"/>
      <img src="/images/PerfectPosture/3-5.png" alt="Implementation" class="w-full rounded-lg shadow-sm"/>
    </div>
  </div>

  <div class="  dark:bg-gray-800 p-6 rounded-lg shadow-md  dark: -gray-700">
    <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Iteration 4: Prototype Usability Testing</h3>
    <ul class="space-y-3 text-gray-700 dark:text-gray-300 mb-4">
      <li><strong>Objective:</strong> Conduct usability testing with real users to gather data on effectiveness and user experience.</li>
      <li><strong>Methodology:</strong> Utilized both qualitative feedback and quantitative measures (e.g., System Usability Scale or SUS) during gaming sessions.</li>
      <li><strong>Results:</strong> The prototype achieved an SUS score of 73.33, indicating good usability but also highlighting areas for improvement, especially in non-intrusive feedback mechanisms.</li>
    </ul>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <img src="/images/PerfectPosture/4-1.jpeg" alt="Testing session 1" class="w-full rounded-lg shadow-sm"/>
      <img src="/images/PerfectPosture/4-2.jpeg" alt="Testing session 2" class="w-full rounded-lg shadow-sm"/>
      <img src="/images/PerfectPosture/4-3.jpeg" alt="Testing session 3" class="w-full rounded-lg shadow-sm"/>
      <img src="/images/PerfectPosture/4-4.jpeg" alt="User feedback" class="w-full rounded-lg shadow-sm"/>
      <img src="/images/PerfectPosture/4-5.jpeg" alt="SUS results" class="w-full rounded-lg shadow-sm"/>
      <img src="/images/PerfectPosture/4-6.jpeg" alt="Analysis" class="w-full rounded-lg shadow-sm"/>
    </div>
    <div class="bg-green-50 dark:bg-green-900/20  -l-4  -green-500 p-4 mt-4">
      <h4 class="font-semibold text-green-800 dark:text-green-200 mb-2">Key Finding</h4>
      <p class="text-green-700 dark:text-green-300 text-sm">SUS Score: <strong>73.33</strong> - Indicates good usability with room for improvement in feedback mechanisms</p>
    </div>
  </div>

  <div class="  dark:bg-gray-800 p-6 rounded-lg shadow-md  dark: -gray-700">
    <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Iteration 5: Interactive Prototype Refinement</h3>
    <ul class="space-y-3 text-gray-700 dark:text-gray-300 mb-4">
      <li><strong>Objective:</strong> Refine the prototype based on feedback from previous tests.</li>
      <li><strong>Improvements Implemented:</strong> Enhanced the user interface for easier interaction, improved the notification system to be less distracting during intense gaming sessions, integrated ambient light adjustments to reduce eye strain.</li>
    </ul>
    <div class="grid md:grid-cols-2 gap-4">
      <img src="/images/PerfectPosture/5-1.jpeg" alt="UI improvements" class="w-full rounded-lg shadow-sm"/>
      <img src="/images/PerfectPosture/5-2.jpeg" alt="Notification system" class="w-full rounded-lg shadow-sm"/>
      <img src="/images/PerfectPosture/5-3.jpeg" alt="Light adjustments" class="w-full rounded-lg shadow-sm"/>
      <img src="/images/PerfectPosture/5-4.jpeg" alt="Final prototype" class="w-full rounded-lg shadow-sm"/>
    </div>
  </div>

  <div class="  dark:bg-gray-800 p-6 rounded-lg shadow-md  dark: -gray-700">
    <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Iteration 6: Final Heuristic Evaluation</h3>
    <ul class="space-y-3 text-gray-700 dark:text-gray-300 mb-4">
      <li><strong>Objective:</strong> Evaluate the final prototype using established usability heuristics to ensure compliance with ergonomic standards.</li>
      <li><strong>Evaluation Criteria:</strong> Visibility of system status, user control and freedom, error prevention.</li>
      <li><strong>Outcome:</strong> The system was confirmed to be intuitive and effective, providing clear, timely feedback on posture without disrupting the gaming experience.</li>
    </ul>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <img src="/images/PerfectPosture/6-1.jpeg" alt="Heuristic evaluation 1" class="w-full rounded-lg shadow-sm"/>
      <img src="/images/PerfectPosture/6-2.jpeg" alt="Heuristic evaluation 2" class="w-full rounded-lg shadow-sm"/>
      <img src="/images/PerfectPosture/6-3.jpeg" alt="Heuristic evaluation 3" class="w-full rounded-lg shadow-sm"/>
      <img src="/images/PerfectPosture/6-4.jpeg" alt="Evaluation results" class="w-full rounded-lg shadow-sm"/>
      <img src="/images/PerfectPosture/6-5.jpeg" alt="Standards compliance" class="w-full rounded-lg shadow-sm"/>
      <img src="/images/PerfectPosture/6-6.jpeg" alt="Final assessment" class="w-full rounded-lg shadow-sm"/>
    </div>
  </div>
</div>

<h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Final Presentation and Outcomes</h2>

<div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
  <ul class="space-y-3 text-gray-700 dark:text-gray-300">
    <li><strong>Final Demonstration:</strong> Showcased the refined prototype in a comprehensive presentation, illustrating its development journey, technical specifications, and user feedback.</li>
    <li><strong>Impact Demonstrated:</strong> Evidence of improved posture and potential reduction in health risks among gamers.</li>
    <li><strong>Future Directions:</strong> Suggestions for future enhancements, including AI-driven posture correction and integration with gaming platforms for broader reach.</li>
  </ul>
</div>

<h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Conclusion</h2>

<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
  The "Perfect Posture" project demonstrates significant potential to positively impact gamers' health by addressing a common yet overlooked problem: poor posture during gaming. The iterative approach ensured that each phase of development was informed by user feedback and empirical testing, leading to a well-rounded and effective solution. Future work will focus on expanding the system's capabilities and exploring commercialization opportunities to make ergonomic improvements accessible to the wider gaming community.
</p>

<div class="mt-12 p-6 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg text-center">
  <h3 class="text-xl font-bold mb-2">🎯 Project Impact</h3>
  <p class="opacity-90 mb-4">
    <em>Through iterative design and user-centered research, we developed a solution that successfully balances health awareness with gaming enjoyment, achieving measurable improvements in user posture and awareness.</em>
  </p>
  <p class="font-semibold">
    <strong>Designing for Wellness in the Digital Age</strong>
  </p>
</div>
    `,
    coverImage: "/images/PerfectPosture/banner.png",
    socialImage: "/images/PerfectPosture/banner.png",
    publishedAt: "2024-06-17",
    readTime: "20",
  },
  {
    slug: "unity-at-sea-soundscape-shared-balance",
    title: "Unity at Sea: Crafting a Soundscape of Shared Balance",
    tags: ["Interactive Art", "Sound Design", "Kinect", "EyesWeb", "Collaboration"],
    description:
      "An immersive installation exploring group interdependence through reactive soundscapes and collective balance.",
    body: `
<div class="mb-8 p-6 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg">
  <h2 class="text-2xl font-bold mb-2">🌊 Unity at Sea: Crafting a Soundscape of Shared Balance</h2>
  <p class="text-lg opacity-90 mb-4">An immersive installation exploring group interdependence through reactive soundscapes and collective balance</p>
  <div class="flex flex-wrap gap-2">
    <span class="px-3 py-1    rounded-full text-sm">Interactive Art</span>
    <span class="px-3 py-1    rounded-full text-sm">Sound Design</span>
    <span class="px-3 py-1    rounded-full text-sm">Kinect</span>
    <span class="px-3 py-1   rounded-full text-sm">EyesWeb</span>
    <span class="px-3 py-1   rounded-full text-sm">Collaboration</span>
  </div>
</div>

<div class="mb-8 p-6 bg-teal-50 dark:bg-teal-900/20  -l-4  -teal-500 rounded-r-lg">
  <h3 class="text-xl font-semibold mb-3 text-teal-900 dark:text-teal-100">🤝 The Central Question</h3>
  <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
    What does it feel like to be truly dependent on others? Not just in theory, but in a way you can physically sense and hear? This was the central question behind <strong>"Unity at Sea,"</strong> a mini-installation I created to explore the delicate dynamics of group interdependence.
  </p>
</div>

<h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">🎯 The Concept: Drowning in Noise or Floating in Harmony?</h2>

<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
  The concept is simple, yet profound: three participants are invited to step onto a small, virtual "raft" marked on the floor. Their collective challenge is to find and maintain their balance as a single unit. But here, the consequence of their cooperation—or lack thereof—isn't just a feeling of stability. It's an immersive, reactive soundscape that they compose together in real-time.
</p>

<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
  <strong>"Unity at Sea"</strong> transforms an abstract idea—group cohesion—into a tangible, auditory experience. The installation aims to make participants hyper-aware of their physical relationship to others in a shared space. As they shift their weight, the room fills with the sound of water. Their goal is to work together, consciously or unconsciously, to keep their collective center of gravity stable.
</p>

<div class="grid md:grid-cols-3 gap-4 mb-8">
  <div class="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg text-center  -l-4  -green-500">
    <h4 class="font-semibold mb-2 text-green-800 dark:text-green-200">🏝️ Calm Seas</h4>
    <p class="text-sm text-green-700 dark:text-green-300">Perfect balance = peaceful waters</p>
  </div>
  <div class="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-lg text-center  -l-4  -yellow-500">
    <h4 class="font-semibold mb-2 text-yellow-800 dark:text-yellow-200">⚠️ Choppy Waters</h4>
    <p class="text-sm text-yellow-700 dark:text-yellow-300">Slight imbalance = warning sounds</p>
  </div>
  <div class="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg text-center  -l-4  -red-500">
    <h4 class="font-semibold mb-2 text-red-800 dark:text-red-200">🌪️ The Storm</h4>
    <p class="text-sm text-red-700 dark:text-red-300">Critical imbalance = chaotic tempest</p>
  </div>
</div>

<h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">⚙️ How It Works: The Technology Behind the Raft</h2>

<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
  To bring this concept to life, I integrated a combination of creative coding and accessible hardware:
</p>

<div class="space-y-6 mb-8">
  <div class="  dark:bg-gray-800 p-6 rounded-lg shadow-md   dark: -gray-700">
    <h3 class="text-lg font-semibold mb-3 text-gray-900 dark:text-white">👁️ Sensing with Kinect</h3>
    <p class="text-gray-700 dark:text-gray-300 mb-4">A Microsoft Kinect sensor was positioned to view the "raft" area. This powerful sensor tracked the body positions of all three participants simultaneously, providing real-time skeletal tracking data.</p>
    
    <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
      <h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">Technical Specs:</h4>
      <ul class="text-sm text-blue-700 dark:text-blue-300 space-y-1">
        <li>• RGB-D sensor for depth and color information</li>
        <li>• 30fps skeleton tracking for up to 6 people</li>
        <li>• Real-time joint position calculation</li>
      </ul>
    </div>
  </div>

  <div class="  dark:bg-gray-800 p-6 rounded-lg shadow-md   dark: -gray-700">
    <h3 class="text-lg font-semibold mb-3 text-gray-900 dark:text-white">🧠 Processing with EyesWeb</h3>
    <p class="text-gray-700 dark:text-gray-300 mb-4">The raw positional data was fed into <strong>EyesWeb</strong>, a brilliant open-source platform developed by the Casa Paganini - InfoMus Lab at the University of Genoa. I used EyesWeb to calculate the group's collective equilibrium point in real-time.</p>
    
    <div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
      <h4 class="font-semibold text-purple-800 dark:text-purple-200 mb-2">Key Calculations:</h4>
      <ul class="text-sm text-purple-700 dark:text-purple-300 space-y-1">
        <li>• Center of mass calculation for the group</li>
        <li>• Deviation measurement from equilibrium point</li>
        <li>• Real-time balance stability analysis</li>
      </ul>
    </div>
  </div>

  <div class="  dark:bg-gray-800 p-6 rounded-lg shadow-md   dark: -gray-700">
    <h3 class="text-lg font-semibold mb-3 text-gray-900 dark:text-white">🎵 A Reactive Auditory World</h3>
    <p class="text-gray-700 dark:text-gray-300 mb-4">This is where my sound design came in. I created three distinct types of wave sounds, each mapped to a different state of the group's balance:</p>
    
    <div class="grid md:grid-cols-3 gap-4">
      <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded text-center">
        <h5 class="font-semibold text-green-600 dark:text-green-400 mb-1">Calm Seas</h5>
        <p class="text-xs text-gray-600 dark:text-gray-400">Gentle lapping waves</p>
      </div>
      <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded text-center">
        <h5 class="font-semibold text-yellow-600 dark:text-yellow-400 mb-1">Choppy Waters</h5>
        <p class="text-xs text-gray-600 dark:text-gray-400">Agitated wave sounds</p>
      </div>
      <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded text-center">
        <h5 class="font-semibold text-red-600 dark:text-red-400 mb-1">The Storm</h5>
        <p class="text-xs text-gray-600 dark:text-gray-400">Chaotic crashing waves</p>
      </div>
    </div>
  </div>
</div>

<div class="bg-gradient-to-r from-teal-100 to-blue-100 dark:from-teal-900/30 dark:to-blue-900/30 p-6 rounded-lg mb-8">
  <h3 class="text-lg font-semibold mb-3 text-gray-900 dark:text-white">🔄 The Closed-Loop System</h3>
  <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
    The result was a closed-loop system where the participants' movements directly controlled their sonic environment. They weren't just listening; they were <strong>performing the piece with their bodies</strong>. Any deviation from the central equilibrium point was quantified as a measure of imbalance, triggering corresponding changes in the soundscape.
  </p>
</div>

<h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">🎭 Reflections from the Installation</h2>

<div class="  dark:bg-gray-800 p-6 rounded-lg shadow-md   dark: -gray-700 mb-8">
  <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">📍 Presented at Casa Paganini, Genoa</h3>
  <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
    As seen from its presentation at Casa Paganini in Genoa, the installation immediately sparked interaction and engagement. Participants were smiling and communicating, physically negotiating their space to influence the sound. The embodied nature of the interaction created an immediate understanding of the collaborative challenge.
  </p>
  
  <div class="grid md:grid-cols-2 gap-6 mt-6">
    <div>
      <h4 class="font-semibold mb-2 text-gray-900 dark:text-white">Immediate Observations:</h4>
      <ul class="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
        <li>• Participants naturally began verbal communication</li>
        <li>• Physical awareness of others increased dramatically</li>
        <li>• Clear understanding of cause-and-effect relationship</li>
        <li>• Emergent strategies for maintaining balance</li>
      </ul>
    </div>
    <div>
      <h4 class="font-semibold mb-2 text-gray-900 dark:text-white">Deeper Insights:</h4>
      <ul class="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
        <li>• Sound as powerful biofeedback mechanism</li>
        <li>• Physical metaphor for collaboration</li>
        <li>• Embodied cognition in group dynamics</li>
        <li>• Immediate consequences of individual actions</li>
      </ul>
    </div>
  </div>
</div>

<h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">💡 Technical Innovation & Artistic Vision</h2>

<div class="grid md:grid-cols-2 gap-6 mb-8">
  <div class="  dark:bg-gray-800 p-6 rounded-lg shadow-md   dark: -gray-700">
    <h3 class="text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400">🔧 Technical Achievements</h3>
    <ul class="space-y-2 text-gray-700 dark:text-gray-300">
      <li><strong>Real-time Processing:</strong> Sub-100ms latency from movement to sound</li>
      <li><strong>Multi-person Tracking:</strong> Simultaneous tracking of 3 participants</li>
      <li><strong>Dynamic Sound Mapping:</strong> Continuous audio parameter modulation</li>
      <li><strong>Stable Equilibrium Detection:</strong> Robust center-of-mass calculations</li>
    </ul>
  </div>

  <div class="  dark:bg-gray-800 p-6 rounded-lg shadow-md   dark: -gray-700">
    <h3 class="text-lg font-semibold mb-4 text-purple-600 dark:text-purple-400">🎨 Artistic Innovation</h3>
    <ul class="space-y-2 text-gray-700 dark:text-gray-300">
      <li><strong>Embodied Interaction:</strong> Physical metaphor for cooperation</li>
      <li><strong>Collective Composition:</strong> Group creation of soundscape</li>
      <li><strong>Immediate Feedback:</strong> Instant sonic consequences</li>
      <li><strong>Social Awareness:</strong> Technology fostering human connection</li>
    </ul>
  </div>
</div>

<h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">🌟 Impact & Learning Outcomes</h2>

<div class="bg-teal-50 dark:bg-teal-900/20  -l-4  -teal-500 p-6 mb-8">
  <h3 class="text-lg font-semibold mb-3 text-teal-900 dark:text-teal-100">🧠 Embodied Cognition Discovery</h3>
  <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
    <strong>"Unity at Sea"</strong> was more than a technical demonstration; it was an experiment in embodied cognition. It proved how a carefully designed soundscape can act as a powerful biofeedback mechanism for group dynamics, making the invisible forces between us audible and tangible.
  </p>
</div>

<div class="grid md:grid-cols-3 gap-4 mb-8">
  <div class="bg-gray-800 text-white p-4 rounded-lg text-center">
    <h4 class="font-semibold mb-2">🎵 Audio Design</h4>
    <p class="text-sm opacity-90">Three-state dynamic soundscape</p>
  </div>
  <div class="bg-gray-800 text-white p-4 rounded-lg text-center">
    <h4 class="font-semibold mb-2">👥 Social Interaction</h4>
    <p class="text-sm opacity-90">Enhanced group awareness</p>
  </div>
  <div class="bg-gray-800 text-white p-4 rounded-lg text-center">
    <h4 class="font-semibold mb-2">⚖️ Balance Sensing</h4>
    <p class="text-sm opacity-90">Real-time equilibrium detection</p>
  </div>
</div>

<h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">🔄 System Architecture</h2>

<div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
  <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Data Flow Pipeline:</h3>
  <div class="flex flex-col md:flex-row items-center justify-between gap-4">
    <div class="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg text-center flex-1">
      <h4 class="font-semibold text-blue-800 dark:text-blue-200">Kinect Sensor</h4>
      <p class="text-xs text-blue-600 dark:text-blue-400">Skeletal Tracking</p>
    </div>
    <div class="text-2xl text-gray-400">→</div>
    <div class="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg text-center flex-1">
      <h4 class="font-semibold text-purple-800 dark:text-purple-200">EyesWeb</h4>
      <p class="text-xs text-purple-600 dark:text-purple-400">Balance Analysis</p>
    </div>
    <div class="text-2xl text-gray-400">→</div>
    <div class="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg text-center flex-1">
      <h4 class="font-semibold text-green-800 dark:text-green-200">Audio Engine</h4>
      <p class="text-xs text-green-600 dark:text-green-400">Sound Generation</p>
    </div>
  </div>
</div>

<div class="mt-12 p-6 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg text-center">
  <h3 class="text-xl font-bold mb-2">🌊 Project Legacy</h3>
  <p class="opacity-90 mb-4">
    <em>This project cemented my passion for creating interactive experiences that bridge the gap between the digital and the deeply human. It demonstrated how technology can make abstract concepts like collaboration physically tangible and emotionally resonant.</em>
  </p>
  <p class="font-semibold">
    <strong>Making the Invisible Forces Between Us Audible</strong>
  </p>
</div>
    `,
    coverImage: "/images/UnityAtSea/banner.png",
    socialImage: "/images/UnityAtSea/banner.png",
    publishedAt: "2024-05-20",
    readTime: "8",
  },

  {
    slug: "resilience-ai-mirror-emotional-wellbeing",
    title: "reSilence: Crafting an AI-Powered Mirror for Emotional Wellbeing",
    tags: ["AI", "Computer Vision", "Interactive Art", "Python", "Max/MSP"],
    description:
      "A deep dive into the technology behind an interactive art installation that listens to your body and emotions.",
    body: `
<div class="mb-8 p-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg">
  <h2 class="text-2xl font-bold mb-2">🎭 reSilence: AI-Powered Mirror for Emotional Wellbeing</h2>
  <p class="text-lg opacity-90 mb-4">A deep dive into the technology behind an interactive art installation that listens to your body and emotions</p>
  <div class="flex flex-wrap gap-2">
    <span class="px-3 py-1   rounded-full text-sm">Computer Vision</span>
    <span class="px-3 py-1   rounded-full text-sm">Python</span>
    <span class="px-3 py-1   rounded-full text-sm">Max/MSP</span>
    <span class="px-3 py-1   rounded-full text-sm">OpenCV</span>
    <span class="px-3 py-1   rounded-full text-sm">MediaPipe</span>
  </div>
</div>

<div class="mb-8">
  <img src="/images/reSilence/hero.jpg" alt="reSilence interactive installation" class="w-full max-w-4xl mx-auto rounded-lg shadow-lg" />
</div>

<h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">🔮 The Vision: Can Technology Foster Self-Awareness?</h2>

<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
  In a world saturated with digital noise, how often do we truly pause to listen to ourselves? This question was the starting point for <strong>reSilence</strong>, an interactive art installation my colleague and I developed as part of the "Cultural Welfare Technologies" initiative. Our goal was ambitious: to use technology not as a distraction, but as a mirror to help individuals connect with their own physical and emotional states.
</p>

<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
  The project guides a participant through a "self-learning experience of reSilence." It's a home-based installation that uses a simple webcam to create a bio-feedback loop, transforming your movements and facial expressions into a responsive, multi-modal environment of sound and light, generated in Max/MSP.
</p>

<h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">✨ The Experience: How It Works from the User's View</h2>

<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
  Imagine standing in front of your computer. As you move, the sounds around you shift. A slow, gentle gesture might create a soft, ambient tone. A sudden, sharp movement could trigger a more percussive, energetic response.
</p>

<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
  But it goes deeper. The system is also watching your face. A smile might introduce a brighter, more harmonious musical element, while a look of frustration could subtly shift the audio-visual landscape to a more dissonant or complex texture. You are not just a user; you are the composer and the instrument. The entire system breathes with you, creating a space for you to explore, understand, and perhaps even modulate your own inner state.
</p>

<h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">🔧 The Technical Deep Dive: From Pixels to Feelings</h2>

<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
  The magic behind reSilence lies in a Python application that serves as the system's "brain." It analyzes the webcam feed in real-time and translates human expression into data that an artistic platform like Max/MSP can understand.
</p>

<div class="mb-8">
  <img src="/images/reSilence/architecture.png" alt="System Architecture Diagram" class="w-full max-w-2xl mx-auto rounded-lg shadow-md" />
</div>

<div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
  <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">🎯 Core Technical Components</h3>
  
  <div class="grid md:grid-cols-2 gap-6">
    <div>
      <h4 class="font-semibold mb-2 text-blue-600 dark:text-blue-400">Computer Vision Pipeline</h4>
      <ul class="space-y-1 text-sm text-gray-700 dark:text-gray-300">
        <li><strong>OpenCV:</strong> Real-time webcam capture and image processing</li>
        <li><strong>MediaPipe:</strong> Facial landmark detection and pose estimation</li>
        <li><strong>Custom algorithms:</strong> Movement analysis and emotional state inference</li>
      </ul>
    </div>
    
    <div>
      <h4 class="font-semibold mb-2 text-purple-600 dark:text-purple-400">Audio-Visual Generation</h4>
      <ul class="space-y-1 text-sm text-gray-700 dark:text-gray-300">
        <li><strong>Max/MSP:</strong> Real-time audio synthesis and processing</li>
        <li><strong>OSC Protocol:</strong> Communication between Python and Max/MSP</li>
        <li><strong>Custom mappings:</strong> Gesture-to-sound and emotion-to-visual translation</li>
      </ul>
    </div>
  </div>
</div>

<h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">🧠 The Brain: Computer Vision & Emotion Recognition</h3>

<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
  The system continuously analyzes facial expressions and body movements to infer emotional states. Using MediaPipe's facial landmark detection, we track 468 facial points in real-time, extracting features like:
</p>

<div class="grid md:grid-cols-2 gap-6 mb-6">
  <div class="  dark:bg-gray-700 p-4 rounded-lg  dark: -gray-600">
    <h4 class="font-semibold mb-2 text-gray-900 dark:text-white">Facial Expression Analysis</h4>
    <ul class="text-sm text-gray-700 dark:text-gray-300 space-y-1">
      <li>• Eye openness and blink patterns</li>
      <li>• Mouth curvature and lip movements</li>
      <li>• Eyebrow position and forehead tension</li>
      <li>• Overall facial symmetry and micro-expressions</li>
    </ul>
  </div>
  
  <div class="  dark:bg-gray-700 p-4 rounded-lg  dark: -gray-600">
    <h4 class="font-semibold mb-2 text-gray-900 dark:text-white">Movement Tracking</h4>
    <ul class="text-sm text-gray-700 dark:text-gray-300 space-y-1">
      <li>• Body pose and posture changes</li>
      <li>• Gesture speed and amplitude</li>
      <li>• Rhythmic patterns in movement</li>
      <li>• Spatial positioning and proximity</li>
    </ul>
  </div>
</div>

<pre class="bg-gray-900 text-green-400 p-4 rounded-lg mb-6 overflow-x-auto"><code># Core emotion detection algorithm
def analyze_emotional_state(landmarks, movement_data):
    # Extract facial features
    eye_aspect_ratio = calculate_ear(landmarks)
    mouth_curvature = calculate_mouth_curve(landmarks)
    brow_height = calculate_brow_position(landmarks)
    
    # Combine with movement analysis
    movement_intensity = calculate_movement_intensity(movement_data)
    
    # Map to emotional dimensions
    valence = map_to_valence(mouth_curvature, movement_intensity)
    arousal = map_to_arousal(eye_aspect_ratio, movement_intensity)
    
    return EmotionalState(valence, arousal)</code></pre>

<h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">🚀 Technical Challenges & Solutions</h2>

<div class="grid md:grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
  <div class="  dark:bg-gray-800 p-6 rounded-lg shadow-md  dark: -gray-700">
    <h3 class="text-lg font-semibold mb-4 text-red-600 dark:text-red-400">⚡ Challenge: Real-Time Performance</h3>
    <p class="text-gray-700 dark:text-gray-300 mb-3">Processing 30fps video while running complex computer vision algorithms required careful optimization.</p>
    <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded text-sm text-gray-700 dark:text-gray-300">
      <strong>Solution:</strong> Implemented multi-threading with OpenCV optimizations, reduced computational complexity through feature selection, and used hardware acceleration where available.
    </div>
  </div>

  <div class="  dark:bg-gray-800 p-6 rounded-lg shadow-md  dark: -gray-700">
    <h3 class="text-lg font-semibold mb-4 text-red-600 dark:text-red-400">🎭 Challenge: Emotion Recognition Accuracy</h3>
    <p class="text-gray-700 dark:text-gray-300 mb-3">Creating reliable emotional state inference from limited visual data across different individuals.</p>
    <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded text-sm text-gray-700 dark:text-gray-300">
      <strong>Solution:</strong> Developed a multi-modal approach combining facial expressions, body language, and temporal patterns with personalized calibration phases.
    </div>
  </div>
</div>

<h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">🌟 Impact & Insights</h2>

<div class="bg-purple-50 dark:bg-purple-900/20  -l-4  -purple-500 p-6 mb-8">
  <h3 class="text-lg font-semibold mb-3 text-gray-900 dark:text-white">💡 Key Discovery</h3>
  <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
    The most profound insight was how quickly users adapted to and began modulating their own behavior in response to the system. Rather than passively consuming content, participants became active co-creators, learning to "play" their own emotional states like an instrument.
  </p>
</div>

<div class="grid md:grid-cols-3 gap-4 mb-8">
  <div class="bg-gray-800 text-white p-4 rounded-lg text-center">
    <h4 class="font-semibold mb-2">🔬 Research Impact</h4>
    <p class="text-sm opacity-90">Published findings on bio-feedback in interactive art</p>
  </div>
  <div class="bg-gray-800 text-white p-4 rounded-lg text-center">
    <h4 class="font-semibold mb-2">🎯 User Engagement</h4>
    <p class="text-sm opacity-90">Average session time: 25+ minutes</p>
  </div>
  <div class="bg-gray-800 text-white p-4 rounded-lg text-center">
    <h4 class="font-semibold mb-2">🏆 Recognition</h4>
    <p class="text-sm opacity-90">Featured in Cultural Technologies showcase</p>
  </div>
</div>

<div class="mt-12 p-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg text-center">
  <h3 class="text-xl font-bold mb-2">🎯 Project Reflection</h3>
  <p class="opacity-90 mb-4">
    <em>reSilence challenged us to reconsider the relationship between technology and human emotion. Rather than creating another screen-based interaction, we explored how technology might serve as a bridge to self-awareness and emotional intelligence.</em>
  </p>
  <p class="font-semibold">
    <strong>Technology as a Mirror, Not a Mask</strong>
  </p>
</div>
    `,
    coverImage: "/images/reSilence/banner.png",
    socialImage: "/images/reSilence/banner.png",
    publishedAt: "2024-12-15",
    readTime: "12",
  },
  {
    slug: "ontology-for-hiphop",
    title: "an Ontology for Hip-Hop",
    tags: ["Cloud Computing", "Data Management"],
    description:
      "Project Report: Creating an Ontology for Hip-Hop Music...",
    body: `
<div class="mb-8 p-6 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg">
  <h2 class="text-2xl font-bold mb-2">🎵 Creating an Ontology for Hip-Hop Music</h2>
  <p class="text-lg opacity-90 mb-4">A comprehensive project report on developing a structured knowledge representation for hip-hop culture</p>
  <div class="flex flex-wrap gap-2">
    <span class="px-3 py-1   rounded-full text-sm">Ontology Design</span>
    <span class="px-3 py-1   rounded-full text-sm">Knowledge Engineering</span>
    <span class="px-3 py-1   rounded-full text-sm">React</span>
    <span class="px-3 py-1   rounded-full text-sm">SPARQL</span>
  </div>
</div>

<p class="text-gray-700 dark:text-gray-300 mb-6"><strong>Authors:</strong> AmirArsalan Serajoddin, MohammadReza Mahmoudi, Ali Rahneshin</p>

<div class="mb-8">
  <img src="/images/Ontology/2.png" alt="Hip-hop ontology diagram" class="w-full max-w-2xl mx-auto rounded-lg shadow-lg" />
</div>

<h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Introduction</h2>

<p class="text-gray-700 dark:text-gray-300 mb-4">Our team decided to create an ontology for hip-hop music. The choice of this topic was based on several reasons:</p>

<div class="grid md:grid-cols-3 gap-4 mb-8">
  <div class="  dark:bg-gray-800 p-4 rounded-lg shadow-md  dark: -gray-700">
    <h4 class="font-semibold mb-2 text-gray-900 dark:text-white">🌍 Cultural Significance</h4>
    <p class="text-sm text-gray-700 dark:text-gray-300">Hip-hop music is one of the most significant and influential genres in contemporary culture, with a large global following.</p>
  </div>
  <div class="  dark:bg-gray-800 p-4 rounded-lg shadow-md  dark: -gray-700">
    <h4 class="font-semibold mb-2 text-gray-900 dark:text-white">🔍 Research Gap</h4>
    <p class="text-sm text-gray-700 dark:text-gray-300">Limited research exists on creating ontologies for hip-hop, with most existing ontologies focusing on classical, jazz, and rock music.</p>
  </div>
  <div class="  dark:bg-gray-800 p-4 rounded-lg shadow-md  dark: -gray-700">
    <h4 class="font-semibold mb-2 text-gray-900 dark:text-white">❤️ Personal Interest</h4>
    <p class="text-sm text-gray-700 dark:text-gray-300">The group members have a personal interest in hip-hop, aiding in gathering information and analyzing concepts with greater enthusiasm.</p>
  </div>
</div>

<h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Identification and Analysis of Related Ontologies</h2>

<h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Identification of Relevant Sources</h3>

<p class="text-gray-700 dark:text-gray-300 mb-4">Initially, I searched for and identified ontologies related to music. The five main sources identified and reviewed were:</p>

<div class="grid md:grid-cols-2 gap-6 mb-8">
  <div class="bg-blue-50 dark:bg-blue-900/20  -l-4  -blue-500 p-4 rounded-r-lg">
    <h4 class="font-semibold mb-2 text-blue-900 dark:text-blue-100">Music Ontology</h4>
    <p class="text-sm text-gray-700 dark:text-gray-300">A comprehensive and widely used ontology for describing music, covering various aspects such as creation, performance, and consumption.</p>
  </div>
  <div class="bg-green-50 dark:bg-green-900/20  -l-4  -green-500 p-4 rounded-r-lg">
    <h4 class="font-semibold mb-2 text-green-900 dark:text-green-100">Schema.org</h4>
    <p class="text-sm text-gray-700 dark:text-gray-300">A widely adopted framework that includes music-related data, making it an essential resource for our project.</p>
  </div>
  <div class="bg-purple-50 dark:bg-purple-900/20  -l-4  -purple-500 p-4 rounded-r-lg">
    <h4 class="font-semibold mb-2 text-purple-900 dark:text-purple-100">DBTune Project</h4>
    <p class="text-sm text-gray-700 dark:text-gray-300">Utilizes the Music Ontology and focuses on integrating music data from various sources.</p>
  </div>
  <div class="bg-orange-50 dark:bg-orange-900/20  -l-4  -orange-500 p-4 rounded-r-lg">
    <h4 class="font-semibold mb-2 text-orange-900 dark:text-orange-100">Polifonia Ontology Network (PON)</h4>
    <p class="text-sm text-gray-700 dark:text-gray-300">Focuses on indexing, metadata, and music analysis, offering a rich structure for describing music.</p>
  </div>
</div>

<h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">From Sketches to Digital Graphs</h2>

<div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
  <p class="text-gray-700 dark:text-gray-300 mb-4">After examining other ontologies, we began drawing our own ideas for the hip-hop music ontology:</p>
  <blockquote class=" -l-4  -gray-400 pl-4 italic text-gray-600 dark:text-gray-400 mb-4">
    "We started with paper sketches, which helped us see how everything connected. These drawings were just the beginning, helping us talk about our ideas and make them better."
  </blockquote>
  <p class="text-gray-700 dark:text-gray-300">Then, we moved our sketches to <strong>Draw.io</strong>. This step allowed us to make our drawings clearer and more organized.</p>
</div>

<h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Building in Protégé</h2>

<p class="text-gray-700 dark:text-gray-300 mb-6">With our diagrams ready, we started building the ontology in a tool called <strong>Protégé</strong>. Here, we set up various classes representing key elements of hip-hop music, such as <em>'Artist', 'Album', 'Track'</em>, and many more.</p>

<h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Key Properties Defined:</h3>

<div class="grid md:grid-cols-2 gap-6 mb-8">
  <div class="  dark:bg-gray-800 p-6 rounded-lg shadow-md  dark: -gray-700">
    <h4 class="font-semibold mb-3 text-blue-600 dark:text-blue-400">Data Properties</h4>
    <p class="text-gray-700 dark:text-gray-300 text-sm mb-3">Common details across many classes</p>
    <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded text-sm">
      <code class="text-blue-600 dark:text-blue-400">'name'</code> property for classes like Artist, Album, and Track
    </div>
  </div>
  <div class="  dark:bg-gray-800 p-6 rounded-lg shadow-md  dark: -gray-700">
    <h4 class="font-semibold mb-3 text-purple-600 dark:text-purple-400">Object Properties</h4>
    <p class="text-gray-700 dark:text-gray-300 text-sm mb-3">Show relationships between different classes</p>
    <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded text-sm">
      <code class="text-purple-600 dark:text-purple-400">'has_recording'</code> connects Performances, Artists, and Groups to their Recordings
    </div>
  </div>
</div>

<h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Building the React Application</h2>

<p class="text-gray-700 dark:text-gray-300 mb-6">We created a React application using <code class="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">create-react-app</code>, setting up endpoints for update and query operations with a Jena Fuseki server running in the background.</p>

<div class="grid md:grid-cols-2 gap-4 mb-8">
  <img src="/images/Ontology/3.png" alt="React application interface" class="w-full rounded-lg shadow-md"/>
  <img src="/images/Ontology/4.png" alt="Query results interface" class="w-full rounded-lg shadow-md"/>
</div>

<h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Key Technical Aspects:</h3>

<div class="space-y-4 mb-8">
  <div class="  dark:bg-gray-800 p-4 rounded-lg shadow-md  dark: -gray-700">
    <h4 class="font-semibold mb-2 text-gray-900 dark:text-white">State Management</h4>
    <p class="text-gray-700 dark:text-gray-300 text-sm">Use of the <code class="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">useState</code> and <code class="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">useEffect</code> hooks for managing state and side-effects.</p>
  </div>
  <div class="  dark:bg-gray-800 p-4 rounded-lg shadow-md  dark: -gray-700">
    <h4 class="font-semibold mb-2 text-gray-900 dark:text-white">Dynamic Data Insertion</h4>
    <p class="text-gray-700 dark:text-gray-300 text-sm">The <code class="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">insertData</code> function iterates over dynamic data and posts each track to the SPARQL endpoint.</p>
  </div>
  <div class="  dark:bg-gray-800 p-4 rounded-lg shadow-md  dark: -gray-700">
    <h4 class="font-semibold mb-2 text-gray-900 dark:text-white">Fetching and Parsing Data</h4>
    <p class="text-gray-700 dark:text-gray-300 text-sm">After inserting, we fetch data from the query endpoint, parse the JSON results, and map them into your state.</p>
  </div>
  <div class="  dark:bg-gray-800 p-4 rounded-lg shadow-md  dark: -gray-700">
    <h4 class="font-semibold mb-2 text-gray-900 dark:text-white">Pagination</h4>
    <p class="text-gray-700 dark:text-gray-300 text-sm">Implemented basic pagination to enhance performance by loading tracks per page requirements.</p>
  </div>
</div>

<h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Query Results by Category:</h3>

<div class="grid md:grid-cols-3 gap-4 mb-8">
  <div class="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-lg text-center">
    <h4 class="font-semibold mb-2">🎶 By Genre</h4>
    <p class="text-sm opacity-90">Results categorized by genre</p>
  </div>
  <div class="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-lg text-center">
    <h4 class="font-semibold mb-2">📅 By Date (Recent)</h4>
    <p class="text-sm opacity-90">Recently added tracks</p>
  </div>
  <div class="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-lg text-center">
    <h4 class="font-semibold mb-2">⏱️ By Duration</h4>
    <p class="text-sm opacity-90">Tracks sorted by duration</p>
  </div>
</div>

<h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Installation & Validation</h2>

<div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
  <p class="text-gray-700 dark:text-gray-300 mb-4">To run the application:</p>
  <ol class="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
    <li>Execute the command <code class="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">npm i</code> in the terminal within the web app directory.</li>
    <li>Run the Jena Fuseki server in the background.</li>
    <li>Execute <code class="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">npm run dev</code> in the web app directory.</li>
    <li>The app will run on <code class="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">localhost</code>, and you can use the app to interact with the ontology.</li>
  </ol>
</div>

<div class="mt-12 p-6 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg text-center">
  <h3 class="text-xl font-bold mb-2">🎯 Project Achievement</h3>
  <p class="opacity-90 mb-4">
    <em>Successfully developed a comprehensive ontology for hip-hop music, bridging the gap between cultural knowledge and computational representation. The project demonstrates practical application of knowledge engineering principles in a culturally significant domain.</em>
  </p>
  <p class="font-semibold">
    <strong>Preserving Culture Through Technology</strong>
  </p>
</div>
    `,
    coverImage: "/images/Ontology/banner.png",
    socialImage: "/images/Ontology/banner.png",
    publishedAt: "2024-07-15",
    readTime: "15",
  },
    {
    slug: "eth-course-marketplace-blockchain",
    title: "Building a Decentralized Course Marketplace on Ethereum",
    tags: ["Blockchain", "Ethereum", "Solidity", "Next.js", "Web3", "DApp"],
    description:
      "A comprehensive exploration of blockchain technology, smart contracts, and modern web development - My Bachelor's Degree Capstone Project.",
    body: `
<div class="mb-8 p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg">
  <h2 class="text-2xl font-bold mb-2">🚀 ETH Course Marketplace</h2>
  <p class="text-lg opacity-90 mb-4">A comprehensive exploration of blockchain technology, smart contracts, and modern web development</p>
  <div class="flex flex-wrap gap-2">
    <span class="px-3 py-1   rounded-full text-sm">Next.js</span>
    <span class="px-3 py-1   rounded-full text-sm">Solidity</span>
    <span class="px-3 py-1   rounded-full text-sm">Web3.js</span>
    <span class="px-3 py-1   rounded-full text-sm">Ethereum</span>
    <span class="px-3 py-1   rounded-full text-sm">MetaMask</span>
  </div>
</div>

<div class="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20  -l-4  -blue-500 rounded-r-lg">
  <h3 class="text-xl font-semibold mb-3 text-blue-900 dark:text-blue-100">🎯 Project Overview</h3>
  <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
    For my bachelor's degree final project, I developed <strong>ETH Course Marketplace</strong> - a fully decentralized platform where users can purchase, manage, and access online courses using Ethereum blockchain technology. This project represents the intersection of modern web development, blockchain technology, and user experience design.
  </p>
</div>

<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
  <div class="bg-gray-800 text-white p-4 rounded-lg text-center">
    <h4 class="font-semibold mb-2">🔗 Full-Stack Web3</h4>
    <p class="text-sm opacity-90">Complete dApp Development</p>
  </div>
  <div class="bg-gray-800 text-white p-4 rounded-lg text-center">
    <h4 class="font-semibold mb-2">⛽ Gas Optimized</h4>
    <p class="text-sm opacity-90">Efficient Smart Contracts</p>
  </div>
  <div class="bg-gray-800 text-white p-4 rounded-lg text-center">
    <h4 class="font-semibold mb-2">🌍 Multilingual</h4>
    <p class="text-sm opacity-90">Global Accessibility</p>
  </div>
  <div class="bg-gray-800 text-white p-4 rounded-lg text-center">
    <h4 class="font-semibold mb-2">📱 Responsive</h4>
    <p class="text-sm opacity-90">Mobile-First Design</p>
  </div>
</div>

<h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">🏗️ Technical Architecture</h2>

<div class="grid md:grid-cols-2 gap-6 mb-8">
  <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg  -l-4  -blue-500">
    <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Frontend Stack</h3>
    <ul class="space-y-2 text-gray-700 dark:text-gray-300">
      <li><strong>Next.js 12.3.4</strong> - React framework for production-ready applications</li>
      <li><strong>React 18.2.0</strong> - Modern component-based UI development</li>
      <li><strong>Tailwind CSS 3.1.7</strong> - Utility-first CSS framework</li>
      <li><strong>SWR 1.3.0</strong> - Data fetching library for efficient state management</li>
      <li><strong>Web3.js 1.7.5</strong> - Ethereum blockchain interaction</li>
    </ul>
  </div>
  <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg  -l-4  -blue-500">
    <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Blockchain Stack</h3>
    <ul class="space-y-2 text-gray-700 dark:text-gray-300">
      <li><strong>Solidity</strong> - Smart contract development language</li>
      <li><strong>Truffle Suite</strong> - Development framework for Ethereum dApps</li>
      <li><strong>MetaMask</strong> - Browser wallet integration</li>
      <li><strong>Ethereum Network</strong> - Decentralized blockchain platform</li>
    </ul>
  </div>
</div>

<h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">⚙️ Core Features Implementation</h2>

<div class="grid md:grid-cols-2 gap-6 mb-8">
  <div class="  dark:bg-gray-800 p-6 rounded-lg shadow-md  dark: -gray-700">
    <h3 class="text-lg font-semibold mb-3 text-gray-900 dark:text-white">🔐 Smart Contract Architecture</h3>
    <p class="text-gray-700 dark:text-gray-300 mb-4">The heart of the application is the <code class="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">CourseMarketplace.sol</code> contract implementing state management, ownership verification, and secure transactions.</p>
    
    <pre class="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto"><code>enum State {
    Purchased,
    Activated, 
    Deactivated
}

struct Course {
    uint id;
    uint price;
    bytes32 proof;
    address owner;
    State state;
}</code></pre>
  </div>

  <div class="  dark:bg-gray-800 p-6 rounded-lg shadow-md  dark: -gray-700">
    <h3 class="text-lg font-semibold mb-3 text-gray-900 dark:text-white">🌐 Web3 Integration Layer</h3>
    <p class="text-gray-700 dark:text-gray-300 mb-4">Sophisticated Web3 provider system handling wallet connections, network management, and blockchain state synchronization.</p>
    
    <pre class="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto"><code>const createWeb3State = ({ 
    web3, provider, contract, isLoading 
}) => {
  return {
    web3, provider, contract, isLoading,
    hooks: setupHooks({ web3, provider, contract }),
  };
};</code></pre>
  </div>

  <div class="  dark:bg-gray-800 p-6 rounded-lg shadow-md  dark: -gray-700">
    <h3 class="text-lg font-semibold mb-3 text-gray-900 dark:text-white">🎨 User Interface Components</h3>
    <p class="text-gray-700 dark:text-gray-300 mb-4">Component-based architecture with responsive design, interactive modals, and real-time transaction status updates.</p>
    <ul class="space-y-1 text-gray-700 dark:text-gray-300">
      <li>• Course catalog with filtering</li>
      <li>• Wallet connection interface</li>
      <li>• Purchase confirmation modals</li>
      <li>• Course management dashboard</li>
    </ul>
  </div>

  <div class="  dark:bg-gray-800 p-6 rounded-lg shadow-md  dark: -gray-700">
    <h3 class="text-lg font-semibold mb-3 text-gray-900 dark:text-white">🧪 Testing & Quality Assurance</h3>
    <p class="text-gray-700 dark:text-gray-300 mb-4">Comprehensive testing strategy covering smart contracts, purchase flows, access control, and error handling scenarios.</p>
    
    <pre class="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto"><code>describe("Purchase the new course", () => {
  it("should not allow repurchase", async () => {
    await catchRevert(
      _contract.purchaseCourse(courseId, proof, {
        from: buyer, value
      })
    );
  });
});</code></pre>
  </div>
</div>

<div class=" -t-2  -gray-200 dark: -gray-700 my-8"></div>

<h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">💡 Technical Challenges & Solutions</h2>

<div class="space-y-6 mb-8">
  <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg  dark: -gray-700">
    <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Challenge 1: Gas Optimization</h3>
    <p class="text-gray-700 dark:text-gray-300 mb-3"><strong>Problem:</strong> High transaction costs affecting user adoption</p>
    <p class="text-gray-700 dark:text-gray-300 mb-2"><strong>Solution:</strong></p>
    <ul class="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
      <li>Implemented custom errors instead of require statements</li>
      <li>Optimized storage patterns in smart contracts</li>
      <li>Batch operations where possible</li>
    </ul>
  </div>

  <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg  dark: -gray-700">
    <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Challenge 2: Wallet Integration</h3>
    <p class="text-gray-700 dark:text-gray-300 mb-3"><strong>Problem:</strong> Complex MetaMask connection and network switching</p>
    <p class="text-gray-700 dark:text-gray-300 mb-2"><strong>Solution:</strong></p>
    <ul class="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
      <li>Created abstracted Web3 provider with automatic reconnection</li>
      <li>Implemented comprehensive error handling for wallet states</li>
      <li>Added network detection and switching prompts</li>
    </ul>
  </div>
</div>

<h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">🚀 Future Enhancements</h2>

<div class="grid md:grid-cols-2 gap-6 mb-8">
  <div class="  dark:bg-gray-800 p-6 rounded-lg shadow-md  dark: -gray-700">
    <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Short-term Improvements</h3>
    <ul class="space-y-2 text-gray-700 dark:text-gray-300">
      <li><strong>Layer 2 Integration</strong> (Polygon, Arbitrum) for reduced gas costs</li>
      <li><strong>IPFS Integration</strong> for decentralized course content storage</li>
      <li><strong>Advanced Filtering</strong> with multiple search criteria</li>
      <li><strong>Rating System</strong> with blockchain-based reviews</li>
    </ul>
  </div>

  <div class="  dark:bg-gray-800 p-6 rounded-lg shadow-md  dark: -gray-700">
    <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Long-term Vision</h3>
    <ul class="space-y-2 text-gray-700 dark:text-gray-300">
      <li><strong>DAO Governance</strong> for platform decision making</li>
      <li><strong>Creator Rewards</strong> with token-based incentive system</li>
      <li><strong>Cross-chain Compatibility</strong> supporting multiple blockchains</li>
      <li><strong>AI-Powered Recommendations</strong> for personalized course suggestions</li>
    </ul>
  </div>
</div>

<div class="mt-12 p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-center">
  <h3 class="text-xl font-bold mb-2">🎯 Project Summary</h3>
  <p class="opacity-90 mb-4">
    <em>This project represents the culmination of my bachelor's degree studies, showcasing the integration of theoretical computer science knowledge with practical blockchain development skills.</em>
  </p>
  <p class="font-semibold">
    <strong>Built with ❤️ and ⚡ as a Bachelor's Degree Final Project</strong>
  </p>
</div>
    `,
    coverImage: "/images/ETHCourseMarketplace/banner.png",
    socialImage: "/images/ETHCourseMarketplace/banner.png",
    publishedAt: "2024-06-15",
    readTime: "18",
  },
  {
    slug: "jobify-full-stack-job-tracker",
    title: "Jobify: A Full-Stack Job Application Tracker",
    tags: ["MERN Stack", "MongoDB", "Express.js", "React", "Node.js", "JWT"],
    description:
      "A comprehensive MERN stack application for managing and tracking job applications with real-time analytics.",
    body: `
<div class="mb-8 p-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg">
  <h2 class="text-2xl font-bold mb-2">💼 Jobify: A Full-Stack Job Application Tracker</h2>
  <p class="text-lg opacity-90 mb-4">A comprehensive MERN stack application for managing and tracking job applications with real-time analytics</p>
  <div class="flex flex-wrap gap-2">
    <span class="px-3 py-1   rounded-full text-sm">MongoDB</span>
    <span class="px-3 py-1   rounded-full text-sm">Express.js</span>
    <span class="px-3 py-1   rounded-full text-sm">React</span>
    <span class="px-3 py-1   rounded-full text-sm">Node.js</span>
    <span class="px-3 py-1   rounded-full text-sm">JWT</span>
  </div>
</div>

<div class="mb-8 p-6 bg-indigo-50 dark:bg-indigo-900/20  -l-4  -indigo-500 rounded-r-lg">
  <h3 class="text-xl font-semibold mb-3 text-indigo-900 dark:text-indigo-100">💡 The Problem</h3>
  <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
    Job hunting can be overwhelming, especially when you're applying to multiple positions and trying to keep track of your progress. That's why I built <strong>Jobify</strong> - a full-stack web application that helps job seekers organize, track, and analyze their job applications in one centralized platform.
  </p>
</div>

<h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">🚀 Key Features</h2>

<div class="grid md:grid-cols-2 gap-6 mb-8">
  <div class="  dark:bg-gray-800 p-6 rounded-lg shadow-md   dark: -gray-700">
    <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Core Functionality</h3>
    <ul class="space-y-2 text-gray-700 dark:text-gray-300">
      <li><strong>Secure User Authentication:</strong> Complete registration and login system with JWT-based authentication</li>
      <li><strong>Job Management:</strong> Add, edit, delete, and track job applications with detailed information</li>
      <li><strong>Application Status Tracking:</strong> Monitor progress with status categories (Pending, Interview, Declined)</li>
      <li><strong>Analytics Dashboard:</strong> Visual charts and statistics showing application trends over time</li>
      <li><strong>Responsive Design:</strong> Mobile-friendly interface that works seamlessly across all devices</li>
    </ul>
  </div>

  <div class="  dark:bg-gray-800 p-6 rounded-lg shadow-md   dark: -gray-700">
    <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Job Application Details</h3>
    <p class="text-gray-700 dark:text-gray-300 mb-3">Each job entry captures essential information:</p>
    <ul class="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
      <li>• Company name and position title</li>
      <li>• Job type (Full-time, Part-time, Remote, Internship)</li>
      <li>• Location and application status</li>
      <li>• Creation date for timeline tracking</li>
      <li>• User-specific data isolation</li>
    </ul>
  </div>
</div>

<h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">🛠️ Technical Stack</h2>

<div class="grid md:grid-cols-2 gap-6 mb-8">
  <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg  -l-4  -green-500">
    <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Backend Technologies</h3>
    <ul class="space-y-2 text-gray-700 dark:text-gray-300">
      <li><strong>Node.js & Express.js:</strong> RESTful API server with middleware for authentication and error handling</li>
      <li><strong>MongoDB & Mongoose:</strong> NoSQL database with schema validation and data modeling</li>
      <li><strong>JWT Authentication:</strong> Secure token-based user sessions</li>
      <li><strong>Bcrypt.js:</strong> Password hashing for enhanced security</li>
      <li><strong>Express Rate Limiting:</strong> API protection against abuse</li>
    </ul>
  </div>

  <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg  -l-4  -blue-500">
    <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Frontend Technologies</h3>
    <ul class="space-y-2 text-gray-700 dark:text-gray-300">
      <li><strong>React 17:</strong> Component-based UI with functional components and hooks</li>
      <li><strong>React Router v6:</strong> Client-side routing for single-page application experience</li>
      <li><strong>Styled Components:</strong> CSS-in-JS styling for maintainable and dynamic designs</li>
      <li><strong>Recharts:</strong> Interactive data visualization for analytics dashboard</li>
      <li><strong>Context API:</strong> Global state management for user data and application state</li>
    </ul>
  </div>
</div>

<h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">🏗️ Architecture & Implementation</h2>

<div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
  <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Project Structure</h3>
  <p class="text-gray-700 dark:text-gray-300 mb-4">The application follows a clean, organized structure:</p>
  
  <pre class="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto"><code>jobify/
├── server.js              # Express server entry point
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route-based page components
│   │   ├── context/        # Global state management
│   │   └── assets/         # Styles and images
├── controllers/            # API route handlers
├── models/                 # MongoDB schemas
├── routes/                 # API endpoint definitions
├── middlewares/            # Custom middleware functions
└── utils/                  # Helper functions</code></pre>
</div>

<div class="grid md:grid-cols-2 gap-6 mb-8">
  <div class="  dark:bg-gray-800 p-6 rounded-lg shadow-md   dark: -gray-700">
    <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Database Design</h3>
    <p class="text-gray-700 dark:text-gray-300 mb-3">The application uses two main MongoDB collections:</p>
    
    <div class="space-y-3">
      <div class="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
        <h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-1">Users Collection:</h4>
        <ul class="text-sm text-blue-700 dark:text-blue-300 space-y-1">
          <li>• Secure authentication with hashed passwords</li>
          <li>• User profile information (name, email, location)</li>
          <li>• Email validation and unique constraints</li>
        </ul>
      </div>
      
      <div class="bg-purple-50 dark:bg-purple-900/20 p-3 rounded">
        <h4 class="font-semibold text-purple-800 dark:text-purple-200 mb-1">Jobs Collection:</h4>
        <ul class="text-sm text-purple-700 dark:text-purple-300 space-y-1">
          <li>• Job-specific details with enum validations</li>
          <li>• User association through ObjectId references</li>
          <li>• Timestamp tracking for analytics</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="  dark:bg-gray-800 p-6 rounded-lg shadow-md   dark: -gray-700">
    <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">API Design</h3>
    <p class="text-gray-700 dark:text-gray-300 mb-3">RESTful API endpoints following best practices:</p>
    
    <div class="space-y-2 text-sm">
      <div class="bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded"><code class="text-green-800 dark:text-green-300">POST /api/v1/auth/register</code> - User registration</div>
      <div class="bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded"><code class="text-blue-800 dark:text-blue-300">POST /api/v1/auth/login</code> - User authentication</div>
      <div class="bg-purple-50 dark:bg-purple-900/20 px-3 py-2 rounded"><code class="text-purple-800 dark:text-purple-300">GET /api/v1/jobs</code> - Fetch user's job applications</div>
      <div class="bg-orange-50 dark:bg-orange-900/20 px-3 py-2 rounded"><code class="text-orange-800 dark:text-orange-300">POST /api/v1/jobs</code> - Create new job application</div>
      <div class="bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded"><code class="text-red-800 dark:text-red-300">GET /api/v1/jobs/stats</code> - Analytics and statistics</div>
    </div>
  </div>
</div>

<h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">💡 Key Implementation Highlights</h2>

<div class="grid md:grid-cols-2 gap-6 mb-8">
  <div class="  dark:bg-gray-800 p-6 rounded-lg shadow-md   dark: -gray-700">
    <h3 class="text-lg font-semibold mb-4 text-indigo-600 dark:text-indigo-400">🔐 Authentication & Security</h3>
    <ul class="space-y-2 text-gray-700 dark:text-gray-300">
      <li>• JWT tokens for stateless authentication</li>
      <li>• Password hashing with bcrypt</li>
      <li>• Protected routes requiring authentication</li>
      <li>• User-specific data isolation</li>
    </ul>
  </div>

  <div class="  dark:bg-gray-800 p-6 rounded-lg shadow-md   dark: -gray-700">
    <h3 class="text-lg font-semibold mb-4 text-purple-600 dark:text-purple-400">🎛️ State Management</h3>
    <ul class="space-y-2 text-gray-700 dark:text-gray-300">
      <li>• React Context API for global state</li>
      <li>• Centralized application state in appContext.js</li>
      <li>• Action-based state updates with reducer pattern</li>
      <li>• Persistent authentication state</li>
    </ul>
  </div>
</div>

<h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">📊 Analytics & Insights</h2>

<div class="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 p-6 rounded-lg mb-8">
  <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Dashboard Provides Valuable Insights:</h3>
  <div class="grid md:grid-cols-2 gap-6">
    <div>
      <ul class="space-y-2 text-gray-700 dark:text-gray-300">
        <li><strong>Application Statistics:</strong> Total applications, interviews scheduled, job offers</li>
        <li><strong>Monthly Trends:</strong> Visual charts showing application patterns over time</li>
      </ul>
    </div>
    <div>
      <ul class="space-y-2 text-gray-700 dark:text-gray-300">
        <li><strong>Status Distribution:</strong> Breakdown of applications by current status</li>
        <li><strong>Interactive Charts:</strong> Both area and bar chart visualizations using Recharts</li>
      </ul>
    </div>
  </div>
</div>

<h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">🚀 Development Experience</h2>

<div class="space-y-6 mb-8">
  <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg   dark: -gray-700">
    <h3 class="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Development Workflow</h3>
    <div class="grid md:grid-cols-2 gap-4">
      <ul class="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
        <li>• <strong>Concurrent Development:</strong> Frontend and backend run simultaneously</li>
        <li>• <strong>Hot Reloading:</strong> Instant updates during development</li>
      </ul>
      <ul class="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
        <li>• <strong>Environment Configuration:</strong> Separate development and production settings</li>
        <li>• <strong>Git Integration:</strong> Version control with GitHub repository</li>
      </ul>
    </div>
  </div>

  <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg   dark: -gray-700">
    <h3 class="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Code Quality</h3>
    <div class="grid md:grid-cols-2 gap-4">
      <ul class="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
        <li>• <strong>ES6+ Syntax:</strong> Modern JavaScript features throughout</li>
        <li>• <strong>Component Architecture:</strong> Modular, reusable React components</li>
      </ul>
      <ul class="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
        <li>• <strong>Separation of Concerns:</strong> Clear distinction between UI, logic, and data</li>
        <li>• <strong>Error Boundaries:</strong> Graceful error handling in React components</li>
      </ul>
    </div>
  </div>
</div>

<h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">🎯 Learning Outcomes</h2>

<div class="  dark:bg-gray-800 p-6 rounded-lg shadow-md   dark: -gray-700 mb-8">
  <p class="text-gray-700 dark:text-gray-300 mb-4">Building Jobify enhanced my skills in:</p>
  <div class="grid md:grid-cols-2 gap-6">
    <ul class="space-y-2 text-gray-700 dark:text-gray-300">
      <li><strong>Full-stack Development:</strong> End-to-end application development</li>
      <li><strong>Database Design:</strong> NoSQL schema design and relationships</li>
      <li><strong>Authentication Systems:</strong> Secure user management implementation</li>
      <li><strong>State Management:</strong> Complex state handling in React applications</li>
    </ul>
    <ul class="space-y-2 text-gray-700 dark:text-gray-300">
      <li><strong>API Development:</strong> RESTful service design and implementation</li>
      <li><strong>Modern JavaScript:</strong> ES6+ features and async programming</li>
      <li><strong>Responsive Design:</strong> Mobile-first development approach</li>
      <li><strong>Data Visualization:</strong> Interactive charts and analytics</li>
    </ul>
  </div>
</div>

<h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">🔮 Future Enhancements</h2>

<div class="grid md:grid-cols-2 gap-6 mb-8">
  <div class="  dark:bg-gray-800 p-6 rounded-lg shadow-md   dark: -gray-700">
    <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Potential Improvements</h3>
    <ul class="space-y-2 text-gray-700 dark:text-gray-300">
      <li>• Email notifications for application reminders</li>
      <li>• File upload for resume and cover letter management</li>
      <li>• Integration with job board APIs</li>
      <li>• Advanced filtering and search capabilities</li>
    </ul>
  </div>

  <div class="  dark:bg-gray-800 p-6 rounded-lg shadow-md   dark: -gray-700">
    <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Advanced Features</h3>
    <ul class="space-y-2 text-gray-700 dark:text-gray-300">
      <li>• Data export functionality</li>
      <li>• Team collaboration features</li>
      <li>• AI-powered job matching</li>
      <li>• Interview scheduling integration</li>
    </ul>
  </div>
</div>

<div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
  <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">💻 Try It Yourself</h3>
  <p class="text-gray-700 dark:text-gray-300 mb-3">The application includes:</p>
  <div class="grid md:grid-cols-2 gap-4">
    <ul class="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
      <li>• Demo data population script (populate.js)</li>
      <li>• Comprehensive setup instructions</li>
    </ul>
    <ul class="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
      <li>• Development and production configurations</li>
      <li>• Clear project documentation</li>
    </ul>
  </div>
</div>

<div class="text-center mb-8">
  <a href="https://github.com/Amirserajj/jobify" target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors">
    <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"></path>
    </svg>
    View on GitHub
  </a>
</div>

<div class="mt-12 p-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg text-center">
  <h3 class="text-xl font-bold mb-2">💼 Project Summary</h3>
  <p class="opacity-90 mb-4">
    <em>This project demonstrates my ability to build scalable, secure, and user-friendly web applications using modern technologies and best practices. It showcases both technical implementation skills and understanding of user experience design.</em>
  </p>
  <p class="font-semibold">
    <strong>Built with ❤️ using the MERN stack</strong>
  </p>
</div>
    `,
    coverImage: "/images/Jobify/banner.png",
    socialImage: "/images/Jobify/banner.png",
    publishedAt: "2023-08-15",
    readTime: "12",
  },
];

export default allprojects;
