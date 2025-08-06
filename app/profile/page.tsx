'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { User, Mail, Phone, Calendar, MapPin, Award, Star, Edit, Eye, Trophy, Target, Users, Activity, BookOpen, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-white border-b-4 border-pop-black">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-pop-green border-4 border-pop-black rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-pop-black helvetica-bold text-4xl">P</span>
              </div>
              <div>
                <h1 className="text-3xl helvetica-bold text-pop-black">PlasticCraftAlex</h1>
                <div className="systematic-caps text-gray-600 mt-1 space-y-1">
                  <div>Alex Martinez</div>
                  <div>San Francisco, CA • Joined March 2023</div>
                </div>
                <div className="flex items-center space-x-4 mt-2">
                  <Badge className="bg-pop-green/10 text-pop-green border-pop-green">
                    <Trophy className="w-3 h-3 mr-1" />
                    Maker Level 3
                  </Badge>
                  <Badge className="bg-pop-blue/10 text-pop-blue border-pop-blue">
                    <Users className="w-3 h-3 mr-1" />
                    Operations Staff
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="systematic-caps border-2 border-pop-black hover:bg-pop-green hover:text-white">
                <Eye className="w-4 h-4 mr-2" />
                View Public Profile
              </Button>
              <Button className="systematic-caps bg-pop-green border-2 border-pop-black text-pop-black hover:bg-pop-black hover:text-pop-green">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl bg-gray-50 mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Stats & Contact */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card className="bg-white border-2 border-pop-black">
              <CardHeader>
                <CardTitle className="systematic-caps text-pop-black">Contact Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <span className="text-sm">alex.martinez@popcycle.io</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <span className="text-sm">(555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <span className="text-sm">San Francisco, CA</span>
                </div>
              </CardContent>
            </Card>

            {/* Maker Stats */}
            <Card className="bg-white border-2 border-pop-black">
              <CardHeader>
                <CardTitle className="systematic-caps text-pop-black">Maker Stats</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="helvetica-bold text-2xl text-pop-green mb-1">47</div>
                    <div className="systematic-caps text-xs text-gray-600 whitespace-nowrap">Projects Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="helvetica-bold text-2xl text-pop-blue mb-1">143</div>
                    <div className="systematic-caps text-xs text-gray-600 whitespace-nowrap">Plastic Transformed (lbs)</div>
                  </div>
                  <div className="text-center">
                    <div className="helvetica-bold text-2xl text-pop-red mb-1">12</div>
                    <div className="systematic-caps text-xs text-gray-600 whitespace-nowrap">Skills Earned</div>
                  </div>
                  <div className="text-center">
                    <div className="helvetica-bold text-2xl text-orange-600 mb-1">8</div>
                    <div className="systematic-caps text-xs text-gray-600 whitespace-nowrap">Workshops Led</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Level Progress */}
            <Card className="bg-white border-2 border-pop-black">
              <CardHeader>
                <CardTitle className="systematic-caps text-pop-black flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  Level Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="systematic-caps text-lg font-bold text-pop-black mb-1">Level 3 → 4</div>
                    <div className="systematic-caps text-sm text-gray-600">2,847 / 5,000 XP</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 border-2 border-pop-black">
                    <div className="bg-pop-green h-full rounded-full" style={{width: '57%'}}></div>
                  </div>
                  <div className="text-center">
                    <div className="helvetica-bold text-xl text-pop-green mb-1">2,153</div>
                    <div className="systematic-caps text-xs text-gray-600">XP to next level</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Columns - Activities & Achievements */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Recent Projects */}
            <Card className="bg-white border-2 border-pop-black">
              <CardHeader>
                <CardTitle className="systematic-caps text-pop-black">Recent Projects</CardTitle>
                <CardDescription>Latest maker creations and assemblies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Office Desk Organizer', date: 'Jan 15, 2025', plastic: '2.3 lbs', status: 'Completed' },
                    { name: 'Phone Stand Set', date: 'Jan 12, 2025', plastic: '0.8 lbs', status: 'Completed' },
                    { name: 'Custom Planters', date: 'Jan 8, 2025', plastic: '4.1 lbs', status: 'In Progress' },
                    { name: 'Workshop Demo Kit', date: 'Jan 5, 2025', plastic: '1.5 lbs', status: 'Completed' },
                  ].map((project, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border-2 border-pop-black rounded-lg hover:bg-pop-green/5 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="helvetica-bold text-sm">{project.name}</h4>
                          <Badge variant={project.status === 'Completed' ? 'default' : 'secondary'} className="systematic-caps text-xs">
                            {project.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className="systematic-caps text-xs text-gray-600">{project.date}</p>
                          <span className="systematic-caps text-xs text-gray-600">Plastic: {project.plastic}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 systematic-caps border-2 border-pop-black hover:bg-pop-green hover:text-white">
                  View All Projects
                </Button>
              </CardContent>
            </Card>

            {/* Skills & Achievements */}
            <Card className="bg-white border-2 border-pop-black">
              <CardHeader>
                <CardTitle className="systematic-caps text-pop-black">Skills & Achievements</CardTitle>
                <CardDescription>Earned certifications and accomplishments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h4 className="systematic-caps font-medium text-pop-black mb-4 pb-2 border-b border-gray-100">Recent Achievements</h4>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { name: 'Workshop Leader', icon: '👨‍🏫', date: 'Jan 2025', color: 'pop-green' },
                        { name: 'Level 3 Maker', icon: '🏆', date: 'Dec 2024', color: 'pop-blue' },
                        { name: '100 lbs Milestone', icon: '♻️', date: 'Nov 2024', color: 'pop-red' },
                        { name: 'Community Helper', icon: '🤝', date: 'Oct 2024', color: 'pop-green' },
                        { name: 'Precision Assembly', icon: '🎯', date: 'Sep 2024', color: 'pop-blue' },
                        { name: 'First Project', icon: '⭐', date: 'Mar 2023', color: 'pop-red' },
                      ].map((achievement, index) => (
                        <div key={index} className={`text-center p-4 border-2 border-${achievement.color}/20 bg-${achievement.color}/5 rounded-lg hover:bg-${achievement.color}/10 transition-all group cursor-pointer`}>
                          <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{achievement.icon}</div>
                          <div className="systematic-caps text-xs font-medium text-pop-black mb-1">{achievement.name}</div>
                          <div className="systematic-caps text-xs text-gray-500">{achievement.date}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="systematic-caps font-medium text-pop-black mb-4 pb-2 border-b border-gray-100">Skills & Certifications</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {[
                        'Basic Assembly', 'Advanced Techniques', 'Quality Control', 'Workshop Teaching', 
                        'Team Leadership', 'Design Thinking', 'Material Knowledge', 'Safety Protocols',
                        'Community Building', 'Mentoring', 'Process Improvement', 'Sustainability'
                      ].map((skill, index) => (
                        <div key={index} className="group">
                          <Badge 
                            variant="outline" 
                            className="systematic-caps text-xs border-pop-black/30 hover:border-pop-green hover:bg-pop-green/10 hover:text-pop-green transition-all w-full justify-center py-2 cursor-pointer"
                          >
                            <Award className="w-3 h-3 mr-1 opacity-60 group-hover:opacity-100" />
                            {skill}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}