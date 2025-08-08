import { Wrench, Download, ExternalLink, Clock, Users, Star } from 'lucide-react'
import Link from 'next/link'

const buildGuides = [
  {
    id: 'basic-rover',
    title: 'Basic Exploration Rover',
    difficulty: 'Beginner',
    time: '2-3 hours',
    materials: ['PopCycle chassis sheets', 'ESP32-S3', 'Camera module', 'Motors'],
    description: 'Build your first rover with basic movement and camera capabilities.',
    downloads: ['Assembly Guide PDF', '3D Print Files', 'Arduino Code'],
    rating: 4.8,
    builds: 127,
  },
  {
    id: 'gripper-rover',
    title: 'Gripper Manipulation Rover',
    difficulty: 'Intermediate',
    time: '4-5 hours',
    materials: ['Basic rover kit', 'Servo gripper', 'Additional sensors'],
    description: 'Add manipulation capabilities with a precision gripper system.',
    downloads: ['Extended Assembly Guide', 'Gripper STL Files', 'Control Software'],
    rating: 4.6,
    builds: 89,
  },
  {
    id: 'advanced-sensor',
    title: 'Environmental Sensor Array',
    difficulty: 'Advanced',
    time: '6-8 hours',
    materials: ['Sensor rover base', 'Environmental sensors', 'Data logger'],
    description: 'Scientific-grade environmental monitoring capabilities.',
    downloads: ['Sensor Integration Guide', 'Calibration Tools', 'Data Analysis Code'],
    rating: 4.9,
    builds: 34,
  },
]

const modificationIdeas = [
  {
    title: 'Solar Power Module',
    description: 'Add renewable energy for extended operation',
    difficulty: 'Intermediate',
    tags: ['sustainability', 'power', 'outdoor'],
  },
  {
    title: 'Night Vision Upgrade',
    description: 'Infrared camera for low-light exploration',
    difficulty: 'Advanced',
    tags: ['optics', 'electronics', 'exploration'],
  },
  {
    title: 'Weatherproof Housing',
    description: 'Protective enclosure for outdoor use',
    difficulty: 'Beginner',
    tags: ['durability', 'outdoor', 'protection'],
  },
  {
    title: 'Multi-Bot Communication',
    description: 'Mesh networking between rovers',
    difficulty: 'Expert',
    tags: ['networking', 'software', 'coordination'],
  },
]

export default function BuildPage() {
  return (
    <div className="min-h-screen rover-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="rover-card mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Wrench className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold rover-mono">BUILD_GUIDE</h1>
          </div>
          <p className="text-gray-600 max-w-3xl">
            Complete build instructions for creating your own Insight Rovers. All designs use 
            PopCycle recycled plastic chassis and standardized electronics packages.
          </p>
        </div>

        {/* Build Guides */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 rover-mono">ASSEMBLY_GUIDES</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {buildGuides.map((guide) => (
              <div key={guide.id} className="rover-card">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg mb-1">{guide.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="rover-mono">{guide.difficulty.toUpperCase()}</span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{guide.time}</span>
                      </span>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <div className="flex items-center space-x-1 mb-1">
                      <Star className="w-3 h-3 text-yellow-500" />
                      <span className="rover-mono">{guide.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Users className="w-3 h-3" />
                      <span className="rover-mono">{guide.builds}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{guide.description}</p>

                <div className="mb-4">
                  <h4 className="font-medium text-sm mb-2 rover-mono">MATERIALS:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {guide.materials.map((material, idx) => (
                      <li key={idx}>• {material}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  {guide.downloads.map((download, idx) => (
                    <button
                      key={idx}
                      className="w-full rover-btn text-left flex items-center justify-between"
                    >
                      <span className="rover-mono text-xs">{download.toUpperCase()}</span>
                      <Download className="w-3 h-3" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Modification Ideas */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 rover-mono">MODIFICATION_IDEAS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modificationIdeas.map((mod, idx) => (
              <div key={idx} className="rover-card">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold">{mod.title}</h3>
                  <span className="text-xs rover-mono text-gray-500">
                    {mod.difficulty.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{mod.description}</p>
                <div className="flex flex-wrap gap-1">
                  {mod.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-xs rover-mono rounded"
                    >
                      {tag.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tools & Resources */}
        <section>
          <h2 className="text-2xl font-bold mb-6 rover-mono">TOOLS_RESOURCES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rover-card">
              <h3 className="font-bold mb-3 rover-mono">3D_PRINTING</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• PopCycle sheet cutting guides</li>
                <li>• Motor mount templates</li>
                <li>• Sensor housing designs</li>
                <li>• Custom attachment points</li>
              </ul>
              <button className="mt-4 rover-btn-primary w-full rover-mono">
                DOWNLOAD_ALL
              </button>
            </div>

            <div className="rover-card">
              <h3 className="font-bold mb-3 rover-mono">SOFTWARE_TOOLS</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Arduino IDE setup guide</li>
                <li>• ESP32 development environment</li>
                <li>• Control interface templates</li>
                <li>• Debugging utilities</li>
              </ul>
              <button className="mt-4 rover-btn-primary w-full rover-mono">
                ACCESS_REPO
              </button>
            </div>

            <div className="rover-card">
              <h3 className="font-bold mb-3 rover-mono">COMMUNITY</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Builder forums and discussion</li>
                <li>• Photo sharing gallery</li>
                <li>• Troubleshooting support</li>
                <li>• Modification showcase</li>
              </ul>
              <Link href="/rovers/community" className="mt-4 rover-btn-primary w-full rover-mono block text-center">
                JOIN_COMMUNITY
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}