import { Difficulty, Passage } from '../types';

export const DIFFICULTY_PRESETS: Record<Difficulty, { label: string; defaultTime: number; description: string }> = {
  easy: {
    label: 'Easy',
    defaultTime: 45,
    description: 'Short everyday words, simple grammar, basic punctuation.',
  },
  medium: {
    label: 'Medium',
    defaultTime: 60,
    description: 'Standard vocabulary, natural cadence, numbers, and common quotes.',
  },
  hard: {
    label: 'Hard',
    defaultTime: 75,
    description: 'Complex vocabulary, advanced prose, code snippets, and symbols.',
  },
};

export const PASSAGES: Passage[] = [
  // ==========================================
  // EASY PASSAGES (20 unique passages)
  // Short, simple everyday sentences, common vocabulary
  // ==========================================
  {
    id: 'easy-1',
    difficulty: 'easy',
    text: 'The sun was shining bright in the clear blue sky. A gentle warm breeze blew through the tall green trees. The dog ran across the open grass with pure joy.',
    source: 'Sunny Afternoon',
  },
  {
    id: 'easy-2',
    difficulty: 'easy',
    text: 'Early morning is the best time of the day to take a walk. The air is fresh and cool, and the streets are quiet. Coffee smells amazing when you take the first warm sip.',
    source: 'Morning Routine',
  },
  {
    id: 'easy-3',
    difficulty: 'easy',
    text: 'Learning to type fast takes practice and patience. When your fingers find the home row keys, your speed will begin to increase naturally. Keep your eyes on the screen.',
    source: 'Typing Habit',
  },
  {
    id: 'easy-4',
    difficulty: 'easy',
    text: 'Books can take you on journeys to places you have never seen before. You can explore deep blue oceans, climb tall mountains, and meet wonderful new friends.',
    source: 'Reading Adventures',
  },
  {
    id: 'easy-5',
    difficulty: 'easy',
    text: 'Good habits make life simpler and much more fun. Drink water, go for a quick walk outside, get enough sleep, and always remember to take deep breaths.',
    source: 'Simple Living',
  },
  {
    id: 'easy-6',
    difficulty: 'easy',
    text: 'The small boat drifted calmly across the blue lake. Ripples formed as water splashed softly against the wooden side. Birds flew overhead under the warm sunlight.',
    source: 'Quiet Lake',
  },
  {
    id: 'easy-7',
    difficulty: 'easy',
    text: 'Cooking a simple meal at home brings people together. Fresh bread and warm soup make any cold evening feel cozy. Sharing food is one of life best pleasures.',
    source: 'Home Cooking',
  },
  {
    id: 'easy-8',
    difficulty: 'easy',
    text: 'A clean desk helps clear your mind before you start work. Put away old papers, organize your pens, and open the window for fresh air to start a productive morning.',
    source: 'Clean Workspace',
  },
  {
    id: 'easy-9',
    difficulty: 'easy',
    text: 'Music has a unique power to change how we feel in an instant. A lively song brings energy to your day, while a soft piano tune helps you rest and unwind.',
    source: 'Sound & Mood',
  },
  {
    id: 'easy-10',
    difficulty: 'easy',
    text: 'The cat sat on the warm windowsill, watching raindrops race down the glass. She closed her eyes and began to purr softly as thunder rolled in the distance.',
    source: 'Rainy Day Cat',
  },
  {
    id: 'easy-11',
    difficulty: 'easy',
    text: 'Planting seeds in a small garden teaches us patience. With water, soil, and sunlight, tiny green sprouts soon turn into colorful flowers and fresh vegetables.',
    source: 'Garden Sprouts',
  },
  {
    id: 'easy-12',
    difficulty: 'easy',
    text: 'Riding a bicycle along the river path is both fun and relaxing. The wind rushes past your face as you pedal faster down the smooth paved trail.',
    source: 'Bike Ride',
  },
  {
    id: 'easy-13',
    difficulty: 'easy',
    text: 'Writing down your thoughts in a notebook helps you stay organized. It is satisfying to check off completed tasks and see what you have accomplished today.',
    source: 'Daily Journal',
  },
  {
    id: 'easy-14',
    difficulty: 'easy',
    text: 'The autumn leaves turned golden yellow and deep red. Children jumped into piles of crisp dry leaves with cheerful laughter echoing through the park.',
    source: 'Autumn Breeze',
  },
  {
    id: 'easy-15',
    difficulty: 'easy',
    text: 'A good friend is someone who listens when you need to talk. True friendship grows stronger over time through kindness, honesty, and shared happy moments.',
    source: 'True Friends',
  },
  {
    id: 'easy-16',
    difficulty: 'easy',
    text: 'Stargazing on a clear night reminds us how vast the universe is. Look up to find the bright North Star guiding travelers across the quiet night sky.',
    source: 'Night Sky',
  },
  {
    id: 'easy-17',
    difficulty: 'easy',
    text: 'Practice makes progress in everything you choose to do. Even ten minutes of daily typing can double your speed and confidence in just a few weeks.',
    source: 'Daily Practice',
  },
  {
    id: 'easy-18',
    difficulty: 'easy',
    text: 'The ocean waves rolled onto the sandy shore, leaving behind shiny seashells. Walking barefoot by the water edge brings a great sense of peace.',
    source: 'Seashore Walk',
  },
  {
    id: 'easy-19',
    difficulty: 'easy',
    text: 'Baking cookies fills the whole kitchen with sweet vanilla and cinnamon aroma. Nothing beats a warm chocolate chip cookie straight from the oven.',
    source: 'Sweet Oven',
  },
  {
    id: 'easy-20',
    difficulty: 'easy',
    text: 'Take a short break when your shoulders feel tight. Stretch your arms, drink a glass of water, and look away from the bright screen for a couple of minutes.',
    source: 'Quick Stretch',
  },

  // ==========================================
  // MEDIUM PASSAGES (20 unique passages)
  // Moderate length, richer vocabulary, quotes, punctuation & numbers
  // ==========================================
  {
    id: 'med-1',
    difficulty: 'medium',
    text: 'Simplicity is about subtracting the obvious and adding the meaningful. Great software is rarely measured by how many features it includes, but rather by how gracefully it solves the exact problem at hand.',
    source: 'Design Principles',
  },
  {
    id: 'med-2',
    difficulty: 'medium',
    text: 'In the year 1969, human beings first landed on the lunar surface. It required immense courage, millions of lines of code, and meticulous teamwork to achieve what once seemed completely impossible.',
    source: 'Apollo History',
  },
  {
    id: 'med-3',
    difficulty: 'medium',
    text: 'The keyboard is one of the most direct bridges between human thought and digital creation. Mastering touch typing allows ideas to flow straight from your mind to the screen without mechanical friction.',
    source: 'Digital Craft',
  },
  {
    id: 'med-4',
    difficulty: 'medium',
    text: 'Distributed systems thrive on resilience. When networks experience latency or packet loss, robust retry mechanisms and idempotent APIs prevent data corruption across cloud clusters.',
    source: 'Cloud Architecture',
  },
  {
    id: 'med-5',
    difficulty: 'medium',
    text: 'Curiosity is the engine of intellectual growth. When we ask fundamental questions about why things work, we uncover deeper layers of understanding and uncover unexpected solutions to complex challenges.',
    source: 'Mindset & Inquiry',
  },
  {
    id: 'med-6',
    difficulty: 'medium',
    text: 'The modern web browser is a marvel of engineering. It compiles JavaScript just-in-time, renders 60 frames per second, and negotiates encrypted handshakes across the globe in milliseconds.',
    source: 'Modern Browsers',
  },
  {
    id: 'med-7',
    difficulty: 'medium',
    text: 'Typography is the craft of endowing human language with a durable visual form. Line heights, letter spacing, and optical margins work silently together to establish rhythm and readability.',
    source: 'Graphic Design',
  },
  {
    id: 'med-8',
    difficulty: 'medium',
    text: 'Deep work is the ability to focus without distraction on a cognitively demanding task. In a world full of rapid notifications, uninterrupted focus has become a rare and valuable superpower.',
    source: 'Deep Work',
  },
  {
    id: 'med-9',
    difficulty: 'medium',
    text: 'Open-source software powers the modern internet. Millions of developers worldwide collaborate across time zones, sharing source code, fixing security vulnerabilities, and building shared utilities.',
    source: 'Open Source Culture',
  },
  {
    id: 'med-10',
    difficulty: 'medium',
    text: 'Architectural debt accumulates when short-term workarounds replace principled engineering. Refactoring regularly preserves code quality and ensures your codebase remains adaptable to future requirements.',
    source: 'Software Engineering',
  },
  {
    id: 'med-11',
    difficulty: 'medium',
    text: 'Human memory is associative rather than linear. We recall experiences by connecting sensory cues, emotional states, and contextual anchors formed during the original event.',
    source: 'Cognitive Science',
  },
  {
    id: 'med-12',
    difficulty: 'medium',
    text: 'In algorithmic problem solving, choosing the right data structure is half the battle. A hash table provides constant-time lookups on average, while a balanced binary tree guarantees logarithmic bounds.',
    source: 'Data Structures',
  },
  {
    id: 'med-13',
    difficulty: 'medium',
    text: 'The concept of flow describes a mental state where an individual is fully immersed in an energized focus. Time seems to disappear as skill level and challenge reach optimal equilibrium.',
    source: 'Flow State',
  },
  {
    id: 'med-14',
    difficulty: 'medium',
    text: 'Cryptography underpins modern digital commerce. From public-key infrastructure (PKI) to symmetric AES encryption, mathematical algorithms guarantee privacy, authenticity, and non-repudiation.',
    source: 'Information Security',
  },
  {
    id: 'med-15',
    difficulty: 'medium',
    text: 'Urban architecture reflects the social values of its era. Public squares, pedestrian walkways, and accessible transit foster community engagement and reduce environmental footprints.',
    source: 'Urban Planning',
  },
  {
    id: 'med-16',
    difficulty: 'medium',
    text: 'Writing clean code is like writing good prose: choose precise names, break long paragraphs into cohesive sections, and eliminate redundant phrases that distract from the main intent.',
    source: 'Clean Code Philosophy',
  },
  {
    id: 'med-17',
    difficulty: 'medium',
    text: 'Iterative design relies on rapid feedback loops. By testing prototypes with real users early, designers can validate assumptions before committing extensive development resources.',
    source: 'Product Design',
  },
  {
    id: 'med-18',
    difficulty: 'medium',
    text: 'Mechanical keyboards offer tactile switches with distinct actuation points, ranging from 45g linear reds to clicky blues. Enthusiasts customize keycaps, stabilizers, and lubed switches for optimal typing feedback.',
    source: 'Mechanical Keyboards',
  },
  {
    id: 'med-19',
    difficulty: 'medium',
    text: 'Statistical inference allows researchers to draw conclusions about vast populations from carefully chosen representative samples, quantifying uncertainty with confidence intervals and p-values.',
    source: 'Applied Statistics',
  },
  {
    id: 'med-20',
    difficulty: 'medium',
    text: 'Autonomous systems rely on sensor fusion — combining radar, lidar, and optical cameras — to construct accurate real-time environmental maps and navigate complex dynamic traffic scenarios safely.',
    source: 'Robotics & Automation',
  },

  // ==========================================
  // HARD PASSAGES (20 unique passages)
  // Longer, advanced vocabulary, technical/formal prose, symbols, math & code syntax
  // ==========================================
  {
    id: 'hard-1',
    difficulty: 'hard',
    text: 'Asynchronous concurrency demands rigorous synchronization primitives: mutexes, atomic operations, and lock-free data structures mitigate race conditions across multi-threaded environments (e.g., 64-bit architectures).',
    source: 'Concurrency & Systems',
  },
  {
    id: 'hard-2',
    difficulty: 'hard',
    text: 'The juxtaposed paradigms of epistemic skepticism and pragmatic empiricism underscore that subjective perception often obfuscates immutable truths; nonetheless, deductive inquiry perseveres relentlessly.',
    source: 'Epistemic Theory',
  },
  {
    id: 'hard-3',
    difficulty: 'hard',
    text: 'In computational linguistics, algorithmic transformers employ multi-head self-attention mechanisms — calculating softmax(Q * K^T / sqrt(d_k)) * V — to synthesize semantic representations across high-dimensional latent vectors.',
    source: 'Neural Transformers',
  },
  {
    id: 'hard-4',
    difficulty: 'hard',
    text: 'Quantum decoherence occurs when a coherent quantum superposition state interacts irreversibly with environmental degrees of freedom; thus, density matrix off-diagonal elements decay exponentially (t -> infinity).',
    source: 'Quantum Mechanics',
  },
  {
    id: 'hard-5',
    difficulty: 'hard',
    text: 'The architecture leverages cryptographic hashing (SHA-256), Merkle-DAG verification, and Byzantine fault-tolerant consensus protocols (BFT) to ensure zero-knowledge data integrity across 1,024 decentralized validator nodes.',
    source: 'Cryptographic Systems',
  },
  {
    id: 'hard-6',
    difficulty: 'hard',
    text: 'Compilers implement static Single Assignment (SSA) form, control-flow graph (CFG) linearization, and loop-invariant code motion (LICM) to maximize register allocation efficiency and vectorize SIMD pipelines.',
    source: 'Compiler Optimization',
  },
  {
    id: 'hard-7',
    difficulty: 'hard',
    text: 'Thermodynamic equilibrium dictates that closed macroscopic systems maximize configurational entropy: dS >= dQ / T; non-equilibrium thermodynamics examines dissipative self-organizing structures far from equilibrium.',
    source: 'Statistical Physics',
  },
  {
    id: 'hard-8',
    difficulty: 'hard',
    text: 'Relational database engines execute cost-based query optimization (CBO) by evaluating cardinality estimations, index-selectivity heuristics, and B-tree traversal overheads to synthesize optimal distributed query plans.',
    source: 'Database Internals',
  },
  {
    id: 'hard-9',
    difficulty: 'hard',
    text: 'The phenomenological existentialism of Heidegger and Sartre posits that "existence precedes essence" — individuals are thrust into radical ontological freedom, necessitated to forge intrinsic purpose amidst existential angst.',
    source: 'Continental Philosophy',
  },
  {
    id: 'hard-10',
    difficulty: 'hard',
    text: 'Garbage collectors balance generational throughput against pause times (STW): tri-color marking algorithms, write barriers, and concurrent compaction routines reclaim fragmented heap allocations without kernel interrupts.',
    source: 'Memory Management',
  },
  {
    id: 'hard-11',
    difficulty: 'hard',
    text: 'In differential geometry, Riemannian manifolds generalize Euclidean space via a smoothly varying metric tensor g_ij; geodesic equations determine the trajectory of parallel-transported vectors along curved spacetime curvature.',
    source: 'Differential Geometry',
  },
  {
    id: 'hard-12',
    difficulty: 'hard',
    text: 'Microarchitectural speculative execution exploits branch prediction buffers and out-of-order execution pipelines; however, micro-architectural side-channel exploits (Spectre, Meltdown) circumvent hardware privilege boundaries.',
    source: 'Microarchitecture',
  },
  {
    id: 'hard-13',
    difficulty: 'hard',
    text: 'The Raft consensus protocol decomposes distributed consensus into leader election, log replication, and commit safety invariants: quorum state transitions (floor(N/2) + 1) guarantee linearizable replicated state machines.',
    source: 'Distributed Protocols',
  },
  {
    id: 'hard-14',
    difficulty: 'hard',
    text: 'Epigenetic methylation patterns and histone acetylation regulate eukaryotic gene transcription without altering underlying nucleotide sequences (A-T, G-C base pairs), orchestrating cellular differentiation and phenotypic plasticity.',
    source: 'Molecular Genetics',
  },
  {
    id: 'hard-15',
    difficulty: 'hard',
    text: 'Monadic functional programming encapsulates side effects via algebraic structures: Functors map morphisms f: A -> B, Applicatives sequence operations, and Monads implement flatMap (>>=) satisfying associativity and identity laws.',
    source: 'Category Theory in CS',
  },
  {
    id: 'hard-16',
    difficulty: 'hard',
    text: 'In cryptographic zero-knowledge proofs (zk-SNARKs), arithmetic circuits are translated into Quadratic Arithmetic Programs (QAP); elliptic curve pairings verify polynomial identities without exposing private witness parameters.',
    source: 'Zero-Knowledge Proofs',
  },
  {
    id: 'hard-17',
    difficulty: 'hard',
    text: 'Astrophysical nucleosynthesis inside supermassive stars culminates at iron-56 (56Fe) due to peak binding energy per nucleon; subsequent gravitational core-collapse triggers catastrophic type-II core-collapse supernovae explosions.',
    source: 'Astrophysics',
  },
  {
    id: 'hard-18',
    difficulty: 'hard',
    text: 'Network transport protocols optimize congestion control (BBR, CUBIC) by monitoring bottleneck bandwidth and round-trip propagation delays (RTprop), dynamically modulating TCP window scaling to prevent bufferbloat.',
    source: 'Network Engineering',
  },
  {
    id: 'hard-19',
    difficulty: 'hard',
    text: 'The Halting Problem and Godel First Incompleteness Theorem establish axiomatic boundaries of formal computability: no recursive enumeration algorithm can decisively verify non-trivial semantic properties of arbitrary Turing machines.',
    source: 'Theory of Computation',
  },
  {
    id: 'hard-20',
    difficulty: 'hard',
    text: 'Kernel interrupt service routines (ISRs) execute within strict non-blocking top-half contexts, deferring latency-tolerant payload processing to bottom-half tasklets, software interrupts (softirqs), and threaded workqueues.',
    source: 'Operating System Kernels',
  },
];

/**
 * Returns a random passage for the specified difficulty, guaranteed not to repeat
 * the current passage ID consecutively if other passages are available.
 */
export function getRandomPassage(difficulty: Difficulty, currentId?: string): Passage {
  const filtered = PASSAGES.filter((p) => p.difficulty === difficulty);
  if (filtered.length <= 1) return filtered[0];
  const candidates = currentId ? filtered.filter((p) => p.id !== currentId) : filtered;
  const pool = candidates.length > 0 ? candidates : filtered;
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}
