'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { User, MapPin, Calendar, Edit, ExternalLink, Star, Trophy, Target, Users, TrendingUp, Award, Activity, BookOpen } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Header - Wide and Professional */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            {/* Left: Avatar and Basic Info */}
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-pop-green border-3 border-pop-black rounded-full flex items-center justify-center shadow-lg">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="helvetica-bold text-4xl text-pop-black mb-2">Alex Chen</h1>
                <div className="flex items-center space-x-6 text-gray-600">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span className="systematic-caps text-sm">San Francisco, CA</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span className="systematic-caps text-sm">Joined March 2023</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-pop-green text-white systematic-caps">Level 3 Maker</Badge>
                    <Badge className="bg-pop-blue text-white systematic-caps">Workshop Leader</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex space-x-3">
              <Button variant="outline" className="systematic-caps border-2 border-pop-black hover:bg-pop-green hover:text-white">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Public Profile
              </Button>
              <Button className="bg-pop-green text-white systematic-caps border-2 border-pop-black hover:bg-pop-blue">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>

          {/* Progress Bar - Full Width */}
          <div className="mt-6 bg-gray-100 rounded-lg p-4 border-2 border-pop-black">
            <div className="flex justify-between items-center mb-2">
              <span className="systematic-caps text-sm text-pop-black font-medium">Progress to Level 4</span>
              <span className="systematic-caps text-sm text-pop-black font-bold">2,650 / 3,000 XP</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-4 border-2 border-pop-black">
              <div className="bg-pop-green h-full rounded-full border-r-2 border-pop-black" style={{ width: '88%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Dashboard Style */}
      <div className="max-w-screen-2xl mx-auto px-8 py-8">
        {/* Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-pop-black shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="systematic-caps text-sm text-gray-600 mb-1">Total Projects</p>
                  <p className="helvetica-bold text-3xl text-pop-black">47</p>
                  <p className="systematic-caps text-xs text-pop-green">+3 this month</p>
                </div>
                <div className="bg-pop-green/10 p-3 rounded-lg border-2 border-pop-green">
                  <Target className="w-8 h-8 text-pop-green" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-pop-black shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="systematic-caps text-sm text-gray-600 mb-1">Plastic Transformed</p>
                  <p className="helvetica-bold text-3xl text-pop-black">123 lbs</p>
                  <p className="systematic-caps text-xs text-pop-blue">+12 lbs this month</p>
                </div>
                <div className="bg-pop-blue/10 p-3 rounded-lg border-2 border-pop-blue">
                  <TrendingUp className="w-8 h-8 text-pop-blue" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-pop-black shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="systematic-caps text-sm text-gray-600 mb-1">Skills Earned</p>
                  <p className="helvetica-bold text-3xl text-pop-black">12</p>
                  <p className="systematic-caps text-xs text-pop-red">+1 this month</p>
                </div>
                <div className="bg-pop-red/10 p-3 rounded-lg border-2 border-pop-red">
                  <Award className="w-8 h-8 text-pop-red" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-pop-black shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="systematic-caps text-sm text-gray-600 mb-1">Workshops Led</p>
                  <p className="helvetica-bold text-3xl text-pop-black">8</p>
                  <p className="systematic-caps text-xs text-gray-500">+2 this month</p>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg border-2 border-pop-black">
                  <Users className="w-8 h-8 text-pop-black" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Left Column - Recent Activity & Contact */}
          <div className="xl:col-span-2 space-y-8">
            
            {/* Recent Projects - Table Style */}
            <Card className="border-2 border-pop-black shadow-lg">
              <CardHeader className="border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="systematic-caps text-xl text-pop-black">Recent Projects</CardTitle>
                    <CardDescription className="text-gray-600">Latest maker creations and assemblies</CardDescription>
                  </div>
                  <Button variant="outline" className="systematic-caps border-2 border-pop-black hover:bg-pop-green hover:text-white">
                    View All Projects
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left px-6 py-4 systematic-caps text-sm text-gray-600">Project Name</th>
                        <th className="text-left px-6 py-4 systematic-caps text-sm text-gray-600">Date</th>
                        <th className="text-left px-6 py-4 systematic-caps text-sm text-gray-600">Plastic Used</th>
                        <th className="text-left px-6 py-4 systematic-caps text-sm text-gray-600">Status</th>
                        <th className="text-left px-6 py-4 systematic-caps text-sm text-gray-600">Impact</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[
                        { name: 'Office Desk Organizer', date: 'Jan 15, 2025', plastic: '2.3 lbs', status: 'Completed', impact: 'High' },
                        { name: 'Phone Stand Set', date: 'Jan 12, 2025', plastic: '0.8 lbs', status: 'Completed', impact: 'Medium' },
                        { name: 'Custom Planters', date: 'Jan 8, 2025', plastic: '4.1 lbs', status: 'In Progress', impact: 'High' },
                        { name: 'Workshop Demo Kit', date: 'Jan 5, 2025', plastic: '1.5 lbs', status: 'Completed', impact: 'Medium' },
                        { name: 'Eco Water Bottles', date: 'Jan 2, 2025', plastic: '3.2 lbs', status: 'Completed', impact: 'High' },
                        { name: 'Garden Tool Handles', date: 'Dec 28, 2024', plastic: '2.8 lbs', status: 'Completed', impact: 'Medium' },
                      ].map((project, index) => (
                        <tr key={index} className="hover:bg-gray-50 cursor-pointer">
                          <td className="px-6 py-4">
                            <div className="helvetica-bold text-sm text-pop-black">{project.name}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="systematic-caps text-sm text-gray-600">{project.date}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="systematic-caps text-sm text-pop-black font-medium">{project.plastic}</span>
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant={project.status === 'Completed' ? 'default' : 'secondary'} className="systematic-caps">
                              {project.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            <Badge 
                              variant="outline" 
                              className={`systematic-caps ${
                                project.impact === 'High' ? 'border-pop-green text-pop-green' : 
                                'border-pop-blue text-pop-blue'
                              }`}
                            >
                              {project.impact}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Skills Grid */}
            <Card className="border-2 border-pop-black shadow-lg">
              <CardHeader className="border-b border-gray-200 bg-gray-50">
                <CardTitle className="systematic-caps text-xl text-pop-black">Technical Skills</CardTitle>
                <CardDescription className="text-gray-600">Maker capabilities and certifications</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[
                    { name: 'Basic Assembly', level: 'Expert', color: 'bg-pop-green' },
                    { name: 'Advanced Techniques', level: 'Advanced', color: 'bg-pop-blue' },
                    { name: 'Quality Control', level: 'Expert', color: 'bg-pop-green' },
                    { name: 'Material Knowledge', level: 'Intermediate', color: 'bg-pop-red' },
                    { name: 'Safety Protocols', level: 'Expert', color: 'bg-pop-green' },
                    { name: 'Workshop Teaching', level: 'Advanced', color: 'bg-pop-blue' },
                    { name: 'Team Leadership', level: 'Advanced', color: 'bg-pop-blue' },
                    { name: 'Design Thinking', level: 'Intermediate', color: 'bg-pop-red' },
                  ].map((skill, index) => (
                    <div key={index} className="p-4 border-2 border-pop-black rounded-lg hover:shadow-md transition-shadow">
                      <div className="text-center space-y-2">
                        <div className={`w-3 h-3 ${skill.color} rounded-full mx-auto border border-pop-black`}></div>
                        <div className="systematic-caps text-sm font-medium text-pop-black">{skill.name}</div>
                        <div className="systematic-caps text-xs text-gray-600">{skill.level}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            
            {/* Contact & Profile Info */}
            <Card className="border-2 border-pop-black shadow-lg">
              <CardHeader className="border-b border-gray-200 bg-gray-50">
                <CardTitle className="systematic-caps text-lg text-pop-black">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <span className="systematic-caps text-xs text-gray-600 font-medium">Email</span>
                  <p className="text-sm text-pop-black mt-1">alex.chen@email.com</p>
                </div>
                <div>
                  <span className="systematic-caps text-xs text-gray-600 font-medium">Phone</span>
                  <p className="text-sm text-pop-black mt-1">(555) 123-4567</p>
                </div>
                <div>
                  <span className="systematic-caps text-xs text-gray-600 font-medium">Location</span>
                  <p className="text-sm text-pop-black mt-1">San Francisco, CA</p>
                </div>
                <div>
                  <span className="systematic-caps text-xs text-gray-600 font-medium">Member Since</span>
                  <p className="text-sm text-pop-black mt-1">March 15, 2023</p>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="border-2 border-pop-black shadow-lg">
              <CardHeader className="border-b border-gray-200 bg-gray-50">
                <CardTitle className="systematic-caps text-lg text-pop-black">Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {[
                  { name: 'Workshop Leader', desc: '25+ workshops led', icon: '👨‍🏫', date: 'Jan 2025', color: 'bg-pop-green' },
                  { name: 'Level 3 Maker', desc: 'Advanced maker status', icon: '🏆', date: 'Dec 2024', color: 'bg-pop-blue' },
                  { name: '100 lbs Milestone', desc: 'Environmental impact', icon: '♻️', date: 'Nov 2024', color: 'bg-pop-red' },
                  { name: 'Community Helper', desc: 'Mentored 10+ makers', icon: '🤝', date: 'Oct 2024', color: 'bg-pop-black' },
                ].map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 border-2 border-gray-200 rounded-lg hover:border-pop-green transition-colors">
                    <div className={`${achievement.color} text-white w-10 h-10 rounded-full flex items-center justify-center border-2 border-pop-black text-lg`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="systematic-caps text-sm font-medium text-pop-black">{achievement.name}</div>
                      <div className="text-xs text-gray-600">{achievement.desc}</div>
                      <div className="systematic-caps text-xs text-gray-500">{achievement.date}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-2 border-pop-black shadow-lg">
              <CardHeader className="border-b border-gray-200 bg-gray-50">
                <CardTitle className="systematic-caps text-lg text-pop-black">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <Button className="w-full bg-pop-green text-white systematic-caps border-2 border-pop-black hover:bg-pop-blue">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Start New Project
                </Button>
                <Button variant="outline" className="w-full systematic-caps border-2 border-pop-black hover:bg-pop-green hover:text-white">
                  <Activity className="w-4 h-4 mr-2" />
                  View Activity Feed
                </Button>
                <Button variant="outline" className="w-full systematic-caps border-2 border-pop-black hover:bg-pop-green hover:text-white">
                  <Users className="w-4 h-4 mr-2" />
                  Find Collaborators
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}